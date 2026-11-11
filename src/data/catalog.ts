import wellnessServiceData from './wellness-services.json'

export type City = 'Bali' | 'Jakarta'
export type ServiceStatus = 'core' | 'extension' | 'request' | 'partner' | 'held'

export type Service = {
  slug: string
  title: string
  short: string
  description: string
  durationMin: number
  includedParticipants: number
  maxParticipants: number
  status: ServiceStatus
  statusNote: string
  includes: string[]
  excludes: string[]
  goodFor: string[]
  prepare: string[]
  expect: string[]
  image: string
  imageAlt: string
  cities: City[]
  prices: Record<City, number | null>
  categoryId: string
  category: string
  categoryIds: string[]
  deliveryModes: string[]
  quoteOnly: boolean
  offers: WellnessOffer[]
}

export type WellnessOffer = {
  image?: string
  imageAlt?: string
  categoryId: string
  id: string
  slug: string
  name: string
  description: string
  requirement: string
  durationMin: number | null
  participants: number | null
  guidePrice: number | null
  quoteOnly: boolean
  deliveryMode: string
  priceUnit: string
  wave: number
}

export type Area = {
  slug: string
  name: string
  city: City
  cluster: string
  travelFee: number
  travelQuote?: boolean
  driveNote: string
  copy: string
  venues: string[]
  bestFor: string[]
  services: string[]
}

export type Programme = {
  slug: string
  title: string
  weeks: number
  sessions: number
  discount: number
  blurb: string
  includes: string[]
}

export const extraPersonFee: Record<City, number> = {
  Bali: 250_000,
  Jakarta: 275_000,
}

export const durationUplift = {
  60: 0,
  90: 0.45,
} as const

export const services = wellnessServiceData as Service[]

export const coreServices = services.filter((item) => item.status === 'core')
export const listedServices = services.filter((item) => item.status !== 'held')

export const programmes: Programme[] = [
  {
    slug: 'two-week',
    title: 'Two-week stay',
    weeks: 2,
    sessions: 6,
    discount: 0.05,
    blurb: 'Six private sessions across a fortnight. Built for villa stays and short Jakarta sprints.',
    includes: ['Six confirmed sessions in a 14-day window', 'Same professional where supply allows', 'One free reschedule if notice meets the quote terms'],
  },
  {
    slug: 'three-week',
    title: 'Three-week rhythm',
    weeks: 3,
    sessions: 9,
    discount: 0.08,
    blurb: 'Nine sessions for longer stays and people who want a visible three-week block.',
    includes: ['Nine sessions in 21 days', 'Written session outline after session two', 'Hold on a preferred morning or evening window'],
  },
  {
    slug: 'four-week',
    title: 'Four-week programme',
    weeks: 4,
    sessions: 12,
    discount: 0.12,
    blurb: 'Twelve sessions over a month. The usual choice for Jakarta residents and month-long Bali stays.',
    includes: ['Twelve sessions in 28 days', 'Mid-point check with the coordinator', 'Unused sessions follow the refund terms on your quote'],
  },
]

