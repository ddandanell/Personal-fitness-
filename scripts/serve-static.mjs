import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'

const args = process.argv.slice(2)
const flag = (name, fallback) => args.includes(name) ? args[args.indexOf(name) + 1] : fallback
const port = Number(flag('--port', process.env.PORT || '4173'))
const host = flag('--host', '127.0.0.1')
const root = path.resolve('dist')
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json' }
const redirects = {
  '/locations': '/service-areas',
  '/blog': '/resources',
  '/professionals': '/professional-standards',
  '/wellness-plan': '/programmes',
  '/fitness-programmes': '/programmes',
  '/mobility-and-stretching': '/mobility-coaching',
  '/boxing-and-kickboxing': '/boxing-fitness',
  '/meditation-and-relaxation': '/guided-meditation',
  '/swimming-lessons': '/swimming',
  '/nutrition-consultations': '/nutrition-consultation',
}
const headers = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Cache-Control': 'no-store',
}
let gone = new Set()
try { gone = new Set(JSON.parse(await fs.readFile(path.join(root, 'gone-paths.json'), 'utf8'))) } catch { /* Built after prerender. */ }

http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', 'http://localhost')
    const pathname = decodeURIComponent(url.pathname)
    if (redirects[pathname]) { response.writeHead(308, { Location: redirects[pathname] + url.search, ...headers }); response.end(); return }
    if (pathname.endsWith('/') && pathname !== '/') { response.writeHead(308, { Location: pathname.slice(0, -1) + url.search, ...headers }); response.end(); return }
    const goneHit = gone.has(pathname) || pathname.startsWith('/professionals/')
    const relative = pathname === '/' ? 'index.html' : pathname.slice(1)
    const candidates = goneHit ? ['410.html'] : [relative, relative + '.html']
    let file
    for (const candidate of candidates) {
      const target = path.resolve(root, candidate)
      if (!target.startsWith(root + path.sep)) continue
      try { if ((await fs.stat(target)).isFile()) { file = target; break } } catch { /* Try the clean HTML URL. */ }
    }
    const status = goneHit ? 410 : file ? 200 : 404
    file ||= path.join(root, goneHit ? '410.html' : '404.html')
    const content = await fs.readFile(file)
    response.writeHead(status, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', ...headers })
    response.end(request.method === 'HEAD' ? undefined : content)
  } catch { response.writeHead(500); response.end('Preview could not serve this page.') }
}).listen(port, host, () => console.log('Static production preview at http://' + host + ':' + port + '/'))
