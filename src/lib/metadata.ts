import { getArea, getService } from '@/data/catalog'
import { getProfessional } from '@/data/professionals'
import { getBlogPost } from '@/data/blog'
import { getResource, pageMeta } from '@/data/content'

const specialisms = new Set(['nutrition-consultation', 'physiotherapy', 'occupational-therapy', 'speech-therapy', 'psychology', 'acupuncture', 'lactation-support', 'birth-and-postpartum-support'])

export function pageMetadata(pathname: string) {
  const parts = pathname.split('/').filter(Boolean)
  const slug = parts.at(-1) || ''
  const city = parts[0] === 'bali' ? 'Bali' : parts[0] === 'jakarta' ? 'Jakarta' : undefined
  const candidateService = getService(slug)
  const service = candidateService && (parts.length === 1 || parts.length === 2 && (parts[0] === 'services' || Boolean(city && candidateService.cities.includes(city)))) ? candidateService : undefined
  const candidateArea = getArea(slug)
  const area = parts.length === 2 && candidateArea?.city === city ? candidateArea : undefined
  const professional = parts.length === 2 && parts[0] === 'professionals' ? getProfessional(slug) : undefined
  const post = parts.length === 2 && parts[0] === 'resources' ? getBlogPost(slug) : undefined
  const resource = parts.length === 2 && parts[0] === 'resources' ? getResource(slug) : undefined
  const [title, description] = post ? [post.title, post.description]
    : professional ? [professional.name + ' · ' + professional.role, professional.focus]
    : resource ? [resource.title, resource.summary]
    : area ? ['Private Wellness in ' + area.name + ', ' + area.city, area.copy]
    : service ? [service.title + (city ? ' in ' + city : ' at Your Villa or Home'), service.short + (city ? ' Explore private ' + city + ' visits, local areas and a personal quote.' : ' Explore formats, preparation, prices and private wellness programmes in Bali and Jakarta.')]
    : pageMeta[pathname] || ['Page Not Found', 'Explore private fitness and wellness at PersonalFitness.id.']
  // City views reuse the complete service guide. Consolidate those copies to one canonical service URL.
  const canonicalPath = service ? '/' + service.slug : pathname
  const known = Boolean(service || professional || post || resource || area || pageMeta[pathname])
  return { title: title + ' | PersonalFitness.id', description, canonical: 'https://personalfitness.id' + canonicalPath, noindex: !known || Boolean(professional) || Boolean(service && specialisms.has(service.slug)), image: professional?.image || service?.image || '/images/wellness/villa-yoga-partners.webp' }
}
