import fs from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const queueDir = path.join(root, 'src/data/blog/queue')
const bodiesDir = path.join(root, 'src/data/blog/bodies')
const postsFile = path.join(root, 'src/data/blog/posts.json')
const manifestFile = path.join(queueDir, 'manifest.json')
const llmsFile = path.join(root, 'public/llms.txt')
const stateFile = path.join(queueDir, 'state.json')
const origin = 'https://www.personalfitness.id'

const forbidden = [
  'AI-generated',
  'illustrative profile',
  '140 service',
  '53 service',
  'AggregateRating',
  'NIB',
]

function publicationDate() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Makassar' })
}

function wordCount(text) {
  return text.trim().split(/\s+/).filter((token) => /[A-Za-z0-9]/.test(token)).length
}

function assertSafe(item, body) {
  const hay = (item.title + ' ' + item.description + ' ' + body).toLowerCase()
  for (const phrase of forbidden) {
    if (hay.includes(phrase.toLowerCase())) throw new Error(item.slug + ' failed lock: ' + phrase)
  }
  if (wordCount(body) < 1000) throw new Error(item.slug + ' needs at least 1,000 words')
  const links = body.match(/\[[^\]]+\]\(\/[^)]+\)/g) || []
  if (links.length < 3) throw new Error(item.slug + ' needs at least three internal links')
  if (!body.includes('personalfitness.id') && !body.includes('811-3803-488')) {
    throw new Error(item.slug + ' must cite WhatsApp or the canonical host')
  }
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'))
  } catch (error) {
    if (fallback !== undefined && error.code === 'ENOENT') return fallback
    throw error
  }
}

const state = await readJson(stateFile, { lastPublished: null })
const today = publicationDate()
if (state.lastPublished === today) {
  console.log(JSON.stringify({ skipped: true, reason: 'already-published-today', date: today }))
  process.exit(0)
}

const manifest = await readJson(manifestFile, [])
if (!manifest.length) {
  throw new Error('Publishing queue is empty; replenish it before claiming a daily release.')
}

const posts = await readJson(postsFile)
const next = manifest[0]
if (posts.some((item) => item.slug === next.slug)) throw new Error('Slug already published: ' + next.slug)

const source = path.join(queueDir, next.bodyFile)
const body = await fs.readFile(source, 'utf8')
assertSafe(next, body)
if (!body.includes('](' + next.landingPage + ')')) throw new Error('Missing contextual commercial-owner link')
if (!next.image?.startsWith('/images/editorial/')) throw new Error('A distinct original editorial image is required')
if (posts.some(item => item.image === next.image)) throw new Error('Primary image already belongs to a published guide')
await fs.access(path.join(root, 'public', next.image))
await fs.access(path.join(root, 'public', next.image.replace('.webp', '-640.webp')))
const lock = await readJson(path.join(root, 'seo-keyword-lock.json'))
if (lock.pages['/resources/' + next.slug]?.primaryKeyword !== next.primaryQuery) throw new Error('Missing or changed keyword owner')
const imageManifest = await readJson(path.join(root, 'src/data/page-images.json'))
if (imageManifest['/resources/' + next.slug]?.src !== next.image) throw new Error('Missing matching page image record')

await fs.copyFile(source, path.join(bodiesDir, next.bodyFile))
await fs.unlink(source)

const record = { ...next, date: today }
posts.push(record)
await fs.writeFile(postsFile, JSON.stringify(posts, null, 2) + '\n')
await fs.writeFile(manifestFile, JSON.stringify(manifest.slice(1), null, 2) + '\n')
await fs.writeFile(stateFile, JSON.stringify({ lastPublished: today, lastSlug: record.slug }, null, 2) + '\n')

let llms = await fs.readFile(llmsFile, 'utf8')
const url = origin + '/resources/' + record.slug
if (!llms.includes(url)) {
  llms = llms.replace('## Not booked here', '- ' + url + '\n\n## Not booked here')
  await fs.writeFile(llmsFile, llms)
}

console.log(JSON.stringify({ published: true, slug: record.slug, date: today, words: wordCount(body), remaining: manifest.length - 1 }))
