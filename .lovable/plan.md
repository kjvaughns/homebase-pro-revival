

## AI Conversation Demo Section

### What We're Building
A new landing page section with an interactive simulated chat demo showing how HomeBase AI books a job automatically. Two-column layout: left side has scenario context + outcome reveal, right side has a live chat UI that auto-plays a conversation.

### Placement
Insert between the first AI Booking `FeatureSection` and the Client Retention `FeatureSection` in `Index.tsx` — right after the AI Booking pitch, to immediately prove the concept.

### Files to Create/Edit

**1. New: `src/components/landing/AIDemoSection.tsx`**

The entire demo lives in one self-contained component (~300 lines).

**Left Column — Scenario Card:**
- Dark card (`bg-card`) with "The Scenario" header
- Context: "Sarah, a homeowner, texts your business number at 9:47 PM about a clogged kitchen drain. You're asleep. HomeBase AI takes over."
- After demo completes: card transitions to "Outcome" card — green-tinted with checkmark, "Job Booked ✓", summary text, and "Start Free" CTA button

**Right Column — Chat UI:**
- Header bar: AI avatar (green circle with Bot icon) + "HomeBase AI" + green "● Online" dot
- Chat body: scrollable container, min-h-[360px], dark background
- Overlay: semi-transparent backdrop-blur with large play button (▶) and "Watch AI Book a Job" text, glowing green ring via box-shadow
- Disabled input bar at bottom for visual authenticity

**Conversation Flow (home service themed):**
1. **AI**: "Hi! I'm the HomeBase assistant for Mike's Plumbing. How can I help you tonight?"
2. **User**: "Hey, my kitchen sink is completely clogged and it's backing up. Can someone come out tomorrow?"
3. **AI**: "I'm sorry to hear that! I can get someone out to you. Is it just the kitchen sink, or are other drains affected too?"
4. **User**: "Just the kitchen sink"
5. **AI**: "Got it. What's the best time for you tomorrow — morning (8AM–12PM) or afternoon (12PM–5PM)?"
6. **User**: "Morning works best"
7. **AI**: "Perfect. I have Mike available tomorrow at 9:30 AM. Kitchen drain clearing is $125–$175 depending on the blockage. Should I lock in the 9:30 slot for you?"
8. **User**: "Yes, book it"
9. **Confirmed card**: Green card with checkmark — "Booking Confirmed", "Kitchen Drain Clearing — Tomorrow 9:30 AM, $125–$175"

**Timing Logic (React `useState` + `useEffect` + async/await):**
- `runDemo()` async function triggered on overlay click
- AI messages: show typing indicator (3 bouncing dots) → wait `1200 + msg.length * 12` ms → remove dots → animate message in
- User messages: 400ms pause → animate in
- Confirm state: typing dots → 1500ms → success card
- Auto-scroll via `useRef` + `scrollIntoView`
- After completion: 500ms delay → reveal outcome card on left

**Animations (CSS keyframes in Tailwind config + inline):**
- Message appear: `opacity-0 translate-y-2` → `opacity-100 translate-y-0` over 300ms (CSS `animate-message-in`)
- Typing dots: 3 spans with staggered `animation-delay`, bouncing `translateY` keyframe
- Overlay fade-out on click
- Outcome card fade-in after demo ends

**2. Edit: `tailwind.config.ts`**
- Add `message-in` keyframe (translateY 8px→0, opacity 0→1, 300ms)
- Add `bounce-dot` keyframe for typing indicator

**3. Edit: `src/pages/Index.tsx`**
- Import and insert `<AIDemoSection />` after the AI Booking FeatureSection

### Styling Details
- Matches existing dark theme — `bg-card`, `border-border`, `text-muted-foreground`
- User bubbles: `bg-primary text-primary-foreground` with `rounded-2xl rounded-br-sm`
- AI bubbles: `bg-secondary` with `rounded-2xl rounded-bl-sm`
- Play button: `w-16 h-16 rounded-full bg-primary` with `shadow-[0_0_30px_rgba(34,197,94,0.4)]`
- Section wrapper: standard `max-w-7xl mx-auto py-24 px-4`

