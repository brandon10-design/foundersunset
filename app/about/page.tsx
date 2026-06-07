import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About FounderSunset — Our Story & Mission',
  description: 'FounderSunset exists to honor the businesses retiring owners built and connect them with buyers ready to write the next chapter. Learn about the Silver Tsunami and our mission.',
}

export default function AboutPage() {
  return (
    <div>
      <section className="hero-bg" style={{ padding: '72px 0 64px' }}>
        <div className="container-sm" style={{ textAlign: 'center' }}>
          <span className="badge badge-gold" style={{ marginBottom: 16, display: 'inline-block' }}>Our Story</span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', marginBottom: 16 }}>
            Every Great Business Deserves a Worthy Successor
          </h1>
          <p style={{ color: '#aabbd4', fontSize: '1.1rem', lineHeight: 1.7 }}>
            FounderSunset is the only marketplace built exclusively for the moment a founder is ready to retire — and a new owner is ready to carry the torch.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-sm">
          <div className="prose">
            <h2>The Silver Tsunami</h2>
            <p>
              Across America, roughly 10,000 Baby Boomers reach retirement age every single day. Among them are millions of business owners — the plumbers, restaurateurs, manufacturers, and shopkeepers who built the backbone of the economy over decades of hard work.
            </p>
            <p>
              Economists call this wave of retirements the "Silver Tsunami." An estimated 2.9 million businesses are owned by Baby Boomers, representing trillions of dollars in value. Yet the majority of these owners have no succession plan. Many will simply close their doors when they retire — taking decades of built value, customer relationships, and jobs with them.
            </p>
            <blockquote>
              We believe a business someone spent 30 years building deserves better than to quietly disappear. It deserves a worthy successor.
            </blockquote>
            <h2>Why We Built FounderSunset</h2>
            <p>
              Generic business-for-sale marketplaces lump retirement sales in with distressed sales, burnout sales, and everything else. But a business sold by a proud retiring owner is fundamentally different: the books are cleaner, the seller is more motivated, the transition support is more generous, and the pricing is fairer.
            </p>
            <p>
              We created FounderSunset to surface exactly these opportunities — and to treat both the retiring founder and the incoming buyer with the respect this milestone deserves. For buyers, it's the smartest acquisition you can make. For sellers, it's a dignified way to find someone who will care for what you built.
            </p>
            <h2>How It Works</h2>
            <p>
              We aggregate retirement-driven business listings from across the market and present them in one focused, easy-to-search directory. We connect buyers with specialist brokers, financing partners, and the resources they need to close a deal. And we help retiring owners list their businesses where the right buyers are actually looking.
            </p>
            <p>
              Whether you're looking to buy your first business, acquire a competitor, or pass on the company you built — FounderSunset is where great businesses find their next chapter.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 32 }}>
            <Link href="/listings" className="btn-primary">Browse Listings →</Link>
            <Link href="/for-sellers" className="btn-secondary">List Your Business</Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>What We Stand For</h2>
            <div className="gold-divider" style={{ margin: '12px auto' }}></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {[
              { icon: '🤝', title: 'Respect', body: 'We honor the work that retiring founders poured into their businesses, and we treat buyers as serious partners, not leads.' },
              { icon: '🔍', title: 'Transparency', body: 'We\'re a discovery platform, not a brokerage. We\'re always clear about what we are and how we make money.' },
              { icon: '🌅', title: 'Continuity', body: 'We believe great businesses should live on. Our mission is keeping them alive through worthy successors.' },
            ].map(v => (
              <div key={v.title} className="card">
                <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{v.icon}</div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