export const areas: Area[] = [
  {
    slug: 'canggu',
    name: 'Canggu',
    city: 'Bali',
    cluster: 'Canggu to Seminyak cluster',
    travelFee: 0,
    driveNote: 'In-zone. Travel is inside the published session price for core services.',
    copy: 'Canggu is the first Bali cluster we coordinate: villas, compounds and rented homes around Berawa, Batu Bolong, Pererenan and Echo Beach. Sessions run in private spaces with permission, not on packed beach clubs.',
    venues: ['Private villas', 'Rented homes with a clear indoor floor', 'Compound gym rooms', 'Shaded decks with neighbour-aware noise'],
    bestFor: ['Sunrise personal training', 'Couple yoga before the heat', 'Mat Pilates in a living room'],
    services: ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness', 'guided-meditation', 'swimming'],
  },
  {
    slug: 'seminyak',
    name: 'Seminyak',
    city: 'Bali',
    cluster: 'Canggu to Seminyak cluster',
    travelFee: 0,
    driveNote: 'In-zone. Travel is inside the published session price for core services.',
    copy: 'Seminyak and nearby Petitenget work for guests who want a private session without leaving the villa. Access, one-way streets and villa-staff rules are checked before we send a professional.',
    venues: ['Villa living rooms', 'Upper-floor suites with lift access', 'Private gardens with shade'],
    bestFor: ['Private yoga for two', 'Short-stay personal training', 'Evening mobility after dinner plans'],
    services: ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness', 'guided-meditation'],
  },
  {
    slug: 'ubud',
    name: 'Ubud',
    city: 'Bali',
    cluster: 'Outer Bali',
    travelFee: 150_000,
    driveNote: 'Outer-zone travel of Rp 150.000 is added once per visit, not per person.',
    copy: 'Ubud sessions are coordinated for villas and houses with a usable floor and realistic access. We do not sell “yoga in the jungle” as a product. The session happens in your space after a travel and timing check.',
    venues: ['Valley villas with a clear indoor room', 'Family compounds', 'Quiet guesthouse suites with owner permission'],
    bestFor: ['Private yoga', 'Mobility after long walks', 'Personal training for longer stays'],
    services: ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness', 'guided-meditation'],
  },
  {
    slug: 'sanur',
    name: 'Sanur',
    city: 'Bali',
    cluster: 'Outer Bali',
    travelFee: 150_000,
    driveNote: 'Outer-zone travel of Rp 150.000 is added once per visit.',
    copy: 'Sanur works for families and longer-stay guests who want a calmer shoreline base. Travel is quoted because it sits outside the Canggu to Seminyak cluster.',
    venues: ['Family villas', 'Apartment living rooms', 'Hotel suites only with written venue permission'],
    bestFor: ['Morning training before the heat', 'Mat Pilates with a partner'],
    services: ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness', 'guided-meditation'],
  },
  {
    slug: 'uluwatu',
    name: 'Uluwatu',
    city: 'Bali',
    cluster: 'Bukit',
    travelFee: 200_000,
    driveNote: 'Bukit travel of Rp 200.000 is added once per visit. Traffic windows are checked before confirmation.',
    copy: 'Uluwatu, Pecatu, Bingin and nearby Bukit addresses need a longer travel window. We only confirm when the professional can arrive, set up and leave inside a realistic block; not a clifftop photo promise.',
    venues: ['Clifftop villas with indoor floors', 'Private gym rooms', 'Pools with owner permission for swim enquiries'],
    bestFor: ['Stay-put villa training', 'Private yoga for two', 'Swim coaching where the pool is safe and permitted'],
    services: ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness', 'guided-meditation', 'swimming'],
  },
  {
    slug: 'south-jakarta',
    name: 'South Jakarta',
    city: 'Jakarta',
    cluster: 'South Jakarta cluster',
    travelFee: 0,
    driveNote: 'In-zone for Kebayoran, Senopati, SCBD, Kemang, Cilandak and nearby streets we can time.',
    copy: 'South Jakarta is the first Jakarta cluster: apartments, townhouses and houses where a professional can reach you inside a planned window. Building access, parking and lift rules go on the quote.',
    venues: ['Apartments with a clear living-room floor', 'Landed-house gyms', 'Townhouse courtyards that can take a mat'],
    bestFor: ['Before-office personal training', 'Lunch-hour Pilates', 'Weekly resident programmes'],
    services: ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness', 'guided-meditation'],
  },
  {
    slug: 'central-jakarta',
    name: 'Central Jakarta',
    city: 'Jakarta',
    cluster: 'Central Jakarta cluster',
    travelFee: 0,
    driveNote: 'In-zone for Menteng, Gondangdia, Thamrin and nearby buildings we can time.',
    copy: 'Central Jakarta sessions are built around building access. Lobby, parking and security names are collected before confirmation so the professional is not left downstairs.',
    venues: ['Serviced apartments', 'Family houses', 'Office-adjacent residences with written access'],
    bestFor: ['Early personal training', 'Private yoga at home', 'Three- and four-week resident blocks'],
    services: ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness', 'guided-meditation'],
  },
  {
    slug: 'north-jakarta', name: 'North Jakarta', city: 'Jakarta', cluster: 'North Jakarta · by request', travelFee: 0, travelQuote: true,
    driveNote: 'Professional availability and travel are quoted for your exact address.',
    copy: 'Request private wellness at homes and apartments around Kelapa Gading, Sunter, Pluit and other North Jakarta addresses. Your coordinator checks local professional availability, building permission and travel before confirming any visit.',
    venues: ['Apartments with visiting-professional permission', 'Private houses with a clear practice space', 'Hotel rooms and gyms with management approval'],
    bestFor: ['At-home yoga by request', 'A recurring household fitness enquiry', 'A private wellness schedule with realistic travel windows'],
    services: ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness', 'guided-meditation'],
  },
  {
    slug: 'west-jakarta', name: 'West Jakarta', city: 'Jakarta', cluster: 'West Jakarta · by request', travelFee: 0, travelQuote: true,
    driveNote: 'Availability, access and a written travel quote are required before booking.',
    copy: 'Plan a private training, yoga or Pilates enquiry for a home, apartment or approved hotel in West Jakarta. Puri Indah, Kebon Jeruk and nearby addresses are reviewed individually so your schedule is based on a professional who can reach the property.',
    venues: ['Landed homes with suitable indoor floors', 'Apartments with security and lift access agreed', 'Private gyms approved for an outside professional'],
    bestFor: ['A before-work fitness enquiry', 'Private yoga at home', 'A multi-week plan for residents'],
    services: ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness', 'guided-meditation'],
  },
  {
    slug: 'east-jakarta', name: 'East Jakarta', city: 'Jakarta', cluster: 'East Jakarta · by request', travelFee: 0, travelQuote: true,
    driveNote: 'The exact neighbourhood and time determine whether a visit and travel quote are available.',
    copy: 'Ask about a private wellness routine for your East Jakarta home or apartment. Rawamangun, Pulomas and surrounding addresses are considered after a local supply and access check. An enquiry does not imply guaranteed coverage across the municipality.',
    venues: ['Private family homes', 'Apartment living rooms with clear floor space', 'Approved residential fitness rooms'],
    bestFor: ['A resident yoga or training enquiry', 'A family wellness schedule', 'A regular time window near home'],
    services: ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness', 'guided-meditation'],
  },
]

