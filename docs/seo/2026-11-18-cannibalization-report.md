# Cannibalisation report — personalfitness.id

Built 18 Nov 2026 (Asia/Makassar) from a fresh crawl of all 98 URLs in sitemap-pages.xml + sitemap-posts.xml, plus the 135 blog topics in keyword_bank.csv and the 1 blog draft.

**No Search Console data exists yet**, so conflicts are detected from what each page *targets* (title, H1, H2s, intro), not from what it ranks for. Re-run with GSC query→page data after 28 days (see measurement_plan.md).

## Summary

- **26 conflict groups**: 10 HIGH (same keyword in title/H1 of 2+ live URLs), 10 MEDIUM (overlapping intent or template duplication), 6 LOW (blog topics or watch items).
- Live site pages involved: 76 of 98.
- Blog topics touched: 84; 58 are now marked `blocked_cannibal` in keyword_bank.csv (see blog_lock.csv).
- Pattern: almost every guide in /resources/ was titled with the same head term as its money page ("Personal trainer in Canggu…", "Private yoga in Bali…"). The fix is to rename the guides' titles and H1s to their informational angle and point them at the money page, not to delete or redirect anything.

## Rule used to pick the winner

1. The commercial page whose URL and offer match the query wins (service × city page > city hub > guide).
2. A guide never owns a commercial head term; it owns the question or how-to angle and links up to the winner with the locked anchor.
3. Hubs (/bali, /jakarta, /services) own the broad multi-service term, not the single-service term.
4. Bahasa pages own Bahasa queries (/id, /id/mitra-villa); English pages never target Bahasa head terms in the title.
5. No URL is changed, merged, redirected or noindexed. Losers are de-optimised only by title, meta, H1, intro and anchors.

## Top 5 to fix first

- **C01 `personal trainer bali`** → winner `/bali/personal-training`. Three live titles lead with 'Personal Trainer Bali/in Bali' (/bali 'Personal Trainer Bali: Villa & Home Sessions', /bali/personal-training 'Private Personal Trainer in Bali', guide 'Personal Trainer in Bali: In-Villa Sessions'); H1s on /bali and the guide also say 'Personal trainer in Bali'.
- **C06 `personal trainer seminyak`** → winner `/bali/seminyak`. The GUIDE ('Personal Trainer Seminyak & Petitenget Villas') targets the term better than the money page ('Private Yoga and Training in Seminyak'). Today Google would likely pick the guide.
- **C07 `personal trainer ubud`** → winner `/bali/ubud`. Guide 'Personal Trainer in Ubud: Travel & Rates' out-targets money page 'Private Yoga and Training in Ubud'. Guide title/H1 also say 'outer-zone rates' though travel is now included (stale).
- **C02 `personal trainer jakarta / home personal trainer jakarta`** → winner `/jakarta/personal-training`. /jakarta title 'Home Personal Trainer Jakarta' and /jakarta/personal-training title 'Home Personal Trainer in Jakarta' are effectively identical; H1s also identical ('Home personal trainer in Jakarta').
- **C09 `2/3/4 week fitness programme / personal training packages`** → winner `/programmes`. /programmes title '2, 3 and 4 Week Fitness Programmes' vs guide '2, 3 or 4 Week Fitness Programme for Your Stay' – near-identical. /programmes H1 and body sell 3/5/10 packs, so the title is also wrong.

## HIGH conflicts

### C01 — `personal trainer bali`

- **Winner:** `/bali/personal-training`
- **Pages in the group (current title → H1):**
  - `/bali/personal-training` — "Private Personal Trainer in Bali | PersonalFitness.id" → H1 "Private Personal Trainer in Bali"
  - `/bali` — "Personal Trainer Bali: Villa & Home Sessions" → H1 "Personal trainer in Bali, at your villa or home."
  - `/resources/personal-trainer-in-bali-what-a-managed-in-villa-session-includes` — "Personal Trainer in Bali: In-Villa Sessions" → H1 "Personal trainer in Bali: what a managed in-villa session includes"
  - `/` — "Personal Trainer at Home in Bali & Jakarta" → H1 "Personal trainer at your villa or home in Bali and Jakarta"
- **Blog topics involved:** KW039, KW061, KW028
- **Why it is a conflict:** Three live titles lead with 'Personal Trainer Bali/in Bali' (/bali 'Personal Trainer Bali: Villa & Home Sessions', /bali/personal-training 'Private Personal Trainer in Bali', guide 'Personal Trainer in Bali: In-Villa Sessions'); H1s on /bali and the guide also say 'Personal trainer in Bali'.
- **Exactly what to change on the loser(s):**
  - `/bali`: Retitle to 'Fitness Trainer Bali: Training, Yoga & Pilates at Your Villa'; H1 'Your fitness trainer in Bali…'. Remove 'Personal trainer in Bali' from H1. Link to /bali/personal-training with anchor 'personal trainer in Bali'. New title: "Fitness Trainer Bali: Training, Yoga & Pilates at Your Villa"; new H1: "Your fitness trainer in Bali: training, yoga and Pilates at your villa".
  - `/resources/personal-trainer-in-bali-what-a-managed-in-villa-session-includes`: Retitle 'What an In-Villa Training Session Includes in Bali'; H1 'What an in-villa training session in Bali includes'. First paragraph links to /bali/personal-training. New title: "What an In-Villa Training Session Includes in Bali"; new H1: "What an in-villa training session in Bali includes".
  - `/`: Keep both cities in title ('…| Bali & Jakarta'); never 'Personal Trainer Bali' alone. New title: "Personal Trainer at Your Villa or Home | Bali & Jakarta"; new H1: "Personal trainer at your villa or home in Bali and Jakarta".

