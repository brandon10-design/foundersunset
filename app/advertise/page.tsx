import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Advertise & Partner — Reach Business Buyers & Sellers',
  description: 'Partner with FounderSunset to reach a high-intent audience of business buyers and retiring sellers. Sponsorships, newsletter placements, and affiliate partnerships available.',
}

export default function AdvertisePage() {
  return (
    <div>
      <section className="hero-bg" style={{ padding: '72px 0 64px' }}>
        <div className="container">
          <div style={{ maxWidth: 640 }}>
            <span className="badge badge-gold" style={{ marginBottom: 16, display: 'inline-block' }}>Partner With Us</span>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', marginBottom: 16 }}>
              Reach a High-Intent Acquisition Audience
            </h1>
            <p style={{ color: '#aabbd4', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 28 }}>
              FounderSunset attracts business buyers actively seeking acquisitions and retiring owners planning their exit. If you serve this market — lenders, attorneys, valuation firms, advisors — this is your audience.
            </p>
            <Link href="/contact?type=partner" className="btn-primary">Start a Conversation →</Link>
          </div>
        </div>
      </section>

      {/* Partnership options */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>Partnership Opportunities</h2>
            <div className="gold-divider" style={{ margin: '12px auto' }}></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              { icon: '📰', title: 'Sponsored Newsletter', body: 'Our newsletter reaches subscribers who opted in to receive retirement business listings. Sponsor a placement and reach buyers and sellers directly in their inbox.', who: 'Best for: Lenders, advisors, valuation services' },
              { icon: '🔗', title: 'Affiliate Partnership', body: 'Become a recommended partner for SBA financing, legal services, business valuation, or due diligence. We refer qualified buyers and sellers to your services.', who: 'Best for: SBA lenders, M&A attorneys, CPAs' },
              { icon: '📄', title: 'Sponsored Content', body: 'Publish educational content on FounderSunset that positions your firm as the expert. Co-branded guides, resource pages, and articles.', who: 'Best for: Established service providers' },
              { icon: '🎯', title: 'Display Sponsorship', body: 'Premium placement across high-traffic pages — listing pages, buyer guides, and industry landing pages.', who: 'Best for: Brands targeting acquisition buyers' },
            ].map(o => (
              <div key={o.title} className="card">
                <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{o.icon}</div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: 8 }}>{o.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>{o.body}</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--gold)', fontWeight: 600 }}>{o.who}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience stats */}
      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--white)' }}>Who You'll Reach</h2>
            <div className="gold-divider" style={{ margin: '12px auto' }}></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24, textAlign: 'center' }}>
            {[
              { stat: 'First-Time Buyers', desc: 'Aspiring owners seeking their first acquisition' },
              { stat: 'Search Funds', desc: 'Buyers with capital actively hunting for deals' },
              { stat: 'Retiring Owners', desc: 'Sellers planning a 1–3 year exit' },
              { stat: 'Industry Acquirers', desc: 'Existing operators expanding via acquisition' },
            ].map(a => (
              <div key={a.stat}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold)', marginBottom: 8 }}>{a.stat}</div>
                <p style={{ fontSize: '0.85rem', color: '#8899bb', lineHeight: 1.6 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--gold)', padding: '56px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--navy-dark)', marginBottom: 12 }}>Let's Build a Partnership</h2>
          <p style={{ color: 'rgba(15,35,71,0.7)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>Tell us about your business and we'll design a partnership that reaches your ideal customer.</p>
          <Link href="/contact?type=partner" className="btn-secondary" style={{ borderColor: 'var(--navy-dark)', color: 'var(--navy-dark)' }}>Contact Us →</Link>
        </div>
      </section>
    </div>
  )
}
