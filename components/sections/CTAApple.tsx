'use client'

import { useState } from 'react'

export default function CTAApple() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', data: formData })
      })
      if (response.ok) {
        alert('Message sent successfully!')
        setFormData({ name: '', email: '', message: '' })
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-32 px-6 bg-background">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-semibold mb-6 text-foreground">Let&rsquo;s Work Together</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">Ready to transform your brand? Get in touch with our team and let&rsquo;s create something extraordinary.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-card border border-border px-6 py-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent rounded-lg transition-colors"
              required
            />
            <input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-card border border-border px-6 py-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent rounded-lg transition-colors"
              required
            />
          </div>
          <textarea
            placeholder="Tell us about your project"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={6}
            className="w-full bg-card border border-border px-6 py-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent rounded-lg transition-colors resize-none"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full px-8 py-4 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}
