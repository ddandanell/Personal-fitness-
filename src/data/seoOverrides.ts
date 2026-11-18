import overrides from './seo-overrides.json' with { type: 'json' }

/**
 * On-page rewrite layer (Agentic SEO pipeline, 18-19 November 2026).
 * Title, meta description, H1 and the first paragraph under the H1 per route.
 * Keyword owners in seo-keyword-lock.json are unchanged; this file only changes copy.
 * Intro text supports inline links written as [anchor](/path).
 */
export type SeoOverride = { title: string | null; description: string | null; h1: string | null; intro: string | null }

const table = overrides as Record<string, SeoOverride>

export function seoOverride(pathname: string): SeoOverride | undefined {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
  return table[path]
}

export type IntroPart = { text: string; to?: string }

export function introParts(intro: string): IntroPart[] {
  const parts: IntroPart[] = []
  const pattern = /\[([^\]]+)\]\((\/[^)\s]*)\)/g
  let last = 0
  for (const match of intro.matchAll(pattern)) {
    if (match.index > last) parts.push({ text: intro.slice(last, match.index) })
    parts.push({ text: match[1], to: match[2] })
    last = match.index + match[0].length
  }
  if (last < intro.length) parts.push({ text: intro.slice(last) })
  return parts
}

export function introPlain(intro: string) {
  return introParts(intro).map((part) => part.text).join('')
}
