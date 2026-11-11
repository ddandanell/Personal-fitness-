import { Link } from 'react-router'
import type { ReactNode } from 'react'

function inline(text: string): ReactNode[] {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (!match) return <span key={index}>{part}</span>
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

