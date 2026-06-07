import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import EmailCapture from '@/components/EmailCapture'

export const metadata: Metadata = {
  title: 'Resources — Guides for Buying & Selling Businesses',
  description: 'Expert guides on buying a business from a retiring owner, financing acquisitions, due diligence, business valuation, and planning your retirement exit.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <div style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--navy)', padding: '48px 0 40px' }}>
        <div className="container">
          <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Resources</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: 'var(--white)', marginBottom: 12 }}>
            Guides for Buyers & Sellers
          </h1>
          <p style={{ color: '#aabbd4', maxWidth: 560, lineHeight: 1.7 }}>
            Everything you need to know about buying and selling businesses in the age of the Silver Tsunami.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px' }}>
        {/* Featured post */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 280 }} className="featured-post">
              <div style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '4rem' }}>🌅</div>
              </div>
              <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                  <span className="badge badge-gold">Featured</span>
                  <span className="badge badge-navy">{featured.category}</span>
                </div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: 12, lineHeight: 1.3 }}>{featured.title}</h2>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>{featured.description}</p>
                <span style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 600 }}>{featured.readTime} · Read Guide →</span>
              </div>
            </div>
          </Link>
        )}

        {/* Post grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {rest.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  <span className={`badge ${post.audience === 'sellers' ? 'badge-gold' : 'badge-navy'}`}>{post.category}</span>
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: 10, lineHeight: 1.35 }}>{post.title}</h3>
                <p style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{post.description}</p>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 48, maxWidth: 480, margin: '48px auto 0' }}>
          <EmailCapture variant="inline" />
        </div>
      </div>

      <style>{`@media(max-width:768px){.featured-post{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}
