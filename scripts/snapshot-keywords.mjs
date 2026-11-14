import fs from 'node:fs/promises'
import {createServer} from 'vite'
const server=await createServer({server:{middlewareMode:true},appType:'custom',logLevel:'error'})
try{
 const {indexableSeoRecords}=await server.ssrLoadModule('/src/data/seo.ts')
 const posts=JSON.parse(await fs.readFile('src/data/blog/posts.json','utf8'))
 const queue=JSON.parse(await fs.readFile('src/data/blog/queue/manifest.json','utf8'))
 const pages=Object.fromEntries(indexableSeoRecords().map(r=>[r.path,{primaryKeyword:r.primaryKeyword,role:r.group==='post'?'supporting-guide':r.path.split('/').filter(Boolean).length===2?'location-or-city-service':'hub-or-service',commercialOwner:posts.find(p=>'/resources/'+p.slug===r.path)?.landingPage||r.path}]))
 for(const p of queue)pages['/resources/'+p.slug]={primaryKeyword:p.primaryQuery,role:'queued-supporting-guide',commercialOwner:p.landingPage}
 await fs.writeFile('seo-keyword-lock.json',JSON.stringify({version:1,created:'2026-11-14',policy:'Preserve every existing URL and primary keyword owner. Add distinct supporting intents without copying an existing commercial intent. New entries require an explicit intent-overlap review.',pages},null,2)+'\n')
 console.log('Saved '+Object.keys(pages).length+' keyword owners')
}finally{await server.close()}
