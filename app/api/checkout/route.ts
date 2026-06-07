import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Broker subscription checkout.
// Set STRIPE_SECRET_KEY, plus price IDs for each plan.
export async function POST(req: Request) {
  try {
    const { plan } = await req.json()

    const secret = process.env.STRIPE_SECRET_KEY
    if (!secret) {
      // Dev fallback so the flow is testable without keys.
      return NextResponse.json({ url: '/for-brokers?status=dev-no-stripe' })
    }

    const stripe = new Stripe(secret)

    // Map our plan slugs to Stripe price IDs (set these in env).
    const priceMap: Record<string, string | undefined> = {
      price_standard: process.env.STRIPE_PRICE_STANDARD,
      price_featured: process.env.STRIPE_PRICE_FEATURED,
    }
    const price = priceMap[plan]
    if (!price) {
      return NextResponse.json({ error: 'Unknown plan' }, { status: 400 })
    }

    const origin = req.headers.get('origin') || 'https://foundersunset.com'
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],
      success_url: `${origin}/for-brokers/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/for-brokers`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[checkout] error:', err)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
