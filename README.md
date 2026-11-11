# PersonalFitness.id public website

A React and TypeScript website for private fitness and wellness at homes and villas in Bali and Jakarta. The expanded catalogue contains 140 offer formats across 53 service families and 15 categories, plus 26 instructor and specialist profiles and professional photographs.

## Run locally

```bash
npm ci --ignore-scripts
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`. The build pre-renders every known route to complete HTML, creates the canonical sitemap and produces a genuine 404 page. `vercel.json` serves those files through clean URLs without a catch-all homepage rewrite. The preview command uses a matching static server with proper missing-page status codes.

## Quality checks

```bash
npm run build
npm run verify
```

Verification checks catalogue counts, unique offer IDs, image and service references, the 500-word minimum for every profile and service article, rendered metadata and meaningful quote edge cases. The quote checks cover participant validation, 45-minute swimming, custom specialist quotes and programme discounts that do not reduce travel charges.

With the production preview running on `127.0.0.1:4173`, the two scripts in `scripts/` provide browser-based route, responsive, accessibility, interaction and PWA checks through `playwright-cli run-code`.

## Enquiry behaviour

The enquiry helper runs in the current browser page and prepares a draft for the existing configured PersonalFitness WhatsApp destination, clipboard copy or text-file download. It does not send a message, process payment or confirm a booking. The chosen service format and professional preference carry into the draft. Unpriced specialist requests state that a written quote is required rather than generating a zero-price estimate.

## Content and imagery

`src/data/wellness-services.json` owns the service families and 140 format records. `service-articles.json` contains the longer service content. `professional-profiles.json` and `professional-articles.json` contain the 26 professional profiles and their detailed copy. All profile articles exceed 500 words.

Professional photographs are under `public/images/professionals/`, with service-specific imagery under `public/images/services/`. Availability, scope and qualifications are confirmed on the written quote. Individual profile pages and gated specialist pages are excluded from the indexable sitemap.

## Research and implementation handoff

`docs/AI_AGENT_BLUEPRINT.md`, `SERVICE_CATALOGUE.json`, `RESEARCH_SOURCES.json`, `PREMIUM_PRICING.md` and `QA_CHECKLIST.md` retain the researched service expansion and future maintenance specification. New prices are indicative planning guides unless they are an existing published core rate. Chef and equipment prices require a supplier quote; no automatic clinical booking was added.

## Wellness schedule and hospitality partnerships

The upgraded public site adds `/wellness-plan`, `/villa-hotel-partners` and a rebuilt `/how-it-works` flow. The partner page is linked from the footer only. Desktop and mobile location navigation expose five Bali areas and the five Jakarta municipalities. North, West and East Jakarta require a professional availability and travel quote. All 53 service guides exceed 1,000 words, and city service views include the complete guide with a consolidated canonical URL.

`src/lib/wellnessPlan.ts` calculates a mixed weekly schedule, applies one eligible 6/9/12-visit discount and keeps travel and excluded services outside the discount. It rejects invalid inputs and flags overlapping visits. Partner and schedule forms prepare reviewable WhatsApp drafts; no message is sent automatically. The shared wellness brief is described as a coordinator-managed service with guest sharing choices, not a deployed account, clinical-record or coach portal. There is no automatic subscription, checkout or health-data storage in these public forms.

Run `npm run lint`, `npm run build`, `npm run verify` and `node scripts/verify-links.mjs`. The content verification includes mixed-plan pricing, unknown travel, participant validation and overlap checks. The link audit checks every prerendered page, internal link, image reference and JSON-LD block.
