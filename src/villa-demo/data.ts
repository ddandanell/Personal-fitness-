import { programmes, packSessionRate, SESSION_ANCHOR } from '@/data/catalog'
import { publicServices } from '@/data/publicOffer'
import { RESCHEDULE_NOTE } from '@/data/offerCopy'
/** Villa Sora guest demonstration. Session requests remain in this tab.
 * Rates and guest limits preserve the existing demo offer.
 * New asset prompts and provenance: docs/villa-demo-image-prompts.md.
 */

export const CONCIERGE_LINE = 'Subject to instructor availability and location confirmation.'
export const POLICY_LINE = RESCHEDULE_NOTE
export const SUPPLY_LINE = 'As supply allows.'
export const BACKUP_LINE = 'A backup instructor is named only where available.'
export const PAYMENT_LINE = 'Payment details are shared in your written quote.'
export const PAYMENT_SENT = 'Payment details sent with confirmation.'
export const LEAD_LINE = 'Requests are for a future Bali date, as supply allows. The preferred time is not reserved until an instructor is offered.'
export const SINGLE_SESSION = SESSION_ANCHOR
export const SECOND_GUEST = 250_000
export const WHATSAPP_DISPLAY = '+62 811-3803-488'
export const WHATSAPP_URL = 'https://wa.me/628113803488'
export const HELP_EMAIL = 'hello@personalfitness.id'

export function packsForService(singleRate: number) {
  return programmes.filter(pack => pack.sessions > 1).map(pack => {
    const perSession = packSessionRate(singleRate, pack.pricePercent)
    return { id: pack.slug, sessions: pack.sessions, perSession, total: perSession * pack.sessions, popular: pack.sessions === 5 }
  })
}

export const sessionTimes = ['07:00', '08:00', '09:00', '10:00', '16:00', '17:00'] as const

export type DemoImage = { src: string; alt: string; width: number; height: number }

function img(src: string, alt: string, width: number, height: number): DemoImage {
  return { src, alt, width, height }
}

export const villa = {
  slug: 'villa-sora',
  name: 'Villa Sora',
  area: 'Canggu, Bali',
  welcome: 'Private wellness, brought to you.',
  photo: img('/images/villademo/guest-villa.webp', 'A sunlit tropical villa with curved cream walls, a garden terrace and a turquoise swimming pool', 1600, 1067),
  interior: img('/images/villademo/guest-villa.webp', 'A peaceful tropical villa beside a swimming pool', 1600, 1067),
  publicCodes: ['sora-table', 'sora-bedroom', 'sora-welcome'],
}

export type Service = {
  slug: string
  name: string
  featured: boolean
  basePrice?: number
  includedGuests?: number
  sentence: string
  duration: string
  minutes: number
  participants: string
  maxGuests: number
  priceBasis: string
  included: string
  brought: string
  guestProvides: string
  setup: string
  area: string
  lead: string
  cancel: string
  languages: string
  capability: string
  image: DemoImage
}

