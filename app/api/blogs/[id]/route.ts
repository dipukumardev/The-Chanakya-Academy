import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'
import dbConnect from '../../../../lib/mongodb'
import Blog from '../../../../models/Blog'
import User from '../../../../models/User'

// GET /api/blogs/[id] - Get a specific blog by ID
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

    // Only show published blogs to non-authors
    const session = await getServerSession(authOptions)
    const isAuthor = session?.user?.id === blog.author.id

    if (!blog.published && !isAuthor) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await Blog.findByIdAndUpdate(params.id, { $inc: { views: 1 } })

    return NextResponse.json({
      success: true,
      blog
    })
  } catch (error) {
    console.error('Error fetching blog:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog' },
      { status: 500 }
    )
  }
}

// PUT /api/blogs/[id] - Update a blog
export async function PUT(
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

    const blog = await Blog.findById(params.id)
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      )
    }

    // Check if user is the author
    if (blog.author.id !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Not authorized to update this blog' },
        { status: 403 }
      )
    }

    const { title, content, excerpt, tags, featuredImage, published } = await request.json()

    const updateData: any = {
      title: title || blog.title,
      content: content || blog.content,
      excerpt: excerpt || blog.excerpt,
      tags: tags || blog.tags,
      featuredImage: featuredImage !== undefined ? featuredImage : blog.featuredImage,
      published: published !== undefined ? published : blog.published
    }

    // Set publishedAt if publishing for the first time
    if (published && !blog.published) {
      updateData.publishedAt = new Date()
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    )

    return NextResponse.json({
      success: true,
      blog: updatedBlog,
      message: 'Blog updated successfully'
    })
  } catch (error) {
    console.error('Error updating blog:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update blog' },
      { status: 500 }
    )
  }
}

// DELETE /api/blogs/[id] - Delete a blog
export async function DELETE(
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

    const blog = await Blog.findById(params.id)
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      )
    }

    // Check if user is the author
    if (blog.author.id !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Not authorized to delete this blog' },
        { status: 403 }
      )
    }

    await Blog.findByIdAndDelete(params.id)

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting blog:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog' },
      { status: 500 }
    )
  }
}

