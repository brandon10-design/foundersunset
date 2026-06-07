# FounderSunset.com

The business-for-sale directory exclusively featuring listings from **retiring owners**. Built with Next.js (App Router), Supabase, Stripe, ConvertKit/Kit, and an Apify data pipeline.

## Tagline options (pick one)
1. **Where Great Businesses Find Their Next Chapter** (currently used)
2. The Marketplace for the Silver Tsunami
3. Built by a Founder. Ready for Yours.

## Quick start
```bash
npm install
cp .env.example .env.local   # fill in your keys (the app runs without them in dev — see fallbacks)
npm run dev
```
The site runs out of the box using `lib/mockData.ts`, so you can develop the UI before any backend keys are set.

## Architecture
- **Frontend:** Next.js App Router, statically generated pages for SEO.
- **Data:** Supabase (Postgres). Run `supabase/schema.sql` in the Supabase SQL editor.
- **Listings pipeline:** The Apify BizBuySell scraper (`good_cheap/bizbuysell-scraper`) runs **monthly**. Configure its webhook to POST to `/api/webhooks/apify?secret=YOUR_SECRET` on finish. The handler pulls the dataset, **filters to retirement listings only**, and upserts to Supabase on `slug`.
- **Payments:** Stripe Checkout for broker subscriptions ($299 Standard / $499 Featured). The `/api/webhooks/stripe` route flips a broker to `active` on payment.
- **Email:** ConvertKit/Kit. Every page has an email capture wired to `/api/subscribe`.

## Going live (data layer)
All pages fetch through `lib/data.ts` (`getListings`, `getListingBySlug`, `getBrokers`). This layer **queries Supabase when env vars are set, and falls back to `lib/mockData.ts` otherwise** — so the app runs in dev with zero config and goes live the moment you add Supabase keys and populate the `listings` / `brokers` tables. No page edits required. (The placeholder URL `*.placeholder.supabase.co` is treated as "not configured" so CI builds use mock data.)

## Monetization built in
1. **Broker directory** (primary) — `/for-brokers` → Stripe checkout → `/brokers` listing.
2. **Affiliate referrals** — CTAs on listing detail and buyer/seller blog posts (SBA lenders, attorneys, valuation).
3. **Featured listing upgrades** — `featured` boolean on listings; sort + badge logic already in place.
4. **Sponsored newsletter** — `/newsletter` + `/advertise` capture the audience and pitch sponsors.

## Adding blog posts
Drop a Markdown file into `content/blog/` with frontmatter (`title`, `description`, `date`, `category`, `readTime`, `audience`). It auto-appears in the index, sitemap, and gets its own SEO page. No CMS needed.

## SEO
- Per-page meta titles/descriptions; JSON-LD on listings (`Product`) and posts (`Article`).
- Industry landing pages at `/businesses/[industry]` target "[industry] business for sale retiring owner".
- `app/sitemap.ts` and `app/robots.ts` auto-generate. Submit the sitemap to Google Search Console on day one.

## Analytics & Search Console
- **Search Console:** create a property for `foundersunset.com`, choose the "HTML tag" verification method, and put the code in `NEXT_PUBLIC_GSC_VERIFICATION`. It renders into `<head>` automatically. Then submit `https://foundersunset.com/sitemap.xml`.
- **Google Analytics 4:** set `NEXT_PUBLIC_GA_ID` to your `G-XXXXXXXXXX` measurement ID. GA4 is **consent-gated** — `components/Analytics.tsx` loads gtag only after a visitor clicks "Accept all" on the cookie banner (`components/CookieConsent.tsx`), with `anonymize_ip` on. "Essential only" loads no analytics. The choice is stored in `localStorage` and respected on return visits.
- Prefer a privacy-first analytics tool instead? Swap the script in `Analytics.tsx` (e.g. Plausible or Fathom) — the consent gating stays the same.

## Phase 2 (not built yet, by design)
User accounts, seller self-listing, paid listing tiers. Validate revenue first.
