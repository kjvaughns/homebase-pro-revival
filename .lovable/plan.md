

## Redesign Booking Flow to Match iOS App

Restyle the existing AI Booking page and Provider Profile page to closely match the iOS app screenshots. No new routes needed -- just visual and layout changes to existing pages.

### Changes

**1. Restyle `src/pages/AIBookingPage.tsx`**

Match the iOS app's visual design across all 4 steps:

- **Step 1 (Describe):** Add a centered chat bubble icon (green circle with message icon) above the heading. Change heading to "What's the issue?" and subtitle to "Describe your problem and we'll ask a few quick questions to get you accurate quotes." Change chips label to "Try these:" and make them green-bordered pills. Button text: "Continue".

- **Step 2 (Questions):** Show category card at top with icon, category name, and AI summary (like the Plumbing card in the screenshot). Change heading to "Help us understand better" with subtitle "Answer these questions to get accurate quotes." Number each question (1, 2, 3...) with green numbers. Yes/No buttons get checkmark/X icons. Button text: "Get My Quote".

- **Step 3 (Options):** Change heading to "Your Service Quote". Show "Issue Summary" label above the refined summary card. Add time estimate and urgency badge ("Soon") row. Add "What's Included" section with green checkmarks for scope of work. Change "Service options" heading to "Choose Your Service Level". Restyle option cards: title left-aligned, price right-aligned in green, description below, included items with green checkmarks. "Recommended" badge on recommended option with green left border.

- **Step 4 (Providers):** Restyle to match the booking screen -- show service summary card at top, then provider card with avatar and category, then a horizontal scrollable date picker showing day cards (Fri 10 Apr, Sat 11 Apr, etc.) for the next 7 days, then time slot buttons. Change CTA to "Request Appointment". Remove "View Profile" button, keep just the book action.

**2. Restyle `src/pages/ProviderProfilePage.tsx`**

Match the iOS provider profile screenshot:

- Add tab navigation: About | Services | Reviews (About active by default with green underline)
- In About tab: show bio text, then a 3-column stat card row (Years Exp, Jobs Done, Miles Away) with icons, then "Usually responds in 1 hour" with chat icon
- Move services/tags into Services tab
- Add placeholder Reviews tab ("No reviews yet")
- Bottom sticky bar with "Call" and "Text" outline buttons + green "Book Now" button
- Larger avatar (96px), business name subtitle below provider name, verified badge as green pill "Verified Pro"
- Heart/favorite icon in top-right of the hero card

**3. Restyle `src/pages/GuestBookingPage.tsx`**

Match the iOS booking screen (IMG_2556):

- Show "Service Summary" card at top with clipboard icon, summary text, selected service level badge and price range
- Show provider card below with avatar, business name, category
- Replace the date input with a horizontal scrollable date picker showing the next 7 days as cards (day name, date number, month)
- Replace the time dropdown with time slot pill buttons
- Keep existing form fields (name, phone, email, address) below
- Change CTA to "Request Appointment" with "Price to be confirmed" text on the left

### Technical Details

- All changes are purely visual/layout -- no new API calls or routes
- Continue using the same Supabase insert for booking_requests
- Use existing Tailwind classes and component library
- Add Lucide icons: MessageCircle, Clock, Briefcase, Heart, Phone, MessageSquare
- Date picker generates next 7 days dynamically using `Date()`
- Files modified: `AIBookingPage.tsx`, `ProviderProfilePage.tsx`, `GuestBookingPage.tsx`

