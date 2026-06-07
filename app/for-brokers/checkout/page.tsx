'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function CheckoutInner() {
  const params = useSearchParams()
  const plan = params.get('plan') || 'price_standard'
  const [form, setForm] = useState({ name: '', email: '', firm: '', phone: '', states: '', specialties: '', bio: '' })
  const [status, setStatus] = useState<'idle' | 'loading'>('idle')

  const planName = plan === 'price_featured' ? 'Featured ($499/mo)' : 'Standard ($299/mo)'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      // Persist the broker profile first (pending), then send to Stripe checkout.
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, subject: 'broker', message: `Broker signup (${planName})\nFirm: ${form.firm}\nPhone: ${form.phone}\nStates: ${form.states}\nSpecialties: ${form.specialties}\nBio: ${form.bio}` })
      })
      const res = await fetch('/api/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, email: form.email })
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setStatus('idle')
    } catch { setStatus('idle') }
  }

  return (
    <div style={{ background: 'var(--off-white)', minHeight: '100vh', padding: '40px 0 64px' }}>
      <div className="container-sm">
        <Link href="/for-brokers" style={{ fontSize: '0.85rem', color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>← Back to plans</Link>
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 10, padding: 36, marginTop: 16 }}>
          <div style={{ marginBottom: 24 }}>
            <span className="badge badge-gold">{planName}</span>
            <h1 style={{ fontSize: '1.6rem', marginTop: 12 }}>Set Up Your Broker Profile</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 6 }}>Tell us about your practice. After payment, your profile goes live within 24 hours.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div><label className="label">Your Name</label><input className="input" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>
              <div><label className="label">Email</label><input className="input" type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} /></div>
              <div><label className="label">Firm Name</label><input className="input" required value={form.firm} onChange={e => setForm(p => ({ ...p, firm: e.target.value }))} /></div>
              <div><label className="label">Phone</label><input className="input" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} /></div>
            </div>
            <div style={{ marginTop: 16 }}><label className="label">States You Serve</label><input className="input" placeholder="e.g. Florida, Georgia" value={form.states} onChange={e => setForm(p => ({ ...p, states: e.target.value }))} /></div>
            <div style={{ marginTop: 16 }}><label className="label">Specialties</label><input className="input" placeholder="e.g. HVAC, Manufacturing" value={form.specialties} onChange={e => setForm(p => ({ ...p, specialties: e.target.value }))} /></div>
            <div style={{ marginTop: 16, marginBottom: 24 }}><label className="label">Short Bio</label><textarea className="input" rows={4} style={{ fontFamily: 'DM Sans, sans-serif', resize: 'vertical' }} value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} /></div>
            <button type="submit" className="btn-primary" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center' }}>
              {status === 'loading' ? 'Redirecting to payment...' : 'Continue to Payment →'}
            </button>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 12 }}>Secure payment via Stripe · Cancel anytime · 30-day money-back guarantee</p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return <Suspense fallback={<div style={{ padding: 48, textAlign: 'center' }}>Loading...</div>}><CheckoutInner /></Suspense>
}
