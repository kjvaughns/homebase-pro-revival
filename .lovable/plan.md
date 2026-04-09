

## Create Terms of Service + FAQ Pages

### 1. Create `src/pages/TermsOfService.tsx`
Same layout as `PrivacyPolicy.tsx` (sticky navbar, green headings, max-w-3xl container, footer). Sections: Acceptance of Terms, Description of Service, User Accounts, Provider Obligations, Booking & Payments, Prohibited Conduct, Intellectual Property, Disclaimers, Limitation of Liability, Termination, Governing Law, Changes to Terms, Contact Us.

### 2. Create `src/pages/FAQPage.tsx`
Same layout shell (sticky navbar, max-w-3xl container, footer). Uses the existing `Accordion` component for expandable Q&A items. Categories covering: General (what is HomeBase, who is it for), Booking (how AI booking works, cancellations), Payments (pricing, fees, payouts), Account (setup, data deletion), and Technical (supported devices, security). Green accent headings, dark theme.

### 3. Update `src/App.tsx`
- Import both new pages
- Add routes: `/terms` → `TermsOfService`, `/faq` → `FAQPage`

### 4. Update `src/components/landing/Footer.tsx`
- Change Terms link from `href="#"` to `<Link to="/terms">`
- Add FAQ link to the Legal column: `<Link to="/faq">FAQ</Link>`

No other files touched.

