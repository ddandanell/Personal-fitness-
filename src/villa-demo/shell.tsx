import { RESCHEDULE_NOTE, TRAVEL_DISCLAIMER, REPLY_HOURS } from '@/data/offerCopy'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import { ArrowUpRight, CalendarDays, CircleHelp, Leaf, MapPin, QrCode, X } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import { pageMetadata } from '@/lib/metadata'
import { canonicalDemoPath, demoHref, QR_LANDING } from './host'
import { QrMark } from './qr'
import './demo.css'

export function DemoLink({ to, className, children, onClick }: { to: string; className?: string; children: ReactNode; onClick?: () => void }) {
  const [path, query] = to.split('?')
  return <Link to={demoHref(path) + (query ? `?${query}` : '')} className={className} onClick={onClick}>{children}</Link>
}

export function GuestDialog({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    dialog?.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow }
  }, [])
  return <dialog ref={ref} className="sora-dialog" aria-label={title} onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <div className="dialog-heading"><h2>{title}</h2><button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog"><X size={20} /></button></div>
    {children}
  </dialog>
}

export function VillaQr({ compact = false }: { compact?: boolean }) {
  return <div className={compact ? 'villa-qr compact' : 'villa-qr'}>
    <QrMark value={QR_LANDING} label="Scan to open the Villa Sora wellness menu on your phone" />
    <div><span className="eyebrow">YOUR VILLA WELLNESS MENU</span><strong>Take a little Bali with you.</strong><p>Scan to open this menu on your phone.</p></div>
  </div>
}

const guestNav = [
  { to: '/', label: 'Services', icon: Leaf },
  { to: '/booking', label: 'My booking', icon: CalendarDays },
  { to: '/help', label: 'Help', icon: CircleHelp },
]

export function DemoShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const canonical = canonicalDemoPath(pathname)
  const meta = pageMetadata(canonical)
  const [qr, setQr] = useState(false)
  useEffect(() => {
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    document.querySelector('meta[name="robots"]')?.setAttribute('content', 'noindex, nofollow')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, meta.title, meta.description])

  function isActive(to: string) {
    if (to === '/') return canonical === '/villademo' || /\/services(?:\/|$)|\/request\//.test(canonical)
    return canonical.startsWith(`/villademo${to}`)
  }

  return <div className="sora is-guest">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Outfit:wght@300;400;500;600&display=swap" />
    <StructuredData data={{ '@context': 'https://schema.org', '@type': 'WebPage', name: meta.title, description: meta.description, url: meta.canonical }} />
    <a className="skip-link" href="#villa-demo-main">Skip to content</a>
    <header className="sora-header">
      <div className="header-inner">
        <DemoLink to="/" className="sora-mark"><span className="brand-symbol"><Leaf size={25} strokeWidth={1.2} /></span><span><strong>Villa Sora</strong><small>WELLNESS AT YOUR VILLA</small></span></DemoLink>
        <nav className="desktop-nav" aria-label="Guest navigation">{guestNav.map(({ to, label }) => <DemoLink key={to} to={to} className={isActive(to) ? 'is-active' : ''}>{label}</DemoLink>)}</nav>
        <div className="header-actions"><span className="location-label"><MapPin size={14} /> Canggu, Bali</span><button className="icon-button" type="button" aria-label="Open villa QR code" onClick={() => setQr(true)}><QrCode size={21} strokeWidth={1.4} /></button></div>
      </div>
    </header>
    <div className="sora-frame"><main id="villa-demo-main">{children}</main></div>
    <div className="villa-policy-foot"><p>{RESCHEDULE_NOTE}</p><p>{TRAVEL_DISCLAIMER}</p><p>{REPLY_HOURS}</p></div><footer className="guest-footer"><span className="footer-brand"><Leaf size={16} /> Villa Sora</span><span>Powered by <a href="https://www.personalfitness.id/" target="_blank" rel="noreferrer">Personal Fitness <ArrowUpRight size={12} /></a></span><span className="demo-label">GUEST EXPERIENCE DEMO</span></footer>
    <nav className="sora-tabs" aria-label="Guest mobile navigation">{guestNav.map(({ to, label, icon: Icon }) => <DemoLink key={to} to={to} className={isActive(to) ? 'is-on' : ''}><Icon size={20} strokeWidth={1.5} /><span>{label}</span></DemoLink>)}</nav>
    {qr && <GuestDialog title="Your wellness menu, on your phone" onClose={() => setQr(false)}><VillaQr /><p className="qr-address">villademo.personalfitness.id</p><button type="button" className="action" onClick={() => setQr(false)}>Back to my villa</button></GuestDialog>}
  </div>
}
