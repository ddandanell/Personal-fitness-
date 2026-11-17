# Hello email and enquiry delivery, 17 November 2026

## Intent

- One public address, owned by `COMPANY_EMAIL` in `src/data/company.ts`: hello@personalfitness.id.
- Quote, schedule and villa-partner forms email that inbox with the visitor as Reply-To.
- No URL, phone, price or route change. Not published from this branch.

## Checks

- `npm run check:release` passed: 100 prerendered pages, 95 sitemap URLs, 7,112 links, 1,371 assets, 296 structured-data blocks.
- SEO audit: 41 location routes, minimum local main content 1,282 words, 82 unique primary images, 103 keyword locks.
- Prerendered HTML uses only the public address in `COMPANY_EMAIL`. Contact JSON-LD email matches it.
- Local `/api/enquiry` without mail credentials returned HTTP 503 and named `hello@personalfitness.id`.
- Headless Chrome on the dev server submitted `/contact` and `/villa-hotel-partners`. Empty contact submit asked for a name. A completed contact submit showed the same 503 message. No Search Console or GA4 data was used.
