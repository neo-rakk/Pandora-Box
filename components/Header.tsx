'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-background/40 backdrop-blur-md'}`}>
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-base font-semibold text-foreground">
          Pandora Box
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          <button onClick={() => handleNavClick('services')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Services
          </button>
          <button onClick={() => handleNavClick('features')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </button>
          <button onClick={() => handleNavClick('contact')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </button>
        </div>

        <div></div>
      </nav>
    </header>
  )
}
