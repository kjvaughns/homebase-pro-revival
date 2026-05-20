## Goal

Add a competitor comparison section on the landing page that makes it obvious why HomeBase is the better choice — especially on price.

## Placement

Inserted into `src/pages/Index.tsx` directly after `<PricingSection />` and before `<TestimonialsSection />`.

## What the section contains

**1. Section header**
- Eyebrow: "How we compare"
- Headline: "Built for pros. Priced for pros."
- Subhead: One line framing — most tools either overcharge, lock you into contracts, or rent you leads. HomeBase gives you the full stack for a flat $29.99/mo.

**2. Pricing strip (top)**
A single horizontal row of 5 price cards, with HomeBase visually highlighted (accent border + "Best value" badge):

| Tool | Starting price | Note |
|---|---|---|
| **HomeBase Pro** | **$29.99/mo** | All-in-one, cancel anytime |
| Jobber | ~$39/mo (Core) | Limited to 1 user, no marketing |
| Housecall Pro | ~$65/mo (Basic) | 1 user, add-ons cost extra |
| ServiceTitan | Custom (typically $300+/mo) | Enterprise, annual contracts |
| Thumbtack | Pay-per-lead ($15–$80/lead) | You rent leads, don't own them |

**3. Feature matrix (below the strip)**
Rows = capability, columns = the 5 tools. Check / X / "Add-on" / "$$" markers. Mobile: horizontal scroll with sticky first column.

Suggested rows (final copy in implementation):
- Flat monthly price under $30
- Unlimited users included
- AI booking & lead response
- Built-in customer marketplace (get discovered)
- Scheduling & dispatch
- Invoicing & payments
- No long-term contract
- No per-lead fees
- Onboarding in under 10 minutes

HomeBase column = all green checks. Competitors get a realistic mix of checks/X's/"$$"/"Add-on" so it reads as honest, not propaganda.

**4. Footer CTA**
"See the full $29.99 plan →" linking to `#pricing`, plus the App Store download button (reusing the existing deep link).

## Technical details

- **New file**: `src/components/landing/ComparisonSection.tsx`
  - Self-contained section using existing design tokens (semantic colors from `index.css`, no hardcoded hex).
  - Pricing strip: CSS grid, 5 cards, HomeBase card gets `border-primary` + badge.
  - Matrix: semantic `<table>` for SEO/a11y, wrapped in `overflow-x-auto` for mobile. Sticky first column via `sticky left-0`.
  - Check/X icons from `lucide-react` (`Check`, `X`, `DollarSign`).
  - Small disclaimer line under the matrix: "Competitor pricing as publicly listed [Month Year]. Plans and features change — check their sites for the latest."
- **Edit**: `src/pages/Index.tsx` — import and render `<ComparisonSection />` between `<PricingSection />` and `<TestimonialsSection />`.
- **SEO**: Section uses an `<h2>` so it slots into the existing heading hierarchy. No new route, no schema changes, no nav changes.

## Out of scope

- No dedicated `/compare` page or nav link (can add later if you want SEO landing pages per competitor).
- No changes to Pricing, Testimonials, or other sections.
- No backend, no data model changes.
