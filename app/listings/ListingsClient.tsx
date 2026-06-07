'use client'
import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import ListingCard from '@/components/ListingCard'
import EmailCapture from '@/components/EmailCapture'
import { formatCurrency, Listing } from '@/lib/supabase'

function ListingsContent({ allListings }: { allListings: Listing[] }) {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    industry: searchParams.get('industry') || '',
    state: '',
    minPrice: '',
    maxPrice: searchParams.get('maxPrice') || '',
    minRevenue: '',
    minAge: '',
    reasonForSelling: 'retirement',
    search: '',
  })
  const [sortBy, setSortBy] = useState('featured')

  const states = [...new Set(allListings.map(l => l.state))].sort()
  const industries = [...new Set(allListings.map(l => l.category.split('>')[0].trim()))].sort()

  const filtered = useMemo(() => {
    let list = [...allListings]
    if (filters.search) list = list.filter(l => l.listingTitle.toLowerCase().includes(filters.search.toLowerCase()) || l.description.toLowerCase().includes(filters.search.toLowerCase()) || l.location.toLowerCase().includes(filters.search.toLowerCase()))
    if (filters.industry) list = list.filter(l => l.category.toLowerCase().includes(filters.industry.toLowerCase()))
    if (filters.state) list = list.filter(l => l.state === filters.state)
    if (filters.maxPrice) list = list.filter(l => l.askingPrice && l.askingPrice <= parseInt(filters.maxPrice))
    if (filters.minRevenue) list = list.filter(l => l.grossRevenue && l.grossRevenue >= parseInt(filters.minRevenue))
    if (filters.minAge) list = list.filter(l => l.yearEstablished && (new Date().getFullYear() - l.yearEstablished) >= parseInt(filters.minAge))
    if (filters.reasonForSelling === 'retirement') list = list.filter(l => l.reasonForSelling && l.reasonForSelling.toLowerCase().match(/retir|retirement|retiring/))
    if (sortBy === 'featured') list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    else if (sortBy === 'price_asc') list.sort((a, b) => (a.askingPrice || 0) - (b.askingPrice || 0))
    else if (sortBy === 'price_desc') list.sort((a, b) => (b.askingPrice || 0) - (a.askingPrice || 0))
    else if (sortBy === 'cashflow') list.sort((a, b) => (b.cashFlow || 0) - (a.cashFlow || 0))
    else if (sortBy === 'newest') list.sort((a, b) => new Date(b.scrapedAt).getTime() - new Date(a.scrapedAt).getTime())
    return list
  }, [filters, sortBy])

  return (
    <div style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--navy)', padding: '40px 0 32px' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: 'var(--white)', marginBottom: 8 }}>
            Browse Retirement Listings
          </h1>
          <p style={{ color: '#8899bb', fontSize: '1rem' }}>
            {filtered.length} businesses for sale by retiring owners
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 28, alignItems: 'start' }}>

          {/* Sidebar filters */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 8, padding: 24, position: 'sticky', top: 80 }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 20 }}>Filter Listings</h3>

            {/* Search */}
            <div style={{ marginBottom: 20 }}>
              <label className="label">Keyword Search</label>
              <input type="text" placeholder="Business name, location..." className="input" value={filters.search} onChange={e => setFilters(p => ({ ...p, search: e.target.value }))} />
            </div>

            {/* Reason for selling — default retirement */}
            <div style={{ marginBottom: 20, background: 'var(--gold-pale)', border: '1px solid #e8d18a', borderRadius: 6, padding: 12 }}>
              <label className="label" style={{ marginBottom: 8 }}>Reason for Selling</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={filters.reasonForSelling === 'retirement'} onChange={e => setFilters(p => ({ ...p, reasonForSelling: e.target.checked ? 'retirement' : '' }))} style={{ accentColor: 'var(--gold)' }} />
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--navy)' }}>🌅 Retiring Owner Only</span>
              </label>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>FounderSunset default — our specialty</p>
            </div>

            {/* Industry */}
            <div style={{ marginBottom: 20 }}>
              <label className="label">Industry</label>
              <select className="input" value={filters.industry} onChange={e => setFilters(p => ({ ...p, industry: e.target.value }))}>
                <option value="">All Industries</option>
                {industries.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>

            {/* State */}
            <div style={{ marginBottom: 20 }}>
              <label className="label">State</label>
              <select className="input" value={filters.state} onChange={e => setFilters(p => ({ ...p, state: e.target.value }))}>
                <option value="">All States</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Price range */}
            <div style={{ marginBottom: 20 }}>
              <label className="label">Max Asking Price</label>
              <select className="input" value={filters.maxPrice} onChange={e => setFilters(p => ({ ...p, maxPrice: e.target.value }))}>
                <option value="">No Limit</option>
                <option value="250000">Under $250K</option>
                <option value="500000">Under $500K</option>
                <option value="1000000">Under $1M</option>
                <option value="2500000">Under $2.5M</option>
                <option value="5000000">Under $5M</option>
              </select>
            </div>

            {/* Min revenue */}
            <div style={{ marginBottom: 20 }}>
              <label className="label">Min Annual Revenue</label>
              <select className="input" value={filters.minRevenue} onChange={e => setFilters(p => ({ ...p, minRevenue: e.target.value }))}>
                <option value="">Any Revenue</option>
                <option value="100000">$100K+</option>
                <option value="250000">$250K+</option>
                <option value="500000">$500K+</option>
                <option value="1000000">$1M+</option>
              </select>
            </div>

            {/* Business age */}
            <div style={{ marginBottom: 24 }}>
              <label className="label">Min Years in Business</label>
              <select className="input" value={filters.minAge} onChange={e => setFilters(p => ({ ...p, minAge: e.target.value }))}>
                <option value="">Any Age</option>
                <option value="5">5+ years</option>
                <option value="10">10+ years</option>
                <option value="15">15+ years</option>
                <option value="20">20+ years</option>
              </select>
            </div>

            <button onClick={() => setFilters({ industry: '', state: '', minPrice: '', maxPrice: '', minRevenue: '', minAge: '', reasonForSelling: 'retirement', search: '' })}
              style={{ width: '100%', background: 'none', border: '1px solid var(--border)', borderRadius: 4, padding: '9px', fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
              Clear Filters
            </button>

            {/* Email capture in sidebar */}
            <div style={{ marginTop: 24 }}>
              <EmailCapture variant="inline" />
            </div>
          </div>

          {/* Listings grid */}
          <div>
            {/* Sort bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--navy)' }}>{filtered.length}</strong> listings found
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <label style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>Sort:</label>
                <select className="input" value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: 'auto', padding: '7px 12px', fontSize: '0.85rem' }}>
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="cashflow">Highest Cash Flow</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 8, padding: 48, textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔍</div>
                <h3 style={{ marginBottom: 8 }}>No listings match your filters</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Try adjusting your filters or subscribe to get alerted when matching listings arrive.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
                {filtered.map(l => <ListingCard key={l.id} listing={l} />)}
              </div>
            )}

            {/* Disclaimer */}
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 6, padding: '14px 18px', marginTop: 24 }}>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <strong>Note:</strong> Listings are sourced from public business-for-sale marketplaces and may no longer be available. Always verify current status with the listing source before proceeding. FounderSunset is a discovery platform, not a brokerage.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width: 900px) {
          .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

export default function ListingsClient({ allListings }: { allListings: Listing[] }) {
  return <Suspense fallback={<div style={{ padding: 48, textAlign: 'center' }}>Loading listings...</div>}><ListingsContent allListings={allListings} /></Suspense>
}
