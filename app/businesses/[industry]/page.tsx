import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ListingCard from '@/components/ListingCard'
import EmailCapture from '@/components/EmailCapture'
import { getListings } from '@/lib/data'

const INDUSTRIES: Record<string, { name: string; icon: string; blurb: string }> = {
  'plumbing': { name: 'Plumbing', icon: '🔧', blurb: 'Established plumbing businesses with recurring service contracts and loyal customer bases, sold by retiring owners.' },
  'hvac': { name: 'HVAC', icon: '❄️', blurb: 'Profitable HVAC installation and service companies from retiring owners — strong recurring revenue and skilled teams.' },
  'landscaping': { name: 'Landscaping', icon: '🌿', blurb: 'Landscaping and grounds maintenance businesses with recurring contracts, sold by owners ready to retire.' },
  'restaurant': { name: 'Restaurant', icon: '🍽️', blurb: 'Restaurants, cafés, and food businesses with established reputations and loyal customers, from retiring owners.' },
  'cleaning': { name: 'Cleaning', icon: '✨', blurb: 'Residential and commercial cleaning companies with recurring clients and trained staff, sold by retiring owners.' },
  'auto-repair': { name: 'Auto Repair', icon: '🚗', blurb: 'Auto repair shops with loyal customers, certified technicians, and established reputations, from retiring owners.' },
  'retail': { name: 'Retail', icon: '🏪', blurb: 'Established retail businesses with proven locations and customer bases, sold by owners ready to retire.' },
  'manufacturing': { name: 'Manufacturing', icon: '🏭', blurb: 'Manufacturing and production businesses with equipment, contracts, and skilled teams, from retiring owners.' },
}

export async function generateStaticParams() {
  return Object.keys(INDUSTRIES).map(industry => ({ industry }))
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry } = await params
  const info = INDUSTRIES[industry]
  if (!info) return { title: 'Not Found' }
  return {
    title: `${info.name} Businesses For Sale by Retiring Owners`,
    description: `Browse ${info.name.toLowerCase()} businesses for sale from retiring owners. ${info.blurb}`,
    keywords: [`buy a ${info.name.toLowerCase()} business from retiring owner`, `${info.name.toLowerCase()} business for sale retiring owner`, `${info.name.toLowerCase()} business for sale`],
  }
}

export default async function IndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params
  const info = INDUSTRIES[industry]
  if (!info) notFound()

  const allListings = await getListings()
  const listings = allListings.filter(l =>
    l.category.toLowerCase().includes(info.name.toLowerCase()) &&
    l.reasonForSelling.toLowerCase().match(/retir/)
  )

  return (
    <div style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
      <div className="hero-bg" style={{ padding: '56px 0 48px' }}>
        <div className="container">
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{info.icon}</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--white)', marginBottom: 14 }}>
            {info.name} Businesses For Sale by Retiring Owners
          </h1>
          <p style={{ color: '#aabbd4', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 620 }}>{info.blurb}</p>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <h2 style={{ fontSize: '1.3rem' }}>{listings.length} {info.name} {listings.length === 1 ? 'Business' : 'Businesses'} Available</h2>
          <Link href="/listings" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '8px 18px' }}>View All Industries →</Link>
        </div>

        {listings.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
            {listings.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        ) : (
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 8, padding: 48, textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{info.icon}</div>
            <h3 style={{ marginBottom: 8 }}>No {info.name} listings right now</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 20 }}>New listings are added monthly. Subscribe to be the first to know when a {info.name.toLowerCase()} business is listed.</p>
            <div style={{ maxWidth: 380, margin: '0 auto' }}><EmailCapture variant="minimal" industry={info.name} /></div>
          </div>
        )}

        {/* SEO content block */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 8, padding: '32px 36px', marginTop: 40 }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: 16 }}>Buying a {info.name} Business from a Retiring Owner</h2>
          <div className="prose">
            <p>
              Acquiring a {info.name.toLowerCase()} business from a retiring owner is one of the smartest moves a buyer can make. These businesses come with established customer relationships, trained staff, proven cash flow, and an owner who's motivated to ensure a smooth handoff.
            </p>
            <p>
              Retiring owners in the {info.name.toLowerCase()} industry typically offer generous transition support and are often willing to provide seller financing — making these acquisitions more accessible and lower-risk than starting from scratch or buying from a distressed seller.
            </p>
            <p>
              Browse our current {info.name.toLowerCase()} listings above, or <Link href="/newsletter">subscribe for alerts</Link> when new businesses hit the market. Ready to finance an acquisition? <Link href="/for-buyers#sba-loans">Learn about SBA loans</Link>.
            </p>
          </div>
        </div>
      </div>

      <EmailCapture variant="banner" />
    </div>
  )
}
