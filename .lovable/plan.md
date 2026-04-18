

## Fix navy tint on Provider Profile page

The previous fix only updated booking pages. The user is on `/providers/heritage` (ProviderProfilePage), which still uses Tailwind's slate-tinted `gray-900`/`gray-800` — that's the navy they're seeing on the hero card, stats tiles, services list, reviews, business hours, service area, and the bottom sticky bar (Call/Text).

### Change
Same swap applied to `src/pages/ProviderProfilePage.tsx`:
- `bg-gray-900` → `bg-neutral-900`
- `bg-gray-800` → `bg-neutral-800`
- `border-gray-800` → `border-neutral-800` (incl. `/50` variants)
- `border-gray-700` → `border-neutral-700`

I'll also sweep any sibling pages still on the old palette to keep the marketplace consistent:
- `src/pages/ProviderDetailPage.tsx`
- `src/pages/MarketplacePage.tsx`
- `src/components/marketplace/*` (only the `bg-gray-*`/`border-gray-*` occurrences)

Text colors (`text-gray-400`, etc.) stay — only background/border tones cause the navy cast.

### Files
- `src/pages/ProviderProfilePage.tsx` (primary fix)
- `src/pages/ProviderDetailPage.tsx`, `src/pages/MarketplacePage.tsx`, `src/components/marketplace/*` (consistency sweep)

No layout, copy, or behavior changes.

