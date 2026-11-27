import { getArea, getService } from '@/data/catalog'
import { getBlogPost } from '@/data/blog'
import { getResource, pageMeta } from '@/data/content'
import { canonicalPath as seoCanonical, getSeo } from '@/data/seo'
import { isHeldPath, offerState, sessionPhoto } from '@/data/publicOffer'
import { SITE_ORIGIN } from '@/data/company'
import { pageImage } from '@/components/EditorialPhoto'
import { villaDemoPage } from '@/villa-demo/data'
import { seoOverride } from '@/data/seoOverrides'

const OG_BY_PATH: Record<string, { src: string; alt: string; width: string; height: string }> = {
  '/services': { src: '/images/editorial/core-personal-training.webp', alt: 'Private private strength training at home', width: '1440', height: '960' },
  '/resources': { src: '/images/editorial/how-it-works.webp', alt: 'Planning a private home session', width: '1440', height: '960' },
  '/contact': { src: '/images/editorial/pricing.webp', alt: 'Discussing a private session quote', width: '1440', height: '960' },
  '/faq': { src: '/images/editorial/about.webp', alt: 'Coordinator discussing a private session', width: '1440', height: '960' },
  '/privacy': { src: '/images/locations/seminyak.webp', alt: 'Private villa session setting', width: '1440', height: '960' },
  '/terms': { src: '/images/locations/canggu.webp', alt: 'Villa fitness setting in Canggu', width: '1440', height: '960' },
  '/refunds-rescheduling': { src: '/images/locations/ubud.webp', alt: 'Home session in Ubud', width: '1440', height: '960' },
  '/safety': { src: '/images/locations/mobility-coaching.webp', alt: 'Guided mobility session at home', width: '1440', height: '960' },
  '/editorial-policy': { src: '/images/editorial/core-mat-pilates.webp', alt: 'Mat Pilates at home', width: '1440', height: '960' },
  '/villa-hotel-partners': { src: '/images/editorial/villa-hotel-partners-20261118.webp', alt: 'Private yoga at a Bali villa', width: '1440', height: '960' },
  '/id/mitra-villa': { src: '/images/editorial/villa-hotel-partners-20261118.webp', alt: 'Sesi yoga privat di villa Bali', width: '1440', height: '960' },
  '/partner-terms': { src: '/images/editorial/villa-hotel-partners-20261118.webp', alt: 'Villa partner programme', width: '1440', height: '960' },
  '/team': { src: '/images/editorial/about.webp', alt: 'Coordinating a private fitness visit', width: '1440', height: '960' },
}

export function brandedTitle(title: string) {
  if (title.includes('PersonalFitness.id')) return title
  const branded = title + ' | PersonalFitness.id'
  return branded.length <= 60 ? branded : title
}

export function pageMetadata(pathname: string) {
  if (pathname === '/villademo' || pathname.startsWith('/villademo/')) {
    const demo = villaDemoPage(pathname)
    const image = demo?.image
    return {
      title: demo?.title || 'Villa wellness preview',
      htmlLang: 'en',
      locale: 'en_ID',
      description: demo?.description || 'A noindex preview of in-villa wellness for a fictional Bali house collection.',
      canonical: 'https://villademo.personalfitness.id' + pathname.replace(/^\/villademo/, ''),
      noindex: true,
      image: image?.src || '/images/villademo/hero-pool.webp',
      imageAlt: image?.alt || 'An infinity pool above the ocean, lined with palms',
      imageWidth: String(image?.width || 1600),
      imageHeight: String(image?.height || 1066),
      region: 'ID-BA',
      placename: 'Bali',
    }
  }
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
  const override = gone ? undefined : seoOverride(seoCanonical(pathname))
  const [title, description] = override?.title && override.description ? [override.title, override.description]
    : locked ? [locked.title, locked.description]
    : gone ? ['Page no longer available', 'This page is no longer published on PersonalFitness.id.']
    : post ? [post.title, post.description]
    : resource ? [resource.title, resource.summary]
    : area ? ['Private fitness in ' + area.name + ', ' + area.city, area.copy]
    : service ? [service.title + (city ? ' in ' + city : ' at your villa or home'), service.short]
    : pageMeta[pathname] || ['Page Not Found', 'Explore private fitness at PersonalFitness.id.']
  let canonicalPath = seoCanonical(pathname)
  if (isHeldPath(pathname) || state === 'held') canonicalPath = '/services'
  const known = Boolean(locked || service || post || resource || area || gone || pageMeta[pathname])
  const noindex = !known || gone || isHeldPath(pathname) || state === 'held' || state === 'unpublished' || pathname === '/professionals' || pathname === '/partners/menu'
  const assignedImage = pageImage(pathname)
  const og = OG_BY_PATH[pathname]
  const image = assignedImage?.src || (service ? sessionPhoto(service.slug, service.image) : post?.image || og?.src || '/images/wellness/villa-yoga-partners.webp')
  const imageAlt = assignedImage?.alt || service?.imageAlt || post?.title || og?.alt || (city === 'Jakarta' ? 'Home private strength training in Jakarta' : city === 'Bali' ? 'Private fitness at a Bali villa' : 'Private yoga in a Bali villa')
  const sessionShot = image.includes('/sessions/') || image.includes('kenji-nakamura')
  const imageWidth = assignedImage ? String(assignedImage.width) : og?.width || (sessionShot ? '800' : image.includes('villa-yoga') ? '1100' : '1200')
  const imageHeight = assignedImage ? String(assignedImage.height) : og?.height || (sessionShot ? '870' : image.includes('villa-yoga') ? '619' : '800')
  const region = city === 'Jakarta' || pathname.startsWith('/jakarta') ? 'ID-JK' : city === 'Bali' || pathname.startsWith('/bali') ? 'ID-BA' : 'ID-BA,ID-JK'
  const placename = region === 'ID-JK' ? 'Jakarta' : region === 'ID-BA' ? 'Bali' : 'Bali and Jakarta'
  const indonesian = pathname === '/id' || pathname.startsWith('/id/') || post?.lang === 'id'
  return {
    title: brandedTitle(title),
    htmlLang: indonesian ? 'id' : 'en',
    locale: indonesian ? 'id_ID' : 'en_ID',
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

export function hreflangFor(pathname: string) {
  if (pathname === '/' || pathname === '/id') {
    return [
      { hreflang: 'en-ID', href: SITE_ORIGIN + '/' },
      { hreflang: 'id-ID', href: SITE_ORIGIN + '/id' },
      { hreflang: 'x-default', href: SITE_ORIGIN + '/' },
    ]
  }
  if (pathname === '/villa-hotel-partners' || pathname === '/id/mitra-villa') {
    return [
      { hreflang: 'en-ID', href: SITE_ORIGIN + '/villa-hotel-partners' },
      { hreflang: 'id-ID', href: SITE_ORIGIN + '/id/mitra-villa' },
      { hreflang: 'x-default', href: SITE_ORIGIN + '/villa-hotel-partners' },
    ]
  }
  const canonical = SITE_ORIGIN + (seoCanonical(pathname) === '/' ? '/' : seoCanonical(pathname))
  return [
    { hreflang: 'en-ID', href: canonical },
    { hreflang: 'x-default', href: canonical },
  ]
}
