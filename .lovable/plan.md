

## Recreate AI Booking Screenshot as Static Chat UI

### What
Replace the static `appChat` image in the AI Booking `FeatureSection` with a code-rendered static chat mockup that matches the uploaded screenshot — showing the same conversation text used in the `AIDemoSection` ("My sink is leaking" flow).

### How

**1. New component: `src/components/landing/StaticChatMockup.tsx`**

A static, non-interactive chat UI rendered in code (no image) that replicates the screenshot:
- Dark background
- "< Main" back button at top (white pill)
- User bubble (green, right-aligned): "My sink is leaking"
- AI response (dark card, left-aligned) with small green home icon: the full diagnosis text from the demo
- "Find a Pro" action button (green border, Users icon + chevron)
- Bottom input bar: "Ask about home services..." with send icon
- No animations, no interactivity — purely visual

**2. Edit: `src/components/landing/FeatureSection.tsx`**

Add support for a `customPhone` React node prop as an alternative to `phoneImage`. When provided, render it inside the iPhone frame instead of an `<img>`.

**3. Edit: `src/pages/Index.tsx`**

For the AI Booking `FeatureSection`, pass `<StaticChatMockup />` via the new `customPhone` prop instead of the `appChat` image.

### Design Details
- Matches the uploaded screenshot: black chat area, green user bubble, dark gray AI bubble with green home icon, green "Find a Pro" button
- Uses the exact same message text as the `AIDemoSection` CONVERSATION array for consistency
- Wrapped in the existing iPhone frame from `FeatureSection`

