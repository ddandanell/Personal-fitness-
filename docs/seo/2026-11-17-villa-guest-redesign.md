# Villa guest demonstration redesign

Owner brief: implement the supplied Villa Dashboard Blueprint as the guest alone sees it, on villademo.personalfitness.id. This replaces the public manager explanations and view switcher with a complete guest wellness experience.

## Delivered

- Responsive villa welcome, eight photographic service cards and functional category filters.
- New villa and eight distinct session photographs, with 1600px and 640px WebP variants. All sessions show Indonesian adult instructors and international adult guests. These are unnamed session scenes. Internal prompt record: docs/villa-demo-image-prompts.md.
- Service detail pages with inclusions, setup, existing rate and participant rules, and session packs.
- Short date, time, participant and contact request form. The selected villa and total are carried through to the receipt and My booking.
- Per-tab demo storage, validation, duplicate-request protection and an explicit demo receipt. No live charge, instructor assignment, email or WhatsApp is sent by the booking form or concierge chat.
- Guest help, FAQ, local demonstration concierge chat and accessible keyboard-dismissable QR dialogs.
- Stable QR destination https://villademo.personalfitness.id/q/sora-table and printable guest card.
- Removed publicly routed partner and operations screens. Legacy host routes resolve to the guest menu. Demo remains excluded from indexing and public sitemap.
- All new styling is scoped to .sora so the main commercial website retains its styling and content.

## Commercial scope

Preserved the existing demo rate of Rp 1.050.000 for one guest and Rp 250.000 for a second guest. Bodywork remains one guest. Existing packs and 36-hour rescheduling copy are retained. Cards say From when a second guest can change the total. No held public services, founder fields, testimonials or credentials were added.

## Validation

- npm run check:release passed: 123 complete pages, 7,768 internal links, 1,600 asset references and 323 structured-data blocks.
- SEO checks: all 41 location pages retained, minimum 1,317 main-content words; 105 locked keywords retained.
- check-urls against the production preview: all 97 sitemap URLs returned HTTP 200.
- Static host checks: 10 guest routes passed, including legacy partner, ops and portal URLs.
- Eight homepage service cards, all 18 image dimensions and noindex metadata verified.
- TypeScript and git diff whitespace checks passed.

The local preview could not be reached from the connected cloud browser. Live browser verification follows deployment through the existing repository integration. No separate Vercel project was created; the connected Vercel account did not expose this existing project.
