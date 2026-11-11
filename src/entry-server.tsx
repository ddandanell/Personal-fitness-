import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { PassThrough } from 'node:stream'
import { Buffer } from 'node:buffer'
import App from './App'
import { areas } from './data/catalog'
import { blogPosts } from './data/blog'
import { resources } from './data/content'
import { HELD_SERVICE_SLUGS, indexableStaticPaths } from './data/publicOffer'
import { pageMetadata } from './lib/metadata'
export { pageMetadata } from './lib/metadata'

export function staticRoutes() {
  const paths = new Set([...indexableStaticPaths, '/410', ...HELD_SERVICE_SLUGS.map((slug) => '/' + slug)])
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
