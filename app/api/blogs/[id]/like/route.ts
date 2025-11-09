import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../lib/auth'
import dbConnect from '../../../../../lib/mongodb'
import Blog from '../../../../../models/Blog'

// POST /api/blogs/[id]/like - Like or unlike a blog
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

    const blog = await Blog.findById(params.id)
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      )
    }

    const userId = session.user.id
    const isLiked = blog.likes.includes(userId)

    if (isLiked) {
      // Unlike
      blog.likes = blog.likes.filter((id: any) => id !== userId)
    } else {
      // Like
      blog.likes.push(userId)
    }

    await blog.save()

    return NextResponse.json({
      success: true,
      liked: !isLiked,
      likesCount: blog.likes.length
    })
  } catch (error) {
    console.error('Error toggling like:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to toggle like' },
      { status: 500 }
    )
  }
}

