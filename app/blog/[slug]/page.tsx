import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPost, getAllPostSlugs, getAllPosts } from '@/lib/blog'
import EmailCapture from '@/components/EmailCapture'

export async function generateStaticParams() {
  return getAllPostSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Not Found' }
  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: { title: post.meta.title, description: post.meta.description, type: 'article' },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const related = getAllPosts().filter(p => p.slug !== slug && p.audience === post.meta.audience).slice(0, 3)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    author: { '@type': 'Organization', name: 'FounderSunset' },
    publisher: { '@type': 'Organization', name: 'FounderSunset' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div style={{ background: 'var(--off-white)', borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
        <div className="container-sm">
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Resources</Link>
            <span>/</span>
            <span style={{ color: 'var(--navy)' }}>{post.meta.category}</span>
          </div>
        </div>
      </div>

      <article style={{ padding: '48px 0 64px' }}>
        <div className="container-sm">
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <span className={`badge ${post.meta.audience === 'sellers' ? 'badge-gold' : 'badge-navy'}`}>{post.meta.category}</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', alignSelf: 'center' }}>{post.meta.readTime}</span>
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: 'var(--navy)', lineHeight: 1.2, marginBottom: 16 }}>
              {post.meta.title}
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{post.meta.description}</p>
          </div>

          {/* Body */}
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* CTA */}
          <div style={{ marginTop: 40 }}>
            <EmailCapture variant="inline" />
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-sm" style={{ background: 'var(--off-white)' }}>
          <div className="container-sm">
            <h2 style={{ fontSize: '1.3rem', marginBottom: 24 }}>Related Reading</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {related.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 8, padding: '18px 22px', transition: 'all 0.2s' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: 4 }}>{p.title}</h3>
                    <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>{p.readTime} · {p.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
