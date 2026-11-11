import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { cityAreas, type City } from '@/data/catalog'
import { pageMetadata } from '@/lib/metadata'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { COMPANY_ADDRESS, COMPANY_MAPS_URL } from '@/data/company'
import { WHATSAPP_DISPLAY } from '@/lib/whatsapp'
import StructuredData from './StructuredData'

const navigation = [
  ['/services', 'Sessions'],
  ['/professionals', 'Professionals'],
  ['/wellness-plan', 'Build a plan'],
  ['/pricing', 'Pricing'],
  ['/how-it-works', 'How it works'],
  ['/resources', 'Blog'],
]

export default function Layout({ children }: { children: ReactNode }) {
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const [locationsPath, setLocationsPath] = useState<string | null>(null)
  const { pathname } = useLocation()
  const menuOpen = menuPath === pathname
  const locationsOpen = locationsPath === pathname

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const { title, description, canonical, noindex, image } = pageMetadata(pathname)
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical)
    document.querySelector('meta[property="og:type"]')?.setAttribute('content', pathname.startsWith('/resources/') ? 'article' : 'website')
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', 'https://personalfitness.id' + image)
    document.querySelector('meta[name="robots"]')?.setAttribute('content', noindex ? 'noindex, follow' : 'index, follow')
  }, [pathname])

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuPath(null); setLocationsPath(null) } }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <StructuredData data={{ '@context': 'https://schema.org', '@type': 'Organization', name: 'PersonalFitness.id', url: 'https://personalfitness.id', logo: 'https://personalfitness.id/brand/personalfitness-mark.png', telephone: '+628113703805', areaServed: ['Bali', 'Jakarta'] }} />
      <header className="site-header">
        <div className="shell header-main">
          <Link to="/" className="brand" aria-label="PersonalFitness.id home"><img src="/brand/personalfitness-mark.png" width="40" height="40" alt="" /><span>PersonalFitness<b>.id</b><small>YOUR WELLNESS. YOUR PLACE.</small></span></Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map(([to, label], index) => <div className="nav-item" key={to}>
              {index === 2 && <div className="locations-navigation"><button className={'nav-link locations-toggle' + (pathname.startsWith('/bali') || pathname.startsWith('/jakarta') ? ' nav-active' : '')} type="button" aria-expanded={locationsOpen} aria-controls="locations-dropdown" onClick={() => setLocationsPath(locationsOpen ? null : pathname)}>Locations<ChevronDown size={13} /></button>{locationsOpen && <div className="locations-dropdown" id="locations-dropdown"><div className="locations-dropdown-heading"><span>Wellness, where you are.</span><Link to="/service-areas" onClick={() => setLocationsPath(null)}>All areas<ArrowUpRight size={14} /></Link></div><div className="locations-columns">{(['Bali', 'Jakarta'] as City[]).map((city) => <div key={city}><Link className="locations-city-link" to={'/' + city.toLowerCase()} onClick={() => setLocationsPath(null)}>{city}<ArrowUpRight size={15} /></Link>{cityAreas(city).map((area) => <Link to={'/' + city.toLowerCase() + '/' + area.slug} onClick={() => setLocationsPath(null)} key={area.slug}>{area.name}<small>{area.travelQuote ? 'By request' : area.travelFee ? 'Travel extra' : 'In-zone'}</small></Link>)}</div>)}</div></div>}</div>}
              <NavLink to={to} className={({ isActive }) => isActive ? 'nav-link nav-active' : 'nav-link'} onClick={() => setLocationsPath(null)}>{label}</NavLink>
            </div>)}
          </nav>
          <div className="header-actions">
            <Link to="/contact" className="button button-primary header-cta">Get a quote<ArrowUpRight size={15} /></Link>
            <button className="icon-button mobile-menu-button" onClick={() => setMenuPath(menuOpen ? null : pathname)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
            {navigation.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setMenuPath(null)}>{label}</NavLink>)}
            <div className="mobile-locations"><p className="eyebrow">Locations</p>{(['Bali', 'Jakarta'] as City[]).map((city) => <details key={city}><summary>{city}<ChevronDown size={16} /></summary><Link to={'/' + city.toLowerCase()} onClick={() => setMenuPath(null)}>Explore {city}</Link>{cityAreas(city).map((area) => <Link to={'/' + city.toLowerCase() + '/' + area.slug} onClick={() => setMenuPath(null)} key={area.slug}>{area.name}{area.travelQuote ? ' · by request' : ''}</Link>)}</details>)}</div>
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
            <Link to="/" className="brand brand-light"><img src="/brand/personalfitness-mark.png" width="40" height="40" alt="" /><span>PersonalFitness<b>.id</b><small>YOUR WELLNESS. YOUR PLACE.</small></span></Link>
            <p>Fitness and wellness at your home or villa. Explore the right format, then confirm the actual professional and full quote.</p>
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
            <Link to="/massage-and-bodywork">Private massage</Link>
            <Link to="/nutrition-consultation">Nutrition requests</Link>
            <Link to="/services">All wellness services</Link>
            <Link to="/programmes">Programmes</Link>
            <Link to="/wellness-plan">Build a wellness schedule</Link>
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
            <Link to="/villa-hotel-partners">Villa & hotel partners</Link>
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