export const cities: Record<City, {
  slug: string
  headline: string
  lede: string
  audience: string[]
  clusters: string[]
  notes: string[]
}> = {
  Bali: {
    slug: 'bali',
    headline: 'Private fitness in Bali, at your villa or home.',
    lede: 'A personal trainer, private yoga, mat Pilates, boxing fitness or guided meditation in Canggu and Seminyak first. Ubud, Sanur and Uluwatu are available with a travel fee and a realistic arrival window.',
    audience: ['Villa guests keeping a routine', 'Month-long residents', 'Couples and small groups', 'Hosts arranging sessions for guests'],
    clusters: ['Canggu to Seminyak in-zone', 'Ubud and Sanur + Rp 150.000', 'Uluwatu / Bukit + Rp 200.000'],
    notes: [
      'We do not claim island-wide coverage.',
      'Beach clubs, temples and public sand are not default venues.',
      'A villa enquiry is not a booking until supply, access and payment are confirmed.',
    ],
  },
  Jakarta: {
    slug: 'jakarta',
    headline: 'Home personal training in Jakarta.',
    lede: 'Private personal training, yoga, mat Pilates, boxing fitness and guided meditation at your apartment or house. South and Central Jakarta are in-zone. Other municipalities are quoted with travel.',
    audience: ['Professionals training before or after work', 'Beginners starting at home', 'Households sharing one coach', 'People who want a four-week block, not a one-off class'],
    clusters: ['South Jakarta in-zone', 'Central Jakarta in-zone', 'North, West, East and BSD quoted with travel'],
    notes: [
      'Building access is part of the quote, not an afterthought.',
      'We do not claim city-wide 24/7 coverage.',
      'Recurring programmes are prepaid against a written session count.',
    ],
  },
}

export function getService(slug: string) {
  const aliases: Record<string, string> = {"mobility-and-stretching": "mobility-coaching", "boxing-and-kickboxing": "boxing-fitness", "meditation-and-relaxation": "guided-meditation", "swimming-lessons": "swimming", "private-chef-and-meal-prep": "private-chef", "nutrition-consultations": "nutrition-consultation"}
  return services.find((item) => item.slug === (aliases[slug] || slug))
}

export function getArea(slug: string) {
  return areas.find((item) => item.slug === slug)
}

export function getProgramme(slug: string) {
  return programmes.find((item) => item.slug === slug)
}

export function cityAreas(city: City) {
  return areas.filter((item) => item.city === city)
}

export function servicePrice(slug: string, city: City) {
  return getService(slug)?.prices[city] ?? null
}

export const cancellationRules = [
  ['More than 24 hours', 'Reschedule once at no extra session fee, subject to supply.'],
  ['Inside 24 hours', 'The session is charged. We try to fill the window; we do not promise a replacement.'],
  ['Professional late or no-show', 'The session is not charged. A replacement window is offered.'],
  ['Unsafe space, weather or access failure', 'We stop the session, record the reason and re-quote or refund per the written terms.'],
  ['Programme unused sessions', 'Unused prepaid sessions follow the validity window on your quote, usually 14 days beyond the last booked week.'],
]
