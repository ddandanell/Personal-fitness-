# Daily SEO guide queue

One unique, lock-safe article is published each day by `.github/workflows/daily-seo-guide.yml`.

The publisher (`scripts/publish-next-guide.mjs`) takes the first item in `manifest.json`, copies its markdown into `../bodies/`, appends it to `../posts.json` with today's Jakarta date, then commits if GitHub Actions is enabled.

## Gates (the job fails instead of shipping thin pages)

- At least 1,000 words
- At least three markdown internal links (`[label](/path)`)
- Must cite `personalfitness.id` or `811-3803-488`
- Forbidden: AI-generated, illustrative profile, 140 service, 53 service, AggregateRating, NIB
- No invented prices, reviews, clinical claims, or legal entity

## Adding the next week of guides

1. Write a unique `.md` body in this folder (not a rewrite of a live article).
2. Add a record to `manifest.json` with `bodyFile`, `slug`, `briefId`, FAQs and money-page `landingPage`.
3. Do not set `date` — the publisher stamps the Jakarta calendar day.
4. Keep area cluster pages noindex. Cluster intent belongs in indexable `/resources/` guides that canonical-link to `/{bali|jakarta}`.
5. Do not add `/bali/mobility-coaching` or `/jakarta/mobility-coaching`.

Local dry run:

```bash
npm run publish:next
```

If `state.json` already has today's Jakarta date, the script exits without publishing.
