

The user reports navy blue instead of black on the booking screens. Let me investigate.
<lov-tool-use id="toolu_vrtx_01UfetGLguS7rkV6oEeoX2SY" name="code--view" integration-id="code" data="{\"file_path\": \"src/pages/BookAppointmentPage.tsx\", \"lines\": \"1-60\"}">
</lov-tool-use>

<lov-tool-use id="toolu_vrtx_01HEMKNZrrW5DqQgHw3Hr4xH" name="code--view" integration-id="code" data="{\"file_path\": \"src/pages/BookAppointmentPage.tsx\"}">
</lov-tool-use>

<lov-tool-use id="toolu_vrtx_01EMNhxrqHyuQRuQCx5ikbjX" name="code--view" integration-id="code" data="{\"file_path\": \"src/pages/BookingConfirmedPage.tsx\"}">
</lov-tool-use>
The user is seeing navy blue instead of black. The page itself uses `#0a0a0a` (true black) inline, but the `bg-gray-900` cards are Tailwind's default `#111827` which has a slight blue tint — that's likely the "navy blue" they're noticing. Same for `border-gray-800` (#1f2937, also blueish).

Let me also check GuestBookingPage since it has same pattern.
<lov-tool-use id="toolu_vrtx_01FiPv2tZGjFmh6wYP4uFWpK" name="code--search_files" integration-id="code" data="{\"query\": \"bg-gray-900|border-gray-800|bg-gray-800|border-gray-700\", \"include_patterns\": \"src/pages/BookAppointmentPage.tsx,src/pages/BookingConfirmedPage.tsx,src/pages/GuestBookingPage.tsx\"}">
</lov-tool-use>
I have what I need. The user is seeing Tailwind's `gray-900` (#111827) and `gray-800` (#1f2937) which are bluish slate tones. I'll swap them to true neutral blacks (zinc/neutral palette or custom hex).

<lov-plan>

## Fix: navy-tinted booking screens → true neutral black

### Root cause
Tailwind's default `gray-*` palette is **slate-based** (cool/blue-tinted). On a `#0a0a0a` page background, cards using `bg-gray-900` (`#111827`) and borders using `border-gray-800` (`#1f2937`) read visibly **navy blue**.

### Fix
Replace the cool `gray-*` shades with neutral charcoals on the booking-related screens, matching the iOS app's pure-black look. Two options behind the same change:
- Use Tailwind's **`neutral-*` / `zinc-*`** palette (true neutrals, no blue), or
- Use **custom hex** values like `#141414` / `#1f1f1f` for exact match.

I'll go with **`neutral-*`** — it's a clean swap and stays consistent with Tailwind conventions.

### Mapping
| Old (bluish slate) | New (true neutral) |
|---|---|
| `bg-gray-900` (#111827) | `bg-neutral-900` (#171717) |
| `bg-gray-800` (#1f2937) | `bg-neutral-800` (#262626) |
| `border-gray-800` | `border-neutral-800` |
| `border-gray-700` | `border-neutral-700` |
| `text-gray-*` (kept — only affects backgrounds) | unchanged |

### Files to update
1. **`src/pages/BookAppointmentPage.tsx`** — every `bg-gray-900`, `bg-gray-800`, `border-gray-800`, `border-gray-700`, `bg-[#0a0a0a]/80` (kept — already true black)
2. **`src/pages/BookingConfirmedPage.tsx`** — same swap (cards + nav border)
3. **`src/pages/GuestBookingPage.tsx`** — same swap (the older guest booking screen also has this issue)

No layout, copy, or behavior changes. Pure color refresh so all booking screens read as solid black/charcoal instead of navy.

