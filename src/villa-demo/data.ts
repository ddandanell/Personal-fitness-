/**
 * Fictional Arunika Houses preview.
 * Photography is Unsplash (licence: https://unsplash.com/license). Trainer names are invented.
 * Demo prices follow the villa-preview brief. Nothing here is a live booking.
 *
 * Photos: hero-pool 1540541338287, house-lima 1613490493576, cliff-seseh 1571003123894,
 * atelier-uluwatu 1539367628448, garden-berawa 1613977257363, pavilion-echo 1520250497591,
 * interior 1582719478250, rice 1555400038, yoga 1544367567, pilates 1599447421416,
 * training 1571019614242, mobility 1599901860904, meditation 1506126613408,
 * portraits 1531123897727, 1506794778202, 1544005313, 1500648767791.
 */

export const DEMO_TODAY = '2026-11-17'
export const SECOND_GUEST_IDR = 250_000
export const CONCIERGE_LINE = 'Subject to instructor availability and location confirmation.'
export const POLICY_LINE = 'Free rescheduling up to 36 hours before your session. Sessions are delivered by vetted instructors.'

export const packs = [
  { id: 'single', label: 'Single', sessions: 1, perSession: 1_050_000, total: 1_050_000, popular: false },
  { id: 'pack-3', label: '3-Session Pack', sessions: 3, perSession: 950_000, total: 2_850_000, popular: false },
  { id: 'pack-5', label: '5-Session Pack', sessions: 5, perSession: 900_000, total: 4_500_000, popular: true },
  { id: 'pack-10', label: '10-Session Pack', sessions: 10, perSession: 800_000, total: 8_000_000, popular: false },
] as const

export type PackId = (typeof packs)[number]['id']

export function travelFee(villaSlug: string) {
  return villaSlug === 'atelier-uluwatu' ? 100_000 : 0
}

export function quoteTotal(packId: PackId, people: number, villaSlug: string) {
  const pack = packs.find((item) => item.id === packId) ?? packs[0]
  const guests = Math.min(2, Math.max(1, people))
  const perSession = pack.perSession + (guests > 1 ? SECOND_GUEST_IDR : 0)
  const travel = travelFee(villaSlug)
  return { pack, guests, perSession, travel, total: perSession * pack.sessions + travel }
}

export type DemoImage = { src: string; alt: string; width: number; height: number }

export type Villa = {
  slug: string
  name: string
  area: string
  bedrooms: number
  line: string
  stay: string
  image: DemoImage
  detail: DemoImage
}

export type Service = {
  slug: string
  name: string
  price: number
  duration: number
  included: number
  max: number
  line: string
  note: string
  image: DemoImage
}

export type Trainer = {
  slug: string
  name: string
  role: string
  languages: string[]
  specialties: string[]
  rating: number
  sampleSessions: number
  bio: string
  slots: string[]
  photo: DemoImage
  services: string[]
}

export type BookingStatus = 'requested' | 'confirmed' | 'completed'

export type Booking = {
  id: string
  villa: string
  guest: string
  service: string
  trainer: string
  date: string
  time: string
  people: number
  total: number
  status: BookingStatus
  chargeToStay: boolean
  packId: PackId
  note: string
}

export type Schedule = {
  id: string
  name: string
  service: string
  trainer: string
  time: string
  days: string[]
  villas: string[]
}

const img = (src: string, alt: string, width: number, height: number): DemoImage => ({ src, alt, width, height })

