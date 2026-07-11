import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { verifyAdminToken } from '@/lib/admin-auth'
import { uploadImageToSupabaseStorage } from '@/lib/supabase-storage'

const MAX_INLINE_IMAGE_SIZE = 6 * 1024 * 1024

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9.-]/g, '_')
}

function buildInlineImageUrl(file: File, buffer: Buffer) {
  const mimeType = file.type || 'image/jpeg'
  return `data:${mimeType};base64,${buffer.toString('base64')}`
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image uploads are supported' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${Date.now()}-${sanitizeFilename(file.name || 'upload.jpg')}`

    try {
      const supabaseUpload = await uploadImageToSupabaseStorage(file, buffer, filename)

      if (supabaseUpload) {
        return NextResponse.json({
          success: true,
          storage: 'supabase',
          url: supabaseUpload.url,
          path: supabaseUpload.path,
          bucket: supabaseUpload.bucket,
        })
      }
    } catch (supabaseError) {
      console.warn('Supabase upload unavailable, falling back to local storage:', supabaseError)
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')

    try {
      await fs.mkdir(uploadDir, { recursive: true })
      await fs.writeFile(path.join(uploadDir, filename), buffer)

      return NextResponse.json({
        success: true,
        storage: 'filesystem',
        url: `/uploads/${filename}`,
      })
    } catch (storageError) {
      console.warn('Filesystem upload unavailable, falling back to inline image storage:', storageError)

      if (file.size > MAX_INLINE_IMAGE_SIZE) {
        return NextResponse.json(
          { error: 'Image is too large for inline storage. Please configure Supabase Storage or use an image under 6 MB.' },
          { status: 413 }
        )
      }

      return NextResponse.json({
        success: true,
        storage: 'inline',
        url: buildInlineImageUrl(file, buffer),
      })
    }
  } catch (error) {
    console.error('File upload API error:', error)
    return NextResponse.json({ error: 'Internal server error during upload' }, { status: 500 })
  }
}
