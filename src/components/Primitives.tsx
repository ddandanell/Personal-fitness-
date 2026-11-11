import { ArrowUpRight, Check, Copy, LoaderCircle } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router'

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{children}</p>
}

export function PageIntro({ eyebrow, title, description, children }: {
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <section className="page-intro">
      <div className="shell page-intro-grid">
        <div><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1></div>
        <div className="page-intro-copy"><p>{description}</p>{children}</div>
      </div>
    </section>
  )
}

export function SectionTitle({ eyebrow, title, copy, action }: {
  eyebrow?: string
  title: string
  copy?: string
  action?: ReactNode
}) {
  return (
    <div className="section-title">
      <div>{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<h2>{title}</h2>{copy && <p>{copy}</p>}</div>
      {action && <div className="section-action">{action}</div>}
    </div>
  )
}

export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link className="text-link" to={to}>{children}<ArrowUpRight size={16} aria-hidden="true" /></Link>
}

export function Loading({ label = 'Opening page…' }: { label?: string }) {
  return <div className="loading-state" role="status"><LoaderCircle className="spin" size={22} /><p>{label}</p></div>
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return <label className="field"><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>
}

export function CopyButton({ value, label = 'Copy' }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const area = document.createElement('textarea')
      area.value = value
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      area.remove()
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }
  return <button type="button" className="button button-outline" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Copied' : label}</button>
}

export function ParallaxImage({ src, alt, caption, eager = false, className = '' }: {
  src: string
  alt: string
  caption?: string
  eager?: boolean
  className?: string
}) {
  const frame = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (eager) return
    const node = frame.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let queued = false
    let armed = false
    const update = () => {
      if (!armed) return
      const rect = node.getBoundingClientRect()
      const distance = window.innerHeight / 2 - (rect.top + rect.height / 2)
      const progress = Math.max(-1, Math.min(1, distance / (window.innerHeight + rect.height)))
      node.style.setProperty('--parallax-y', `${progress * 30}px`)
      queued = false
    }
    const onScroll = () => {
      armed = true
      if (!queued) {
        queued = true
        window.requestAnimationFrame(update)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [eager])

  return (
    <figure className={`session-figure ${className}`}>
      <div className="session-image" ref={frame}>
        <img src={src} alt={alt} width={880} height={968} sizes={eager ? '(max-width: 700px) 92vw, 42vw' : '(max-width: 700px) 92vw, 50vw'} loading={eager ? 'eager' : 'lazy'} decoding={eager ? 'sync' : 'async'} fetchPriority={eager ? 'high' : 'auto'} />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
