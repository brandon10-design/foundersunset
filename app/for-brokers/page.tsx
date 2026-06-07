import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'For Business Brokers — Join the FounderSunset Directory',
  description: 'Reach serious business buyers on FounderSunset. Join our broker directory and get featured to buyers specifically looking for retirement-driven acquisitions.',
}

const plans = [
  {
    name: 'Standard', price: 299, priceId: 'price_standard',
    description: 'Get listed in our broker directory',
    features: ['Broker profile page', 'Listed in directory', 'Your listings highlighted', 'Monthly analytics report', 'Contact form on profile'],
    cta: 'Get Listed', featured: false
  },
  {
    name: 'Featured', price: 499, priceId: 'price_featured',
    description: 'Maximum visibility and lead flow',
    features: ['Everything in Standard', '⭐ Featured badge & top placement', 'Newsletter feature (1x/quarter)', 'Priority listing display', 'Quarterly buyer lead report', 'Dedicated account support'],
    cta: 'Get Featured', featured: true
  },
]

export default function ForBrokersPage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-bg" style={{ padding: '72px 0 64px' }}>
        <div className="container">
          <div style={{ maxWidth: 640 }}>
            <span className="badge badge-gold" style={{ marginBottom: 16, display: 'inline-block' }}>For Business Brokers</span>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', marginBottom: 16 }}>
              Reach the Most Motivated Business Buyers in the Market
            </h1>
            <p style={{ color: '#aabbd4', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 28 }}>
              FounderSunset attracts buyers who specifically want retirement-driven acquisitions — motivated, serious, and ready to move. Not casual browsers. Not tire-kickers.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="#pricing" className="btn-primary">View Pricing →</Link>
              <Link href="/contact" className="btn-white">Talk to Us First</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why FounderSunset */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>Why Brokers Choose FounderSunset</h2>
            <div className="gold-divider" style={{ margin: '12px auto' }}></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { icon: '🎯', title: 'Pre-Qualified Intent', body: 'Every visitor came specifically looking for retirement business sales. No generic browsing — these are buyers with a clear intent to acquire.' },
              { icon: '📈', title: 'Silver Tsunami SEO', body: 'We\'re building the dominant SEO position for "business for sale retiring owner" and related terms. Your listings ride that traffic.' },
              { icon: '✉️', title: 'Engaged Email List', body: 'Our subscribers opted in to get notified of retirement listings in their target industry. Direct access to your exact buyer profile.' },
              { icon: '🏆', title: 'Niche Authority', body: 'FounderSunset is becoming the go-to brand for retirement business sales. Being listed here signals credibility to buyers.' },
            ].map(f => (
              <div key={f.title} className="card">
                <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{f.icon}</div>
                <h3 style={{ fontSize: '1rem', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>Simple Monthly Pricing</h2>
            <div className="gold-divider" style={{ margin: '12px auto 16px' }}></div>
            <p style={{ color: 'var(--text-secondary)' }}>No setup fees. Cancel anytime. 30-day money-back guarantee.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 700, margin: '0 auto' }}>
            {plans.map(plan => (
              <div key={plan.name} style={{ background: plan.featured ? 'var(--navy)' : 'var(--white)', border: plan.featured ? 'none' : '1px solid var(--border)', borderRadius: 10, padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
                {plan.featured && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--gold)' }}></div>}
                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: plan.featured ? 'var(--gold)' : 'var(--text-muted)', marginBottom: 12 }}>{plan.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', fontWeight: 700, color: plan.featured ? 'var(--white)' : 'var(--navy)' }}>${plan.price}</span>
                  <span style={{ fontSize: '0.85rem', color: plan.featured ? '#8899bb' : 'var(--text-muted)' }}>/month</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: plan.featured ? '#8899bb' : 'var(--text-secondary)', marginBottom: 24 }}>{plan.description}</p>
                <ul style={{ listStyle: 'none', marginBottom: 28 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.87rem', color: plan.featured ? '#aabbd4' : 'var(--text-secondary)', marginBottom: 10 }}>
                      <span style={{ color: 'var(--gold)', fontWeight: 700, marginTop: 1 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/for-brokers/checkout?plan=${plan.priceId}`} className={plan.featured ? 'btn-primary' : 'btn-secondary'} style={{ display: 'block', textAlign: 'center', width: '100%', justifyContent: 'center' }}>
                  {plan.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container-sm">
          <h2 style={{ fontSize: '1.8rem', marginBottom: 32, textAlign: 'center' }}>Common Questions</h2>
          {[
            { q: 'How quickly will my profile go live?', a: 'Within 24 hours of completing your subscription. We\'ll reach out to collect your bio, specialties, and photo.' },
            { q: 'Can I cancel anytime?', a: 'Yes. No contracts, no cancellation fees. Cancel through your account dashboard and your listing stays up through the end of the billing period.' },
            { q: 'How many brokers are in the directory?', a: 'We\'re selective — we only list brokers who specialize in retirement-driven sales. This keeps quality high and competition meaningful.' },
            { q: 'Can I feature my listings on FounderSunset?', a: 'Yes — Featured plan subscribers have their listings prominently displayed. Contact us to discuss how to import your active retirement listings.' },
          ].map(faq => (
            <div key={faq.q} style={{ borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: 8 }}>{faq.q}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--gold)', padding: '56px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--navy-dark)', marginBottom: 12 }}>Ready to Reach Serious Buyers?</h2>
          <p style={{ color: 'rgba(15,35,71,0.7)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>Join the only directory exclusively serving the retirement business sale market.</p>
          <Link href="#pricing" className="btn-secondary" style={{ borderColor: 'var(--navy-dark)', color: 'var(--navy-dark)' }}>Get Listed Today →</Link>
        </div>
      </section>
    </div>
  )
}
