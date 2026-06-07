import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How FounderSunset collects, uses, and protects your information.',
}

export default function PrivacyPage() {
  return (
    <div style={{ background: 'var(--off-white)', minHeight: '80vh', padding: '48px 0 64px' }}>
      <div className="container-sm">
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 32 }}>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>

        <div style={{ background: 'var(--gold-pale)', border: '1px solid #e8d18a', borderRadius: 6, padding: '14px 18px', marginBottom: 32 }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <strong>Template notice:</strong> This is starter language to get you live. Have a qualified attorney review and tailor it to your actual data practices and jurisdiction before relying on it.
          </p>
        </div>

        <div className="prose">
          <h2>Overview</h2>
          <p>FounderSunset.com ("FounderSunset," "we," "us") respects your privacy. This policy explains what information we collect, how we use it, and the choices you have. By using our site, you agree to the practices described here.</p>

          <h2>Information We Collect</h2>
          <p>We collect information you provide directly, such as your email address when you subscribe to our newsletter, and your name, email, and message when you contact us or sign up as a broker. We also collect limited technical information automatically, such as your browser type, device, and how you interact with our site, through standard analytics tools.</p>

          <h2>How We Use Your Information</h2>
          <p>We use your information to operate and improve the site, send you the listing alerts and newsletters you request, respond to your inquiries, process broker subscriptions, and communicate with you about our services. We do not sell your personal information.</p>

          <h2>Listing Data</h2>
          <p>Business listings displayed on FounderSunset are aggregated from publicly available business-for-sale marketplaces. We are a discovery platform and do not originate these listings. Listing details, including broker contact information, are sourced from public listings and may not be current.</p>

          <h2>Third-Party Services</h2>
          <p>We use third-party providers to operate our business, including email marketing (ConvertKit/Kit), payment processing (Stripe), and database hosting (Supabase). These providers process data on our behalf under their own privacy and security commitments. Payment information is handled entirely by Stripe; we never store your full payment details.</p>

          <h2>Cookies & Analytics</h2>
          <p>We use cookies and similar technologies to understand how the site is used and to improve your experience. You can control cookies through your browser settings. We choose privacy-respecting defaults wherever practical.</p>

          <h2>Your Choices</h2>
          <p>You can unsubscribe from our emails at any time using the link in any message. You may request access to, correction of, or deletion of your personal information by contacting us at hello@foundersunset.com.</p>

          <h2>Data Security</h2>
          <p>We take reasonable measures to protect your information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.</p>

          <h2>Children's Privacy</h2>
          <p>Our site is intended for business professionals and is not directed to children under 18. We do not knowingly collect information from children.</p>

          <h2>Changes to This Policy</h2>
          <p>We may update this policy from time to time. We will post the revised version here with an updated date.</p>

          <h2>Contact</h2>
          <p>Questions about this policy? Email us at hello@foundersunset.com.</p>
        </div>
      </div>
    </div>
  )
}
