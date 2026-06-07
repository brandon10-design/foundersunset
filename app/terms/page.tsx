import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms governing your use of FounderSunset.',
}

export default function TermsPage() {
  return (
    <div style={{ background: 'var(--off-white)', minHeight: '80vh', padding: '48px 0 64px' }}>
      <div className="container-sm">
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', marginBottom: 8 }}>Terms of Service</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 32 }}>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>

        <div style={{ background: 'var(--gold-pale)', border: '1px solid #e8d18a', borderRadius: 6, padding: '14px 18px', marginBottom: 32 }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <strong>Template notice:</strong> This is starter language to get you live. Have a qualified attorney review and tailor it to your business before relying on it.
          </p>
        </div>

        <div className="prose">
          <h2>Acceptance of Terms</h2>
          <p>By accessing or using FounderSunset.com (the "Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>

          <h2>What FounderSunset Is</h2>
          <p>FounderSunset is a discovery platform that aggregates and displays business-for-sale listings, with a focus on businesses being sold by retiring owners. We are not a business broker, and we do not represent buyers or sellers in any transaction. We do not facilitate, negotiate, or close sales.</p>

          <h2>No Warranty on Listings</h2>
          <p>Listings are aggregated from public marketplaces and third-party sources. We do not verify the accuracy, completeness, availability, or current status of any listing. Listings may be outdated, sold, or contain errors. You are responsible for independently verifying all information directly with the broker or seller before taking any action.</p>

          <h2>Not Financial, Legal, or Investment Advice</h2>
          <p>Content on FounderSunset, including guides and resources, is for general informational purposes only and is not financial, legal, tax, or investment advice. Buying or selling a business is a significant decision. Consult qualified professionals before acting.</p>

          <h2>Broker Subscriptions</h2>
          <p>Brokers who subscribe to be listed in our directory agree to provide accurate information and to comply with all applicable laws and licensing requirements. Subscriptions are billed on a recurring basis and may be cancelled at any time; cancellation stops future billing but does not refund the current period except as described at signup.</p>

          <h2>Affiliate Relationships</h2>
          <p>FounderSunset may earn referral fees or commissions when you engage certain third-party services we recommend, such as lenders, attorneys, or valuation providers. These relationships do not add cost to you and do not influence the factual content of our resources.</p>

          <h2>Acceptable Use</h2>
          <p>You agree not to scrape, copy, or republish our content without permission, interfere with the Service, misuse contact information found on the site, or use the Service for any unlawful purpose.</p>

          <h2>Intellectual Property</h2>
          <p>The FounderSunset name, branding, site design, and original content are our property. Listing data belongs to its respective sources.</p>

          <h2>Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, FounderSunset is not liable for any indirect, incidental, or consequential damages arising from your use of the Service or reliance on any listing or content.</p>

          <h2>Changes to These Terms</h2>
          <p>We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the revised Terms.</p>

          <h2>Contact</h2>
          <p>Questions about these Terms? Email us at hello@foundersunset.com.</p>
        </div>
      </div>
    </div>
  )
}
