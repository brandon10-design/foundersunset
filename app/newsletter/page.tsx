import type { Metadata } from 'next'
import EmailCapture from '@/components/EmailCapture'

export const metadata: Metadata = {
  title: 'Newsletter — Get New Retirement Listings in Your Inbox',
  description: 'Subscribe to the FounderSunset newsletter for weekly alerts on new businesses for sale from retiring owners in your target industry.',
}

export default function NewsletterPage() {
  return (
    <div style={{ background: 'var(--off-white)', minHeight: '80vh' }}>
      <section className="hero-bg" style={{ padding: '64px 0 56px' }}>
        <div className="container-sm" style={{ textAlign: 'center' }}>
          <span className="badge badge-gold" style={{ marginBottom: 16, display: 'inline-block' }}>Free Weekly Newsletter</span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--white)', marginBottom: 16 }}>
            Never Miss a Great Listing
          </h1>
          <p style={{ color: '#aabbd4', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Get a weekly digest of new businesses for sale from retiring owners — filtered to the industries you care about.
          </p>
        </div>
      </section>

      <div className="container-sm" style={{ padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 20 }}>What You'll Get</h2>
            {[
              { icon: '📬', title: 'Weekly Listing Digest', body: 'New retirement-driven businesses, delivered every week.' },
              { icon: '🎯', title: 'Industry Filtering', body: 'Only hear about the industries you actually want.' },
              { icon: '📚', title: 'Buyer Resources', body: 'Tips on financing, due diligence, and closing deals.' },
              { icon: '🔔', title: 'First to Know', body: 'Get alerted before listings get picked over.' },
            ].map(b => (
              <div key={b.title} style={{ display: 'flex', gap: 14, marginBottom: 20, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.4rem' }}>{b.icon}</span>
                <div>
                  <h3 style={{ fontSize: '0.98rem', marginBottom: 2 }}>{b.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{b.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <EmailCapture variant="inline" />
          </div>
        </div>
      </div>
      <style>{`@media(max-width:700px){.container-sm > div{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}
