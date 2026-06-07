import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// Stripe webhook: marks a broker active when their subscription is created,
// and inactive when it's cancelled. Set STRIPE_WEBHOOK_SECRET.
export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const stripe = new Stripe(secret)
  const sig = req.headers.get('stripe-signature')
  const body = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret)
  } catch (err) {
    console.error('[stripe] signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const admin = supabaseUrl && serviceKey ? createClient(supabaseUrl, serviceKey) : null

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      if (admin && session.customer_email) {
        await admin.from('brokers').update({
          subscription_status: 'active',
          stripe_customer_id: session.customer as string,
        }).eq('email', session.customer_email)
      }
      console.log('[stripe] broker subscription activated:', session.customer_email)
      break
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      if (admin) {
        await admin.from('brokers').update({ subscription_status: 'cancelled' })
          .eq('stripe_customer_id', sub.customer as string)
      }
      console.log('[stripe] broker subscription cancelled:', sub.customer)
      break
    }
  }

  return NextResponse.json({ received: true })
}
