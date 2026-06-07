import Link from 'next/link'

export default function BrokerWelcomePage() {
  return (
    <div style={{ background: 'var(--off-white)', minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '48px 0' }}>
      <div className="container-sm" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎉</div>
        <h1 style={{ fontSize: '2rem', marginBottom: 12 }}>Welcome to FounderSunset!</h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 28px' }}>
          Your subscription is confirmed. We'll review your profile and have it live in the broker directory within 24 hours. Keep an eye on your inbox — we may reach out for a photo or additional details.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/brokers" className="btn-primary">View the Directory →</Link>
          <Link href="/" className="btn-secondary">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
