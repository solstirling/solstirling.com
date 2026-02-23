# Supabase Setup

1. Create a Supabase project.
2. In Supabase SQL Editor, run `/Users/solstirling/Documents/git/solstirling.com/supabase/schema.sql`.
3. In Supabase Authentication, create your user (email/password).
4. Copy `supabase-config.example.js` to `supabase-config.js` and set:
   - `url`
   - `anonKey`
   - `siteSlug` (keep `solstirling.com` unless you want a different namespace)
5. Keep `supabase-config.js` local (it is ignored by git).

## Notes
- `index.html` reads from `portfolio_published` (public read).
- `dashboard.html` requires sign-in and edits `portfolio_drafts`.
- `preview.html` requires sign-in and shows drafts.
- Clicking `Publish Draft to Live` copies your draft rows into `portfolio_published`.
