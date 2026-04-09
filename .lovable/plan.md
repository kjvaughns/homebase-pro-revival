

## Fix Build Errors + Add BookingPage

### Step 1 — Fix corrupted JSX in ProviderCard.tsx
Rewrite `src/components/marketplace/ProviderCard.tsx` with identical logic but fix all corrupted closing tags (`</span>span>` → `</span>`, `</div>div>` → `</div>`, `</p>p>` → `</p>`, `</a>a>` → `</a>`).

### Step 2 — Fix corrupted JSX in MarketplacePage.tsx
Rewrite `src/pages/MarketplacePage.tsx` with identical logic but fix all corrupted closing tags (`</div>div>` → `</div>`).

### Step 3 — Create BookingPage.tsx
Create `src/pages/BookingPage.tsx` with the exact code provided:
- Fetches booking link + provider data by slug from `booking_links` table (joined with `providers`)
- Shows provider card header with avatar, name, rating, verified badge, hourly rate, service area
- Booking form with: full name, email, phone, service needed, description, date, time (Morning/Afternoon/Evening), notes
- Inserts into `appointments` table on submit
- Loading skeleton, not-found state with marketplace link, and success confirmation state
- Dark theme styling consistent with the site (`bg-background`, `bg-card`, `border-border`, green accent)

### Step 4 — Update App.tsx routing
- Add `import BookingPage from "./pages/BookingPage.tsx"` after ProviderDetailPage import
- Add `<Route path="/book/:slug" element={<BookingPage />} />` before the catch-all route

### No other files touched.

