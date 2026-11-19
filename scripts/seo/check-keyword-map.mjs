// Keyword lock enforcement. Reads src/data/seo/keyword-map.json and the built dist/ HTML.
// Fails the release when a page is unmapped, a primary keyword is shared, the primary keyword is
// missing from title/H1/meta, title or meta length is off, a support page does not link its money
// page, or a site copy rule is broken. See docs/SEO_SYSTEM.md.
import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'

const read = async (f) => JSON.parse(await fs.readFile(f, 'utf8'))
const map = await read('src/data/seo/keyword-map.json')
const lock = (await read('seo-keyword-lock.json')).pages
const routes = await read('dist/route-manifest.json')
const overrides = await read('src/data/seo-overrides.json')
const posts = await read('src/data/blog/posts.json')
const queue = await read('src/data/blog/queue/manifest.json')
const R = map.rules
const errors = [], warnings = []
const fail = (p, m) => errors.push(p + ': ' + m)
const warn = (p, m) => warnings.push(p + ': ' + m)

const STOP = new Set('in at the a an of for and or your to on with is my i can vs versus di ke dan yang untuk'.split(' '))
export function tokens(s) {
  return (s.toLowerCase().replace(/personalfitness\.id/g, 'personalfitness').normalize('NFKD').match(/[a-z0-9]+/g) || [])
    .filter((w) => !STOP.has(w))
    .map((w) => (w.length > 3 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w))
}
const covers = (kw, text) => { const t = new Set(tokens(text)); return tokens(kw).every((w) => t.has(w)) }
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
const strip = (s) => decode(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()
const branded = (t) => (t.includes('PersonalFitness.id') ? t : (t + ' | PersonalFitness.id').length <= 60 ? t + ' | PersonalFitness.id' : t)
const wordsBefore = (text, idx) => (text.slice(0, idx).match(/\S+/g) || []).length
const STRICT_TYPES = new Set(['home', 'service', 'service-area', 'area', 'pricing', 'partners', 'hub', 'conversion', 'support'])

// 1. Coverage: every indexable route and every lock/queue path is mapped, and nothing stale is mapped.
const indexable = routes.filter((r) => !r.noindex).map((r) => r.path)
const queued = new Set(queue.map((q) => '/resources/' + q.slug))
for (const p of indexable) if (!map.pages[p]) fail(p, 'indexable page missing from keyword-map.json')
for (const p of Object.keys(lock)) if (!map.pages[p]) fail(p, 'in seo-keyword-lock.json but missing from keyword-map.json')
for (const p of queued) if (!map.pages[p]) fail(p, 'queued guide missing from keyword-map.json')
for (const [p, e] of Object.entries(map.pages)) {
  const live = indexable.includes(p)
  if (e.status === 'live' && !live) fail(p, 'mapped as live but not an indexable route')
  if (e.status === 'queued' && !queued.has(p) && !live) fail(p, 'mapped as queued but not in the queue')
  if (e.status === 'queued' && live) warn(p, 'now live: set status to "live" in keyword-map.json')
}

// 2. One primary keyword per page (exact and same-token-set duplicates both fail).
const owners = new Map()
for (const [p, e] of Object.entries(map.pages)) {
  if (!e.primary) { fail(p, 'no primary keyword'); continue }
  const key = [...new Set(tokens(e.primary))].sort().join(' ')
  if (owners.has(key)) fail(p, `primary keyword "${e.primary}" duplicates ${owners.get(key)}`)
  owners.set(key, p)
  for (const s of e.secondary || []) {
    const other = owners.get([...new Set(tokens(s))].sort().join(' '))
    if (other && other !== p) warn(p, `secondary "${s}" equals the primary of ${other}`)
  }
}
// Secondary pass for secondaries that collide with primaries defined later in the file.
for (const [p, e] of Object.entries(map.pages)) for (const s of e.secondary || []) {
  const other = owners.get([...new Set(tokens(s))].sort().join(' '))
  if (other && other !== p && !warnings.some((w) => w.startsWith(p + ': secondary "' + s))) warn(p, `secondary "${s}" equals the primary of ${other}`)
}

// 3. Support pages must point at a live money page.
for (const [p, e] of Object.entries(map.pages)) {
  if (e.type !== 'support') continue
  const t = map.pages[e.target]
  if (!e.target || !t) fail(p, 'support page has no mapped target money page')
  else if (!t.money) fail(p, `target ${e.target} is not a money page`)
}

// 4. On-page checks against the built HTML (and the planned copy for queued guides).
function onPage(p) {
  if (indexable.includes(p)) {
    const html = existsSync(p === '/' ? 'dist/index.html' : 'dist' + p + '.html') ? (p === '/' ? 'dist/index.html' : 'dist' + p + '.html') : null
    return html
  }
  return null
}
let checked = 0
for (const [p, e] of Object.entries(map.pages)) {
  let title, description, h1
  const file = onPage(p)
  if (file) {
    const html = await fs.readFile(file, 'utf8')
    title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] || '')
    description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] || '')
    h1 = strip(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] || '')
  } else if (queued.has(p)) {
    const q = queue.find((x) => '/resources/' + x.slug === p)
    const o = overrides[p]
    title = branded(o?.title && o?.description ? o.title : q.title)
    description = o?.title && o?.description ? o.description : q.description
    h1 = o?.h1 || q.title
  } else continue
  checked++
  const strict = STRICT_TYPES.has(e.type)
  const report = strict ? fail : warn
  if (title.length > R.titleMax) report(p, `title is ${title.length} chars (max ${R.titleMax}): "${title}"`)
  if (description.length < R.metaMin || description.length > R.metaMax) report(p, `meta description is ${description.length} chars (want ${R.metaMin}-${R.metaMax})`)
  for (const [field, value] of [['title', title], ['H1', h1], ['meta description', description]])
    if (!covers(e.primary, value)) report(p, `primary keyword "${e.primary}" missing from ${field}: "${value}"`)
  for (const [field, value] of [['title', title], ['H1', h1], ['meta description', description]]) {
    if (/\(on request\)/i.test(value)) fail(p, field + ' contains "(on request)"')
    if (/travel (fee|surcharge|charge)/i.test(value)) fail(p, field + ' mentions a guest travel fee')
    if (/\[company legal name\]/i.test(value)) fail(p, field + ' shows the legal-name placeholder')
  }
}

