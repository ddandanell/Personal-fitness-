import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { services } from '@/pages/public/serviceRegistry'

const navigation = [
  ['/services', 'Services'],
  ['/locations', 'Locations'],
  ['/how-it-works', 'How it works'],
  ['/pricing', 'Pricing'],
  ['/about', 'About'],
  ['/faq', 'FAQ'],
]

const pageMeta: Record<string, [string, string]> = {
  '/': ['Private Fitness at Your Location', 'Personal training, private yoga and mat Pilates coordinated for your space in Bali and Jakarta.'],
  '/services': ['Personal Training, Private Yoga & Mat Pilates', 'Explore private fitness sessions coordinated around your goals, setting and schedule.'],
  '/locations': ['Bali & Jakarta Session Enquiries', 'Enquire about private fitness sessions at your villa, home or suitable space in Bali and Jakarta.'],
  '/how-it-works': ['How Your Private Session Works', 'From your first enquiry to a clear quote, confirmed session and aftercare.'],
  '/pricing': ['Clear Personalised Session Quotes', 'See what shapes your private session quote and what we confirm before you pay.'],
  '/about': ['About PersonalFitness.id', 'Private fitness with coordinated details, clear communication and support around your session.'],
  '/faq': ['Private Session Questions', 'Practical answers about locations, pricing, equipment, groups, availability and session terms.'],
  '/privacy': ['Privacy on This Website', 'How the enquiry helper works on your device and how to keep sensitive details out of chat.'],
  '/contact': ['Check Session Availability', 'Tell us about your preferred private fitness session in Bali or Jakarta.'],
}

export default function Layout({ children }: { children: ReactNode }) {
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const { pathname } = useLocation()
  const menuOpen = menuPath === pathname

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const service = pathname.startsWith('/services/') ? services.find((item) => item.slug === pathname.split('/').pop()) : undefined
    const [title, description] = service
      ? [`${service.title} at Your Location`, service.short]
      : pageMeta[pathname] || ['Page Not Found', 'Return to PersonalFitness.id private fitness services.']
    document.title = `${title} | PersonalFitness.id`
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
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
            {navigation.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'nav-link nav-active' : 'nav-link'}>{label}</NavLink>)}
          </nav>
          <div className="header-actions">
            <Link to="/contact" className="button button-primary header-cta">Check availability<ArrowUpRight size={15} /></Link>
            <button className="icon-button mobile-menu-button" onClick={() => setMenuPath(menuOpen ? null : pathname)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
        {menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{navigation.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}<NavLink to="/contact">Check availability</NavLink></nav>}
      </header>
      <main id="main-content" tabIndex={-1}>{children}</main>
      <footer className="site-footer">
        <div className="shell footer-grid">
          <div className="footer-brand"><Link to="/" className="brand brand-light"><span>PersonalFitness</span><b>.id</b></Link><p>Private fitness sessions, coordinated for your space in Bali and Jakarta.</p><Link to="/contact" className="text-link">Start your enquiry<ArrowUpRight size={15} /></Link></div>
          <div><p className="footer-heading">Explore</p><Link to="/services">Services</Link><Link to="/locations">Locations</Link><Link to="/how-it-works">How it works</Link></div>
          <div><p className="footer-heading">Company</p><Link to="/about">About</Link><Link to="/pricing">Pricing</Link><Link to="/faq">Questions</Link></div>
          <div><p className="footer-heading">Support</p><Link to="/contact">Check availability</Link><Link to="/privacy">Privacy</Link></div>
        </div>
        <div className="shell footer-bottom"><p>Your professional, location, schedule, full price and terms are confirmed before your session.</p><p>Never send payment-card, financial-account, personal-ID or detailed health details in WhatsApp.</p></div>
      </footer>
    </div>
  )
}
