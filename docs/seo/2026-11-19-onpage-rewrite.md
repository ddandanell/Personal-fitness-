# On-page rewrite, villa guide and site fixes, 19 November 2026

The owner asked for the Agentic SEO Pipeline output to go live. These changes shipped.

## Rewrites

`src/data/seo-overrides.json` holds title, meta, H1 and the first paragraph under the H1 for 89 routes (P1–P4 of the 18 November rewrite brief). The overrides feed the pre-rendered HTML, Open Graph, Twitter tags and `PageIntro`, so crawlers get them without JavaScript. Hardcoded heroes read them too: home, `/pricing`, `/id`, `/villa-hotel-partners` and `/id/mitra-villa`. Each `/resources` intro links its parent money page with the locked anchor.

## Kept to live facts

- All eight services are bookable, so "on request" wording for services was removed from the brief text.
- Office and Denpasar lines were dropped from `/contact`, in line with the owner policy.
- The "sudah diseleksi" (vetted) claim was dropped.
- The commission stays at 10%.

## Keyword lock

`seo-keyword-lock.json` owners are unchanged. The brief's keyword map differs from the lock on 77 of 98 URLs. For example, the brief gives "personal trainer bali" to `/bali/personal-training`, while the lock keeps it on `/bali`. Only copy changed here. Moving owners in the lock needs a separate owner decision.

## Not applied

- The H2/H3 outline renames in the brief, because section headings are generated from shared data across many pages.
- Measure after 14–28 days before rewriting again.

## New guide

`/resources/can-i-get-a-personal-trainer-to-my-villa-bali` (B032) feeds `/bali/personal-training`, which links to it as "Can I get a trainer to my villa?". It has two WebP images, a lock entry and an llms.txt entry. The daily queue state is untouched.

## Owner requests

- Removed the "Download WhatsApp image" partner link, plus the "Download" (.txt) buttons in the estimator, contact and schedule tools.
- Renamed the partner PDF button "Open the partner menu (PDF)".
- The footer link to `/villa-hotel-partners` now reads "For villa managers" on every page.

## Also added

- Article markdown now renders `**bold**` and image blocks. See `CONTENT.md`.
- Checks: `npm run check:release` passed for 125 pages and 99 sitemap URLs. Lint has the same 5 errors as before, in untouched files.