### C02 — `personal trainer jakarta / home personal trainer jakarta`

- **Winner:** `/jakarta/personal-training`
- **Pages in the group (current title → H1):**
  - `/jakarta/personal-training` — "Home Personal Trainer in Jakarta | PersonalFitness.id" → H1 "Home Personal Trainer in Jakarta"
  - `/jakarta` — "Home Personal Trainer Jakarta | PersonalFitness.id" → H1 "Home personal trainer in Jakarta."
  - `/resources/home-personal-training-in-jakarta-how-to-set-up-your-first-session` — "Home Private Strength Training Jakarta: First Session" → H1 "Home private strength training in Jakarta: how to set up your first session"
- **Blog topics involved:** KW014, KW046, KW016
- **Why it is a conflict:** /jakarta title 'Home Personal Trainer Jakarta' and /jakarta/personal-training title 'Home Personal Trainer in Jakarta' are effectively identical; H1s also identical ('Home personal trainer in Jakarta').
- **Exactly what to change on the loser(s):**
  - `/jakarta`: Retitle 'Home Fitness Trainer Jakarta: Training, Yoga & Pilates'; H1 'Home fitness trainer in Jakarta…'. Link to /jakarta/personal-training with anchor 'personal trainer in Jakarta'. New title: "Home Fitness Trainer Jakarta: Training, Yoga & Pilates"; new H1: "Home fitness trainer in Jakarta: training, yoga and Pilates at home".
  - `/resources/home-personal-training-in-jakarta-how-to-set-up-your-first-session`: Retitle 'First Home Training Session in Jakarta: What to Expect'. New title: "First Home Training Session in Jakarta: What to Expect"; new H1: "Your first home training session in Jakarta: what to expect".

### C03 — `personal trainer bali price / jakarta price / harga personal trainer`

- **Winner:** `/pricing`
- **Pages in the group (current title → H1):**
  - `/pricing` — "Personal Trainer Prices Bali & Jakarta | PersonalFitness.id" → H1 "Personal trainer Bali and Jakarta prices"
  - `/resources/personal-trainer-bali-prices-how-to-compare-quotes-like-for-like` — "Personal Trainer Bali Prices Compared | PersonalFitness.id" → H1 "Personal trainer Bali prices: how to compare quotes like for like"
  - `/resources/personal-trainer-jakarta-prices-studio-home-and-managed-service-costs` — "Personal Trainer Jakarta Prices: Studio vs Home" → H1 "Personal trainer Jakarta prices: studio, home and managed service costs"
- **Blog topics involved:** KW007, KW017
- **Why it is a conflict:** Two guides have titles 'Personal Trainer Bali Prices Compared' and 'Personal Trainer Jakarta Prices: Studio vs Home', the same head term as /pricing 'Personal Trainer Prices Bali & Jakarta'.
- **Exactly what to change on the loser(s):**
  - `/resources/personal-trainer-bali-prices-how-to-compare-quotes-like-for-like`: Retitle 'How to Compare Personal Trainer Quotes in Bali'; H1 likewise; link to /pricing with anchor 'personal trainer prices in Bali'. New title: "How to Compare Personal Trainer Quotes in Bali"; new H1: "How to compare personal trainer quotes in Bali, like for like".
  - `/resources/personal-trainer-jakarta-prices-studio-home-and-managed-service-costs`: Retitle 'Gym vs Home Personal Trainer Cost in Jakarta'; link to /pricing. New title: "Gym vs Home Personal Trainer Cost in Jakarta"; new H1: "Gym, studio or home: what a personal trainer costs in Jakarta".

### C04 — `private yoga bali`

- **Winner:** `/bali/private-yoga`
- **Pages in the group (current title → H1):**
  - `/bali/private-yoga` — "Private Yoga at Your Villa in Bali | PersonalFitness.id" → H1 "Private Yoga at Your Villa in Bali"
  - `/resources/private-yoga-in-bali-one-to-one-couples-and-villa-groups-explained` — "Private Yoga in Bali: Solo, Couples, Groups" → H1 "Private yoga in Bali: one-to-one, couples and villa groups explained"
  - `/resources/private-yoga-prices-in-bali-duration-travel-and-group-size` — "Private Yoga Prices in Bali | PersonalFitness.id" → H1 "Private yoga prices in Bali: duration, travel and group size"
  - `/private-yoga` — "Private Yoga at Your Villa or Home | PersonalFitness.id" → H1 "Private Yoga at Your Villa or Home"
- **Blog topics involved:** KW010, KW062, KW011, KW025
- **Why it is a conflict:** Guide titles 'Private Yoga in Bali: Solo, Couples, Groups' and 'Private Yoga Prices in Bali' start with the money page's exact term; /private-yoga title 'Private Yoga at Your Villa or Home' overlaps 'villa'.
- **Exactly what to change on the loser(s):**
  - `/resources/private-yoga-in-bali-one-to-one-couples-and-villa-groups-explained`: Retitle 'Solo, Couple or Group: Choosing Villa Yoga in Bali'. New title: "Solo, Couple or Group: Choosing Villa Yoga in Bali"; new H1: "Solo, couple or group: choosing yoga at your Bali villa".
  - `/resources/private-yoga-prices-in-bali-duration-travel-and-group-size`: Retitle 'What Changes a Private Yoga Price: Time, Travel, Group'. New title: "What Changes a Private Yoga Price: Time, Travel, Group"; new H1: "What changes a private yoga price: duration, travel and group size".
  - `/private-yoga`: Retitle 'Private Yoga at Home or Villa' and target 'private yoga at home' (no city). New title: "Private Yoga at Home or Villa | PersonalFitness.id"; new H1: "Private yoga at home: a teacher at your villa or apartment".

