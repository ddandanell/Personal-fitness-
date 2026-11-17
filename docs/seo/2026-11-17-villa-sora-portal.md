# 17 November 2026 — Villa Sora booking demo

Rebuilt the noindex villa demo from latest main, after pull requests 4 and 5. Villa Sora has a guest menu, request, private status, help, partner desk, coordination queue, QR card, and a manager explainer. Sample data only. No email is sent. Partner copy does not mention an app or a system.

`npm run check:release` passed: 124 prerendered pages, 95 sitemap URLs, location minimum 1,282 words. `/villademo` stays out of both sitemaps. `public/robots.txt` disallows `/villademo`.

Local static preview on port 4173, after the host map was reloaded:

- `Host: demo.localhost` `/` returned “Welcome to Villa Sora”.
- A Private Yoga request stored one reference in that browser and opened `/booking/{token}`.
- The confirmation step reads “Payment details sent with confirmation”.
- `Host: villas.localhost` `/v/villa-sora` returned the same guest menu. `/` returned the portal entry.
- `Host: 127.0.0.1` `/pricing` stayed the public pricing page.

Search Console and GA4 were not queried.
