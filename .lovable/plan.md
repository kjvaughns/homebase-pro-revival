

## Redesign Provider Profile Page to Match App

### What changes

Rewrite `src/pages/ProviderProfilePage.tsx` to match the mobile app design shown in the screenshots, pulling all real data from the database.

### Design (matching app screenshots)

**Hero Card**: Avatar (rounded, with icon fallback), business name, location, star rating with count, "Verified Pro" badge

**Tabs**: About | Services | Reviews (green underline on active)

**About Tab**:
- Description paragraph
- Stats row: Years Exp (from `years_experience`), Jobs Done (from `review_count` or 0), Miles Away (show "N/A" since we don't have user location)
- "Usually responds in < 1 hour" line

**Services Tab** (new — currently only shows capability_tags):
- Fetch `provider_custom_services` from DB for this provider
- If none, fall back to showing capability_tags as chips
- Show pricing if available

**Reviews Tab**:
- Fetch `reviews` from DB for this provider
- Show star rating + comment + date for each
- "No reviews yet" empty state

**Business Hours section** (after tabs, always visible):
- Parse `business_hours` JSONB from providers table
- Show Mon–Sun with open/close times, "Closed" for disabled days
- Dim closed days

**Service Area section**:
- Show `service_cities` array as chips
- Show `service_zip_codes` array as chips

**Contact section**:
- Phone (with call link)
- Email (with mailto link)

**Booking Link section**:
- Show the share URL with copy button

**Sticky bottom bar**: Call | Text | Book Now (green) — matching app exactly

### Data fetching changes

Currently `ProviderProfilePage` does two queries (booking_links + providers). Add:
- `provider_custom_services` query (for Services tab)
- `reviews` query (for Reviews tab)
- Select `business_hours`, `service_cities`, `service_zip_codes` from providers

### Remove mock data

Delete the `MOCK_PROVIDERS` object — all data comes from DB now.

### Files modified
- `src/pages/ProviderProfilePage.tsx` — full rewrite to match app design

### Color scheme
- Background: `#0a0a0a` (already used)
- Cards: `bg-gray-900 border border-gray-800`
- Accent: green-500 / green-400 (already used)
- Matches current dark theme

