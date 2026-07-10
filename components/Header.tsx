'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [logoText, setLogoText] = useState('Pandora Box')
  const [hasBg, setHasBg] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    fetch('/api/data?section=settings')
      .then(res => res.json())
      .then(data => {
        if (data?.settings?.logoText) {
          setLogoText(data.settings.logoText)
        }
      })
      .catch(err => console.error('Failed to load logo text:', err))

    fetch('/api/data?section=hero')
      .then(res => res.json())
      .then(data => {
        const bgType = data?.hero?.bgType || 'none'
        const backgroundImage = data?.hero?.backgroundImage
        const backgroundImages = data?.hero?.backgroundImages || []
        const hasBgActive = (bgType === 'image' && backgroundImage) || (bgType === 'slider' && backgroundImages.length > 0)
        setHasBg(hasBgActive)
      })
      .catch(err => console.error('Failed to load hero for header:', err))
  }, [])

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const isWhiteText = hasBg && !isScrolled

  return (
    <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className={`text-base font-semibold transition-colors duration-300 ${isWhiteText ? 'text-white' : 'text-foreground'}`}>
          {logoText}
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => handleNavClick('services')} 
            className={`text-sm transition-colors duration-300 cursor-pointer ${isWhiteText ? 'text-white/70 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Services
          </button>
          <button 
            onClick={() => handleNavClick('features')} 
            className={`text-sm transition-colors duration-300 cursor-pointer ${isWhiteText ? 'text-white/70 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Features
          </button>
          <button 
            onClick={() => handleNavClick('contact')} 
            className={`text-sm transition-colors duration-300 cursor-pointer ${isWhiteText ? 'text-white/70 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Contact
          </button>
        </div>

        <div></div>
      </nav>
    </header>
  )
}
