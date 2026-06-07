import Link from 'next/link'
import { Listing, formatCurrency, calculateBusinessAge, getIndustryFromCategory } from '@/lib/supabase'

export default function ListingCard({ listing }: { listing: Listing }) {
  const age = calculateBusinessAge(listing.yearEstablished)
  const industry = getIndustryFromCategory(listing.category)

  return (
    <Link href={`/listings/${listing.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div className="listing-card">
        {listing.featured && (
          <div style={{ position: 'absolute', top: 14, right: 14 }}>
            <span className="badge badge-gold">⭐ Featured</span>
          </div>
        )}

        {/* Header */}
        <div style={{ marginBottom: 14, paddingRight: listing.featured ? 90 : 0 }}>
          <span className="badge badge-navy" style={{ marginBottom: 10 }}>{industry}</span>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 600, color: 'var(--navy)', lineHeight: 1.3 }}>
            {listing.listingTitle}
          </h3>
          <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginTop: 4 }}>
            📍 {listing.location}
          </p>
        </div>

        {/* Key metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 14, padding: '14px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Asking Price</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700, color: 'var(--navy)' }}>{formatCurrency(listing.askingPrice)}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Cash Flow</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700, color: '#2e7d32' }}>{formatCurrency(listing.cashFlow)}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Revenue</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700, color: 'var(--navy)' }}>{formatCurrency(listing.grossRevenue)}</div>
          </div>
        </div>

        {/* Description preview */}
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {listing.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span className="badge badge-green">🌅 Owner Retiring</span>
            {age !== 'N/A' && <span className="badge badge-navy">{age} in business</span>}
            {listing.homeBased === 'Home-Based' && <span className="badge badge-navy">Home-Based</span>}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600 }}>View Details →</span>
        </div>
      </div>
    </Link>
  )
}
