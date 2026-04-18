

## Stripe & app-deep-link redirect pages

Add 4 clean branded landing pages so external Stripe redirects and app deep links resolve to a polished web experience instead of raw URLs.

### New routes (added to `src/App.tsx`)
- `/payment-success`
- `/payment-cancelled`
- `/booking-success`
- `/open-app`

### Files
- `src/pages/PaymentSuccessPage.tsx` (new)
- `src/pages/PaymentCancelledPage.tsx` (new)
- `src/pages/BookingSuccessPage.tsx` (new)
- `src/pages/OpenAppPage.tsx` (new)
- `src/lib/deepLink.ts` (new) — shared mobile-detect + deep-link-with-fallback helper
- `src/App.tsx` — register routes

### Shared design (matches existing booking pages)
- Background `#0a0a0a`, cards `bg-neutral-900 border-neutral-800 rounded-2xl`
- HomeBase logo nav, centered hero icon (success = green check, cancel = red X)
- Primary CTA = green pill (`bg-green-500`), secondary = ghost link
- Mobile-first, no flicker, all content rendered immediately (deep-link side-effect runs in `useEffect`)

### Page details

**`/payment-success`** — `?jobId=` `?amount=` `?service=`
- Green check, "Payment successful"
- Optional job summary card (job id, service, amount) when params present
- Mobile: auto-attempt `homebase://job/{jobId}` after 600ms; if user is still on page after 2s, show "Open in App" + "Continue on Web"
- Desktop: "Download App" (TestFlight) + "Continue on Web" (→ `/marketplace`)
- Primary CTA: "View Job" (deep links if mobile, else web)

**`/payment-cancelled`**
- Red X, "Payment not completed"
- Subcopy: "No charge was made. You can try again any time."
- CTAs: "Try Again" (uses `document.referrer` if same-origin → back, else `/marketplace`), "Back to Home"

**`/booking-success`** — `?appointmentId=` `?service=` `?date=` `?time=` `?providerName=`
- Green check, "Booking confirmed"
- Summary card: provider, service, date, time
- CTAs: "View Appointment" (deep link `homebase://appointment/{id}` on mobile), "Open in App"
- Mirrors style of existing `BookingConfirmedPage` for consistency

**`/open-app`** — generic deep-link handler. `?path=` `?jobId=` `?appointmentId=`
- Builds target URL: `homebase://{path or derived}`
- Mobile: immediate `window.location.href = deepLink`; fallback timer (1.5s) → App Store (`https://apps.apple.com/app/idXXXX` or TestFlight link)
- Desktop: small countdown then redirect to `/`
- Visible "Open App" + "Download" + "Continue to homepage" buttons so the page is never a dead end

### `src/lib/deepLink.ts`
- `isMobile()` — UA check (iOS/Android)
- `isIOS()` / `isAndroid()`
- `tryDeepLink(url, fallbackUrl, timeoutMs)` — sets `location.href` then `setTimeout` fallback; cancels fallback on `visibilitychange` (app opened)
- `APP_STORE_URL` / `TESTFLIGHT_URL` constants

### Stripe URL guidance (documentation only)
The Stripe checkout session creation lives in the **mobile app's backend**, not in this web repo (no `stripe` edge function exists here). The plan delivers the web landing pages so when the mobile/backend team updates:
- `success_url` → `https://homebaseproapp.com/payment-success?jobId={JOB_ID}`
- `cancel_url` → `https://homebaseproapp.com/payment-cancelled`

…both URLs resolve correctly. I'll note this in the final response so the backend change can be made on that side. No Replit URLs exist in this web codebase to remove.

### Out of scope
- No Supabase fetch on these pages (params alone drive content) — keeps pages instant, no auth or RLS friction. Can add later if needed.
- No changes to existing `BookingConfirmedPage` (kept for the in-app guest booking flow).

