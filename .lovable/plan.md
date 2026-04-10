

## Use Vercel API Route for Dynamic OG Tags

Since you're deployed on Vercel, we can use the clean approach — intercept `/providers/:slug` requests at the server level so the actual URL shows the correct preview. No need for the Supabase Edge Function proxy URL.

### How It Works

```text
Someone shares homebaseproapp.com/providers/heritage
  → Vercel rewrites to /api/og?slug=heritage
  → API checks User-Agent
  → Crawler? Return HTML with "Vaughn Home Services | HomeBase" OG tags
  → Real browser? Serve index.html (SPA loads normally)
```

### Changes

**1. Create `api/og.ts`** (Vercel serverless function)
- Same crawler detection and Supabase query logic as the existing edge function
- If crawler: return HTML with dynamic OG meta tags
- If real browser: read and serve `dist/index.html` so the SPA loads at the same URL (no redirect needed)

**2. Create `vercel.json`**
```json
{
  "rewrites": [
    { "source": "/providers/:slug", "destination": "/api/og?slug=:slug" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**3. Update `src/pages/ProviderProfilePage.tsx`**
- Change `getShareUrl()` to return the clean app URL (`homebaseproapp.com/providers/{slug}`) instead of the Supabase function URL
- Share links will be clean, human-readable URLs

**4. Update `SITE_URL`**
- Use `https://homebaseproapp.com` (your Vercel domain) instead of `homebasepro-app.lovable.app`

### Files
- **New**: `api/og.ts`
- **New**: `vercel.json`
- **Modified**: `src/pages/ProviderProfilePage.tsx` (revert share URL to clean app URL)
- The Supabase edge function stays as a backup but is no longer the primary share path

