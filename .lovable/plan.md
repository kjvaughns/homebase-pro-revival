
## Add /blog with 8 provider resource posts

### Goal
New `/blog` index + `/blog/:slug` detail routes seeded with the 8 provider posts already drafted, styled to match the existing HomeBase dark marketing site, and linked from the Provider Resources cards.

### Files

**New**
- `src/data/blogPosts.ts` — typed `BlogPost[]` seeded with all 8 posts (slug, title, category, excerpt, heroImageDescription, body markdown, cta, publishedAt, readMinutes).
- `src/pages/BlogIndexPage.tsx` — header, category chips (All/Guide/Article/Tool) with client-side filter, responsive 3/2/1 grid of post cards, footer CTA banner.
- `src/pages/BlogPostPage.tsx` — back link, category + title + read time, hero, markdown body (sanitized), end-of-post CTA card, related posts (3 from same category).
- `src/components/blog/BlogCard.tsx` — reused card (hero placeholder, tag, title, excerpt, "Read more →").
- `src/components/blog/BlogHeroPlaceholder.tsx` — branded gradient + icon placeholder used until real `heroImage` URLs are added (uses category to pick an icon).

**Edited**
- `src/App.tsx` — register `/blog` and `/blog/:slug`.
- `src/pages/Index.tsx` (or wherever the Provider Resources section / cards live — I'll grep `landing/` for the component) — point each card's "Read More" to `/blog/{slug}` matching the seed slugs.

### Design (reuse existing tokens, no new theme)
- Background `bg-background` (true black), cards `bg-neutral-900 border-neutral-800 rounded-2xl`, primary CTA = existing green `bg-primary`.
- Reuses `Navbar` + `Footer` from `src/components/landing/`.
- Body prose: `max-w-[680px]`, `prose prose-invert` styling via Tailwind utility classes (h2/h3 hierarchy, lists, blockquote left-border, code), line-height generous.
- Mobile-first, semantic `<article>` / `<nav>` / `<main>`, alt text from `heroImageDescription`, focus styles preserved.

### Markdown rendering
- Add `react-markdown` + `rehype-sanitize` (well-known, safe). Render bodies with sanitize plugin enabled. No raw HTML allowed.

### SEO
- Lightweight inline `useEffect` that sets `document.title` and the `<meta name="description">` content per page (no new dep). Index → "Blog — HomeBase". Post → "{title} — HomeBase Blog" + excerpt as description.

### Provider Resources link wiring
- I'll locate the existing Resources section (likely in `src/pages/Index.tsx` or a dedicated landing component) and map each of its 8 cards to its matching slug from `blogPosts.ts`. If a card's text doesn't 1:1 match a post, I'll match on closest topic and note it.

### Out of scope (per spec)
- Real hero images (placeholders only — descriptions stored for later upload).
- Supabase / CMS — content is a typed TS array.
- Publish date display optional; will render the ISO date in a humanized format.
