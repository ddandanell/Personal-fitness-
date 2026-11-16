import fs from 'node:fs/promises'
import assert from 'node:assert/strict'

const root = process.cwd()
const base = (process.argv[2] || '').replace(/\/$/, '')
const pages = await fs.readFile(root + '/public/sitemap-pages.xml', 'utf8')
const posts = await fs.readFile(root + '/public/sitemap-posts.xml', 'utf8')
const locs = [...(pages + posts).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
assert.ok(locs.length >= 90, 'expected at least 90 sitemap URLs, got ' + locs.length)

const report = []
for (const loc of locs) {
  const path = loc.replace('https://www.personalfitness.id', '') || '/'
  const file = path === '/' ? 'dist/index.html' : 'dist' + path + '.html'
  await fs.access(file)
  let status = 'file'
  if (base.startsWith('http')) {
    const response = await fetch(base + (path === '/' ? '/' : path), { redirect: 'manual' })
    status = String(response.status)
    assert.equal(response.status, 200, loc + ' returned ' + response.status)
  }
  report.push({ loc, path, status })
}
console.log(JSON.stringify({ passed: true, urls: report.length, base: base || 'dist', sample: report.slice(0, 3) }))
