import { areas, services, type City } from './catalog'
import { blogPosts } from './blog'
import { resources } from './content'
import { CITY_SERVICE_RELEASED, CORE_SERVICE_SLUGS, HELD_SERVICE_SLUGS } from './publicOffer'
import { formatIdr } from '@/lib/money'
import editorial from './location-editorial.json'

export type SeoLink = { to: string; label: string }
export type SeoRecord = {
  path: string
  primaryKeyword: string
  title: string
  description: string
  group: 'page' | 'post'
  lastmod: string
  related: SeoLink[]
  crumbs: SeoLink[]
}

const TODAY = '2026-11-14'

function cityServiceDescription(slug: string, city: City, price: number | null | undefined) {
  const start = price ? ' from ' + formatIdr(price) : ''
  const place = city === 'Bali' ? 'villa or home' : 'home or apartment'
  if (slug === 'personal-training') return `Personal trainer at your ${place} in ${city}${start} for 60 minutes in published clusters. Written quote before payment.`
  if (slug === 'private-yoga') return `Private yoga at your ${place} in ${city}${start}, for one or two people. Written quote before payment.`
  if (slug === 'mat-pilates') return `Private mat Pilates at your ${place} in ${city}${start}. No reformer. Written quote before payment.`
  if (slug === 'boxing-fitness') return `Pad-only boxing fitness at your ${place} in ${city}${start}. Pad work, one or two guests. Space check first, then a written quote.`
  if (slug === 'guided-meditation') return `Private guided meditation at your ${place} in ${city}${start} for one or two people. A calm, guided hour.`
  return `Private ${slug.replace(/-/g, ' ')} at your ${place} in ${city}${start}. Written quote before payment.`
}
const SPECIALISMS = new Set(['nutrition-consultation', 'physiotherapy', 'occupational-therapy', 'speech-therapy', 'psychology', 'acupuncture', 'lactation-support', 'birth-and-postpartum-support'])
const HOME: SeoLink = { to: '/', label: 'Home' }
const SERVICES: SeoLink = { to: '/services', label: 'Services' }
const AREAS: SeoLink = { to: '/service-areas', label: 'Service areas' }
const BLOG: SeoLink = { to: '/resources', label: 'Blog' }

