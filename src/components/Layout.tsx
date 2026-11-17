import { PolicySummary, ServiceRequestBadge } from './PolicyLines'
import { publicServices } from '@/data/publicOffer'
import { serviceNameId, TRAVEL_DISCLAIMER, TRAVEL_DISCLAIMER_ID } from '@/data/offerCopy'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { hreflangFor, pageMetadata } from '@/lib/metadata'
import { installAnalytics, trackEvent, trackPageView, trackWhatsApp } from '@/lib/analytics'
import { partner } from '@/config/partner'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_EMAIL_HREF, COMPANY_MAPS_URL, COMPANY_LEGAL_NAME, SITE_ORIGIN } from '@/data/company'
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
  const isId = pathname === '/id' || pathname.startsWith('/id/')
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
              <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'nav-link nav-active' : 'nav-link'}>{label}<ServiceRequestBadge slug={to.slice(1)} lang={isId ? 'id' : 'en'} /></NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <Link to="/contact" className="button button-primary header-cta">
              <span className="header-cta-full">Check availability</span>
              <span className="header-cta-short">Check</span>
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
                  <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'nav-active' : undefined} onClick={closeMenu}>{label}<ServiceRequestBadge slug={to.slice(1)} lang={isId ? 'id' : 'en'} /></NavLink>
                ))}
              </div>
            ))}
            <div className="mobile-nav-cta">
              <Link to="/contact" className="button button-primary" onClick={closeMenu}>Check availability<ArrowUpRight size={16} /></Link>
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
            <p>{isId ? 'Sesi privat di villa, rumah, atau hotel Anda di Bali dan Jakarta. Instruktur disebutkan pada kutipan tertulis.' : 'Private sessions at your villa, home or hotel in Bali and Jakarta. Your instructor is named on the written quote.'}</p>
            <p className="footer-address">{COMPANY_LEGAL_NAME}<br /><a href={COMPANY_MAPS_URL} target="_blank" rel="noopener noreferrer">{COMPANY_ADDRESS}</a></p>
            <p className="footer-address"><a href={COMPANY_EMAIL_HREF} onClick={() => trackEvent('email_click', { location: 'footer' })}>{COMPANY_EMAIL}</a></p>
            {partner.INSTAGRAM_URL && <p className="footer-address"><a href={partner.INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a></p>}
            <p className="footer-address"><Link to="/id">Bahasa Indonesia</Link> · <Link to="/">English</Link></p>
            <Link to="/contact" className="text-link">{isId ? 'Cek ketersediaan' : 'Check availability'}<ArrowUpRight size={15} /></Link>
          </div>
          <div><p className="footer-heading">{isId ? 'Sesi' : 'Sessions'}</p>
            {publicServices.map(service => <Link to={'/' + service.slug} key={service.slug}>{isId ? serviceNameId(service.slug, service.title) : service.title} <ServiceRequestBadge slug={service.slug} lang={isId ? 'id' : 'en'} /></Link>)}
            <Link to="/services">{isId ? 'Semua sesi' : 'All sessions'}</Link><Link to="/programmes">{isId ? 'Paket' : 'Programmes'}</Link><Link to="/pricing">{isId ? 'Harga' : 'Prices'}</Link>
          </div>
          <div><p className="footer-heading">{isId ? 'Lokasi' : 'Places'}</p>
            <Link to="/bali">Bali</Link><Link to="/jakarta">Jakarta</Link><Link to="/jakarta/south-jakarta">{isId ? 'Jakarta Selatan' : 'South Jakarta'}</Link><Link to="/jakarta/central-jakarta">{isId ? 'Jakarta Pusat' : 'Central Jakarta'}</Link><Link to="/jakarta/kemang">Kemang</Link><Link to="/jakarta/menteng">Menteng</Link><Link to="/jakarta/kelapa-gading">Kelapa Gading</Link><Link to="/service-areas">{isId ? 'Semua lokasi' : 'All locations'}</Link><Link to="/how-it-works">{isId ? 'Cara kerja' : 'How it works'}</Link>
          </div>
          <div><p className="footer-heading">{isId ? 'Perusahaan' : 'Company'}</p>
            <Link to="/about">{isId ? 'Tentang kami' : 'About'}</Link><Link to="/professional-standards">{isId ? 'Standar profesional' : 'Standards'}</Link><Link to="/villa-hotel-partners">{isId ? 'Program mitra' : 'Partner programme'}</Link><Link to="/partner-terms">{isId ? 'Ketentuan mitra' : 'Partner terms'}</Link><Link to="/team">{isId ? 'Tim' : 'Team'}</Link><Link to="/id/mitra-villa">Untuk villa</Link><Link to="/resources">{isId ? 'Panduan' : 'Guides'}</Link><Link to="/faq">FAQ</Link>
          </div>
          <div><p className="footer-heading">{isId ? 'Kebijakan' : 'Policies'}</p>
            <Link to="/privacy">{isId ? 'Privasi' : 'Privacy'}</Link><Link to="/terms">{isId ? 'Ketentuan' : 'Terms'}</Link><Link to="/refunds-rescheduling">{isId ? 'Pengembalian dana' : 'Refunds'}</Link><Link to="/safety">{isId ? 'Keselamatan' : 'Safety'}</Link><Link to="/editorial-policy">{isId ? 'Editorial' : 'Editorial policy'}</Link>
          </div>
        </div>
        <div className="shell footer-bottom">
          <p>{isId ? TRAVEL_DISCLAIMER_ID : TRAVEL_DISCLAIMER}</p><p>{isId ? 'Mitra villa mendapat komisi 10% dari yang dibayar tamu, dibayar setiap bulan lewat transfer bank beserta laporan.' : 'Villa partners earn 10% of what the guest paid, paid monthly by bank transfer with a statement.'}</p>
          <PolicySummary lang={isId ? 'id' : 'en'} />
          <p>{isId ? 'WhatsApp' : 'WhatsApp'} {WHATSAPP_DISPLAY}. Email {COMPANY_EMAIL}. {isId ? 'Jangan kirim data kartu, rekening bank, identitas pribadi, atau informasi kesehatan terperinci melalui chat.' : 'Never send payment-card, bank, personal-ID or detailed health information in chat.'}</p>
        </div>
      </footer>
      <WhatsAppFloat />
    </div>
  )
}
