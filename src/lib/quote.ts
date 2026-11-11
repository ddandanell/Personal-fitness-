import { extraPersonFee, getArea, getProgramme, getService, type City } from '@/data/catalog'

export type QuoteInput = {
  service: string
  city: City
  area?: string
  durationMin: 45 | 60 | 90
  participants: number
  programme?: string
}

export type QuoteResult = {
  ok: boolean
  error?: string
  serviceTitle: string
  city: City
  areaName: string
  durationMin: number
  participants: number
  sessions: number
  base: number
  extraPeople: number
  extraPeopleFee: number
  travel: number
  durationFee: number
  subtotal: number
  discountRate: number
  discount: number
  total: number
  perSession: number
  notes: string[]
}

export function estimateQuote(input: QuoteInput): QuoteResult {
  const service = getService(input.service)
  const area = input.area ? getArea(input.area) : undefined
  const programme = input.programme ? getProgramme(input.programme) : undefined
  const empty = {
    ok: false,
    serviceTitle: service?.title || input.service,
    city: input.city,
    areaName: area?.name || 'To be confirmed',
    durationMin: input.durationMin,
    participants: input.participants,
    sessions: programme?.sessions || 1,
    base: 0,
    extraPeople: 0,
    extraPeopleFee: 0,
    travel: 0,
    durationFee: 0,
    subtotal: 0,
    discountRate: 0,
    discount: 0,
    total: 0,
    perSession: 0,
    notes: [] as string[],
  }

  if (!service) return { ...empty, error: 'Choose a service to see a price.' }
  if (service.prices[input.city] == null) {
    return { ...empty, error: service.status === 'partner' ? 'This is quoted item by item. Use the enquiry form for a chef event.' : `This service is not priced for ${input.city} yet.` }
  }
  if (!service.cities.includes(input.city)) {
    return { ...empty, error: `${service.title} is not offered in ${input.city}.` }
  }
  if (area && area.city !== input.city) {
    return { ...empty, error: `${area.name} is in ${area.city}. Switch the city to match.` }
  }
  const people = Math.max(1, Math.min(service.maxParticipants, Number(input.participants) || 1))
  if (people > service.maxParticipants) {
    return { ...empty, error: `${service.title} is quoted up to ${service.maxParticipants} people.` }
  }

  const base = service.prices[input.city] as number
  const extraPeople = Math.max(0, people - service.includedParticipants)
  const extraPeopleFee = extraPeople * extraPersonFee[input.city]
  const durationFee = input.durationMin === 90 ? Math.round(base * 0.45) : 0
  const travel = area?.travelFee || 0
  const sessionTotal = base + extraPeopleFee + durationFee + travel
  const sessions = programme?.sessions || 1
  const discountRate = programme?.discount || 0
  const subtotal = sessionTotal * sessions
  const discount = Math.round(subtotal * discountRate)
  const total = subtotal - discount
  const notes = [
    `${service.durationMin}-minute published rate for ${input.city} is the session base.`,
    service.includedParticipants > 1 ? `Up to ${service.includedParticipants} people are included.` : 'The published rate is for one person.',
    extraPeople ? `${extraPeople} extra ${extraPeople === 1 ? 'person' : 'people'} at ${extraPersonFee[input.city].toLocaleString('id-ID')} each.` : 'No extra-person fee in this estimate.',
    travel ? `${area?.name} adds a travel fee of Rp ${travel.toLocaleString('id-ID')} per visit.` : 'In-zone travel is inside the session price.',
    input.durationMin === 90 ? '90 minutes adds 45% of the base session rate.' : 'Standard duration selected.',
    programme ? `${programme.title}: ${sessions} sessions with a ${Math.round(discountRate * 100)}% programme reduction.` : 'Single-session estimate.',
    'Venue hire, parking, pool fees and villa staff charges are extra if they exist.',
    'This is a planning estimate. The confirmed quote can change after supply, access and equipment checks.',
  ]

  return {
    ok: true,
    serviceTitle: service.title,
    city: input.city,
    areaName: area?.name || 'Area to confirm',
    durationMin: input.durationMin,
    participants: people,
    sessions,
    base,
    extraPeople,
    extraPeopleFee,
    travel,
    durationFee,
    subtotal,
    discountRate,
    discount,
    total,
    perSession: Math.round(total / sessions),
    notes,
  }
}

export function quoteMessage(result: QuoteResult, extras: { timing?: string; goals?: string; professional?: string }) {
  return [
    'Hello PersonalFitness.id — I would like a confirmed quote.',
    '',
    `Service: ${result.serviceTitle}`,
    `City: ${result.city}`,
    `Area: ${result.areaName}`,
    `Duration: ${result.durationMin} minutes`,
    `Participants: ${result.participants}`,
    result.sessions > 1 ? `Programme: ${result.sessions} sessions` : 'Single session',
    extras.professional ? `Preferred professional: ${extras.professional}` : 'Professional: match for me',
    extras.timing ? `Preferred window: ${extras.timing}` : 'Preferred window: to discuss',
    extras.goals ? `Goals: ${extras.goals}` : '',
    '',
    `Planning estimate: Rp ${result.total.toLocaleString('id-ID')}${result.sessions > 1 ? ` for ${result.sessions} sessions (Rp ${result.perSession.toLocaleString('id-ID')} each)` : ''}`,
    'Please confirm professional, access, full price, inclusions and cancellation terms. This is not a booking.',
  ].filter(Boolean).join('\n')
}
