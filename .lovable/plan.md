

## Custom App Preview Mockups for Feature Sections

### What
Replace the generic dashboard screenshots in the 4 remaining feature sections (Client Retention, Payments, Automation, Growth) with code-rendered static mockups -- like the StaticChatMockup done for AI Booking -- that accurately represent the actual app screens for each section.

### Mapping Sections to App Screens

| Section | Mockup | Based On |
|---------|--------|----------|
| **Client Retention** | Clients list screen | ClientsScreen.tsx + IMG_2481 screenshot |
| **Payments** | Finances screen with payouts/stats | FinancesScreen.tsx + IMG_2483 screenshot |
| **Automation** | Schedule screen with jobs/calendar | ScheduleScreen.tsx + IMG_2482 screenshot |
| **Growth** | Booking link / public profile preview | BookingLinkScreen.tsx |

### New Components

**1. `src/components/landing/ClientsMockup.tsx`**
Static replica of the Clients screen:
- Header: "Clients" title with search bar and add button
- Filter chips row: All, Lead, Active, Inactive
- Client cards with avatar circle (initials), name, status pill (green "Active"), phone/email icons
- 3-4 sample clients with realistic names
- Bottom tab bar hint (Home, Schedule, Clients highlighted, Finances, More)

**2. `src/components/landing/FinancesMockup.tsx`**
Static replica of the Finances screen:
- Header: "Finances" title
- 2x2 stats grid: Revenue MTD ($4,250), Jobs Completed (12), Active Clients (8), Upcoming Jobs (3)
- Segment tabs: Payouts | Payments | Refunds (Payouts selected)
- 2-3 payout rows: bank icon, "Bank ••••4521", amount ($850), status pill ("In Transit" / "Paid")
- Matches the dark card style from the app

**3. `src/components/landing/ScheduleMockup.tsx`**
Static replica of the Schedule screen:
- Header: "Schedule" with filter chips (All, Scheduled, Active, Done)
- Week strip: horizontal day selector with current day highlighted in green, dot indicators for jobs
- Today banner card: "3 Jobs | $1,200 Expected | Next Up: Kitchen Repair @ 2:00 PM"
- 2 job cards with: job title, client name, time, status pill (Scheduled/In Progress), quick action button

**4. `src/components/landing/GrowthMockup.tsx`**
Static replica of a booking link / public profile:
- Header: "Business Hub" or "Booking Link"
- Active booking link card with URL display, "Active" status pill, copy/share icons
- Public profile preview: business name, rating stars, service list
- "Share Link" green button

### Edits

**5. `src/pages/Index.tsx`**
- Import all 4 new mockup components
- Replace `phoneImage={appDashboard}` with `customPhone={<ClientsMockup />}` for Client Retention
- Replace `phoneImage={appDashboard2}` with `customPhone={<FinancesMockup />}` for Payments
- Replace `phoneImage={appQuoteForm}` with `customPhone={<ScheduleMockup />}` for Automation
- Replace `phoneImage={appQuoteResult}` with `customPhone={<GrowthMockup />}` for Growth
- Remove unused image imports

### Design Details
- All mockups use the same scale/styling as StaticChatMockup: `text-[10px]`, compact spacing, fits inside the iPhone frame
- Dark theme colors: `bg-background`, `bg-secondary`, `bg-card`, `border-border`
- Green accent (`text-primary`, `bg-primary`) for active states, buttons, and highlights
- Status pills: green for active/paid, blue for in-transit, yellow for pending
- Realistic but fake data that showcases actual app features

