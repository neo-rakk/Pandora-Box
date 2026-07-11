'use client'

import { useState, useEffect } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import ContentEditor from '@/components/admin/ContentEditor'

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('hero')
  const [data, setData] = useState<any>(null)
  const [isFetched, setIsFetched] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [nextPassword, setNextPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [isPasswordSaving, setIsPasswordSaving] = useState(false)

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token')
    if (savedToken) {
      setToken(savedToken)
      setIsAuthenticated(true)
      fetchData()
    }
  }, [])

  const fetchData = async () => {
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      if (res.ok) {
        const result = await res.json()
        const adminToken = result.token
        localStorage.setItem('admin_token', adminToken)
        setToken(adminToken)
        setIsAuthenticated(true)
        setPassword('')
        fetchData()
      } else {
        alert('Invalid password')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Authentication failed')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setToken(null)
    setIsAuthenticated(false)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordMessage('')

    if (!token) {
      setPasswordMessage('Session expirée. Merci de vous reconnecter.')
      handleLogout()
      return
    }

    if (nextPassword !== confirmPassword) {
      setPasswordMessage('Les deux nouveaux mots de passe ne correspondent pas.')
      return
    }

    setIsPasswordSaving(true)

    try {
      const res = await fetch('/api/auth', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, nextPassword }),
      })
      const result = await res.json()

      if (res.ok) {
        setCurrentPassword('')
        setNextPassword('')
        setConfirmPassword('')
        setPasswordMessage('Mot de passe mis à jour avec succès.')
      } else {
        setPasswordMessage(result.error || 'Impossible de mettre à jour le mot de passe.')
      }
    } catch (error) {
      console.error('Password update error:', error)
      setPasswordMessage('Erreur lors de la mise à jour du mot de passe.')
    } finally {
      setIsPasswordSaving(false)
    }
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
              <label className="block text-sm font-medium text-foreground mb-2" htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter admin password"
                autoComplete="current-password"
                required
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

              <button
                onClick={() => setActiveSection('security')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeSection === 'security'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/70 hover:text-foreground hover:bg-card'
                }`}
              >
                Sécurité
              </button>
            </nav>
          </aside>

          {/* Content Editor */}
          <section className="md:col-span-4">
            {activeSection === 'security' ? (
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold font-display text-white mb-2">Sécurité</h2>
                <p className="text-sm text-foreground/70 mb-6">
                  Modifiez le mot de passe superadmin utilisé pour accéder au dashboard.
                </p>

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2" htmlFor="current-password">
                      Mot de passe actuel
                    </label>
                    <input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                      autoComplete="current-password"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2" htmlFor="next-password">
                      Nouveau mot de passe
                    </label>
                    <input
                      id="next-password"
                      type="password"
                      value={nextPassword}
                      onChange={(e) => setNextPassword(e.target.value)}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2" htmlFor="confirm-password">
                      Confirmer le nouveau mot de passe
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                  </div>

                  {passwordMessage && (
                    <div className="rounded-lg bg-background border border-border px-4 py-3 text-sm text-foreground/80" role="status">
                      {passwordMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isPasswordSaving}
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPasswordSaving ? 'Mise à jour...' : 'Changer le mot de passe'}
                  </button>
                </form>
              </div>
            ) : activeSection && data[activeSection] ? (
              <ContentEditor
                section={activeSection}
                content={data[activeSection]}
                token={token}
                onSave={fetchData}
                onUnauthorized={handleLogout}
              />
            ) : null}
          </section>
        </div>
      </div>
    </main>
  )
}
