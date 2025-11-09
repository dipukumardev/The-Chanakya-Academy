import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'
import dbConnect from '../../../../lib/mongodb'
import User from '../../../../models/User'
import Blog from '../../../../models/Blog'

export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()

    // Get user statistics
    const totalStudents = await User.countDocuments({ role: 'student' })
    const totalAdmins = await User.countDocuments({ role: 'admin' })
    const activeUsers = await User.countDocuments({ 
      role: 'student',
      updatedAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
    })

    // Get blog statistics
    const totalBlogs = await Blog.countDocuments()
    const publishedBlogs = await Blog.countDocuments({ published: true })
    const draftBlogs = await Blog.countDocuments({ published: false })
    
    // Get total views and likes from blogs
    const blogStats = await Blog.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          totalComments: { $sum: '$comments' }
        }
      }
    ])

    const stats = {
      users: {
        totalStudents,
        totalAdmins,
        activeUsers,
        totalUsers: totalStudents + totalAdmins
      },
      blogs: {
        total: totalBlogs,
        published: publishedBlogs,
        draft: draftBlogs,
        totalViews: blogStats[0]?.totalViews || 0,
        totalLikes: blogStats[0]?.totalLikes || 0,
        totalComments: blogStats[0]?.totalComments || 0
      },
      courses: {
        total: 0, // Real data - would come from courses collection when available
        active: 0,
        draft: 0
      },
      revenue: {
        total: 0, // Real data - would come from payments collection when available
        monthly: 0,
        growth: 0
      }
    }

    return NextResponse.json({
      success: true,
      stats
    })

  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
