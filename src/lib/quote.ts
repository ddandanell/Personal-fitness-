import { extraPersonFee, getArea, getProgramme, getService, type City } from '@/data/catalog'

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
}

export function estimateQuote(input: QuoteInput): QuoteResult {
  const service = getService(input.service)
  const area = input.area ? getArea(input.area) : undefined
  const programme = input.programme ? getProgramme(input.programme) : undefined
  const offer = service?.offers.find((item) => item.id === input.offerId) || service?.offers[0]
  const isDefault = !input.offerId || offer?.id === service?.offers[0]?.id
  const formatLabel = offer?.priceUnit === 'per_7_days_coordination_only' ? '7 days coordination; sessions extra' : offer?.priceUnit === 'per_12_visit_programme' ? 'Counted programme; dates to agree' : input.durationMin ? input.durationMin + ' minutes' : 'Period and scope to agree'
  const empty: QuoteResult = {
    ok: false, serviceTitle: offer?.name || service?.title || input.service, formatLabel, city: input.city,
    areaName: area?.name || 'To be confirmed', durationMin: input.durationMin,
    participants: input.participants, sessions: programme?.sessions || 1,
    base: 0, extraPeople: 0, extraPeopleFee: 0, travel: 0, durationFee: 0,
    subtotal: 0, discountRate: 0, discount: 0, total: 0, perSession: 0, notes: [],
  }
  if (!service || !offer) return { ...empty, error: 'Choose a service and format to start your request.' }
  if (input.offerId && !service.offers.some((item) => item.id === input.offerId)) return { ...empty, error: 'That format does not belong to the selected service.' }
  if (!Number.isInteger(input.participants) || input.participants < 1) return { ...empty, error: 'Enter a whole participant count of at least one.' }
  if (input.area && !area) return { ...empty, error: 'Choose a published area or select Confirm later.' }
  if (area && area.city !== input.city) return { ...empty, error: area.name + ' is in ' + area.city + '. Choose a matching area.' }
  if (area?.travelQuote) return { ...empty, error: 'Availability and travel for ' + area.name + ' need a written quote. No in-zone or zero-travel price is assumed.' }
  if (input.programme && !programme) return { ...empty, error: 'Choose a valid programme or a single visit.' }
  if (offer.quoteOnly || service.quoteOnly || !offer.durationMin) return { ...empty, error: 'This format needs a written specialist or supplier quote. We confirm suitability, professional, scope, equipment and total before booking.' }
  if (input.city === 'Jakarta' && (!isDefault || service.prices.Jakarta == null)) return { ...empty, error: 'This format is not priced for Jakarta. Ask us to check local professional availability and a complete quote.' }
  if (!service.cities.includes(input.city)) return { ...empty, error: 'We need to check this service for ' + input.city + ' before quoting.' }
  const maximum = isDefault ? service.maxParticipants : offer.id === 'PF-029' ? 6 : offer.participants || 1
  if (input.participants > maximum) return { ...empty, error: 'This format is planned for up to ' + maximum + ' people. Request a separately staffed group quote for a larger party.' }
  const baseDuration = isDefault ? service.durationMin : offer.durationMin
  const canExtend = isDefault && ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness', 'guided-meditation'].includes(service.slug)
  if (input.durationMin !== baseDuration && !(canExtend && input.durationMin === 90 && baseDuration === 60)) return { ...empty, error: 'Choose the listed duration for this format. Different visit lengths need a separate quote.' }
  const eligibleProgramme = isDefault && ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness', 'guided-meditation'].includes(service.slug)
  if (programme && !eligibleProgramme) return { ...empty, error: 'A recurring block for this format needs a separate scope and quote.' }
  const base = (isDefault ? service.prices[input.city] : offer.guidePrice) ?? offer.guidePrice
  if (base == null) return { ...empty, error: 'A written quote is required for this format.' }
  const included = isDefault ? service.includedParticipants : offer.participants || 1
  const extraPeople = Math.max(0, input.participants - included)
  const extraPeopleFee = extraPeople * extraPersonFee[input.city]
  const durationFee = input.durationMin !== baseDuration ? Math.round(base * 0.45) : 0
  const travel = area?.travelFee || 0
  const sessions = programme?.sessions || 1
  const sessionSubtotal = base + extraPeopleFee + durationFee
  const discountRate = programme?.discount || 0
  const subtotal = (sessionSubtotal + travel) * sessions
  const discount = Math.round(sessionSubtotal * sessions * discountRate)
  const total = subtotal - discount
  return {
    ...empty, ok: true, base, extraPeople, extraPeopleFee, travel, durationFee,
    sessions, subtotal, discountRate, discount, total, perSession: Math.round(total / sessions),
    notes: [
      'Starting estimate. Availability, extras and the payable total are confirmed by written quote.',
      'Participant count and format are checked before confirmation.',
      'Travel is charged per visit and is not reduced by a programme discount.',
      'Venue hire, parking, ingredients or unusual equipment are extra only when stated in the agreed quote.',
      area ? 'Selected area: ' + area.name : 'Area not selected; the travel line is still to be confirmed.',
    ],
  }
}

export function quoteMessage(result: QuoteResult, extras: { timing?: string; goals?: string; professional?: string }) {
  return [
    'Hello PersonalFitness.id - I would like a confirmed quote.',
    '',
    'Service / format: ' + result.serviceTitle,
    'City: ' + result.city,
    'Area: ' + result.areaName,
    'Visit: ' + result.formatLabel,
    'Participants: ' + result.participants,
    result.sessions > 1 ? 'Programme: ' + result.sessions + ' visits' : 'One visit / scope to confirm',
    extras.professional ? 'Preference: ' + extras.professional : 'Professional: please suggest a suitable match',
    extras.timing ? 'Preferred window: ' + extras.timing : 'Preferred window: to discuss',
    extras.goals ? 'General preference: ' + extras.goals : '',
    '',
    result.ok ? 'Starting price: Rp ' + result.total.toLocaleString('id-ID') + (result.sessions > 1 ? ' for ' + result.sessions + ' visits' : '') : 'Price: written quote required. ' + (result.error || ''),
    'Please confirm the actual professional, access, full payable total, inclusions and cancellation terms. This request is not a booking.',
  ].filter(Boolean).join('\n')
}
