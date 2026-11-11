import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { getArea, getService } from '@/data/catalog'
import { getBlogPost } from '@/data/blog'
import { getResource, pageMeta } from '@/data/content'
import { getProfessional } from '@/data/professionals'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { COMPANY_ADDRESS, COMPANY_MAPS_URL } from '@/data/company'
import { WHATSAPP_DISPLAY } from '@/lib/whatsapp'

const navigation = [
  ['/services', 'Sessions'],
  ['/professionals', 'Professionals'],
  ['/bali', 'Bali'],
  ['/jakarta', 'Jakarta'],
  ['/pricing', 'Pricing'],
  ['/how-it-works', 'How it works'],
  ['/resources', 'Blog'],
]

export default function Layout({ children }: { children: ReactNode }) {
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const { pathname } = useLocation()
  const menuOpen = menuPath === pathname

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const parts = pathname.split('/').filter(Boolean)
    const service = getService(parts.at(-1) || '')
    const professional = getProfessional(parts.at(-1) || '')
    const resource = getResource(parts.at(-1) || '')
    const post = getBlogPost(parts.at(-1) || '')
    const area = getArea(parts.at(-1) || '')
    const [title, description] = post
      ? [post.title, post.description]
      : professional
      ? [`${professional.name} · ${professional.role}`, professional.focus]
      : resource
        ? [resource.title, resource.summary]
        : area
          ? [`${area.name} private sessions`, area.copy]
          : service && pathname !== '/services'
            ? [`${service.title} at Your Location`, service.short]
            : pageMeta[pathname] || ['Page Not Found', 'Return to PersonalFitness.id']
    const fullTitle = `${title} | PersonalFitness.id`
    const canonical = `https://personalfitness.id${pathname === '/' ? '/' : pathname}`
    document.title = fullTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', fullTitle)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical)
    document.querySelector('meta[property="og:type"]')?.setAttribute('content', post ? 'article' : 'website')
    const held = pathname === '/nutrition-consultation' || pathname === '/physiotherapy'
    document.querySelector('meta[name="robots"]')?.setAttribute('content', held ? 'noindex, follow' : 'index, follow')
  }, [pathname])

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuPath(null) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="site-header">
        <div className="shell header-main">
          <Link to="/" className="brand" aria-label="PersonalFitness.id home"><span>PersonalFitness</span><b>.id</b></Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'nav-link nav-active' : 'nav-link'}>{label}</NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <Link to="/contact" className="button button-primary header-cta">Get a quote<ArrowUpRight size={15} /></Link>
            <button className="icon-button mobile-menu-button" onClick={() => setMenuPath(menuOpen ? null : pathname)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
            {navigation.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setMenuPath(null)}>{label}</NavLink>)}
            <NavLink to="/contact" onClick={() => setMenuPath(null)}>Get a quote</NavLink>
            <NavLink to="/programmes" onClick={() => setMenuPath(null)}>Programmes</NavLink>
            <NavLink to="/faq" onClick={() => setMenuPath(null)}>FAQ</NavLink>
          </nav>
        )}
      </header>
      <main id="main-content" tabIndex={-1}>{children}</main>
      <footer className="site-footer">
        <div className="shell footer-grid footer-grid-wide">
          <div className="footer-brand">
            <Link to="/" className="brand brand-light"><span>PersonalFitness</span><b>.id</b></Link>
            <p>Private sessions at villas and homes in Bali and Jakarta. Published prices. Named professionals.</p>
            <p className="footer-address">
              <a href={COMPANY_MAPS_URL} target="_blank" rel="noopener noreferrer">{COMPANY_ADDRESS}</a>
            </p>
            <Link to="/contact" className="text-link">Get a quote<ArrowUpRight size={15} /></Link>
          </div>
          <div>
            <p className="footer-heading">Sessions</p>
            <Link to="/personal-training">Personal training</Link>
            <Link to="/private-yoga">Private yoga</Link>
            <Link to="/mat-pilates">Mat Pilates</Link>
            <Link to="/mobility-coaching">Mobility</Link>
            <Link to="/programmes">Programmes</Link>
          </div>
          <div>
            <p className="footer-heading">Places</p>
            <Link to="/bali">Bali</Link>
            <Link to="/jakarta">Jakarta</Link>
            <Link to="/bali/canggu">Canggu</Link>
            <Link to="/jakarta/south-jakarta">South Jakarta</Link>
            <Link to="/service-areas">All areas</Link>
          </div>
          <div>
            <p className="footer-heading">Company</p>
            <Link to="/professionals">Professionals</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/about">About</Link>
            <Link to="/reviews">Guest notes</Link>
            <Link to="/resources">Blog</Link>
            <Link to="/faq">FAQ</Link>
          </div>
          <div>
            <p className="footer-heading">Policies</p>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/refunds-rescheduling">Refunds</Link>
            <Link to="/safety">Safety</Link>
            <Link to="/professional-standards">Standards</Link>
          </div>
        </div>
        <div className="shell footer-bottom">
          <p>Starting prices: Bali personal training Rp 900.000 · Jakarta Rp 950.000. Outer-zone travel and extra people are quoted on top.</p>
          <p>WhatsApp {WHATSAPP_DISPLAY}. Never send payment-card, bank, personal-ID or detailed health information in chat.</p>
        </div>
      </footer>
      <WhatsAppFloat />
    </div>
  )
}
