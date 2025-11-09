import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('image') as unknown as File

    if (!file) {
      return NextResponse.json({ success: false, message: 'No image uploaded' })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, message: 'Invalid file type' })
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: 'File too large (max 5MB)' })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const filename = `blog-${timestamp}-${randomString}.${fileExtension}`
    const filepath = join(uploadsDir, filename)

    // Write file to disk
    await writeFile(filepath, buffer)

    // Return the public URL
    const imageUrl = `/uploads/${filename}`

    return NextResponse.json({
      success: true,
      imageUrl,
      message: 'Image uploaded successfully'
    })

  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { success: false, message: 'Error uploading image' },
      { status: 500 }
    )
  }
}
