import { areas, services, type City } from './catalog'
import { blogPosts } from './blog'
import { resources } from './content'
import { CITY_SERVICE_RELEASED, CORE_SERVICE_SLUGS, HELD_SERVICE_SLUGS } from './publicOffer'
import { formatIdr } from '@/lib/money'

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

const TODAY = '2026-11-12'

function cityServiceDescription(slug: string, city: City, price: number | null | undefined) {
  const start = price ? ' from ' + formatIdr(price) : ''
  const place = city === 'Bali' ? 'villa or home' : 'home or apartment'
  if (slug === 'personal-training') return `Personal trainer at your ${place} in ${city}${start} for 60 minutes in published clusters. Written quote before payment.`
  if (slug === 'private-yoga') return `Private yoga at your ${place} in ${city}${start}, for one or two people. Written quote before payment.`
  if (slug === 'mat-pilates') return `Private mat Pilates at your ${place} in ${city}${start}. No reformer. Written quote before payment.`
  if (slug === 'boxing-fitness') return `Pad-only boxing fitness at your ${place} in ${city}${start}. No sparring. Space check first, then a written quote.`
  if (slug === 'guided-meditation') return `Private guided meditation at your ${place} in ${city}${start} for one or two people. Not therapy.`
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
    title: 'Personal Trainer at Home in Bali and Jakarta',
    description: 'Personal trainer at your villa or home in Bali from Rp 900.000 and Jakarta from Rp 950.000. Private yoga, mat Pilates, boxing fitness and guided meditation. Written quote before payment.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/personal-training', label: 'Personal training at home' },
      { to: '/private-yoga', label: 'Private yoga at your villa' },
      { to: '/mat-pilates', label: 'Mat Pilates at home' },
      { to: '/boxing-fitness', label: 'Boxing fitness at home' },
      { to: '/guided-meditation', label: 'Guided meditation at home' },
      { to: '/bali', label: 'Private fitness in Bali' },
      { to: '/jakarta', label: 'Home personal training in Jakarta' },
      { to: '/resources', label: 'Private fitness guides' },
    ],
    crumbs: [HOME],
  },
  {
    path: '/services',
    primaryKeyword: 'private wellness services at home',
    title: 'Private Fitness Sessions at Home',
    description: 'Personal training, private yoga, mat Pilates, mobility, boxing fitness and guided meditation at your villa or home in Bali and Jakarta, quoted before you pay.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/personal-training', label: 'Personal training' },
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
    title: 'Personal Trainer in Bali, Villa and Home Sessions',
    description: 'In-villa personal training from Rp 900.000 in Canggu and Seminyak. Private yoga, Pilates, boxing and meditation at your villa. Ubud, Sanur and Uluwatu with published travel. Written quote before you pay.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/bali/personal-training', label: 'Personal training in Bali' },
      { to: '/bali/private-yoga', label: 'Private yoga in Bali' },
      { to: '/bali/mat-pilates', label: 'Mat Pilates in Bali' },
      { to: '/bali/boxing-fitness', label: 'Boxing fitness in Bali' },
      { to: '/bali/guided-meditation', label: 'Guided meditation in Bali' },
      { to: '/resources/personal-trainer-in-bali-what-a-managed-in-villa-session-includes', label: 'What a Bali villa session includes' },
      { to: '/jakarta', label: 'Home training in Jakarta' },
    ],
    crumbs: [HOME, AREAS, { to: '/bali', label: 'Bali' }],
  },
  {
    path: '/jakarta',
    primaryKeyword: 'home personal training Jakarta',
    title: 'Home Personal Trainer Jakarta, Apartment and House',
    description: 'Private personal training from Rp 950.000 in South and Central Jakarta. Yoga, Pilates, boxing and meditation at home. Building access on the quote; North, West and East by request.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/jakarta/personal-training', label: 'Personal training in Jakarta' },
      { to: '/jakarta/private-yoga', label: 'Private yoga in Jakarta' },
      { to: '/jakarta/mat-pilates', label: 'Mat Pilates in Jakarta' },
      { to: '/jakarta/boxing-fitness', label: 'Boxing fitness in Jakarta' },
      { to: '/jakarta/guided-meditation', label: 'Guided meditation in Jakarta' },
      { to: '/resources/home-personal-training-in-jakarta-how-to-set-up-your-first-session', label: 'Set up a Jakarta home session' },
      { to: '/bali', label: 'Private fitness in Bali' },
    ],
    crumbs: [HOME, AREAS, { to: '/jakarta', label: 'Jakarta' }],
  },
  {
    path: '/service-areas',
    primaryKeyword: 'private fitness service areas Bali Jakarta',
    title: 'Service Areas in Bali and Jakarta',
    description: 'Canggu, Seminyak, Ubud, Sanur, Uluwatu, South and Central Jakarta, plus by-request clusters. Travel rules stay on the quote.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/bali', label: 'Bali private fitness' },
      { to: '/jakarta', label: 'Jakarta home training' },
      { to: '/pricing', label: 'Session prices' },
      { to: '/contact', label: 'Check availability' },
    ],
    crumbs: [HOME, AREAS],
  },
  {
    path: '/pricing',
    primaryKeyword: 'personal trainer Bali prices',
    title: 'Personal Trainer Bali and Jakarta Prices',
    description: 'Published 60-minute starting prices: personal training Bali Rp 900.000 and Jakarta Rp 950.000, plus yoga, Pilates, mobility, boxing and meditation. Extra people, travel and programmes on the quote.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/personal-training', label: 'Personal training rates' },
      { to: '/boxing-fitness', label: 'Boxing fitness rates' },
      { to: '/guided-meditation', label: 'Guided meditation rates' },
      { to: '/resources/personal-trainer-bali-prices-how-to-compare-quotes-like-for-like', label: 'Compare Bali trainer quotes' },
      { to: '/resources/personal-trainer-jakarta-prices-studio-home-and-managed-service-costs', label: 'Jakarta home vs studio prices' },
      { to: '/programmes', label: '6, 9 and 12 session programmes' },
    ],
    crumbs: [HOME, { to: '/pricing', label: 'Pricing' }],
  },
  {
    path: '/programmes',
    primaryKeyword: 'two three four week fitness programme',
    title: '2, 3 and 4 Week Fitness Programmes',
    description: 'Prepaid 6, 9 and 12 session blocks for Bali stays and Jakarta residents, with published 5, 8 and 12 percent reductions.',
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
    primaryKeyword: 'how private home fitness works',
    title: 'How Private Home Fitness Works',
    description: 'Enquiry, match, written quote, payment and the session at your home or villa. Availability is confirmed before you pay.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/contact', label: 'Check availability' },
      { to: '/pricing', label: 'See session prices' },
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
    title: 'Personal Trainer Bali and Jakarta Guides',
    description: 'Guides to in-villa personal training, Jakarta home sessions, private yoga, boxing fitness, guided meditation, prices and programmes.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/resources/personal-trainer-in-bali-what-a-managed-in-villa-session-includes', label: 'Personal trainer in Bali' },
      { to: '/resources/home-personal-training-in-jakarta-how-to-set-up-your-first-session', label: 'Home training in Jakarta' },
      { to: '/resources/private-boxing-fitness-at-home-what-pad-only-means', label: 'Boxing fitness at home' },
      { to: '/resources/guided-meditation-at-home-what-the-hour-is-and-is-not', label: 'Guided meditation at home' },
      { to: '/pricing', label: 'Published prices' },
      { to: '/', label: 'Private fitness homepage' },
    ],
    crumbs: [HOME, BLOG],
  },
  {
    path: '/contact',
    primaryKeyword: 'book personal trainer Bali WhatsApp',
    title: 'Book via WhatsApp, Personal Trainer Bali and Jakarta',
    description: 'Message WhatsApp +62 811-3803-488 or email hallo@personalfitness.id with city, area, service and a two-hour window. Written quote before payment. Denpasar office is administration only.',
    group: 'page', lastmod: TODAY,
    related: [
      { to: '/pricing', label: 'See prices first' },
      { to: '/how-it-works', label: 'How booking works' },
      { to: '/faq', label: 'Common questions' },
    ],
    crumbs: [HOME, { to: '/contact', label: 'Contact' }],
  },
  {
    path: '/about',
    primaryKeyword: 'PersonalFitness.id private fitness company',
    title: 'About PersonalFitness.id',
    description: 'A company-managed mobile fitness and wellness service for homes and villas in Bali and Jakarta, not a public coach marketplace.',
    group: 'page', lastmod: TODAY,
    related: [{ to: '/professional-standards', label: 'Standards' }, { to: '/contact', label: 'Contact' }, { to: '/villa-hotel-partners', label: 'Villa partners' }],
    crumbs: [HOME, { to: '/about', label: 'About' }],
  },
  {
    path: '/faq',
    primaryKeyword: 'personal trainer Bali FAQ',
    title: 'Personal Trainer Bali and Jakarta FAQ',
    description: 'Prices, Canggu and Seminyak plus South and Central Jakarta coverage, choosing a trainer, cancellation, payment and what we do not book. No physio. No marketplace directory.',
    group: 'page', lastmod: TODAY,
    related: [{ to: '/pricing', label: 'Prices' }, { to: '/refunds-rescheduling', label: 'Refunds' }, { to: '/contact', label: 'Ask a coordinator' }],
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
    title: 'Villa and Hotel Wellness Partnerships',
    description: 'Private yoga, personal training, boxing fitness and guided meditation schedules for villa managers, hotels and retreats in Bali and Jakarta.',
    group: 'page', lastmod: TODAY,
    related: [{ to: '/private-yoga', label: 'Private yoga' }, { to: '/personal-training', label: 'Personal training' }, { to: '/boxing-fitness', label: 'Boxing fitness' }, { to: '/guided-meditation', label: 'Guided meditation' }, { to: '/contact', label: 'Partner enquiry' }],
    crumbs: [HOME, { to: '/villa-hotel-partners', label: 'Partners' }],
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
    description: '24-hour rule, professional no-show, unused programme sessions and payment routes.',
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
    description: 'How PersonalFitness.id pages are written, reviewed and corrected.',
    group: 'page', lastmod: TODAY, related: [{ to: '/resources', label: 'Blog' }],
    crumbs: [HOME, { to: '/editorial-policy', label: 'Editorial policy' }],
  },
]