export const villas: Villa[] = [
  {
    slug: 'house-lima',
    name: 'House Lima',
    area: 'Pererenan',
    bedrooms: 4,
    line: 'Four bedrooms on the rice edge, with a pool pavilion wide enough for a mat.',
    stay: 'The Hartmann stay',
    image: img('/images/villademo/house-lima.webp', 'A white villa with a still pool and open glass rooms', 1600, 1066),
    detail: img('/images/villademo/rice.webp', 'Rice terraces and palms beside a Balinese village path', 1400, 876),
  },
  {
    slug: 'cliff-seseh',
    name: 'Cliff House',
    area: 'Seseh',
    bedrooms: 5,
    line: 'Five bedrooms above the coast. Morning practice faces the water, not the road.',
    stay: 'Helen Ortiz',
    image: img('/images/villademo/cliff-seseh.webp', 'Daybeds and an infinity pool opening onto the sea at dusk', 1600, 1066),
    detail: img('/images/villademo/interior.webp', 'A timber bedroom with garden doors and morning light', 1600, 1100),
  },
  {
    slug: 'atelier-uluwatu',
    name: 'Atelier Uluwatu',
    area: 'Uluwatu',
    bedrooms: 3,
    line: 'Three bedrooms on the Bukit. The terrace is the studio when the wind is kind.',
    stay: 'The Laurent stay',
    image: img('/images/villademo/atelier-uluwatu.webp', 'Limestone cliffs and a pale cove on the Bukit coast', 1600, 1066),
    detail: img('/images/villademo/hero-pool.webp', 'An infinity pool above the ocean, lined with palms', 1600, 1066),
  },
  {
    slug: 'garden-berawa',
    name: 'Garden House',
    area: 'Berawa',
    bedrooms: 6,
    line: 'Six bedrooms and a lawn. The usual house for families who train before the beach.',
    stay: 'Marcus Hale',
    image: img('/images/villademo/garden-berawa.webp', 'A modern white house with a lawn, lounge and swimming pool', 1800, 1200),
    detail: img('/images/villademo/training.webp', 'A vetted instructor guiding an adult through a floor strength exercise', 1600, 1100),
  },
  {
    slug: 'pavilion-echo',
    name: 'Pavilion',
    area: 'Echo Beach',
    bedrooms: 4,
    line: 'Four bedrooms around a long pool. Yoga fits on the shallow deck.',
    stay: 'Mina Cho',
    image: img('/images/villademo/pavilion-echo.webp', 'A tropical pool framed by palms and pitched-roof pavilions', 1600, 1066),
    detail: img('/images/villademo/meditation.webp', 'A person seated in meditation on a wooden deck in warm light', 1400, 962),
  },
]

const sharedNote = '60 minutes. A second guest is Rp 250.000 a session. ' + CONCIERGE_LINE

export const services: Service[] = [
  {
    slug: 'private-strength-training',
    name: 'Private Strength Training',
    price: 1_050_000,
    duration: 60,
    included: 1,
    max: 2,
    line: 'Keep a strength routine at the house, on the guest’s terms.',
    note: sharedNote,
    image: img('/images/villademo/training.webp', 'A vetted instructor guiding an adult through a floor strength exercise', 1600, 1100),
  },
  {
    slug: 'private-yoga',
    name: 'Private yoga',
    price: 1_050_000,
    duration: 60,
    included: 1,
    max: 2,
    line: 'Your space. Your pace. Your practice.',
    note: sharedNote,
    image: img('/images/villademo/yoga.webp', 'A person holding a low lunge on a mat at sunset by the sea', 1600, 1100),
  },
  {
    slug: 'pilates-mobility',
    name: 'Pilates & mobility',
    price: 1_050_000,
    duration: 60,
    included: 1,
    max: 2,
    line: 'Move with focus and control. A clear floor is enough.',
    note: sharedNote,
    image: img('/images/villademo/pilates.webp', 'Two adults practising mat work on the floor of a quiet room', 1600, 1100),
  },
  {
    slug: 'bodywork-recovery',
    name: 'Bodywork & Recovery',
    price: 1_050_000,
    duration: 60,
    included: 1,
    max: 2,
    line: 'An unhurried hour to settle after travel or a long swim.',
    note: sharedNote,
    image: img('/images/villademo/mobility.webp', 'An adult folding forward on a mat in a quiet studio', 1600, 1100),
  },
  {
    slug: 'zumba-dance-fitness',
    name: 'Zumba & Dance Fitness',
    price: 1_050_000,
    duration: 60,
    included: 1,
    max: 2,
    line: 'An easy, social hour. The music stays inside the house.',
    note: sharedNote,
    image: img('/images/villademo/zumba.webp', 'Adults moving together in a bright dance-fitness class', 1400, 1000),
  },
  {
    slug: 'guided-meditation',
    name: 'A quieter hour',
    price: 1_050_000,
    duration: 60,
    included: 1,
    max: 2,
    line: 'A calm sit on the terrace, paced to the guest.',
    note: sharedNote,
    image: img('/images/villademo/meditation.webp', 'A person seated quietly on a wooden deck in warm light', 1400, 962),
  },
]

