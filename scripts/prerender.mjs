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
  const { indexableSeoRecords } = await server.ssrLoadModule('/src/data/seo.ts')
  const { unpublishedServiceSlugs, goneExactPaths } = await server.ssrLoadModule('/src/data/publicOffer.ts')
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
      .replace(/(<meta property="og:image" content=")[^"]*("\s*\/?>)/, '$1' + escape('https://www.personalfitness.id' + record.image) + '$2')
      .replace(/(<meta name="twitter:title" content=")[^"]*("\s*\/?>)/, '$1' + escape(record.title) + '$2')
      .replace(/(<meta name="twitter:description" content=")[^"]*("\s*\/?>)/, '$1' + escape(record.description) + '$2')
      .replace(/(<meta name="twitter:image" content=")[^"]*("\s*\/?>)/, '$1' + escape('https://www.personalfitness.id' + record.image) + '$2')
      .replace('<div id="root"></div>', '<div id="root" data-prerendered="true" data-prerender-path="' + escape(record.path) + '">' + body + '</div>')
    if (record.path === '/') {
      html = html.replace('<link rel="canonical"', '<link rel="preload" as="image" href="/images/wellness/villa-yoga-partners.webp" fetchpriority="high" />\n    <link rel="canonical"')
    }
    const filename = record.path === '/' ? path.join(dist, 'index.html') : path.join(dist, record.path.slice(1) + '.html')
    await fs.mkdir(path.dirname(filename), { recursive: true })
    await fs.writeFile(filename, html)
    manifest.push({ path: record.path, canonical: record.canonical, noindex: record.noindex, bytes: Buffer.byteLength(html) })
  }
  const missing = await renderPage('/__not_a_real_page__')
  const missingMeta = pageMetadata('/__not_a_real_page__')
  const missingHtml = template.replace(/<title>[^<]*<\/title>/, '<title>' + escape(missingMeta.title) + '</title>').replace('content="index, follow"', 'content="noindex, follow"').replace('<div id="root"></div>', '<div id="root" data-prerendered="true" data-prerender-path="/__not_a_real_page__">' + missing + '</div>')
  await fs.writeFile(path.join(dist, '404.html'), missingHtml)
  const gonePage = records.find((record) => record.path === '/410')
  if (gonePage) await fs.copyFile(path.join(dist, '410.html'), path.join(dist, '410.html'))
  const gonePaths = [
    ...unpublishedServiceSlugs.flatMap((slug) => ['/' + slug, '/services/' + slug, '/bali/' + slug, '/jakarta/' + slug]),
    ...goneExactPaths,
  ]
  await fs.writeFile(path.join(dist, 'gone-paths.json'), JSON.stringify([...new Set(gonePaths)], null, 2))
  const canonicalPaths = [...new Set(records.filter((record) => !record.noindex).map((record) => record.canonical))]
  const seoEntries = indexableSeoRecords().filter((item) => canonicalPaths.includes('https://www.personalfitness.id' + (item.path === '/' ? '/' : item.path)))
  const urlset = (entries) => '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + entries.map((item) => '  <url><loc>https://www.personalfitness.id' + (item.path === '/' ? '/' : item.path) + '</loc><lastmod>' + item.lastmod + '</lastmod></url>').join('\n') + '\n</urlset>\n'
  const pagesXml = urlset(seoEntries.filter((item) => item.group === 'page'))
  const postsXml = urlset(seoEntries.filter((item) => item.group === 'post'))
  const indexXml = '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>https://www.personalfitness.id/sitemap-pages.xml</loc><lastmod>2026-11-12</lastmod></sitemap>\n  <sitemap><loc>https://www.personalfitness.id/sitemap-posts.xml</loc><lastmod>2026-11-12</lastmod></sitemap>\n</sitemapindex>\n'
  for (const [name, xml] of [['sitemap.xml', indexXml], ['sitemap-pages.xml', pagesXml], ['sitemap-posts.xml', postsXml]]) {
    await fs.writeFile(path.join(dist, name), xml)
    await fs.writeFile(path.join(root, 'public', name), xml)
  }
  const robots = 'User-agent: *\nAllow: /\nSitemap: https://www.personalfitness.id/sitemap.xml\n# Citation file: https://www.personalfitness.id/llms.txt\n'
  await fs.writeFile(path.join(dist, 'robots.txt'), robots)
  await fs.writeFile(path.join(root, 'public', 'robots.txt'), robots)
  await fs.writeFile(path.join(dist, 'route-manifest.json'), JSON.stringify(manifest, null, 2))
  console.log('Prerendered ' + manifest.length + ' complete pages, ' + seoEntries.length + ' canonical sitemap URLs and a genuine 404 page.')
} finally { await server.close() }
