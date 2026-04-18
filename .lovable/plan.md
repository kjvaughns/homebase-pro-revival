

## Fix header location to show city, not ZIP list

### Problem
On the provider profile header, the line under the business name renders `provider.service_area`, which for this provider contains a comma-separated list of ZIP codes (`39211, 39206, ...`). It should show the city instead.

### Fix
In `src/pages/ProviderProfilePage.tsx` (line 282–286), change the header location source to prefer `service_cities`, with safe fallbacks:

1. If `provider.service_cities` has entries → show the first city (or first 1–2 joined, e.g. `"Jackson, MS"` style if only city names exist, just `service_cities[0]`).
2. Else if `service_area` exists **and is not just a list of ZIPs** (detect: contains a non-digit/non-comma/space char) → show it as-is.
3. Else → hide the line.

This keeps the dedicated **Service Area** section lower on the page (which already lists all cities and ZIPs as chips) untouched — that's the right place for the full ZIP list.

### File
- `src/pages/ProviderProfilePage.tsx` (header location line only)

No schema, routing, or other UI changes.

