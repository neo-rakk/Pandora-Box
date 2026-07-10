import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const MESSAGES_FILE = path.join(process.cwd(), 'messages.json')

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    }

    let messages = []
    try {
      const content = await fs.readFile(MESSAGES_FILE, 'utf-8')
      messages = JSON.parse(content)
    } catch (error) {
      // File does not exist yet; start with an empty list
    }

    messages.push(newMessage)
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2))

    return NextResponse.json({ success: true, message: 'Message saved successfully' })
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 })
  }
}
