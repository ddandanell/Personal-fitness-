export type City = 'Bali' | 'Jakarta'
export type ServiceStatus = 'core' | 'extension' | 'request' | 'partner' | 'held'

export type Service = {
  slug: string
  title: string
  short: string
  description: string
  durationMin: 45 | 60
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
}

export type Area = {
  slug: string
  name: string
  city: City
  cluster: string
  travelFee: number
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

export const services: Service[] = [
  {
    slug: 'personal-training',
    title: 'Personal training',
    short: 'Private strength and fitness training in your villa, home or another suitable space.',
    description: 'A 60-minute one-to-one session built around general strength, conditioning or keeping a routine while you travel or work. The professional, setting, equipment and price are confirmed before you pay.',
    durationMin: 60,
    includedParticipants: 1,
    maxParticipants: 4,
    status: 'core',
    statusNote: 'Core session. Quoted before confirmation.',
    includes: [
      '60-minute private session at your approved location',
      'A professional matched to your goal, experience and language',
      'Session plan, arrival window and preparation notes',
      'Simple kit check: mats, bands or dumbbells if already on site',
      'In-zone travel for Canggu–Seminyak or South/Central Jakarta',
    ],
    excludes: [
      'Clinical rehabilitation, physiotherapy or pain treatment',
      'Gym memberships, studio drop-in classes or reformer machines',
      'Outer-zone travel, parking, villa staff fees or venue hire',
      'Nutrition plans or supplement programmes',
    ],
    goodFor: [
      'Visitors who want to keep training without hunting for a gym',
      'Jakarta professionals who prefer a private session at home',
      'Beginners and people returning to general fitness',
      'Couples or small groups who want the same coach, quoted as extra people',
    ],
    prepare: [
      'Share your area, venue type and a preferred 2-hour window',
      'Tell us what kit is already in the space',
      'Wear training clothes and have water ready',
      'Confirm access, parking and any villa or building rules',
    ],
    expect: [
      'A short arrival and space check',
      'A session matched to the goal you approved',
      'Clear finish time so the space can be returned to normal',
      'A follow-up note if you want the next session held',
    ],
    image: '/images/sessions/personal-training.webp',
    imageAlt: 'Private personal training in a villa setting',
    cities: ['Bali', 'Jakarta'],
    prices: { Bali: 900_000, Jakarta: 950_000 },
  },
  {
    slug: 'private-yoga',
    title: 'Private yoga',
    short: 'One-to-one or two-person yoga at your pace, in your own setting.',
    description: 'A 60-minute private yoga session for one person, or two people practising together. Style, mats, space and timing are agreed before the session is confirmed. Groups larger than two are quoted separately.',
    durationMin: 60,
    includedParticipants: 2,
    maxParticipants: 8,
    status: 'core',
    statusNote: 'Price includes up to two people.',
    includes: [
      '60-minute private yoga for one person or a pair',
      'A format matched to experience: slower, stronger or mixed',
      'Mat and space requirements agreed in advance',
      'In-zone travel for active Bali and Jakarta clusters',
      'A calm close and optional next-session hold',
    ],
    excludes: [
      'Large public classes or retreat packages',
      'Clinical or trauma therapy',
      'Mats for every extra guest unless quoted',
      'Sunrise clifftop or temple access that needs special permits',
    ],
    goodFor: [
      'Villa guests who want a private practice instead of a crowded studio',
      'Couples or friends sharing one session',
      'Beginners who want slower instruction',
      'People keeping a regular home practice in Jakarta',
    ],
    prepare: [
      'Choose a quiet floor with room to lie down',
      'Tell us experience level and preferred pace',
      'Confirm how many people will join',
      'Have water and a towel ready',
    ],
    expect: [
      'A brief check of space and temperature',
      'A session that stays inside the style you approved',
      'No pressure to perform advanced shapes',
      'Time to ask questions at the end',
    ],
    image: '/images/sessions/private-yoga.webp',
    imageAlt: 'Private yoga session in an indoor-outdoor space',
    cities: ['Bali', 'Jakarta'],
    prices: { Bali: 850_000, Jakarta: 900_000 },
  },
  {
    slug: 'mat-pilates',
    title: 'Mat Pilates',
    short: 'Focused mat-based Pilates. Not reformer. Not clinical physiotherapy.',
    description: 'A 60-minute private mat Pilates session for control, strength and cleaner movement. This is a mat service. It does not include reformer machines and it does not treat injury or pain.',
    durationMin: 60,
    includedParticipants: 1,
    maxParticipants: 4,
    status: 'core',
    statusNote: 'Mat only. Reformer is not offered.',
    includes: [
      '60-minute mat Pilates at your location',
      'Simple props if already on site: ball, band or light weights',
      'A level matched to your current control and experience',
      'Space and flooring checked before the session starts',
      'In-zone travel in active clusters',
    ],
    excludes: [
      'Reformer, Cadillac or studio-machine Pilates',
      'Physiotherapy, postnatal clinical rehab or pain treatment',
      'Shared studio class packages',
    ],
    goodFor: [
      'People who want precise coaching without a studio commute',
      'Pairs sharing a clear living-room floor',
      'A weekly control session beside personal training',
    ],
    prepare: [
      'Clear enough floor for each mat plus walking space',
      'Tell us whether mats already exist',
      'Share general experience, not medical history in chat',
    ],
    expect: [
      'A controlled session, not a high-noise workout',
      'Form cues throughout',
      'A finish that leaves the room usable again',
    ],
    image: '/images/sessions/mat-pilates.webp',
    imageAlt: 'Private mat Pilates in an apartment',
    cities: ['Bali', 'Jakarta'],
    prices: { Bali: 950_000, Jakarta: 1_000_000 },
  },
  {
    slug: 'mobility-coaching',
    title: 'Mobility coaching',
    short: 'Private mobility work for stiffness, travel and everyday range. Non-clinical.',
    description: 'A 60-minute private mobility session for people who feel stiff from travel, desks or training. It is a fitness session, not injury treatment. Pain, swelling or a recent clinical diagnosis needs qualified healthcare first.',
    durationMin: 60,
    includedParticipants: 1,
    maxParticipants: 3,
    status: 'extension',
    statusNote: 'Non-clinical mobility only.',
    includes: [
      '60-minute private mobility session',
      'Floor work and standing work matched to your space',
      'A plan that can sit beside training or yoga',
      'In-zone travel in active clusters',
    ],
    excludes: [
      'Diagnosis, physio protocols or pain treatment',
      'Promises to “fix” a joint or disc',
      'Group stretching classes',
    ],
    goodFor: [
      'Long-haul arrivals who want to move better the next morning',
      'Desk-heavy Jakarta weeks',
      'Lifters who want range without turning the session into rehab',
    ],
    prepare: [
      'Describe stiffness in plain language, not a diagnosis',
      'Have a yoga mat and a wall or chair available',
      'Wear clothes you can sit and reach in',
    ],
    expect: [
      'Slow, coached movement',
      'No cracking, forcing or clinical tests',
      'A short home sequence if you ask for one',
    ],
    image: '/images/sessions/personal-training.webp',
    imageAlt: 'Private mobility coaching session',
    cities: ['Bali', 'Jakarta'],
    prices: { Bali: 850_000, Jakarta: 900_000 },
  },
  {
    slug: 'boxing-fitness',
    title: 'Boxing fitness',
    short: 'Pad work and conditioning in a suitable private space. Fitness scope only.',
    description: 'A 60-minute boxing-fitness session using pads and footwork in a space that can take the noise and movement. This is not sparring, fight camp or a combat sport club.',
    durationMin: 60,
    includedParticipants: 1,
    maxParticipants: 2,
    status: 'request',
    statusNote: 'Available by request after a space and professional check.',
    includes: [
      '60-minute pad and conditioning session',
      'Gloves and pads brought by the professional unless you have your own',
      'A space and neighbour check before confirmation',
    ],
    excludes: [
      'Sparring, fight preparation or contact with another guest',
      'Sessions in rooms that cannot take impact noise',
      'Children’s combat classes',
    ],
    goodFor: [
      'People who want a sharp, private conditioning session',
      'Villas with outdoor decks or gym rooms',
    ],
    prepare: [
      'Confirm the space can handle movement and noise',
      'Wear trainers with grip',
      'Tell us if you already own gloves',
    ],
    expect: [
      'A warm-up, pad rounds and a short finish',
      'No sparring',
      'Equipment wiped down before departure',
    ],
    image: '/images/sessions/personal-training.webp',
    imageAlt: 'Private boxing fitness session',
    cities: ['Bali', 'Jakarta'],
    prices: { Bali: 1_000_000, Jakarta: 1_050_000 },
  },
  {
    slug: 'guided-meditation',
    title: 'Guided meditation',
    short: 'A quiet private sit for one or two people. Not therapy.',
    description: 'A 60-minute guided meditation for one person or a pair. Breath, attention and rest only. It is not counselling, trauma work or a medical intervention.',
    durationMin: 60,
    includedParticipants: 2,
    maxParticipants: 6,
    status: 'request',
    statusNote: 'By request, with a suitable quiet space.',
    includes: [
      '60-minute guided sit for one or two people',
      'A quiet indoor or shaded outdoor setting',
      'Simple seating: chairs, cushions or mats already on site',
    ],
    excludes: [
      'Psychotherapy, breathwork intensives or plant medicine',
      'Guaranteed sleep, anxiety or medical outcomes',
    ],
    goodFor: [
      'Guests who want a still hour in a villa',
      'Pairs who want a shared quiet practice',
    ],
    prepare: [
      'Choose a room that will not be interrupted',
      'Tell us if you prefer seated or lying down',
    ],
    expect: [
      'A short settle, a guided sit, a close',
      'No performance and no clinical claims',
    ],
    image: '/images/sessions/private-yoga.webp',
    imageAlt: 'Quiet private meditation setting',
    cities: ['Bali', 'Jakarta'],
    prices: { Bali: 800_000, Jakarta: 850_000 },
  },
  {
    slug: 'swimming',
    title: 'Private swimming',
    short: '45-minute private swim coaching in a lawful pool you can access.',
    description: 'A 45-minute private swimming session in a villa or building pool you already have permission to use. Pool safety, depth, access and any extra pool fees are checked before a quote is confirmed.',
    durationMin: 45,
    includedParticipants: 1,
    maxParticipants: 2,
    status: 'request',
    statusNote: 'Quoted only after pool access and safety checks. Pool fees extra.',
    includes: [
      '45-minute private swim coaching',
      'A professional with water-safety briefing for that pool',
      'Stroke or confidence work matched to your level',
    ],
    excludes: [
      'Public pool memberships or children-only learn-to-swim schools',
      'Lifeguard cover for a party',
      'Pool hire, entry fees, heating or extra insurance',
    ],
    goodFor: [
      'Villa guests with a usable pool',
      'Adults who want private stroke work',
    ],
    prepare: [
      'Confirm you have permission to use the pool',
      'Share depth, entry type and whether a child is present',
      'Have goggles if you own them',
    ],
    expect: [
      'A pool and access check first',
      'A short water session, not a lesson plan sold as a course until quoted',
    ],
    image: '/images/sessions/private-yoga.webp',
    imageAlt: 'Private swimming session at a villa pool',
    cities: ['Bali'],
    prices: { Bali: 1_050_000, Jakarta: null },
  },
  {
    slug: 'private-chef',
    title: 'Private chef',
    short: 'A partner-delivered private meal, quoted item by item. Not a session package.',
    description: 'A private chef for villa breakfasts, dinners or small gatherings in Bali. Menu, headcount, groceries, staffing, food safety and allergies are quoted as a separate event, not as a fitness add-on price.',
    durationMin: 60,
    includedParticipants: 2,
    maxParticipants: 12,
    status: 'partner',
    statusNote: 'Partner service. Itemised event quote only.',
    includes: [
      'An itemised quote: menu, groceries, cook time, service and cleanup',
      'Allergy questions collected on a separate note, not in open chat',
      'A named partner cook for the event window',
    ],
    excludes: [
      'Open-ended tasting menus without a headcount',
      'Clinical nutrition or diet treatment',
      'Events above the quoted guest number',
    ],
    goodFor: [
      'Villa hosts who want dinner handled after a training week',
      'Small celebrations that need a cook, not a restaurant booking',
    ],
    prepare: [
      'Share date, guest number, kitchen access and dietary limits at a high level',
      'Do not send medical diet files in WhatsApp',
    ],
    expect: [
      'A written itemised quote before any grocery spend',
      'Food-safety and leftover rules on the quote',
    ],
    image: '/images/sessions/private-yoga.webp',
    imageAlt: 'Villa dining setting for a private chef enquiry',
    cities: ['Bali'],
    prices: { Bali: null, Jakarta: null },
  },
]

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
    cluster: 'Canggu–Seminyak cluster',
    travelFee: 0,
    driveNote: 'In-zone. Travel is inside the published session price for core services.',
    copy: 'Canggu is the first Bali cluster we coordinate: villas, compounds and rented homes around Berawa, Batu Bolong, Pererenan and Echo Beach. Sessions run in private spaces with permission, not on packed beach clubs.',
    venues: ['Private villas', 'Rented homes with a clear indoor floor', 'Compound gym rooms', 'Shaded decks with neighbour-aware noise'],
    bestFor: ['Sunrise personal training', 'Couple yoga before the heat', 'Mat Pilates in a living room'],
    services: ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness', 'swimming'],
  },
  {
    slug: 'seminyak',
    name: 'Seminyak',
    city: 'Bali',
    cluster: 'Canggu–Seminyak cluster',
    travelFee: 0,
    driveNote: 'In-zone. Travel is inside the published session price for core services.',
    copy: 'Seminyak and nearby Petitenget work for guests who want a private session without leaving the villa. Access, one-way streets and villa-staff rules are checked before we send a professional.',
    venues: ['Villa living rooms', 'Upper-floor suites with lift access', 'Private gardens with shade'],
    bestFor: ['Private yoga for two', 'Short-stay personal training', 'Evening mobility after dinner plans'],
    services: ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'guided-meditation'],
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
    services: ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'guided-meditation'],
  },
  {
    slug: 'sanur',
    name: 'Sanur',
    city: 'Bali',
    cluster: 'Outer Bali',
    travelFee: 150_000,
    driveNote: 'Outer-zone travel of Rp 150.000 is added once per visit.',
    copy: 'Sanur works for families and longer-stay guests who want a calmer shoreline base. Travel is quoted because it sits outside the Canggu–Seminyak cluster.',
    venues: ['Family villas', 'Apartment living rooms', 'Hotel suites only with written venue permission'],
    bestFor: ['Morning training before the heat', 'Mat Pilates with a partner'],
    services: ['personal-training', 'private-yoga', 'mat-pilates'],
  },
  {
    slug: 'uluwatu',
    name: 'Uluwatu',
    city: 'Bali',
    cluster: 'Bukit',
    travelFee: 200_000,
    driveNote: 'Bukit travel of Rp 200.000 is added once per visit. Traffic windows are checked before confirmation.',
    copy: 'Uluwatu, Pecatu, Bingin and nearby Bukit addresses need a longer travel window. We only confirm when the professional can arrive, set up and leave inside a realistic block — not a clifftop photo promise.',
    venues: ['Clifftop villas with indoor floors', 'Private gym rooms', 'Pools with owner permission for swim enquiries'],
    bestFor: ['Stay-put villa training', 'Private yoga for two', 'Swim coaching where the pool is safe and permitted'],
    services: ['personal-training', 'private-yoga', 'mat-pilates', 'swimming'],
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
    services: ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness'],
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
    services: ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching'],
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
    headline: 'Private sessions in the villa or home you already have.',
    lede: 'Bali is coordinated around Canggu and Seminyak first. Ubud, Sanur and Uluwatu are available with a travel fee and a realistic arrival window.',
    audience: ['Villa guests keeping a routine', 'Month-long residents', 'Couples and small groups', 'Hosts arranging sessions for guests'],
    clusters: ['Canggu–Seminyak in-zone', 'Ubud and Sanur + Rp 150.000', 'Uluwatu / Bukit + Rp 200.000'],
    notes: [
      'We do not claim island-wide coverage.',
      'Beach clubs, temples and public sand are not default venues.',
      'A villa enquiry is not a booking until supply, access and payment are confirmed.',
    ],
  },
  Jakarta: {
    slug: 'jakarta',
    headline: 'A private session that does not ask you to cross the city.',
    lede: 'Jakarta is built for recurring residents and busy weeks. South and Central clusters are in-zone. Other municipalities are quoted with travel.',
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
  return services.find((item) => item.slug === slug)
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