const hubs: SeoRecord[] = [
  {
    path: '/',
    primaryKeyword: 'personal trainer at home Bali Jakarta',
    title: 'Personal Trainer at Home in Bali & Jakarta',
    description: 'A vetted instructor at your villa or home in Bali and Jakarta. Private strength training from Rp 1.050.000. Written quote before you pay.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/personal-training', label: 'Private Strength Training at home' },
      { to: '/private-yoga', label: 'Private yoga at your villa' },
      { to: '/mat-pilates', label: 'Mat Pilates at home' },
      { to: '/mobility-coaching', label: 'Mobility coaching at home' },
      { to: '/boxing-fitness', label: 'Boxing fitness at home' },
      { to: '/guided-meditation', label: 'Guided meditation at home' },
      { to: '/bali', label: 'Private fitness in Bali' },
      { to: '/jakarta', label: 'Home private strength training in Jakarta' },
      { to: '/resources', label: 'Private fitness guides' },
      { to: '/id', label: 'Personal trainer datang ke rumah' },
    ],
    crumbs: [HOME],
  },
  {
    path: '/id',
    primaryKeyword: 'personal trainer datang ke rumah',
    title: 'Personal Trainer Datang ke Rumah di Bali dan Jakarta',
    description: 'Personal trainer datang ke villa atau rumah di Bali dan Jakarta dari Rp 1.050.000. Kutipan tertulis sebelum bayar.',
    group: 'page', lastmod: '2026-11-16',
    related: [
      { to: '/', label: 'English homepage' },
      { to: '/pricing', label: 'Harga sesi' },
      { to: '/bali', label: 'Personal trainer Bali' },
      { to: '/jakarta', label: 'Personal trainer Jakarta' },
      { to: '/contact', label: 'Cek ketersediaan' },
    ],
    crumbs: [{ to: '/id', label: 'Bahasa Indonesia' }],
  },
  {
    path: '/services',
    primaryKeyword: 'private wellness services at home',
    title: 'Private Fitness Sessions at Home',
    description: 'Private Strength Training, private yoga, mat Pilates, mobility, boxing fitness and guided meditation at your villa or home in Bali and Jakarta, quoted before you pay.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/personal-training', label: 'Private Strength Training' },
      { to: '/private-yoga', label: 'Private yoga' },
      { to: '/mat-pilates', label: 'Mat Pilates' },
      { to: '/mobility-coaching', label: 'Mobility coaching' },
      { to: '/boxing-fitness', label: 'Boxing fitness' },
      { to: '/guided-meditation', label: 'Guided meditation' },
      { to: '/pricing', label: 'Session prices' },
    ],
    crumbs: [HOME, SERVICES],
  },
  {
    path: '/bali',
    primaryKeyword: 'personal trainer Bali',
    title: 'Personal Trainer Bali: Villa & Home Sessions',
    description: 'In-villa private strength training from Rp 1.050.000 in Canggu and Seminyak, plus yoga, Pilates, boxing and meditation. Travel published for Ubud, Sanur and Uluwatu.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/bali/personal-training', label: 'Private Strength Training in Bali' },
      { to: '/bali/private-yoga', label: 'Private yoga in Bali' },
      { to: '/bali/mat-pilates', label: 'Mat Pilates in Bali' },
      { to: '/bali/boxing-fitness', label: 'Boxing fitness in Bali' },
      { to: '/bali/guided-meditation', label: 'Guided meditation in Bali' },
      { to: '/resources/personal-trainer-in-bali-what-a-managed-in-villa-session-includes', label: 'What a Bali villa session includes' },
      { to: '/resources/personal-trainer-in-canggu-villa-access-and-in-zone-rates', label: 'Personal trainer in Canggu' },
      { to: '/resources/personal-trainer-in-seminyak-petitenget-villas-and-in-zone-rates', label: 'Personal trainer in Seminyak' },
    ],
    crumbs: [HOME, AREAS, { to: '/bali', label: 'Bali' }],
  },
  {
    path: '/jakarta',
    primaryKeyword: 'home personal training Jakarta',
    title: 'Home Personal Trainer Jakarta | PersonalFitness.id',
    description: 'Home private strength training from Rp 1.050.000 in South and Central Jakarta. Yoga, Pilates, boxing and meditation at your apartment, with access on the quote.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/jakarta/personal-training', label: 'Private Strength Training in Jakarta' },
      { to: '/jakarta/private-yoga', label: 'Private yoga in Jakarta' },
      { to: '/jakarta/mat-pilates', label: 'Mat Pilates in Jakarta' },
      { to: '/jakarta/boxing-fitness', label: 'Boxing fitness in Jakarta' },
      { to: '/jakarta/guided-meditation', label: 'Guided meditation in Jakarta' },
      { to: '/resources/home-personal-training-in-jakarta-how-to-set-up-your-first-session', label: 'Set up a Jakarta home session' },
      { to: '/resources/private-yoga-in-a-jakarta-apartment-space-access-and-pair-pricing', label: 'Private yoga in a Jakarta apartment' },
      { to: '/bali', label: 'Private fitness in Bali' },
    ],
    crumbs: [HOME, AREAS, { to: '/jakarta', label: 'Jakarta' }],
  },
  {
    path: '/service-areas',
    primaryKeyword: 'private fitness service areas Bali Jakarta',
    title: 'Service Areas in Bali and Jakarta',
    description: 'Canggu and Seminyak in-zone; Ubud, Sanur and Uluwatu with travel. South and Central Jakarta in-zone; North, West and East by request.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/bali', label: 'Bali private fitness' },
      { to: '/jakarta', label: 'Jakarta home training' },
      { to: '/bali/personal-training', label: 'Private Strength Training in Bali' },
      { to: '/jakarta/personal-training', label: 'Private Strength Training in Jakarta' },
      { to: '/resources/personal-trainer-in-seminyak-petitenget-villas-and-in-zone-rates', label: 'Personal trainer in Seminyak' },
      { to: '/pricing', label: 'Session prices' },
      { to: '/contact', label: 'Check availability' },
    ],
    crumbs: [HOME, AREAS],
  },
  {
    path: '/pricing',
    primaryKeyword: 'personal trainer Bali prices',
    title: 'Personal Trainer Prices Bali & Jakarta',
    description: 'Published 60-minute starting prices: private strength training Rp 1.050.000, plus yoga, Pilates, boxing and meditation.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/personal-training', label: 'Private Strength Training rates' },
      { to: '/boxing-fitness', label: 'Boxing fitness rates' },
      { to: '/guided-meditation', label: 'Guided meditation rates' },
      { to: '/resources/personal-trainer-bali-prices-how-to-compare-quotes-like-for-like', label: 'Compare Bali trainer quotes' },
      { to: '/resources/extra-people-and-pair-pricing-yoga-training-and-boxing', label: 'Extra people and pair pricing' },
      { to: '/programmes', label: '3, 5 and 10 session programmes' },
    ],
    crumbs: [HOME, { to: '/pricing', label: 'Pricing' }],
  },
  {
    path: '/programmes',
    primaryKeyword: 'two three four week fitness programme',
    title: '2, 3 and 4 Week Fitness Programmes',
    description: 'Prepaid 3, 5 and 10 session blocks for Bali stays and Jakarta residents, with published about 9.5, 14.3 and 23.8 percent reductions.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/pricing', label: 'Estimate my price' },
      { to: '/boxing-fitness', label: 'Add boxing fitness' },
      { to: '/guided-meditation', label: 'Add guided meditation' },
      { to: '/resources/two-three-or-four-weeks-choosing-a-fitness-programme-for-your-stay', label: 'Choose a 2, 3 or 4 week block' },
      { to: '/contact', label: 'Check availability' },
    ],
    crumbs: [HOME, { to: '/programmes', label: 'Programmes' }],
  },
  {
    path: '/wellness-plan',
    primaryKeyword: 'private wellness schedule at home',
    title: 'Build a Private Wellness Schedule',
    description: 'Mix training, yoga, Pilates, boxing and meditation into one private schedule at your Bali villa or Jakarta home, then review programme savings.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/programmes', label: 'Prepaid programmes' },
      { to: '/services', label: 'All wellness services' },
      { to: '/how-it-works', label: 'How a visit works' },
    ],
    crumbs: [HOME, { to: '/wellness-plan', label: 'Wellness plan' }],
  },
  {
    path: '/how-it-works',
    primaryKeyword: 'how to book a personal trainer at home Bali',
    title: 'How to Book a Personal Trainer at Home',
    description: 'Eight steps from your first WhatsApp to a coach at your villa or home. Clear written quote before you pay.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/contact', label: 'Check availability' },
      { to: '/pricing', label: 'See session prices' },
      { to: '/resources/what-to-put-in-a-whatsapp-enquiry-for-a-home-trainer', label: 'What to put in the WhatsApp' },
      { to: '/professional-standards', label: 'How we match professionals' },
    ],
    crumbs: [HOME, { to: '/how-it-works', label: 'How it works' }],
  },
  {
    path: '/professionals',
    primaryKeyword: 'private fitness professionals Bali Jakarta',
    title: 'Private Fitness Professionals in Bali and Jakarta',
    description: 'Trainers, yoga teachers, Pilates coaches and wellness specialists for private visits. Availability is confirmed on your quote.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/personal-training', label: 'Personal trainers' },
      { to: '/private-yoga', label: 'Yoga teachers' },
      { to: '/professional-standards', label: 'Matching standards' },
    ],
    crumbs: [HOME, { to: '/professionals', label: 'Professionals' }],
  },
  {
    path: '/resources',
    primaryKeyword: 'personal trainer Bali guide',
    title: 'Bali & Jakarta Fitness Guides | PersonalFitness.id',
    description: 'Guides to in-villa private strength training, Canggu access, Jakarta home yoga, mobility coaching, boxing, meditation, prices and programmes.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/resources/personal-trainer-in-seminyak-petitenget-villas-and-in-zone-rates', label: 'Personal trainer in Seminyak' },
      { to: '/resources/extra-people-and-pair-pricing-yoga-training-and-boxing', label: 'Extra people and pair pricing' },
      { to: '/resources/mobility-coaching-at-home-what-it-is-and-is-not', label: 'Mobility coaching at home' },
      { to: '/resources/what-to-put-in-a-whatsapp-enquiry-for-a-home-trainer', label: 'WhatsApp enquiry template' },
      { to: '/pricing', label: 'Published prices' },
      { to: '/', label: 'Private fitness homepage' },
    ],
    crumbs: [HOME, BLOG],
  },
  {
    path: '/contact',
    primaryKeyword: 'book personal trainer Bali WhatsApp',
    title: 'Contact & Book on WhatsApp | PersonalFitness.id',
    description: 'Book a private session at your villa or home in Bali or Jakarta. WhatsApp +62 811-3803-488 or hello@personalfitness.id.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/pricing', label: 'See prices first' },
      { to: '/how-it-works', label: 'How booking works' },
      { to: '/resources/what-to-put-in-a-whatsapp-enquiry-for-a-home-trainer', label: 'What to put in the WhatsApp' },
      { to: '/resources/extra-people-and-pair-pricing-yoga-training-and-boxing', label: 'Extra people and pair pricing' },
      { to: '/faq', label: 'Common questions' },
    ],
    crumbs: [HOME, { to: '/contact', label: 'Contact' }],
  },
  {
    path: '/about',
    primaryKeyword: 'PersonalFitness.id private fitness company',
    title: 'About PersonalFitness.id',
    description: 'A company-managed mobile fitness and wellness service for homes and villas in Bali and Jakarta, a managed private service.',
    group: 'page', lastmod: TODAY,
    related: [{ to: '/professional-standards', label: 'Standards' }, { to: '/contact', label: 'Contact' }, { to: '/villa-hotel-partners', label: 'Villa partners' }],
    crumbs: [HOME, { to: '/about', label: 'About' }],
  },
  {
    path: '/faq',
    primaryKeyword: 'personal trainer Bali FAQ',
    title: 'Personal Trainer Bali and Jakarta FAQ',
    description: 'Prices, Canggu and Seminyak, South and Central Jakarta, extra people, cancellation and payment. Written quote before you pay.',
    group: 'page', lastmod: TODAY,
    related: [{ to: '/pricing', label: 'Prices' }, { to: '/resources/extra-people-and-pair-pricing-yoga-training-and-boxing', label: 'Extra people and pair pricing' }, { to: '/contact', label: 'Ask a coordinator' }],
    crumbs: [HOME, { to: '/faq', label: 'FAQ' }],
  },
  {
    path: '/reviews',
    primaryKeyword: 'private fitness Bali reviews',
    title: 'Private Fitness Visit Notes',
    description: 'What guests notice when the quote, access and private session at home actually match.',
    group: 'page', lastmod: TODAY,
    related: [{ to: '/how-it-works', label: 'How it works' }, { to: '/contact', label: 'Request a quote' }],
    crumbs: [HOME, { to: '/reviews', label: 'Guest notes' }],
  },
  {
    path: '/villa-hotel-partners',
    primaryKeyword: 'villa wellness partner Bali',
    title: 'Villa Wellness Partner Programme Bali',
    description: 'Add yoga, private strength training and Pilates across the villas you manage. A coordinator sets the week. Guests book by email or WhatsApp. You earn a commission.',
    group: 'page', lastmod: '2026-11-16',
    related: [{ to: '/partner-terms', label: 'Partner terms' }, { to: '/id/mitra-villa', label: 'Program mitra villa' }, { to: '/private-yoga', label: 'Private yoga' }, { to: '/personal-training', label: 'Private Strength Training' }, { to: '/contact', label: 'Guest booking' }],
    crumbs: [HOME, { to: '/villa-hotel-partners', label: 'Partners' }],
  },
  {
    path: '/partner-terms',
    primaryKeyword: 'villa partner terms Bali',
    title: 'Villa Partner Terms | PersonalFitness.id',
    description: 'Commission, payout, attribution, pilot and guest privacy for villa managers working with PersonalFitness.id.',
    group: 'page', lastmod: '2026-11-16',
    related: [{ to: '/villa-hotel-partners', label: 'Partner programme' }, { to: '/id/mitra-villa', label: 'Program mitra' }, { to: '/contact', label: 'Contact' }],
    crumbs: [HOME, { to: '/villa-hotel-partners', label: 'Partners' }, { to: '/partner-terms', label: 'Terms' }],
  },
  {
    path: '/team',
    primaryKeyword: 'PersonalFitness.id team',
    title: 'Team | PersonalFitness.id',
    description: 'Company-managed matching for villa and home sessions in Bali and Jakarta. The coach who arrives is named on your quote.',
    group: 'page', lastmod: '2026-11-16',
    related: [{ to: '/about', label: 'About' }, { to: '/professional-standards', label: 'Standards' }, { to: '/villa-hotel-partners', label: 'Partners' }],
    crumbs: [HOME, { to: '/team', label: 'Team' }],
  },
  {
    path: '/id/mitra-villa',
    primaryKeyword: 'program mitra wellness villa bali',
    title: 'Program Mitra Wellness Villa di Bali',
    description: 'Tambahkan yoga, private strength training dan Pilates di setiap villa Anda. Kami kirim coach, tamu pesan lewat WhatsApp, Anda dapat komisi dari setiap sesi.',
    group: 'page', lastmod: '2026-11-16',
    related: [{ to: '/villa-hotel-partners', label: 'English partner page' }, { to: '/partner-terms', label: 'Syarat partner' }, { to: '/id', label: 'Beranda Indonesia' }],
    crumbs: [{ to: '/id', label: 'Bahasa Indonesia' }, { to: '/id/mitra-villa', label: 'Mitra villa' }],
  },
  {
    path: '/professional-standards',
    primaryKeyword: 'private trainer vetting Bali',
    title: 'Professional Matching Standards',
    description: 'How PersonalFitness.id vets, matches and backs up the professional who arrives at your home or villa.',
    group: 'page', lastmod: TODAY,
    related: [{ to: '/about', label: 'About' }, { to: '/safety', label: 'Session safety' }],
    crumbs: [HOME, { to: '/professional-standards', label: 'Standards' }],
  },
  {
    path: '/privacy',
    primaryKeyword: 'PersonalFitness.id privacy',
    title: 'Privacy Notice',
    description: 'What this website stores, what WhatsApp is for, and what never belongs in chat.',
    group: 'page', lastmod: TODAY, related: [{ to: '/terms', label: 'Terms' }, { to: '/contact', label: 'Contact' }],
    crumbs: [HOME, { to: '/privacy', label: 'Privacy' }],
  },
  {
    path: '/terms',
    primaryKeyword: 'PersonalFitness.id service terms',
    title: 'Service Terms',
    description: 'Scope, quotes, payment, liability and the line between fitness and healthcare.',
    group: 'page', lastmod: TODAY, related: [{ to: '/privacy', label: 'Privacy' }, { to: '/refunds-rescheduling', label: 'Refunds' }],
    crumbs: [HOME, { to: '/terms', label: 'Terms' }],
  },
  {
    path: '/refunds-rescheduling',
    primaryKeyword: 'personal training cancellation policy',
    title: 'Refunds and Rescheduling',
    description: '36-hour rule, professional no-show, unused programme sessions and refunds to the original payment method.',
    group: 'page', lastmod: TODAY, related: [{ to: '/faq', label: 'FAQ' }, { to: '/pricing', label: 'Pricing' }],
    crumbs: [HOME, { to: '/refunds-rescheduling', label: 'Refunds' }],
  },
  {
    path: '/safety',
    primaryKeyword: 'private session safety',
    title: 'Session Safety',
    description: 'Screening limits, emergencies, children and when we stop a private fitness or wellness visit.',
    group: 'page', lastmod: TODAY, related: [{ to: '/professional-standards', label: 'Standards' }, { to: '/faq', label: 'FAQ' }],
    crumbs: [HOME, { to: '/safety', label: 'Safety' }],
  },
  {
    path: '/editorial-policy',
    primaryKeyword: 'PersonalFitness.id editorial policy',
    title: 'Editorial Policy',
    description: 'How PersonalFitness.id pages are written, reviewed and corrected, including prices, photographs and the difference between a quote and marketing copy.',
    group: 'page', lastmod: TODAY, related: [{ to: '/resources', label: 'Blog' }],
    crumbs: [HOME, { to: '/editorial-policy', label: 'Editorial policy' }],
  },
]

