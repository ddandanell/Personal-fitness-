import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

export default function Gone() {
  return (
    <section className="not-found">
      <div className="content-shell">
        <p className="eyebrow">410 / No longer published</p>
        <h1>This page is no longer available.</h1>
        <p>The public offer is personal training, private yoga, mat Pilates and mobility coaching at your villa or home. Older catalogue, directory and review pages have been taken down.</p>
        <div className="cluster">
          <Link to="/" className="button button-primary"><ArrowLeft size={16} />Return home</Link>
          <Link to="/services" className="button button-outline">See session prices<ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </section>
  )
}
