'use client'

import Link from 'next/link'

interface AdminHeaderProps {
  activeSection: string
  onLogout: () => void
}

export default function AdminHeader({ activeSection, onLogout }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold font-display text-white hover:text-primary/80 transition-colors">
            PANDORA BOX
          </Link>
          <span className="text-foreground/50">/</span>
          <span className="text-foreground/70 capitalize">{activeSection}</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="px-4 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
          >
            View Site
          </Link>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm bg-destructive text-white rounded-lg hover:bg-destructive/90 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
