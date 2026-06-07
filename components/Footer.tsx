import Link from 'next/link'

const linkCol = (title: string, links: string[][]) => (
  <div>
    <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>{title}</div>
    {links.map(([label, href]) => (
      <Link key={href} href={href} className="footer-link">{label}</Link>
    ))}
  </div>
)

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy-dark)', color: 'var(--white)', paddingTop: 64, paddingBottom: 32 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, marginBottom: 12 }}>
              Founder<span style={{ color: 'var(--gold)' }}>Sunset</span>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#8899bb', lineHeight: 1.7, marginBottom: 20 }}>
              Where great businesses find their next chapter. The only directory exclusively featuring businesses for sale by retiring owners.
            </p>
            <span className="badge badge-gold">Silver Tsunami Specialists</span>
          </div>

          {linkCol('For Buyers', [['Browse All Listings', '/listings'], ['How It Works', '/for-buyers'], ['Find a Broker', '/brokers'], ['Buyer Resources', '/blog'], ['Acquisition Guide', '/blog/how-to-buy-business-retiring-owner']])}
          {linkCol('For Sellers', [['List Your Business', '/for-sellers'], ['Seller Resources', '/blog'], ['Find a Broker', '/brokers'], ['Business Valuation', '/blog/how-to-value-small-business']])}
          {linkCol('Company', [['About Us', '/about'], ['For Brokers', '/for-brokers'], ['Advertise', '/advertise'], ['Contact', '/contact'], ['Newsletter', '/newsletter']])}
        </div>

        <div style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 8, padding: '24px 32px', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 600, color: 'var(--white)', marginBottom: 4 }}>
              Get New Listings in Your Inbox
            </div>
            <p style={{ fontSize: '0.83rem', color: '#8899bb' }}>Weekly digest of new retirement-driven business listings.</p>
          </div>
          <Link href="/newsletter" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>Subscribe Free</Link>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: '0.8rem', color: '#8899bb' }}>
            © {new Date().getFullYear()} FounderSunset.com · All listings sourced from public marketplaces. Verify status with listing source.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link href="/privacy" className="footer-link" style={{ marginBottom: 0 }}>Privacy</Link>
            <Link href="/terms" className="footer-link" style={{ marginBottom: 0 }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
