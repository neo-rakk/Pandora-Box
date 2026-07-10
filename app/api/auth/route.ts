import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const expectedPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '123456'
    const token = process.env.ADMIN_TOKEN || 'your_secure_token_here'

    if (password === expectedPassword) {
      return NextResponse.json({ success: true, token })
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }
  } catch (error) {
    console.error('Authentication API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
