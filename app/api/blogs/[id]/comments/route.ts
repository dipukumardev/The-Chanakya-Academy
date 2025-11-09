import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../lib/auth'
import dbConnect from '../../../../../lib/mongodb'
import Blog from '../../../../../models/Blog'
import User from '../../../../../models/User'

// POST /api/blogs/[id]/comments - Add a comment to a blog
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    await dbConnect()

    const { content } = await request.json()

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Comment content is required' },
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

    const blog = await Blog.findById(params.id)
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      )
    }

    // Create comment
    const comment = {
      id: new Date().getTime().toString(), // Simple ID generation
      author: {
        id: user._id.toString(),
        name: user.name,
        email: user.email
      },
      content: content.trim(),
      createdAt: new Date(),
      likes: []
    }

    // Add comment to blog
    blog.comments.push(comment)
    await blog.save()

    return NextResponse.json({
      success: true,
      comment,
      message: 'Comment added successfully'
    })
  } catch (error) {
    console.error('Error adding comment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add comment' },
      { status: 500 }
    )
  }
}

// GET /api/blogs/[id]/comments - Get all comments for a blog
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()

    const blog = await Blog.findById(params.id)
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      )
    }

    // Sort comments by creation date (newest first)
    const comments = blog.comments.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json({
      success: true,
      comments
    })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