### C05 — `personal trainer canggu`

- **Winner:** `/bali/canggu`
- **Pages in the group (current title → H1):**
  - `/bali/canggu` — "Personal Trainer in Canggu | PersonalFitness.id" → H1 "Personal Trainer in Canggu"
  - `/resources/personal-trainer-in-canggu-villa-access-and-in-zone-rates` — "Personal Trainer in Canggu: Villa Sessions" → H1 "Personal trainer in Canggu: villa access and in-zone rates"
- **Blog topics involved:** KW002, KW008, KW030, KW063, KW065, KW086, KW087
- **Why it is a conflict:** Guide title 'Personal Trainer in Canggu: Villa Sessions' vs money page 'Personal Trainer in Canggu' – identical primary.
- **Exactly what to change on the loser(s):**
  - `/resources/personal-trainer-in-canggu-villa-access-and-in-zone-rates`: Retitle 'Training at a Canggu Villa: Access, Floors and Timing'; H1 likewise; link to /bali/canggu with anchor 'personal trainer in Canggu'. New title: "Training at a Canggu Villa: Access, Floors and Timing"; new H1: "Training at a Canggu villa: access, floors and timing".

### C06 — `personal trainer seminyak`

- **Winner:** `/bali/seminyak`
- **Pages in the group (current title → H1):**
  - `/bali/seminyak` — "Private Yoga and Training in Seminyak | PersonalFitness.id" → H1 "Private Yoga and Training in Seminyak"
  - `/resources/personal-trainer-in-seminyak-petitenget-villas-and-in-zone-rates` — "Personal Trainer Seminyak & Petitenget Villas" → H1 "Personal trainer in Seminyak: Petitenget villas and in-zone rates"
- **Blog topics involved:** KW003, KW009, KW064
- **Why it is a conflict:** The GUIDE ('Personal Trainer Seminyak & Petitenget Villas') targets the term better than the money page ('Private Yoga and Training in Seminyak'). Today Google would likely pick the guide.
- **Exactly what to change on the loser(s):**
  - `/bali/seminyak`: Retitle 'Personal Trainer Seminyak & Private Yoga at Your Villa'; H1 'Personal trainer and private yoga in Seminyak…'. New title: "Personal Trainer Seminyak & Private Yoga at Your Villa"; new H1: "Personal trainer and private yoga in Seminyak, at your villa".
  - `/resources/personal-trainer-in-seminyak-petitenget-villas-and-in-zone-rates`: Retitle 'Petitenget & Seminyak Villa Sessions: Access Guide'. New title: "Petitenget & Seminyak Villa Sessions: Access Guide"; new H1: "Petitenget and Seminyak villa sessions: access and timing".

### C07 — `personal trainer ubud`

- **Winner:** `/bali/ubud`
- **Pages in the group (current title → H1):**
  - `/bali/ubud` — "Private Yoga and Training in Ubud | PersonalFitness.id" → H1 "Private Yoga and Training in Ubud"
  - `/resources/personal-trainer-in-ubud-travel-access-and-outer-zone-rates` — "Personal Trainer in Ubud: Travel & Rates" → H1 "Personal trainer in Ubud: travel, access and outer-zone rates"
- **Blog topics involved:** KW005, KW069
- **Why it is a conflict:** Guide 'Personal Trainer in Ubud: Travel & Rates' out-targets money page 'Private Yoga and Training in Ubud'. Guide title/H1 also say 'outer-zone rates' though travel is now included (stale).
- **Exactly what to change on the loser(s):**
  - `/bali/ubud`: Retitle 'Personal Trainer Ubud & Private Yoga at Your Villa'. New title: "Personal Trainer Ubud & Private Yoga at Your Villa"; new H1: "Personal trainer and private yoga in Ubud, at your villa".
  - `/resources/personal-trainer-in-ubud-travel-access-and-outer-zone-rates`: Retitle 'Ubud Villa Sessions: Travel, Roads and Access'; remove 'outer-zone rates' wording from title/H1 (keep URL). New title: "Ubud Villa Sessions: Travel, Roads and Access"; new H1: "Ubud villa sessions: travel, roads and access".

### C08 — `personal trainer south jakarta / jakarta selatan`

- **Winner:** `/jakarta/south-jakarta`
- **Pages in the group (current title → H1):**
  - `/jakarta/south-jakarta` — "Personal Trainer in South Jakarta | PersonalFitness.id" → H1 "Personal Trainer in South Jakarta"
  - `/resources/personal-trainer-in-south-jakarta-kemang-senopati-and-lobby-access` — "Personal trainer in South Jakarta: Kemang, Senopati and lobby access" → H1 "Personal trainer in South Jakarta: Kemang, Senopati and lobby access"
  - `/jakarta/kemang` — "Personal Trainer in Kemang | PersonalFitness.id" → H1 "Personal Trainer in Kemang"
  - `/jakarta/senopati` — "Personal Trainer in Senopati | PersonalFitness.id" → H1 "Personal Trainer in Senopati"