export const services: Service[] = [
  {
    slug: 'private-yoga',
    name: 'Private Yoga',
    featured: true,
    sentence: 'A private yoga hour in the villa, paced for the people in the room.',
    duration: '60 minutes',
    minutes: 60,
    participants: '1 or 2 guests',
    maxGuests: 2,
    priceBasis: 'Rp 1.050.000 for one guest. A second guest adds Rp 250.000.',
    included: 'Your private session, an instructor and mats for your group.',
    brought: 'Mats for the guests on the request.',
    guestProvides: 'A shaded, clear floor and drinking water.',
    setup: 'About ten minutes to lay out mats. A quiet corner of the garden or a living room is enough.',
    area: 'At Villa Sora in Canggu. Travel is included for this villa.',
    lead: LEAD_LINE,
    cancel: POLICY_LINE,
    languages: 'English. Indonesian when the confirmed instructor speaks it.',
    capability: 'Private yoga for guests who want a calm or a stronger hour. The instructor adapts the pace. A named preference is a note, not a promise.',
    image: img('/images/villademo/guest-yoga.webp', 'An Indonesian woman guiding an international adult guest through a yoga lunge on a tropical villa terrace', 1600, 1067),
  },
  {
    slug: 'private-strength',
    name: 'Personal Training',
    featured: true,
    sentence: 'A private strength hour using the space the villa already has.',
    duration: '60 minutes',
    minutes: 60,
    participants: '1 or 2 guests',
    maxGuests: 2,
    priceBasis: 'Rp 1.050.000 for one guest. A second guest adds Rp 250.000.',
    included: 'The session and an instructor.',
    brought: 'A few bands and a mat when the villa does not have them.',
    guestProvides: 'Clear floor space. Dumbbells if the villa already keeps them.',
    setup: 'A living room, covered terrace or gym corner. No installation.',
    area: 'At Villa Sora in Canggu. Travel is included for this villa.',
    lead: LEAD_LINE,
    cancel: POLICY_LINE,
    languages: 'English. Indonesian when the confirmed instructor speaks it.',
    capability: 'Strength work matched to the space and the guests’ experience. This is general fitness, not a clinical programme.',
    image: img('/images/villademo/guest-training.webp', 'An Indonesian male trainer coaching an international guest with a dumbbell on an open villa terrace', 1600, 1067),
  },
  {
    slug: 'mat-pilates',
    name: 'Mat Pilates',
    featured: true,
    sentence: 'Mat work and mobility for a private hour, without a reformer.',
    duration: '60 minutes',
    minutes: 60,
    participants: '1 or 2 guests',
    maxGuests: 2,
    priceBasis: 'Rp 1.050.000 for one guest. A second guest adds Rp 250.000.',
    included: 'Your private session, an instructor and mats for your group.',
    brought: 'Mats.',
    guestProvides: 'A clear floor. A firm surface is easier than a thick rug.',
    setup: 'Floor space for two mats side by side.',
    area: 'At Villa Sora in Canggu. Travel is included for this villa.',
    lead: LEAD_LINE,
    cancel: POLICY_LINE,
    languages: 'English. Indonesian when the confirmed instructor speaks it.',
    capability: 'Mat Pilates and mobility for guests who want a precise, quieter hour. General wellness only.',
    image: img('/images/villademo/guest-pilates.webp', 'An Indonesian Pilates instructor guiding an international guest through a side-lying mat exercise at a villa', 1600, 1067),
  },
  {
    slug: 'bodywork',
    name: 'Bodywork & Recovery',
    featured: true,
    sentence: 'A quiet recovery hour after travel, kept as general wellness.',
    duration: '60 minutes',
    minutes: 60,
    participants: '1 guest',
    maxGuests: 1,
    priceBasis: 'Rp 1.050.000 for one guest. This session is arranged for one person.',
    included: 'The session and an instructor.',
    brought: 'Oil and linen for the hour.',
    guestProvides: 'A private room, a firm bed or a clear floor, and towels.',
    setup: 'The room stays private. Allow a few minutes before and after.',
    area: 'At Villa Sora in Canggu. Travel is included for this villa.',
    lead: LEAD_LINE,
    cancel: POLICY_LINE,
    languages: 'English. Indonesian when the confirmed instructor speaks it.',
    capability: 'Unhurried bodywork for guests who want to recover from the journey. It is not a medical treatment.',
    image: img('/images/villademo/guest-bodywork.webp', 'An Indonesian practitioner providing a draped shoulder and back bodywork session on a peaceful villa terrace', 1600, 1067),
  },
  {
    slug: 'zumba',
    name: 'Zumba & Dance Fitness',
    featured: false,
    sentence: 'A private dance-fitness hour on the terrace you have.',
    duration: '60 minutes',
    minutes: 60,
    participants: '1 or 2 guests',
    maxGuests: 2,
    priceBasis: 'Rp 1.050.000 for one guest. A second guest adds Rp 250.000.',
    included: 'The session and an instructor.',
    brought: 'A small speaker if the villa prefers not to use its own.',
    guestProvides: 'A clear terrace or living room, and a way to play music at a neighbourly volume.',
    setup: 'Shoes or bare feet. Move furniture only if the guests want a wider floor.',
    area: 'At Villa Sora in Canggu. Travel is included for this villa.',
    lead: LEAD_LINE,
    cancel: POLICY_LINE,
    languages: 'English. Indonesian when the confirmed instructor speaks it.',
    capability: 'Dance fitness for guests who want an upbeat private hour. The pace follows the group.',
    image: img('/images/villademo/guest-dance.webp', 'An Indonesian dance fitness instructor leading international adult guests on a shaded villa terrace', 1600, 1067),
  },
  {
    slug: 'quieter-hour',
    name: 'Guided Meditation',
    featured: false,
    sentence: 'A guided meditation hour in a quiet part of the villa.',
    duration: '60 minutes',
    minutes: 60,
    participants: '1 or 2 guests',
    maxGuests: 2,
    priceBasis: 'Rp 1.050.000 for one guest. A second guest adds Rp 250.000.',
    included: 'The session and an instructor.',
    brought: 'Nothing that needs installing.',
    guestProvides: 'A quiet room or a shaded deck, and cushions if you have them.',
    setup: 'Ask the villa to hold housekeeping for the hour.',
    area: 'At Villa Sora in Canggu. Travel is included for this villa.',
    lead: LEAD_LINE,
    cancel: POLICY_LINE,
    languages: 'English. Indonesian when the confirmed instructor speaks it.',
    capability: 'A guided quiet hour. General wellness, with no outcome promised.',
    image: img('/images/villademo/guest-meditation.webp', 'An Indonesian meditation instructor seated with international adult guests in a quiet tropical garden', 1600, 1067),
  },
]

