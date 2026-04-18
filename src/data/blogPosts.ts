export type BlogCategory = "Guide" | "Article" | "Tool";

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  heroImageDescription: string;
  heroImage?: string;
  body: string;
  cta: { label: string; href: string };
  publishedAt: string;
  readMinutes: number;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "getting-started-on-homebase",
    title: "Getting Started on HomeBase",
    category: "Guide",
    excerpt:
      "A step-by-step walkthrough to get your Business Hub live, accepting bookings, and ready for paying clients in under an hour.",
    heroImageDescription:
      "A clean overhead shot of a contractor's phone showing a booking confirmation, with a coffee cup and clipboard nearby. Warm, natural lighting.",
    publishedAt: "2025-01-10",
    readMinutes: 5,
    cta: { label: "Open Business Hub →", href: "/open-app?path=hub" },
    body: `Most providers who sign up for HomeBase get their first inquiry within the first week — but only if their profile is actually finished. A "complete" profile (photo, services, pricing, hours, payment connected) gets roughly 3x more inquiries than a half-finished one. Here's the fastest path from sign-up to your first booking.

## 1. Finish your Business Hub profile

Add a real headshot or logo, a one-paragraph bio, your service area, and your business hours. Clients are choosing between you and three other providers in the search results — a friendly photo and a clear bio is what tips the decision.

## 2. Add your services with pricing

Don't list "Handyman services — call for quote." Add specific services (e.g., "TV mount installation — $95 flat") with clear pricing. Flat-rate services convert at almost double the rate of "call for quote" listings because clients can decide on the spot.

## 3. Create your public booking link

Every HomeBase provider gets a shareable link. Put it in your Instagram bio, your email signature, your truck magnet, and your business card. This link works even for clients who've never heard of HomeBase.

## 4. Connect Stripe

This is the single biggest unlock. Once Stripe is connected you can accept deposits, send invoices, and get paid online — no more chasing checks. Setup takes about 5 minutes.

## 5. Ask 3 past clients for a review

Reviews are the social proof that closes the sale. Text three happy clients today and ask them to leave a quick review on your HomeBase profile. Three reviews is the minimum threshold where new clients start trusting your listing.

Do these five things in your first week and you'll be ahead of 80% of providers on the platform.`,
  },
  {
    slug: "setting-your-rates",
    title: "Setting Your Rates",
    category: "Article",
    excerpt:
      "A practical pricing framework for independent providers — how to research the market, cover your real costs, and protect your profit margin.",
    heroImageDescription:
      "A close-up of a calculator, invoice pad, and pencil on a workbench. Soft warm tones.",
    publishedAt: "2025-01-12",
    readMinutes: 5,
    cta: { label: "Update your service pricing →", href: "/open-app?path=pricing" },
    body: `Underpricing is the #1 reason home-service providers burn out. You stay busy, you work hard, and at the end of the year there's nothing left in the bank. Here's how to set rates that actually pay you what you're worth.

## Step 1: Research your local market

Look at three competitors in your zip code. What do they charge for the same service? You don't need to undercut them — in fact, the lowest-priced provider often gets the most price-shoppers and the worst clients. Aim for the middle of the range.

## Step 2: Calculate your true cost per hour

Add up everything: labor (what you'd pay yourself), materials, gas, insurance, phone, software, vehicle wear, and the hours you spend on quotes and admin that you don't bill for. Most independent providers are shocked to find their real cost is $45-75/hour before profit — and they're charging $40.

## Step 3: Add a 15-20% profit margin

Profit isn't your salary. It's the cushion that pays for slow months, equipment replacement, and growth. If you're not building in profit, you're just buying yourself a job.

## Step 4: Update quarterly

Lumber, fuel, and insurance go up every year. Your rates should too. Set a calendar reminder for the first of every quarter to review your prices.

## Step 5: Stop apologizing

When you quote a price, say it confidently and stop talking. Clients who balk at fair pricing aren't your clients. The ones who say "yes" without flinching are.

Pricing isn't about being the cheapest. It's about being worth what you charge — and then charging it.`,
  },
  {
    slug: "winning-5-star-reviews",
    title: "Winning 5-Star Reviews",
    category: "Article",
    excerpt:
      "A simple before/during/after playbook that turns one-time jobs into glowing reviews and repeat clients.",
    heroImageDescription:
      "A smiling homeowner shaking hands with a contractor at the door of a freshly painted home. Bright, welcoming.",
    publishedAt: "2025-01-15",
    readMinutes: 5,
    cta: { label: "Request a review from a past client →", href: "/open-app?path=reviews" },
    body: `Five-star reviews don't happen by accident. They happen because you set the expectation, exceeded it, and asked at the right moment. Here's the playbook.

## 24 hours before the job

Send a quick message: "Hi [Name], just confirming I'll be there tomorrow at 9 AM for the [service]. Text me if anything changes — see you then!" This single message eliminates 90% of no-shows and miscommunication.

## The morning of

Arrive 5 minutes early. Not 10 (that's awkward). Not on the dot (that's stressful). Five minutes early says "I respect your time."

## Before you start

Walk the job with the client. Confirm the scope out loud. Take "before" photos on your phone. This protects you from scope creep and gives you content for your portfolio.

## During the job

Lay down drop cloths even if you don't think you need them. Clean as you go. If you find a problem, tell the client immediately — never surprise them at the end.

## When you're done

Walk the finished work with the client. Take "after" photos. Sweep up. Ask "Is there anything else you need before I head out?"

## The next day

Send a follow-up text: "Thanks again for having me out yesterday — hope you're loving the [result]. If you have a minute, I'd really appreciate a quick review on HomeBase: [link]."

That last text is the entire game. Most providers never send it, which is why most providers don't have many reviews. Send it every time.`,
  },
  {
    slug: "photographing-your-work",
    title: "Photographing Your Work",
    category: "Guide",
    excerpt:
      "Phone-photography fundamentals so your finished work actually looks as good online as it does in person.",
    heroImageDescription:
      "A contractor's hands holding a phone, framing a beautifully renovated kitchen. Bright window light in the background.",
    publishedAt: "2025-01-18",
    readMinutes: 4,
    cta: { label: "Add photos to your portfolio →", href: "/open-app?path=portfolio" },
    body: `Your portfolio photos are the single biggest factor in whether a stranger books you. Providers with strong photo galleries see booking rates up to 40% higher than providers with blurry, dim, or no photos. Good news: you don't need a real camera. You need three habits.

## 1. Shoot in natural light

Open the blinds, turn off the warm yellow indoor lights, and shoot near a window or outside. Phone cameras are spectacular in natural light and miserable under fluorescent or yellow bulbs.

## 2. Take three shots of every finished job

A wide shot showing the whole space, a medium shot showing the work in context, and a close-up of the detail you're proudest of. Three shots gives clients enough to imagine the result in their own home.

## 3. Always shoot a "before"

Even a quick phone photo before you start. Before-and-afters are the most persuasive content you can post. They turn a $200 job into a $2,000 portfolio piece.

## Bonus tips

- Keep the phone steady — a $15 mini tripod is worth its weight in gold.
- Wipe the lens with your shirt before every shot. Pocket lint is the silent killer of portfolio photos.
- Shoot horizontally for hero shots, vertically for social media.
- Edit lightly: bump the brightness and shadows, leave the rest alone. Over-filtered photos look fake.

Five minutes of photo work per job, every job, will compound into a portfolio that books itself.`,
  },
  {
    slug: "business-insurance-guide",
    title: "Business Insurance Guide",
    category: "Guide",
    excerpt:
      "What coverage you actually need as a solo or small-team provider — and why showing it on HomeBase wins more jobs.",
    heroImageDescription:
      "A close-up of a clipboard with an insurance certificate and a hard hat resting on it. Professional, neutral lighting.",
    publishedAt: "2025-01-20",
    readMinutes: 5,
    cta: { label: "Upload proof of insurance →", href: "/open-app?path=insurance" },
    body: `Insurance feels like a tax until the day you need it. Then it's the thing that saves your business. Here's the no-nonsense version of what you need and why.

## General Liability — at least $1M / $2M aggregate

This covers you if you damage a client's property or injure someone on the job. It's also what most clients (and HOAs, and commercial landlords) require to even let you on the property. Expect to pay $400-800/year as a solo provider.

## Workers' Compensation

Required if you have any employees. Most states require it the day you hire your first W2. Even with 1099 subs, your state may still require it. Check your state's requirements before you bring anyone on.

## Tools & Equipment Coverage

Strongly recommended if you carry $5K+ in gear. A stolen truck full of tools can end a small business overnight. Inland marine policies are cheap (usually $150-300/year) and worth every penny.

## Commercial Auto

If you use your vehicle for work. Personal auto policies typically exclude business use. If you're driving to jobs, you need commercial auto. Don't find out the hard way.

## Bonded ≠ insured

Being bonded is a guarantee that pays a client if you fail to complete a job. Useful for higher-trust services like cleaning where you're alone in someone's home.

Once you have coverage, upload your Certificate of Insurance to your HomeBase Business Hub. Profiles with proof of insurance get noticeably more inquiries because clients trust them more — especially for jobs over $500.`,
  },
  {
    slug: "understanding-your-stats",
    title: "Understanding Your Stats",
    category: "Tool",
    excerpt:
      "A weekly 10-minute habit that turns your HomeBase dashboard into a growth engine.",
    heroImageDescription:
      "A laptop screen showing a clean analytics dashboard with upward-trending charts. Modern, minimal workspace.",
    publishedAt: "2025-01-22",
    readMinutes: 4,
    cta: { label: "Open my dashboard →", href: "/open-app?path=dashboard" },
    body: `Most providers check their dashboard once a month, glance at the revenue number, and close it. That's a missed opportunity. Your stats can tell you exactly which lever to pull next — if you know what to look for.

## Conversion rate (inquiries → bookings)

This is the most important number on your dashboard. If it's under 30%, the problem is almost always your profile (photos, pricing, response time) — not your marketing. Fix the profile before you spend a dime on ads.

## Average job value

If this is flat or shrinking, you're probably leaving money on the table by not upselling. Add a "while I'm here" offer to every job (a quick add-on service at a small discount) and watch this number climb.

## Repeat client rate

If under 25%, you have a follow-up problem, not an acquisition problem. The cheapest client to win is the one who already paid you once. Send a "checking in" text 30, 90, and 180 days after every job.

## Total revenue

The vanity number — useful as a scoreboard, but it doesn't tell you what to do. Use the three above to actually move it.

## Response time

Not always shown as a stat, but worth tracking yourself. Providers who respond within 5 minutes book at roughly 4x the rate of providers who respond in over an hour. The market rewards speed.

Spend ten minutes every Monday morning reviewing these numbers. Pick one to improve that week. Compound the gains.`,
  },
  {
    slug: "managing-your-schedule",
    title: "Managing Your Schedule",
    category: "Article",
    excerpt:
      "How to structure your calendar so you stay booked, sane, and in control of your time.",
    heroImageDescription:
      "A weekly planner open on a desk with a coffee mug, pen, and phone showing a calendar app. Soft morning light.",
    publishedAt: "2025-01-25",
    readMinutes: 5,
    cta: { label: "Update my business hours →", href: "/open-app?path=hours" },
    body: `The fastest way to burn out as a provider is to let your clients control your calendar. Here's how to take it back without losing bookings.

## Set real business hours

Not 24/7. Not "I'm flexible." Pick the hours you actually want to work and lock them in your HomeBase booking settings. Clients can only book inside those windows. This single change ends most after-hours stress.

## Use minimum advance booking

Set your booking link to require at least 24 hours of notice (48 for bigger jobs). This eliminates the "can you come right now?" chaos that wrecks your day.

## Block buffer time between jobs

Travel, clean-up, the unexpected — never schedule jobs back-to-back unless they're at the same address. A 30-minute buffer keeps you on time for the next client.

## Block personal time on the calendar

If you don't block it, the calendar will fill it. Block your kid's soccer game. Block your gym time. Block one full day a week as a personal day.

## Batch your admin

Pick one or two windows a week (Tuesday afternoon, Friday morning) for invoicing, follow-ups, and quotes. Don't do admin between jobs — it eats your focus.

## Say no to bad bookings

A client who's already negotiating before they've booked is a client who'll be a problem on the job. Trust your gut. A "no" to the wrong job is a "yes" to the right one.

Your calendar is your most valuable asset. Defend it.`,
  },
  {
    slug: "getting-paid-faster",
    title: "Getting Paid Faster",
    category: "Guide",
    excerpt:
      'Five changes that move your average payment time from "eventually" to "same day."',
    heroImageDescription:
      "A phone showing a Stripe payment confirmation notification. Clean, modern, slightly aspirational.",
    publishedAt: "2025-01-28",
    readMinutes: 5,
    cta: { label: "Connect Stripe →", href: "/open-app?path=stripe" },
    body: `Cash flow kills more small home-service businesses than lack of work. The jobs are there — the money just shows up too slowly. Here's how to fix that.

## 1. Connect Stripe in your Business Hub

This is the unlock for everything else. Once it's connected you can take card payments online, send digital invoices, and stop accepting "I'll mail you a check next week."

## 2. Require a deposit on big jobs

For anything over $500, require a 25-50% deposit at booking. This does two things: it filters out tire-kickers, and it covers your materials so you're not floating the cost.

## 3. Send the invoice within an hour of finishing

Not at the end of the week. Not "when you get a chance." The hour after the job is when the work is freshest in the client's mind and they're most willing to pay. Every hour you wait, payment time doubles.

## 4. Make paying frictionless

A digital invoice with a "Pay Now" button gets paid in days. A paper invoice with mailing instructions gets paid in weeks. Card fees (~3%) are cheaper than 30 days of waiting.

## 5. Follow up politely on Day 7

If an invoice isn't paid within a week, send a friendly: "Hi [Name], just bumping this — wanted to make sure the invoice didn't get lost in your inbox: [link]." Most overdue invoices are honest oversights, not deadbeats.

Combine these five and your average payment time can drop from 21 days to under 3. That's not a small win — that's the difference between scrambling and scaling.`,
  },
];

export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
export const getRelatedPosts = (slug: string, category: BlogCategory, limit = 3) =>
  blogPosts.filter((p) => p.slug !== slug && p.category === category).slice(0, limit);
