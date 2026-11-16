# 16 Nov 2026 — villa partner programme pass

Standing daily goal is now B2B villa partners first. Source of truth: `docs/seo/WEBSITE_CHANGES_PROMPT.md` plus `src/config/partner.ts`. AUTOPILOT Growth goal and AGENTS.md point at both.

## Shipped this pass

P1–P14 from the prompt, with founder values left null so placeholder text never renders.

- `/villa-hotel-partners` rewritten as the partner programme. Bahasa pair `/id/mitra-villa`.
- `/partner-terms`, `/team`, printable `/partners/menu`, PDF `/partners/villa-wellness-menu.pdf`.
- `?ref=` stored and appended as `Ref: CODE` on every WhatsApp prefill.
- Events: `whatsapp_click`, `partner_whatsapp_click`, `partner_form_submit`, `partner_deck_download`, `estimator_used`, `email_click`, `partner_code`.
- Header “For villa managers”, footer Partner programme / Partner terms / Team / Untuk villa.
- Titles shortened, thin resource notes expanded, group yoga and demo FAQ gated on config.
- Cache headers, vendor chunks, `scripts/check-urls.mjs`, sitemap includes the new indexable URLs and excludes `/partners/menu`.

No second daily blog on 16 Nov (B020 already live).

## Founder still to fill in `src/config/partner.ts`

COMMISSION_PCT, COMMISSION_BASE, COMMISSION_PAYOUT_DAY, GROUP_YOGA_RATE_BALI, GROUP_YOGA_MAX_PEOPLE, DEMO_POLICY, LIABILITY_TEXT, FOUNDER, COACHES, INSTAGRAM_URL, GBP_URL, OFFICE_GEO, COORDINATION_HOURS, GA4_ID (or Vercel `VITE_GA_MEASUREMENT_ID`).

## Operator only

- Vercel → Project → Domains: set apex `personalfitness.id` → `www.personalfitness.id` as **308 Permanent** if the dashboard still uses 307.
- Create/claim Google Business Profile as a service-area business, not a walk-in studio.
- DNS/host for hallo@personalfitness.id.
- Search Console property for www.personalfitness.id.
