import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import Analytics from '@/components/Analytics'

export const metadata: Metadata = {
  title: { default: 'FounderSunset — Businesses For Sale by Retiring Owners', template: '%s | FounderSunset' },
  description: 'The only business-for-sale directory exclusively featuring listings from retiring owners. Browse motivated sellers, clean books, and businesses built to last.',
  keywords: ['businesses for sale by retiring owner', 'buy a business from retiring owner', 'retiring owner business for sale', 'silver tsunami business acquisitions'],
  openGraph: {
    type: 'website', siteName: 'FounderSunset',
    title: 'FounderSunset — Businesses For Sale by Retiring Owners',
    description: 'The only business-for-sale directory exclusively featuring listings from retiring owners.',
  },
  metadataBase: new URL('https://foundersunset.com'),
  verification: {
    // Set NEXT_PUBLIC_GSC_VERIFICATION to your Google Search Console verification code.
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  )
}