const serviceKeyword: Record<string, { keyword: string; title: string; description: string }> = {
  'personal-training': {
    keyword: 'personal trainer at home',
    title: 'Private Strength Training at Home',
    description: 'Private 60-minute strength training at your villa or home. From Rp 1.050.000 for one session. Packs of 3, 5 and 10 reduce the rate. Written quote, then payment.',
  },
  'private-yoga': {
    keyword: 'private yoga at home',
    title: 'Private Yoga at Your Villa or Home',
    description: 'Private yoga for one or two people from Rp 850.000 in Bali and Rp 900.000 in Jakarta, in your own space.',
  },
  'mat-pilates': {
    keyword: 'mat pilates at home',
    title: 'Private Mat Pilates at Home',
    description: 'Mat-based Pilates from Rp 950.000 in Bali and Rp 1.000.000 in Jakarta. No reformer. Private living-room sessions.',
  },
  'mobility-coaching': {
    keyword: 'mobility coaching at home',
    title: 'Private Mobility Coaching at Home',
    description: 'Non-clinical mobility and assisted stretching from Rp 850.000 in Bali and Rp 900.000 in Jakarta, at your home or villa.',
  },
  'massage-and-bodywork': {
    keyword: 'private massage at home Bali',
    title: 'Private Massage at Home in Bali',
    description: 'In-villa and at-home massage and bodywork in Bali and Jakarta, quoted with setup, duration and access.',
  },
  'boxing-fitness': {
    keyword: 'private boxing fitness at home',
    title: 'Pad-Only Boxing Fitness at Home',
    description: 'Pad-only boxing fitness from Rp 1.000.000 in Bali and Rp 1.050.000 in Jakarta, after a space check. No sparring.',
  },
  swimming: {
    keyword: 'private swimming lessons Bali',
    title: 'Private Swimming Lessons in Bali',
    description: '45-minute private swim coaching in a pool you can lawfully use, from Rp 1.050.000 in Bali.',
  },
  'guided-meditation': {
    keyword: 'private guided meditation at home',
    title: 'Private Guided Meditation at Home',
    description: 'A quiet 60-minute guided sit for one or two people from Rp 800.000 in Bali and Rp 850.000 in Jakarta. A calm, guided hour.',
  },
  'bodywork-recovery': {
    keyword: 'bodywork and recovery at the villa',
    title: 'Bodywork and Recovery at Your Villa',
    description: 'Assisted stretching, myofascial release and relaxation at your villa or home. Wellness only, from Rp 1.050.000 for 60 minutes.',
  },
  'zumba-dance-fitness': {
    keyword: 'zumba and dance fitness at the villa',
    title: 'Zumba and Dance Fitness at Your Villa',
    description: 'High-energy dance fitness at your villa or home, from Rp 1.050.000 for 60 minutes. A fun cardio hour, confirmed in writing.',
  },
}

