

## Mobile Experience Fixes

### Problem
The site has several mobile issues: no hamburger menu on either navbar, hero floating cards overflow off-screen on small devices, and various spacing/sizing issues on mobile viewports.

### Changes

**1. Landing Navbar (`src/components/landing/Navbar.tsx`)** — Add mobile hamburger menu
- Add a hamburger icon button visible on `md:hidden`
- When tapped, show a slide-down menu with links (Marketplace, Pricing, For Pros) and the "Start Free" CTA
- Use local state to toggle open/closed

**2. HeroSection (`src/components/landing/HeroSection.tsx`)** — Fix floating cards
- Hide the 3 floating notification cards on mobile (`hidden lg:flex`) since they clip off-screen on small viewports
- Reduce hero heading size on very small screens (`text-3xl` base)
- Reduce vertical padding on mobile (`py-12 lg:py-28`)

**3. Marketplace Navbar (`src/pages/MarketplacePage.tsx`)** — Add mobile menu
- Add hamburger button for mobile with links to Marketplace, AI Booking, Sign In, Sign Up
- Category chips: ensure horizontal scroll works smoothly on mobile (already `overflow-x-auto`, just remove `justify-center flex-wrap` and keep left-aligned scroll on mobile)

**4. AIDemoSection (`src/components/landing/AIDemoSection.tsx`)** — Mobile polish
- Ensure the phone frame and scenario card stack vertically and don't overflow

**5. General spacing tweaks across landing sections**
- Reduce `py-20` to `py-12` on mobile for tighter sections
- Ensure all section headings use `text-2xl sm:text-3xl` minimum sizing

### Files Modified
- `src/components/landing/Navbar.tsx`
- `src/components/landing/HeroSection.tsx`
- `src/pages/MarketplacePage.tsx`
- `src/components/landing/AIDemoSection.tsx`
- Minor padding adjustments in `FeatureSection.tsx`, `CaseStudiesSection.tsx`, `TestimonialsSection.tsx`, `FAQSection.tsx`, `FinalCTA.tsx`, `HouseFaxSection.tsx`, `PricingSection.tsx`, `Footer.tsx`

