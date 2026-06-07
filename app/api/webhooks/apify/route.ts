import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { isRetirementListing, getCategorySlug } from '@/lib/supabase'

// Apify calls this webhook when a scraper run finishes.
// It fetches the dataset, filters to retirement listings, and upserts to Supabase.
// Protect with a shared secret: set APIFY_WEBHOOK_SECRET and pass ?secret=... in the webhook URL.

function slugify(title: string, location: string): string {
  return `${title}-${location}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url)
    const secret = url.searchParams.get('secret')
    if (process.env.APIFY_WEBHOOK_SECRET && secret !== process.env.APIFY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await req.json()
    // Apify webhook payload includes the default dataset id of the finished run.
    const datasetId = payload?.resource?.defaultDatasetId || payload?.datasetId
    if (!datasetId) {
      return NextResponse.json({ error: 'No dataset id in payload' }, { status: 400 })
    }

    // Pull the scraped items from Apify's dataset API.
    const token = process.env.APIFY_TOKEN
    const itemsRes = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?token=${token}&clean=true`)
    if (!itemsRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch dataset' }, { status: 502 })
    }
    const items: any[] = await itemsRes.json()

    // Keep only retirement-driven listings (the FounderSunset filter).
    const retirement = items.filter(i => isRetirementListing(i.reasonForSelling || ''))

    const rows = retirement.map(i => ({
      slug: slugify(i.listingTitle || 'business', i.location || ''),
      listingTitle: i.listingTitle,
      askingPrice: i.askingPrice ?? null,
      cashFlow: i.cashFlow ?? null,
      grossRevenue: i.grossRevenue ?? null,
      ebitda: i.ebitda ?? null,
      location: i.location || '',
      state: i.state || '',
      category: i.category || '',
      categorySlug: getCategorySlug(i.category || ''),
      description: i.description || '',
      yearEstablished: i.yearEstablished ?? null,
      numberOfEmployees: i.numberOfEmployees || '',
      brokerName: i.brokerName || '',
      brokerPhone: i.brokerPhone || '',
      brokerFirm: i.brokerFirm || '',
      agentUrl: i.agentUrl || '',
      realEstate: i.realEstate || '',
      facilities: i.facilities || '',
      growthOpportunity: i.growthOpportunity || '',
      financing: i.financing || '',
      supportAndTraining: i.supportAndTraining || '',
      competition: i.competition || '',
      franchise: i.franchise || '',
      ffe: i.ffe || '',
      inventory: i.inventory || '',
      reasonForSelling: i.reasonForSelling || '',
      homeBased: i.homeBased || '',
      buildingSf: i.buildingSf ?? null,
      sellerType: i.sellerType || '',
      url: i.url || '',
      scrapedAt: i.scrapedAt || new Date().toISOString(),
      featured: false,
    }))

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !serviceKey) {
      console.log(`[apify] (no Supabase) would upsert ${rows.length} retirement listings`)
      return NextResponse.json({ received: items.length, retirement: rows.length, dev: true })
    }

    const admin = createClient(supabaseUrl, serviceKey)
    // Upsert on slug so re-scrapes update existing rows instead of duplicating.
    const { error } = await admin.from('listings').upsert(rows, { onConflict: 'slug' })
    if (error) {
      console.error('[apify] upsert error:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ received: items.length, upserted: rows.length })
  } catch (err) {
    console.error('[apify] error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
