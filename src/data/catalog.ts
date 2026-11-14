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
  parent?: string
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

const JAKARTA_LIVE = ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness', 'guided-meditation']

const jakartaPockets: Area[] = [
  {
    slug: 'kemang',
    name: 'Kemang',
    city: 'Jakarta',
    cluster: 'South Jakarta cluster',
    parent: 'south-jakarta',
    travelFee: 0,
    driveNote: 'In-zone South Jakarta. Travel is inside the published Jakarta session price.',
    copy: 'Kemang houses and low-rise compounds are a common South Jakarta setup: parking, a dog, and a living-room rectangle. Name the street, not “Kemang-ish”. The hour runs at your home after access is on the quote.',
    venues: ['Landed houses with a clear indoor floor', 'Townhouse living rooms', 'Private courtyards that can take a mat'],
    bestFor: ['Weekend personal training', 'Private yoga for two', 'A four-week resident block'],
    services: JAKARTA_LIVE,
  },
  {
    slug: 'senopati',
    name: 'Senopati',
    city: 'Jakarta',
    cluster: 'South Jakarta cluster',
    parent: 'south-jakarta',
    travelFee: 0,
    driveNote: 'In-zone South Jakarta. Building access still goes on the quote.',
    copy: 'Senopati towers often lose the hour in the lobby: guest QR, lift waits, and a front desk that has not been told a coach is coming. Put the building and tower on the first message. The published Jakarta rate applies when we can time the visit.',
    venues: ['Apartment living rooms', 'Serviced residences with written visitor access', 'Private rooms with a door that can close'],
    bestFor: ['Before-office personal training', 'Lunch-hour mobility', 'Private yoga after work'],
    services: JAKARTA_LIVE,
  },
  {
    slug: 'scbd',
    name: 'SCBD',
    city: 'Jakarta',
    cluster: 'South Jakarta cluster',
    parent: 'south-jakarta',
    travelFee: 0,
    driveNote: 'In-zone South Jakarta. Weekday morning crush still needs a two-hour window.',
    copy: 'SCBD residences sit inside the published Jakarta rate when we can time the visit. A 06:30 weekday is a lift and a security script, not a studio class. Name the tower. A rooftop gym is only useful if it is private and permitted.',
    venues: ['Residential towers with visitor process', 'Serviced apartments', 'Private indoor rectangles, not lobby gyms'],
    bestFor: ['Weekday personal training', 'Pad-only boxing after a neighbour check', 'A standing resident programme'],
    services: JAKARTA_LIVE,
  },
  {
    slug: 'kebayoran',
    name: 'Kebayoran',
    city: 'Jakarta',
    cluster: 'South Jakarta cluster',
    parent: 'south-jakarta',
    travelFee: 0,
    driveNote: 'In-zone South Jakarta for Kebayoran Baru and nearby streets we can time.',
    copy: 'Kebayoran houses and apartments are in-zone South Jakarta. Family homes with a living-room rectangle are easier than a shared building gym. Say Kebayoran Baru or Kebayoran Lama. “South Jakarta somewhere” is not an area.',
    venues: ['Family houses', 'Apartment living rooms', 'Private garden shade only if neighbours allow'],
    bestFor: ['Morning personal training', 'Mat Pilates at home', 'Guided meditation in a quiet room'],
    services: JAKARTA_LIVE,
  },
  {
    slug: 'cilandak',
    name: 'Cilandak',
    city: 'Jakarta',
    cluster: 'South Jakarta cluster',
    parent: 'south-jakarta',
    travelFee: 0,
    driveNote: 'In-zone South Jakarta. Traffic windows still belong on the quote.',
    copy: 'Cilandak landed houses and compounds sit inside the published Jakarta rate when we can time the visit. A helper in the kitchen is fine if you say so. A child watching still needs a parent in the room. The hour is one session, not a family circuit class.',
    venues: ['Landed-house living rooms', 'Compound gym rooms with permission', 'Clear indoor tile or wood'],
    bestFor: ['Resident personal training', 'Private yoga for two', 'A three- or four-week block'],
    services: JAKARTA_LIVE,
  },
  {
    slug: 'pondok-indah',
    name: 'Pondok Indah',
    city: 'Jakarta',
    cluster: 'South Jakarta cluster',
    parent: 'south-jakarta',
    travelFee: 0,
    driveNote: 'In-zone South Jakarta, next to the Cilandak cluster we already time.',
    copy: 'Pondok Indah houses and apartments are quoted as in-zone South Jakarta when the address sits in this pocket. Estate security, a side gate and a usable indoor floor go on the first message. A tennis court or club gym is not the default venue.',
    venues: ['Estate houses with a clear indoor room', 'Apartment living rooms', 'Private gym rooms already in the house'],
    bestFor: ['Morning personal training', 'Private yoga', 'Weekly resident programmes'],
    services: JAKARTA_LIVE,
  },
  {
    slug: 'kuningan',
    name: 'Kuningan',
    city: 'Jakarta',
    cluster: 'South Jakarta cluster',
    parent: 'south-jakarta',
    travelFee: 0,
    driveNote: 'In-zone South Jakarta with SCBD and Setiabudi streets we can time.',
    copy: 'Kuningan residences sit in the same in-zone South Jakarta cluster as SCBD. Towers, serviced apartments and a weekday security desk are the product. Name the building. A shared office gym is not a private hour.',
    venues: ['Residential towers', 'Serviced apartments', 'A living-room rectangle with a closing door'],
    bestFor: ['Before-office training', 'Evening private yoga', 'Pad-only boxing after a noise check'],
    services: JAKARTA_LIVE,
  },
  {
    slug: 'menteng',
    name: 'Menteng',
    city: 'Jakarta',
    cluster: 'Central Jakarta cluster',
    parent: 'central-jakarta',
    travelFee: 0,
    driveNote: 'In-zone Central Jakarta. Access still goes on the quote.',
    copy: 'Menteng houses and apartments are in-zone Central Jakarta. One-way streets, a parked car and a house helper at the gate matter more than a pin. The published Jakarta rate applies when we can time the visit. The Denpasar office is not a Jakarta studio.',
    venues: ['Family houses', 'Apartment living rooms', 'Serviced residences with written access'],
    bestFor: ['Early personal training', 'Private yoga at home', 'A four-week resident block'],
    services: JAKARTA_LIVE,
  },
  {
    slug: 'gondangdia',
    name: 'Gondangdia',
    city: 'Jakarta',
    cluster: 'Central Jakarta cluster',
    parent: 'central-jakarta',
    travelFee: 0,
    driveNote: 'In-zone Central Jakarta, next to Menteng streets we already time.',
    copy: 'Gondangdia sits inside Central Jakarta in-zone. Compact houses and older apartments need a named entrance. Tell us if parking is on-street. The hour still needs a clear indoor rectangle, not a corridor.',
    venues: ['Compact family houses', 'Older apartment living rooms', 'Private indoor floors with permission'],
    bestFor: ['Personal training at home', 'Mat Pilates', 'Guided meditation in a quiet room'],
    services: JAKARTA_LIVE,
  },
  {
    slug: 'thamrin',
    name: 'Thamrin',
    city: 'Jakarta',
    cluster: 'Central Jakarta cluster',
    parent: 'central-jakarta',
    travelFee: 0,
    driveNote: 'In-zone Central Jakarta. Lobby names still belong on the quote.',
    copy: 'Thamrin residences and serviced apartments are a building-access product. Put the tower, parking and visitor process in the first WhatsApp. A 06:30 weekday window is a different object from a Sunday house visit in Menteng.',
    venues: ['Serviced apartments', 'Residential towers', 'Office-adjacent homes with written access'],
    bestFor: ['Weekday personal training', 'Lunch-hour mobility', 'Private yoga after work'],
    services: JAKARTA_LIVE,
  },
  {
    slug: 'kelapa-gading',
    name: 'Kelapa Gading',
    city: 'Jakarta',
    cluster: 'North Jakarta · by request',
    parent: 'north-jakarta',
    travelFee: 0,
    travelQuote: true,
    driveNote: 'North Jakarta by request. Availability and travel are quoted for the exact address.',
    copy: 'Kelapa Gading apartments and houses are a North Jakarta timing check, not an in-zone rate. We either add travel, find a professional who can reach you, or decline. An enquiry does not mean we cover the whole neighbourhood.',
    venues: ['Apartments with visiting-professional permission', 'Landed houses with a clear floor', 'Hotel rooms only with management approval'],
    bestFor: ['A resident training enquiry', 'Private yoga by request', 'A recurring household window if supply exists'],
    services: JAKARTA_LIVE,
  },
  {
    slug: 'sunter',
    name: 'Sunter',
    city: 'Jakarta',
    cluster: 'North Jakarta · by request',
    parent: 'north-jakarta',
    travelFee: 0,
    travelQuote: true,
    driveNote: 'North Jakarta by request. The written quote is the only coverage claim.',
    copy: 'Sunter homes are quoted after a local supply and access check. Do not assume the South Jakarta rate. Send the exact area, the session and two windows. We will add travel, confirm, or decline.',
    venues: ['Private houses', 'Apartments with a visitor process', 'Indoor rectangles that can hold a mat'],
    bestFor: ['A home training enquiry', 'A family yoga request', 'A realistic evening window'],
    services: JAKARTA_LIVE,
  },
  {
    slug: 'pluit',
    name: 'Pluit',
    city: 'Jakarta',
    cluster: 'North Jakarta · by request',
    parent: 'north-jakarta',
    travelFee: 0,
    travelQuote: true,
    driveNote: 'North Jakarta by request. Travel is not assumed as zero.',
    copy: 'Pluit and nearby North Jakarta streets wait on supply. Flood-prone access, parking and building rules belong on the first message. The published in-zone Jakarta rate does not automatically apply here.',
    venues: ['Houses with a usable indoor floor', 'Apartments with security access agreed', 'Private rooms, not public promenades'],
    bestFor: ['A private training enquiry', 'Yoga at home if the room is quiet', 'A quoted travel window'],
    services: JAKARTA_LIVE,
  },
  {
    slug: 'pik',
    name: 'Pantai Indah Kapuk',
    city: 'Jakarta',
    cluster: 'North Jakarta · by request',
    parent: 'north-jakarta',
    travelFee: 0,
    travelQuote: true,
    driveNote: 'North Jakarta by request. PIK is not an in-zone South Jakarta rate.',
    copy: 'Pantai Indah Kapuk is a North Jakarta timing-and-travel check. Estate gates, weekend traffic and a long unload are why we quote instead of publishing a zero-travel line. Send the cluster inside PIK, not only “PIK”.',
    venues: ['Estate houses with indoor floors', 'Apartments with visitor permission', 'Private gym rooms already in the house'],
    bestFor: ['A weekend training enquiry', 'Private yoga for two if supply exists', 'A written travel quote before you plan a block'],
    services: JAKARTA_LIVE,
  },
  {
    slug: 'puri-indah',
    name: 'Puri Indah',
    city: 'Jakarta',
    cluster: 'West Jakarta · by request',
    parent: 'west-jakarta',
    travelFee: 0,
    travelQuote: true,
    driveNote: 'West Jakarta by request. Availability, access and travel are quoted.',
    copy: 'Puri Indah homes are reviewed individually. We do not publish a West Jakarta in-zone rate. Landed houses with a clear indoor floor are easier than a tower with no visitor process. Wait for the written quote.',
    venues: ['Landed homes with suitable indoor floors', 'Apartments with lift and security agreed', 'Private gyms approved for an outside professional'],
    bestFor: ['A before-work fitness enquiry', 'Private yoga at home', 'A multi-week plan if a professional can reach you'],
    services: JAKARTA_LIVE,
  },
  {
    slug: 'kebon-jeruk',
    name: 'Kebon Jeruk',
    city: 'Jakarta',
    cluster: 'West Jakarta · by request',
    parent: 'west-jakarta',
    travelFee: 0,
    travelQuote: true,
    driveNote: 'West Jakarta by request. No in-zone or zero-travel price is assumed.',
    copy: 'Kebon Jeruk addresses are a supply check. Name the neighbourhood and a realistic morning or evening window. We will not pretend a West Jakarta pin is South Jakarta in-zone.',
    venues: ['Family houses', 'Apartment living rooms', 'Approved residential fitness rooms'],
    bestFor: ['A resident training enquiry', 'Mat Pilates at home', 'A quoted travel visit'],
    services: JAKARTA_LIVE,
  },
  {
    slug: 'rawamangun',
    name: 'Rawamangun',
    city: 'Jakarta',
    cluster: 'East Jakarta · by request',
    parent: 'east-jakarta',
    travelFee: 0,
    travelQuote: true,
    driveNote: 'East Jakarta by request. The neighbourhood and time decide whether a visit exists.',
    copy: 'Rawamangun is considered after a local supply and access check. Coverage is not implied across East Jakarta. Family homes with a clear floor are the usual setup. Wait for the quote before assuming a weekly slot.',
    venues: ['Private family homes', 'Apartment living rooms with clear floor space', 'Indoor rooms that can close a door'],
    bestFor: ['A resident yoga or training enquiry', 'A family wellness schedule', 'A regular time window near home if supply exists'],
    services: JAKARTA_LIVE,
  },
  {
    slug: 'pulomas',
    name: 'Pulomas',
    city: 'Jakarta',
    cluster: 'East Jakarta · by request',
    parent: 'east-jakarta',
    travelFee: 0,
    travelQuote: true,
    driveNote: 'East Jakarta by request. An enquiry is not guaranteed coverage.',
    copy: 'Pulomas and surrounding East Jakarta addresses follow the same timing check as Rawamangun. Send two windows. We add travel, confirm, or decline. The South Jakarta starting price is not this page’s rate.',
    venues: ['Family houses', 'Apartment living rooms', 'Approved residential fitness rooms'],
    bestFor: ['A home training enquiry', 'Private yoga by request', 'A written quote before a programme'],
    services: JAKARTA_LIVE,
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
    bestFor: ['Stay-put villa training', 'Private yoga for two', 'Pad-only boxing after a space check'],
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
  ...jakartaPockets,
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
    headline: 'Personal trainer in Bali, at your villa or home.',
    lede: 'Personal training, private yoga, mat Pilates, mobility coaching, boxing fitness and guided meditation in Canggu and Seminyak first. Ubud, Sanur and Uluwatu are available with a travel fee and a realistic arrival window.',
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
    headline: 'Home personal trainer in Jakarta.',
    lede: 'Private personal training, yoga, mat Pilates, mobility coaching, boxing fitness and guided meditation at your apartment or house. South Jakarta pockets such as Kemang, Senopati, SCBD, Kebayoran, Cilandak, Pondok Indah and Kuningan, plus Central Jakarta pockets such as Menteng, Gondangdia and Thamrin, sit inside the published rate. North, West and East neighbourhoods are quoted with travel.',
    audience: ['Professionals training before or after work', 'Beginners starting at home', 'Households sharing one coach', 'People who want a four-week block, not a one-off class'],
    clusters: ['South Jakarta in-zone, including Kemang, Senopati, SCBD, Kebayoran, Cilandak, Pondok Indah and Kuningan', 'Central Jakarta in-zone, including Menteng, Gondangdia and Thamrin', 'North, West, East and BSD quoted with travel'],
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

export function quoteAreas(city: City) {
  return areas.filter((item) => item.city === city && !item.parent)
}

export function areaPockets(parentSlug: string) {
  return areas.filter((item) => item.parent === parentSlug)
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
