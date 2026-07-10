import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const DB_FILE = path.join(process.cwd(), 'data.json')

const DEFAULT_DATA = {
  hero: {
    title: 'Transform Your Brand',
    subtitle: 'Experience 360° integrated communication strategies that drive results',
    cta: 'Get Started'
  },
  about: {
    title: 'Who We Are',
    description: 'We are a premium integrated communications agency specializing in 360° brand strategies for enterprise clients.',
    mission: 'Our mission is to transform brands through strategic, data-driven communication.',
    values: ['Excellence', 'Innovation', 'Integrity', 'Impact']
  },
  services: {
    title: 'Our Services',
    services: [
      { name: 'Brand Strategy', description: 'Comprehensive brand positioning and market analysis' },
      { name: 'Digital Marketing', description: 'Multi-channel digital campaigns and optimization' },
      { name: 'Content Creation', description: 'Strategic content for all platforms and formats' },
      { name: 'PR & Communications', description: 'Media relations and crisis management' },
      { name: 'Social Media', description: 'Community building and social engagement' },
      { name: 'Analytics & Insights', description: 'Data-driven reporting and performance metrics' }
    ]
  },
  innovation: {
    title: 'Tech Innovation',
    subtitle: 'Cutting-edge tools and methodologies',
    features: ['AI-powered analytics', 'Real-time campaign monitoring', 'Automated reporting', 'Predictive modeling']
  },
  approach: {
    title: 'Our Approach',
    subtitle: 'Strategic methodology for success',
    steps: [
      { number: '1', title: 'Discovery', description: 'Deep analysis of your market and audience' },
      { number: '2', title: 'Strategy', description: 'Development of comprehensive communication plan' },
      { number: '3', title: 'Execution', description: 'Professional implementation across channels' },
      { number: '4', title: 'Optimization', description: 'Continuous monitoring and refinement' }
    ]
  },
  contact: {
    title: 'Get In Touch',
    subtitle: "Let's discuss your next project",
    email: 'hello@pandorabox.com',
    phone: '+1 (555) 123-4567'
  }
}

async function getData() {
  try {
    const content = await fs.readFile(DB_FILE, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    return DEFAULT_DATA
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const section = searchParams.get('section')

    const data = await getData()

    if (section && section in data) {
      return NextResponse.json({ [section]: data[section] })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading data:', error)
    return NextResponse.json(DEFAULT_DATA, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    // Verify the token (in production, this would be more secure)
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const body = await request.json()
    const data = await getData()

    // Update the data
    const updatedData = { ...data, ...body }

    // Save to file
    await fs.writeFile(DB_FILE, JSON.stringify(updatedData, null, 2))

    return NextResponse.json({ success: true, data: updatedData })
  } catch (error) {
    console.error('Error saving data:', error)
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}
