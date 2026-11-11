# PersonalFitness.id public website

A React and TypeScript website for private fitness and wellness at homes and villas in Bali and Jakarta. The expanded catalogue contains 140 offer formats across 53 service families and 15 categories, plus 26 detailed illustrative instructor and specialist profiles and 32 original generated photographs.

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

The enquiry helper runs in the current browser page and prepares a draft for the existing configured PersonalFitness WhatsApp destination, clipboard copy or text-file download. It does not send a message, process payment or confirm a booking. The chosen service format and illustrative approach preference carry into the draft. Unpriced specialist requests state that a written quote is required rather than generating a zero-price estimate.

## Content and imagery

`src/data/wellness-services.json` owns the service families and 140 format records. `service-articles.json` contains the longer service content. `professional-profiles.json` and `professional-articles.json` contain the 26 profile guides and their detailed copy. All profile articles exceed 500 words. The earlier names and URLs are retained, with explicit illustrative status and no unverified experience or credential claims.

Generated Indonesian professional imagery is under `public/images/professionals/`, with service-specific imagery under `public/images/services/`. Image prompt/provenance manifests are in `docs/`. These images and profiles are illustrative, not verification of real employees. Actual identity, qualifications, clinical authority, scope and availability must be checked before confirming delivery. Illustrative individual profile pages and gated specialist pages are excluded from the indexable sitemap.

## Research and implementation handoff

`docs/AI_AGENT_BLUEPRINT.md`, `SERVICE_CATALOGUE.json`, `RESEARCH_SOURCES.json`, `PREMIUM_PRICING.md` and `QA_CHECKLIST.md` retain the researched service expansion and future maintenance specification. New prices are indicative planning guides unless they are an existing published core rate. Chef and equipment prices require a supplier quote; no automatic clinical booking was added.