- **Blog topics involved:** KW020, KW057
- **Why it is a conflict:** Guide title 'Personal trainer in South Jakarta: Kemang, Senopati and lobby access' targets the municipality page's term AND two neighbourhood pages' terms at once.
- **Exactly what to change on the loser(s):**
  - `/resources/personal-trainer-in-south-jakarta-kemang-senopati-and-lobby-access`: Retitle 'South Jakarta Lobby Access for a Home Trainer'; link to /jakarta/south-jakarta, /jakarta/kemang, /jakarta/senopati with their locked anchors. New title: "South Jakarta Lobby Access for a Home Trainer"; new H1: "South Jakarta lobby access for a home trainer: Kemang, Senopati, SCBD".
  - `/jakarta/south-jakarta`: Lead with Bahasa head term: 'Personal Trainer Jakarta Selatan (South Jakarta)'. New title: "Personal Trainer Jakarta Selatan: South Jakarta"; new H1: "Personal trainer in South Jakarta (Jakarta Selatan), at your home".

### C09 — `2/3/4 week fitness programme / personal training packages`

- **Winner:** `/programmes`
- **Pages in the group (current title → H1):**
  - `/programmes` — "2, 3 and 4 Week Fitness Programmes | PersonalFitness.id" → H1 "Session packs for a villa stay."
  - `/resources/two-three-or-four-weeks-choosing-a-fitness-programme-for-your-stay` — "2, 3 or 4 Week Fitness Programme for Your Stay" → H1 "Two, three or four weeks: choosing a fitness programme for your stay"
  - `/resources/programmes-versus-drop-in` — "4-Week Block vs Drop-in Sessions | PersonalFitness.id" → H1 "When a four-week block is the better buy"
- **Blog topics involved:** KW044, KW082, KW045, KW024
- **Why it is a conflict:** /programmes title '2, 3 and 4 Week Fitness Programmes' vs guide '2, 3 or 4 Week Fitness Programme for Your Stay' – near-identical. /programmes H1 and body sell 3/5/10 packs, so the title is also wrong.
- **Exactly what to change on the loser(s):**
  - `/programmes`: Retitle 'Personal Training Packages Bali & Jakarta: 3, 5, 10'. New title: "Personal Training Packages Bali & Jakarta: 3, 5, 10"; new H1: "Personal training packages in Bali and Jakarta: 3, 5 or 10 sessions".
  - `/resources/two-three-or-four-weeks-choosing-a-fitness-programme-for-your-stay`: Retitle 'How Many Sessions for a 2, 3 or 4 Week Stay?'. New title: "How Many Sessions for a 2, 3 or 4 Week Stay?"; new H1: "How many sessions for a 2, 3 or 4 week stay?".
  - `/resources/programmes-versus-drop-in`: Fix H1 ('four-week block' → 'When a session pack beats a single session'). New title: "Session Pack or Single Session: Which Is Better Value?"; new H1: "When a session pack beats a single session".

### C10 — `private boxing fitness at home`

- **Winner:** `/boxing-fitness`
- **Pages in the group (current title → H1):**
  - `/boxing-fitness` — "Pad-Only Boxing Fitness at Home | PersonalFitness.id" → H1 "Pad-Only Boxing Fitness at Home"
  - `/resources/private-boxing-fitness-at-home-what-pad-only-means` — "Private Boxing Fitness at Home | PersonalFitness.id" → H1 "Private boxing fitness at home: what pad-only means"
- **Blog topics involved:** KW112
- **Why it is a conflict:** Guide title 'Private Boxing Fitness at Home' is the national money page's exact topic ('Pad-Only Boxing Fitness at Home').
- **Exactly what to change on the loser(s):**
  - `/resources/private-boxing-fitness-at-home-what-pad-only-means`: Retitle 'What Pad-Only Boxing Means: Boxing Without Sparring'. New title: "What Pad-Only Boxing Means: Boxing Without Sparring"; new H1: "What pad-only boxing means: boxing fitness without sparring".
  - `/boxing-fitness`: Target 'private boxing lessons at home'. New title: "Private Boxing Lessons at Home: Pads Only"; new H1: "Private boxing lessons at home: pad work, no sparring".

## MEDIUM conflicts

### C11 — `mat pilates at home`

- **Winner:** `/mat-pilates`
- **Pages in the group (current title → H1):**
  - `/mat-pilates` — "Private Mat Pilates at Home | PersonalFitness.id" → H1 "Private Mat Pilates at Home"
  - `/resources/mat-pilates-at-home-what-you-need-and-what-you-do-not` — "Mat Pilates at Home: What You Need | PersonalFitness.id" → H1 "Mat Pilates at home: what you need, and what you do not"
- **Blog topics involved:** KW108, KW107
- **Why it is a conflict:** Guide 'Mat Pilates at Home: What You Need' vs money 'Private Mat Pilates at Home'.
- **Exactly what to change on the loser(s):**
  - `/resources/mat-pilates-at-home-what-you-need-and-what-you-do-not`: Retitle 'Mat Pilates at Home: Equipment You Need (and Don't)' – equipment angle. New title: "Mat Pilates at Home: Equipment You Need (and Don't)"; new H1: "Mat Pilates at home: the equipment you need, and what you do not".

### C12 — `mobility coaching / assisted stretching at home`

- **Winner:** `/mobility-coaching`
- **Pages in the group (current title → H1):**
  - `/mobility-coaching` — "Private Mobility Coaching at Home | PersonalFitness.id" → H1 "Private Mobility Coaching at Home"
  - `/resources/mobility-coaching-at-home-what-it-is-and-is-not` — "Mobility Coaching at Home: What to Expect" → H1 "Mobility coaching at home: what it is, and is not"
  - `/bodywork-recovery` — "Bodywork and Recovery at Your Villa | PersonalFitness.id" → H1 "Bodywork and Recovery at Your Villa"
