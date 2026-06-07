import type { Metadata } from 'next'
import { getListings } from '@/lib/data'
import ListingsClient from './ListingsClient'

export const metadata: Metadata = {
  title: 'Browse Businesses For Sale by Retiring Owners',
  description: 'Browse established businesses for sale exclusively from retiring owners. Filter by industry, price, revenue, location, and more. Motivated sellers, clean books.',
}

export default async function ListingsPage() {
  const allListings = await getListings()
  return <ListingsClient allListings={allListings} />
}
