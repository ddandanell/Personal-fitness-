# Daily PersonalFitness content and SEO maintenance

## Sources and ownership

Use the current main branch of ddandanell/Personal-fitness- and the production site https://www.personalfitness.id. Read AGENTS.md, docs/seo/WEBSITE_CHANGES_PROMPT.md, docs/seo/AUTOPILOT.md Growth goal, src/config/partner.ts, seo-keyword-lock.json, src/data/publicOffer.ts, current blog posts and queue, src/data/location-editorial.json, and the latest audit and run notes. Villa-manager partners are the live commercial goal. Never publish null founder placeholders.

The daily maintenance task performs actual implementation and publication. It checks every route through the release audit, fixes supported issues, creates one useful original supporting article when a distinct reader question exists, replenishes the queue and releases at most one queued guide for the Bali date. Do not manufacture an article when it would duplicate an existing answer; improve the answer and record why.

## Daily iteration

1. Open a current checkout, inspect the remote head and any unfinished run or open changes. Resume incomplete publication before adding content. Use connected query, traffic and enquiry data if available. Record unavailable sources without inventing metrics or purchasing units.
2. Review the inventory and select one underserved service or genuine local planning question. Record the distinct informational query, commercial owner, relevant existing location and the intent excluded to protect its owner. Add a new keyword-lock entry without moving an existing owner.
3. Create an original useful guide with accurate current business facts, clear headings, contextual owner and location links, relevant FAQs and a direct next step. Prefer practical session selection and coordination topics over unsupported medical claims. Preserve the 1,000-word minimum for queued guides and all existing location pages. No copied or city-swapped content.
4. Generate a distinct relevant image showing Indonesian adult instructors and international adult clients. Inspect the result. Save a 1440-pixel WebP and 640-pixel variant in public/images/editorial. Add the route to src/data/page-images.json with accurate alt text and dimensions. Do not label the public site as AI-generated or illustrative. Never portray generated people as named staff.
5. Add the article record and body to src/data/blog/queue and its lock before publication. The queue publisher validates ownership, a contextual commercial link, original image paths, image existence and at least 1,000 words. Keep a buffer of seven useful queued articles where feasible. Do not create seven repetitive articles just to fill it.
6. Run npm run publish:next. It uses Asia/Makassar and publishes at most once per date. If that date is already released, keep the new guide queued. An empty queue is an error, not a successful silent stop.
7. Run npm run check:release. It builds complete HTML, verifies content and pricing cases, checks every link and asset and audits metadata, schema parsing, self canonicals, sitemap inclusion, unique primary images and every location's minimum main-content count.
8. Review the diff. Refresh remote main and integrate concurrent changes without overwriting them. Commit and push the tested source and a dated run note. main is the existing production branch. If protection requires a PR, create and merge one only after its actual required checks; do not bypass protection.
9. Observe GitHub's Vercel status for the exact commit. Run npm run verify:live -- <published-SHA> after deployment; it checks the revision, 41 public location routes, homepage, new guide, image variants and sitemap. The connected Vercel project may not be visible to this session, so do not create another project. Verify production /build-info.json matches the commit, then fetch changed routes, canonical, robots, image and sitemap. Check representative mobile and desktop layouts without sending live enquiries.
10. Record the actual result, URLs, commit, checks, queue balance, data limitations and next action. If publication fails, retain the tested change and report the exact failure. Make at most two focused repairs; revert only this run's faulty work when needed.

## Growth goal

The live commercial goal is B2B villa partners first, then guest conversion. Read docs/seo/WEBSITE_CHANGES_PROMPT.md and src/config/partner.ts before each daily run.

Pitch: put the wellness menu in every villa they manage. Guests book on WhatsApp, our coach comes to the villa, the guest pays us, the partner earns a commission on every session. No sales meetings and no calendar booking.

Daily runs must keep this true without inventing founder values:

- Partner page `/villa-hotel-partners` and Bahasa `/id/mitra-villa` explain the programme in plain words. Commission % renders only when `COMMISSION_PCT` is set; otherwise “a commission on every session”.
- `/partner-terms`, printable `/partners/menu`, and `/partners/villa-wellness-menu.pdf` stay live and linked.
- `?ref=` is stored and appended as `Ref: CODE` on every WhatsApp message.
- WhatsApp and partner events fire (`whatsapp_click`, `partner_whatsapp_click`, `partner_form_submit`, `partner_deck_download`, `estimator_used`, `email_click`).
- `/team` and `/about` stay honest. Founder and coach cards render only when photo plus certification exist. No fake reviews, ratings, logos or AggregateRating.
- Group yoga rate and partner demo FAQ render only when those config flags are set.
- Titles stay ≤60 characters using the branded-title rule. Do not invent Google Business Profile, Instagram, geo coordinates or NIB.
- Keep every original sitemap URL returning 200. Run `npm run check:urls` against the preview after publication.

Founder still to fill in `src/config/partner.ts`: COMMISSION_PCT, COMMISSION_BASE, COMMISSION_PAYOUT_DAY, GROUP_YOGA_RATE_BALI, GROUP_YOGA_MAX_PEOPLE, DEMO_POLICY, LIABILITY_TEXT, FOUNDER, COACHES, INSTAGRAM_URL, GBP_URL, OFFICE_GEO, COORDINATION_HOURS, GA4_ID (or Vercel `VITE_GA_MEASUREMENT_ID`). Apex 308 is a Vercel Domains setting if the dashboard still uses 307.

## Standing conversion and trust work

Each daily run should also take one lock-safe item from this list, in order, without inventing reviews, credentials, Instagram, NIB, clinical results or a Google Business Profile that does not exist:

1. Trust that is true: company-managed matching, named professional on the quote, coordinator, backup, WhatsApp, email, Denpasar office-as-office. No fake reviews or AggregateRating.
2. Explain the published rate versus cheaper freelance Bali hours. Keep the no-free-intro fact.
3. Reduce defensive repetition. Keep one confirmation line and one meditation-is-not-therapy line on the service page.
4. WhatsApp click events (`whatsapp_click`) plus GA4 when `VITE_GA_MEASUREMENT_ID` is set in Vercel. Missing GA4 is unavailable evidence, not zero traffic.
5. Indonesian coverage: `/id` owns `personal trainer datang ke rumah`. Add further ID money pages only with unique copy and return hreflang.
6. Area uniqueness: keep every location page above 1,000 main words with local access notes, not city-swapped padding.
7. Operator tasks that code cannot invent: create/claim Google Business Profile as a service-area business (not a walk-in studio), connect Search Console, add the GA4 measurement ID, collect consented guest notes if they exist. Record these as blocked until the owner supplies them.

## Backup publisher

.github/workflows/daily-seo-guide.yml is scheduled for 01:00 UTC, 09:00 Bali. It releases at most one existing queued article per Bali date, runs the complete release checks before committing and refuses to overwrite a concurrent main change. The maintenance task can also publish using the same state, so the two paths do not duplicate a daily guide. A workflow file alone does not prove GitHub Actions is enabled or that a scheduled run has succeeded. Check actual runs.

## Evidence and review

Current official guidance consulted on 14 November 2026:

- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/search/docs/appearance/google-images
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable

A word count is the owner's content requirement, not a Google ranking threshold. Monitor indexing and useful enquiries when data becomes available. Allow at least 14 complete days for an initial content assessment and 28 for conversion comparisons; do not keep rewriting titles based on unmeasured daily fluctuations.