- **Blog topics involved:** KW036, KW077, KW126
- **Why it is a conflict:** Guide 'Mobility Coaching at Home: What to Expect' vs money 'Private Mobility Coaching at Home'; /bodywork-recovery also sells 'assisted stretching'.
- **Exactly what to change on the loser(s):**
  - `/resources/mobility-coaching-at-home-what-it-is-and-is-not`: Retitle 'What Is Assisted Stretching? Mobility Coaching Explained'. New title: "What Is Assisted Stretching? Mobility Coaching Explained"; new H1: "What is assisted stretching, and what mobility coaching is not".
  - `/bodywork-recovery`: Lock to 'recovery session at your villa'; mention assisted stretching once, link to /mobility-coaching. New title: "Recovery Session at Your Villa: Bodywork & Stretching"; new H1: "Recovery session at your villa: bodywork and assisted stretching".

### C13 — `guided meditation at home`

- **Winner:** `/guided-meditation`
- **Pages in the group (current title → H1):**
  - `/guided-meditation` — "Private Guided Meditation at Home | PersonalFitness.id" → H1 "Private Guided Meditation at Home"
  - `/resources/guided-meditation-at-home-what-the-hour-is-and-is-not` — "Guided Meditation at Home: What to Expect" → H1 "Guided meditation at home: what the hour is, and is not"
- **Blog topics involved:** KW037, KW038
- **Why it is a conflict:** Guide 'Guided Meditation at Home: What to Expect' vs money 'Private Guided Meditation at Home'.
- **Exactly what to change on the loser(s):**
  - `/resources/guided-meditation-at-home-what-the-hour-is-and-is-not`: Retitle 'What to Expect in a Guided Meditation Session at Home'. New title: "What to Expect in a Guided Meditation Session at Home"; new H1: "What to expect in a guided meditation session at home".
  - `/guided-meditation`: Target 'private meditation sessions at home'. New title: "Private Meditation Sessions at Home | PersonalFitness.id"; new H1: "Private meditation sessions at home: a guided hour".

### C14 — `how to book a personal trainer (WhatsApp)`

- **Winner:** `/how-it-works`
- **Pages in the group (current title → H1):**
  - `/how-it-works` — "How to Book a Personal Trainer at Home | PersonalFitness.id" → H1 "From your first message to a coach at your door."
  - `/resources/what-to-put-in-a-whatsapp-enquiry-for-a-home-trainer` — "How to Book a Home Trainer on WhatsApp | PersonalFitness.id" → H1 "What to put in a WhatsApp enquiry for a home trainer"
  - `/contact` — "Contact & Book on WhatsApp | PersonalFitness.id" → H1 "Check availability for your session."
- **Blog topics involved:** KW083
- **Why it is a conflict:** Guide title 'How to Book a Home Trainer on WhatsApp' vs /how-it-works 'How to Book a Personal Trainer at Home'; /contact 'Contact & Book on WhatsApp'.
- **Exactly what to change on the loser(s):**
  - `/resources/what-to-put-in-a-whatsapp-enquiry-for-a-home-trainer`: Retitle 'WhatsApp Template to Book a Home Trainer' (template angle). New title: "WhatsApp Template to Book a Home Trainer"; new H1: "WhatsApp template to book a home trainer: what to put in the message".
  - `/contact`: Brand/navigational only: 'Contact & Book on WhatsApp | PersonalFitness.id'. New title: "Contact & Book on WhatsApp | PersonalFitness.id"; new H1: "Contact PersonalFitness.id on WhatsApp and check availability".

### C15 — `couples yoga / yoga for two / pair pricing`

- **Winner:** `/resources/couples-private-yoga`
- **Pages in the group (current title → H1):**
  - `/resources/couples-private-yoga` — "Booking yoga for two | PersonalFitness.id" → H1 "Booking yoga for two"
  - `/resources/extra-people-and-pair-pricing-yoga-training-and-boxing` — "Pair & Group Pricing: Yoga, Training, Boxing" → H1 "Extra people and pair pricing: yoga, training and boxing"
  - `/resources/private-yoga-in-bali-one-to-one-couples-and-villa-groups-explained` — "Private Yoga in Bali: Solo, Couples, Groups" → H1 "Private yoga in Bali: one-to-one, couples and villa groups explained"
- **Blog topics involved:** KW022, KW023, KW113, KW132
- **Why it is a conflict:** Three guides each answer 'yoga for two / couples' pricing.
- **Exactly what to change on the loser(s):**
  - `/resources/extra-people-and-pair-pricing-yoga-training-and-boxing`: Lock to 'extra-person fee' (training/boxing); mention yoga pairs in one line and link to couples guide. New title: "Training for Two: Extra-Person and Pair Pricing"; new H1: "Training for two: extra-person and pair pricing explained".
  - `/resources/private-yoga-in-bali-one-to-one-couples-and-villa-groups-explained`: Lock to 'solo vs couple vs group' choice; link couples guide. New title: "Solo, Couple or Group: Choosing Villa Yoga in Bali"; new H1: "Solo, couple or group: choosing yoga at your Bali villa".

### C16 — `villa wellness partner / villa managers`

- **Winner:** `/villa-hotel-partners`
- **Pages in the group (current title → H1):**
  - `/villa-hotel-partners` — "Villa Wellness Partner Programme Bali | PersonalFitness.id" → H1 "Wellness for every villa you manage. You earn on every session."
  - `/resources/how-villa-managers-book-guest-fitness-sessions` — "How villa managers book guest fitness sessions" → H1 "How villa managers book guest fitness sessions"
  - `/id/mitra-villa` — "Program Mitra Wellness Villa di Bali | PersonalFitness.id" → H1 "Wellness untuk setiap villa Anda. Anda dapat komisi dari setiap sesi."
