'use client'

import { useState, useEffect, useRef } from 'react'

interface ContentEditorProps {
  section: string
  content: any
  token: string | null
  onSave: () => void
  onUnauthorized?: () => void
}

export default function ContentEditor({ section, content, token, onSave, onUnauthorized }: ContentEditorProps) {
  const [editedContent, setEditedContent] = useState(content)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [uploadingField, setUploadingField] = useState<string | null>(null)

  useEffect(() => {
    setEditedContent(content)
    setMessage('')
  }, [content, section])

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

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onUrlResult: (url: string) => void,
    fieldIdentifier: string
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingField(fieldIdentifier)
    setMessage('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (res.status === 401) {
        setMessage('Session expired. Logging out...')
        if (onUnauthorized) {
          setTimeout(() => onUnauthorized(), 1500)
        }
      } else if (res.ok) {
        const result = await res.json()
        onUrlResult(result.url)
        setMessage(result.storage === 'inline' ? 'File uploaded successfully! Save to publish this image.' : 'File uploaded successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        const result = await res.json().catch(() => null)
        setMessage(result?.error || 'Upload failed.')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      setMessage('Error uploading file.')
    } finally {
      setUploadingField(null)
    }
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

      if (res.status === 401) {
        setMessage('Session expired or unauthorized. Logging out...')
        if (onUnauthorized) {
          setTimeout(() => onUnauthorized(), 1500)
        }
      } else if (res.ok) {
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

  const checkIsImageField = (fieldName: string) => {
    const f = fieldName.toLowerCase()
    return f.includes('image') || f.includes('bg') || f.includes('favicon') || f.includes('logo') || f.includes('url') || f.includes('photo')
  }

  return (
    <div className="bg-card border border-border rounded-lg p-8">
      <h2 className="text-2xl font-bold font-display text-white mb-6 capitalize">Edit {section}</h2>

      <div className="space-y-6 mb-8">
        {Object.entries(editedContent).map(([key, value]: [string, any]) => {
          if (typeof value === 'string') {
            const isImageField = checkIsImageField(key)
            const isImageUrl = isImageField && value && (value.startsWith('/') || value.startsWith('http://') || value.startsWith('https://') || value.startsWith('data:image/'))
            return (
              <div key={key}>
                <label className="block text-sm font-medium text-foreground mb-2 capitalize" htmlFor={key}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                {key === 'bgType' ? (
                  <select
                    id={key}
                    name={key}
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  >
                    <option value="none">None (Default Gradient)</option>
                    <option value="image">Single Image</option>
                    <option value="slider">Image Slider (Slideshow)</option>
                  </select>
                ) : key.includes('description') || key.includes('subtitle') || key.includes('message') ? (
                  <textarea
                    id={key}
                    name={key}
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                    rows={4}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none text-sm"
                  />
                ) : (
                  <div className="flex gap-3 items-center">
                    <input
                      id={key}
                      name={key}
                      type="text"
                      value={value}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="flex-1 bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                    />
                    {isImageField && (
                      <label className="px-4 py-3 bg-secondary text-foreground hover:bg-secondary/80 border border-border rounded-lg cursor-pointer text-sm font-medium transition-colors select-none">
                        {uploadingField === key ? 'Uploading...' : 'Upload'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (url) => handleChange(key, url), key)}
                          disabled={uploadingField !== null}
                        />
                      </label>
                    )}
                  </div>
                )}
                {isImageUrl && (
                  <div className="mt-3 relative w-32 h-20 border border-border rounded-lg overflow-hidden bg-background">
                    <img src={value} alt="Preview" className="w-full h-full object-cover" />
                  </div>
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
                    {value.map((item, idx) => {
                      const itemId = `${key}-${idx}`
                      return (
                        <input
                          key={idx}
                          id={itemId}
                          name={itemId}
                          type="text"
                          value={item}
                          onChange={(e) => handleArrayChange(key, idx, e.target.value)}
                          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                        />
                      )
                    })}
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
                        {Object.entries(item).map(([field, fieldValue]: [string, any]) => {
                          const isNestedImage = checkIsImageField(field)
                          const fieldId = `${key}-${idx}-${field}`
                          return (
                            <div key={field}>
                              <label className="block text-xs font-medium text-foreground/70 mb-1 capitalize" htmlFor={fieldId}>
                                {field}
                              </label>
                              <div className="flex gap-3 items-center">
                                <input
                                  id={fieldId}
                                  name={fieldId}
                                  type="text"
                                  value={fieldValue as string}
                                  onChange={(e) => handleNestedChange(key, idx, field, e.target.value)}
                                  className="flex-1 bg-card border border-border rounded px-3 py-2 text-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                                />
                                {isNestedImage && (
                                  <label className="px-3 py-2 bg-secondary text-foreground hover:bg-secondary/80 border border-border rounded cursor-pointer text-xs font-medium transition-colors select-none">
                                    {uploadingField === fieldId ? 'Uploading...' : 'Upload'}
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => handleFileUpload(e, (url) => handleNestedChange(key, idx, field, url), fieldId)}
                                      disabled={uploadingField !== null}
                                    />
                                  </label>
                                )}
                              </div>
                              {isNestedImage && fieldValue && (fieldValue.startsWith('/') || fieldValue.startsWith('http://') || fieldValue.startsWith('https://') || fieldValue.startsWith('data:image/')) && (
                                <div className="mt-2 relative w-24 h-16 border border-border rounded overflow-hidden bg-background">
                                  <img src={fieldValue} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                              )}
                            </div>
                          )
                        })}
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
        <div className={`mb-6 p-4 rounded-lg text-sm ${message.includes('success') || message.includes('uploaded') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {message}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving || uploadingField !== null}
        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}
