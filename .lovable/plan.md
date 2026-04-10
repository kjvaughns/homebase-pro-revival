

## Fix Dynamic OG Tags — Switch from Vercel to Supabase Edge Function

### Problem
The `api/og.ts` and `vercel.json` we created only work on Vercel. Your app is hosted on **Lovable** (`.lovable.app`), which always serves the static `index.html` for every route. Crawlers (iMessage, Facebook, Twitter, etc.) never see dynamic meta tags — they always get "HomeBase Pro App".

### Solution
Create a **Supabase Edge Function** called `og-meta` that serves as the OG proxy. Since we can't intercept requests on Lovable hosting, we change how share links work:

- The "Share" / "Copy Link" button on provider profiles will generate a link like:
  `https://yvedkmtjynhgsuxukxjj.supabase.co/functions/v1/og-meta/heritage`
- When a crawler hits that URL, it gets HTML with the correct OG tags (business name, description, avatar)
- When a real user taps the link preview, the `<meta http-equiv="refresh">` instantly redirects them to `homebasepro-app.lovable.app/providers/heritage`

The experience: provider shares link → preview shows "Vaughn Home Services | HomeBase" with their description → tapping opens the real app.

### Data Confirmed
The `heritage` slug maps to provider "Vaughn Home Services" with description "Full-service home maintenance and repair specialists serving the greater Austin area..."

### Changes

**1. New: `supabase/functions/og-meta/index.ts`**
- Parses the slug from the URL path
- Queries `booking_links` for slug → `provider_id`
- Queries `providers` for `business_name`, `description`, `avatar_url`, `service_area`, `capability_tags`
- If crawler User-Agent: returns HTML with dynamic `og:title`, `og:description`, `og:image` + `<meta http-equiv="refresh">` redirect to the real app URL
- If real browser: returns a 302 redirect directly to `homebasepro-app.lovable.app/providers/{slug}`
- Falls back to default HomeBase OG tags if provider not found

**2. Modified: `src/pages/ProviderProfilePage.tsx`**
- Update the "Copy Link" / share functionality to generate the edge function URL instead of the direct app URL
- The share URL becomes `https://yvedkmtjynhgsuxukxjj.supabase.co/functions/v1/og-meta/{slug}`

**3. Cleanup**
- Remove `api/og.ts` (Vercel-specific, not used)
- Remove `vercel.json` (not used on Lovable hosting)

### Files
- **New**: `supabase/functions/og-meta/index.ts`
- **Modified**: `src/pages/ProviderProfilePage.tsx` (share URL generation)
- **Deleted**: `api/og.ts`, `vercel.json`

### Notes
- Edge functions deploy automatically — no manual deployment needed
- The edge function URL is long, but link previews only show the OG title/description, not the URL
- If you later add a custom domain, we can make the share URL cleaner

