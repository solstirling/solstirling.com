# solstirling.com

Sol Stirling's static project portfolio. GitHub Pages publishes `main` from this repository's root to https://solstirling.com.

## Edit and preview

- Project cards and articles: `projects-data.js`.
- Homepage: `index.html`; project template: `project.html`; styles: `site.css`.
- Web-ready media: `images/`. Keep originals outside the site; remove photo location metadata before publishing.
- Preview: `python3 -m http.server 4173 --bind 127.0.0.1`, then open http://127.0.0.1:4173.
- After changing shared JS or CSS, bump the matching query-string versions in both HTML files.
- Old `diffy` and `capstan` links resolve to `misc-projects`.

## Save versions and publish

Every update must be a Git commit pushed to GitHub. Do not force-push or replace repository history.

1. Check `git status` and `git pull --ff-only` before starting; preserve unrelated local changes.
2. Make changes and check the affected pages and images on desktop and mobile.
3. Run `node --check projects-data.js` and `git diff --check`.
4. Stage only intended source and media files, then commit with a descriptive message.
5. Push the commit with `git push origin main` when ready to publish.
6. Check the GitHub Pages build and verify the live pages after deployment.

For larger changes, work on a `codex/` branch and merge the reviewed work into `main`. To undo a published change, use `git revert <commit>` and push the new revert commit so earlier versions remain recoverable.
