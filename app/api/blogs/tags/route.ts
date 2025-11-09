import { NextResponse } from 'next/server'
import dbConnect from '../../../../lib/mongodb'
import Blog from '../../../../models/Blog'

// GET /api/blogs/tags - Get all unique tags
export async function GET() {
  try {
    await dbConnect()

    // Get all unique tags from published blogs
    const blogs = await Blog.find({ published: true }, { tags: 1 })
    
    // Extract and flatten all tags
    const allTags = blogs.flatMap(blog => blog.tags)
    
    // Get unique tags and sort them
    const uniqueTags = Array.from(new Set(allTags)).sort()

    return NextResponse.json({
      success: true,
      tags: uniqueTags
    })
  } catch (error) {
    console.error('Error fetching tags:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tags' },
      { status: 500 }
    )
  }
}

