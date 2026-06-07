import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokers } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find a Business Broker — Retirement Sale Specialists',
  description: 'Browse business brokers who specialize in retirement-driven business sales. Find a trusted advisor to guide your acquisition or exit.',
}

export default async function BrokersPage() {
  const brokers = await getBrokers()
  return (
    <div style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--navy)', padding: '48px 0 40px' }}>
        <div className="container">
          <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Broker Directory</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: 'var(--white)', marginBottom: 12 }}>
            Find a Retirement Sale Specialist
          </h1>
          <p style={{ color: '#aabbd4', maxWidth: 560, lineHeight: 1.7 }}>
            Every broker in our directory specializes in retirement-driven business sales. They know how to work with retiring founders and guide buyers through smooth acquisitions.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 28, alignItems: 'start' }}>

          {/* Broker cards */}
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 20 }}>
              {brokers.length} brokers listed · <Link href="/for-brokers" style={{ color: 'var(--gold)' }}>Join the directory →</Link>
            </p>
            {brokers.map(broker => (
              <div key={broker.id} className="card" style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  {/* Avatar */}
                  <div style={{ width: 56, height: 56, background: 'var(--navy)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', color: 'var(--white)', fontFamily: 'Playfair Display, serif', flexShrink: 0 }}>
                    {broker.name[0]}
                  </div>
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: '1.05rem' }}>{broker.name}</h3>
                      {broker.featured && <span className="badge badge-gold">⭐ Featured</span>}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 600, marginBottom: 8 }}>{broker.firm}</p>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>{broker.bio}</p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                      {broker.specialties.map(s => <span key={s} className="badge badge-navy">{s}</span>)}
                    </div>
                    <div style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginBottom: 14 }}>
                      📍 Serves: {broker.states.join(', ')}
                    </div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <a href={`tel:${broker.phone}`} className="btn-primary" style={{ fontSize: '0.83rem', padding: '8px 16px' }}>📞 {broker.phone}</a>
                      <a href={`mailto:${broker.email}`} className="btn-secondary" style={{ fontSize: '0.83rem', padding: '7px 16px' }}>Email Broker</a>
                      {broker.website && <a href={broker.website} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: '0.83rem', padding: '7px 16px' }}>Visit Website</a>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div>
            <div style={{ background: 'var(--navy)', borderRadius: 8, padding: 28, marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: 'var(--white)', marginBottom: 10 }}>Are You a Broker?</h3>
              <p style={{ fontSize: '0.85rem', color: '#8899bb', lineHeight: 1.7, marginBottom: 20 }}>
                Join the FounderSunset broker directory and reach buyers who specifically seek retirement-driven acquisitions.
              </p>
              <ul style={{ fontSize: '0.83rem', color: '#8899bb', lineHeight: 1.9, marginBottom: 20, paddingLeft: 16 }}>
                <li>Featured broker profile</li>
                <li>Leads from qualified buyers</li>
                <li>Your listings highlighted</li>
                <li>Newsletter feature opportunities</li>
              </ul>
              <Link href="/for-brokers" className="btn-primary" style={{ display: 'block', textAlign: 'center' }}>Join for $299/mo →</Link>
            </div>

            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 8, padding: 24 }}>
              <h3 style={{ fontSize: '0.95rem', marginBottom: 10 }}>Working With a Broker</h3>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Business brokers in retirement sales are typically paid by the seller (5–10% of sale price). As a buyer, working with a broker costs you nothing and dramatically increases your chances of finding the right deal.
              </p>
              <Link href="/blog/business-broker-vs-selling-yourself" style={{ display: 'block', marginTop: 12, fontSize: '0.83rem', color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>Read: Broker vs. Selling Yourself →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
