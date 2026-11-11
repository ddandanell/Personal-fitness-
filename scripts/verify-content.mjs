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
  assert.ok(wordCount(articles[family.slug]) >= 1000, family.slug + ' needs at least 1,000 words of complete service content')
  await fs.access(path.join('public', family.image))
  assert.ok(family.offers.length > 0)
  for (const offer of family.offers) assert.ok(categories.some((category) => category.id === offer.categoryId))
}
for (const person of profiles) {
  assert.ok(wordCount(biographies[person.slug]) >= 500, person.slug + ' needs at least 500 words')
  assert.equal(person.verificationStatus, 'verified')
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
  if (record.noindex) assert.ok(html.includes('noindex, follow'), record.path + ': expected noindex')
  assert.ok(!html.includes('AI-generated'))
  assert.ok(!html.toLowerCase().includes('illustrative profile'))
  assert.ok(!html.includes('140 service'))
  assert.ok(!html.includes('53 service'))
}
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
try {
  const { estimateQuote, quoteMessage } = await server.ssrLoadModule('/src/lib/quote.ts')
  const { estimateWellnessPlan, defaultVisits, wellnessPlanMessage } = await server.ssrLoadModule('/src/lib/wellnessPlan.ts')
  const { cityAreas } = await server.ssrLoadModule('/src/data/catalog.ts')
  assert.equal(cityAreas('Bali').length, 5)
  assert.equal(cityAreas('Jakarta').length, 5)
  const plan = { city: 'Bali', area: 'canggu', weeks: 4, startDate: '', visits: defaultVisits }
  assert.equal(estimateWellnessPlan(plan).total, 6650000)
  assert.equal(estimateWellnessPlan(plan).discountRate, .05)
  assert.equal(estimateWellnessPlan({ ...plan, weeks: 1 }).discountRate, 0)
  const three = [...defaultVisits, { id: 'pilates', service: 'mat-pilates', day: 'Wednesday', time: '09:00', participants: 1 }]
  assert.equal(estimateWellnessPlan({ ...plan, visits: three }).discountRate, .12)
  assert.equal(estimateWellnessPlan({ ...plan, visits: three, weeks: 3 }).discountRate, .08)
  assert.equal(estimateWellnessPlan({ ...plan, visits: three, area: 'ubud' }).travelTotal, 1800000)
  assert.equal(estimateWellnessPlan({ ...plan, visits: three, area: 'ubud' }).total, 11304000)
  assert.equal(estimateWellnessPlan({ ...plan, city: 'Jakarta', area: 'north-jakarta' }).requiresQuote, true)
  assert.equal(estimateWellnessPlan({ ...plan, visits: [{ ...defaultVisits[0], participants: 0 }] }).invalid, true)
  assert.equal(estimateWellnessPlan({ ...plan, visits: [{ ...defaultVisits[0], participants: 1.5 }] }).invalid, true)
  assert.equal(estimateWellnessPlan({ ...plan, visits: [{ ...defaultVisits[0], time: '' }] }).invalid, true)
  assert.equal(estimateWellnessPlan({ ...plan, visits: [defaultVisits[0], { ...defaultVisits[1], day: 'Tuesday', time: '08:30' }] }).collisions, true)
  const custom = wellnessPlanMessage({ ...plan, city: 'Jakarta', area: 'north-jakarta' })
  assert.ok(custom.includes('complete written quote required'))
  assert.ok(!custom.includes('Planning total: Rp 0'))
  const withMassage = [...three, { id: 'massage', service: 'massage-and-bodywork', day: 'Thursday', time: '16:00', participants: 1 }]
  assert.equal(estimateWellnessPlan({ ...plan, visits: withMassage }).invalid, true)
  assert.ok(!manifest.some((item) => item.path === '/professionals' || item.path.startsWith('/professionals/')))
  assert.ok(!manifest.some((item) => item.path === '/reviews' || item.path === '/wellness-plan'))
  for (const route of ['/', '/services', '/personal-training', '/programmes', '/villa-hotel-partners', '/how-it-works', '/410', '/jakarta/north-jakarta']) assert.ok(manifest.some((item) => item.path === route), route + ' must be prerendered')
  const home = manifest.find((item) => item.path === '/')
  assert.equal(home.noindex, false)
  const boxing = manifest.find((item) => item.path === '/boxing-fitness')
  assert.equal(boxing.noindex, false)
  const meditation = manifest.find((item) => item.path === '/guided-meditation')
  assert.equal(meditation.noindex, false)
  const held = manifest.find((item) => item.path === '/swimming')
  assert.equal(held.noindex, true)
  const partnerHtml = await fs.readFile('dist/villa-hotel-partners.html', 'utf8')
  const headerHtml = partnerHtml.split('</header>')[0]
  const footerHtml = partnerHtml.split('<footer')[1]
  assert.ok(!headerHtml.includes('href="/villa-hotel-partners"'))
  assert.ok(footerHtml.includes('href="/villa-hotel-partners"'))
  for (const file of ['public/brand/personalfitness-mark.png', 'public/favicon.ico', 'public/icons/favicon-64.png', 'public/images/wellness/villa-yoga-partners.webp']) await fs.access(file)
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
  assert.equal(estimateQuote({ ...base, service: 'boxing-fitness' }).total, 1000000)
  assert.equal(estimateQuote({ ...base, service: 'boxing-fitness', participants: 2 }).ok, false)
  assert.equal(estimateQuote({ ...base, service: 'guided-meditation', participants: 2 }).total, 800000)
  const swim = { ...base, service: 'swimming', durationMin: 45 }
  assert.equal(estimateQuote(swim).total, 1050000)
  assert.equal(estimateQuote({ ...swim, durationMin: 60 }).ok, false)
  for (const service of ['physiotherapy', 'private-chef', 'nutrition-consultation', 'wellness-equipment-rental']) {
    const quote = estimateQuote({ ...base, service })
    assert.equal(quote.ok, false)
    assert.ok(!quoteMessage(quote, {}).includes('Planning estimate: Rp 0'))
  }
  console.log(JSON.stringify({ passed: true, serviceFamilies: families.length, offerFormats: offers.length, profiles: profiles.length, minimumProfileWords: Math.min(...Object.values(biographies).map(wordCount)), minimumServiceWords: Math.min(...Object.values(articles).map(wordCount)), professionalImages: (await fs.readdir('public/images/professionals')).filter((file) => file.endsWith('.webp')).length + (await fs.readdir('public/images/services')).filter((file) => file.endsWith('.webp')).length, prerenderedPages: manifest.length, quoteCases: 20 }, null, 2))
} finally { await server.close() }