// 5. Hero ledes stay short: no prices, no long paragraphs; villa management stays out of the home hero.
for (const [p, o] of Object.entries(overrides)) {
  if (!o.intro) continue
  const plain = o.intro.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  const n = plain.split(/\s+/).filter(Boolean).length
  if (n > R.introMaxWords) fail(p, `hero intro is ${n} words (max ${R.introMaxWords})`)
  if (/\bRp\s?\d/.test(plain)) fail(p, 'hero intro contains a price')
  if (/\(on request\)/i.test(plain)) fail(p, 'hero intro contains "(on request)"')
}
for (const p of ['/', '/id']) {
  const o = overrides[p]
  if (o && /villa manag|pengelola villa|manajer villa/i.test((o.intro || '') + ' ' + (o.h1 || ''))) fail(p, 'villa management belongs in the footer, not the home hero')
}

// 6. Blog posts and guides lift their money page with a contextual body link.
const linkPositions = (md, target) => [...md.matchAll(/\]\((\/[^)\s#?]*)[^)]*\)/g)].filter((m) => m[1] === target).map((m) => wordsBefore(md, m.index))
for (const [p, e] of Object.entries(map.pages)) {
  if (e.type !== 'support' || !e.target) continue
  const slug = p.slice('/resources/'.length)
  const post = posts.find((x) => x.slug === slug)
  const q = queue.find((x) => x.slug === slug)
  if (post || q) {
    const body = await fs.readFile(post ? 'src/data/blog/bodies/' + post.bodyFile : 'src/data/blog/queue/' + q.bodyFile, 'utf8')
    const at = linkPositions(body, e.target)
    const strictPost = Boolean(q) || (post.date || '') >= R.strictBlogFrom
    if (!at.length) fail(p, `no contextual body link to its money page ${e.target}`)
    else if (strictPost) {
      if (at[0] > R.firstLinkWords) fail(p, `first link to ${e.target} is at word ${at[0]} (must be within ${R.firstLinkWords})`)
      if (at.length < R.minTargetLinks) fail(p, `links to ${e.target} ${at.length} time(s) (needs ${R.minTargetLinks})`)
    } else if (at[0] > R.firstLinkWords) warn(p, `first link to ${e.target} is at word ${at[0]}; move it into the opening`)
  } else if (indexable.includes(p)) {
    const html = await fs.readFile('dist' + p + '.html', 'utf8')
    const prose = html.match(/<div class="content-shell privacy-prose">([\s\S]*?)<\/section>/)?.[1] || ''
    if (!prose.includes(`href="${e.target}"`)) fail(p, `no contextual body link to its money page ${e.target}`)
  }
}

// 6b. Blog backlog rows must target a money page and must not reuse any locked primary keyword.
const backlog = existsSync('src/data/seo/blog-backlog.json') ? (await read('src/data/seo/blog-backlog.json')).items : []
for (const item of backlog) {
  if (item.status === 'published') continue
  if (!map.pages[item.target]?.money) fail('blog-backlog ' + item.id, `target ${item.target} is not a mapped money page`)
  const key = [...new Set(tokens(item.keyword))].sort().join(' ')
  if (owners.has(key)) fail('blog-backlog ' + item.id, `keyword "${item.keyword}" is already the primary keyword of ${owners.get(key)}`)
}

// 7. Money pages should be supported; report coverage so the backlog can be prioritised.
const support = {}
for (const [p, e] of Object.entries(map.pages)) if (e.type === 'support' && e.target) (support[e.target] ||= []).push(p)
const unsupported = Object.entries(map.pages).filter(([p, e]) => e.money && ['P1', 'P2'].includes(e.priority) && !support[p]).map(([p]) => p)
for (const p of unsupported) warn(p, 'P1/P2 money page has no support guide yet; add one to the blog backlog')

for (const w of warnings) console.warn('warn  ' + w)
if (errors.length) {
  for (const x of errors) console.error('FAIL  ' + x)
  console.error(`\nKeyword map check failed: ${errors.length} error(s). Fix the page copy or the map (docs/SEO_SYSTEM.md), never delete a page from the map to pass.`)
  process.exit(1)
}
console.log(JSON.stringify({ passed: true, mapped: Object.keys(map.pages).length, checkedPages: checked, money: Object.values(map.pages).filter((e) => e.money).length, support: Object.values(map.pages).filter((e) => e.type === 'support').length, warnings: warnings.length }))
