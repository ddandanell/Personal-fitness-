import { getArea, getService } from '@/data/catalog'
import { getBlogPost } from '@/data/blog'
import { getResource, pageMeta } from '@/data/content'
import { canonicalPath as seoCanonical, getSeo } from '@/data/seo'
import { isHeldPath, offerState, sessionPhoto } from '@/data/publicOffer'
import { SITE_ORIGIN } from '@/data/company'
import { pageImage } from '@/components/EditorialPhoto'

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
  let canonicalPath = seoCanonical(pathname)
  if (isHeldPath(pathname) || state === 'held') canonicalPath = '/services'
  const known = Boolean(locked || service || post || resource || area || gone || pageMeta[pathname])
  const noindex = !known || gone || isHeldPath(pathname) || state === 'held' || state === 'unpublished' || pathname === '/professionals'
  const assignedImage = pageImage(pathname)
  const image = assignedImage?.src || (service ? sessionPhoto(service.slug, service.image) : post?.image || '/images/wellness/villa-yoga-partners.webp')
  const imageAlt = assignedImage?.alt || service?.imageAlt || post?.title || (city === 'Jakarta' ? 'Home personal training in Jakarta' : city === 'Bali' ? 'Private fitness at a Bali villa' : 'Private yoga in a Bali villa')
  const sessionShot = image.includes('/sessions/') || image.includes('kenji-nakamura')
  const imageWidth = assignedImage ? String(assignedImage.width) : sessionShot ? '800' : image.includes('villa-yoga') ? '1100' : '1200'
  const imageHeight = assignedImage ? String(assignedImage.height) : sessionShot ? '870' : image.includes('villa-yoga') ? '619' : '800'
  const region = city === 'Jakarta' || pathname.startsWith('/jakarta') ? 'ID-JK' : city === 'Bali' || pathname.startsWith('/bali') ? 'ID-BA' : 'ID-BA,ID-JK'
  const placename = region === 'ID-JK' ? 'Jakarta' : region === 'ID-BA' ? 'Bali' : 'Bali and Jakarta'
  return {
    title: title + ' | PersonalFitness.id',
    description,
    canonical: SITE_ORIGIN + (canonicalPath === '/' ? '/' : canonicalPath),
    noindex,
    image,
    imageAlt,
    imageWidth,
    imageHeight,
    region,
    placename,
  }
}
