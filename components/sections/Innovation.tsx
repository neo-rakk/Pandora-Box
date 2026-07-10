'use client'

import { useEffect, useState } from 'react'

export default function Innovation() {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/data?section=innovation')
      const data = await res.json()
      setContent(data.innovation || {})
    } catch (error) {
      console.error('Failed to fetch innovation content:', error)
      setContent({
        title: 'Tech Innovation',
        subtitle: 'Cutting-edge tools and methodologies',
        features: [
          'AI-powered analytics',
          'Real-time campaign monitoring',
          'Automated reporting',
          'Predictive modeling'
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="h-96 bg-background" />

  return (
    <section id="innovation" className="py-24 px-6 bg-background border-t border-border border-b border-border relative overflow-hidden">
      <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-3xl opacity-40"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold font-display text-foreground mb-6 text-balance leading-tight">
              {content.title || 'Tech Innovation'}
            </h2>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed font-light">
              {content.subtitle || 'Cutting-edge tools and methodologies'}
            </p>
            <div className="space-y-4">
              {(content.features || []).map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-2 h-2 bg-accent rounded-full group-hover:scale-150 transition-transform duration-200"></div>
                  <span className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-200">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-80 bg-card border border-border rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="text-7xl font-bold font-display text-accent mb-4">360°</div>
              <p className="text-muted-foreground text-sm">Integrated Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
