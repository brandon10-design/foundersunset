import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import EmailCapture from '@/components/EmailCapture'
import { getListings } from '@/lib/data'

export const metadata: Metadata = {
  title: 'FounderSunset — Businesses For Sale by Retiring Owners',
  description: 'Browse businesses for sale exclusively from retiring owners. Motivated sellers, clean books, and decades of built value — ready for their next chapter.',
}

const industries = [
  { name: 'Plumbing', icon: '🔧', slug: 'plumbing' },
  { name: 'HVAC', icon: '❄️', slug: 'hvac' },
  { name: 'Landscaping', icon: '🌿', slug: 'landscaping' },
  { name: 'Restaurant', icon: '🍽️', slug: 'restaurant' },
  { name: 'Cleaning', icon: '✨', slug: 'cleaning' },
  { name: 'Auto Repair', icon: '🚗', slug: 'auto-repair' },
  { name: 'Retail', icon: '🏪', slug: 'retail' },
  { name: 'Manufacturing', icon: '🏭', slug: 'manufacturing' },
]

const stats = [
  { number: '10,000+', label: 'Boomers retire daily' },
  { number: '$4.5T', label: 'In business value transferring' },
  { number: '2.9M', label: 'Boomer-owned businesses' },
  { number: '70%', label: 'Have no succession plan' },
]

export default async function HomePage() {
  const allListings = await getListings()
  const featured = allListings.filter(l => l.featured)
  const recent = allListings.slice(0, 6)

  return (
    <>
      {/* Hero */}
      <section className="hero-bg" style={{ padding: '80px 0 72px', position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 700 }}>
            <div className="animate-fade-up" style={{ marginBottom: 20 }}>
              <span className="badge badge-gold">The Silver Tsunami Marketplace</span>
            </div>
            <h1 className="animate-fade-up delay-100" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 700, color: 'var(--white)', lineHeight: 1.15, marginBottom: 20 }}>
              Where Great Businesses<br />
              <em style={{ color: 'var(--gold)' }}>Find Their Next Chapter</em>
            </h1>
            <p className="animate-fade-up delay-200" style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#aabbd4', lineHeight: 1.7, marginBottom: 36, maxWidth: 560 }}>
              The only business-for-sale directory exclusively featuring listings from retiring owners. Motivated sellers, clean books, decades of built value — and a founder ready to hand the keys to the right person.
            </p>

            {/* Search bar */}
            <div className="animate-fade-up delay-300" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: 16, maxWidth: 620 }}>
              <form action="/listings" method="GET">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 10 }}>
                  <div>
                    <label className="label" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>Industry</label>
                    <select name="industry" style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 4, padding: '9px 12px', color: 'var(--white)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', outline: 'none' }}>
                      <option value="">All Industries</option>
                      {industries.map(i => <option key={i.slug} value={i.slug} style={{ color: '#000' }}>{i.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>Max Price</label>
                    <select name="maxPrice" style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 4, padding: '9px 12px', color: 'var(--white)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', outline: 'none' }}>
                      <option value="">Any Price</option>
                      <option value="250000" style={{ color: '#000' }}>Under $250K</option>
                      <option value="500000" style={{ color: '#000' }}>Under $500K</option>
                      <option value="1000000" style={{ color: '#000' }}>Under $1M</option>
                      <option value="2500000" style={{ color: '#000' }}>Under $2.5M</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button type="submit" className="btn-primary">Search →</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: 'var(--navy)', padding: '28px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {stats.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 700, color: 'var(--gold)', lineHeight: 1 }}>{s.number}</div>
                <div style={{ fontSize: '0.78rem', color: '#8899bb', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:600px){.container > div{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </section>

      {/* Browse by industry */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Browse by Industry</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>Find Your Industry</h2>
            <div className="gold-divider" style={{ margin: '12px auto 0' }}></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
            {industries.map(ind => (
              <Link key={ind.slug} href={`/listings?industry=${ind.slug}`} style={{ textDecoration: 'none' }}>
                <div className="industry-tile" style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 8, padding: '20px 12px', textAlign: 'center', transition: 'all 0.2s', cursor: 'pointer' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{ind.icon}</div>
                  <div style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--navy)' }}>{ind.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>Hand-Picked</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)' }}>Featured Listings</h2>
            </div>
            <Link href="/listings" className="btn-secondary" style={{ padding: '9px 20px', fontSize: '0.85rem' }}>View All Listings →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
            {featured.map(listing => <ListingCard key={listing.id} listing={listing} />)}
          </div>
        </div>
      </section>

      {/* Why FounderSunset */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Why FounderSunset</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>Retirement Sales Are Different</h2>
            <div className="gold-divider" style={{ margin: '12px auto' }}></div>
            <p style={{ maxWidth: 540, margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Buying from a retiring owner is the smartest acquisition you can make. Here's why.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              { icon: '🎯', title: 'Motivated Sellers', body: 'Retiring owners are ready to sell — not testing the market. Less negotiation friction, faster closes.' },
              { icon: '📋', title: 'Clean Books', body: 'A founder who built their business over decades takes pride in clean financials. Less due diligence drama.' },
              { icon: '🤝', title: 'Generous Transitions', body: 'Retiring owners want their business to thrive. Expect more training time and seller financing than from any other seller type.' },
              { icon: '💰', title: 'Fair Pricing', body: 'No inflated valuations from a PE rollup. You\'re buying from a person, not an investment committee.' },
            ].map(f => (
              <div key={f.title} className="card">
                <div style={{ fontSize: '2rem', marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent listings */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>Recently Added</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)' }}>Latest Listings</h2>
            </div>
            <Link href="/listings" className="btn-secondary" style={{ padding: '9px 20px', fontSize: '0.85rem' }}>Browse All →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
            {recent.map(listing => <ListingCard key={listing.id} listing={listing} />)}
          </div>
        </div>
      </section>

      {/* Email capture banner */}
      <EmailCapture variant="banner" />

      {/* For Brokers CTA */}
      <section className="section" style={{ background: 'var(--gold-pale)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>For Business Brokers</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 12 }}>Reach Serious Buyers</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 480 }}>
              FounderSunset attracts buyers who specifically seek retirement-driven acquisitions — the most motivated, qualified buyers in the market. List your firm in our broker directory and get seen by people ready to buy.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/for-brokers" className="btn-primary">Join Broker Directory →</Link>
            <Link href="/advertise" className="btn-secondary">Advertising Options</Link>
          </div>
        </div>
      </section>
    </>
  )
}