const areaKeyword: Record<string, { keyword: string; title: string; description: string }> = {
  canggu: {
    keyword: 'personal trainer Canggu',
    title: 'Personal Trainer in Canggu',
    description: 'In-villa private strength training, private yoga, boxing fitness and mat Pilates in Canggu, Berawa, Pererenan and Echo Beach. In-zone travel included.',
  },
  seminyak: {
    keyword: 'private yoga Seminyak',
    title: 'Private Yoga and Training in Seminyak',
    description: 'Private yoga, private strength training, boxing fitness and mat Pilates at Seminyak and Petitenget villas. In-zone for core sessions.',
  },
  ubud: {
    keyword: 'private yoga Ubud',
    title: 'Private Yoga and Training in Ubud',
    description: 'Private yoga, mobility and private strength training at Ubud villas and houses, with an outer-area travel fee confirmed in the written quote.',
  },
  sanur: {
    keyword: 'personal trainer Sanur',
    title: 'Personal Trainer in Sanur',
    description: 'Private training, yoga and mat Pilates for Sanur family villas and apartments, with outer-zone travel quoted.',
  },
  uluwatu: {
    keyword: 'personal trainer Uluwatu',
    title: 'Personal Trainer in Uluwatu',
    description: 'In-villa private strength training, private yoga, boxing fitness and mat Pilates in Uluwatu, Pecatu and Bingin, with an outer-area travel fee confirmed in the written quote.',
  },
  'south-jakarta': {
    keyword: 'personal trainer South Jakarta',
    title: 'Personal Trainer in South Jakarta',
    description: 'Home private strength training, yoga, boxing fitness and mat Pilates in Kebayoran, Senopati, Kemang and Cilandak. In-zone for core sessions.',
  },
  'central-jakarta': {
    keyword: 'personal trainer Central Jakarta',
    title: 'Personal Trainer Central Jakarta | PersonalFitness.id',
    description: 'Private training, yoga and Pilates at Menteng, Gondangdia and Thamrin homes, with building access on the quote.',
  },
  'north-jakarta': {
    keyword: 'personal trainer North Jakarta',
    title: 'Personal Trainer in North Jakarta',
    description: 'Private wellness at Kelapa Gading, Sunter and Pluit homes, quoted after availability and travel checks.',
  },
  'west-jakarta': {
    keyword: 'personal trainer West Jakarta',
    title: 'Personal Trainer in West Jakarta',
    description: 'Home training and private yoga enquiries for Puri Indah, Kebon Jeruk and nearby West Jakarta addresses.',
  },
  'east-jakarta': {
    keyword: 'personal trainer East Jakarta',
    title: 'Personal Trainer in East Jakarta',
    description: 'Private training and yoga at East Jakarta homes, confirmed after a local supply and access check.',
  },
  kemang: {
    keyword: 'personal trainer Kemang',
    title: 'Personal Trainer in Kemang',
    description: 'Home private strength training and private yoga in Kemang, South Jakarta. In-zone for core sessions when we can time the visit.',
  },
  senopati: {
    keyword: 'personal trainer Senopati',
    title: 'Personal Trainer in Senopati',
    description: 'Home private strength training in Senopati apartments, with lobby access on the quote. In-zone South Jakarta.',
  },
  scbd: {
    keyword: 'personal trainer SCBD',
    title: 'Personal Trainer in SCBD',
    description: 'Private training, yoga and boxing fitness at SCBD residences. In-zone South Jakarta after a building-access check.',
  },
  kebayoran: {
    keyword: 'personal trainer Kebayoran',
    title: 'Personal Trainer in Kebayoran',
    description: 'Home private strength training in Kebayoran Baru and nearby South Jakarta streets. In-zone when we can time the visit.',
  },
  cilandak: {
    keyword: 'personal trainer Cilandak',
    title: 'Personal Trainer in Cilandak',
    description: 'Private training and yoga at Cilandak houses and compounds. In-zone South Jakarta for core sessions.',
  },
  'pondok-indah': {
    keyword: 'personal trainer Pondok Indah',
    title: 'Personal Trainer in Pondok Indah',
    description: 'In-home private strength training in Pondok Indah, South Jakarta. Estate access on the quote. In-zone when we can time the visit.',
  },
  kuningan: {
    keyword: 'personal trainer Kuningan Jakarta',
    title: 'Personal Trainer in Kuningan',
    description: 'Home private strength training at Kuningan residences. In-zone South Jakarta with SCBD and Setiabudi streets we can time.',
  },
  menteng: {
    keyword: 'personal trainer Menteng',
    title: 'Personal Trainer in Menteng',
    description: 'Home private strength training and private yoga in Menteng, Central Jakarta. In-zone for core sessions.',
  },
  gondangdia: {
    keyword: 'personal trainer Gondangdia',
    title: 'Personal Trainer in Gondangdia',
    description: 'Private training at Gondangdia homes next to Menteng. In-zone Central Jakarta.',
  },
  thamrin: {
    keyword: 'personal trainer Thamrin',
    title: 'Personal Trainer in Thamrin',
    description: 'Home private strength training at Thamrin residences and serviced apartments. In-zone Central Jakarta after lobby access is confirmed.',
  },
  'kelapa-gading': {
    keyword: 'personal trainer Kelapa Gading',
    title: 'Personal Trainer in Kelapa Gading',
    description: 'Private training and yoga enquiries in Kelapa Gading, quoted after North Jakarta availability and travel checks.',
  },
  sunter: {
    keyword: 'personal trainer Sunter',
    title: 'Personal Trainer in Sunter',
    description: 'Home training enquiries in Sunter, North Jakarta, confirmed after a supply and travel check.',
  },
  pluit: {
    keyword: 'personal trainer Pluit',
    title: 'Personal Trainer in Pluit',
    description: 'Private wellness at Pluit homes, quoted after North Jakarta access and travel checks.',
  },
  pik: {
    keyword: 'personal trainer PIK',
    title: 'Personal Trainer in Pantai Indah Kapuk',
    description: 'Home training enquiries in PIK, North Jakarta. Travel and estate access are quoted. Not an in-zone South Jakarta rate.',
  },
  'puri-indah': {
    keyword: 'personal trainer Puri Indah',
    title: 'Personal Trainer in Puri Indah',
    description: 'Home training and private yoga enquiries in Puri Indah, West Jakarta, after availability and travel checks.',
  },
  'kebon-jeruk': {
    keyword: 'personal trainer Kebon Jeruk',
    title: 'Personal Trainer in Kebon Jeruk',
    description: 'Private training enquiries in Kebon Jeruk, West Jakarta. No in-zone rate is assumed.',
  },
  rawamangun: {
    keyword: 'personal trainer Rawamangun',
    title: 'Personal Trainer in Rawamangun',
    description: 'Home training and yoga enquiries in Rawamangun, East Jakarta, confirmed after a local supply check.',
  },
  pulomas: {
    keyword: 'personal trainer Pulomas',
    title: 'Personal Trainer in Pulomas',
    description: 'Private training enquiries in Pulomas, East Jakarta, quoted after availability and access checks.',
  },
}

