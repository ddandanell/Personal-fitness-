import fs from 'node:fs/promises'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import { createServer } from 'vite'
const manifest = JSON.parse(await fs.readFile('dist/route-manifest.json', 'utf8'))
const images = JSON.parse(await fs.readFile('src/data/page-images.json', 'utf8'))
const lock = JSON.parse(await fs.readFile('seo-keyword-lock.json', 'utf8'))
const sitemap = await fs.readFile('dist/sitemap-pages.xml','utf8') + await fs.readFile('dist/sitemap-posts.xml','utf8')
const titles = new Set(), descriptions = new Set(), hashes = new Map(), report = []
const text = html => html.replace(/<script\b[\s\S]*?<\/script>/g,' ').replace(/<style\b[\s\S]*?<\/style>/g,' ').replace(/<[^>]+>/g,' ').replace(/&[a-z#0-9]+;/gi,' ').replace(/\s+/g,' ').trim()
const wc = html => (text(html).match(/[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu)||[]).length
const server = await createServer({server:{middlewareMode:true},appType:'custom',logLevel:'error'})
try {
 const { areas } = await server.ssrLoadModule('/src/data/catalog.ts')
 const { indexableSeoRecords } = await server.ssrLoadModule('/src/data/seo.ts')
 const localPaths = new Set(['/bali','/jakarta','/service-areas',...areas.map(a=>'/' + a.city.toLowerCase() + '/' + a.slug)])
 const cityServices = /^\/(bali|jakarta)\/(personal-training|private-yoga|mat-pilates|boxing-fitness|guided-meditation)$/
 for(const record of indexableSeoRecords()) {
  assert.equal(lock.pages[record.path]?.primaryKeyword,record.primaryKeyword,record.path+': keyword owner missing or changed')
 }
 const queued = JSON.parse(await fs.readFile('src/data/blog/queue/manifest.json','utf8'))
 const published = JSON.parse(await fs.readFile('src/data/blog/posts.json','utf8'))
 const queueImages = new Set(published.map(p=>p.image))
 for(const item of queued) {
  const body=await fs.readFile('src/data/blog/queue/'+item.bodyFile,'utf8')
  assert.ok(wc(body)>=1000,item.slug+': queued guide needs 1000 words')
  assert.ok(body.includes(']('+item.landingPage+')'),item.slug+': missing commercial owner link')
  assert.equal(lock.pages['/resources/'+item.slug]?.primaryKeyword,item.primaryQuery,item.slug+': queue keyword mismatch')
  assert.ok(!queueImages.has(item.image),item.slug+': queue image is already used');queueImages.add(item.image)
  assert.equal(images['/resources/'+item.slug]?.src,item.image,item.slug+': missing image assignment')
  await fs.access('public'+item.image);await fs.access('public'+item.image.replace('.webp','-640.webp'))
 }
 const keywordOwners = new Map()
 for(const [path,entry] of Object.entries(lock.pages)) {
  const key=entry.primaryKeyword.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()
  assert.ok(!keywordOwners.has(key),`Duplicate primary keyword: ${path} and ${keywordOwners.get(key)}`)
  keywordOwners.set(key,path)
 }
 for(const route of manifest) {
  const html = await fs.readFile(route.path==='/'?'dist/index.html':'dist'+route.path+'.html','utf8')
  const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || ''
  const content=main.replace(/<nav\b[\s\S]*?<\/nav>/g,' ')
  const count=wc(content)
  const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  const title=html.match(/<title>([^<]+)<\/title>/)?.[1]
  const description=html.match(/<meta name="description" content="([^"]+)"/)?.[1]
  assert.equal(canonical,route.canonical,route.path+': canonical mismatch')
  if(!route.noindex) {
   assert.equal(canonical,'https://www.personalfitness.id'+route.path,route.path+': expected self canonical')
   assert.ok(sitemap.includes('<loc>'+canonical+'</loc>'),route.path+': absent from sitemap')
   assert.ok(!titles.has(title),route.path+': duplicate title');titles.add(title)
   assert.ok(!descriptions.has(description),route.path+': duplicate description');descriptions.add(description)
   assert.ok(!html.includes('content="noindex'),route.path+': unexpected noindex')
  }
  if(localPaths.has(route.path)||cityServices.test(route.path))assert.ok(count>=1000,route.path+': '+count+' main-content words; requires 1000')
  if(images[route.path] && !route.noindex) {
   const image=images[route.path]
   assert.ok(main.includes(image.src),route.path+': assigned primary image not rendered')
   const bytes=await fs.readFile('public'+image.src)
   assert.ok(bytes.length<400000,route.path+': image exceeds 400 KB')
   const hash=crypto.createHash('sha256').update(bytes).digest('hex')
   assert.ok(!hashes.has(hash),route.path+': duplicate primary image of '+hashes.get(hash));hashes.set(hash,route.path)
   await fs.access('public'+image.src.replace('.webp','-640.webp'))
  }
  for(const match of html.matchAll(/<img\b[^>]+>/g)) {
   const tag=match[0]
   assert.ok(/\balt="[^"]*"/.test(tag),route.path+': missing image alt')
   assert.ok(/\bwidth="\d+"/.test(tag)&&/\bheight="\d+"/.test(tag),route.path+': missing image dimensions')
   const set=tag.match(/\bsrcSet="([^"]+)"/i)?.[1]
   if(set)for(const item of set.split(',')){const src=item.trim().split(/\s+/)[0];if(src.startsWith('/'))await fs.access('public'+src)}
  }
  for(const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
   const schema=JSON.parse(match[1]);if(schema['@type']==='Article')assert.ok(schema.datePublished<='2026-11-14' || schema.datePublished<=new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Makassar'}),route.path+': future publication date')
  }
  report.push({path:route.path,mainWords:count,indexable:!route.noindex,canonical,localMinimum:localPaths.has(route.path)||cityServices.test(route.path),primaryImage:images[route.path]?.src||null})
 }
 const local=report.filter(x=>x.localMinimum)
 await fs.writeFile('docs/seo/page-audit.json',JSON.stringify({generatedAt:new Date().toISOString(),pages:report,locationPages:local.length,minimumLocationWords:Math.min(...local.map(x=>x.mainWords)),uniquePrimaryImages:hashes.size},null,2)+'\n')
 console.log(JSON.stringify({passed:true,pages:report.length,locationPages:local.length,minimumLocationWords:Math.min(...local.map(x=>x.mainWords)),uniquePrimaryImages:hashes.size,lockedKeywords:keywordOwners.size}))
}finally{await server.close()}
