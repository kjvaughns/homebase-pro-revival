

## Dynamic OG Meta Tags for Provider Links

### Problem
When a provider shares their link (e.g. `homebaseproapp.com/providers/heritage`), link previews on iMessage, Facebook, Twitter, etc. all show generic "HomeBase Pro App" text. This is because the app is client-side rendered — crawlers see the static `index.html` meta tags and never execute JavaScript.

### Solution
Create a Supabase Edge Function that acts as a dynamic OG proxy. When a social crawler hits a provider URL, it returns an HTML page with the correct meta tags (business name, description). Real browsers get the normal SPA.

### How It Works

```text
Browser/Crawler → Vercel → Edge Function (og-meta) → returns HTML with dynamic meta tags
                        ↘ (non-provider routes) → normal SPA index.html
```

### Changes

**1. Create Edge Function `supabase/functions/og-meta/index.ts`**
- Accepts a `slug` query parameter
- Queries `booking_links` for the slug → gets `provider_id`, `custom_title`, `custom_description`
- Queries `providers` for `business_name`, `description`, `avatar_url`, `capability_tags`
- Returns a minimal HTML page with:
  - `<title>` = `"{Business Name} | HomeBase"` (or custom_title if set)
  - `og:title` = business name
  - `og:description` = provider description (truncated to 160 chars)
  - `og:image` = provider avatar_url or default HomeBase OG image
  - A `<meta http-equiv="refresh">` redirect to the real SPA URL so real users land on the app
  - A `<script>window.location.replace(...)</script>` as backup redirect
- For non-matching slugs or direct provider IDs, falls back to default HomeBase meta tags

**2. Update `vercel.json`** — Add rewrite rule for provider routes
- Add a rewrite that sends `/providers/:slug` requests to the edge function when the user-agent is a known crawler (Facebook, Twitter, iMessage, LinkedIn, Slack, Discord, WhatsApp bots)
- Non-crawler requests continue to the SPA as normal
- Vercel doesn't support user-agent rewrites natively, so instead we'll use a simpler approach: route ALL `/providers/:path` requests through a lightweight Vercel serverless function (or use the edge function directly) that checks the user-agent and either returns OG HTML or redirects to the SPA

**Alternative simpler approach — Vercel Edge Middleware:**
Since the project is deployed on Vercel, the cleanest solution is a Vercel Edge Middleware that intercepts `/providers/:slug` requests, checks the user-agent, and if it's a crawler, fetches provider data from Supabase and returns a minimal HTML response with the right OG tags. Non-crawlers pass through to the SPA.

**3. Create `api/og/[slug].ts`** (Vercel API route)
- A simple Vercel serverless function at `/api/og/[slug]`
- Fetches provider data from Supabase using the service role key
- Returns HTML with proper OG meta tags + instant JS redirect for real users
- Update `vercel.json` to rewrite `/providers/:slug` to `/api/og/:slug` for crawler user-agents

Since Vercel rewrites can't filter by user-agent, the simplest reliable approach:

**Final approach:**

**3a. `vercel.json`** — rewrite provider routes to the API function first
```json
{
  "rewrites": [
    { "source": "/providers/:slug", "destination": "/api/og?slug=:slug" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**3b. `api/og.ts`** — Vercel serverless function
- Check `User-Agent` header for known crawlers (facebookexternalhit, Twitterbot, LinkedInBot, WhatsApp, Slackbot, Discordbot, Applebot, TelegramBot)
- **If crawler**: fetch provider data from Supabase, return HTML with dynamic OG tags
- **If real browser**: return a 302 redirect to the SPA (which Vercel will serve as `index.html`)
  - Or serve `index.html` directly with a custom header

**4. Update `src/pages/ProviderProfilePage.tsx`**
- Keep the existing `document.title` update (already sets title to `"{name} | HomeBase"`)
- Add `react-helmet-async` or manual `document.head` meta tag updates for client-side meta (helps Google's JS renderer)

### Files
- **New**: `api/og.ts` (Vercel serverless function)
- **Modified**: `vercel.json` (add provider rewrite before catch-all)
- **Modified**: `src/pages/ProviderProfilePage.tsx` (add client-side meta tag updates)

### Technical Notes
- The Supabase anon key is used in the serverless function (provider data is public via RLS)
- Crawler detection covers: Facebook, Twitter/X, LinkedIn, Slack, Discord, WhatsApp, iMessage (Applebot), Telegram
- Real users experience zero delay — they either get a 302 redirect or the SPA directly
- Provider description is truncated to 160 characters for OG description best practices

