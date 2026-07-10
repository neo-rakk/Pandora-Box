'use client'

import { useState, useEffect } from 'react'

export default function HeroApple() {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeSlide, setActiveSlide] = useState(0)

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
        title: "Redefine Your Brand's Story",
        subtitle: '360° integrated communications strategy that transforms how your audience perceives, engages, and trusts your brand.',
        cta: 'Start Project',
        ctaSecondary: 'Our Services',
        bgType: 'none',
        backgroundImage: '',
        backgroundImages: []
      })
    } finally {
      setLoading(false)
    }
  }

  const bgType = content?.bgType || 'none'
  const backgroundImage = content?.backgroundImage || ''
  const backgroundImages = content?.backgroundImages || []
  const title = content?.title || "Redefine Your Brand's Story"
  const subtitle = content?.subtitle || "360° integrated communications strategy that transforms how your audience perceives, engages, and trusts your brand."
  const cta = content?.cta || "Start Project"
  const ctaSecondary = content?.ctaSecondary || "Our Services"

  // Slider effect
  useEffect(() => {
    if (bgType === 'slider' && backgroundImages.length > 1) {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % backgroundImages.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [bgType, backgroundImages])

  const hasBg = (bgType === 'image' && backgroundImage) || (bgType === 'slider' && backgroundImages.length > 0)

  return (
    <section className="relative pt-32 pb-20 px-6 min-h-screen flex items-center bg-background overflow-hidden">
      
      {/* Background Handler */}
      {bgType === 'image' && backgroundImage && (
        <>
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: `url("${backgroundImage}")` }}
          />
          <div className="absolute inset-0 z-10 bg-black/60" />
        </>
      )}

      {bgType === 'slider' && backgroundImages.length > 0 && (
        <>
          {backgroundImages.map((img: any, idx: number) => (
            <div 
              key={idx}
              className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
              style={{ 
                backgroundImage: `url("${img.url}")`,
                opacity: idx === activeSlide ? 1 : 0 
              }}
            />
          ))}
          <div className="absolute inset-0 z-10 bg-black/60" />
        </>
      )}

      <div className="relative max-w-4xl mx-auto text-center z-20">
        <h1 className={`text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 leading-tight ${hasBg ? 'text-white' : 'text-foreground'} drop-shadow-sm`}>
          {title}
        </h1>
        
        <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light ${hasBg ? 'text-white/80' : 'text-muted-foreground'} drop-shadow-sm`}>
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors rounded-full font-medium text-sm cursor-pointer"
          >
            {cta}
          </button>
          <button 
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className={`px-8 py-3 bg-transparent border rounded-full font-medium text-sm cursor-pointer backdrop-blur-sm transition-colors ${hasBg ? 'border-white/20 text-white hover:border-white/50' : 'border-foreground/20 text-foreground hover:border-foreground/50'}`}
          >
            {ctaSecondary}
          </button>
        </div>
      </div>
    </section>
  )
}
