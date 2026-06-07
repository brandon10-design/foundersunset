'use client'
import { useEffect, useState } from 'react'
import Script from 'next/script'
import { getConsent } from './CookieConsent'

// Loads Google Analytics 4 ONLY after the user accepts analytics cookies.
// Set NEXT_PUBLIC_GA_ID (e.g. G-XXXXXXXXXX). With no consent or no ID, nothing loads.
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    setAllowed(getConsent() === 'accepted')
    function onChange(e: Event) {
      setAllowed((e as CustomEvent).detail === 'accepted')
    }
    window.addEventListener('fs-consent-change', onChange)
    return () => window.removeEventListener('fs-consent-change', onChange)
  }, [])

  if (!gaId || !allowed) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', { analytics_storage: 'granted' });
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
