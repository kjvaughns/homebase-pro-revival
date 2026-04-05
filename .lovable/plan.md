

## Public Web Marketplace — Implementation Plan

### Audit Summary

**App's marketplace structure (from GitHub repo):**
- `Marketplace.tsx` — main listing page querying `organizations` table (filtered by `marketplace_published = true`) with search, category filters, pagination
- `PublicProviderProfile.tsx` — provider detail page loaded by slug, showing about/services/reviews/contact
- `ProviderCard.tsx` — glass-style card with avatar, name, rating, category, location, "Book Now" button
- `CategoryIcons.tsx` — 9 categories (Plumbing, Cleaning, Handyman, Lawn Care, Painting, HVAC, Electrical, Contractor, Other)
- `GlassSearchBar.tsx` — search input with glass backdrop
- `FilterDrawer.tsx` — side sheet with service type, availability, price range, rating, distance filters
- `MarketplaceEmpty.tsx` — empty state

**Current Supabase schema (this project):**
- `providers` table — has `business_name`, `description`, `service_area`, `average_rating`, `review_count`, `capability_tags`, `slug`, `is_public`, `avatar_url`, `phone`, `email`, `website`, `hourly_rate`
- `provider_custom_services` — services with `name`, `category`, `base_price`, `duration`, `provider_id`
- `reviews` — has `rating`, `comment`, `provider_id`, `user_id`
- `service_categories` — `id`, `name`, `description`, `icon`, `sort_order`
- `booking_links` — for booking flow redirect

**Key difference:** The app uses an `organizations` table; this Supabase uses `providers`. All queries need to target `providers` instead.

**Data state:** 23 providers exist, only 2 have `is_public = true`. We'll use `is_public = true` as the marketplace visibility flag (equivalent to `marketplace_published`).

---

### Security Approach

No new database views or RPC needed. We'll query `providers` directly but only select public-safe columns:
- `id`, `business_name`, `description`, `service_area`, `average_rating`, `review_count`, `avatar_url`, `capability_tags`, `slug`, `hourly_rate`, `is_public`
- Never expose: `user_id`, `stripe_account_id`, `email`, `phone` (phone/email shown only on detail page where provider opted in via `is_public`)

**RLS note:** Currently no RLS policies on `providers`. We should add a SELECT policy allowing public read of `is_public = true` rows. Migration needed.

---

### What We'll Build

**3 new pages:**

1. **`/marketplace`** — Provider listing with hero, search bar, category icons, provider grid, filters drawer, pagination
2. **`/marketplace/:id`** — Provider detail page with hero, about, services list, reviews, contact info, booking CTA
3. **`/marketplace` landing** — integrated into the listing page with hero section

**New components (in `src/components/marketplace/`):**

| Component | Purpose |
|-----------|---------|
| `MarketplaceNavbar.tsx` | Site navbar adapted for marketplace pages (logo, back to home, search) |
| `MarketplaceHero.tsx` | "Find Your Pro" hero with search bar |
| `CategoryIcons.tsx` | Category filter pills (adapted from app) |
| `ProviderCard.tsx` | Glass-style provider card (adapted from app) |
| `SearchBar.tsx` | Glass search input (adapted from app) |
| `FilterSheet.tsx` | Filter drawer (service type, rating, price range) |
| `EmptyState.tsx` | Empty/no results state |
| `AppDownloadCTA.tsx` | Reusable app download prompt component |

**Routes added to `App.tsx`:**
```
/marketplace → MarketplacePage
/marketplace/:id → ProviderDetailPage
```

### Data Fetching

**Listing page:**
```sql
SELECT id, business_name, description, service_area, average_rating, 
       review_count, avatar_url, capability_tags, slug, hourly_rate
FROM providers 
WHERE is_public = true
ORDER BY review_count DESC
```
With search: `business_name.ilike.%term%,description.ilike.%term%`
With category filter: join to `provider_custom_services` where `category` matches

**Detail page:**
```sql
-- Provider
SELECT * FROM providers WHERE id = :id AND is_public = true

-- Services
SELECT * FROM provider_custom_services WHERE provider_id = :id AND is_published = true

-- Reviews
SELECT r.*, u.first_name FROM reviews r 
LEFT JOIN users u ON r.user_id = u.id
WHERE r.provider_id = :id ORDER BY created_at DESC LIMIT 10
```

### App Download CTAs

Placed at:
- Sticky mobile bottom bar on marketplace pages
- After viewing provider detail (inline CTA card)
- In place of "Book Now" button action (opens modal: "Download the app to book")
- After search with results
- Empty state fallback
- Footer of marketplace pages

### Database Migration

Add RLS policy on `providers` for public SELECT:
```sql
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view public providers" 
  ON providers FOR SELECT 
  USING (is_public = true);
```

Also add read policy on `provider_custom_services` and `reviews` for marketplace access:
```sql
ALTER TABLE provider_custom_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published services" 
  ON provider_custom_services FOR SELECT 
  USING (is_published = true);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view reviews" 
  ON reviews FOR SELECT 
  USING (true);

ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view categories" 
  ON service_categories FOR SELECT 
  USING (true);
```

### Design Direction

- Black background (`bg-background` / `#000`)
- Glass-morphism cards: `bg-white/5 backdrop-blur-xl border border-white/10`
- Green accent (`primary`) for CTAs, ratings, active states
- Same typography and card patterns as current landing page
- Mobile-first responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- HomeBase logo in navbar
- Smooth entry animations (CSS only, no framer-motion dependency needed)

### Implementation Order

1. Database migration (RLS policies)
2. Marketplace listing page + components
3. Provider detail page
4. App download CTA components throughout
5. Route wiring in App.tsx
6. Add "Browse Providers" link to landing page navbar

