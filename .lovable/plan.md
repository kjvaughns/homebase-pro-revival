

## Improve Live Demo: Show AI Intake Form Flow + Summary

### Problem
The current demo is a simple chat conversation. The actual HomeBase app flow is an **intake form** → **AI-generated summary/quote** → **booking confirmation**, not a free-form chat. The demo should show this real flow.

### New Demo Flow (3 animated steps)

The demo will transition through 3 distinct "screens" inside the phone frame, simulating the actual app intake flow:

**Step 1 — Intake Form**
- Service category selector (e.g., "Plumbing" selected/highlighted)
- "Describe your issue" text field that auto-types "My kitchen sink is leaking under the cabinet"
- Name field: "Sarah Johnson"
- Preferred time: "Tomorrow Morning"
- Address field: "123 Oak Street"
- A green "Submit Request" button that animates a press

**Step 2 — AI Processing → Summary Card**
- Brief loading state: "AI is analyzing your request..." with a spinner
- Then an AI-generated summary card appears:
  - **Issue**: Kitchen sink leak — likely loose P-trap or worn washer
  - **Recommended Service**: Leak Diagnosis & Repair
  - **Estimated Cost**: $80 – $150
  - **Matched Pro**: Mike's Plumbing (4.9★, 127 reviews)
  - **Available**: Tomorrow 9:30 AM
- "Confirm Booking" button

**Step 3 — Booking Confirmed**
- Green checkmark animation
- Confirmation card: "Booking Confirmed"
- Details: Sink Leak Repair · Tomorrow 9:30 AM · Mike's Plumbing · $80–$150
- "You'll receive a confirmation text shortly"

### Technical Approach

**File: `src/components/landing/AIDemoSection.tsx`** — Full rewrite of the demo content

- Replace the `CONVERSATION` array and chat message renderer with a **step-based state machine** (`step: 0 | 1 | 2 | 3`)
- Step 0: Play overlay (existing)
- Step 1: Intake form with fields that animate/fill in sequentially
- Step 2: Loading spinner → AI summary card slides in
- Step 3: Confirmation card with checkmark
- Each step auto-advances after a timed delay
- Keep the same iPhone frame, notch, and bottom bar
- Keep the left panel scenario/outcome cards (update text to match new flow)
- Use `scrollToBottom` via `chatContainerRef` same as before

### Left Panel Updates
- **Scenario card**: Update text to describe the intake form flow instead of chat
- **Outcome card** (on completion): Same "Job Booked" card, updated description to mention "intake form → AI analysis → instant booking"

### Design
- Form fields use `bg-card border border-border rounded-xl` styling
- Category chips use the same pill style as elsewhere
- AI summary card uses `bg-primary/5 border border-primary/30` glass style
- Loading spinner uses the existing `animate-spin` utility
- All animations use the existing `animate-message-in` keyframe

