import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/for-brokers/checkout'] },
    sitemap: 'https://foundersunset.com/sitemap.xml',
  }
}
