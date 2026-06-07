'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function ContactForm() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'general'
  const [form, setForm] = useState({ name: '', email: '', subject: type, message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const subjects: Record<string, string> = {
    general: 'General Inquiry',
    seller: 'I want to list my business',
    partner: 'Partnership / Advertising',
    broker: 'Broker directory question',
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch { setStatus('error') }
  }

  return (
    <div style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--navy)', padding: '48px 0 40px' }}>
        <div className="container-sm">
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: 'var(--white)', marginBottom: 10 }}>Get in Touch</h1>
          <p style={{ color: '#aabbd4' }}>Questions about buying, selling, or partnering? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="container-sm" style={{ padding: '40px 24px' }}>
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 8, padding: 36 }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>✓</div>
              <h2 style={{ fontSize: '1.3rem', marginBottom: 8 }}>Message Sent!</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Thanks for reaching out. We'll get back to you within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 20 }}>
                <label className="label">Your Name</label>
                <input type="text" className="input" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label className="label">Email Address</label>
                <input type="email" className="input" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label className="label">I'm reaching out about</label>
                <select className="input" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}>
                  {Object.entries(subjects).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label className="label">Message</label>
                <textarea className="input" rows={5} required value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} style={{ resize: 'vertical', fontFamily: 'DM Sans, sans-serif' }} />
              </div>
              <button type="submit" className="btn-primary" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center' }}>
                {status === 'loading' ? 'Sending...' : 'Send Message →'}
              </button>
              {status === 'error' && <p style={{ color: '#c0392b', fontSize: '0.85rem', marginTop: 12, textAlign: 'center' }}>Something went wrong. Please try again or email us directly.</p>}
            </form>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Or email us directly at <a href="mailto:hello@foundersunset.com" style={{ color: 'var(--gold)', fontWeight: 600 }}>hello@foundersunset.com</a></p>
        </div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  return <Suspense fallback={<div style={{ padding: 48, textAlign: 'center' }}>Loading...</div>}><ContactForm /></Suspense>
}
