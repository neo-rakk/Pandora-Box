'use client'

import { useEffect, useState } from 'react'

export default function Approach() {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/data?section=approach')
      const data = await res.json()
      setContent(data.approach || {})
    } catch (error) {
      console.error('Failed to fetch approach content:', error)
      setContent({
        title: 'Our Approach',
        subtitle: 'Strategic methodology for success',
        steps: [
          { number: '1', title: 'Discovery', description: 'Deep analysis of your market and audience' },
          { number: '2', title: 'Strategy', description: 'Development of comprehensive communication plan' },
          { number: '3', title: 'Execution', description: 'Professional implementation across channels' },
          { number: '4', title: 'Optimization', description: 'Continuous monitoring and refinement' }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="h-96 bg-background" />

  return (
    <section id="approach" className="py-24 px-6 bg-background border-t border-border border-b border-border relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl opacity-40"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold font-display text-foreground mb-6 text-balance leading-tight">
            {content.title || 'Our Approach'}
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            {content.subtitle || 'Strategic methodology for success'}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {(content.steps || []).map((step: any, idx: number) => (
            <div key={idx} className="relative group">
              <div className="bg-card p-8 border border-border hover:border-accent transition-colors duration-200 h-full rounded-lg relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-4xl font-bold font-display text-muted mb-4 group-hover:text-accent transition-colors duration-200">
                    {step.number || idx + 1}
                  </div>
                  <h3 className="text-lg font-bold font-display text-foreground mb-3">
                    {step.title || `Step ${idx + 1}`}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description || 'Strategic step'}
                  </p>
                </div>
              </div>
              {idx < 3 && (
                <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-px bg-border"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
