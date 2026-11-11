import fs from 'node:fs/promises'
import path from 'node:path'
import { createServer } from 'vite'

const root = process.cwd()
const dist = path.join(root, 'dist')
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')
const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
try {
  const { staticRoutes, renderPage, pageMetadata } = await server.ssrLoadModule('/src/entry-server.tsx')
  const records = staticRoutes()
  const manifest = []
  for (const record of records) {
    const body = await renderPage(record.path)
    if (!body.includes('<main') || !body.includes('<h1')) throw new Error('Incomplete rendered page: ' + record.path)
    let html = template
      .replace(/<title>[^<]*<\/title>/, '<title>' + escape(record.title) + '</title>')
      .replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/, '$1' + escape(record.description) + '$2')
      .replace(/(<meta name="robots" content=")[^"]*("\s*\/?>)/, '$1' + (record.noindex ? 'noindex, follow' : 'index, follow') + '$2')
      .replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/, '$1' + escape(record.canonical) + '$2')
      .replace(/(<meta property="og:title" content=")[^"]*("\s*\/?>)/, '$1' + escape(record.title) + '$2')
      .replace(/(<meta property="og:description" content=")[^"]*("\s*\/?>)/, '$1' + escape(record.description) + '$2')
      .replace(/(<meta property="og:url" content=")[^"]*("\s*\/?>)/, '$1' + escape(record.canonical) + '$2')
      .replace('<div id="root"></div>', '<div id="root" data-prerendered="true" data-prerender-path="' + escape(record.path) + '">' + body + '</div>')
    const image = '<meta property="og:image" content="https://personalfitness.id' + escape(record.image) + '" />'
    html = html.replace('</head>', image + '\n</head>')
    const filename = record.path === '/' ? path.join(dist, 'index.html') : path.join(dist, record.path.slice(1) + '.html')
    await fs.mkdir(path.dirname(filename), { recursive: true })
    await fs.writeFile(filename, html)
    manifest.push({ path: record.path, canonical: record.canonical, noindex: record.noindex, bytes: Buffer.byteLength(html) })
  }
  const missing = await renderPage('/__not_a_real_page__')
  const missingMeta = pageMetadata('/__not_a_real_page__')
  const missingHtml = template.replace(/<title>[^<]*<\/title>/, '<title>' + escape(missingMeta.title) + '</title>').replace('content="index, follow"', 'content="noindex, follow"').replace('<div id="root"></div>', '<div id="root" data-prerendered="true" data-prerender-path="/__not_a_real_page__">' + missing + '</div>')
  await fs.writeFile(path.join(dist, '404.html'), missingHtml)
  const canonicalPaths = [...new Set(records.filter((record) => !record.noindex).map((record) => record.canonical))]
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + canonicalPaths.map((url) => '  <url><loc>' + escape(url) + '</loc></url>').join('\n') + '\n</urlset>\n'
  await fs.writeFile(path.join(dist, 'sitemap.xml'), xml)
  await fs.writeFile(path.join(root, 'public', 'sitemap.xml'), xml)
  await fs.writeFile(path.join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://personalfitness.id/sitemap.xml\n')
  await fs.writeFile(path.join(root, 'public', 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://personalfitness.id/sitemap.xml\n')
  await fs.writeFile(path.join(dist, 'route-manifest.json'), JSON.stringify(manifest, null, 2))
  console.log('Prerendered ' + manifest.length + ' complete pages, ' + canonicalPaths.length + ' canonical sitemap URLs and a genuine 404 page.')
} finally { await server.close() }
