import { estimateQuote } from './quote'
import { getArea, getService, type City } from '@/data/catalog'
import { formatIdr } from './money'

export const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const
export type PlanVisit = { id: string; service: string; day: string; time: string; participants: number }
export type PlanInput = { city: City; area: string; weeks: number; startDate: string; visits: PlanVisit[] }
export const planServices = ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness', 'guided-meditation']
export const defaultVisits: PlanVisit[] = [
  { id: 'yoga', service: 'private-yoga', day: 'Tuesday', time: '08:00', participants: 2 },
  { id: 'training', service: 'personal-training', day: 'Friday', time: '08:00', participants: 1 },
]
const eligible = new Set(['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness', 'guided-meditation'])

export function estimateWellnessPlan(input: PlanInput) {
  const validWeeks = [1, 2, 3, 4].includes(input.weeks)
  const area = getArea(input.area)
  const lines = input.visits.map((visit) => {
    const service = getService(visit.service)
    const quote = estimateQuote({ service: visit.service, city: input.city, area: input.area, durationMin: service?.durationMin || 60, participants: visit.participants })
    const valid = planServices.includes(visit.service) && weekDays.some((day) => day === visit.day) && /^([01]\d|2[0-3]):[0-5]\d$/.test(visit.time) && Number.isInteger(visit.participants) && visit.participants >= 1 && visit.participants <= 20
    return { visit, service, quote, valid }
  })
  const totalVisits = input.visits.length * input.weeks
  const eligibleVisits = lines.filter((line) => line.valid && eligible.has(line.visit.service) && line.quote.ok).length * input.weeks
  const discountRate = eligibleVisits >= 12 ? .12 : eligibleVisits >= 9 ? .08 : eligibleVisits >= 6 ? .05 : 0
  const priced = lines.filter((line) => line.valid && line.quote.ok)
  const sessionTotal = priced.reduce((sum, line) => sum + line.quote.base + line.quote.extraPeopleFee + line.quote.durationFee, 0) * input.weeks
  const travelTotal = priced.reduce((sum, line) => sum + line.quote.travel, 0) * input.weeks
  const discountBase = priced.filter((line) => eligible.has(line.visit.service)).reduce((sum, line) => sum + line.quote.base + line.quote.extraPeopleFee + line.quote.durationFee, 0) * input.weeks
  const saving = Math.round(discountBase * discountRate)
  const collisions = lines.some((line, index) => lines.some((other, otherIndex) => {
    if (otherIndex <= index || other.visit.day !== line.visit.day) return false
    const minutes = (time: string) => Number(time.split(':')[0]) * 60 + Number(time.split(':')[1])
    const a = minutes(line.visit.time), b = minutes(other.visit.time)
    return a < b + (other.service?.durationMin || 60) && b < a + (line.service?.durationMin || 60)
  }))
  const invalid = !validWeeks || !area || area.city !== input.city || !lines.length || lines.some((line) => !line.valid) || collisions
  const requiresQuote = invalid || lines.some((line) => !line.quote.ok)
  return { lines, totalVisits, eligibleVisits, discountRate, sessionTotal, travelTotal, saving, total: sessionTotal + travelTotal - saving, requiresQuote, invalid, collisions, pricedVisits: priced.length * input.weeks }
}

export function wellnessPlanMessage(input: PlanInput) {
  const estimate = estimateWellnessPlan(input)
  return [
    'Hello PersonalFitness.id, please help me plan a private wellness schedule.',
    'City: ' + input.city,
    'Area: ' + (getArea(input.area)?.name || 'Please confirm'),
    'Start date: ' + (input.startDate || 'To agree'),
    'Duration: ' + input.weeks + (input.weeks === 1 ? ' week' : ' weeks') + '; ' + estimate.totalVisits + ' requested visits',
    ...input.visits.map((visit) => visit.day + ' at ' + visit.time + ': ' + (getService(visit.service)?.title || visit.service) + ', ' + visit.participants + (visit.participants === 1 ? ' person' : ' people')),
    estimate.requiresQuote ? 'Price: complete written quote required; any displayed subtotal covers priced items only.' : 'Starting price: ' + formatIdr(estimate.total),
    estimate.saving ? 'Programme saving on eligible fitness sessions: ' + formatIdr(estimate.saving) + ' (' + Math.round(estimate.discountRate * 100) + '%).' : 'Please confirm any eligible programme saving.',
    'Please itemise travel, staffing, equipment and any other fees. I would like to discuss one paid first visit before committing to a prepaid plan.',
    'Please explain the coordinator-managed wellness brief and how I can choose which non-clinical notes are shared with my coaches.',
    'This is a schedule enquiry, not a confirmed booking or payment authorisation.',
  ].join('\n')
}
