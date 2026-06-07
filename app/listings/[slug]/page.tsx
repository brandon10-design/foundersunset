import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getListings, getListingBySlug } from '@/lib/data'
import { formatCurrency, calculateBusinessAge, getIndustryFromCategory } from '@/lib/supabase'
import type { Metadata } from 'next'
import EmailCapture from '@/components/EmailCapture'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListingBySlug(slug)
  if (!listing) return { title: 'Listing Not Found' }
  return {
    title: `${listing.listingTitle} — For Sale by Retiring Owner`,
    description: `${listing.listingTitle} in ${listing.location}. Asking ${formatCurrency(listing.askingPrice)}, cash flow ${formatCurrency(listing.cashFlow)}. Owner retiring. ${listing.description.slice(0, 120)}...`,
  }
}

export default async function ListingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const listing = await getListingBySlug(slug)
  if (!listing) notFound()
  const allListings = await getListings()

  const age = calculateBusinessAge(listing.yearEstablished)
  const industry = getIndustryFromCategory(listing.category)
  const related = allListings.filter(l => l.id !== listing.id && l.category.split('>')[0].trim() === industry).slice(0, 3)

  const metrics = [
    { label: 'Asking Price', value: formatCurrency(listing.askingPrice), highlight: true },
    { label: 'Cash Flow (SDE)', value: formatCurrency(listing.cashFlow), green: true },
    { label: 'Gross Revenue', value: formatCurrency(listing.grossRevenue), highlight: false },
    { label: 'EBITDA', value: formatCurrency(listing.ebitda), highlight: false },
  ]

  const details = [
    { label: 'Location', value: listing.location },
    { label: 'Industry', value: industry },
    { label: 'Year Established', value: listing.yearEstablished?.toString() || 'N/A' },
    { label: 'Years in Business', value: age },
    { label: 'Employees', value: listing.numberOfEmployees || 'N/A' },
    { label: 'Real Estate', value: listing.realEstate || 'N/A' },
    { label: 'Home-Based', value: listing.homeBased || 'No' },
    { label: 'Building Size', value: listing.buildingSf ? `${listing.buildingSf.toLocaleString()} sq ft` : 'N/A' },
    { label: 'Reason for Selling', value: listing.reasonForSelling || 'N/A' },
    { label: 'Franchise', value: listing.franchise || 'Independent' },
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: listing.listingTitle,
    description: listing.description,
    offers: { '@type': 'Offer', price: listing.askingPrice, priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
    location: { '@type': 'Place', name: listing.location },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Breadcrumb */}
      <div style={{ background: 'var(--off-white)', borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/listings" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Listings</Link>
            <span>/</span>
            <span style={{ color: 'var(--navy)' }}>{listing.listingTitle}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '36px 0 64px', background: 'var(--off-white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 28, alignItems: 'start' }}>

            {/* Main content */}
            <div>
              {/* Header card */}
              <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 8, padding: '28px 32px', marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
                  <span className="badge badge-navy">{industry}</span>
                  <span className="badge badge-green">🌅 Owner Retiring</span>
                  {listing.featured && <span className="badge badge-gold">⭐ Featured</span>}
                </div>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--navy)', marginBottom: 8 }}>
                  {listing.listingTitle}
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 20 }}>📍 {listing.location}</p>

                {/* Key metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
                  {metrics.map(m => (
                    <div key={m.label} style={{ background: 'var(--off-white)', borderRadius: 6, padding: '14px 16px' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 4 }}>{m.label}</div>
                      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, color: m.green ? '#2e7d32' : 'var(--navy)' }}>{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 8, padding: '28px 32px', marginBottom: 20 }}>
                <h2 style={{ fontSize: '1.15rem', marginBottom: 16 }}>About This Business</h2>
                <div className="gold-divider"></div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{listing.description}</p>
              </div>

              {/* Details grid */}
              <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 8, padding: '28px 32px', marginBottom: 20 }}>
                <h2 style={{ fontSize: '1.15rem', marginBottom: 16 }}>Business Details</h2>
                <div className="gold-divider"></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                  {details.map(d => (
                    <div key={d.label} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 4 }}>{d.label}</div>
                      <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 500 }}>{d.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opportunity sections */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                {[
                  { title: 'Growth Opportunity', icon: '📈', content: listing.growthOpportunity },
                  { title: 'Financing Available', icon: '💳', content: listing.financing },
                  { title: 'Support & Training', icon: '🤝', content: listing.supportAndTraining },
                  { title: 'Facilities & Equipment', icon: '🏢', content: listing.facilities },
                ].filter(s => s.content).map(s => (
                  <div key={s.title} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 8, padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
                      <h3 style={{ fontSize: '0.95rem' }}>{s.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.content}</p>
                  </div>
                ))}
              </div>

              {/* Affiliate section */}
              <div style={{ background: 'var(--gold-pale)', border: '1px solid #e8d18a', borderRadius: 8, padding: '24px 28px', marginBottom: 20 }}>
                <h3 style={{ fontSize: '1rem', marginBottom: 6 }}>Ready to Move Forward?</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: 16 }}>Get the professional support you need to close this acquisition:</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <Link href="/for-buyers#sba-loans" className="btn-primary" style={{ fontSize: '0.83rem', padding: '9px 16px' }}>Get SBA Financing →</Link>
                  <Link href="/brokers" className="btn-secondary" style={{ fontSize: '0.83rem', padding: '8px 16px' }}>Find a Broker</Link>
                  <Link href="/blog/due-diligence-checklist" className="btn-secondary" style={{ fontSize: '0.83rem', padding: '8px 16px' }}>Due Diligence Guide</Link>
                </div>
              </div>

              {/* Source disclaimer */}
              <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 6, padding: '14px 18px' }}>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  ⚠️ <strong>Verify listing status:</strong> This listing was sourced from a public marketplace and may have sold or been updated. Always verify current availability directly with the broker or seller before proceeding.
                  {listing.url && <> <a href={listing.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>View original listing →</a></>}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Broker card */}
              {listing.brokerName && (
                <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 8, padding: 24, marginBottom: 20 }}>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Listed By</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 44, height: 44, background: 'var(--navy)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', color: 'var(--white)', fontFamily: 'Playfair Display, serif' }}>
                      {listing.brokerName[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--navy)', fontSize: '0.95rem' }}>{listing.brokerName}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{listing.brokerFirm}</div>
                    </div>
                  </div>
                  {listing.brokerPhone && (
                    <a href={`tel:${listing.brokerPhone}`} className="btn-primary" style={{ display: 'block', textAlign: 'center', marginBottom: 10 }}>
                      📞 {listing.brokerPhone}
                    </a>
                  )}
                  {listing.agentUrl && listing.agentUrl !== '#' && (
                    <a href={listing.agentUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'block', textAlign: 'center', fontSize: '0.85rem' }}>View Broker Profile</a>
                  )}
                </div>
              )}

              {/* Quick facts */}
              <div style={{ background: 'var(--navy)', borderRadius: 8, padding: 24, marginBottom: 20 }}>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Quick Facts</h3>
                {[
                  { label: 'FF&E', value: listing.ffe },
                  { label: 'Inventory', value: listing.inventory },
                  { label: 'Established', value: listing.yearEstablished?.toString() },
                  { label: 'Employees', value: listing.numberOfEmployees },
                ].filter(f => f.value).map(f => (
                  <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '0.83rem' }}>
                    <span style={{ color: '#8899bb' }}>{f.label}</span>
                    <span style={{ color: 'var(--white)', fontWeight: 500 }}>{f.value}</span>
                  </div>
                ))}
              </div>

              {/* Email capture */}
              <EmailCapture variant="inline" industry={getIndustryFromCategory(listing.category)} />
            </div>
          </div>

          {/* Related listings */}
          {related.length > 0 && (
            <div style={{ marginTop: 48 }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: 24 }}>Similar {industry} Businesses</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
                {related.map(l => <Link key={l.id} href={`/listings/${l.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="listing-card" style={{ background: 'var(--white)' }}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.95rem', color: 'var(--navy)', marginBottom: 6 }}>{l.listingTitle}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 10 }}>📍 {l.location}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--navy)' }}>{formatCurrency(l.askingPrice)}</span>
                      <span style={{ color: '#2e7d32', fontWeight: 600 }}>CF: {formatCurrency(l.cashFlow)}</span>
                    </div>
                  </div>
                </Link>)}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`@media(max-width:900px){.container > div > div:first-child{grid-template-columns:1fr!important}}`}</style>
    </>
  )
}