const serviceKeyword: Record<string, { keyword: string; title: string; description: string }> = {
  'personal-training': {
    keyword: 'personal trainer at home',
    title: 'Personal Trainer at Home, Bali and Jakarta',
    description: 'Private 60-minute personal training at your villa or home. From Rp 900.000 in Bali and Rp 950.000 in Jakarta in published clusters. Written quote, then payment.',
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
    title: 'Private Boxing Fitness at Home',
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
    description: 'A quiet 60-minute guided sit for one or two people from Rp 800.000 in Bali and Rp 850.000 in Jakarta. Not therapy.',
  },
}

const areaKeyword: Record<string, { keyword: string; title: string; description: string }> = {
  canggu: {
    keyword: 'personal trainer Canggu',
    title: 'Personal Trainer in Canggu',
    description: 'In-villa personal training, private yoga, boxing fitness and mat Pilates in Canggu, Berawa, Pererenan and Echo Beach. In-zone travel included.',
  },
  seminyak: {
    keyword: 'private yoga Seminyak',
    title: 'Private Yoga and Training in Seminyak',
    description: 'Private yoga, personal training, boxing fitness and mat Pilates at Seminyak and Petitenget villas. In-zone for core sessions.',
  },
  ubud: {
    keyword: 'private yoga Ubud',
    title: 'Private Yoga and Training in Ubud',
    description: 'Private yoga, mobility and personal training at Ubud villas and houses, with Rp 150.000 travel per visit.',
  },
  sanur: {
    keyword: 'personal trainer Sanur',
    title: 'Personal Trainer in Sanur',
    description: 'Private training, yoga and mat Pilates for Sanur family villas and apartments, with outer-zone travel quoted.',
  },
  uluwatu: {
    keyword: 'personal trainer Uluwatu',
    title: 'Personal Trainer in Uluwatu',
    description: 'In-villa personal training, private yoga, boxing fitness and mat Pilates in Uluwatu, Pecatu and Bingin, with Rp 200.000 Bukit travel.',
  },
  'south-jakarta': {
    keyword: 'personal trainer South Jakarta',
    title: 'Personal Trainer in South Jakarta',
    description: 'Home personal training, yoga, boxing fitness and mat Pilates in Kebayoran, Senopati, Kemang and Cilandak. In-zone for core sessions.',
  },
  'central-jakarta': {
    keyword: 'home personal training Menteng',
    title: 'Home Personal Training in Central Jakarta',
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
    const posts = blogPosts.filter((post) => post.landingPage.includes(service.slug) || post.service.toLowerCase().includes(service.title.split(' ')[0].toLowerCase())).slice(0, 2)
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
      return {
        path: '/' + city + '/' + slug,
        primaryKeyword: (locked?.keyword || slug.replace(/-/g, ' ')) + ' ' + label,
        title: (locked?.title || service?.title || slug) + ' in ' + label,
        description: cityServiceDescription(slug, label, service?.prices[label]),
        group: 'page' as const,
        lastmod: TODAY,
        related: uniqueLinks([
          { to: '/' + slug, label: service?.title || slug },
          { to: '/' + city, label: 'Private fitness in ' + label },
          ...CITY_SERVICE_RELEASED.filter((item) => item !== slug).slice(0, 4).map((item) => {
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

function areaRecords(): SeoRecord[] {
  return areas.map((area) => {
    const cityPath = '/' + area.city.toLowerCase()
    const locked = areaKeyword[area.slug]
    const siblings = areas.filter((item) => item.city === area.city && item.slug !== area.slug).slice(0, 3)
    const related: SeoLink[] = [
      { to: cityPath, label: 'Private fitness in ' + area.city },
      ...CITY_SERVICE_RELEASED.filter((slug) => area.services.includes(slug)).slice(0, 5).map((slug) => {
        const service = services.find((item) => item.slug === slug)
        return { to: cityPath + '/' + slug, label: (service?.title || slug) + ' in ' + area.name }
      }),
      ...siblings.map((item) => ({ to: cityPath + '/' + item.slug, label: item.name })),
      { to: '/service-areas', label: 'All service areas' },
    ]
    return {
      path: cityPath + '/' + area.slug,
      primaryKeyword: locked?.keyword || ('personal trainer ' + area.name),
      title: locked?.title || ('Private Wellness in ' + area.name),
      description: locked?.description || area.copy,
      group: 'page' as const,
      lastmod: TODAY,
      related: uniqueLinks(related).slice(0, 8),
      crumbs: [HOME, AREAS, { to: cityPath, label: area.city }, { to: cityPath + '/' + area.slug, label: area.name }],
    }
  })
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
      ...blogPosts.filter((item) => item.slug !== post.slug && (item.service === post.service || item.city === post.city)).slice(0, 2).map((item) => ({ to: '/resources/' + item.slug, label: item.primaryQuery })),
    ]
    return {
      path: '/resources/' + post.slug,
      primaryKeyword: post.primaryQuery,
      title: post.title,
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
    title: item.title,
    description: item.summary,
    group: 'post' as const,
    lastmod: TODAY,
    related: [
      { to: '/resources', label: 'All guides' },
      { to: '/', label: 'Homepage' },
      { to: '/contact', label: 'Use this in an enquiry' },
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
    if ((parts[0] === 'bali' || parts[0] === 'jakarta') && parts[1] && areas.some((area) => area.slug === parts[1])) return false
    if ((parts[0] === 'bali' || parts[0] === 'jakarta') && parts[1] && core.has(parts[1]) && !cityReleased.has(parts[1])) return false
    return true
  })
}

export const specialismSlugs = SPECIALISMS
