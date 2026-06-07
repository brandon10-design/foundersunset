import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Listing = {
  id: string
  listingTitle: string
  askingPrice: number | null
  cashFlow: number | null
  grossRevenue: number | null
  ebitda: number | null
  location: string
  state: string
  category: string
  description: string
  yearEstablished: number | null
  numberOfEmployees: string
  brokerName: string
  brokerPhone: string
  brokerFirm: string
  agentUrl: string
  realEstate: string
  facilities: string
  growthOpportunity: string
  financing: string
  supportAndTraining: string
  competition: string
  franchise: string
  ffe: string
  inventory: string
  reasonForSelling: string
  homeBased: string
  buildingSf: number | null
  sellerType: string
  url: string
  scrapedAt: string
  featured: boolean
  slug: string
}

export type Broker = {
  id: string
  name: string
  firm: string
  phone: string
  email: string
  website: string
  states: string[]
  specialties: string[]
  bio: string
  photo_url: string
  featured: boolean
  stripe_customer_id: string
  subscription_status: string
  created_at: string
}

export function calculateBusinessAge(yearEstablished: number | null): string {
  if (!yearEstablished) return 'N/A'
  const age = new Date().getFullYear() - yearEstablished
  if (age <= 0) return 'New'
  if (age === 1) return '1 year'
  return `${age} years`
}

export function formatCurrency(value: number | null): string {
  if (!value) return 'N/A'
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value.toLocaleString()}`
}

export function isRetirementListing(reason: string): boolean {
  if (!reason) return false
  const lower = reason.toLowerCase()
  return ['retire', 'retirement', 'retiring', 'health', 'personal'].some(k => lower.includes(k))
}

export function getCategorySlug(category: string): string {
  return category.split('>')[0].trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export function getIndustryFromCategory(category: string): string {
  return category.split('>')[0].trim()
}