export const trainers: Trainer[] = [
  {
    slug: 'amara-cole',
    name: 'Amara Cole',
    role: 'Yoga and quiet hours',
    languages: ['English', 'Indonesian'],
    specialties: ['Private yoga', 'A quieter hour', 'Sunrise practice'],
    rating: 4.9,
    sampleSessions: 128,
    bio: 'Amara keeps the hour quiet and specific: a short look at the terrace, then a practice that matches the heat and the pace the guest wants. She is often the 7:00 across the rice houses and the cliff.',
    slots: ['06:30', '07:00', '08:00', '17:30'],
    photo: img('/images/villademo/portrait-ayu.webp', 'Portrait of Amara Cole, a sample instructor in this preview', 900, 1120),
    services: ['private-yoga', 'guided-meditation'],
  },
  {
    slug: 'julian-hart',
    name: 'Julian Hart',
    role: 'Private Strength Training',
    languages: ['English', 'German'],
    specialties: ['Private Strength Training', 'Return to a routine', 'Pairs'],
    rating: 4.8,
    sampleSessions: 96,
    bio: 'Julian runs practical strength hours with bands, a mat and whatever the house already has. He is the usual instructor for Garden House on Monday, Wednesday and Friday.',
    slots: ['06:30', '08:00', '08:30', '16:00'],
    photo: img('/images/villademo/portrait-made.webp', 'Portrait of Julian Hart, a sample instructor in this preview', 900, 1120),
    services: ['private-strength-training', 'zumba-dance-fitness'],
  },
  {
    slug: 'clara-voss',
    name: 'Clara Voss',
    role: 'Pilates and dance fitness',
    languages: ['English', 'French'],
    specialties: ['Pilates & mobility', 'Zumba & Dance Fitness', 'Pairs'],
    rating: 5,
    sampleSessions: 74,
    bio: 'Clara teaches Pilates and dance fitness in living rooms and on covered decks. She asks for a clear rectangle of floor and prefers the hour before the house wakes fully.',
    slots: ['07:30', '09:00', '09:30', '16:30'],
    photo: img('/images/villademo/portrait-sari.webp', 'Portrait of Clara Voss, a sample instructor in this preview', 900, 1120),
    services: ['pilates-mobility', 'zumba-dance-fitness'],
  },
  {
    slug: 'michael-tan',
    name: 'Michael Tan',
    role: 'Bodywork & Recovery',
    languages: ['English', 'Indonesian'],
    specialties: ['Bodywork & Recovery', 'A quieter hour', 'After-travel hours'],
    rating: 4.7,
    sampleSessions: 81,
    bio: 'Michael takes the slower hours: an unhurried recovery block after a flight, or a quiet sit when the house wants the evening to land.',
    slots: ['08:00', '10:00', '17:00', '18:00'],
    photo: img('/images/villademo/portrait-johan.webp', 'Portrait of Michael Tan, a sample instructor in this preview', 900, 1120),
    services: ['bodywork-recovery', 'guided-meditation'],
  },
]

const completed: Booking[] = [
  booking('ARK-1802', 'garden-berawa', 'Noah Berg', 'private-strength-training', 'julian-hart', '2026-11-02', '08:00', 1, 'completed'),
  booking('ARK-1808', 'house-lima', 'The Patel stay', 'private-yoga', 'amara-cole', '2026-11-03', '07:00', 2, 'completed'),
  booking('ARK-1814', 'pavilion-echo', 'Mina Cho', 'pilates-mobility', 'clara-voss', '2026-11-04', '09:00', 1, 'completed'),
  booking('ARK-1819', 'cliff-seseh', 'Helen Ortiz', 'guided-meditation', 'amara-cole', '2026-11-05', '17:30', 2, 'completed'),
  booking('ARK-1826', 'house-lima', 'Chris and Anna', 'private-strength-training', 'julian-hart', '2026-11-06', '08:00', 2, 'completed'),
  booking('ARK-1831', 'atelier-uluwatu', 'The Laurent stay', 'private-yoga', 'amara-cole', '2026-11-08', '07:00', 2, 'completed'),
  booking('ARK-1838', 'garden-berawa', 'Omar Haddad', 'bodywork-recovery', 'michael-tan', '2026-11-09', '10:00', 1, 'completed'),
  booking('ARK-1844', 'pavilion-echo', 'Sophie Klein', 'zumba-dance-fitness', 'clara-voss', '2026-11-11', '07:00', 2, 'completed'),
  booking('ARK-1850', 'cliff-seseh', 'The Okonkwo stay', 'pilates-mobility', 'clara-voss', '2026-11-12', '09:00', 2, 'completed'),
  booking('ARK-1856', 'house-lima', 'Elena Voss', 'guided-meditation', 'michael-tan', '2026-11-14', '17:00', 2, 'completed'),
  booking('ARK-1862', 'garden-berawa', 'Marcus Hale', 'private-strength-training', 'julian-hart', '2026-11-15', '08:30', 1, 'completed'),
  booking('ARK-1868', 'atelier-uluwatu', 'Priya Shah', 'bodywork-recovery', 'michael-tan', '2026-11-16', '08:00', 1, 'completed'),
]

