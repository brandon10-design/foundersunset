'use client'
import { useState } from 'react'

interface EmailCaptureProps {
  variant?: 'inline' | 'banner' | 'minimal'
  industry?: string
}

export default function EmailCapture({ variant = 'inline', industry }: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState(industry || '')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const industries = ['All Industries', 'Plumbing', 'HVAC', 'Landscaping', 'Restaurant', 'Cleaning', 'Auto Repair', 'Retail', 'Manufacturing', 'Construction']

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, industry: selectedIndustry })
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch { setStatus('error') }
  }

  if (status === 'success') {
    return (
      <div style={{ background: 'var(--gold-pale)', border: '1px solid var(--gold)', borderRadius: 8, padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>✓</div>
        <div style={{ fontWeight: 600, color: 'var(--navy)', marginBottom: 4 }}>You're subscribed!</div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>We'll notify you when new retirement listings match your criteria.</p>
      </div>
    )
  }

  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" className="input" required style={{ flex: 1, minWidth: 200 }} />
        <button type="submit" className="btn-primary" disabled={status === 'loading'} style={{ whiteSpace: 'nowrap' }}>
          {status === 'loading' ? 'Subscribing...' : 'Get Alerts'}
        </button>
      </form>
    )
  }

  if (variant === 'banner') {
    return (
      <div style={{ background: 'var(--navy)', padding: '40px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 600, color: 'var(--white)', marginBottom: 8 }}>
            Never Miss a Great Retirement Listing
          </div>
          <p style={{ color: '#8899bb', marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
            Get weekly alerts when new businesses hit the market from retiring owners in your target industry.
          </p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, maxWidth: 560, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required
              style={{ flex: 1, minWidth: 220, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 4, padding: '10px 14px', color: 'var(--white)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', outline: 'none' }}
            />
            <select value={selectedIndustry} onChange={e => setSelectedIndustry(e.target.value)}
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 4, padding: '10px 14px', color: 'var(--white)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', outline: 'none', minWidth: 160 }}>
              {industries.map(i => <option key={i} value={i} style={{ color: 'var(--navy)', background: 'white' }}>{i}</option>)}
            </select>
            <button type="submit" className="btn-primary" disabled={status === 'loading'}>
              {status === 'loading' ? 'Subscribing...' : 'Get Free Alerts →'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Default inline
  return (
    <div style={{ background: 'var(--gold-pale)', border: '1px solid #e8d18a', borderRadius: 8, padding: 28 }}>
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>
        Get Notified of New Listings
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
        We'll alert you when new retirement-driven businesses are listed in your target industry.
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="input" required />
        <select value={selectedIndustry} onChange={e => setSelectedIndustry(e.target.value)} className="input">
          {industries.map(i => <option key={i} value={i}>{i}</option>)}
        </select>
        <button type="submit" className="btn-primary" disabled={status === 'loading'}>
          {status === 'loading' ? 'Subscribing...' : 'Send Me Listings →'}
        </button>
      </form>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 10 }}>No spam. Unsubscribe anytime.</p>
    </div>
  )
}