function uniqueLinks(links: SeoLink[]) {
  const seen = new Set<string>()
  return links.filter((link) => {
    if (seen.has(link.to)) return false
    seen.add(link.to)
    return true
  })
}

function serviceRecords(): SeoRecord[] {
  return services.filter((service) => (CORE_SERVICE_SLUGS as readonly string[]).includes(service.slug)).map((service) => {
    const locked = serviceKeyword[service.slug]
    const siblings = services.filter((item) => (CORE_SERVICE_SLUGS as readonly string[]).includes(item.slug) && item.slug !== service.slug)
    const posts = blogPosts.filter((post) => post.landingPage.includes(service.slug) || post.service.toLowerCase() === service.title.toLowerCase()).slice(0, 3)
    const related: SeoLink[] = [
      ...siblings.map((item) => ({ to: '/' + item.slug, label: item.title })),
      ...service.cities.map((city) => ({ to: '/' + city.toLowerCase(), label: city + ' private sessions' })),
      ...posts.map((post) => ({ to: '/resources/' + post.slug, label: post.primaryQuery })),
      { to: '/pricing', label: 'Compare session prices' },
      { to: '/programmes', label: 'Plan my sessions' },
    ]
    return {
      path: '/' + service.slug,
      primaryKeyword: locked?.keyword || (service.title.toLowerCase() + ' at home'),
      title: locked?.title || service.title,
      description: locked?.description || (service.short + ' Private visits in Bali and Jakarta, quoted before you pay.'),
      group: 'page' as const,
      lastmod: TODAY,
      related: uniqueLinks(related).filter((link) => link.to !== '/' + service.slug).slice(0, 8),
      crumbs: [HOME, SERVICES, { to: '/' + service.slug, label: service.title }],
    }
  })
}

