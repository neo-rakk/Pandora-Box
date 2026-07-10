'use client'

import { useState, useEffect } from 'react'

export default function ServicesApple() {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/data?section=services')
      const data = await res.json()
      setContent(data.services || {})
    } catch (error) {
      console.error('Failed to fetch services content:', error)
      setContent({
        title: 'Our Services',
        services: [
          { name: 'Brand Strategy', description: 'Comprehensive brand positioning and market analysis' },
          { name: 'Digital Marketing', description: 'Multi-channel digital campaigns and optimization' },
          { name: 'Content Creation', description: 'Strategic content for all platforms and formats' },
          { name: 'PR & Communications', description: 'Media relations and crisis management' },
          { name: 'Social Media', description: 'Community building and social engagement' },
          { name: 'Analytics & Insights', description: 'Data-driven reporting and performance metrics' }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  const title = content?.title || 'Our Services'
  const servicesData = content?.services || []

  const icons = ['♟', '🎬', '✨', '📢', '🎨', '#', '📡', '💻', '🥽', '📊', '🎯', '⚡']

  const services = servicesData.map((service: any, idx: number) => ({
    number: String(idx + 1).padStart(2, '0'),
    title: service.name,
    description: service.description,
    icon: icons[idx % icons.length]
  }))

  return (
    <section id="services" className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-24 text-center">
          <h2 className="text-5xl md:text-6xl font-semibold mb-6 text-foreground">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive 360° communication solutions designed for forward-thinking brands.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service: any, idx: number) => (
            <div key={idx} className="group">
              <div className="mb-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <div className="text-xs text-muted-foreground font-semibold mb-2">{service.number}</div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">{service.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
