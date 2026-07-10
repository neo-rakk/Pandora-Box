'use client'

import { useEffect, useState } from 'react'

export default function Services() {
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

  if (loading) return <div className="h-96 bg-background" />

  return (
    <section id="services" className="py-24 px-6 bg-background border-t border-border border-b border-border relative overflow-hidden">
      <div className="absolute left-0 top-1/2 w-96 h-96 bg-gradient-to-r from-accent/10 to-transparent rounded-full blur-3xl opacity-40 transform -translate-y-1/2"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold font-display text-foreground mb-6">
            {content.title || 'Our Services'}
          </h2>
          <p className="text-muted-foreground text-lg">Comprehensive solutions for modern brands</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {(content.services || []).map((service: any, idx: number) => (
            <div 
              key={idx} 
              className="group relative bg-card border border-border hover:border-accent transition-all duration-300 cursor-pointer p-8 rounded-lg"
            >
              <div className="mb-4">
                <div className="text-xs text-accent font-semibold mb-3">0{idx + 1}</div>
                <h3 className="text-xl font-bold font-display text-foreground group-hover:text-accent transition-colors duration-200">
                  {service.name || `Service ${idx + 1}`}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description || 'Premium service offering'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