export const seedBookings: Booking[] = [
  ...completed,
  booking('ARK-1904', 'house-lima', 'Elena Voss', 'private-yoga', 'amara-cole', '2026-11-18', '07:00', 2, 'requested', 'First morning. Terrace if the light is soft.'),
  booking('ARK-1905', 'garden-berawa', 'Marcus Hale', 'private-strength-training', 'julian-hart', '2026-11-18', '08:30', 1, 'confirmed'),
  booking('ARK-1911', 'cliff-seseh', 'The Okonkwo stay', 'pilates-mobility', 'clara-voss', '2026-11-19', '09:00', 2, 'requested'),
  booking('ARK-1918', 'atelier-uluwatu', 'The Laurent stay', 'private-yoga', 'amara-cole', '2026-11-20', '07:00', 2, 'confirmed'),
]

export const seedSchedules: Schedule[] = [
  {
    id: 'SCH-07',
    name: 'Sunrise yoga',
    service: 'private-yoga',
    trainer: 'amara-cole',
    time: '07:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    villas: ['house-lima', 'cliff-seseh', 'atelier-uluwatu'],
  },
  {
    id: 'SCH-08',
    name: 'Strength block',
    service: 'private-strength-training',
    trainer: 'julian-hart',
    time: '08:00',
    days: ['Mon', 'Wed', 'Fri'],
    villas: ['garden-berawa'],
  },
]

export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

export const bookableDates = ['2026-11-18', '2026-11-19', '2026-11-20', '2026-11-21']

function booking(
  id: string,
  villa: string,
  guest: string,
  service: string,
  trainer: string,
  date: string,
  time: string,
  people: number,
  status: BookingStatus,
  note = '',
): Booking {
  return { id, villa, guest, service, trainer, date, time, people, total: quoteTotal('single', people, villa).total, status, chargeToStay: true, packId: 'single', note }
}

export function getVilla(slug: string | undefined) {
  return villas.find((item) => item.slug === slug)
}

export function getService(slug: string | undefined) {
  return services.find((item) => item.slug === slug)
}

export function getTrainer(slug: string | undefined) {
  return trainers.find((item) => item.slug === slug)
}

export function trainersFor(serviceSlug: string) {
  return trainers.filter((item) => item.services.includes(serviceSlug))
}

export function formatDay(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${days[date.getUTCDay()]} ${day} ${months[month - 1]}`
}

export function villaDemoPaths() {
  const paths = ['/villademo', '/villademo/book', '/villademo/confirmed', '/villademo/card', '/villademo/desk', '/villademo/desk/book', '/villademo/desk/schedules', '/villademo/desk/roster']
  for (const villa of villas) {
    paths.push(`/villademo/stay/${villa.slug}`, `/villademo/card/${villa.slug}`)
  }
  for (const trainer of trainers) paths.push(`/villademo/trainers/${trainer.slug}`)
  return paths
}

const MONTH = 'Sample November ledger for the fictional Arunika houses. Not a live booking.'

export function villaDemoPage(pathname: string) {
  const path = pathname.replace(/\/$/, '') || '/'
  const parts = path.split('/').filter(Boolean)
  const hero = img('/images/villademo/hero-pool.webp', 'An infinity pool above the ocean, lined with palms', 1600, 1066)
  if (parts[0] !== 'villademo') return null
  const rest = parts.slice(1)
  let title = 'In-villa wellness, under the house name'
  let description = 'A preview for villa managers. Guests request a private hour from a card in the room, and the request is charged to the stay.'
  let image = hero
  if (rest[0] === 'stay') {
    const villa = getVilla(rest[1]) ?? villas[0]
    title = `${villa.name} in-villa wellness`
    description = `${villa.name} in ${villa.area}. Private strength training, yoga, Pilates, bodywork and dance fitness, requested from the room.`
    image = villa.image
  } else if (rest[0] === 'trainers') {
    const trainer = getTrainer(rest[1]) ?? trainers[0]
    title = `${trainer.name}, sample instructor`
    description = `${trainer.name} is a fictional trainer in the Arunika preview. ${trainer.role}. ${trainer.languages.join(' and ')}.`
    image = trainer.photo
  } else if (rest[0] === 'book') {
    title = 'Request an hour'
    description = 'Choose a session, a time and the number of people. The preview confirms on screen and does not send email.'
    image = services[2].image
  } else if (rest[0] === 'confirmed') {
    title = 'Request received'
    description = 'A sample confirmation. The hour is marked against the villa stay. No email is sent from this preview.'
  } else if (rest[0] === 'card') {
    const villa = getVilla(rest[1]) ?? villas[0]
    title = `${villa.name} room card`
    description = `A printable card for ${villa.name}. Guests scan it for the in-villa wellness page.`
    image = villa.detail
  } else if (rest[0] === 'desk') {
    title = rest[1] === 'book' ? 'Book a guest hour' : rest[1] === 'schedules' ? 'Recurring villa hours' : rest[1] === 'roster' ? 'Trainer roster' : 'The house desk'
    description = MONTH
    image = villas[0].detail
  }
  return { title, description, image }
}
