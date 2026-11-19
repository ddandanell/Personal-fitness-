# 19 November 2026: keyword lock system

- Built `src/data/seo/keyword-map.json` (108 URLs: 99 live, 9 queued; 56 money pages, 39 support guides) from the 18 Nov SEO engine map, the legacy lock and GSC (21 Aug–19 Nov 2026, 210 impressions, 2 clicks).
- Added `scripts/seo/check-keyword-map.mjs` to `check:release`, `scripts/seo/gsc-report.mjs`, `src/data/seo/changelog.json`, `src/data/seo/blog-backlog.json`, `docs/SEO_SYSTEM.md`.
- Fixed 84 check failures: meta descriptions on 20 money/conversion pages and 27 live guides, planned title/meta for 9 queued guides, contextual money-page links in 6 site guides, 5 queued guides and 3 posts (plus 2 more opening links).
- GSC first pass (titles): /pricing, /bali/personal-training, /bali/boxing-fitness, /mat-pilates, /jakarta/mat-pilates, /private-yoga. Evaluate 17 Dec 2026.
- Money pages now list up to three supporting guides from the map.
- GSC sample is small; treat the first-pass changes as hypotheses.