// Additional core services use the same established villa rate and participant rule.
const base = services[1]
services.push(
  {
    ...base, slug: 'mobility', name: 'Mobility & Stretching', featured: false,
    sentence: 'Gentle movement and guided stretching to make space for an easier day.',
    brought: 'Mats and light resistance bands as needed.',
    guestProvides: 'A little clear floor space and drinking water.',
    setup: 'A shaded terrace or a quiet room with room to stretch.',
    capability: 'General mobility coaching, adapted to your comfort and experience.',
    image: img('/images/villademo/guest-mobility.webp', 'An Indonesian mobility coach guiding an international adult guest through a gentle stretch on a villa terrace', 1600, 1067),
  },
  {
    ...base, slug: 'boxing', name: 'Boxing Fitness', featured: false,
    sentence: 'An energising hour of pad work, footwork and conditioning, right at the villa.',
    brought: 'Focus mitts and training equipment, confirmed with your session.',
    guestProvides: 'A clear terrace, comfortable trainers and drinking water.',
    setup: 'Enough open space to move safely and comfortably. Pad work only, without sparring.',
    capability: 'Private boxing fitness and conditioning. The pace follows your experience.',
    image: img('/images/villademo/guest-boxing.webp', 'An Indonesian boxing coach holding focus mitts for an international adult guest on a tropical villa terrace', 1600, 1067),
  },
)

const liveSlugs: Record<string, string> = { 'private-strength': 'personal-training', 'private-yoga': 'private-yoga', 'mat-pilates': 'mat-pilates', bodywork: 'bodywork-recovery', zumba: 'zumba-dance-fitness', 'quieter-hour': 'guided-meditation', mobility: 'mobility-coaching', boxing: 'boxing-fitness' }
for (const service of services) {
  const live = publicServices.find(item => item.slug === liveSlugs[service.slug])
  if (!live) continue
  service.basePrice = live.prices.Bali ?? SINGLE_SESSION
  service.includedGuests = live.includedParticipants
  service.maxGuests = service.slug === 'boxing' || service.slug === 'bodywork' ? 1 : 2
  service.participants = service.maxGuests === 1 ? '1 guest' : '1 or 2 guests'
  service.priceBasis = rp(service.basePrice) + (service.includedGuests === 2 ? ' for up to two guests.' : service.maxGuests === 1 ? ' for one guest.' : ' for one guest. A second guest adds Rp 250.000.')
}

export function getService(slug: string | undefined) {
  return services.find((item) => item.slug === slug)
}

export function featuredServices() {
  return services.filter((item) => item.featured)
}

export function rp(amount: number) {
  return 'Rp ' + amount.toLocaleString('id-ID')
}

export function sessionQuote(people: number, maxGuests = 2, serviceSlug?: string) {
  const selected = getService(serviceSlug)
  const base = selected?.basePrice ?? SINGLE_SESSION
  const included = selected?.includedGuests ?? 1
  const guests = Math.min(maxGuests, Math.max(1, people))
  const extra = Math.max(0, guests - included) * SECOND_GUEST
  return { guests, session: base, extra, travel: 0, total: base + extra }
}

export function baliISO(offsetDays = 0) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Makassar', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
  const [year, month, day] = parts.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day + offsetDays))
  return date.toISOString().slice(0, 10)
}

export function formatBali(iso: string) {
  const tomorrow = baliISO(1)
  const today = baliISO(0)
  const [year, month, day] = iso.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  const label = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' }).format(date)
  if (iso === today) return `Today, ${label}`
  if (iso === tomorrow) return `Tomorrow, ${label}`
  return label
}

export type SampleStatus = 'Confirmed, as supply allows' | 'Checking availability' | 'Offer ready' | 'Request received'

export type SampleBooking = {
  reference: string
  guest: string
  service: string
  iso: string
  time: string
  status: SampleStatus
  people: number
  total: number
  payment: string
}

export function sampleBookings(): SampleBooking[] {
  return [
    { reference: 'PF-20418', guest: 'Lena Ortiz', service: 'Private Yoga', iso: baliISO(1), time: '08:00', status: 'Confirmed, as supply allows', people: 1, total: sessionQuote(1, 2, 'private-yoga').total, payment: PAYMENT_SENT },
    { reference: 'PF-20422', guest: 'Jonah Hale', service: 'Mat Pilates & Mobility', iso: baliISO(3), time: '10:00', status: 'Checking availability', people: 2, total: sessionQuote(2, 2, 'mat-pilates').total, payment: PAYMENT_LINE },
    { reference: 'PF-20430', guest: 'Mira Chen', service: 'Private Strength Training', iso: baliISO(4), time: '07:00', status: 'Offer ready', people: 1, total: sessionQuote(1, 2, 'private-strength').total, payment: PAYMENT_LINE },
    { reference: 'PF-20390', guest: 'Sam Keller', service: 'Bodywork & Recovery', iso: baliISO(-2), time: '16:00', status: 'Confirmed, as supply allows', people: 1, total: sessionQuote(1, 2, 'bodywork').total, payment: PAYMENT_SENT },
  ]
}

