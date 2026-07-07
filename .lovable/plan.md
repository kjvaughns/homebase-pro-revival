## Goal

Restore the in-app signup entry point so visitors can either download the app OR create an account on the web. Every existing "Start Free" App Store button stays; a secondary "Sign Up" button linking to `/signup` (the role-picker page that already exists) is added next to it.

## Changes

**Navbar** (`src/components/landing/Navbar.tsx`)
- Desktop: add a `Sign Up` text link (or ghost button) to the left of the existing green `Start Free` App Store button.
- Mobile menu: add a `Sign Up` entry above the `Start Free` button.
- Both link to `/signup` via React Router `<Link>`.

**Hero** (`src/components/landing/HeroSection.tsx`)
- Keep the primary App Store CTA. Add a secondary outline button `Sign up online` → `/signup` directly beside/under it.

**Pricing** (`src/components/landing/PricingSection.tsx`)
- Under the full-width green `Start Free` button, add a smaller secondary link/button `Or sign up online →` to `/signup`.

**Final CTA** (`src/components/landing/FinalCTA.tsx`)
- Same pattern: keep App Store button, add secondary `Sign up online` button next to it.

**Top Banner** (`src/components/landing/TopBanner.tsx`)
- Leave as-is (single-CTA promo strip).

**Comparison section footer CTA** (`src/components/landing/ComparisonSection.tsx`)
- Add `Sign up online` secondary link next to the App Store deep link.

## Out of scope

- No changes to `/signup`, `/signup/homeowner`, `/signup/provider`, or `/login` pages — they already exist and work.
- No auth/business-logic changes.
- No new routes.
- No copy changes to the primary "Start Free" button.

## Visual treatment

Secondary buttons use the existing shadcn `variant="outline"` (or a ghost/link style matching the section's dark/light background) so the App Store button remains the dominant CTA. Order everywhere: **App Store first (primary), Sign up online second (secondary)**.
