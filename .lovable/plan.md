

## Consolidate Booking Flow & Add Specific Time Slots

### Problem
After the AI intake flow, clicking "Request Appointment" on the providers step navigates to a second booking page (`/book` → `GuestBookingPage`). This creates a redundant flow with two separate pages for date/time selection. Additionally, time slots are vague ranges instead of specific times.

### Solution
Merge the contact details collection into the AI booking page itself. The flow becomes:

```text
Describe → Questions → Quote → Provider + Date/Time → Contact Details → Confirmation + App Download CTA
```

No more navigating to `/book`. Everything stays on one page.

### Changes

**1. Update `src/pages/AIBookingPage.tsx`**

- Add a new step `"details"` after `"providers"` for collecting name, phone, email, address
- Replace `TIME_SLOTS` ranges with specific 30-min slots: `8:00 AM, 8:30 AM, 9:00 AM, ... 7:30 PM`
- When user selects provider + date + time → "Continue" button goes to the details step
- On details step, "Confirm Booking" inserts into `booking_requests` table directly (same as GuestBookingPage does now)
- Add a final `"confirmed"` step that shows the green checkmark, booking summary, and an app download CTA (similar to `BookingConfirmedPage` but inline)
- Remove the `handleBookNow` navigation to `/book`

**2. Update step indicator**
- Change from `["Describe", "Questions", "Options", "Pros"]` to `["Describe", "Questions", "Quote", "Book"]`
- The "Book" step covers provider selection, date/time, contact details, and confirmation

**3. No changes needed to the database**
- `booking_requests` table already stores `customer_email`, `customer_phone`, `customer_address` — this is the data used for profile matching when users download the app
- Multiple bookings with the same email/phone will naturally link in the DB

**4. Files unchanged**
- `GuestBookingPage.tsx` and `BookingConfirmedPage.tsx` remain for the `/book` route (used by booking links), but the marketplace AI flow no longer navigates there

### Technical Details

- New `StepKey` values: `"details"` and `"confirmed"`
- Time slots generated programmatically: 8:00 AM to 8:00 PM in 30-min increments
- The confirmed step includes `AppDownloadCTA` component (card variant) already built
- Booking insert uses the same `booking_requests` table with `supabase.from("booking_requests").insert(...)` — same RLS policy (`allow_anon_insert_booking_requests`) allows unauthenticated inserts

