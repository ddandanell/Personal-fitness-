import { next, rewrite } from '@vercel/functions'

const DEMO_HOSTS = new Set([
  'villademo.personalfitness.id',
  'www.villademo.personalfitness.id',
])

export const config = {
  runtime: 'nodejs',
  matcher: ['/((?!assets/|images/|icons/|brand/|api/).*)'],
}

export default function proxy(request) {
  const host = (request.headers.get('host') || '').split(':')[0].toLowerCase()
  if (!DEMO_HOSTS.has(host)) return next()
  const url = new URL(request.url)
  if (url.pathname === '/villademo' || url.pathname.startsWith('/villademo/')) return next()
  if (/\.[a-z0-9]+$/i.test(url.pathname)) return next()
  const destination = new URL(request.url)
  destination.pathname = url.pathname === '/' ? '/villademo' : `/villademo${url.pathname}`
  return rewrite(destination, { headers: { 'X-Robots-Tag': 'noindex, nofollow' } })
}
