import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { hreflangFor, pageMetadata } from '@/lib/metadata'
import { installAnalytics, trackEvent, trackPageView, trackWhatsApp } from '@/lib/analytics'
import { partner } from '@/config/partner'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_EMAIL_HREF, COMPANY_MAPS_URL, SITE_ORIGIN } from '@/data/company'
import { capturePartnerRef, partnerRef, WHATSAPP_DISPLAY, whatsappDraftUrl } from '@/lib/whatsapp'
import StructuredData from './StructuredData'
import { Breadcrumbs, RelatedLinks } from './SeoCluster'
import { siteGraph } from '@/lib/schema'

const navigation = [
  ['/services', 'Services'],
  ['/pricing', 'Prices'],
  ['/how-it-works', 'How it works'],
  ['/villa-hotel-partners', 'For villa managers'],
  ['/resources', 'Guides'],
]

const mobileGroups = [
  {
    heading: 'Sessions',
    links: [
      ['/personal-training', 'Private Strength Training'],
      ['/bodywork-recovery', 'Bodywork & Recovery'],
      ['/zumba-dance-fitness', 'Zumba & Dance Fitness'],
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
      ['/villa-hotel-partners', 'For villa managers'],
    ],
  },
  {
    heading: 'Places',
    links: [
      ['/bali', 'Bali'],
      ['/jakarta', 'Jakarta'],
      ['/jakarta/south-jakarta', 'South Jakarta'],
      ['/jakarta/central-jakarta', 'Central Jakarta'],
      ['/jakarta/kemang', 'Kemang'],
      ['/jakarta/menteng', 'Menteng'],
      ['/jakarta/kelapa-gading', 'Kelapa Gading'],
      ['/service-areas', 'All locations'],
    ],
  },
]

