import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import dbConnect from '../../../lib/mongodb'
import Blog from '../../../models/Blog'
import User from '../../../models/User'

// GET /api/blogs - Get all published blogs with pagination
export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const tag = searchParams.get('tag')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    // Build query
    const query: any = { published: true }
    
    if (tag) {
      query.tags = { $in: [tag] }
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    }

    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content') // Don't include full content in listing

    const total = await Blog.countDocuments(query)

    return NextResponse.json({
      success: true,
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}

// POST /api/blogs - Create a new blog
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    await dbConnect()

    const { title, content, excerpt, tags, featuredImage, published } = await request.json()

    if (!title || !content || !excerpt) {
      return NextResponse.json(
        { success: false, error: 'Title, content, and excerpt are required' },
        { status: 400 }
      )
    }

    // Get user details
    const user = await User.findById(session.user.id)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    const blogData = {
      title,
      content,
      excerpt,
      tags: tags || [],
      featuredImage: featuredImage || '',
      published: published || false,
      author: {
        id: user._id.toString(),
        name: user.name,
        email: user.email
      },
      publishedAt: published ? new Date() : undefined
    }

    const blog = await Blog.create(blogData)

    return NextResponse.json({
      success: true,
      blog,
      message: 'Blog created successfully'
    })
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create blog' },
      { status: 500 }
    )
  }
}

