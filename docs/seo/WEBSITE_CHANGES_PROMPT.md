# COPY-PASTE PROMPT FOR YOUR AI CODING ASSISTANT — personalfitness.id
(Paste everything below the line into Cursor / Claude Code / Copilot etc., opened on the personalfitness.id repository. Fill the [SQUARE_BRACKET] values first, or leave them: the assistant must then hide those sections, never publish the placeholder.)

---
You are a senior React + SEO engineer working on the personalfitness.id codebase: a Vite-built React single-page app with react-router, pre-rendered/streamed HTML, deployed on Vercel. Make the changes below in priority order (P0 first), in small, reviewable commits, one commit per item ID (e.g. `P1: partner page rewrite`). Before editing, explore the repo and report back: where routes are defined, how pages/content are stored (TSX, MD, JSON, CMS), how titles/metas/JSON-LD/OG are set, how sitemap-*.xml and llms.txt are generated, how WhatsApp links and the estimator build their messages, and vercel.json/vite.config. Then implement.

## Business context
PersonalFitness.id is a company-managed private fitness service. A vetted coach comes to the client's villa or home in Bali and Jakarta. Six 60-minute sessions with published starting prices (do NOT change them):
| Session | Bali | Jakarta | Notes |
|---|---|---|---|
| Personal training | Rp 900.000 | Rp 950.000 | 1 person; extra person +Rp 250.000 / +Rp 275.000 |
| Private yoga | Rp 850.000 | Rp 900.000 | up to 2 people |
| Mat Pilates | Rp 950.000 | Rp 1.000.000 | no reformer; extra person as PT |
| Mobility & stretching | Rp 850.000 | Rp 900.000 | non-clinical; extra person as PT |
| Boxing fitness | Rp 1.000.000 | Rp 1.050.000 | pads only, 1 person |
| Guided meditation | Rp 800.000 | Rp 850.000 | up to 2 people |
90 minutes = +45%. Packs of 6/9/12 sessions = 5/8/12% off session charges. Bali: Canggu + Seminyak included; Ubud, Sanur +Rp 150.000; Uluwatu +Rp 200.000 travel per visit. Jakarta: South + Central included; North/West/East by quote. Contact: WhatsApp +62 811-3803-488 (wa.me/628113803488), hallo@personalfitness.id, office Jl. Tukad Barito Timur III No.16, Panjer, Denpasar (office, not a studio).

## Growth strategy these changes serve
The main growth channel is now B2B: villa management companies, villa rental agencies, boutique resorts, retreat hosts and concierge companies (Bali first, Jakarta where relevant). Pitch: "Put our wellness menu in every villa you manage. Guests book on WhatsApp, our coach comes to the villa, the guest pays us, you earn [COMMISSION_PCT]% of every session." Outreach is email first, then WhatsApp. There are NO sales meetings and NO calendar booking: villa managers must be able to understand the offer, download the menu, read the terms and join over WhatsApp/the form without a call. Indonesian villa managers prefer WhatsApp and simple, plain language; many prefer Bahasa Indonesia. The site must therefore: (1) explain the partner programme in plain words with the commission stated, (2) give a downloadable partner menu/deck, (3) give a one-tap WhatsApp + simple join form, (4) show real people (trust), (5) track every WhatsApp click and partner action, (6) fix the SEO issues found in the audit.

