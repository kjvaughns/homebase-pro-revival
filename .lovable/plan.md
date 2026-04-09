

## Fix Marketplace Flow & AI Intake

Two problems to solve:

### Problem 1: Marketplace "Book Now" skips AI intake
Currently: Marketplace → Provider Profile → `/book` (guest form). The user never describes their issue.

**Fix**: Change Provider Profile's "Book Now" button to navigate to `/ai-booking?providerId=X&providerName=X&category=X` so the user goes through the describe → questions → quote → booking flow with that provider pre-selected. At step 4, skip the provider matching API call and just show the pre-selected provider.

### Problem 2: AI intake calls broken external API
The `apiCall` function hits `https://api.homebaseproapp.com/api/intake/analyze` which fails. Need to replace with a Supabase edge function using Lovable AI.

**Fix**: Create a single edge function `ai-intake` that handles all 3 endpoints (analyze, refine, match-providers) using Lovable AI with tool calling for structured output.

---

### Changes

**1. Create `supabase/functions/ai-intake/index.ts`**

Edge function with 3 actions:
- **analyze**: Takes `problemText`, uses Lovable AI to return `{ category, confidence, summary, severity, questions[], estimatedPriceRange }`
- **refine**: Takes `originalAnalysis` + `answers`, returns `{ refinedSummary, severity, recommendedUrgency, scopeOfWork[], serviceOptions[], materialEstimate, timeEstimate, confidence }`
- **match-providers**: Takes `category`, queries Supabase providers table for matching providers. Falls back to mock providers if none found.

Uses tool calling (structured output) to ensure valid JSON responses from the AI.

**2. Update `src/pages/AIBookingPage.tsx`**

- Remove `API_BASE` constant and the `apiCall` function
- Replace with `supabase.functions.invoke('ai-intake', { body: { action, ... } })` calls
- Read query params (`providerId`, `providerName`, `category`) on mount — if a provider was pre-selected from the marketplace, store it and skip the match-providers step at step 4
- When a provider is pre-selected, step 4 shows just that provider with the date/time picker

**3. Update `src/pages/ProviderProfilePage.tsx`**

- Change `handleBook` to navigate to `/ai-booking?providerId=X&providerName=X&category=X` instead of `/book?...`
- This sends the user through the full AI intake flow with that provider pre-attached

### Technical Details

- Edge function uses `LOVABLE_API_KEY` (already available) to call `https://ai.gateway.lovable.dev/v1/chat/completions`
- Uses tool calling for structured JSON extraction (no raw JSON parsing needed)
- Model: `google/gemini-3-flash-preview` (default, fast)
- Provider matching queries `supabase.from('providers')` with category filter, falls back to mock data
- The `/book` guest form route still works as-is for the final booking step

