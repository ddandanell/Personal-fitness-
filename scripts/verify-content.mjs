import fs from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'
import { createServer } from 'vite'

const read = async (name) => JSON.parse(await fs.readFile('src/data/' + name + '.json', 'utf8'))
const families = await read('wellness-services')
const profiles = await read('professional-profiles')
const articles = await read('service-articles')
const biographies = await read('professional-articles')
const categories = await read('wellness-categories')
const wordCount = (sections) => sections.map((section) => section.body).join(' ').match(/\b[\w'-]+\b/g)?.length || 0
assert.equal(families.length, 53)
assert.equal(profiles.length, 26)
assert.equal(categories.length, 15)
const offers = families.flatMap((family) => family.offers)
assert.equal(offers.length, 140)
assert.equal(new Set(offers.map((offer) => offer.id)).size, 140)
const known = new Set(families.map((family) => family.slug))
for (const family of families) {
  assert.ok(wordCount(articles[family.slug]) >= 500, family.slug + ' needs complete service content')
  await fs.access(path.join('public', family.image))
  assert.ok(family.offers.length > 0)
  for (const offer of family.offers) assert.ok(categories.some((category) => category.id === offer.categoryId))
}
for (const person of profiles) {
  assert.ok(wordCount(biographies[person.slug]) >= 500, person.slug + ' needs at least 500 words')
  assert.equal(person.verificationStatus, 'illustrative')
  assert.equal(person.years, null)
  for (const slug of person.services) assert.ok(known.has(slug), person.slug + ': broken service link ' + slug)
  await fs.access(path.join('public', person.image))
}
const source = await fs.readFile('src/data/professional-profiles.json', 'utf8')
assert.ok(!source.includes('\u2014'))
const manifest = JSON.parse(await fs.readFile('dist/route-manifest.json', 'utf8'))
for (const record of manifest) {
  const file = record.path === '/' ? 'dist/index.html' : 'dist' + record.path + '.html'
  const html = await fs.readFile(file, 'utf8')
  assert.ok(html.includes('<h1'), record.path + ': missing rendered content')
  assert.ok(html.includes('rel="canonical"'), record.path + ': missing canonical')
  if (record.path.startsWith('/professionals/')) {
    assert.ok(html.includes('noindex, follow'))
    assert.ok(html.includes('AI-generated'))
  }
}
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
try {
  const { estimateQuote, quoteMessage } = await server.ssrLoadModule('/src/lib/quote.ts')
  const base = { service: 'personal-training', city: 'Bali', durationMin: 60, participants: 1 }
  assert.equal(estimateQuote(base).total, 900000)
  assert.equal(estimateQuote({ ...base, city: 'Jakarta' }).total, 950000)
  assert.equal(estimateQuote({ ...base, participants: 2 }).total, 1150000)
  assert.equal(estimateQuote({ ...base, durationMin: 90 }).total, 1305000)
  assert.equal(estimateQuote({ ...base, participants: 999 }).ok, false)
  assert.equal(estimateQuote({ ...base, participants: 0 }).ok, false)
  assert.equal(estimateQuote({ ...base, participants: 1.5 }).ok, false)
  assert.equal(estimateQuote({ ...base, area: 'south-jakarta' }).ok, false)
  assert.equal(estimateQuote({ ...base, area: 'made-up-area' }).ok, false)
  assert.equal(estimateQuote({ ...base, offerId: 'PF-076' }).ok, false)
  assert.equal(estimateQuote({ ...base, area: 'ubud', programme: 'two-week' }).total, 6030000)
  const swim = { ...base, service: 'swimming', durationMin: 45 }
  assert.equal(estimateQuote(swim).total, 1050000)
  assert.equal(estimateQuote({ ...swim, durationMin: 60 }).ok, false)
  for (const service of ['physiotherapy', 'private-chef', 'nutrition-consultation', 'wellness-equipment-rental']) {
    const quote = estimateQuote({ ...base, service })
    assert.equal(quote.ok, false)
    assert.ok(!quoteMessage(quote, {}).includes('Planning estimate: Rp 0'))
  }
  console.log(JSON.stringify({ passed: true, serviceFamilies: families.length, offerFormats: offers.length, illustrativeProfiles: profiles.length, minimumProfileWords: Math.min(...Object.values(biographies).map(wordCount)), minimumServiceWords: Math.min(...Object.values(articles).map(wordCount)), generatedImages: (await fs.readdir('public/images/professionals')).filter((file) => file.endsWith('.webp')).length + (await fs.readdir('public/images/services')).filter((file) => file.endsWith('.webp')).length, prerenderedPages: manifest.length, quoteCases: 17 }, null, 2))
} finally { await server.close() }
