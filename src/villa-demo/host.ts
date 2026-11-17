/** Hosts that should serve the villa demo at the site root. */
export const VILLA_DEMO_HOSTS = new Set([
  'villademo.personalfitness.id',
  'www.villademo.personalfitness.id',
  'villademo.localhost',
])

export function isVillaDemoHost(hostname = typeof window === 'undefined' ? '' : window.location.hostname) {
  return VILLA_DEMO_HOSTS.has(hostname.split(':')[0].toLowerCase())
}

/** Guest-facing path, rooted at / on the demo host and /villademo everywhere else. */
export function demoHref(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`
  const onHost = isVillaDemoHost()
  if (normalized === '/') return onHost ? '/' : '/villademo'
  return onHost ? normalized : `/villademo${normalized}`
}

/** Map a browser path back to the prerendered /villademo path. */
export function canonicalDemoPath(pathname: string) {
  if (pathname === '/villademo' || pathname.startsWith('/villademo/')) return pathname
  if (pathname === '/') return '/villademo'
  return `/villademo${pathname}`
}