function cityServiceRecords(): SeoRecord[] {
  return (['bali', 'jakarta'] as const).flatMap((city) =>
    CITY_SERVICE_RELEASED.map((slug) => {
      const service = services.find((item) => item.slug === slug)
      const locked = serviceKeyword[slug]
      const label = city === 'bali' ? 'Bali' : 'Jakarta'
      const cityTitles: Record<string, string> = {
        'personal-training': city === 'bali' ? 'Private Personal Trainer in Bali' : 'Home Personal Trainer in Jakarta',
        'private-yoga': city === 'bali' ? 'Private Yoga at Your Villa in Bali' : 'Private Yoga at Home in Jakarta',
        'mat-pilates': 'Private Mat Pilates in ' + label,
        'boxing-fitness': 'Private Boxing Fitness in ' + label,
        'guided-meditation': 'Private Guided Meditation in ' + label,
      }
      const posts = blogPosts.filter((post) =>
        (post.landingPage === '/' + slug || post.service.toLowerCase() === (service?.title || '').toLowerCase()) &&
        (post.city === label || post.city.includes(label) || post.city.includes('Bali & Jakarta'))
      ).slice(0, 2)
      return {
        path: '/' + city + '/' + slug,
        primaryKeyword: (locked?.keyword || slug.replace(/-/g, ' ')) + ' ' + label,
        title: cityTitles[slug] || (service?.title || slug) + ' in ' + label,
        description: cityServiceDescription(slug, label, service?.prices[label]),
        group: 'page' as const,
        lastmod: TODAY,
        related: uniqueLinks([
          { to: '/' + slug, label: service?.title || slug },
          { to: '/' + city, label: 'Private fitness in ' + label },
          ...posts.map((post) => ({ to: '/resources/' + post.slug, label: post.primaryQuery })),
          ...CITY_SERVICE_RELEASED.filter((item) => item !== slug).slice(0, 3).map((item) => {
            const sibling = services.find((row) => row.slug === item)
            return { to: '/' + city + '/' + item, label: (sibling?.title || item) + ' in ' + label }
          }),
          { to: '/pricing', label: 'See session prices' },
          { to: '/contact', label: 'Check availability' },
        ]).slice(0, 8),
        crumbs: [HOME, { to: '/' + city, label }, { to: '/' + city + '/' + slug, label: service?.title || slug }],
      }
    }),
  )
}


