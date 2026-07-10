'use client'

import { useState, useEffect } from 'react'

export default function Contact() {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/data?section=contact')
      const data = await res.json()
      setContent(data.contact || {})
    } catch (error) {
      console.error('Failed to fetch contact content:', error)
      setContent({
        title: 'Get In Touch',
        subtitle: 'Let\'s discuss your next project',
        email: 'hello@pandorabox.com',
        phone: '+1 (555) 123-4567'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        alert('Message sent successfully!')
        setFormData({ name: '', email: '', message: '' })
      } else {
        alert('Failed to send message')
      }
    } catch (error) {
      console.error('Error submitting contact form:', error)
      alert('Error sending message')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="h-96 bg-background" />

  return (
    <section id="contact" className="py-24 px-6 bg-background border-t border-border relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl opacity-40"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold font-display text-foreground mb-6 text-balance leading-tight">
            {content.title || 'Get In Touch'}
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            {content.subtitle || 'Let\'s discuss your next project'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-accent transition-colors duration-200">
            <h3 className="font-semibold text-foreground mb-2 text-sm">Email</h3>
            <a href={`mailto:${content.email || 'hello@pandorabox.com'}`} className="text-accent hover:text-accent/80 transition-colors text-sm">
              {content.email || 'hello@pandorabox.com'}
            </a>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-accent transition-colors duration-200">
            <h3 className="font-semibold text-foreground mb-2 text-sm">Phone</h3>
            <a href={`tel:${content.phone || '+1 (555) 123-4567'}`} className="text-accent hover:text-accent/80 transition-colors text-sm">
              {content.phone || '+1 (555) 123-4567'}
            </a>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-accent transition-colors duration-200">
            <h3 className="font-semibold text-foreground mb-2 text-sm">Response Time</h3>
            <p className="text-muted-foreground text-sm">Within 24 hours</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-card border border-border px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors duration-200 rounded-md"
              required
            />
            <input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-card border border-border px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors duration-200 rounded-md"
              required
            />
          </div>
          <textarea
            placeholder="Your message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={6}
            className="w-full bg-card border border-border px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors duration-200 resize-none rounded-md"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full px-6 py-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-200 font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}
