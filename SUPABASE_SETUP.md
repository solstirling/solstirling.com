# Supabase Setup

1. Create a Supabase project.
2. In Supabase SQL Editor, run `/Users/solstirling/Documents/git/solstirling.com/supabase/schema.sql`.
3. If your DB was already set up before content blocks/uploads, also run:
   - `/Users/solstirling/Documents/git/solstirling.com/supabase/content_media_migration.sql`
4. In Supabase Authentication, create your user (email/password).
5. Copy `supabase-config.example.js` to `supabase-config.js` and set:
   - `url`
   - `anonKey`
   - `siteSlug` (keep `solstirling.com` unless you want a different namespace)
6. Keep `supabase-config.js` local (it is ignored by git).

## Notes
- `index.html` reads from `portfolio_published` (public read).
- `dashboard.html` requires sign-in and edits `portfolio_drafts`.
- `preview.html` requires sign-in and shows drafts.
- `project.html` supports published and draft source views.
- Clicking `Publish Draft Changes` copies draft rows into published and removes those rows from drafts.
- Drag/drop media uploads use bucket `portfolio-media` and store files under `<user_id>/<site_slug>/...`.
