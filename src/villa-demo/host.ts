/** Hosts that serve the villa booking demo. The public site stays on its own host. */
const DEMO_HOSTS = new Set([
  'villademo.personalfitness.id',
  'www.villademo.personalfitness.id',
  'villademo.localhost',
  'demo.personalfitness.id',
  'www.demo.personalfitness.id',
  'demo.localhost',
])

const VILLAS_HOSTS = new Set([
  'villas.personalfitness.id',
  'www.villas.personalfitness.id',
  'villas.localhost',
])

function hostnameOf(hostname?: string) {
  const value = hostname ?? (typeof window === 'undefined' ? '' : window.location.hostname)
  return value.split(':')[0].toLowerCase()
}

export function isVillaDemoHost(hostname?: string) {
  return DEMO_HOSTS.has(hostnameOf(hostname))
}

export function isVillasHost(hostname?: string) {
  return VILLAS_HOSTS.has(hostnameOf(hostname))
}

export function isPortalHost(hostname?: string) {
  return isVillaDemoHost(hostname) || isVillasHost(hostname)
}

const VILLA_ROOT_PATHS = new Set(['/portal', '/ops', '/how-it-works', '/walkthrough', '/card', '/setup'])

/** Public path for an in-app route such as /services/private-yoga. */
export function demoHref(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (isVillaDemoHost()) return normalized
  if (isVillasHost()) {
    if (normalized === '/portal') return '/'
    if (normalized === '/') return '/v/villa-sora'
    if (normalized.startsWith('/q/') || normalized.startsWith('/booking') || normalized.startsWith('/partner') || VILLA_ROOT_PATHS.has(normalized)) return normalized
    return `/v/villa-sora${normalized}`
  }
  return normalized === '/' ? '/villademo' : `/villademo${normalized}`
}

/** Map the browser URL back to the prerendered /villademo path used for titles. */
export function canonicalDemoPath(pathname: string) {
  const path = pathname.replace(/\/$/, '') || '/'
  if (path === '/villademo' || path.startsWith('/villademo/')) return path
  if (path === '/v/villa-sora') return '/villademo'
  if (path.startsWith('/v/villa-sora/')) return '/villademo' + path.slice('/v/villa-sora'.length)
  if (path.startsWith('/q/')) return '/villademo'
  if (path === '/booking' || path.startsWith('/booking/')) return '/villademo/booking'
  if (path === '/' && isVillasHost()) return '/villademo/portal'
  if (path === '/') return '/villademo'
  return `/villademo${path}`
}

export const QR_LANDING = 'https://demo.personalfitness.id/q/sora-table'
export const DEMO_ORIGIN = 'https://demo.personalfitness.id'
