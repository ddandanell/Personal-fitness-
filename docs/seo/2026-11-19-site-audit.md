# Site audit and alignment, 19 November 2026

Owner request: go through the whole website so it matches how the business works today, and make sure everything works.

## Crawl results (before fixes)

- All 99 sitemap URLs plus 58 contact links that carry a service or area returned 200. No broken internal or external links or images, and no missing alt text.
- Every WhatsApp link targets 628113803488 and every mailto targets hello@personalfitness.id.
- Headless Chrome: no console or page errors on any page and no horizontal overflow at 390 px.
- Published prices agree across all pages (base, packs, second guest, 90 minutes).

## Fixes

- a55d7c6: `/api/enquiry` returned 500 FUNCTION_INVOCATION_FAILED on every submit (ERR_MODULE_NOT_FOUND, because the ESM import paths had no `.js` extensions). Relative imports now use `.js`, so contact and partner leads save to Supabase again.
- a55d7c6: Removed the fixed reschedule note above the WhatsApp button. It covered content on desktop, including the home hero facts. The policy stays in the page policy summaries.
- a55d7c6: Service areas lists Bali and Jakarta travel coverage correctly. Travel-fee wording was removed from the editorial policy, the PIK page and three guides.
- 938fd4e: A lead saved to Supabase returns success even when email delivery is off or fails. Visitors only see an error when nothing was saved or sent. The email path is unchanged, and `check:enquiry` covers the new cases.
- 938fd4e: Owner rule, never mention guest travel fees. Wording that travel is quoted, charged or added was removed site-wide (North/West/East Jakarta, BSD, PIK, programme exclusions, 90-minute notes, quote checklists, meta descriptions, Indonesian homepage). It was replaced with neutral by-request availability wording, and no fee was added. Removed the hidden travelFee render code, which was always zero. Fixed a sentence that appeared twice in the queued meditation-room guide.
- 938fd4e: Owner rule, heroes cover only what/who/how. Service-page price pills, city-service and city-hub starting prices moved to the first section below the hero. The area-hero travel line was dropped. H1s and titles are unchanged.
- 4c5c377: Fixed the duplicated heading "A private private yoga visit".
- This change: Home and /id hero fact strips no longer show prices. The prices (strength training, 5-session pack, second guest) moved into the first section below the hero. Softened the unverified "sudah diseleksi" (vetted) claim on /id.

## Validation

- `npm run check:release` passed before each push, including the keyword map check. Outer-Jakarta meta descriptions were kept within 120-160 characters.
- Each deploy was confirmed READY on Vercel, with build-info.json matching the pushed commit. Changed pages were checked live.
- Labelled test enquiries, as the owner's agent asked (name "TEST – website audit, ignore"): one contact and one partner submission at 17:29 WITA, and one contact submission at 17:38 WITA. All are saved in Supabase, and no email went out because no mail provider is configured.

## Open owner decisions

- Email delivery for website forms needs a mail provider (Gmail SMTP app password or a Resend key) on Vercel.
- Mobility coaching, boxing fitness and guided meditation are still published as core services alongside the five the owner described.
- The pricing page hero keeps its price strip, because prices are the subject of that page.
