import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    // 1. Verify admin authorization token
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // 2. Parse the multipart form data
    const formData = await request.formData()
    const file = formData.get('file') as Blob | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // 3. Convert Blob to Buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Create a safe, timestamped filename
    const originalName = (file as any).name || 'upload.jpg'
    const safeName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${Date.now()}-${safeName}`
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')

    // 4. Ensure the uploads directory exists
    await fs.mkdir(uploadDir, { recursive: true })

    // 5. Write the file to the uploads folder
    await fs.writeFile(path.join(uploadDir, filename), buffer)

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`
    })
  } catch (error) {
    console.error('File upload API error:', error)
    return NextResponse.json({ error: 'Internal server error during upload' }, { status: 500 })
  }
}
