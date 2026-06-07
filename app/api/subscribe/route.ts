import { NextResponse } from 'next/server'

// ConvertKit / Kit integration.
// Set KIT_API_KEY and KIT_FORM_ID in your environment.
export async function POST(req: Request) {
  try {
    const { email, industry } = await req.json()
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const apiKey = process.env.KIT_API_KEY
    const formId = process.env.KIT_FORM_ID

    // If not configured yet, accept gracefully so the UI works in dev.
    if (!apiKey || !formId) {
      console.log('[subscribe] (no Kit config) would subscribe:', email, 'industry:', industry)
      return NextResponse.json({ success: true, dev: true })
    }

    const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        email,
        fields: { industry: industry || 'All Industries' },
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('[subscribe] Kit error:', text)
      return NextResponse.json({ error: 'Subscription failed' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[subscribe] error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
