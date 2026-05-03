## Replace Terms of Service with full HomeBase EULA

The existing `/terms` route renders `src/pages/TermsOfService.tsx` with a short 13-section ToS. I'll rewrite that file's content to the full End-User License Agreement specified, keeping the existing page chrome (navbar, footer, typography) so it matches the rest of the dark marketing site.

### File to change
- `src/pages/TermsOfService.tsx` — swap `<main>` content for the new EULA. Update page title to "Terms of Use — HomeBase Pro". Keep layout, logo, footer, and the `text-[#22c55e]` heading style untouched.

### EULA structure (numbered sections)
1. Introduction & Acceptance
2. Effective Date — `[EFFECTIVE DATE]`
3. Eligibility (18+, 13+ w/ parental consent, provider background-check requirement)
4. About HomeBase (marketplace + business management; homeowners / providers / crew)
5. Accounts & Registration
6. Marketplace & Booking (~3% marketplace fee, HomeBase is not a party to service contracts)
7. Payments via Stripe (Stripe Connect payouts, Stripe ToS compliance)
8. Subscriptions & In-App Purchases (Apple IAP / Google Play Billing, auto-renew, cancellation via store)
9. Crew Management (provider responsible for crew member use)
10. AI Assistant (GPT-4o; informational only, not professional advice)
11. HouseFax Intelligence (third-party data incl. Zillow; accuracy not guaranteed)
12. User-Generated Content & License Grant
13. Reviews & Ratings (moderation rights)
14. Notifications (push opt-out via device)
15. Location Access (foreground only; not sold)
16. Acceptable Use / Prohibited Conduct
17. Account Suspension & Termination
18. Intellectual Property
19. Disclaimers & Warranties
20. Limitation of Liability (platform-only role)
21. Indemnification
22. Dispute Resolution — binding arbitration + class action waiver
23. Governing Law — U.S., `[STATE]`
24. Changes to These Terms
25. Apple App Store EULA Addendum — all 10 mandatory clauses:
    25.1 Acknowledgement
    25.2 Scope of License
    25.3 Maintenance and Support
    25.4 Warranty
    25.5 Product Claims
    25.6 Intellectual Property Rights
    25.7 Legal Compliance
    25.8 Developer Name and Address (HomeBase, `[COMPANY ADDRESS]`, support@homebaseproapp.com, `[PHONE NUMBER]`)
    25.9 Third-Party Terms (Stripe, Apple Media Services, Google Play, wireless carrier)
    25.10 Third-Party Beneficiary (Apple + subsidiaries)
26. Google Play Notice
27. Contact Us — HomeBase, `[COMPANY ADDRESS]`, support@homebaseproapp.com, `[PHONE NUMBER]`

### Style
- Reuse existing markup pattern: `<section>` blocks with `<h2 className="text-xl font-semibold text-[#22c55e] mb-3">` and muted-foreground body copy.
- Plain-English legal tone, scannable, mobile-friendly.
- Update "Last updated" line to `[EFFECTIVE DATE]`.

### Out of scope
- No new routes, no DB changes, no new components.
- Privacy Policy untouched.
