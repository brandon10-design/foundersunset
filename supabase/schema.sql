-- FounderSunset.com — Supabase schema
-- Run this in the Supabase SQL editor to set up your database.

-- ============ LISTINGS ============
-- Populated by the Apify webhook (/api/webhooks/apify), filtered to retirement sales.
create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  "listingTitle" text not null,
  "askingPrice" bigint,
  "cashFlow" bigint,
  "grossRevenue" bigint,
  ebitda bigint,
  location text,
  state text,
  category text,
  "categorySlug" text,
  description text,
  "yearEstablished" int,
  "numberOfEmployees" text,
  "brokerName" text,
  "brokerPhone" text,
  "brokerFirm" text,
  "agentUrl" text,
  "realEstate" text,
  facilities text,
  "growthOpportunity" text,
  financing text,
  "supportAndTraining" text,
  competition text,
  franchise text,
  ffe text,
  inventory text,
  "reasonForSelling" text,
  "homeBased" text,
  "buildingSf" int,
  "sellerType" text,
  url text,
  "scrapedAt" timestamptz,
  featured boolean default false,
  created_at timestamptz default now()
);

create index if not exists idx_listings_state on listings(state);
create index if not exists idx_listings_category on listings("categorySlug");
create index if not exists idx_listings_price on listings("askingPrice");
create index if not exists idx_listings_featured on listings(featured);

-- ============ BROKERS ============
create table if not exists brokers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  firm text,
  phone text,
  email text unique,
  website text,
  states text[],
  specialties text[],
  bio text,
  photo_url text,
  featured boolean default false,
  stripe_customer_id text,
  subscription_status text default 'pending',
  created_at timestamptz default now()
);

-- ============ CONTACT SUBMISSIONS ============
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  subject text,
  message text,
  created_at timestamptz default now()
);

-- ============ ROW LEVEL SECURITY ============
-- Public can read listings and active brokers; writes happen server-side via the service role key.
alter table listings enable row level security;
alter table brokers enable row level security;
alter table contact_submissions enable row level security;

create policy "public read listings" on listings for select using (true);
create policy "public read active brokers" on brokers for select using (subscription_status = 'active');
-- contact_submissions: no public read; inserts handled by server with service role.
