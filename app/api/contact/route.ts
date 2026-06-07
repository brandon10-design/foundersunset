import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Store the inquiry in Supabase (table: contact_submissions).
    // Falls back to logging if Supabase isn't configured yet.
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { error } = await supabase.from('contact_submissions').insert({
        name, email, subject, message, created_at: new Date().toISOString(),
      })
      if (error) console.error('[contact] supabase error:', error.message)
    } else {
      console.log('[contact] (no Supabase) submission:', { name, email, subject })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
