# SEO system: keyword lock, optimisation loop, blog lift

Owner decision, 19 November 2026: every indexable URL is locked to one search keyword, money pages are optimised from Search Console data, and every blog post exists to lift one money page. Use this for every website change, not only SEO work.

## 1. Files

| File | Role |
|---|---|
| `src/data/seo/keyword-map.json` | **Single source of truth.** Every indexable page and queued guide → `type`, `money`, `priority`, one `primary` keyword, `secondary` keywords, locked `anchor` (money pages) or `target` money page (support pages), GSC baseline. |
| `src/data/seo/changelog.json` | Every change to a title, meta description, H1 or primary keyword, with old/new, reason, GSC baseline and `evaluateOn` (+28 days). |
| `src/data/seo/blog-backlog.json` | Ranked next blog keywords, each with its target money page. |
| `src/data/seo-overrides.json` | The copy itself: title, meta description, H1, hero intro per URL. |
| `scripts/seo/check-keyword-map.mjs` | Enforcement (`npm run check:keywords`, part of `npm run check:release`). |
| `scripts/seo/gsc-report.mjs` | Optimisation report from GSC exports (`npm run seo:report`). |
| `docs/seo/gsc/<date>-*.json` | GSC exports pulled through the Search Console connector. |
| `seo-keyword-lock.json` | Legacy URL ownership ledger used by `verify-seo.mjs` and the queue publisher. Its phrases are internal IDs; do not edit it to pass a check. The keyword map decides what copy targets. |

## 2. Page types

Money pages (they earn): `home` (/, /id), `service` (/personal-training, /private-yoga, /mat-pilates, /bodywork-recovery, /zumba-dance-fitness, /mobility-coaching, /boxing-fitness, /guided-meditation), `service-area` (/bali/*, /jakarta/* services), `area` (/bali, /jakarta, every area page), `pricing` (/pricing, /programmes), `partners` (/villa-hotel-partners, /id/mitra-villa), `hub` (/services, /service-areas).
Support pages: `support` (every /resources/ guide). Each has exactly one `target` money page.
Conversion pages (`conversion`: /contact, /how-it-works, /faq) are checked like money pages but are never blog targets.
`utility` (legal, team, about, editorial, /resources hub): mapped and unique; copy rules are warnings only.

## 3. The lock rules (enforced on every release)

1. Every indexable route, every lock entry and every queued guide is in the map. Never delete a page from the map to pass.
2. One primary keyword per URL. Same words in any order count as a duplicate. A blog post never targets a money page's primary keyword.
3. The primary keyword's words appear in the `<title>`, the H1 and the meta description (stop words such as in/at/for/your are ignored; plural s is ignored).
4. Title ≤ 60 characters. Meta description 120–160 characters.
5. Support pages link their target money page inside the body copy. New posts (dated 20 Nov 2026 or later) and everything in the queue: first link within the first 150 words and at least 2 links to the target.
6. Site rules in title/meta/H1/hero: no "(on request)", no guest travel fee, no `[company legal name]`. Hero intros ≤ 35 words with no prices. Villa management stays out of the home hero (it lives in the footer).
7. Backlog rows target a money page and do not reuse a locked primary keyword.

Money pages automatically show up to three "related guides" links back to the support guides locked to them (`supportGuidesFor` in `src/data/seo.ts`), so adding a guide to the map is enough to create the link back.

## 4. Writing a blog post (daily routine)

1. Take the first `next` row in `src/data/seo/blog-backlog.json` (skip founder-gated or already-covered topics; keep about 4 English to 1 Bahasa).
2. The post's primary keyword is the backlog `keyword` (a support question), never the target's primary.
3. In the first 150 words, link the target money page with its locked `anchor` from the map. Link it once more later with a natural variant. Add 1–4 more internal links to related money pages.
4. Title ≤ 60 characters, meta 120–160 characters, both containing the post keyword. H1 contains it too.
5. Add the page to `keyword-map.json`: `{"type":"support","money":false,"status":"live","priority":"P3","primary":"<keyword>","secondary":[...],"target":"<money page>"}`. Add a lock entry in `seo-keyword-lock.json` for the new URL (as the publishing section of the blueprint says). Set the backlog row to `published`.
6. `npm run check:release` must pass, then push to main and verify live.

## 5. Optimisation loop (weekly, and after each 28-day window)

1. Pull GSC through the connector (`user-Google-search-console` → `query_search_analytics`, `siteUrl` `sc-domain:personalfitness.id`, last 90 days, `dataState` `all`): once with dimensions `["query","page"]` (rowLimit 5000) and once with `["page"]`. Save the JSON as `docs/seo/gsc/<date>-query-page.json` and `docs/seo/gsc/<date>-page.json` (same shape as the 2026-11-19 files).
2. `npm run seo:report` → `docs/seo/gsc-report-<date>.md`.
3. Act on it:
   - **A. Low CTR** (money page, ≥ 50 impressions, position ≤ 10, CTR below 8% / 4% / 1.5% for positions 1–3 / 4–5 / 6–10): rewrite the title/meta in `seo-overrides.json` around the locked primary plus the queries Google already shows. Keep the locked H1. While data is thin, act on the A2 watchlist only with a clear query signal.
   - **B. Striking distance** (queries at position 5–20): add a backlog row targeting the money page that owns the landing page, or strengthen that page's section for the query.
   - **C/D. Cannibalisation or misrouting**: add internal links from the page Google picked to the locked owner with the locked anchor; if a support page outranks its money page for the money keyword, retitle the support page.
   - **E. Due evaluations** (day 28): compare `baseline` with now and write `result` (`kept`, `reverted`, `neutral`, `inconclusive`) and the new numbers into the changelog entry. With 300+ impressions in the window: keep if CTR rose 20%+ without a serious position loss or if position improved; revert the title/meta if CTR fell 20%+ or the locked keyword lost 3+ positions. Below 300 impressions the verdict is inconclusive: keep and re-check in 28 days. Never auto-revert prices, facts or technical fixes.
4. Log every copy change in `changelog.json` before pushing: `date`, `page`, `primary`, `kind` (`gsc-ctr`, `keyword-lock`, `relock`, ...), `reason`, `title`/`description` `{old,new}`, `baseline` `{window, impressions, clicks, position}`, `evaluateOn` (+28 days).
5. Changing a primary keyword (a relock) needs a GSC reason, a changelog entry of kind `relock`, and a check that no other page owns it.
6. After pushing: resubmit `https://www.personalfitness.id/sitemap.xml` in Search Console and inspect the changed URLs.

## 6. Every other website change

Before editing any page, read its map entry. Keep its primary keyword in the title, H1 and meta; do not add another page's primary keyword to a title or H1; link money pages with their locked anchor. If the change touches copy that Google sees (title, meta, H1, intro), log it in the changelog.