- **Blog topics involved:** KW021, KW074, KW075, KW117, KW118, KW119, KW120
- **Why it is a conflict:** Guide 'How villa managers book guest fitness sessions' overlaps the partner page; /id/mitra-villa is the same offer in Bahasa (OK if hreflang en/id is set).
- **Exactly what to change on the loser(s):**
  - `/resources/how-villa-managers-book-guest-fitness-sessions`: Keep operational angle; first paragraph links to /villa-hotel-partners with anchor 'villa wellness partner programme'. New title: "How Villa Managers Book Fitness Sessions for Guests"; new H1: "How villa managers book fitness sessions for guests".
  - `/id/mitra-villa`: Add hreflang pair with /villa-hotel-partners (en ↔ id). New title: "Program Mitra Wellness Villa di Bali | PersonalFitness.id"; new H1: "Program mitra villa di Bali: wellness untuk setiap villa Anda".

### C17 — `jakarta apartment training`

- **Winner:** `/resources/jakarta-apartment-session`
- **Pages in the group (current title → H1):**
  - `/resources/jakarta-apartment-session` — "Making a Jakarta apartment work | PersonalFitness.id" → H1 "Making a Jakarta apartment work"
  - `/resources/private-yoga-in-a-jakarta-apartment-space-access-and-pair-pricing` — "Private Yoga in a Jakarta Apartment | PersonalFitness.id" → H1 "Private yoga in a Jakarta apartment: space, access and pair pricing"
  - `/resources/home-personal-training-in-jakarta-how-to-set-up-your-first-session` — "Home Private Strength Training Jakarta: First Session" → H1 "Home private strength training in Jakarta: how to set up your first session"
- **Blog topics involved:** KW047, KW123
- **Why it is a conflict:** Three guides cover apartment setup in Jakarta.
- **Exactly what to change on the loser(s):**
  - `/resources/private-yoga-in-a-jakarta-apartment-space-access-and-pair-pricing`: Keep strictly yoga-specific. New title: "Yoga in a Jakarta Apartment: Space and Building Access"; new H1: "Yoga in a Jakarta apartment: space, access and pair pricing".
  - `/resources/home-personal-training-in-jakarta-how-to-set-up-your-first-session`: Lock to 'first session – what to expect'; link apartment guide for lobby detail. New title: "First Home Training Session in Jakarta: What to Expect"; new H1: "Your first home training session in Jakarta: what to expect".

### C18 — `villa workout setup`

- **Winner:** `/resources/train-in-a-bali-villa`
- **Pages in the group (current title → H1):**
  - `/resources/train-in-a-bali-villa` — "How to Set Up a Villa for a Session | PersonalFitness.id" → H1 "How to set a villa up for a private session"
  - `/resources/personal-trainer-in-bali-what-a-managed-in-villa-session-includes` — "Personal Trainer in Bali: In-Villa Sessions" → H1 "Personal trainer in Bali: what a managed in-villa session includes"
- **Blog topics involved:** KW040, KW120
- **Why it is a conflict:** Both guides explain preparing a villa for a session.
- **Exactly what to change on the loser(s):**
  - `/resources/personal-trainer-in-bali-what-a-managed-in-villa-session-includes`: Lock to 'what is included'; cut villa-prep detail to two lines + link to train-in-a-bali-villa. New title: "What an In-Villa Training Session Includes in Bali"; new H1: "What an in-villa training session in Bali includes".

### C19 — `personal trainer at home (no city)`

- **Winner:** `/personal-training`
- **Pages in the group (current title → H1):**
  - `/personal-training` — "Private Strength Training at Home | PersonalFitness.id" → H1 "Private Strength Training at Home"
  - `/` — "Personal Trainer at Home in Bali & Jakarta" → H1 "Personal trainer at your villa or home in Bali and Jakarta"
  - `/how-it-works` — "How to Book a Personal Trainer at Home | PersonalFitness.id" → H1 "From your first message to a coach at your door."
- **Blog topics involved:** KW102
- **Why it is a conflict:** Homepage title 'Personal Trainer at Home in Bali & Jakarta' and /how-it-works 'How to Book a Personal Trainer at Home' share 'personal trainer at home' with /personal-training.
- **Exactly what to change on the loser(s):**
  - `/`: Use 'at Your Villa or Home | Bali & Jakarta' (brand + both cities). New title: "Personal Trainer at Your Villa or Home | Bali & Jakarta"; new H1: "Personal trainer at your villa or home in Bali and Jakarta".
  - `/personal-training`: Own 'private strength training at home' + 'personal trainer home visit'. New title: "Private Strength Training at Home | PersonalFitness.id"; new H1: "Private strength training at home, with a personal trainer".
  - `/how-it-works`: Keep the 'how to book' modifier at the very front. New title: "How to Book a Personal Trainer at Home | PersonalFitness.id"; new H1: "How to book a personal trainer at home: eight steps".

### C20 — `(template duplication) city × service pages`