## Hard rules
1. Do NOT break existing URLs. All 90 URLs currently in sitemap-pages.xml and sitemap-posts.xml must still return 200 with the same canonical (list them from the sitemap files in the repo and write a small script `scripts/check-urls.mjs` that requests each one against a preview URL). Only add URLs. If you merge a page, add a 308 redirect in vercel.json, remove it from the sitemap and update internal links.
2. Never render placeholder values. Put founder-supplied values in one config file `src/config/partner.ts` (or the repo's equivalent): COMMISSION_PCT, COMMISSION_BASE, COMMISSION_PAYOUT_DAY, GROUP_YOGA_RATE_BALI, GROUP_YOGA_MAX_PEOPLE, DEMO_POLICY, LIABILITY_TEXT, FOUNDER {name, photo, bio, whatsapp}, COACHES[], INSTAGRAM_URL, OFFICE_GEO, COORDINATION_HOURS, GA4_ID. If a value is null, the dependent block does not render (and the commission sentence falls back to "a commission on every session").
3. Never invent reviews, ratings, clients, logos, certifications, statistics or photos. No `aggregateRating` in JSON-LD.
4. Keep prices identical everywhere (pricing, service pages, estimator, partner page, PDF, llms.txt, JSON-LD). Add a unit test or script that greps built HTML for the six Bali prices.
5. Plain, warm English. No defensive/legal tone in marketing copy (see P10). Legal detail lives in /terms, /refunds-rescheduling and /partner-terms.
6. Accessibility: buttons are real buttons/links, form fields have labels, colour contrast AA.
7. After each item, run the build, run `scripts/check-urls.mjs`, and list what changed + how to verify.

## Bahasa Indonesia copy for P7 (/id/mitra-villa) — use as final copy
- Title: `Program Mitra Wellness Villa di Bali | PersonalFitness.id`
- Meta: `Tambahkan yoga, personal training dan Pilates di setiap villa Anda. Kami kirim coach, tamu pesan lewat WhatsApp, Anda dapat komisi [COMMISSION_PCT]% per sesi.`
- H1: `Wellness untuk setiap villa Anda. Anda dapat komisi dari setiap sesi.`
- Sub: `Yoga, personal training, Pilates, stretching, boxing dan meditasi, langsung di villa tamu Anda oleh coach kami. Tim Anda tidak perlu kerja tambahan. Anda dapat [COMMISSION_PCT]% dari setiap sesi yang dibayar.`
- Buttons: `WhatsApp kami tentang villa Anda` (pre-fill: `Halo PersonalFitness.id, saya mengelola villa dan ingin menu partner. Perusahaan: ___ · Jumlah villa: ___ · Lokasi: ___`) · `Unduh menu partner (PDF)`
- Cara kerja: 1. `Kami kirim kartu menu dan kode QR untuk setiap villa, dengan nama Anda.` 2. `Tamu scan dan pesan lewat WhatsApp. Pesanan membawa kode partner Anda.` 3. `Coach kami datang ke villa. Tamu membayar ke kami.` 4. `Anda dapat [COMMISSION_PCT]% dari setiap sesi yang dibayar, setiap bulan, dengan laporan sederhana.`
- Yang bisa dipesan tamu: Yoga privat mulai Rp 850.000 (maks. 2 orang) · Personal training mulai Rp 900.000 · Mat Pilates mulai Rp 950.000 · Mobility & stretching mulai Rp 850.000 · Boxing fitness mulai Rp 1.000.000 · Meditasi terpandu mulai Rp 800.000. Catatan: `Harga Bali, 60 menit. Canggu dan Seminyak sudah termasuk. Ubud dan Sanur +Rp 150.000, Uluwatu +Rp 200.000 biaya perjalanan per kunjungan.`
- Jadwal yoga mingguan: `Beri tamu sesuatu yang dinanti. Contoh: yoga pagi privat Senin, Rabu, Jumat pukul 08:00 di villa masing-masing tamu. Tamu memesan paling lambat pukul 18:00 sehari sebelumnya.`
- Yang Anda dapat: `Kartu menu + QR untuk setiap villa` · `Halaman tamu untuk welcome pack atau aplikasi` · `Pemesanan lewat WhatsApp dengan kode partner Anda` · `Koordinator yang jelas` · `Laporan dan pembayaran komisi bulanan` · `Pilot 30 hari di 1–2 villa dulu`.
- Form labels: Nama perusahaan* · Nama Anda* · Jabatan · Nomor WhatsApp* · Email · Jumlah villa* · Lokasi* · Villa untuk mulai · Ada tempat untuk 2 matras yoga? · Bahasa menu tamu. Persetujuan*: `Saya setuju PersonalFitness.id menghubungi saya lewat WhatsApp dan email tentang program partner.` Tombol: `Kirim lewat WhatsApp`.
- FAQ: Siapa yang membayar? `Tamu membayar ke kami. Kami bayar komisi Anda setiap bulan.` · Perlu kontrak? `Hanya syarat partner singkat kami.` · Kalau coach berhalangan? `Kami langsung kabari tamu dan tawarkan waktu baru atau pengembalian dana penuh.` · Privasi tamu? `Tim Anda hanya menerima jadwal dan villa. Catatan kesehatan tamu hanya untuk coach.` · Asuransi dan tanggung jawab? `Tanyakan kepada kami, kami kirim penjelasan tertulis.` · Area mana saja? `Canggu dan Seminyak termasuk; Ubud, Sanur, Uluwatu dengan biaya perjalanan; area lain bisa ditanyakan.`
- Footer CTA: `Ada pertanyaan? WhatsApp +62 811-3803-488. Dibalas oleh orang sungguhan.`

## The change list (implement all; details, final copy and acceptance criteria per item)
## Priority overview
| # | Change | Priority | Effort |
|---|---|---|---|
| P1 | Partner page rewrite `/villa-hotel-partners` with commission terms + villa-manager WhatsApp CTA + form | P0 | M |
| P2 | Partner terms page `/partner-terms` | P0 | S |
| P3 | Partner deck/menu: printable `/partners/menu` (A5 card with QR + partner code) and PDF download `/partners/villa-wellness-menu.pdf` | P0 | M |
| P4 | Partner WhatsApp pre-fills with partner code `?ref=` attribution | P0 | S |
| P5 | Analytics (GA4) + WhatsApp click tracking + partner events | P0 | S |
| P6 | Trust: founder/team page `/team`, About rewrite, real photos replacing "illustrative" images | P0 (content blocked on founder) | M |
| P7 | Bahasa Indonesia partner page `/id/mitra-villa` + hreflang | P1 | M |
| P8 | Villa group yoga rate (only if founder sets it) | P1 | S |
| P9 | Partner demo policy line + update free-intro guide | P1 | S |
| P10 | Tone rewrites (non-defensive copy) site-wide | P1 | M |
| P11 | SEO: titles >60 chars, metas, thin pages, area-page de-duplication | P1 | M–L |
| P12 | Apex → www 308, cache headers, JS code-splitting | P1 | S–M |
| P13 | LocalBusiness schema fields; unique OG images | P2 | S |
| P14 | Header nav link "For villa managers" + footer + sitemap/llms.txt updates | P0 | S |

---
## P1. Partner page rewrite — `/villa-hotel-partners` (keep URL)
Title (≤60): `Villa Wellness Partner Programme Bali | PersonalFitness.id` (57)
Meta (≤155): `Add yoga, personal training and Pilates to every villa you manage. We send the coach, guests book on WhatsApp, you earn [COMMISSION_PCT]% per session.`
H1: `Wellness for every villa you manage. You earn on every session.`

Sections and final copy (replace the current page body):
1. Hero
   - Sub: `Yoga, personal training, Pilates, stretching, boxing and meditation, delivered in your guests' villa by our coaches. Your team does nothing extra. You earn [COMMISSION_PCT]% of every paid session.`
   - Primary button: `WhatsApp us about your villas` → `https://wa.me/628113803488?text=` + encoded `Hi PersonalFitness.id, I manage villas and want the partner menu. Company: ___ · Villas: ___ · Areas: ___` (event `partner_whatsapp_click`, location `partner_hero`)
   - Secondary button: `Download the partner menu (PDF)` → `/partners/villa-wellness-menu.pdf` (event `partner_deck_download`)
2. How it works (4 steps)
   1. `We send you a menu card and QR code for each villa, with your name on it.`
   2. `Guests scan and book on WhatsApp. The booking carries your partner code.`
   3. `Our coach comes to the villa. The guest pays us.`
   4. `You get [COMMISSION_PCT]% of every paid session, every month, with a simple statement.`
3. What your guests can book (6 cards, keep existing prices and links): Private yoga from Rp 850.000 (up to 2) · Personal training from Rp 900.000 · Mat Pilates from Rp 950.000 · Mobility & stretching from Rp 850.000 · Boxing fitness from Rp 1.000.000 · Guided meditation from Rp 800.000. Note line: `Bali prices, 60 minutes. Canggu and Seminyak included. Ubud and Sanur +Rp 150.000, Uluwatu +Rp 200.000 travel per visit.`
4. Weekly yoga calendar (keep example, change copy): `Give guests something to look forward to. Example: sunrise private yoga Mon, Wed, Fri at 08:00 in each guest's villa. Guests reserve by 18:00 the day before.` If [GROUP_YOGA_RATE_BALI] is set, add: `Have a big terrace or studio? Run a shared villa class for up to [GROUP_YOGA_MAX_PEOPLE] guests from Rp [GROUP_YOGA_RATE_BALI].`
5. What you get (bullets): `Menu card + QR for every villa` · `Guest page for your welcome pack or app` · `Booking on WhatsApp with your partner code` · `A named coordinator` · `Monthly statement and payout` · `30-day pilot at 1–2 villas first`.
6. Earnings example (label clearly): `Example only: 8 villas, 70% occupancy, 5-night stays, 1 in 5 stays booking two Rp 900.000 sessions = about 13 sessions and Rp 12.096.000 a month in sessions. At [COMMISSION_PCT]% you would earn about Rp [computed] a month.` Compute in code from COMMISSION_PCT.
7. Have a space? `If a villa has a terrace, studio or big living room, we check it and plan a shared class or a regular slot.`
8. Join form (no backend needed; builds a WhatsApp message). Fields: Company name* · Your name* · Role · WhatsApp number* · Email · Number of villas* (1–5 / 6–24 / 25+) · Areas* (multi: Canggu, Seminyak, Ubud, Sanur, Uluwatu, Jakarta, Other) · Villas to start with · Space for 2 yoga mats? (yes/no/not sure) · Guest menu language (English/Bahasa). Consent checkbox*: `I agree that PersonalFitness.id may contact me on WhatsApp and email about the partner programme.` Button `Send on WhatsApp` → wa.me with all fields formatted; event `partner_form_submit`. Store nothing server-side unless a backend is added later.
9. FAQ (short answers): Who pays? `The guest pays us. We pay you your commission monthly.` · Do we need a contract? `Only our short partner terms.` (link /partner-terms) · What if a coach can't come? `We tell the guest straight away and offer a new time or a full refund.` · Privacy? `Your team gets the time and villa only. Guest health notes stay with the coach.` · Insurance and liability? `Ask us and we send it in writing.` · Which areas? `Canggu and Seminyak included; Ubud, Sanur, Uluwatu with a travel fee; others on request.`
10. Footer CTA: `Questions? WhatsApp +62 811-3803-488. A real person replies.`
Remove: "commission, net rates, markups... discussed in your own commercial agreement rather than assumed from the public website"; "No fee, supply allocation or commercial terms are accepted by preparing this draft."
Acceptance: page shows commission %, PDF link works, form opens WhatsApp with all fields, events fire in GA4 DebugView, URL/canonical unchanged, Lighthouse SEO ≥ 95.

## P2. `/partner-terms` (new, indexable, in sitemap)
Title: `Villa Partner Terms | PersonalFitness.id`. Plain-English terms (founder must confirm before publishing):
1. Commission: `[COMMISSION_PCT]% of the session price (excluding travel and extra-person fees? → founder decides [COMMISSION_BASE]) for every session paid by a guest who booked with your partner code.`
2. Payout: `Monthly, by [COMMISSION_PAYOUT_DAY] of the next month, to the account you give us in writing. Refunded sessions earn no commission.`
3. Prices: `Guests pay the published website price. Partners do not resell above it unless agreed in writing.`
4. Attribution: `A booking counts for you if the guest's first WhatsApp message carries your partner code, or your team sends the request.`
5. Materials: `We provide menu cards and QR codes. You place them. Either side can remove them at any time.`
6. Pilot and ending: `30-day pilot at 1–2 villas. Either side can stop with 14 days' notice by email or WhatsApp. Earned commission is still paid.`
7. Guests and privacy: `We share only time and villa with your team. Guest health information stays with the coach.`
8. Safety and liability: `[LIABILITY_TEXT — founder/legal to supply]`
9. Contact: hallo@personalfitness.id · WhatsApp +62 811-3803-488.
Acceptance: linked from partner page, footer and PDF; no placeholder text live.

## P3. Partner menu & deck
- Route `/partners/menu?partner=CODE&villa=NAME&lang=en|id` (noindex): print-ready A5 (148×210 mm) card. Content: `Wellness at [VILLA NAME]` · `Our coaches come to your villa` · 6 sessions with "from" prices · weekly yoga line · QR code (wa.me link with pre-fill `Hi, I'm staying at [VILLA NAME] ([PARTNER CODE]). I'd like to book: ___ · Day/time: ___ · People: ___`) · small print `60 minutes. Prices from. Travel added outside Canggu/Seminyak. Confirmed in writing before you pay.` Use a client-side QR library (e.g. `qrcode`), CSS `@media print`.
- Static `/partners/villa-wellness-menu.pdf` (generic sample card + 1-page "How the partner programme works" + terms summary). Generate from the same component at build time or export manually.
- Acceptance: printing the route gives one clean A5 page; QR opens WhatsApp with villa + code; PDF < 2 MB.

## P4. Attribution
- Support `?ref=CODE` on any page: save to `sessionStorage` and append `Ref: CODE` to every WhatsApp pre-fill on the site. Send `partner_code` as a GA4 event param.
- Acceptance: visiting `/?ref=TEST1` then clicking any WhatsApp button produces a message containing `Ref: TEST1`.

## P5. Analytics
- GA4 ([GA4_ID]) via gtag, loaded after first interaction or with `defer`; SPA page_view on route change. Optional: Vercel Web Analytics + Speed Insights.
- Events: `whatsapp_click` (params: location, service, city, partner_code) on every `wa.me` link · `partner_whatsapp_click` · `partner_form_submit` (portfolio_size, areas) · `partner_deck_download` · `estimator_used` · `email_click`.
- Mark `whatsapp_click` and `partner_form_submit` as key events.
- Acceptance: all events visible in GA4 DebugView; no console errors; consent line in /privacy updated to mention analytics cookies.

## P6. Trust
- `/team` (new): founder card ([FOUNDER_PHOTO], [FOUNDER_NAME], role, 80–120-word [FOUNDER_BIO], WhatsApp), coordinator card, coach cards (photo, first name, disciplines, real certifications e.g. "[CERT] — [ISSUER], [YEAR]", languages, areas). Render a card only if photo + certification exist.
- `/about`: rewrite to ≥400 words: why the founder started it, how coaches are chosen (link /professional-standards), where we work, partner programme link. Replace "What we do not sell" with "What we focus on".
- Images: replace AI illustrations with real photos as they arrive (start with home hero, partner hero, 6 service pages). Remove the caption "Illustrative session image. Your professional is confirmed with your booking." where a real photo is used; elsewhere change it to `Example session. Your coach is confirmed when you book.`
- Add Instagram link (when [INSTAGRAM_URL] exists) to footer and schema `sameAs`.
- Acceptance: /team live with at least founder card; no "generated illustration" disclaimer on the home and partner hero.

## P7. Bahasa Indonesia partner page `/id/mitra-villa` (new)
- Full translation of P1 (natural, polite Bapak/Ibu tone). Title: `Program Mitra Wellness Villa di Bali | PersonalFitness.id`. H1: `Wellness untuk setiap villa Anda. Anda dapat komisi dari setiap sesi.` Primary CTA: `WhatsApp kami tentang villa Anda`. Form labels in Bahasa. `<html lang="id">`.
- hreflang pair on both pages: `en-ID` ↔ `/villa-hotel-partners`, `id-ID` ↔ `/id/mitra-villa`, `x-default` → English. Language switch link on both.
- Acceptance: hreflang reciprocal, both in sitemap, no other /id/ pages created yet (unknown /id currently 404, keep the rest 404).

## P8. Villa group yoga rate (only if founder sets [GROUP_YOGA_RATE_BALI])
- Pricing page new row: `Villa group yoga · 60 minutes · up to [GROUP_YOGA_MAX_PEOPLE] people in one space · Bali from Rp [GROUP_YOGA_RATE_BALI]`. Add to estimator, llms.txt, partner page, private-yoga pages, LocalBusiness OfferCatalog.
- Update the extra-people guide sentence "We will not hide a group class inside a private rate" to `Groups of 3 or more book villa group yoga at its own rate.`
- Acceptance: one price, same everywhere (grep the repo for the number).

## P9. Partner demo policy (only if [DEMO_POLICY]=on)
- Partner page FAQ: `Can our team try it first? Yes. Once you accept the partner terms, we run one free 60-minute session for your team at a pilot villa.`
- Guide `/resources/free-introduction-vs-paid-first-session-...`: add `Villa partners: a one-off team demo is part of the partner pilot. Guest first sessions are still paid.`

## P10. Tone rewrites (examples — apply the pattern site-wide)
| Where | Now | New |
|---|---|---|
| /how-it-works H1 | A click is not a booking. | From your first message to a coach at your door. |
| Home hero microcopy | A click is not a booking. Confirmation follows a written quote. | You get a clear written quote before you pay. |
| /pricing banner | A number on this page is not a booking. | These are starting prices for 60 minutes. Your written quote shows the final total. |
| Home/areas | We do not claim island-wide or city-wide coverage. | We work in these areas so your coach arrives on time. |
| /about | What we do not sell | What we focus on |
| Meditation | Not therapy / not counselling | A calm, guided hour. For clinical support, please see a licensed professional. |
| Boxing | No sparring, no ring, no kickboxing. | Pad work and conditioning, one-to-one. No sparring. |
| WhatsApp pre-fill (all) | …Please confirm the actual professional, access, full payable total, inclusions and cancellation terms. This request is not a booking. | Hi PersonalFitness.id, I'd like [service] in [area] on [day/time] for [people]. |
| /how-it-works meta | …A click is not a booking. | …Clear written quote before you pay. |
Acceptance: `grep -ri "a click is not a booking"` returns 0 in rendered copy (OK inside legal terms).

## P11. SEO
Titles (≤60 chars). Rule for guides: drop "| PersonalFitness.id" when over 60.
| URL | New title |
|---|---|
| / | Personal Trainer at Home in Bali & Jakarta |
| /bali | Personal Trainer Bali: Villa & Home Sessions |
| /jakarta | Home Personal Trainer Jakarta \| PersonalFitness.id |
| /personal-training | Personal Trainer at Home \| PersonalFitness.id |
| /jakarta/central-jakarta | Personal Trainer Central Jakarta \| PersonalFitness.id |
| /pricing | Personal Trainer Prices Bali & Jakarta |
| /resources | Bali & Jakarta Fitness Guides \| PersonalFitness.id |
| /contact | Contact & Book on WhatsApp \| PersonalFitness.id |
| /resources/personal-trainer-jakarta-prices-studio-home-and-managed-service-costs | Personal Trainer Jakarta Prices: Studio vs Home |
| /resources/free-introduction-vs-paid-first-session-what-personalfitness-id-offers | Free Intro vs Paid First Session |
| /resources/mat-pilates-prices-why-mat-reformer-studio-and-home-sessions-differ | Mat Pilates Prices: Mat, Reformer, Home |
| /resources/private-yoga-in-bali-one-to-one-couples-and-villa-groups-explained | Private Yoga in Bali: Solo, Couples, Groups |
| /resources/two-three-or-four-weeks-choosing-a-fitness-programme-for-your-stay | 2, 3 or 4 Week Fitness Programme for Your Stay |
| /resources/home-personal-training-in-jakarta-how-to-set-up-your-first-session | Home Personal Training Jakarta: First Session |
| /resources/private-yoga-in-a-jakarta-apartment-space-access-and-pair-pricing | Private Yoga in a Jakarta Apartment |
| /resources/personal-trainer-in-bali-what-a-managed-in-villa-session-includes | Personal Trainer in Bali: In-Villa Sessions |
| /resources/personal-trainer-bali-prices-how-to-compare-quotes-like-for-like | Personal Trainer Bali Prices Compared |
| /resources/personal-trainer-in-seminyak-petitenget-villas-and-in-zone-rates | Personal Trainer Seminyak & Petitenget Villas |
| /resources/personal-trainer-in-ubud-travel-access-and-outer-zone-rates | Personal Trainer in Ubud: Travel & Rates |
| /resources/private-yoga-prices-in-bali-duration-travel-and-group-size | Private Yoga Prices in Bali |
| /resources/personal-trainer-in-canggu-villa-access-and-in-zone-rates | Personal Trainer in Canggu: Villa Sessions |
| /resources/extra-people-and-pair-pricing-yoga-training-and-boxing | Pair & Group Pricing: Yoga, Training, Boxing |
| /resources/mat-pilates-at-home-what-you-need-and-what-you-do-not | Mat Pilates at Home: What You Need |
| /resources/guided-meditation-at-home-what-the-hour-is-and-is-not | Guided Meditation at Home: What to Expect |
| /resources/private-yoga-or-mat-pilates-choosing-a-home-session | Private Yoga or Mat Pilates at Home? |
| /resources/sixty-or-ninety-minutes-how-home-session-duration-is-quoted | 60 or 90 Minute Home Sessions: Pricing |
| /resources/what-to-put-in-a-whatsapp-enquiry-for-a-home-trainer | How to Book a Home Trainer on WhatsApp |
| /resources/private-boxing-fitness-at-home-what-pad-only-means | Private Boxing Fitness at Home |
| /resources/mobility-coaching-at-home-what-it-is-and-is-not | Mobility Coaching at Home: What to Expect |
| /resources/what-your-quote-contains | What Your Quote Contains \| PersonalFitness.id |
| /resources/train-in-a-bali-villa | How to Set Up a Villa for a Session |
| /resources/programmes-versus-drop-in | 4-Week Block vs Drop-in Sessions |
(`\|` = a literal `|` in the title. Keep H1s as they are.)

Meta descriptions: rewrite to 120–155 chars for /, /bali, /jakarta, /service-areas, /pricing, /how-it-works, /contact, /faq (currently 162–208) and expand /editorial-policy, /resources/jakarta-apartment-session, /resources/beginners-private-training, /resources/couples-private-yoga, /resources/programmes-versus-drop-in (currently 48–67).

Thin pages (<300 words): /about (→ P6), /services (add 300+ words: who each session suits, how booking works, links to city pages), /contact (add short FAQ + partner link), short guides `couples-private-yoga`, `programmes-versus-drop-in`, `jakarta-apartment-session`, `beginners-private-training`, `what-your-quote-contains`, `train-in-a-bali-villa` → expand each to ≥700 words with BlogPosting + FAQPage schema, OR merge into the matching long guide and 301 (update sitemap + internal links). Policy pages may stay short.

Area pages (28; avg 43% shared text, up to 55%): give each ≥250 words of unique content: villa/apartment types, typical access notes (gates, lobbies, parking), best session windows/traffic, nearby landmarks, which sessions suit the area; cut shared boilerplate blocks to one short shared section. Target: pairwise 5-word shingle overlap < 30%. City×service pages (10, avg 51%): same rule.
Contact variants `/contact?city=…`: keep canonical to /contact; add `<meta name="robots" content="noindex,follow">` when a query string is present.

## P12. Infrastructure
- Apex redirect: in Vercel → Project → Domains, set `personalfitness.id` to redirect to `www.personalfitness.id` with **308 Permanent** (currently 307). Acceptance: `curl -sI https://personalfitness.id` → `308` + `location: https://www.personalfitness.id/`. Also verify `http://` → https in one hop from a normal network.
- Caching: `vercel.json` headers: `/assets/(.*)` → `Cache-Control: public, max-age=31536000, immutable`; images `/images/(.*)` → `public, max-age=2592000`. HTML stays revalidated.
- Code-splitting: `React.lazy` + `Suspense` per route (guides, area pages, estimator, partner pages); Vite `build.rollupOptions.output.manualChunks` for vendor. Keep pre-rendered HTML. Target: initial JS on `/` ≤ 120 KB brotli (now 232 KB). Acceptance: Lighthouse mobile Performance ≥ 85 on /, /bali, /villa-hotel-partners.
- Images: add `srcset` sizes (480/800/1200) and AVIF/WebP; current images 100–237 KB each.

## P13. Schema & OG
- LocalBusiness (`#business`): add `geo` ([OFFICE_LAT,LNG]), `openingHoursSpecification` ([COORDINATION_HOURS]), `sameAs` ([INSTAGRAM_URL], Google Business Profile URL when it exists), `founder` (Person: [FOUNDER_NAME]), `areaServed` unchanged. No `aggregateRating` until real reviews.
- Partner page: add `Service` with `serviceType: "Villa wellness partner programme"`, `provider` → #business, `areaServed` Bali.
- OG images: give unique `og:image` to /services, /resources, /contact, /faq, /privacy, /terms, /refunds-rescheduling, /safety, /editorial-policy (all currently `villa-yoga-partners.webp`), and a dedicated one for the partner page. 1200×630.

## P14. Navigation, sitemap, llms.txt
- Header nav: add `For villa managers` → /villa-hotel-partners (and `Untuk villa` on /id/ page). Footer: Partner programme, Partner terms, Team.
- sitemap-pages.xml: add /partner-terms, /team, /id/mitra-villa (not /partners/menu). Update lastmod.
- llms.txt: add a "Villa partners" section: commission %, link to partner page/terms/PDF, WhatsApp.
- Acceptance: `curl` every one of the 90 original URLs → 200 (script in repo or CI).

## Final QA checklist
- [ ] All 90 original URLs 200, canonicals unchanged; new URLs in sitemap.
- [ ] No [PLACEHOLDER] text rendered anywhere (`grep -r "\[" dist/**/*.html` review).
- [ ] Prices identical across pricing, service pages, partner page, PDF, llms.txt.
- [ ] GA4 events firing; WhatsApp links carry `Ref:` when `?ref=` set.
- [ ] Titles ≤ 60 chars, metas 120–155 chars, one H1 per page.
- [ ] Lighthouse mobile: Performance ≥ 85, SEO ≥ 95, Accessibility ≥ 90 on key pages.

## When you finish
Reply with: (1) a table of item ID → files changed → how to verify, (2) the list of config values still null (founder to fill), (3) output of `scripts/check-urls.mjs` against the preview deployment, (4) Lighthouse mobile scores for /, /bali, /villa-hotel-partners before and after, (5) anything you could not do and why (e.g. the Vercel domain 308 setting is a dashboard change — give the exact click path).
