'use client'

import { useState, useEffect } from 'react'

export default function Hero() {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/data?section=hero')
      const data = await res.json()
      setContent(data.hero || {})
    } catch (error) {
      console.error('Failed to fetch hero content:', error)
      setContent({
        title: 'Transform Your Brand',
        subtitle: 'Experience 360° integrated communication strategies that drive results',
        cta: 'Get Started'
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="h-screen bg-background" />

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden bg-background">
      {/* Subtle gradient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-accent/5 to-transparent rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-32 text-center z-10">
        <div className="mb-12 inline-block">
          <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4">Creative Strategy</div>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold font-display text-foreground mb-8 text-balance leading-tight">
          {content.title || 'Transform Your Brand Strategy'}
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          {content.subtitle || 'Experience 360° integrated communication strategies designed to elevate your brand and drive measurable results'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-200 font-medium rounded-md">
            {content.cta || 'Start a Project'}
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-transparent text-foreground border border-muted hover:border-foreground transition-colors duration-200 font-medium rounded-md"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  )
}
