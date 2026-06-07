import type { Metadata } from 'next'
import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'

export const metadata: Metadata = {
  title: 'For Buyers — How to Buy a Business from a Retiring Owner',
  description: 'Learn how to buy an established business from a retiring owner. Step-by-step guidance on financing, due diligence, and closing your acquisition.',
}

export default function ForBuyersPage() {
  const steps = [
    { n: '01', title: 'Define Your Criteria', body: 'Decide on industry, location, price range, and cash flow targets. Our filters let you zero in on businesses that match exactly what you can finance and operate.' },
    { n: '02', title: 'Browse Retirement Listings', body: 'Every listing on FounderSunset comes from a retiring owner — motivated sellers with established operations and clean books. Save the ones that fit.' },
    { n: '03', title: 'Get Pre-Qualified for Financing', body: 'Most acquisitions use an SBA 7(a) loan. Getting pre-qualified early tells sellers you\'re serious and speeds up the close. We can connect you with lenders.' },
    { n: '04', title: 'Connect With the Broker or Seller', body: 'Reach out directly through the listing. Retiring owners are typically generous with their time and eager to find the right successor.' },
    { n: '05', title: 'Do Your Due Diligence', body: 'Review financials, contracts, customer concentration, and operations. Our due diligence checklist walks you through everything to verify.' },
    { n: '06', title: 'Close and Transition', body: 'Retiring owners often provide extensive training and seller financing. This transition support is one of the biggest advantages of buying from a retiree.' },
  ]

  return (
    <div>
      <section className="hero-bg" style={{ padding: '72px 0 64px' }}>
        <div className="container">
          <div style={{ maxWidth: 640 }}>
            <span className="badge badge-gold" style={{ marginBottom: 16, display: 'inline-block' }}>For Buyers</span>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', marginBottom: 16 }}>
              How to Buy a Business from a Retiring Owner
            </h1>
            <p style={{ color: '#aabbd4', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 28 }}>
              Buying from a retiring owner is the smartest acquisition you can make — motivated sellers, clean books, and generous transitions. Here's how to do it right.
            </p>
            <Link href="/listings" className="btn-primary">Browse Listings →</Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>The 6-Step Acquisition Process</h2>
            <div className="gold-divider" style={{ margin: '12px auto' }}></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {steps.map(s => (
              <div key={s.n} className="card">
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--gold)', marginBottom: 12 }}>{s.n}</div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SBA financing */}
      <section id="sba-loans" className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Financing</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 16 }}>How Most People Finance a Business Acquisition</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
              The SBA 7(a) loan is the most common path to buying an established small business. With as little as 10% down, qualified buyers can finance acquisitions up to $5 million. Seller financing from a retiring owner can often cover part of your down payment.
            </p>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: 18, marginBottom: 20 }}>
              <li>As little as 10% down payment</li>
              <li>Terms up to 10 years for business acquisition</li>
              <li>Retiring owners often carry a seller note</li>
              <li>Established cash flow makes qualifying easier</li>
            </ul>
            <a href="https://www.sba.gov/funding-programs/loans/7a-loans" target="_blank" rel="noopener noreferrer" className="btn-primary">Learn About SBA Loans →</a>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 10 }}>FounderSunset may earn a referral fee from financing partners at no cost to you.</p>
          </div>
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 8, padding: 32 }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 16 }}>Example Deal Structure</h3>
            {[
              ['Purchase Price', '$850,000'],
              ['SBA 7(a) Loan (80%)', '$680,000'],
              ['Seller Financing (10%)', '$85,000'],
              ['Buyer Down Payment (10%)', '$85,000'],
            ].map(([k, v], i) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{k}</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: i === 3 ? 'var(--gold)' : 'var(--navy)', fontFamily: 'Playfair Display, serif' }}>{v}</span>
              </div>
            ))}
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 16, lineHeight: 1.6 }}>Illustrative only. Actual terms vary by lender, business, and buyer qualifications.</p>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>Buyer Resources</h2>
            <div className="gold-divider" style={{ margin: '12px auto' }}></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {[
              { title: 'The Complete Acquisition Guide', desc: 'Everything you need to buy a business from a retiring owner.', href: '/blog/how-to-buy-business-retiring-owner' },
              { title: 'Due Diligence Checklist', desc: 'The complete checklist for verifying a business before you buy.', href: '/blog/due-diligence-checklist' },
              { title: '10 Questions to Ask a Retiring Owner', desc: 'Make sure you understand the business before committing.', href: '/blog/questions-to-ask-retiring-owner' },
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

      <EmailCapture variant="banner" />
    </div>
  )
}