export const completedCount = 12
export const eligibleRevenue = 12 * SINGLE_SESSION
export const commissionRate = 0.1
export const earnedCommission = Math.round(eligibleRevenue * commissionRate)

export type QueueStage = 'New' | 'Matching' | 'Offered' | 'Confirmed' | 'Exceptions'

export function sampleQueue(): { reference: string; villa: string; service: string; when: string; age: string; owner: string; stage: QueueStage; next: string }[] {
  const rows = sampleBookings()
  return [
    { reference: rows[1].reference, villa: villa.name, service: rows[1].service, when: `${formatBali(rows[1].iso)} · ${rows[1].time} Bali`, age: '26 min', owner: 'Dewi', stage: 'Matching', next: 'Ask an instructor in Canggu' },
    { reference: rows[2].reference, villa: villa.name, service: rows[2].service, when: `${formatBali(rows[2].iso)} · ${rows[2].time} Bali`, age: '1 h', owner: 'Dewi', stage: 'Offered', next: 'Wait for the guest to accept the total' },
    { reference: rows[0].reference, villa: villa.name, service: rows[0].service, when: `${formatBali(rows[0].iso)} · ${rows[0].time} Bali`, age: '1 day', owner: 'Dewi', stage: 'Confirmed', next: 'Share the arrival note, as supply allows' },
    { reference: 'PF-20311', villa: villa.name, service: 'Private Yoga', when: `${formatBali(baliISO(2))} · 06:30 Bali`, age: '3 h', owner: 'Unassigned', stage: 'Exceptions', next: 'Preferred time is before the usual window. Offer 07:00.' },
    { reference: 'PF-20440', villa: villa.name, service: 'Zumba & Dance Fitness', when: `${formatBali(baliISO(5))} · 17:00 Bali`, age: '12 min', owner: 'Unassigned', stage: 'New', next: 'Check the guest’s WhatsApp and the terrace note' },
  ]
}

export function knownPlacement(code: string | undefined) {
  return Boolean(code && villa.publicCodes.includes(code))
}

export function villaDemoPaths() {
  const paths = ['/villademo', '/villademo/services', '/villademo/help', '/villademo/booking', '/villademo/card']
  for (const service of services) paths.push(`/villademo/services/${service.slug}`, `/villademo/request/${service.slug}`)
  return paths
}

export function villaDemoPage(pathname: string) {
  const path = pathname.replace(/\/$/, '') || '/'
  const parts = path.split('/').filter(Boolean)
  const photo = villa.photo
  if (parts[0] !== 'villademo') return null
  const rest = parts.slice(1)
  let title = 'Villa Sora wellness'
  let description = 'Private wellness at Villa Sora in Canggu. Explore personal training, yoga, Pilates and more, brought to your villa.'
  let image = photo
  const service = rest[0] === 'services' || rest[0] === 'request' ? getService(rest[1]) : undefined
  if (rest.length === 0) {
    title = 'Villa Sora'
    description = 'Private wellness at fictional Villa Sora in Canggu. Choose a session and send a request. Subject to instructor availability and location confirmation.'
  } else if (rest[0] === 'services' && service) {
    title = service.name
    description = `${service.sentence} ${service.priceBasis} ${CONCIERGE_LINE}`
    image = service.image
  } else if (rest[0] === 'services') {
    title = 'All services'
    description = 'Your villa wellness menu. Personal training, yoga, Pilates, mobility, boxing, meditation, bodywork and dance fitness.'
  } else if (rest[0] === 'request' && service) {
    title = `Request ${service.name}`
    description = 'One session request for Villa Sora. The preferred time is not reserved yet.'
    image = service.image
  } else if (rest[0] === 'booking') {
    title = 'My booking'
    description = 'A private status page for one Villa Sora request. The shared villa QR does not open this page.'
  } else if (rest[0] === 'help') {
    title = 'Help'
    description = 'Help for a Villa Sora guest. WhatsApp or hello@personalfitness.id.'
  } else if (rest[0] === 'card') {
    title = 'Villa Sora wellness card'
    description = 'Scan to explore private wellness at Villa Sora in Canggu. Personal training, yoga, Pilates and more, brought to you.'
  }
  return { title, description, image }
}
