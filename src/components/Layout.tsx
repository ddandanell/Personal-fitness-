import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { pageMetadata } from '@/lib/metadata'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_EMAIL_HREF, COMPANY_MAPS_URL, SITE_ORIGIN } from '@/data/company'
import { WHATSAPP_DISPLAY, whatsappDraftUrl } from '@/lib/whatsapp'
import StructuredData from './StructuredData'
import { Breadcrumbs, RelatedLinks } from './SeoCluster'
import { siteGraph } from '@/lib/schema'

const navigation = [
  ['/services', 'Services'],
  ['/pricing', 'Prices'],
  ['/how-it-works', 'How it works'],
  ['/programmes', 'Programmes'],
  ['/resources', 'Guides'],
]

const mobileGroups = [
  {
    heading: 'Sessions',
    links: [
      ['/personal-training', 'Personal training'],
      ['/private-yoga', 'Private yoga'],
      ['/mat-pilates', 'Mat Pilates'],
      ['/mobility-coaching', 'Mobility coaching'],
      ['/boxing-fitness', 'Boxing fitness'],
      ['/guided-meditation', 'Guided meditation'],
      ['/services', 'All sessions'],
    ],
  },
  {
    heading: 'Plan a visit',
    links: [
      ['/pricing', 'Prices'],
      ['/how-it-works', 'How it works'],
      ['/programmes', 'Programmes'],
      ['/resources', 'Guides'],
      ['/faq', 'FAQ'],
    ],
  },
  {
    heading: 'Places',
    links: [
      ['/bali', 'Bali'],
      ['/jakarta', 'Jakarta'],
      ['/service-areas', 'Travel and clusters'],
    ],
  },
]

export default function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setMenuOpen(false)
    const { title, description, canonical, noindex, image } = pageMetadata(pathname)
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical)
    document.querySelector('meta[property="og:type"]')?.setAttribute('content', pathname.startsWith('/resources/') ? 'article' : 'website')
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', SITE_ORIGIN + image)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description)
    document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', SITE_ORIGIN + image)
    document.querySelector('meta[name="robots"]')?.setAttribute('content', noindex ? 'noindex, follow' : 'index, follow')
  }, [pathname])

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen)
    document.body.classList.toggle('menu-open', menuOpen)
    return () => {
      document.documentElement.classList.remove('menu-open')
      document.body.classList.remove('menu-open')
    }
  }, [menuOpen])

  return (
    <div className={'app-shell' + (menuOpen ? ' is-menu-open' : '')}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <StructuredData data={siteGraph()} />
      <header className="site-header">
        <div className="shell header-main">
          <Link to="/" className="brand" aria-label="PersonalFitness.id home"><img src="/brand/personalfitness-mark.png" width="38" height="38" decoding="async" alt="" /><span>PersonalFitness<b>.id</b><small>YOUR WELLNESS. YOUR PLACE.</small></span></Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'nav-link nav-active' : 'nav-link'}>{label}</NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <Link to="/contact" className="button button-primary header-cta">
              <span className="header-cta-full">Check availability</span>
              <span className="header-cta-short">Check</span>
              <ArrowUpRight size={15} />
            </Link>
            <button className="icon-button mobile-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
      </header>
      {menuOpen && (
        <div className="mobile-sheet" role="dialog" aria-modal="true" aria-labelledby="mobile-navigation-title">
          <button className="mobile-sheet-backdrop" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
            <div className="mobile-nav-head">
              <p className="eyebrow" id="mobile-navigation-title">Menu</p>
            </div>
            {mobileGroups.map((group) => (
              <div className="mobile-nav-group" key={group.heading}>
                <p className="footer-heading">{group.heading}</p>
                {group.links.map(([to, label]) => (
                  <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'nav-active' : undefined} onClick={() => setMenuOpen(false)}>{label}</NavLink>
                ))}
              </div>
            ))}
            <div className="mobile-nav-cta">
              <Link to="/contact" className="button button-primary" onClick={() => setMenuOpen(false)}>Check availability<ArrowUpRight size={16} /></Link>
              <a className="button button-outline" href={whatsappDraftUrl()} target="_blank" rel="noopener noreferrer">WhatsApp {WHATSAPP_DISPLAY}</a>
              <a className="button button-outline" href={COMPANY_EMAIL_HREF}>{COMPANY_EMAIL}</a>
            </div>
          </nav>
        </div>
      )}
      <main id="main-content" tabIndex={-1}>
        <Breadcrumbs path={pathname} />
        {children}
        <RelatedLinks path={pathname} />
      </main>
      <footer className="site-footer">
        <div className="shell footer-grid footer-grid-wide">
          <div className="footer-brand">
            <Link to="/" className="brand brand-light"><img src="/brand/personalfitness-mark.png" width="38" height="38" decoding="async" alt="" /><span>PersonalFitness<b>.id</b><small>YOUR WELLNESS. YOUR PLACE.</small></span></Link>
            <p>Private fitness sessions at your villa or home in Bali and Jakarta.</p>
            <p className="footer-address">
              <a href={COMPANY_MAPS_URL} target="_blank" rel="noopener noreferrer">{COMPANY_ADDRESS}</a>
            </p>
            <p className="footer-address"><a href={COMPANY_EMAIL_HREF}>{COMPANY_EMAIL}</a></p>
            <Link to="/contact" className="text-link">Check availability<ArrowUpRight size={15} /></Link>
          </div>
          <div>
            <p className="footer-heading">Sessions</p>
            <Link to="/personal-training">Personal training</Link>
            <Link to="/private-yoga">Private yoga</Link>
            <Link to="/mat-pilates">Mat Pilates</Link>
            <Link to="/mobility-coaching">Mobility coaching</Link>
            <Link to="/boxing-fitness">Boxing fitness</Link>
            <Link to="/guided-meditation">Guided meditation</Link>
            <Link to="/services">All sessions</Link>
            <Link to="/programmes">Programmes</Link>
            <Link to="/pricing">Prices</Link>
          </div>
          <div>
            <p className="footer-heading">Places</p>
            <Link to="/bali">Private fitness in Bali</Link>
            <Link to="/jakarta">Home training in Jakarta</Link>
            <Link to="/service-areas">Travel and clusters</Link>
            <Link to="/how-it-works">How it works</Link>
            <Link to="/contact">Check availability</Link>
          </div>
          <div>
            <p className="footer-heading">Company</p>
            <Link to="/about">About</Link>
            <Link to="/professional-standards">Standards</Link>
            <Link to="/villa-hotel-partners">Villa & hotel partners</Link>
            <Link to="/resources">Guides</Link>
            <Link to="/faq">FAQ</Link>
          </div>
          <div>
            <p className="footer-heading">Policies</p>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/refunds-rescheduling">Refunds</Link>
            <Link to="/safety">Safety</Link>
            <Link to="/editorial-policy">Editorial</Link>
          </div>
        </div>
        <div className="shell footer-bottom">
          <p>Starting prices: Bali personal training Rp 900.000 · Jakarta Rp 950.000. Outer-zone travel and extra people are quoted on top.</p>
          <p>WhatsApp {WHATSAPP_DISPLAY}. Email {COMPANY_EMAIL}. Never send payment-card, bank, personal-ID or detailed health information in chat.</p>
        </div>
      </footer>
      <WhatsAppFloat />
    </div>
  )
}
