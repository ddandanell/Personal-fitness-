import { extraPersonFee, getArea, getProgramme, getService, programmes, SESSION_ANCHOR, type City } from '@/data/catalog'
import { AVAILABILITY_NOTE, TRAVEL_DISCLAIMER } from '@/data/offerCopy'
import { formatIdr } from '@/lib/money'

export const PACK_SERVICES = ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness', 'guided-meditation', 'bodywork-recovery', 'zumba-dance-fitness']

export type QuoteInput = {
  service: string
  city: City
  area?: string
  durationMin: number
  participants: number
  programme?: string
  offerId?: string
}
export type QuoteResult = {
  ok: boolean; error?: string; serviceTitle: string; formatLabel: string; city: City
  areaName: string; durationMin: number; participants: number; sessions: number
  base: number; extraPeople: number; extraPeopleFee: number; travel: number
  durationFee: number; subtotal: number; discountRate: number; discount: number
  total: number; perSession: number; notes: string[]
  singleRate: number; packTitle: string
}

/** Pack rate scaled from a discipline's own 60-minute price against the Rp 1.050.000 anchor. */
export function packSessionRate(serviceBase: number, packPerSession: number) {
  return Math.round((serviceBase * packPerSession) / SESSION_ANCHOR)
}

export function estimateQuote(input: QuoteInput): QuoteResult {
  const service = getService(input.service)
  const area = input.area ? getArea(input.area) : undefined
  const programme = input.programme ? getProgramme(input.programme) : programmes.find((item) => item.slug === 'single')
  const offer = service?.offers.find((item) => item.id === input.offerId) || service?.offers[0]
  const isDefault = !input.offerId || offer?.id === service?.offers[0]?.id
  const formatLabel = offer?.priceUnit === 'per_7_days_coordination_only' ? '7 days coordination; sessions extra' : offer?.priceUnit === 'per_12_visit_programme' ? 'Counted programme; dates to agree' : input.durationMin ? input.durationMin + ' minutes' : 'Period and scope to agree'
  const empty: QuoteResult = {
    ok: false, serviceTitle: offer?.name || service?.title || input.service, formatLabel, city: input.city,
    areaName: area?.name || 'To be confirmed', durationMin: input.durationMin,
    participants: input.participants, sessions: programme?.sessions || 1,
    base: 0, extraPeople: 0, extraPeopleFee: 0, travel: 0, durationFee: 0,
    subtotal: 0, discountRate: 0, discount: 0, total: 0, perSession: 0, notes: [],
    singleRate: 0, packTitle: programme?.title || 'Single Session',
  }
  if (!service || !offer) return { ...empty, error: 'Choose a service and format to start your request.' }
  if (input.offerId && !service.offers.some((item) => item.id === input.offerId)) return { ...empty, error: 'That format does not belong to the selected service.' }
  if (!Number.isInteger(input.participants) || input.participants < 1) return { ...empty, error: 'Enter a whole guest count of at least one.' }
  if (input.area && !area) return { ...empty, error: 'Choose a published area or select Confirm later.' }
  if (area && area.city !== input.city) return { ...empty, error: area.name + ' is in ' + area.city + '. Choose a matching area.' }
  if (area?.travelQuote) return { ...empty, error: 'Availability and travel for ' + area.name + ' need a written quote. No in-zone price is assumed.' }
  if (input.programme && !programme) return { ...empty, error: 'Choose a valid package or a single session.' }
  if (!programme) return { ...empty, error: 'Choose a valid package or a single session.' }
  if (offer.quoteOnly || service.quoteOnly || !offer.durationMin) return { ...empty, error: 'This format needs a written specialist quote. We confirm suitability, the instructor, scope and the total before booking.' }
  if (input.city === 'Jakarta' && (!isDefault || service.prices.Jakarta == null)) return { ...empty, error: 'This format is not priced for Jakarta. Ask us to check instructor availability and a complete quote.' }
  if (!service.cities.includes(input.city)) return { ...empty, error: 'We need to check this service for ' + input.city + ' before quoting.' }
  const pairReady = PACK_SERVICES.includes(service.slug)
  if (!pairReady && programme.slug !== 'single') return { ...empty, error: 'A package for this format needs a separate scope and quote.' }
  const listedMax = isDefault ? service.maxParticipants : offer.id === 'PF-029' ? 6 : offer.participants || 1
  const maximum = service.slug === 'boxing-fitness' ? 1 : pairReady ? 2 : listedMax
  if (input.participants > maximum) return { ...empty, error: 'This format is planned for up to ' + maximum + ' people. Request a separate quote for a larger party.' }
  const baseDuration = isDefault ? service.durationMin : offer.durationMin
  const canExtend = pairReady && baseDuration === 60
  if (input.durationMin !== baseDuration && !(canExtend && input.durationMin === 90 && baseDuration === 60)) return { ...empty, error: 'Choose the listed duration for this format. A different session duration needs a separate quote.' }
  const singleRate = (isDefault ? service.prices[input.city] : offer.guidePrice) ?? offer.guidePrice
  if (singleRate == null) return { ...empty, error: 'A written quote is required for this format.' }
  const included = isDefault ? service.includedParticipants : offer.participants || 1
  const extraPeople = Math.max(0, input.participants - included)
  const extraPeopleFee = extraPeople * extraPersonFee[input.city]
  const rate = pairReady ? packSessionRate(singleRate, programme.perSession) : singleRate
  const durationFee = input.durationMin === 90 ? Math.round(rate * 0.45) : 0
  const sessions = pairReady ? programme.sessions : 1
  const sessionCharge = rate + extraPeopleFee + durationFee
  const subtotal = sessionCharge * sessions
  const discount = (singleRate - rate) * sessions
  const discountRate = singleRate > 0 ? (singleRate - rate) / singleRate : 0
  return {
    ...empty,
    ok: true,
    base: rate,
    extraPeople,
    extraPeopleFee,
    travel: 0,
    durationFee,
    sessions,
    subtotal,
    discountRate,
    discount,
    total: subtotal,
    perSession: sessionCharge,
    singleRate,
    packTitle: programme.title,
    notes: [
      AVAILABILITY_NOTE,
      TRAVEL_DISCLAIMER,
      singleRate === SESSION_ANCHOR
        ? 'Package savings are the exact difference from Rp 1.050.000 per session.'
        : 'This discipline keeps its own 60-minute rate. Package savings are the same share of that rate as the anchor packs.',
      area ? 'Selected area: ' + area.name + (input.city === 'Bali' ? '. Travel is included.' : '.') : 'Area not selected; location is confirmed in the written quote.',
    ],
  }
}

export function quoteMessage(result: QuoteResult, extras: { timing?: string; goals?: string; professional?: string }) {
  return [
    "Hi PersonalFitness.id, I'd like " + result.serviceTitle + ' in ' + result.areaName + (extras.timing ? ' on ' + extras.timing : '') + ' for ' + result.participants + (Number(result.participants) === 1 ? ' guest' : ' guests') + '.',
    '',
    'Service: ' + result.serviceTitle,
    'City: ' + result.city,
    'Area: ' + result.areaName,
    'Session duration: ' + result.formatLabel,
    'Package: ' + result.packTitle,
    'Guests: ' + result.participants,
    extras.professional ? 'Preference: ' + extras.professional : '',
    extras.goals ? 'Note: ' + extras.goals : '',
    result.ok ? 'Starting price: ' + formatIdr(result.total) + (result.sessions > 1 ? ' for ' + result.sessions + ' sessions' : '') : 'Price: written quote required. ' + (result.error || ''),
    result.discount > 0 ? 'Package savings versus ' + formatIdr(result.singleRate) + ' per session: ' + formatIdr(result.discount) : '',
  ].filter(Boolean).join('\n')
}