function locationDescription(area: (typeof areas)[number]) {
  const local = (editorial as Record<string, string[]>)[area.slug]
  if (!local) throw new Error('Missing local content: ' + area.slug)
  const travel = area.travelQuote ? 'Availability and travel quoted.' : area.travelFee ? 'Travel ' + formatIdr(area.travelFee) + ' per visit.' : 'In-zone travel included.'
  return 'Private training, yoga and mat Pilates at your ' + area.name + ' ' + (area.city === 'Bali' ? 'villa or home. ' : 'home or apartment. ') + travel + ' View session options and request a quote.'
}

function areaRecords(): SeoRecord[] {
  return areas.map((area) => {
    const cityPath = '/' + area.city.toLowerCase()
    const locked = areaKeyword[area.slug]
    const parent = area.parent ? areas.find((item) => item.slug === area.parent) : undefined
    const siblings = parent
      ? [parent, ...areas.filter((item) => item.parent === parent.slug && item.slug !== area.slug)].slice(0, 4)
      : [...areas.filter((item) => item.parent === area.slug).slice(0, 3), ...areas.filter((item) => item.city === area.city && !item.parent && item.slug !== area.slug).slice(0, 2)]
    const related: SeoLink[] = [
      { to: cityPath, label: 'Private fitness in ' + area.city },
      ...CITY_SERVICE_RELEASED.filter((slug) => area.services.includes(slug)).slice(0, 5).map((slug) => {
        const service = services.find((item) => item.slug === slug)
        return { to: cityPath + '/' + slug, label: area.city + ' ' + (service?.title.toLowerCase() || slug) + ' details' }
      }),
      ...siblings.map((item) => ({ to: cityPath + '/' + item.slug, label: item.name })),
      { to: '/service-areas', label: 'All service areas' },
    ]
    return {
      path: cityPath + '/' + area.slug,
      primaryKeyword: locked?.keyword || ('personal trainer ' + area.name),
      title: locked?.title || ('Private Wellness in ' + area.name),
      description: locationDescription(area),
      group: 'page' as const,
      lastmod: TODAY,
      related: uniqueLinks(related).slice(0, 8),
      crumbs: [HOME, AREAS, { to: cityPath, label: area.city }, ...(parent ? [{to: cityPath + '/' + parent.slug, label: parent.name}] : []), { to: cityPath + '/' + area.slug, label: area.name }],
    }
  })
}

const GUIDE_TITLES: Record<string, string> = {
  '/resources/personal-trainer-jakarta-prices-studio-home-and-managed-service-costs': 'Personal Trainer Jakarta Prices: Studio vs Home',
  '/resources/free-introduction-vs-paid-first-session-what-personalfitness-id-offers': 'Free Intro vs Paid First Session',
  '/resources/mat-pilates-prices-why-mat-reformer-studio-and-home-sessions-differ': 'Mat Pilates Prices: Mat, Reformer, Home',
  '/resources/private-yoga-in-bali-one-to-one-couples-and-villa-groups-explained': 'Private Yoga in Bali: Solo, Couples, Groups',
  '/resources/two-three-or-four-weeks-choosing-a-fitness-programme-for-your-stay': '2, 3 or 4 Week Fitness Programme for Your Stay',
  '/resources/home-personal-training-in-jakarta-how-to-set-up-your-first-session': 'Home Private Strength Training Jakarta: First Session',
  '/resources/private-yoga-in-a-jakarta-apartment-space-access-and-pair-pricing': 'Private Yoga in a Jakarta Apartment',
  '/resources/personal-trainer-in-bali-what-a-managed-in-villa-session-includes': 'Personal Trainer in Bali: In-Villa Sessions',
  '/resources/personal-trainer-bali-prices-how-to-compare-quotes-like-for-like': 'Personal Trainer Bali Prices Compared',
  '/resources/personal-trainer-in-seminyak-petitenget-villas-and-in-zone-rates': 'Personal Trainer Seminyak & Petitenget Villas',
  '/resources/personal-trainer-in-ubud-travel-access-and-outer-zone-rates': 'Personal Trainer in Ubud: Travel & Rates',
  '/resources/private-yoga-prices-in-bali-duration-travel-and-group-size': 'Private Yoga Prices in Bali',
  '/resources/personal-trainer-in-canggu-villa-access-and-in-zone-rates': 'Personal Trainer in Canggu: Villa Sessions',
  '/resources/extra-people-and-pair-pricing-yoga-training-and-boxing': 'Pair & Group Pricing: Yoga, Training, Boxing',
  '/resources/mat-pilates-at-home-what-you-need-and-what-you-do-not': 'Mat Pilates at Home: What You Need',
  '/resources/guided-meditation-at-home-what-the-hour-is-and-is-not': 'Guided Meditation at Home: What to Expect',
  '/resources/private-yoga-or-mat-pilates-choosing-a-home-session': 'Private Yoga or Mat Pilates at Home?',
  '/resources/sixty-or-ninety-minutes-how-home-session-duration-is-quoted': '60 or 90 Minute Home Sessions: Pricing',
  '/resources/what-to-put-in-a-whatsapp-enquiry-for-a-home-trainer': 'How to Book a Home Trainer on WhatsApp',
  '/resources/private-boxing-fitness-at-home-what-pad-only-means': 'Private Boxing Fitness at Home',
  '/resources/mobility-coaching-at-home-what-it-is-and-is-not': 'Mobility Coaching at Home: What to Expect',
  '/resources/what-your-quote-contains': 'What Your Quote Contains | PersonalFitness.id',
  '/resources/train-in-a-bali-villa': 'How to Set Up a Villa for a Session',
  '/resources/programmes-versus-drop-in': '4-Week Block vs Drop-in Sessions',
}

