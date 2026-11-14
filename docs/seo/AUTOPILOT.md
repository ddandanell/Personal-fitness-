# Daily PersonalFitness content and SEO maintenance

## Sources and ownership

Use the current main branch of ddandanell/Personal-fitness- and the production site https://www.personalfitness.id. Read AGENTS.md, seo-keyword-lock.json, src/data/publicOffer.ts, current blog posts and queue, src/data/location-editorial.json, and the latest audit and run notes.

The daily maintenance task performs actual implementation and publication. It checks every route through the release audit, fixes supported issues, creates one useful original supporting article when a distinct reader question exists, replenishes the queue and releases at most one queued guide for the Bali date. Do not manufacture an article when it would duplicate an existing answer; improve the answer and record why.

## Daily iteration

1. Open a current checkout, inspect the remote head and any unfinished run or open changes. Resume incomplete publication before adding content. Use connected query, traffic and enquiry data if available. Record unavailable sources without inventing metrics or purchasing units.
2. Review the inventory and select one underserved service or genuine local planning question. Record the distinct informational query, commercial owner, relevant existing location and the intent excluded to protect its owner. Add a new keyword-lock entry without moving an existing owner.
3. Create an original useful guide with accurate current business facts, clear headings, contextual owner and location links, relevant FAQs and a direct next step. Prefer practical session selection and coordination topics over unsupported medical claims. Preserve the 1,000-word minimum for queued guides and all existing location pages. No copied or city-swapped content.
4. Generate a distinct relevant image showing Indonesian adult instructors and international adult clients. Inspect the result. Save a 1440-pixel WebP and 640-pixel variant in public/images/editorial. Add the route to src/data/page-images.json with accurate alt text and dimensions. Preserve the visible illustrative-image disclosure. Never portray generated people as actual confirmed professionals.
5. Add the article record and body to src/data/blog/queue and its lock before publication. The queue publisher validates ownership, a contextual commercial link, original image paths, image existence and at least 1,000 words. Keep a buffer of seven useful queued articles where feasible. Do not create seven repetitive articles just to fill it.
6. Run npm run publish:next. It uses Asia/Makassar and publishes at most once per date. If that date is already released, keep the new guide queued. An empty queue is an error, not a successful silent stop.
7. Run npm run check:release. It builds complete HTML, verifies content and pricing cases, checks every link and asset and audits metadata, schema parsing, self canonicals, sitemap inclusion, unique primary images and every location's minimum main-content count.
8. Review the diff. Refresh remote main and integrate concurrent changes without overwriting them. Commit and push the tested source and a dated run note. main is the existing production branch. If protection requires a PR, create and merge one only after its actual required checks; do not bypass protection.
9. Observe GitHub's Vercel status for the exact commit. The connected Vercel project may not be visible to this session, so do not create another project. Verify production /build-info.json matches the commit, then fetch changed routes, canonical, robots, image and sitemap. Check representative mobile and desktop layouts without sending live enquiries.
10. Record the actual result, URLs, commit, checks, queue balance, data limitations and next action. If publication fails, retain the tested change and report the exact failure. Make at most two focused repairs; revert only this run's faulty work when needed.

## Backup publisher

.github/workflows/daily-seo-guide.yml is scheduled for 01:00 UTC, 09:00 Bali. It releases at most one existing queued article per Bali date, runs the complete release checks before committing and refuses to overwrite a concurrent main change. The maintenance task can also publish using the same state, so the two paths do not duplicate a daily guide. A workflow file alone does not prove GitHub Actions is enabled or that a scheduled run has succeeded. Check actual runs.

## Evidence and review

Current official guidance consulted on 14 November 2026:

- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/search/docs/appearance/google-images
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable

A word count is the owner's content requirement, not a Google ranking threshold. Monitor indexing and useful enquiries when data becomes available. Allow at least 14 complete days for an initial content assessment and 28 for conversion comparisons; do not keep rewriting titles based on unmeasured daily fluctuations.
