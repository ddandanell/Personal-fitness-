import { getArea, getService } from '@/data/catalog'
import { getBlogPost } from '@/data/blog'
import { getResource, pageMeta } from '@/data/content'
import { canonicalPath as seoCanonical, getSeo } from '@/data/seo'
import { isAreaPath, isHeldPath, offerState } from '@/data/publicOffer'
import { SITE_ORIGIN } from '@/data/company'

export function pageMetadata(pathname: string) {
  const parts = pathname.split('/').filter(Boolean)
  const slug = parts.at(-1) || ''
  const city = parts[0] === 'bali' ? 'Bali' : parts[0] === 'jakarta' ? 'Jakarta' : undefined
  const candidateService = getService(slug)
  const service = candidateService && (parts.length === 1 || parts.length === 2 && (parts[0] === 'services' || Boolean(city && candidateService.cities.includes(city)))) ? candidateService : undefined
  const candidateArea = getArea(slug)
  const area = parts.length === 2 && candidateArea?.city === city ? candidateArea : undefined
  const gone = pathname === '/410' || pathname === '/reviews' || parts[0] === 'professionals' && parts.length === 2
  const post = parts.length === 2 && parts[0] === 'resources' ? getBlogPost(slug) : undefined
  const resource = parts.length === 2 && parts[0] === 'resources' ? getResource(slug) : undefined
  const locked = getSeo(pathname)
  const state = service ? offerState(service.slug) : 'unknown'
  const [title, description] = locked ? [locked.title, locked.description]
    : gone ? ['Page no longer available', 'This page is no longer published on PersonalFitness.id.']
    : post ? [post.title, post.description]
    : resource ? [resource.title, resource.summary]
    : area ? ['Private fitness in ' + area.name + ', ' + area.city, area.copy]
    : service ? [service.title + (city ? ' in ' + city : ' at your villa or home'), service.short]
    : pageMeta[pathname] || ['Page Not Found', 'Explore private fitness at PersonalFitness.id.']
  const canonicalPath = seoCanonical(pathname)
  const known = Boolean(locked || service || post || resource || area || gone || pageMeta[pathname])
  const noindex = !known || gone || isHeldPath(pathname) || isAreaPath(pathname) || state === 'held' || state === 'unpublished' || pathname === '/professionals'
  return { title: title + ' | PersonalFitness.id', description, canonical: SITE_ORIGIN + (canonicalPath === '/' ? '/' : canonicalPath), noindex, image: service?.image || '/images/wellness/villa-yoga-partners.webp' }
}
