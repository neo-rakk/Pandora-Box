import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbFile = path.join(__dirname, '..', 'data.json')

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

async function initData() {
  try {
    await fs.writeFile(dbFile, JSON.stringify(DEFAULT_DATA, null, 2))
    console.log('✓ Data initialized successfully at data.json')
  } catch (error) {
    console.error('✗ Failed to initialize data:', error)
    process.exit(1)
  }
}

initData()
