'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminHeader from '@/components/admin/AdminHeader'
import ContentEditor from '@/components/admin/ContentEditor'

export default function Dashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('hero')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [isFetched, setIsFetched] = useState(false)

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token')
    if (savedToken) {
      setToken(savedToken)
      setIsAuthenticated(true)
      fetchData(savedToken)
    }
  }, [])

  const fetchData = async (adminToken: string) => {
    try {
      const res = await fetch('/api/data')
      const content = await res.json()
      setData(content)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setIsFetched(true)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const hashedPassword = btoa(password)
    const adminPassword = btoa(process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123')

    if (hashedPassword === adminPassword || password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      const newToken = btoa(Date.now().toString())
      localStorage.setItem('admin_token', newToken)
      setToken(newToken)
      setIsAuthenticated(true)
      setPassword('')
      fetchData(newToken)
    } else {
      alert('Invalid password')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setToken(null)
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-display text-white mb-2">Admin Dashboard</h1>
            <p className="text-foreground/70">Enter password to access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter admin password"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    )
  }

  if (!isFetched || !data) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Loading...</h2>
          <p className="text-foreground/70">Fetching content data</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <AdminHeader activeSection={activeSection} onLogout={handleLogout} />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-5 gap-6">
          {/* Navigation */}
          <aside className="md:col-span-1">
            <nav className="sticky top-20 space-y-2">
              {Object.keys(data).map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection === section
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/70 hover:text-foreground hover:bg-card'
                  }`}
                >
                  <span className="capitalize">{section}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Content Editor */}
          <section className="md:col-span-4">
            {activeSection && data[activeSection] && (
              <ContentEditor
                section={activeSection}
                content={data[activeSection]}
                token={token}
                onSave={() => fetchData(token)}
              />
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
