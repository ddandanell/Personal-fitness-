import { useEffect, useId, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import StructuredData from '@/components/StructuredData'
import { pageMetadata } from '@/lib/metadata'
import { HELP_EMAIL } from './data'
import { useDemoState } from './demo-state'
import { canonicalDemoPath, demoHref } from './host'
import './demo.css'

function applyDocumentMeta(title: string, description: string) {
  document.title = title
  document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  document.querySelector('meta[name="robots"]')?.setAttribute('content', 'noindex, follow')
}

export function DemoLink({ to, className, children, onClick }: { to: string; className?: string; children: ReactNode; onClick?: () => void }) {
  const href = to.includes('?') ? demoHref(to.slice(0, to.indexOf('?'))) + to.slice(to.indexOf('?')) : demoHref(to)
  return <Link to={href} className={className} onClick={onClick}>{children}</Link>
}

const guestNav = [
  ['/', 'Services'],
  ['/booking', 'My booking'],
  ['/help', 'Help'],
] as const

function isGuestSurface(path: string) {
  return path === '/villademo'
    || path === '/v/villa-sora'
    || path.startsWith('/v/villa-sora/')
    || path.startsWith('/q/')
    || /^\/villademo\/(services|request|help|booking)/.test(path)
    || /^\/(services|request|help|booking)/.test(path)
}

export function DemoShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const canonical = canonicalDemoPath(pathname)
  const meta = pageMetadata(canonical)
  const guest = isGuestSurface(canonical) || isGuestSurface(pathname)
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const menu = menuPath === pathname
  const titleId = useId()

  useEffect(() => {
    applyDocumentMeta(meta.title, meta.description)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, meta.title, meta.description])

  return (
    <div className={guest ? 'sora is-guest' : 'sora is-desk'}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Outfit:wght@300;400;500;600&display=swap" />
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: meta.title,
        description: meta.description,
        url: meta.canonical,
        isPartOf: { '@type': 'WebSite', name: 'PersonalFitness.id', url: 'https://www.personalfitness.id/' },
      }} />
      <a className="skip-link" href="#villa-demo-main">Skip to content</a>
      {guest && (
        <aside className="sora-stage">
          <p className="eyebrow">Sales demonstration</p>
          <h2>The guest sees only Villa Sora.</h2>
          <p>Built for villa managers. The shared QR opens this menu. It does not list anyone’s booking. The written quote and the sample commission stay on the other side of the demo.</p>
          <DemoLink to="/how-it-works" className="stage-link">How it works for a villa</DemoLink>
        </aside>
      )}
      <div className="sora-frame">
        <header className="sora-top">
          <DemoLink to={guest ? '/' : '/portal'} className="sora-mark">
            <strong>{guest ? 'Villa Sora' : 'Personal Fitness'}</strong>
            <span>{guest ? 'Canggu' : 'For managers'}</span>
          </DemoLink>
          <button type="button" className="demo-badge" aria-expanded={menu} aria-controls={titleId} onClick={() => setMenuPath(pathname)}>Demo</button>
        </header>
        <main id="villa-demo-main">{children}</main>
        {guest ? (
          <nav className="sora-tabs" aria-label="Guest">
            {guestNav.map(([to, label]) => {
              const active = canonical === canonicalDemoPath(demoHref(to)) || (to === '/' && (canonical === '/villademo' || canonical.startsWith('/villademo/services') || canonical.startsWith('/villademo/request')))
              return <DemoLink key={to} to={to} className={active ? 'is-on' : undefined}>{label}</DemoLink>
            })}
          </nav>
        ) : (
          <footer className="sora-foot">
            <p>Villa Sora is fictional. Bookings, instructors and the 10% commission are sample figures for this demonstration.</p>
            <p><a href={`mailto:${HELP_EMAIL}`}>{HELP_EMAIL}</a></p>
          </footer>
        )}
      </div>
      {menu && <DemoMenu titleId={titleId} onClose={() => setMenuPath(null)} />}
    </div>
  )
}

function DemoMenu({ titleId, onClose }: { titleId: string; onClose: () => void }) {
  const { reset } = useDemoState()
  const items = [
    ['/', 'Guest menu'],
    ['/walkthrough', 'Guided walkthrough'],
    ['/how-it-works', 'How it works'],
    ['/partner', 'Villa partner desk'],
    ['/ops', 'Operations'],
    ['/card', 'QR card'],
    ['/setup', 'Request a villa setup'],
  ] as const
  return (
    <div className="demo-layer" role="presentation" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="demo-sheet" onClick={(event) => event.stopPropagation()}>
        <p id={titleId} className="eyebrow">Demonstration</p>
        <h2>Switch view</h2>
        <p>These views share this browser only. The villa QR never opens another guest’s booking.</p>
        <nav aria-label="Demo views">
          {items.map(([to, label]) => <DemoLink key={to} to={to} onClick={onClose}>{label}</DemoLink>)}
        </nav>
        <button type="button" className="texty" onClick={() => { reset(); onClose() }}>Reset this browser’s request</button>
        <button type="button" className="texty" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