- **Winner:** `n/a`
- **Pages in the group (current title → H1):**
  - `/bali/personal-training` — "Private Personal Trainer in Bali | PersonalFitness.id" → H1 "Private Personal Trainer in Bali"
  - `/jakarta/personal-training` — "Home Personal Trainer in Jakarta | PersonalFitness.id" → H1 "Home Personal Trainer in Jakarta"
  - `/bali/private-yoga` — "Private Yoga at Your Villa in Bali | PersonalFitness.id" → H1 "Private Yoga at Your Villa in Bali"
  - `/jakarta/private-yoga` — "Private Yoga at Home in Jakarta | PersonalFitness.id" → H1 "Private Yoga at Home in Jakarta"
  - `/bali/mat-pilates` — "Private Mat Pilates in Bali | PersonalFitness.id" → H1 "Private Mat Pilates in Bali"
  - `/jakarta/mat-pilates` — "Private Mat Pilates in Jakarta | PersonalFitness.id" → H1 "Private Mat Pilates in Jakarta"
  - `/bali/boxing-fitness` — "Private Boxing Fitness in Bali | PersonalFitness.id" → H1 "Private Boxing Fitness in Bali"
  - `/jakarta/boxing-fitness` — "Private Boxing Fitness in Jakarta | PersonalFitness.id" → H1 "Private Boxing Fitness in Jakarta"
  - `/bali/guided-meditation` — "Private Guided Meditation in Bali | PersonalFitness.id" → H1 "Private Guided Meditation in Bali"
  - `/jakarta/guided-meditation` — "Private Guided Meditation in Jakarta | PersonalFitness.id" → H1 "Private Guided Meditation in Jakarta"
- **Why it is a conflict:** Not a keyword clash but a duplication risk: Bali vs Jakarta versions of the same service share 69–72% of their 5-word sequences (raw/similarity_pairs.json); service pages in one city share 50–61%.
- **Exactly what to change on the loser(s):**
  - `*`: For each city page, replace at least 3 shared boilerplate blocks with city-specific content (Bali: villa decks, heat, gates, the 5 areas; Jakarta: lobbies, towers, traffic windows, in-zone vs quoted areas). Keep FAQ/pricing blocks but shorten them and link to /pricing and /faq.

## LOW conflicts

### C21 — `(template duplication) Jakarta neighbourhood pages`

- **Winner:** `n/a`
- **Pages in the group (current title → H1):**
  - `/jakarta/kemang` — "Personal Trainer in Kemang | PersonalFitness.id" → H1 "Personal Trainer in Kemang"
  - `/jakarta/senopati` — "Personal Trainer in Senopati | PersonalFitness.id" → H1 "Personal Trainer in Senopati"
  - `/jakarta/scbd` — "Personal Trainer in SCBD | PersonalFitness.id" → H1 "Personal Trainer in SCBD"
  - `/jakarta/kebayoran` — "Personal Trainer in Kebayoran | PersonalFitness.id" → H1 "Personal Trainer in Kebayoran"
  - `/jakarta/cilandak` — "Personal Trainer in Cilandak | PersonalFitness.id" → H1 "Personal Trainer in Cilandak"
  - `/jakarta/pondok-indah` — "Personal Trainer in Pondok Indah | PersonalFitness.id" → H1 "Personal Trainer in Pondok Indah"
  - `/jakarta/kuningan` — "Personal Trainer in Kuningan | PersonalFitness.id" → H1 "Personal Trainer in Kuningan"
  - `/jakarta/menteng` — "Personal Trainer in Menteng | PersonalFitness.id" → H1 "Personal Trainer in Menteng"
  - `/jakarta/gondangdia` — "Personal Trainer in Gondangdia | PersonalFitness.id" → H1 "Personal Trainer in Gondangdia"
  - `/jakarta/thamrin` — "Personal Trainer in Thamrin | PersonalFitness.id" → H1 "Personal Trainer in Thamrin"
  - `/jakarta/kelapa-gading` — "Personal Trainer in Kelapa Gading | PersonalFitness.id" → H1 "Personal Trainer in Kelapa Gading"
  - `/jakarta/sunter` — "Personal Trainer in Sunter | PersonalFitness.id" → H1 "Personal Trainer in Sunter"
  - `/jakarta/pluit` — "Personal Trainer in Pluit | PersonalFitness.id" → H1 "Personal Trainer in Pluit"
  - `/jakarta/pik` — "Personal Trainer in Pantai Indah Kapuk | PersonalFitness.id" → H1 "Personal Trainer in Pantai Indah Kapuk"
  - `/jakarta/puri-indah` — "Personal Trainer in Puri Indah | PersonalFitness.id" → H1 "Personal Trainer in Puri Indah"
  - `/jakarta/kebon-jeruk` — "Personal Trainer in Kebon Jeruk | PersonalFitness.id" → H1 "Personal Trainer in Kebon Jeruk"
  - `/jakarta/rawamangun` — "Personal Trainer in Rawamangun | PersonalFitness.id" → H1 "Personal Trainer in Rawamangun"
  - `/jakarta/pulomas` — "Personal Trainer in Pulomas | PersonalFitness.id" → H1 "Personal Trainer in Pulomas"
- **Why it is a conflict:** 18 neighbourhood pages share a median ~40% of text. Each has a unique keyword, so they do not cannibalise each other, but the 8 North/West/East 'by request' pages are doorway-risk if they read like coverage.
- **Exactly what to change on the loser(s):**
  - `*`: Keep 'by request, travel quoted' visible in title/meta/H1 area for N/W/E pages; add 2 genuinely local paragraphs per page (buildings/house types already listed in 'Venues we can use'). Do not add more neighbourhood pages until these get impressions.

### C22 — `H1 duplicate /about vs /services`

- **Winner:** `/services`
- **Pages in the group (current title → H1):**
  - `/services` — "Private Fitness Sessions at Home | PersonalFitness.id" → H1 "Private sessions at your villa or home."
  - `/about` — "About PersonalFitness.id" → H1 "Private fitness sessions at your villa or home."
