

## Merge Booking Into Single `/providers/:slug` URL

### Problem
Two separate pages exist for the same provider:
- `/book/heritage` → old `BookingPage.tsx` (simple form, wrong rating field)
- `/providers/heritage` → `ProviderProfilePage.tsx` (the nice marketplace profile)

The iOS app links to `/book/heritage`, which shows the wrong design and data.

### Solution
Make `/providers/:slug` the single canonical URL. Redirect `/book/:slug` to `/providers/:slug`.

### Changes

**1. `src/App.tsx`**
- Replace the `BookingPage` route (`/book/:slug`) with a redirect component that navigates to `/providers/:slug`
- Remove `BookingPage` import

**2. `src/pages/BookingPage.tsx`**
- Delete entirely (no longer needed — its functionality is covered by ProviderProfilePage + the AI booking flow)

**3. `src/pages/ProviderProfilePage.tsx`**
- The "Book Now" button already navigates to `/ai-booking?providerId=...` which handles the full booking form
- No changes needed here

### Result
- `homebaseproapp.com/book/heritage` → redirects to `/providers/heritage`
- `/providers/heritage` shows the nice profile page with correct data (average_rating=4.9, 163 reviews, $95/hr, verified)
- "Book Now" button takes them through the AI booking flow
- iOS app links work seamlessly

