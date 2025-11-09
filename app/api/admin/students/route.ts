import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'
import dbConnect from '../../../../lib/mongodb'
import User from '../../../../models/User'

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

    // Try to connect to database
    let students = []
    
    try {
      await dbConnect()

      // Get all students from database
      const studentUsers = await User.find({ role: 'student' })
        .select('name email phone createdAt updatedAt lastLogin isActive')
        .sort({ createdAt: -1 })

      // Transform the data to match our interface
      students = studentUsers.map((user: any) => ({
        id: String(user._id),
        name: String(user.name || 'Unknown'),
        email: String(user.email || ''),
        phone: String(user.phone || 'Not provided'),
        joinDate: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : 'Unknown',
        enrolledCourses: 0, // Would come from courses collection when available
        status: user.isActive ? 'active' : 'inactive',
        lastLogin: user.lastLogin ? new Date(user.lastLogin).toISOString().split('T')[0] : 'Never',
        totalSpent: 0 // Would come from payments collection when available
      }))

      console.log(`Found ${students.length} students in database`)

    } catch (dbError) {
      console.log('Database connection failed, returning empty array')
      students = []
    }

    return NextResponse.json({
      success: true,
      students
    })

  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}
