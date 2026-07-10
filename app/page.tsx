'use client'

import Header from '@/components/Header'
import HeroApple from '@/components/sections/HeroApple'
import ServicesApple from '@/components/sections/ServicesApple'
import FeaturesApple from '@/components/sections/FeaturesApple'
import CTAApple from '@/components/sections/CTAApple'
import Footer from '@/components/Footer'
import ThemeManager from '@/components/ThemeManager'

export default function Home() {
  return (
    <main className="bg-background">
      <ThemeManager />
      <Header />
      <HeroApple />
      <ServicesApple />
      <FeaturesApple />
      <CTAApple />
      <Footer />
    </main>
  )
}