function postRecords(): SeoRecord[] {
  const posts: SeoRecord[] = blogPosts.map((post) => {
    const landing = canonicalPath(post.landingPage)
    const cityPath = post.city.includes('Bali') && !post.city.includes('Jakarta') ? '/bali' : post.city.includes('Jakarta') && !post.city.includes('Bali') ? '/jakarta' : undefined
    const related: SeoLink[] = [
      { to: landing, label: post.service },
      ...(cityPath ? [{ to: cityPath, label: post.city + ' sessions' }] : []),
      { to: '/', label: 'Private fitness homepage' },
      { to: '/pricing', label: 'See prices' },
      ...blogPosts.filter((item) => item.slug !== post.slug && (item.service === post.service || item.city === post.city || item.service === 'Booking')).slice(0, 3).map((item) => ({ to: '/resources/' + item.slug, label: item.primaryQuery })),
    ]
    return {
      path: '/resources/' + post.slug,
      primaryKeyword: post.primaryQuery,
      title: GUIDE_TITLES['/resources/' + post.slug] || post.title,
      description: post.description,
      group: 'post' as const,
      lastmod: post.date,
      related: uniqueLinks(related).slice(0, 8),
      crumbs: [HOME, BLOG, { to: '/resources/' + post.slug, label: post.primaryQuery }],
    }
  })
  const notes: SeoRecord[] = resources.map((item) => ({
    path: '/resources/' + item.slug,
    primaryKeyword: item.title.toLowerCase(),
    title: GUIDE_TITLES['/resources/' + item.slug] || item.title,
    description: item.summary.length < 120 ? item.summary + ' Practical steps for a villa or home session in Bali or Jakarta, with a written quote before you pay.' : item.summary,
    group: 'post' as const,
    lastmod: TODAY,
    related: [
      { to: '/resources', label: 'All guides' },
      { to: '/', label: 'Homepage' },
      { to: '/contact', label: 'Use this in an enquiry' },
      { to: '/resources/what-to-put-in-a-whatsapp-enquiry-for-a-home-trainer', label: 'WhatsApp enquiry template' },
      { to: '/pricing', label: 'See session prices' },
    ],
    crumbs: [HOME, BLOG, { to: '/resources/' + item.slug, label: item.title }],
  }))
  return [...posts, ...notes]
}

const allRecords: SeoRecord[] = [...hubs, ...serviceRecords(), ...cityServiceRecords(), ...areaRecords(), ...postRecords()]
const byPath = new Map(allRecords.map((item) => [item.path, item]))

export function canonicalPath(pathname: string) {
  const clean = pathname.replace(/\/$/, '') || '/'
  const parts = clean.split('/').filter(Boolean)
  if (parts[0] === 'services' && parts[1]) return '/' + parts[1]
  if ((parts[0] === 'bali' || parts[0] === 'jakarta') && (parts[1] === 'mobility' || parts[1] === 'mobility-coaching')) return '/mobility-coaching'
  if (clean === '/blog') return '/resources'
  if (clean === '/locations') return '/service-areas'
  if (clean === '/professionals') return '/professional-standards'
  if (clean === '/wellness-plan' || clean === '/fitness-programmes') return '/programmes'
  return clean
}

export function getSeo(pathname: string) {
  return byPath.get(canonicalPath(pathname))
}

export function relatedFor(pathname: string) {
  const record = getSeo(pathname)
  if (!record) return []
  return record.related.filter((link) => canonicalPath(link.to) !== canonicalPath(pathname))
}

export function crumbsFor(pathname: string) {
  return getSeo(pathname)?.crumbs || [HOME]
}

export function indexableSeoRecords() {
  const held = new Set<string>(HELD_SERVICE_SLUGS)
  const core = new Set<string>(CORE_SERVICE_SLUGS)
  const cityReleased = new Set<string>(CITY_SERVICE_RELEASED)
  return allRecords.filter((item, index, list) => {
    if (list.findIndex((entry) => entry.path === item.path) !== index) return false
    const parts = item.path.split('/').filter(Boolean)
    if (item.path === '/reviews' || item.path === '/professionals' || item.path === '/wellness-plan') return false
    if (parts[0] === 'professionals') return false
    const serviceSlug = parts[0] === 'services' || parts[0] === 'bali' || parts[0] === 'jakarta' ? parts[1] : parts[0]
    if (serviceSlug && held.has(serviceSlug)) return false
    if (serviceSlug && services.some((entry) => entry.slug === serviceSlug) && !core.has(serviceSlug) && !held.has(serviceSlug)) return false
    if ((parts[0] === 'bali' || parts[0] === 'jakarta') && parts[1] && core.has(parts[1]) && !cityReleased.has(parts[1])) return false
    return true
  })
}

export const specialismSlugs = SPECIALISMS
