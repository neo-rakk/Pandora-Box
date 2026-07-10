'use client'

import { useEffect, useState } from 'react'

export default function About() {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/data?section=about')
      const data = await res.json()
      setContent(data.about || {})
    } catch (error) {
      console.error('Failed to fetch about content:', error)
      setContent({
        title: 'Who We Are',
        description: 'We are a premium integrated communications agency specializing in 360° brand strategies for enterprise clients.',
        mission: 'Our mission is to transform brands through strategic, data-driven communication.',
        values: ['Excellence', 'Innovation', 'Integrity', 'Impact']
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="h-96 bg-background" />

  return (
    <section id="about" className="py-24 px-6 bg-background border-b border-border relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-3xl opacity-40"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold font-display text-foreground mb-6 text-balance leading-tight">
            {content.title || 'Who We Are'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed font-light">
            {content.description || 'We are a premium integrated communications agency specializing in 360° brand strategies for enterprise clients.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-card border border-border rounded-lg p-8 hover:border-muted transition-colors duration-200">
            <h3 className="text-lg font-bold font-display text-foreground mb-4">Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              {content.mission || 'Our mission is to transform brands through strategic, data-driven communication.'}
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 hover:border-muted transition-colors duration-200">
            <h3 className="text-lg font-bold font-display text-foreground mb-6">Core Values</h3>
            <div className="grid grid-cols-2 gap-4">
              {(content.values || ['Excellence', 'Innovation', 'Integrity', 'Impact']).map((value: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
