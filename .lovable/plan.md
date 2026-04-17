

## The Problem

Your booking from the marketplace **was saved** to the database (I see it: KJ Vaughns → Heritage Home Cleaners, 2026-04-19 10:00 AM, status `pending`). But it's completely disconnected from your provider portal automations. Here's why:

### What's happening today

```text
Web marketplace booking
  → INSERT into `booking_requests` table  ✅ (saved)
  → ❌ No email to customer
  → ❌ No email/SMS to provider
  → ❌ No row in `appointments` (what the provider portal reads)
  → ❌ No row in `jobs`
  → ❌ No notification record
```

The marketplace writes to `booking_requests` — a standalone "lead inbox" table. Your provider portal/mobile app reads from `appointments` and `jobs`. Two different tables, no bridge between them, **no triggers, no edge functions, no email logic**.

### What needs to be built

**1. New edge function `process-booking-request`** (triggered after the insert from `GuestBookingPage.tsx` and `AIBookingPage.tsx`)
- Looks up the provider by `provider_id`
- Creates a row in `appointments` (so it shows up in the provider portal)
  - Maps: customer info, scheduled_date (from preferred_date + preferred_time), service_name (from service_summary), status `pending`
- Creates a `notifications` row for the provider's user_id
- Sends confirmation email to the customer
- Sends new-booking email to the provider (using their `providers.email`)
- Updates `booking_requests.status` to `processed` and stores the linked `appointment_id`

**2. Wire both booking pages to call it**
- `GuestBookingPage.tsx` — after the insert, invoke `process-booking-request` with the new booking_request id
- `AIBookingPage.tsx` — same hook

**3. Email setup**
- Use Lovable's built-in email infrastructure (requires an email domain). I'll check current status and walk you through the 1-step setup if needed.
- Two templates: `booking-customer-confirmation` and `booking-provider-new-lead`

**4. Backfill your existing booking**
- Run a one-time insert to create the `appointments` row for the KJ Vaughns / Heritage booking that's currently stranded, and send the emails so you can verify end-to-end.

### Files

**New**
- `supabase/functions/process-booking-request/index.ts`
- Email templates (created by the email scaffolding tool)

**Modified**
- `src/pages/GuestBookingPage.tsx` — call the function after insert
- `src/pages/AIBookingPage.tsx` — call the function after insert

**Migration**
- Add `appointment_id` column to `booking_requests` to track the link
- Backfill the existing pending booking

### Open question
The provider portal/mobile app — is that the **same Supabase project** (`yvedkmtjynhgsuxukxjj`) reading `appointments`, or a separate backend? I'm assuming same (the schema strongly suggests it). If it's a separate system, we'd also need to push to it via webhook/API — let me know.

