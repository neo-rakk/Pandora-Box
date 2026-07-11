import { NextRequest, NextResponse } from 'next/server'
import { getAdminToken, updateAdminPassword, verifyAdminPassword, verifyAdminToken } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    const { password } = (await request.json()) as { password?: string }

    if (!password || !(await verifyAdminPassword(password))) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    return NextResponse.json({ success: true, token: getAdminToken() })
  } catch (error) {
    console.error('Authentication API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null

    if (!verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { currentPassword, nextPassword } = (await request.json()) as {
      currentPassword?: string
      nextPassword?: string
    }

    if (!currentPassword || !nextPassword) {
      return NextResponse.json({ error: 'Current password and new password are required' }, { status: 400 })
    }

    const result = await updateAdminPassword(currentPassword, nextPassword)

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Password update API error:', error)
    return NextResponse.json({ error: 'Unable to update password' }, { status: 500 })
  }
}
