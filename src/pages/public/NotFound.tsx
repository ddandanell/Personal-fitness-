import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

export default function NotFound() {
  return <section className="not-found"><div className="content-shell"><p className="eyebrow">404 / Page not found</p><h1>This page is not here.</h1><p>The address may be incomplete or the page may have moved. Explore our private sessions or return to the homepage.</p><div className="cluster"><Link to="/" className="button button-primary"><ArrowLeft size={16} />Return home</Link><Link to="/services" className="button button-outline">Explore services<ArrowUpRight size={16} /></Link></div></div></section>
}
