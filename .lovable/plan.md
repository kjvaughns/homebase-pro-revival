

## Mobile-app-matching booking flow for chosen providers

### What the screenshots show
1. **Provider profile** with About / Services / Reviews tabs and a sticky bottom bar (Call, Text, Book Now). The current page already matches this closely — minor polish only.
2. **Book Appointment page** — single scrollable page with:
   - Provider header card (avatar, name, "Service Provider")
   - **Select Service** — list of cards with primary services (price + duration), tap to highlight green
   - **Booking Questions** — dynamic questions from the service's `intake_questions_json` (number / text / yes-no / select chips), required fields marked with `*`
   - **Select Date** — horizontal scroll of next 30 days as date chips
   - **Select Time** — wrapping grid of hourly time slots (8 AM–4 PM)
   - **Repeat this service** toggle (recurring)
   - Sticky bottom bar: "Est. price $X" on left, green "Request Appointment" button on right

### What changes

**New page**: `src/pages/BookAppointmentPage.tsx` at route `/book/appointment/:providerId`
- Replaces the redirect to `/ai-booking` when the user clicks "Book Now" on a provider profile (because the provider is already chosen — no AI matching needed)
- Pulls services from `provider_custom_services` filtered by `provider_id` and `is_published=true`
- Splits primary services (`is_addon=false`) from add-ons (`is_addon=true`)
- Parses the selected service's `intake_questions_json` (text-encoded JSON) and renders dynamic questions
- Date strip = next 30 days; time slots = 8 AM–4 PM hourly chips
- Recurring toggle (visual only; stored in `notes` for now since `booking_requests` has no recurring field)

**On submit** (no auth required — guest booking, same as today):
- Insert into `booking_requests` with:
  - `provider_id`, `provider_name`, `provider_category`
  - `customer_name/phone/email/address` (collected in a "Your Details" section at bottom — required)
  - `service_summary` = `<service name> + intake answers JSON`
  - `preferred_date`, `preferred_time` (e.g. "10 AM")
  - `notes` = recurring info + add-ons list
- Then invoke `process-booking-request` (already wired) → creates appointment in mobile-app DB, sends provider notification
- Navigate to `/booking-confirmed`

**Wire the entry point**:
- `ProviderProfilePage.handleBook` → navigate to `/book/appointment/${provider.id}` instead of `/ai-booking`

**Routing**: add `/book/appointment/:providerId` to `App.tsx`

### Out of scope (deferred)
- **Auth + saved homes** — current marketplace is fully guest-based; we keep that and collect details on the form. Adding sign-in for web is a separate effort.
- **Real availability** (`/availability` endpoint doesn't exist in this DB) — show generic slots like the screenshot
- **Stripe payment** — none of the screenshots show payment; this stays as the "request appointment" flow that flows through `process-booking-request`
- **Add-ons UI** — the schema supports it but the screenshot doesn't show one; we'll render a checkbox list only if `is_addon=true` services exist for the provider
- **AI flow** — keep `/ai-booking` as the standalone "describe a problem" entry point from `Index`. Only the provider-profile "Book Now" CTA changes.

### Files
- **New**: `src/pages/BookAppointmentPage.tsx`
- **Modified**: `src/App.tsx` (add route), `src/pages/ProviderProfilePage.tsx` (change `handleBook` target)

### Design specifics (matching screenshots)
- Background `#0a0a0a`, cards `bg-gray-900 border-gray-800 rounded-2xl`
- Selected card: `border-green-500` + green-tinted name text
- Date chip selected: solid `bg-green-500` with white text; unselected: dark gray
- Time chip selected: solid `bg-green-500`; unselected: dark gray pill
- Sticky bottom bar: dark with "Est. price" + bold green price on left, full-height green pill button on right
- Required fields shown with `*` after the question

