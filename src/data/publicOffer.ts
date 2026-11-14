import { services } from './catalog'

export const CORE_SERVICE_SLUGS = ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness', 'guided-meditation'] as const
export const HELD_SERVICE_SLUGS = ['swimming', 'nutrition-consultation', 'physiotherapy'] as const
export const CITY_SERVICE_RELEASED = ['personal-training', 'private-yoga', 'mat-pilates', 'boxing-fitness', 'guided-meditation'] as const

const core = new Set<string>(CORE_SERVICE_SLUGS)
const held = new Set<string>(HELD_SERVICE_SLUGS)

export const publicServices = CORE_SERVICE_SLUGS.map((slug) => services.find((item) => item.slug === slug)).filter((item): item is (typeof services)[number] => Boolean(item))

export const SESSION_PHOTOS: Record<string, string> = {
  'personal-training': '/images/editorial/core-personal-training.webp',
  'private-yoga': '/images/editorial/core-private-yoga.webp',
  'mat-pilates': '/images/editorial/core-mat-pilates.webp',
  'mobility-coaching': '/images/locations/mobility-coaching.webp',
  'boxing-fitness': '/images/editorial/core-boxing-fitness.webp',
  'guided-meditation': '/images/editorial/core-guided-meditation.webp',
}

export function sessionPhoto(slug: string, fallback?: string) {
  return SESSION_PHOTOS[slug] || fallback || '/images/editorial/core-personal-training.webp'
}
export const heldServices = services.filter((item) => held.has(item.slug))
export const unpublishedServiceSlugs = services.map((item) => item.slug).filter((slug) => !core.has(slug) && !held.has(slug))

export type OfferState = 'core' | 'held' | 'unpublished' | 'unknown'

export function offerState(slug: string): OfferState {
  const resolved = services.find((item) => item.slug === slug)?.slug
  if (!resolved) return 'unknown'
  if (core.has(resolved)) return 'core'
  if (held.has(resolved)) return 'held'
  return 'unpublished'
}

export const permanentRedirects: Record<string, string> = {
  '/professionals': '/professional-standards',
  '/fitness-programmes': '/programmes',
  '/wellness-plan': '/programmes',
  '/locations': '/service-areas',
  '/blog': '/resources',
  '/mobility-and-stretching': '/mobility-coaching',
  '/boxing-and-kickboxing': '/boxing-fitness',
  '/meditation-and-relaxation': '/guided-meditation',
  '/swimming-lessons': '/swimming',
  '/nutrition-consultations': '/nutrition-consultation',
}

export const goneExactPaths = [
  '/reviews',
  '/private-chef',
  '/private-chef-bali',
  '/private-chef-and-meal-prep',
]

export function isAreaPath(pathname: string) {
  const parts = pathname.replace(/\/$/, '').split('/').filter(Boolean)
  return parts.length === 2 && (parts[0] === 'bali' || parts[0] === 'jakarta') && !services.some((item) => item.slug === parts[1])
}

export function isHeldPath(pathname: string) {
  const parts = pathname.replace(/\/$/, '').split('/').filter(Boolean)
  const slug = parts[0] === 'services' || parts[0] === 'bali' || parts[0] === 'jakarta' ? parts[1] : parts[0]
  return Boolean(slug && held.has(slug))
}

export const indexableStaticPaths = [
  '/',
  '/services',
  '/personal-training',
  '/private-yoga',
  '/mat-pilates',
  '/mobility-coaching',
  '/boxing-fitness',
  '/guided-meditation',
  '/programmes',
  '/pricing',
  '/how-it-works',
  '/contact',
  '/about',
  '/faq',
  '/bali',
  '/jakarta',
  '/bali/personal-training',
  '/bali/private-yoga',
  '/bali/mat-pilates',
  '/bali/boxing-fitness',
  '/bali/guided-meditation',
  '/jakarta/personal-training',
  '/jakarta/private-yoga',
  '/jakarta/mat-pilates',
  '/jakarta/boxing-fitness',
  '/jakarta/guided-meditation',
  '/service-areas',
  '/professional-standards',
  '/resources',
  '/privacy',
  '/terms',
  '/refunds-rescheduling',
  '/safety',
  '/editorial-policy',
  '/villa-hotel-partners',
]
