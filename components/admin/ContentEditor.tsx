'use client'

import { useState } from 'react'

interface ContentEditorProps {
  section: string
  content: any
  token: string | null
  onSave: () => void
}

export default function ContentEditor({ section, content, token, onSave }: ContentEditorProps) {
  const [editedContent, setEditedContent] = useState(content)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (key: string, value: any) => {
    setEditedContent({ ...editedContent, [key]: value })
  }

  const handleArrayChange = (key: string, index: number, value: string) => {
    const arr = [...(editedContent[key] || [])]
    arr[index] = value
    setEditedContent({ ...editedContent, [key]: arr })
  }

  const handleNestedChange = (key: string, index: number, field: string, value: string) => {
    const arr = [...(editedContent[key] || [])]
    arr[index] = { ...arr[index], [field]: value }
    setEditedContent({ ...editedContent, [key]: arr })
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ [section]: editedContent })
      })

      if (res.ok) {
        setMessage('Saved successfully!')
        onSave()
        setTimeout(() => setMessage(''), 2000)
      } else {
        setMessage('Failed to save')
      }
    } catch (error) {
      console.error('Error saving:', error)
      setMessage('Error saving changes')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-8">
      <h2 className="text-2xl font-bold font-display text-white mb-6 capitalize">Edit {section}</h2>

      <div className="space-y-6 mb-8">
        {Object.entries(editedContent).map(([key, value]: [string, any]) => {
          if (typeof value === 'string') {
            return (
              <div key={key}>
                <label className="block text-sm font-medium text-foreground mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                {key.includes('description') || key.includes('subtitle') || key.includes('message') ? (
                  <textarea
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                    rows={4}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                )}
              </div>
            )
          }

          if (Array.isArray(value)) {
            if (typeof value[0] === 'string') {
              return (
                <div key={key}>
                  <label className="block text-sm font-medium text-foreground mb-2 capitalize">
                    {key}
                  </label>
                  <div className="space-y-2">
                    {value.map((item, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange(key, idx, e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                    ))}
                  </div>
                </div>
              )
            }

            if (typeof value[0] === 'object') {
              return (
                <div key={key}>
                  <h3 className="text-sm font-medium text-foreground mb-4 capitalize">{key}</h3>
                  <div className="space-y-6">
                    {value.map((item, idx) => (
                      <div key={idx} className="bg-background p-4 rounded-lg border border-border space-y-3">
                        {Object.entries(item).map(([field, fieldValue]: [string, any]) => (
                          <div key={field}>
                            <label className="block text-xs font-medium text-foreground/70 mb-1 capitalize">
                              {field}
                            </label>
                            <input
                              type="text"
                              value={fieldValue as string}
                              onChange={(e) => handleNestedChange(key, idx, field, e.target.value)}
                              className="w-full bg-card border border-border rounded px-3 py-2 text-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
          }

          return null
        })}
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {message}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}
