import fs from 'node:fs/promises'
import assert from 'node:assert/strict'
const origin='https://www.personalfitness.id'
const expected=process.argv[2]
assert.match(expected||'',/^[a-f0-9]{40}$/,'Pass the exact published commit SHA')
async function request(path,method='GET'){
 const response=await fetch(origin+path,{method,signal:AbortSignal.timeout(20000),headers:{'cache-control':'no-cache'}})
 assert.equal(response.status,200,path+': expected HTTP 200')
 return response
}
const build=await (await request('/build-info.json')).json()
assert.equal(build.revision,expected,'Production is serving a different revision')
const local=JSON.parse(await fs.readFile('docs/seo/page-audit.json','utf8'))
const imageRegistry=JSON.parse(await fs.readFile('src/data/page-images.json','utf8'))
const pages=local.pages.filter(p=>p.localMinimum||p.path==='/'||p.path==='/resources/private-yoga-or-mat-pilates-choosing-a-home-session')
const sitemap=await (await request('/sitemap-pages.xml')).text()
let index=0;const results=[]
await Promise.all(Array.from({length:4},async()=>{
 while(index<pages.length){
  const page=pages[index++];const html=await (await request(page.path)).text()
  assert.ok(html.includes('rel="canonical" href="'+origin+page.path+'"'),page.path+': wrong canonical')
  assert.ok(html.includes('name="robots" content="index, follow"'),page.path+': indexing disabled')
  const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1]||''
  const words=(main.replace(/<script\b[\s\S]*?<\/script>/g,' ').replace(/<nav\b[\s\S]*?<\/nav>/g,' ').replace(/<[^>]+>/g,' ').match(/[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu)||[]).length
  if(page.localMinimum){assert.ok(words>=1000,page.path+': less than 1000 words');assert.ok(sitemap.includes('<loc>'+origin+page.path+'</loc>'),page.path+': missing from live sitemap')}
  const image=imageRegistry[page.path]
  if(image){assert.ok(main.includes(image.src),page.path+': primary image absent');const response=await request(image.src,'HEAD');assert.ok(response.headers.get('content-type')?.includes('image/'),image.src+': wrong image type');await request(image.src.replace('.webp','-640.webp'),'HEAD')}
  results.push({path:page.path,words})
 }
}))
console.log(JSON.stringify({passed:true,revision:expected,livePages:results.length,locationPages:results.filter(p=>local.pages.find(x=>x.path===p.path)?.localMinimum).length,minimumLocationWords:Math.min(...results.filter(p=>local.pages.find(x=>x.path===p.path)?.localMinimum).map(p=>p.words))}))
