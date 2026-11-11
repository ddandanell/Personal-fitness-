import type { City } from './catalog'
import profileData from './professional-profiles.json'

export type Professional = {
  slug: string; name: string; role: string; cities: City[]; areas: string[]
  services: string[]; languages: string[]; years: number | null; focus: string
  bio: string; style: string[]; typical: string[]; initials: string; tone: string
  image: string; imageAlt: string; verificationStatus: 'illustrative' | 'verified'
}

export const professionals = profileData as Professional[]
export function getProfessional(slug: string) { return professionals.find((item) => item.slug === slug) }
export function professionalsFor(filter: { service?: string; city?: City; area?: string }) {
  return professionals.filter((person) =>
    (!filter.service || person.services.includes(filter.service)) &&
    (!filter.city || person.cities.includes(filter.city)) &&
    (!filter.area || person.areas.includes(filter.area)))
}
