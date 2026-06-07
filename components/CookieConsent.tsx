'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const CONSENT_KEY = 'fs_cookie_consent'

// Read consent without throwing if storage is unavailable.
export function getConsent(): 'accepted' | 'declined' | null {
  if (typeof window === 'undefined') return null
  try { return (localStorage.getItem(CONSENT_KEY) as 'accepted' | 'declined' | null) } catch { return null }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show the banner only if the user hasn't chosen yet.
    if (getConsent() === null) setVisible(true)
  }, [])

  function choose(choice: 'accepted' | 'declined') {
    try { localStorage.setItem(CONSENT_KEY, choice) } catch {}
    // Notify the analytics loader so it can react immediately (no reload needed).
    window.dispatchEvent(new CustomEvent('fs-consent-change', { detail: choice }))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div role="dialog" aria-label="Cookie consent" style={{
      position: 'fixed', bottom: 16, left: 16, right: 16, zIndex: 1000,
      maxWidth: 760, margin: '0 auto',
      background: 'var(--navy-dark)', color: 'var(--white)',
      borderRadius: 10, boxShadow: 'var(--shadow-lg)',
      border: '1px solid rgba(201,168,76,0.25)',
      padding: '20px 24px',
      display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
    }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 600, marginBottom: 4 }}>
          We value your privacy
        </div>
        <p style={{ fontSize: '0.85rem', color: '#aabbd4', lineHeight: 1.6 }}>
          We use cookies to understand how the site is used and improve your experience. You can accept analytics cookies or continue with only what's essential. See our{' '}
          <Link href="/privacy" style={{ color: 'var(--gold)' }}>Privacy Policy</Link>.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button onClick={() => choose('declined')} style={{
          background: 'transparent', color: 'var(--white)',
          border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 4,
          padding: '9px 18px', fontSize: '0.85rem', fontWeight: 600,
          fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', whiteSpace: 'nowrap',
        }}>Essential only</button>
        <button onClick={() => choose('accepted')} className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
          Accept all
        </button>
      </div>
    </div>
  )
}
