import type { Metadata } from 'next'
import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'

export const metadata: Metadata = {
  title: 'For Sellers — List Your Business When You Retire',
  description: 'Ready to retire? List your business on FounderSunset and reach buyers who value what you built. Free to list during our launch.',
}

export default function ForSellersPage() {
  return (
    <div>
      <section className="hero-bg" style={{ padding: '72px 0 64px' }}>
        <div className="container">
          <div style={{ maxWidth: 640 }}>
            <span className="badge badge-gold" style={{ marginBottom: 16, display: 'inline-block' }}>For Retiring Owners</span>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', marginBottom: 16 }}>
              You Built Something Worth Passing On
            </h1>
            <p style={{ color: '#aabbd4', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 28 }}>
              After years of building your business, you deserve to find a buyer who values what you created. FounderSunset connects you with serious buyers who specifically seek established businesses from retiring owners.
            </p>
            <Link href="#list" className="btn-primary">List Your Business →</Link>
          </div>
        </div>
      </section>

      {/* Why list */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>Why List on FounderSunset</h2>
            <div className="gold-divider" style={{ margin: '12px auto' }}></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              { icon: '🎯', title: 'Buyers Who Get It', body: 'Our buyers specifically want to buy from retiring owners. They understand and respect what it means to take over a business someone built over decades.' },
              { icon: '🤝', title: 'Quality Over Quantity', body: 'We attract serious, qualified buyers — not tire-kickers. The buyers browsing FounderSunset are ready to acquire and operate.' },
              { icon: '📣', title: 'Maximum Exposure', body: 'Your listing reaches our growing audience plus our email subscribers who get alerted to new businesses in your industry.' },
            ].map(f => (
              <div key={f.title} className="card">
                <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{f.icon}</div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section">
        <div className="container-sm">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>How It Works</h2>
            <div className="gold-divider" style={{ margin: '12px auto' }}></div>
          </div>
          {[
            { n: '1', title: 'Tell Us About Your Business', body: 'Fill out our listing form with the basics — industry, location, financials, and your story. Takes about 15 minutes.' },
            { n: '2', title: 'We Review and Publish', body: 'We review your listing to ensure quality, then publish it to our directory and notify matching buyers on our email list.' },
            { n: '3', title: 'Connect With Buyers', body: 'Interested buyers reach out directly. You can also choose to work with a broker from our directory to manage the process.' },
          ].map(s => (
            <div key={s.n} style={{ display: 'flex', gap: 20, marginBottom: 24, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'var(--navy-dark)', flexShrink: 0 }}>{s.n}</div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* List CTA / form */}
      <section id="list" className="section" style={{ background: 'var(--gold-pale)' }}>
        <div className="container-sm" style={{ textAlign: 'center' }}>
          <span className="badge badge-gold" style={{ marginBottom: 16, display: 'inline-block' }}>Launch Offer: Free to List</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: 12 }}>Ready to Find Your Successor?</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
            During our launch, listing your business is completely free. Tell us about what you built and we'll help you find the right buyer.
          </p>
          <Link href="/contact?type=seller" className="btn-primary">Start Your Listing →</Link>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 16 }}>
            Prefer to work with a broker? <Link href="/brokers" style={{ color: 'var(--gold)', fontWeight: 600 }}>Browse our broker directory →</Link>
          </p>
        </div>
      </section>

      {/* Resources */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>Resources for Sellers</h2>
            <div className="gold-divider" style={{ margin: '12px auto' }}></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {[
              { title: 'How to Sell Your Business When You Retire', desc: 'A step-by-step guide to a successful retirement exit.', href: '/blog/how-to-sell-business-retire' },
              { title: 'How Much Is Your Business Worth?', desc: 'Understand valuation before you go to market.', href: '/blog/how-to-value-small-business' },
              { title: 'Broker vs. Selling It Yourself', desc: 'What every retiring owner should know about brokers.', href: '/blog/business-broker-vs-selling-yourself' },
            ].map(r => (
              <Link key={r.href} href={r.href} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ height: '100%' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: 8 }}>{r.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>{r.desc}</p>
                  <span style={{ fontSize: '0.83rem', color: 'var(--gold)', fontWeight: 600 }}>Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
