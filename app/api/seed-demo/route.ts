import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '../../../lib/mongodb'
import User from '../../../models/User'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    // Clear existing demo accounts
    await User.deleteMany({ email: { $in: ['student@example.com', 'admin@example.com'] } })

    // Create demo accounts
    const demoAccounts = [
      {
        name: 'Demo Student',
        email: 'student@example.com',
        password: await bcrypt.hash('password123', 12),
        phone: '+1234567890',
        role: 'student'
      },
      {
        name: 'Demo Admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 12),
        phone: '+1234567891',
        role: 'admin'
      }
    ]

    // Insert demo accounts
    const createdUsers = await User.insertMany(demoAccounts)

    return NextResponse.json({
      success: true,
      message: 'Demo accounts created successfully',
      accounts: createdUsers.map(user => ({
        name: user.name,
        email: user.email,
        role: user.role
      }))
    })
  } catch (error) {
    console.error('Error creating demo accounts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create demo accounts' },
      { status: 500 }
    )
  }
}