export default function Layout({ children }: { children?: ReactNode }) {
  const { pathname, search } = useLocation()
  const routeKey = pathname + search
  const [openFor, setOpenFor] = useState<string | null>(null)
  const menuOpen = openFor === routeKey
  const closeMenu = () => setOpenFor(null)
  const toggleMenu = () => setOpenFor((current) => current === routeKey ? null : routeKey)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    capturePartnerRef(search)
    const { title, description, canonical, noindex, image, imageAlt, imageWidth, imageHeight, region, placename, htmlLang, locale } = pageMetadata(pathname)
    const hideIndex = noindex || (pathname === '/contact' && Boolean(search))
    document.title = title
    document.documentElement.lang = htmlLang
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical)
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((node) => node.remove())
    const canonicalLink = document.querySelector('link[rel="canonical"]')
    hreflangFor(pathname).forEach((tag) => {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = tag.hreflang
      link.href = tag.href
      canonicalLink?.parentNode?.insertBefore(link, canonicalLink)
    })
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', locale)
    document.querySelector('meta[name="geo.region"]')?.setAttribute('content', region)
    document.querySelector('meta[name="geo.placename"]')?.setAttribute('content', placename)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical)
    document.querySelector('meta[property="og:type"]')?.setAttribute('content', pathname.startsWith('/resources/') ? 'article' : 'website')
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', SITE_ORIGIN + image)
    document.querySelector('meta[property="og:image:alt"]')?.setAttribute('content', imageAlt)
    document.querySelector('meta[property="og:image:width"]')?.setAttribute('content', imageWidth)
    document.querySelector('meta[property="og:image:height"]')?.setAttribute('content', imageHeight)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description)
    document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', SITE_ORIGIN + image)
    document.querySelector('meta[name="twitter:image:alt"]')?.setAttribute('content', imageAlt)
    document.querySelector('meta[name="robots"]')?.setAttribute('content', hideIndex ? 'noindex, follow' : 'index, follow')
    document.body.classList.toggle('print-a5', pathname === '/partners/menu')
    installAnalytics()
    trackPageView(pathname + search)
    const code = partnerRef()
    if (code) trackEvent('partner_code', { partner_code: code })
  }, [pathname, search])

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpenFor(null) }
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
              <span className="header-cta-full">Talk to us</span>
              <span className="header-cta-short">Talk</span>
              <ArrowUpRight size={15} />
            </Link>
            <button className="icon-button mobile-menu-button" onClick={toggleMenu} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
      </header>
      {menuOpen && (
        <div className="mobile-sheet" role="dialog" aria-modal="true" aria-labelledby="mobile-navigation-title">
          <button className="mobile-sheet-backdrop" type="button" aria-label="Close menu" onClick={closeMenu} />
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
            <div className="mobile-nav-head">
              <p className="eyebrow" id="mobile-navigation-title">Menu</p>
            </div>
            {mobileGroups.map((group) => (
              <div className="mobile-nav-group" key={group.heading}>
                <p className="footer-heading">{group.heading}</p>
                {group.links.map(([to, label]) => (
                  <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'nav-active' : undefined} onClick={closeMenu}>{label}</NavLink>
                ))}
              </div>
            ))}
            <div className="mobile-nav-cta">
              <Link to="/contact" className="button button-primary" onClick={closeMenu}>Offer this to your guests<ArrowUpRight size={16} /></Link>
              <a className="button button-outline" href={whatsappDraftUrl()} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp('mobile_menu')}>WhatsApp {WHATSAPP_DISPLAY}</a>
              <a className="button button-outline" href={COMPANY_EMAIL_HREF} onClick={() => trackEvent('email_click', { location: 'mobile_menu' })}>{COMPANY_EMAIL}</a>
            </div>
          </nav>
        </div>
      )}
      <main id="main-content" tabIndex={-1}>
        <Breadcrumbs path={pathname} />
        {children ?? <Outlet />}
        <RelatedLinks path={pathname} />
      </main>
      <footer className="site-footer">
        <div className="shell footer-grid footer-grid-wide">
          <div className="footer-brand">
            <Link to="/" className="brand brand-light"><img src="/brand/personalfitness-mark.png" width="38" height="38" decoding="async" alt="" /><span>PersonalFitness<b>.id</b><small>YOUR WELLNESS. YOUR PLACE.</small></span></Link>
            <p>Private fitness for villa guests in Bali and Jakarta. Managers earn a commission. Guests pay us.</p>
            <p className="footer-address">
              <a href={COMPANY_MAPS_URL} target="_blank" rel="noopener noreferrer">{COMPANY_ADDRESS}</a>
            </p>
            <p className="footer-address"><a href={COMPANY_EMAIL_HREF} onClick={() => trackEvent('email_click', { location: 'footer' })}>{COMPANY_EMAIL}</a></p>
            {partner.INSTAGRAM_URL && <p className="footer-address"><a href={partner.INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a></p>}
            <p className="footer-address"><Link to="/id">Bahasa Indonesia</Link> · <Link to="/">English</Link></p>
            <Link to="/contact" className="text-link">Talk to us<ArrowUpRight size={15} /></Link>
          </div>
          <div>
            <p className="footer-heading">Sessions</p>
            <Link to="/personal-training">Private Strength Training</Link>
            <Link to="/bodywork-recovery">Bodywork & Recovery</Link>
            <Link to="/zumba-dance-fitness">Zumba & Dance Fitness</Link>
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
            <Link to="/jakarta/south-jakarta">South Jakarta</Link>
            <Link to="/jakarta/kemang">Kemang</Link>
            <Link to="/jakarta/menteng">Menteng</Link>
            <Link to="/jakarta/kelapa-gading">Kelapa Gading</Link>
            <Link to="/service-areas">All locations</Link>
            <Link to="/how-it-works">How it works</Link>
            <Link to="/contact">Talk to us</Link>
          </div>
          <div>
            <p className="footer-heading">Company</p>
            <Link to="/about">About</Link>
            <Link to="/professional-standards">Standards</Link>
            <Link to="/villa-hotel-partners">Partner programme</Link>
            <Link to="/partner-terms">Partner terms</Link>
            <Link to="/team">Team</Link>
            <Link to="/id/mitra-villa">Untuk villa</Link>
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
          <p>Private strength training starts at Rp 1.050.000 for 60 minutes. Session packs reduce that rate. Outer-area travel is confirmed in the written quote.</p>
          <p>WhatsApp {WHATSAPP_DISPLAY}. Email {COMPANY_EMAIL}. Never send payment-card, bank, personal-ID or detailed health information in chat.</p>
        </div>
      </footer>
      <WhatsAppFloat />
    </div>
  )
}
