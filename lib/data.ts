import { createClient } from '@supabase/supabase-js'
import { Listing, Broker } from './supabase'
import { mockListings, mockBrokers } from './mockData'

// Single data-access layer. Queries Supabase when configured; otherwise falls
// back to mock data so the app runs in development without any keys.
// To go fully live, just set the Supabase env vars — no page changes needed.

function getServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  // Treat the placeholder value used in CI/build as "not configured".
  if (!url || !key || url.includes('placeholder')) return null
  return createClient(url, key)
}

export async function getListings(): Promise<Listing[]> {
  const db = getServerClient()
  if (!db) return mockListings
  const { data, error } = await db.from('listings').select('*').order('featured', { ascending: false }).order('scrapedAt', { ascending: false })
  if (error || !data || data.length === 0) {
    if (error) console.error('[data] getListings:', error.message)
    return mockListings
  }
  return data as Listing[]
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const db = getServerClient()
  if (!db) return mockListings.find(l => l.slug === slug) ?? null
  const { data, error } = await db.from('listings').select('*').eq('slug', slug).single()
  if (error || !data) return mockListings.find(l => l.slug === slug) ?? null
  return data as Listing
}

export async function getBrokers(): Promise<Broker[]> {
  const db = getServerClient()
  if (!db) return mockBrokers
  const { data, error } = await db.from('brokers').select('*').eq('subscription_status', 'active').order('featured', { ascending: false })
  if (error || !data || data.length === 0) {
    if (error) console.error('[data] getBrokers:', error.message)
    return mockBrokers
  }
  return data as Broker[]
}
