import { Link } from 'react-router'
import type { ReactNode } from 'react'
import { PHOTO_CAPTION } from '@/data/offerCopy'

function emphasis(text: string, key: string | number): ReactNode {
  if (!text.includes('**')) return <span key={key}>{text}</span>
  return <span key={key}>{text.split(/(\*\*[^*]+\*\*)/g).map((piece, index) => /^\*\*[^*]+\*\*$/.test(piece) ? <strong key={index}>{piece.slice(2, -2)}</strong> : piece)}</span>
}

function inline(text: string): ReactNode[] {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (!match) return emphasis(part, index)
    const [, label, href] = match
    if (href.startsWith('http')) {
      return <a key={index} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
    }
    return <Link key={index} to={href}>{label}</Link>
  })
}

export function ArticleBody({ markdown }: { markdown: string }) {
  const blocks = markdown.trim().split(/\n{2,}/)
  return (
    <div className="article-prose">
      {blocks.map((block, index) => {
        const lines = block.split('\n')
        const image = block.trim().match(/^!\[([^\]]+)\]\((\/images\/[^)\s]+\.webp)\)$/)
        if (image) {
          const [, alt, src] = image
          return (
            <figure key={index} className="article-figure">
              <img src={src} srcSet={`${src.replace('.webp', '-640.webp')} 640w, ${src} 1440w`} sizes="(max-width: 760px) 92vw, 720px" alt={alt} width="1440" height="960" loading="lazy" decoding="async" />
              <figcaption className="small muted">{PHOTO_CAPTION}</figcaption>
            </figure>
          )
        }
        if (lines[0].startsWith('## ')) return <h2 key={index}>{lines[0].slice(3)}</h2>
        if (lines[0].startsWith('### ')) return <h3 key={index}>{lines[0].slice(4)}</h3>
        if (lines.every((line) => line.startsWith('- '))) {
          return <ul key={index}>{lines.map((line) => <li key={line}>{inline(line.slice(2))}</li>)}</ul>
        }
        if (lines.every((line) => /^\d+\.\s/.test(line))) {
          return <ol key={index}>{lines.map((line) => <li key={line}>{inline(line.replace(/^\d+\.\s/, ''))}</li>)}</ol>
        }
        return <p key={index}>{inline(block.replace(/\n/g, ' '))}</p>
      })}
    </div>
  )
}

