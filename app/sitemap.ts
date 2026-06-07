import { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/blog'
import { getListings } from '@/lib/data'

const BASE = 'https://foundersunset.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ['', '/listings', '/brokers', '/for-buyers', '/for-sellers', '/for-brokers', '/advertise', '/about', '/contact', '/newsletter', '/blog']
  const industries = ['plumbing', 'hvac', 'landscaping', 'restaurant', 'cleaning', 'auto-repair', 'retail', 'manufacturing']

  const now = new Date()
  const listings = await getListings()

  return [
    ...staticPages.map(p => ({ url: `${BASE}${p}`, lastModified: now, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.8 })),
    ...industries.map(i => ({ url: `${BASE}/businesses/${i}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 })),
    ...getAllPostSlugs().map(s => ({ url: `${BASE}/blog/${s}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...listings.map(l => ({ url: `${BASE}/listings/${l.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.5 })),
  ]
}
