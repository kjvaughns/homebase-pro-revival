## Goal
Replace the default favicon so the browser tab for `/` (and every route) shows the HomeBase logo.

## Changes

1. **Save the logo to `public/`**
   - Copy the uploaded image to `public/homebase-logo.png` so it's served at `/homebase-logo.png`.
   - (We use the uploaded asset rather than hot-linking `https://homebaseproapp.com/assets/homebase-logo.png` so the favicon keeps working even if that URL changes.)

2. **Update `index.html` `<head>`**
   - Add:
     ```html
     <link rel="icon" type="image/png" href="/homebase-logo.png" />
     <link rel="apple-touch-icon" href="/homebase-logo.png" />
     ```
   - Remove any existing default favicon link if present.

## Out of scope
No changes to the landing page hero, navbar logo, or OG/Twitter share images (those already use your branded social image). Let me know if you also want the OG share image swapped to this logo.