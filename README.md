# Red Eyed Spirits website

Static site for GitHub Pages. No build step.

- `index.html` — picker for the three design directions (temporary)
- `apothecary/`, `gala/`, `saffron/` — the three directions
- `shared.js` — logo, bottle illustrations, 21+ age gate, contact form, and site config

## Before launch

1. Pick a direction, move its `index.html` to the root (fix `../shared.js` to `shared.js`), delete the others.
2. Contact form: make a free form at formspree.io, put the form id in `RE_CONFIG.formspreeId` in `shared.js`. (Or set `RE_CONFIG.email` to fall back to opening the visitor's email app.)
3. Swap the illustrated bottles for real product photos when we have them.

Add `?nogate` to any URL to skip the age gate while previewing.
