# PersonalFitness.id site architecture

Local service business: private fitness and wellness at homes and villas in Bali and Jakarta. Architecture follows the local-service SEO template: one canonical URL per intent, city and area pages for geography, service pages for the offer, and editorial URLs that send traffic back to those commercial pages.

## Quality gates

| Check | Result |
|---|---|
| Location pages | 12 (2 cities + 10 areas). Under the 30-page warning. |
| City × service copies | Exist for UX (`/bali/personal-training`) but canonicalise to `/personal-training`. Not in the sitemap. |
| `/services/{slug}` | Canonicalises to `/{slug}`. Not in the sitemap. |
| Professional profile pages | `noindex, follow`. Not in the sitemap. |
| Specialist clinical pages | `noindex, follow`. Not in the sitemap. |
| `priority` / `changefreq` | Not used (ignored by Google). |

## URL map

```
/
├── /services                         (hub)
│   └── /{service}                    (53 families minus noindex specialists)
├── /service-areas
│   ├── /bali
│   │   ├── /bali/canggu
│   │   ├── /bali/seminyak
│   │   ├── /bali/ubud
│   │   ├── /bali/sanur
│   │   └── /bali/uluwatu
│   └── /jakarta
│       ├── /jakarta/south-jakarta
│       ├── /jakarta/central-jakarta
│       ├── /jakarta/north-jakarta
│       ├── /jakarta/west-jakarta
│       └── /jakarta/east-jakarta
├── /pricing  /programmes  /wellness-plan  /how-it-works
├── /professionals                    (indexable hub; profiles noindex)
├── /resources                        (blog hub)
│   └── /resources/{slug}
├── /villa-hotel-partners  /about  /reviews  /faq  /contact
└── /privacy  /terms  /refunds-rescheduling  /safety  /editorial-policy
```

## Keyword lock

Every indexable URL has one primary keyword in `src/data/seo.ts`. That keyword drives the title, meta description, H1 where it is the commercial page, and the internal-link anchor that points to it.

Examples:

| URL | Primary keyword |
|---|---|
| `/` | private fitness Bali Jakarta |
| `/personal-training` | personal trainer at home |
| `/private-yoga` | private yoga at home |
| `/mat-pilates` | mat pilates at home |
| `/bali` | personal trainer Bali |
| `/jakarta` | home personal training Jakarta |
| `/bali/canggu` | personal trainer Canggu |
| `/jakarta/south-jakarta` | personal trainer South Jakarta |
| `/pricing` | personal trainer Bali prices |
| `/resources/...bali...` | personal trainer in Bali |

City and service combination URLs keep unique on-page copy for the visitor, then consolidate to the service canonical so they do not compete with the locked keyword.

## Deep linking

- Breadcrumbs on every page except home, with BreadcrumbList schema.
- Related-link clusters on every locked URL (sibling services, matching city/area, matching guide, pricing, homepage).
- Homepage “Popular searches” row uses the money keywords as anchors.
- Footer lists core services plus the main Bali and Jakarta areas.
- City and area cards link to canonical service URLs (`/personal-training`), not the duplicate city copy.
- Blog CTAs land on the canonical commercial page and the homepage.

## Sitemaps

| File | Contents |
|---|---|
| `/sitemap.xml` | Sitemap index |
| `/sitemap-pages.xml` | Canonical commercial and policy pages, with `<lastmod>` |
| `/sitemap-posts.xml` | Blog and resource URLs, with `<lastmod>` |

`robots.txt` points at `https://www.personalfitness.id/sitemap.xml`. Rebuild with `npm run build` regenerates both the public and `dist` copies from the keyword registry.
