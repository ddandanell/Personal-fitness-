import fs from 'node:fs/promises'
import assert from 'node:assert/strict'
import { createServer } from 'vite'

const manifest = JSON.parse(await fs.readFile('dist/route-manifest.json', 'utf8'))
const textOf = html => html.replace(/<script\b[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
let checked = 0
for (const page of manifest) {
  const html = await fs.readFile(page.path === '/' ? 'dist/index.html' : 'dist' + page.path + '.html', 'utf8')
  const text = textOf(html)
  assert.ok(!/36[ -]hours?|36 jam|\bvetted\b|Pay only on the link|payment link/i.test(text), page.path + ': superseded policy')
  assert.ok(!/Rp 50\.000\s*(?:to Rp |[-–])\s*100\.000/i.test(text), page.path + ': old Bali travel range')
  for (const match of html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)) {
    const paragraph = textOf(match[1])
    assert.ok(!/travel (?:is|of|charge(?: is)?|fee(?: is)?) Rp (?:50|100|150|200)\.000/i.test(paragraph), page.path + ': old guest travel amount')
  }
  if (!page.path.startsWith('/villademo')) {
    assert.ok(text.includes('[Company legal name]'), page.path + ': requested legal-name placeholder absent')
    assert.ok(/24 (?:hours|jam)/.test(text), page.path + ': 24-hour policy absent')
    assert.ok(text.includes('50%'), page.path + ': deposit absent')
    assert.ok(/10%/.test(text), page.path + ': partner commission absent')
  }
  checked++
}
for (const slug of ['boxing-fitness','guided-meditation','mobility-coaching','bodywork-recovery','zumba-dance-fitness']) {
  const html = await fs.readFile('dist/' + slug + '.html', 'utf8')
  const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0] || ''
  assert.ok(main.includes('request-status'), slug + ': on-request label absent')
}
const team = await fs.readFile('dist/team.html','utf8')
const teamMain = team.match(/<main\b[\s\S]*?<\/main>/)?.[0] || ''
assert.ok(!/<img[^>]+(?:professionals|founder|coach)/.test(teamMain), 'Public coach photos remain held')
const server = await createServer({server:{middlewareMode:true},appType:'custom',logLevel:'error'})
try {
  const {estimateQuote} = await server.ssrLoadModule('/src/lib/quote.ts')
  const {partner} = await server.ssrLoadModule('/src/config/partner.ts')
  const {getService,sessionQuote} = await server.ssrLoadModule('/src/villa-demo/data.ts')
  const base={service:'personal-training',city:'Bali',durationMin:60,participants:1}
  for(const area of ['canggu','seminyak','sanur','ubud','uluwatu']) {
    const quote=estimateQuote({...base,area})
    assert.equal(quote.total,1300000,area+': published rate must include travel')
    assert.equal(quote.travel,0)
    assert.ok(!/travel fee|not inside this total/.test(quote.notes.join(' ')))
  }
  for(const city of ['Bali','Jakarta']) assert.equal(estimateQuote({...base,city,service:'boxing-fitness',participants:2}).ok,false)
  assert.equal(estimateQuote({...base,service:'private-yoga',participants:2}).total,1050000)
  assert.equal(estimateQuote({...base,service:'private-yoga',participants:3}).ok,false)
  assert.equal(estimateQuote({...base,city:'Jakarta',area:'north-jakarta'}).ok,false)
  assert.equal(partner.COMMISSION_PCT,10)
  assert.equal(partner.COMMISSION_BASE,'guest-payment')
  const yoga=getService('private-yoga')
  assert.equal(sessionQuote(2,yoga.maxGuests,yoga.slug).total,1050000)
  const { publicServices } = await server.ssrLoadModule('/src/data/publicOffer.ts')
  const { programmes } = await server.ssrLoadModule('/src/data/catalog.ts')
  for (const city of ['Bali', 'Jakarta']) {
    for (const service of publicServices) {
      let previous = Infinity
      for (const pack of programmes) {
        const quote = estimateQuote({ ...base, city, service: service.slug, programme: pack.slug })
        assert.ok(quote.ok && quote.base >= 850000 && quote.base < previous, city + ' ' + service.slug + ' ' + pack.slug)
        assert.equal(quote.total, quote.base * pack.sessions)
        previous = quote.base
      }
    }
  }
  for (const [programme, expected] of [['single',1050000],['pack-3',1000000],['pack-5',950000],['pack-10',850000]]) {
    assert.equal(estimateQuote({...base, service:'private-yoga', programme, participants:2}).base, expected)
  }
  const { packsForService } = await server.ssrLoadModule('/src/villa-demo/data.ts')
  assert.equal(packsForService(yoga.basePrice).at(-1).total, 8500000)
  assert.equal(getService('boxing').maxGuests,1)
  assert.equal((await fs.stat('public/partners/villa-wellness-menu.pdf')).size>100000,true)
  assert.equal((await fs.stat('public/partners/villa-wellness-menu.png')).size>100000,true)
} finally {await server.close()}
console.log(JSON.stringify({passed:true,policyPages:checked,includedBaliAreas:5,boxingGuests:1,partnerCommission:'10% of guest payment',designedPartnerAssets:2}))
