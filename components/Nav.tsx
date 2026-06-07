'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100, boxShadow: 'var(--shadow-sm)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: 700, color: 'var(--navy)' }}>
            Founder<span style={{ color: 'var(--gold)' }}>Sunset</span>
          </span>
          <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 2 }}>.com</span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          <Link href="/listings" className="nav-link">Browse Listings</Link>
          <Link href="/brokers" className="nav-link">Find a Broker</Link>
          <Link href="/blog" className="nav-link">Resources</Link>
          <Link href="/for-sellers" className="nav-link">Sell Your Business</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/listings" className="btn-primary" style={{ padding: '9px 20px', fontSize: '0.85rem' }}>
            Browse Listings
          </Link>
          <button onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} className="menu-btn" aria-label="Menu">
            <div style={{ width: 22, height: 2, background: 'var(--navy)', marginBottom: 5, transition: 'all 0.2s' }}></div>
            <div style={{ width: 22, height: 2, background: 'var(--navy)', marginBottom: 5 }}></div>
            <div style={{ width: 22, height: 2, background: 'var(--navy)' }}></div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'var(--white)', borderTop: '1px solid var(--border)', padding: '16px 24px 24px' }}>
          {[['Browse Listings', '/listings'], ['Find a Broker', '/brokers'], ['Resources', '/blog'], ['Sell Your Business', '/for-sellers'], ['For Buyers', '/for-buyers'], ['Contact', '/contact']].map(([label, href]) => (
            <Link key={href} href={href} className="nav-link" onClick={() => setOpen(false)} style={{ display: 'block', padding: '12px 0', borderBottom: '1px solid var(--border)', fontSize: '1rem' }}>{label}</Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
