# 17 November 2026 — villa demo preview

Added a noindex preview at `/villademo` and, by hostname, at the root of `villademo.personalfitness.id`. Existing public routes, titles and the sitemap were left in place. Arunika Houses is fictional. Trainer names, ratings and bookings are sample data. Forms do not send email.

## Checks

`npm run check:release` passed: 122 prerendered pages, 95 sitemap URLs, location minimum 1,282 words. `/villademo` is absent from both sitemaps and is `noindex`. `public/robots.txt` disallows `/villademo`.

Local static preview on port 4173:

- `Host: villademo.personalfitness.id` `/` returned the demo title “In-villa wellness, under the house name”, h1 “A private hour, in the guest’s own house.”, and `X-Robots-Tag: noindex, nofollow`.
- The same host served `/stay/house-lima`, `/desk`, `/trainers/amara-cole` and `/card/house-lima` as the demo, and served `/assets/*.js` and `/images/villademo/*.webp` without rewriting them.
- `Host: www.personalfitness.id` `/` stayed the live homepage. `/pricing` stayed the pricing page. `/villademo` was the noindex preview.

Browser pass against the production build: guest intro, House Lima, Amara Cole, the booking form, confirmation ARK-2001, the room card, the desk (the new request appeared in Coming up) and a saved recurring hour. On `http://villademo.localhost:4173/` the first screen was the demo, and “Open House Lima” landed on `/stay/house-lima`. Every demo image in those views reported a non-zero natural width.

Search Console and GA4 were not queried. This record is not a traffic claim.

## Domain

`villademo.personalfitness.id` still needs to be attached to the existing Vercel project. The rewrite itself is in `proxy.js`.
