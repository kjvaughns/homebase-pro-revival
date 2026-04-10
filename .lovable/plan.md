

## Align Web Routes with Booking Link Slugs

### Changes

**1. `src/pages/ProviderProfilePage.tsx`** — Slug-first lookup

- Add `bookingLink` state to store slug, instant_booking, show_pricing, custom_title
- Change fetch logic:
  1. If `id` starts with `mock-`, use mock data (unchanged)
  2. First try: `supabase.from('booking_links').select('provider_id, slug, is_active, instant_booking, show_pricing, custom_title').eq('slug', id).eq('is_active', true).maybeSingle()`
  3. If found → fetch provider by `bookingLink.provider_id`
  4. If not found → fall back to `supabase.from('providers').select('*').eq('id', id).eq('is_public', true).maybeSingle()`
- Keep `handleBook` navigating to `/ai-booking?providerId=UUID&providerName=...&category=...`
- If bookingLink found, render a small "Share your booking link" section below the hero card showing `homebaseproapp.com/providers/{slug}` with a copy-to-clipboard button

**2. `src/pages/MarketplacePage.tsx`** — Join booking_links for slug URLs

- Update Provider interface to add `booking_links?: { slug: string; is_active: boolean | null }[]`
- Change fetch query to: `supabase.from('providers').select('*, booking_links(slug, is_active)').eq('is_active', true).order('rating', { ascending: false })`
- Remove `.eq('is_public', true)` or keep it — the RLS policy already filters public providers
- In the View Profile button, compute URL: `const slug = p.booking_links?.find(bl => bl.is_active)?.slug; navigate(/providers/${slug || p.id})`
- Mock providers still link to `/providers/mock-1` etc.

**3. `src/App.tsx`** — No changes needed. Route stays `/providers/:id`.

### Technical Notes
- The relationship `booking_links_provider_id_providers_id_fk` exists in the types, so the join query works with the Supabase SDK
- `maybeSingle()` used instead of `single()` to avoid errors when slug doesn't match
- The booking_links RLS policy already allows public SELECT on active links

