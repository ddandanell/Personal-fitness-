import { useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import StructuredData from '@/components/StructuredData'
import { pageMetadata } from '@/lib/metadata'
import { COMPANY_EMAIL, COMPANY_EMAIL_HREF } from '@/data/company'
import { canonicalDemoPath, demoHref } from './host'
import './demo.css'

const links = [
  ['/', 'Preview'],
  ['/stay/house-lima', 'Guest page'],
  ['/card/house-lima', 'Room card'],
  ['/desk', 'The desk'],
]

export function DemoLink({ to, className, children, onClick }: { to: string; className?: string; children: ReactNode; onClick?: () => void }) {
  return <Link to={demoHref(to)} className={className} onClick={onClick}>{children}</Link>
}

export function DemoShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const [openFor, setOpenFor] = useState<string | null>(null)
  const open = openFor === pathname
  const canonical = canonicalDemoPath(pathname)
  const meta = pageMetadata(canonical)
  const overlay = canonical === '/villademo'

  useEffect(() => {
    const { title, description } = pageMetadata(canonicalDemoPath(pathname))
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[name="robots"]')?.setAttribute('content', 'noindex, follow')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="arunika">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Outfit:wght@300;400;500&display=swap" />
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: meta.title,
        description: meta.description,
        url: meta.canonical,
        isPartOf: { '@type': 'WebSite', name: 'PersonalFitness.id', url: 'https://www.personalfitness.id/' },
      }} />
      <a className="skip-link" href="#villa-demo-main">Skip to content</a>
      <header className={overlay ? 'arunika-top is-overlay' : 'arunika-top is-solid'}>
        <DemoLink to="/" className="arunika-brand">
          <strong>Arunika</strong>
          <span>Houses · Bali</span>
        </DemoLink>
        <nav className="arunika-nav" aria-label="Preview">
          {links.map(([to, label]) => (
            <DemoLink key={to} to={to} className={canonical === canonicalDemoPath(demoHref(to)) || (to !== '/' && canonical.startsWith(canonicalDemoPath(demoHref(to)))) ? 'is-on' : undefined}>{label}</DemoLink>
          ))}
        </nav>
        <button className="menu-toggle" type="button" aria-expanded={open} onClick={() => setOpenFor((current) => current === pathname ? null : pathname)}>{open ? 'Close' : 'Menu'}</button>
        <span className="arunika-badge">Demo</span>
      </header>
      {open && (
        <nav className="arunika-sheet" aria-label="Preview menu">
          {links.map(([to, label]) => <DemoLink key={to} to={to} onClick={() => setOpenFor(null)}>{label}</DemoLink>)}
          <a href={COMPANY_EMAIL_HREF}>{COMPANY_EMAIL}</a>
        </nav>
      )}
      <main id="villa-demo-main" className="arunika-main">{children}</main>
      <footer className="arunika-foot wrap">
        <p>Arunika Houses is fictional. Instructor names, ratings and bookings are sample material for this preview.</p>
        <p className="quiet">PersonalFitness.id coordinates the hour. A single 60-minute session in this preview is Rp 1.050.000. Nothing here sends email or takes payment. Photographs from Unsplash.</p>
        <p><a className="text-link" href={COMPANY_EMAIL_HREF}>{COMPANY_EMAIL}</a></p>
      </footer>
    </div>
  )
}
