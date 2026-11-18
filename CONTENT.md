# Adding content to PersonalFitness.id

Everything below is plain files in the repository. Push to `main` and Vercel builds and publishes it. The build turns each guide into a complete pre-rendered HTML page (title, meta description, canonical, Open Graph, JSON-LD). It also adds the guide to `/resources` and `sitemap-posts.xml`.

## 1. Publish a daily guide (blog post) now

1. **Body.** Save the article as `src/data/blog/bodies/<slug>.md`. Do not include a `# H1`, because the page renders the title as the H1. You can use:
   - `## H2` and `### H3` headings, separated by a blank line.
   - Paragraphs, separated by blank lines.
   - `- ` bullet lists and `1. ` numbered lists. Every line in the block must use the marker.
   - `**bold**` text.
   - `[anchor](/internal-path)` internal links, and `[anchor](https://wa.me/628113803488?text=...)` external links.
   - An image on its own block, written as `![accurate alt text](/images/editorial/<name>.webp)`. A `<name>-640.webp` file must sit next to it. The caption "Photos are illustrative…" is added automatically.
   - Tables, raw HTML and emoji bullets are **not** rendered. Turn a table into a bullet list.
2. **Images.** Save a 1440×960 WebP at `public/images/editorial/<slug>.webp` and a 640px-wide copy at `<slug>-640.webp`. Each must be under 400 KB and must not be used on any other page. Add the route to `src/data/page-images.json` like this: `{ "src", "alt", "width": 1440, "height": 960, "origin" }`.
3. **Record.** Append an object to `src/data/blog/posts.json` with these fields:
   - `slug`, `briefId` (next free `B0xx`), `title` (≤60 characters), `description` (≤155 characters, unique), `date` (`YYYY-MM-DD` in Bali time, never a future date), `primaryQuery`, `service`, `city`, `landingPage` (the money page it feeds), `image`, `imageAlt`, `bodyFile` and `faqs` (a list of `{ "q", "a" }`, rendered with FAQ schema).
4. **Keyword lock.** Add `"/resources/<slug>": { "primaryKeyword": <same as primaryQuery>, "role": "supporting-guide", "commercialOwner": <landingPage> }` to `seo-keyword-lock.json`. The release check fails if the keyword duplicates another page's keyword. Pick a distinct question; never move an existing owner.
5. **llms.txt.** Add the URL above the `## Not booked here` heading in `public/llms.txt`.
6. **Optional money-page link.** To link a money page to the guide with a fixed anchor, add the guide to `FEATURED_GUIDES` in `src/data/seo.ts`.
7. Run `npm ci --ignore-scripts` (first time only), then `npm run check:release`. Commit and push to `main`.

## 2. Queue a guide for the daily publisher instead

Put the body in `src/data/blog/queue/<file>.md` and the record, without `date`, in `src/data/blog/queue/manifest.json`. Add the lock entry and the image too. Each queued guide needs:

- at least 1,000 words,
- a link to its `landingPage`,
- an image that no other page uses.

`npm run publish:next` releases one guide per Bali date. The GitHub workflow `.github/workflows/daily-seo-guide.yml` does the same at 09:00 Bali time. See `src/data/blog/queue/README.md`.

## 3. Change a page's title, meta, H1 or first paragraph

Edit `src/data/seo-overrides.json`, which is keyed by path:

- `title`: ≤60 characters. " | PersonalFitness.id" is appended only when the result still fits.
- `description`: ≤155 characters.
- `h1`
- `intro`: the paragraph under the H1. You can write `[anchor](/path)` links inside it.

These overrides feed the pre-rendered HTML, so crawlers see them without JavaScript. Keyword owners stay in `seo-keyword-lock.json`.

## Facts you must not invent

Prices, travel areas, packs, deposit, reply hours and commission come from:

- `src/data/catalog.ts`
- `src/data/offerCopy.ts`
- `src/config/partner.ts`
- the live `/pricing` page

Never fill founder placeholders such as the legal name, coach names or photos, or the GA4 ID. Never claim reviews, ratings or credentials.
