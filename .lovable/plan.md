
Replace the "For Pros" link in `src/components/landing/Navbar.tsx` (both desktop and mobile menu) with a "Blog" link pointing to `/blog`.

### Change
- Desktop nav (line ~22): `<a href="#">For Pros</a>` → `<Link to="/blog">Blog</Link>`
- Mobile nav (line ~38): `<a href="#">For Pros</a>` → `<Link to="/blog">Blog</Link>`

That's it — single file, two lines.
