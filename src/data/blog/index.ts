import type { BlogPost } from './types'
import baliTrainer from './bodies/personal-trainer-in-bali.md?raw'
import jakartaHome from './bodies/home-personal-training-jakarta.md?raw'
import baliYoga from './bodies/private-yoga-in-bali.md?raw'
import matHome from './bodies/mat-pilates-at-home.md?raw'
import programmes from './bodies/two-three-four-week-programmes.md?raw'
import baliPrices from './bodies/personal-trainer-bali-prices.md?raw'
import jakartaPrices from './bodies/personal-trainer-jakarta-prices.md?raw'
import yogaPrices from './bodies/private-yoga-prices-bali.md?raw'
import matPrices from './bodies/mat-pilates-prices.md?raw'
import paidFirst from './bodies/free-intro-vs-paid-first-session.md?raw'

export const blogPosts: BlogPost[] = [
  {
    slug: 'personal-trainer-in-bali-what-a-managed-in-villa-session-includes',
    briefId: 'B001',
    title: 'Personal trainer in Bali: what a managed in-villa session includes',
    description: 'What you get in a 60-minute managed villa session, what you do not, and how the Rp 900.000 Bali rate is built.',
    date: '2026-11-16',
    primaryQuery: 'personal trainer in Bali',
    service: 'Personal training',
    city: 'Bali',
    landingPage: '/bali/personal-training',
    image: '/images/sessions/personal-training.webp',
    faqs: [
      { q: 'Is Rp 900.000 the final price?', a: 'It is the in-zone 60-minute rate for one person in Canggu–Seminyak. Extra people, 90 minutes and outer-zone travel are added on the quote.' },
      { q: 'Can I pick the trainer?', a: 'You can name a preference. Confirmation waits on the diary and a written quote.' },
      { q: 'Does an enquiry reserve 07:00?', a: 'No. Only the confirmation after payment status does.' },
    ],
    body: baliTrainer,
  },
  {
    slug: 'home-personal-training-in-jakarta-how-to-set-up-your-first-session',
    briefId: 'B002',
    title: 'Home personal training in Jakarta: how to set up your first session',
    description: 'Building access, floor setup and the Rp 950.000 Jakarta rate for a first private session at home.',
    date: '2026-11-17',
    primaryQuery: 'home personal training in Jakarta',
    service: 'Personal training',
    city: 'Jakarta',
    landingPage: '/jakarta/personal-training',
    image: '/images/sessions/personal-training.webp',
    faqs: [
      { q: 'Do I need a home gym?', a: 'No. A clear living-room rectangle and an access plan are enough for the first hour.' },
      { q: 'What if my building blocks outside trainers?', a: 'Tell us before the quote. We will not pretend a lobby refusal is a session.' },
      { q: 'Is South Jakarta in-zone?', a: 'Yes for the published cluster. BSD and outer municipalities are quoted with travel or declined.' },
    ],
    body: jakartaHome,
  },
  {
    slug: 'private-yoga-in-bali-one-to-one-couples-and-villa-groups-explained',
    briefId: 'B003',
    title: 'Private yoga in Bali: one-to-one, couples and villa groups explained',
    description: 'How pair pricing, extra people and space rules work for private yoga in a Bali villa.',
    date: '2026-11-18',
    primaryQuery: 'private yoga in Bali',
    service: 'Private yoga',
    city: 'Bali',
    landingPage: '/bali/private-yoga',
    image: '/images/sessions/private-yoga.webp',
    faqs: [
      { q: 'Are two people included?', a: 'Yes. The published Bali yoga rate includes up to two people. Extra people are quoted if the floor allows.' },
      { q: 'Do you teach on the beach?', a: 'Not as a default. Public sand and clubs need written permission and a usable private space.' },
      { q: 'Can beginners join a stronger partner?', a: 'Yes if you say so. We will not run two private classes in one hour.' },
    ],
    body: baliYoga,
  },
  {
    slug: 'mat-pilates-at-home-what-you-need-and-what-you-do-not',
    briefId: 'B004',
    title: 'Mat Pilates at home: what you need, and what you do not',
    description: 'Floor, mats and limits for private mat Pilates. No reformer. No clinical rehab sold as a class.',
    date: '2026-11-19',
    primaryQuery: 'mat pilates at home',
    service: 'Mat Pilates',
    city: 'Bali & Jakarta',
    landingPage: '/mat-pilates',
    image: '/images/sessions/mat-pilates.webp',
    faqs: [
      { q: 'Do you bring a reformer?', a: 'No. This is mat only.' },
      { q: 'What if I have back pain?', a: 'Get clinical advice first. We will not treat pain in a living room.' },
      { q: 'Is a second person free?', a: 'No. Unlike yoga, mat extra people are billed.' },
    ],
    body: matHome,
  },
  {
    slug: 'two-three-or-four-weeks-choosing-a-fitness-programme-for-your-stay',
    briefId: 'B005',
    title: 'Two, three or four weeks: choosing a fitness programme for your stay',
    description: 'How 6, 9 and 12 session blocks work, who they are for, and when a single session is the better buy.',
    date: '2026-11-20',
    primaryQuery: 'two three or four week fitness programme Bali Jakarta',
    service: 'Programmes',
    city: 'Bali & Jakarta',
    landingPage: '/programmes',
    image: '/images/sessions/personal-training.webp',
    faqs: [
      { q: 'What are the discounts?', a: '5 percent for six sessions, 8 percent for nine, 12 percent for twelve, applied after extras.' },
      { q: 'Can I mix Bali and Jakarta in one block?', a: 'Not as one membership. Cities have different rates and professionals.' },
      { q: 'What happens to unused sessions?', a: 'They follow the validity window on the quote. They are not cash.' },
    ],
    body: programmes,
  },
  {
    slug: 'personal-trainer-bali-prices-how-to-compare-quotes-like-for-like',
    briefId: 'B006',
    title: 'Personal trainer Bali prices: how to compare quotes like for like',
    description: 'A like-for-like method for Bali private training quotes, using the published Rp 900.000 in-zone rate.',
    date: '2026-11-23',
    primaryQuery: 'personal trainer Bali prices',
    service: 'Personal training',
    city: 'Bali',
    landingPage: '/pricing',
    image: '/images/sessions/personal-training.webp',
    faqs: [
      { q: 'Why is a group class cheaper?', a: 'Because it is not private, not in your villa, and not one coach for one person.' },
      { q: 'Is Uluwatu the same price as Canggu?', a: 'No. Uluwatu adds Rp 200.000 travel per visit.' },
      { q: 'Can I pay in WhatsApp?', a: 'No. Use the merchant link on the quote.' },
    ],
    body: baliPrices,
  },
  {
    slug: 'personal-trainer-jakarta-prices-studio-home-and-managed-service-costs',
    briefId: 'B007',
    title: 'Personal trainer Jakarta prices: studio, home and managed service costs',
    description: 'How to separate studio packs, building gyms and a Rp 950.000 managed home visit in Jakarta.',
    date: '2026-11-24',
    primaryQuery: 'personal trainer Jakarta prices',
    service: 'Personal training',
    city: 'Jakarta',
    landingPage: '/pricing',
    image: '/images/sessions/personal-training.webp',
    faqs: [
      { q: 'Is Rp 950.000 city-wide?', a: 'No. It is South and Central in-zone. Other municipalities need travel or a decline.' },
      { q: 'Do I still pay if the lobby blocks the coach?', a: 'Access failures can stop the session under the refund rules. Put visitor rules on the quote.' },
      { q: 'Are twelve sessions cheaper?', a: 'Yes, 12 percent off if you actually attend them.' },
    ],
    body: jakartaPrices,
  },
  {
    slug: 'private-yoga-prices-in-bali-duration-travel-and-group-size',
    briefId: 'B008',
    title: 'Private yoga prices in Bali: duration, travel and group size',
    description: 'How Rp 850.000 pair pricing changes with 90 minutes, Ubud/Uluwatu travel and extra people.',
    date: '2026-11-25',
    primaryQuery: 'private yoga prices in Bali',
    service: 'Private yoga',
    city: 'Bali',
    landingPage: '/pricing',
    image: '/images/sessions/private-yoga.webp',
    faqs: [
      { q: 'Is the second person free?', a: 'Included in the published yoga rate. The third person is not.' },
      { q: 'Do you charge a sunrise premium?', a: 'No. We charge duration and travel, not a caption.' },
      { q: 'What about rain?', a: 'Have an indoor fallback. Outdoor-only decks get moved or rescheduled.' },
    ],
    body: yogaPrices,
  },
  {
    slug: 'mat-pilates-prices-why-mat-reformer-studio-and-home-sessions-differ',
    briefId: 'B009',
    title: 'Mat Pilates prices: why mat, reformer, studio and home sessions differ',
    description: 'Do not compare a group reformer class to a private home mat hour. Here is the four-product split.',
    date: '2026-11-26',
    primaryQuery: 'mat pilates prices',
    service: 'Mat Pilates',
    city: 'Bali & Jakarta',
    landingPage: '/pricing',
    image: '/images/sessions/mat-pilates.webp',
    faqs: [
      { q: 'Do you offer reformer at home?', a: 'No.' },
      { q: 'Why is Jakarta more than Bali?', a: 'The published base is Rp 50.000 higher. Access, not quality theatre.' },
      { q: 'Is a second person included?', a: 'No. Extra people are billed on mat work.' },
    ],
    body: matPrices,
  },
  {
    slug: 'free-introduction-vs-paid-first-session-what-personalfitness-id-offers',
    briefId: 'B010',
    title: 'Free introduction vs paid first session: what PersonalFitness.id offers',
    description: 'We do not run a free intro hour. The first session is the published rate, quoted in writing.',
    date: '2026-11-27',
    primaryQuery: 'free introduction vs paid first session personal training',
    service: 'Personal training',
    city: 'Bali & Jakarta',
    landingPage: '/personal-training',
    image: '/images/sessions/personal-training.webp',
    faqs: [
      { q: 'Is the first session free?', a: 'No.' },
      { q: 'Where is the discount then?', a: 'On 6, 9 and 12 session programmes, written on the quote.' },
      { q: 'Can a villa host comp a guest?', a: 'The host can pay the published rate. We will not hide a free hour.' },
    ],
    body: paidFirst,
  },
]

export function getBlogPost(slug: string) {
  return blogPosts.find((item) => item.slug === slug)
}

export function relatedPosts(slug: string) {
  const current = getBlogPost(slug)
  if (!current) return blogPosts.slice(0, 3)
  return blogPosts.filter((item) => item.slug !== slug && (item.service === current.service || item.city === current.city)).slice(0, 3)
}
