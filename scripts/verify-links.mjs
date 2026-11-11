import fs from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'
const manifest = JSON.parse(await fs.readFile('dist/route-manifest.json', 'utf8'))
const routes = new Set(manifest.map((item) => item.path))
const redirects = new Set(['/locations', '/blog', '/private-chef-bali'])
let links = 0, assets = 0, schemas = 0
for (const record of manifest) {
 const file = record.path === '/' ? 'dist/index.html' : 'dist' + record.path + '.html'
 const html = await fs.readFile(file, 'utf8')
 assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, record.path + ': expected one H1')
 for (const match of html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
  const url = match[1]
  if (/\.[a-z0-9]+$/.test(url)) { await fs.access(path.join('dist', url)); assets++ }
  else { assert.ok(routes.has(url) || redirects.has(url), record.path + ': broken link to ' + url); links++ }
 }
 for (const match of html.matchAll(/<img[^>]*\ssrc="([^"]+)"/g)) if (match[1].startsWith('/')) { await fs.access(path.join('dist', match[1])); assets++ }
 for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) { JSON.parse(match[1]); schemas++ }
}
assert.ok(schemas >= manifest.length, 'Expected structured data on every page')
console.log(JSON.stringify({ passed: true, pages: manifest.length, checkedLinks: links, checkedAssetReferences: assets, validStructuredDataBlocks: schemas }))
