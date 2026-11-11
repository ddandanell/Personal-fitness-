import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { PassThrough } from 'node:stream'
import { Buffer } from 'node:buffer'
import App from './App'
import { areas, services, getService } from './data/catalog'
import { professionals, getProfessional } from './data/professionals'
import { blogPosts, getBlogPost } from './data/blog'
import { resources, getResource, pageMeta } from './data/content'

const specialisms = new Set(['nutrition-consultation', 'physiotherapy', 'occupational-therapy', 'speech-therapy', 'psychology', 'acupuncture', 'lactation-support', 'birth-and-postpartum-support'])

export function pageMetadata(pathname: string) {
  const parts = pathname.split('/').filter(Boolean)
  const slug = parts.at(-1) || ''
  const service = getService(slug)
  const professional = getProfessional(slug)
  const post = getBlogPost(slug)
  const resource = getResource(slug)
  const area = areas.find((item) => item.slug === slug)
  const [title, description] = post ? [post.title, post.description]
    : professional ? [professional.name + ' · ' + professional.role, professional.focus]
    : resource ? [resource.title, resource.summary]
    : area ? [area.name + ' private sessions', area.copy]
    : service ? [service.title + ' at Your Location', service.short]
    : pageMeta[pathname] || ['Page Not Found', 'Explore private fitness and wellness at PersonalFitness.id.']
  const canonicalPath = service && pathname.startsWith('/services/') ? '/' + service.slug : pathname
  const known = Boolean(service || professional || post || resource || area || pageMeta[pathname])
  return { title: title + ' | PersonalFitness.id', description, canonical: 'https://personalfitness.id' + canonicalPath, noindex: !known || Boolean(professional) || Boolean(service && specialisms.has(service.slug)), image: professional?.image || service?.image || '/images/professionals/maya-suryani.webp' }
}

export function staticRoutes() {
  const redirects = new Set(['/locations', '/blog'])
  const paths = new Set(Object.keys(pageMeta).filter((path) => !redirects.has(path)))
  for (const service of services) {
    paths.add('/' + service.slug)
    paths.add('/services/' + service.slug)
    for (const city of service.cities) paths.add('/' + city.toLowerCase() + '/' + service.slug)
  }
  for (const person of professionals) paths.add('/professionals/' + person.slug)
  for (const area of areas) paths.add('/' + area.city.toLowerCase() + '/' + area.slug)
  for (const article of [...blogPosts, ...resources]) paths.add('/resources/' + article.slug)
  return [...paths].sort().map((path) => ({ path, ...pageMetadata(path) }))
}

export function renderPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const output = new PassThrough()
    const chunks: Buffer[] = []
    let failed: unknown
    const timeout = setTimeout(() => { stream.abort(); reject(new Error('Rendering timed out for ' + url)) }, 30_000)
    output.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    output.on('end', () => { clearTimeout(timeout); if (failed) reject(failed); else resolve(Buffer.concat(chunks).toString('utf8')) })
    output.on('error', (error) => { clearTimeout(timeout); reject(error) })
    const stream = renderToPipeableStream(<StrictMode><StaticRouter location={url}><App /></StaticRouter></StrictMode>, {
      onAllReady() { stream.pipe(output) },
      onShellError(error) { clearTimeout(timeout); reject(error) },
      onError(error) { failed = error },
    })
  })
}
