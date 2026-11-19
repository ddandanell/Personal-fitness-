// GSC optimisation report for the keyword lock system (docs/SEO_SYSTEM.md).
// Search Console is reached through the Google Search Console connector (MCP), not an API key in this repo.
// Pull two exports with query_search_analytics (last 90 days, dataState "all") and save them as
//   docs/seo/gsc/<date>-query-page.json  (dimensions ["query","page"], rowLimit 5000)
//   docs/seo/gsc/<date>-page.json        (dimensions ["page"], rowLimit 1000)
// then run: npm run seo:report [-- --date 2026-11-19 --min-impressions 50]
// Output: docs/seo/gsc-report-<date>.md and .json. Read-only for site copy; you apply the actions and log them.
import fs from 'node:fs/promises'

const args = Object.fromEntries(process.argv.slice(2).join(' ').split('--').filter(Boolean).map((a) => a.trim().split(/\s+/)).map(([k, v]) => [k, v ?? true]))
const dir = 'docs/seo/gsc'
const files = (await fs.readdir(dir)).filter((f) => f.endsWith('-query-page.json')).sort()
const date = args.date || files.at(-1)?.slice(0, 10)
if (!date) throw new Error('No GSC export in docs/seo/gsc. Pull one through the Search Console connector first.')
const minImpr = Number(args['min-impressions'] || 50)
const read = async (f) => JSON.parse(await fs.readFile(f, 'utf8'))
const qp = (await read(`${dir}/${date}-query-page.json`)).rows
const pg = (await read(`${dir}/${date}-page.json`)).rows
const map = (await read('src/data/seo/keyword-map.json')).pages
const changelog = await read('src/data/seo/changelog.json')
const ORIGIN = /^https?:\/\/(www\.)?personalfitness\.id/
const path = (u) => (u.replace(ORIGIN, '').replace(/[?#].*$/, '') || '/')
// Expected CTR floor by average position. Below this, the snippet (title/meta) is the problem, not the ranking.
const ctrFloor = (pos) => (pos <= 3 ? 0.08 : pos <= 5 ? 0.04 : pos <= 10 ? 0.015 : 0)
const owner = (p) => (map[p]?.type === 'support' ? map[p].target : p)

const pages = {}
for (const r of pg) {
  const p = path(r.keys[0])
  const x = (pages[p] ||= { impressions: 0, clicks: 0, posSum: 0 })
  x.impressions += r.impressions; x.clicks += r.clicks; x.posSum += r.position * r.impressions
}
const rows = Object.entries(pages).map(([p, x]) => ({ page: p, impressions: x.impressions, clicks: x.clicks, ctr: x.clicks / x.impressions, position: x.posSum / x.impressions, type: map[p]?.type || 'unmapped', primary: map[p]?.primary || null })).sort((a, b) => b.impressions - a.impressions)

// A. Snippet rewrites: money pages with enough impressions and CTR below the floor for their position.
const rewrite = rows.filter((r) => map[r.page]?.money && r.impressions >= minImpr && r.position <= 10 && r.ctr < ctrFloor(r.position))
// A2. Watchlist while data is thin: money pages with impressions and zero clicks.
const watch = rows.filter((r) => map[r.page]?.money && r.impressions >= 5 && r.clicks === 0 && !rewrite.includes(r))
// B. Striking distance: queries at position 5-20 -> support posts for the money page that owns the landing page.
const striking = qp.filter((r) => r.position >= 5 && r.position <= 20).map((r) => ({ query: r.keys[0], page: path(r.keys[1]), moneyPage: owner(path(r.keys[1])), impressions: r.impressions, position: r.position }))
  .filter((r) => r.moneyPage && map[r.moneyPage]?.money).sort((a, b) => b.impressions - a.impressions)
// C. Cannibalisation: one query showing two or more of our URLs.
const byQuery = {}
for (const r of qp) (byQuery[r.keys[0]] ||= []).push({ page: path(r.keys[1]), impressions: r.impressions, position: r.position })
const cannibal = Object.entries(byQuery).filter(([, v]) => new Set(v.map((x) => x.page)).size > 1).map(([q, v]) => ({ query: q, pages: v.sort((a, b) => a.position - b.position) }))
// D. Misrouted: a query matches another page's locked primary/secondary better than the page Google picked.
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
const lockedBy = {}
for (const [p, e] of Object.entries(map)) for (const k of [e.primary, ...(e.secondary || [])]) lockedBy[norm(k)] ||= p
const misrouted = qp.map((r) => ({ query: r.keys[0], landed: path(r.keys[1]), lockedTo: lockedBy[norm(r.keys[0])], impressions: r.impressions, position: r.position })).filter((r) => r.lockedTo && r.lockedTo !== r.landed && owner(r.landed) !== r.lockedTo)
// E. Changes due for evaluation (about 28 days after the change).
const due = changelog.entries.filter((e) => e.evaluateOn <= date && !e.result).map((e) => ({ ...e, now: rows.find((r) => r.page === e.page) || null }))

const pct = (x) => (x * 100).toFixed(1) + '%'
const md = [`# GSC report ${date}`, '', `Source: ${files.includes(`${date}-query-page.json`) ? dir + '/' + date + '-*.json' : 'missing'} (Search Console connector, sc-domain:personalfitness.id). Rewrite threshold: ${minImpr}+ impressions.`, '',
  '## Pages', '', '| Page | Type | Locked primary | Impr | Clicks | CTR | Pos |', '|---|---|---|---|---|---|---|',
  ...rows.map((r) => `| ${r.page} | ${r.type} | ${r.primary || '-'} | ${r.impressions} | ${r.clicks} | ${pct(r.ctr)} | ${r.position.toFixed(1)} |`), '',
  '## A. Rewrite title/meta (CTR below floor for position)', '', ...(rewrite.length ? rewrite.map((r) => `- ${r.page}: ${r.impressions} impr, CTR ${pct(r.ctr)} at pos ${r.position.toFixed(1)}. Rewrite title/meta around "${r.primary}" and the top queries below; keep the locked H1.`) : ['- None at this threshold.']), '',
  '## A2. Watchlist (money pages, 5+ impressions, 0 clicks)', '', ...(watch.length ? watch.map((r) => `- ${r.page}: ${r.impressions} impr, pos ${r.position.toFixed(1)}`) : ['- None.']), '',
  '## B. Striking distance (pos 5-20): assign a support post to the money page', '', ...(striking.length ? striking.map((r) => `- "${r.query}" → ${r.moneyPage} (landed on ${r.page}, ${r.impressions} impr, pos ${r.position.toFixed(1)})`) : ['- None.']), '',
  '## C. Cannibalisation (one query, several URLs)', '', ...(cannibal.length ? cannibal.map((c) => `- "${c.query}": ${c.pages.map((x) => `${x.page} (pos ${x.position.toFixed(0)})`).join(', ')}`) : ['- None.']), '',
  '## D. Misrouted queries (Google picked a different page than the lock)', '', ...(misrouted.length ? misrouted.map((m) => `- "${m.query}" landed on ${m.landed} (pos ${m.position.toFixed(0)}), locked to ${m.lockedTo}. Strengthen ${m.lockedTo} and link to it from ${m.landed}.`) : ['- None.']), '',
  '## E. Changes due for evaluation', '', ...(due.length ? due.map((e) => `- ${e.date} ${e.page}: baseline ${e.baseline.impressions} impr / ${e.baseline.clicks} clicks / pos ${e.baseline.position ?? '-'} → now ${e.now ? `${e.now.impressions} / ${e.now.clicks} / pos ${e.now.position.toFixed(1)}` : 'no data'}. Record the result in changelog.json.`) : ['- None due yet.']), '']
await fs.writeFile(`docs/seo/gsc-report-${date}.md`, md.join('\n'))
await fs.writeFile(`docs/seo/gsc-report-${date}.json`, JSON.stringify({ date, minImpressions: minImpr, pages: rows, rewrite, watch, striking, cannibal, misrouted, due: due.map((e) => e.page) }, null, 1) + '\n')
console.log(JSON.stringify({ date, pages: rows.length, rewrite: rewrite.length, watch: watch.length, striking: striking.length, cannibal: cannibal.length, misrouted: misrouted.length, due: due.length }))
