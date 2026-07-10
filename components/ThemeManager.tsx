'use client'

import { useEffect, useState } from 'react'

export default function ThemeManager() {
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/data?section=settings')
      const data = await res.json()
      if (data && data.settings) {
        applySettings(data.settings)
      }
    } catch (error) {
      console.error('Failed to fetch site settings:', error)
    }
  }

  const applySettings = (settingsData: any) => {
    // 1. Apply Document Title
    if (settingsData.pageTitle) {
      document.title = settingsData.pageTitle
    }

    // 2. Apply Meta Description
    if (settingsData.pageDescription) {
      let metaDescription = document.querySelector('meta[name="description"]')
      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.setAttribute('name', 'description')
        document.head.appendChild(metaDescription)
      }
      metaDescription.setAttribute('content', settingsData.pageDescription)
    }

    // 3. Apply Favicon (supports emojis or URL links)
    if (settingsData.favicon) {
      let faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement
      if (!faviconLink) {
        faviconLink = document.createElement('link')
        faviconLink.setAttribute('rel', 'icon')
        document.head.appendChild(faviconLink)
      }

      const isEmoji = /^\p{Emoji}$/u.test(settingsData.favicon) || settingsData.favicon.length <= 4
      if (isEmoji) {
        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${settingsData.favicon}</text></svg>`
        faviconLink.setAttribute('href', `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`)
      } else {
        faviconLink.setAttribute('href', settingsData.favicon)
      }
    }

    // 4. Inject Dynamic CSS Color Variables
    const root = document.documentElement
    if (settingsData.backgroundColor) {
      root.style.setProperty('--background', settingsData.backgroundColor)
    }
    if (settingsData.textColor) {
      root.style.setProperty('--foreground', settingsData.textColor)
    }
    if (settingsData.primaryColor) {
      root.style.setProperty('--accent', settingsData.primaryColor)
      root.style.setProperty('--ring', settingsData.primaryColor)
      root.style.setProperty('--sidebar-accent', settingsData.primaryColor)
      root.style.setProperty('--sidebar-ring', settingsData.primaryColor)
    }
    if (settingsData.cardColor) {
      root.style.setProperty('--card', settingsData.cardColor)
      root.style.setProperty('--secondary', settingsData.cardColor)
      root.style.setProperty('--input', settingsData.cardColor)
      root.style.setProperty('--sidebar', settingsData.cardColor)
    }
  }

  return null
}