- **Why it is a conflict:** /about H1 'Private fitness sessions at your villa or home.' vs /services H1 'Private sessions at your villa or home.'
- **Exactly what to change on the loser(s):**
  - `/about`: H1 'About PersonalFitness.id'. New title: "About PersonalFitness.id: A Managed Private Fitness Service"; new H1: "About PersonalFitness.id".

### C23 — `personal trainer datang ke rumah (Bahasa)`

- **Winner:** `/id`
- **Pages in the group (current title → H1):**
  - `/id` — "Personal Trainer Datang ke Rumah di Bali dan Jakarta" → H1 "Personal trainer datang ke rumah di Bali dan Jakarta"
- **Blog topics involved:** KW015, KW016, KW061
- **Why it is a conflict:** Only /id is in Bahasa; blog topics KW015/016/061 target its exact head terms.
- **Exactly what to change on the loser(s):**
  - `blog`: Do not write these as blog posts; they are locked to /id. Consider a Bahasa /id/jakarta and /id/bali page later.

### C24 — `personal trainer sanur / uluwatu + local yoga`

- **Winner:** `/bali/sanur, /bali/uluwatu`
- **Pages in the group (current title → H1):**
  - `/bali/sanur` — "Personal Trainer in Sanur | PersonalFitness.id" → H1 "Personal Trainer in Sanur"
  - `/bali/uluwatu` — "Personal Trainer in Uluwatu | PersonalFitness.id" → H1 "Personal Trainer in Uluwatu"
- **Blog topics involved:** KW004, KW006, KW066, KW068, KW070, KW088
- **Why it is a conflict:** Only blog topics compete (no guide yet).
- **Exactly what to change on the loser(s):**
  - `blog`: Blocked in keyword_bank (blocked_cannibal).

### C25 — `Jakarta neighbourhood blog topics`

- **Winner:** `each /jakarta/<area> page`
- **Blog topics involved:** KW048, KW049, KW050, KW051, KW052, KW053, KW089, KW090, KW091, KW092, KW093, KW094, KW095, KW096, KW097, KW098, KW099, KW100, KW054, KW056, KW018
- **Why it is a conflict:** Blog topics target exactly the keywords already locked to live neighbourhood/service pages.
- **Exactly what to change on the loser(s):**
  - `blog`: Blocked in keyword_bank (blocked_cannibal).

### C26 — `Bali service blog topics`

- **Winner:** `/bali/<service>`
- **Blog topics involved:** KW012, KW013, KW037, KW039, KW063
- **Why it is a conflict:** Blog topics target exactly the keywords locked to /bali service pages.
- **Exactly what to change on the loser(s):**
  - `blog`: Blocked in keyword_bank (blocked_cannibal).

## Locked anchor text (use these when any page links to a money page)

| Money page | Locked primary keyword | Anchor to use |
|---|---|---|
| `/bali/personal-training` | personal trainer bali | personal trainer in Bali |
| `/jakarta/personal-training` | personal trainer jakarta | personal trainer in Jakarta |
| `/pricing` | personal trainer bali price | personal trainer prices in Bali and Jakarta |
| `/bali/private-yoga` | private yoga bali | private yoga in Bali |
| `/jakarta/private-yoga` | private yoga jakarta | private yoga in Jakarta |
| `/programmes` | personal training packages bali | personal training packages |
| `/bali` | fitness trainer bali | fitness trainer in Bali |
| `/jakarta` | home fitness trainer jakarta | home fitness trainer in Jakarta |
| `/bali/canggu` | personal trainer canggu | personal trainer in Canggu |
| `/bali/seminyak` | personal trainer seminyak | personal trainer in Seminyak |
| `/bali/ubud` | personal trainer ubud | personal trainer in Ubud |
| `/bali/sanur` | personal trainer sanur | personal trainer in Sanur |
| `/bali/uluwatu` | personal trainer uluwatu | personal trainer in Uluwatu |
| `/jakarta/south-jakarta` | personal trainer jakarta selatan | personal trainer in South Jakarta |
| `/jakarta/central-jakarta` | personal trainer jakarta pusat | personal trainer in Central Jakarta |
| `/bali/mat-pilates` | private pilates bali | private Pilates in Bali |
| `/jakarta/mat-pilates` | private pilates jakarta | private Pilates in Jakarta |
| `/bali/boxing-fitness` | private boxing bali | private boxing in Bali |
| `/jakarta/boxing-fitness` | private boxing jakarta | private boxing in Jakarta |
| `/bali/guided-meditation` | guided meditation bali | guided meditation in Bali |
| `/jakarta/guided-meditation` | guided meditation jakarta | guided meditation in Jakarta |
| `/personal-training` | private strength training at home | private strength training at home |
| `/private-yoga` | private yoga at home | private yoga at home |
| `/mat-pilates` | private mat pilates at home | private mat Pilates at home |
| `/mobility-coaching` | assisted stretching at home | assisted stretching at home |
| `/boxing-fitness` | private boxing lessons at home | private boxing lessons at home |
| `/guided-meditation` | private meditation sessions at home | private meditation sessions at home |
| `/villa-hotel-partners` | villa wellness partner programme bali | villa wellness partner programme |
| `/id` | personal trainer datang ke rumah | personal trainer datang ke rumah |
| `/how-it-works` | how to book a personal trainer at home | how to book a personal trainer at home |
| `/` | personal trainer at your villa or home Bali Jakarta | personal trainer at your villa or home |

Vary anchors naturally (about 1 in 3 links can be a partial/branded variant), but never point the locked anchor at a different URL.
