# Red Eyed Spirits website

Static site for GitHub Pages. No build step.

- `index.html` — the site (black + gold "gala" direction)
- `alt/apothecary/`, `alt/saffron/` — the two directions we didn't pick, kept for reference
- `photos/web/` — web-sized photos (originals + the pitch deck live in git-ignored `source/` and `photos/original/`)
- `shared.js` — logo, bottle illustrations, 21+ age gate, contact form, and site config

## Before launch

1. Delete `alt/` before launch if we don't want the other directions public.
2. Contact form: make a free form at formspree.io, put the form id in `RE_CONFIG.formspreeId` in `shared.js`. (Or set `RE_CONFIG.email` to fall back to opening the visitor's email app.)
3. Swap the illustrated bottles for real product photos when we have them.

Add `?nogate` to any URL to skip the age gate while previewing.
