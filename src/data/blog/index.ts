import type { BlogPost, BlogPostRecord } from './types'
import records from './posts.json' with { type: 'json' }

const bodies = import.meta.glob('./bodies/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

function loadBody(file: string) {
  const body = bodies['./bodies/' + file]
  if (!body) throw new Error('Missing blog body ' + file)
  return body
}

export const blogPosts: BlogPost[] = (records as BlogPostRecord[]).map((record) => ({
  ...record,
  body: loadBody(record.bodyFile),
}))

export function getBlogPost(slug: string) {
  return blogPosts.find((item) => item.slug === slug)
}

export function relatedPosts(slug: string) {
  const current = getBlogPost(slug)
  if (!current) return blogPosts.slice(0, 3)
  return blogPosts.filter((item) => item.slug !== slug && (item.service === current.service || item.city === current.city || item.service === 'Booking')).slice(0, 4)
}
