import { ArrowUpRight, Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { services } from '@/data/catalog'
import categoryData from '@/data/wellness-categories.json'
import { formatIdr } from '@/lib/money'
import { Eyebrow, PageIntro } from './Primitives'

export const wellnessCategories = categoryData

export function WellnessCategoryGrid() {
  return <div className="wellness-category-grid">{wellnessCategories.map((category) => (
    <Link key={category.id} to={`/services?category=${category.id}`} className="wellness-category-card">
      <img src={category.image} alt={`Illustrative Indonesian ${category.title.toLowerCase()} professional`} loading="lazy" width="1200" height="800" />
      <div><span>{String(category.offerCount).padStart(2, '0')} formats</span><h3>{category.title}</h3><ArrowUpRight size={19} aria-hidden="true" /></div>
    </Link>
  ))}</div>
}

export default function WellnessDirectory() {
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const category = params.get('category') || ''
  const [setting, setSetting] = useState('')
  const filtered = useMemo(() => services.filter((service) => {
    const text = `${service.title} ${service.short} ${service.category} ${service.offers.map((offer) => offer.name).join(' ')}`.toLowerCase()
    return (!category || service.categoryIds.includes(category)) && (!setting || service.deliveryModes.includes(setting)) && (!search || text.includes(search.trim().toLowerCase()))
  }), [category, search, setting])
  return <>
    <PageIntro eyebrow="Fitness, care and time for yourself" title="Wellness comes to you." description="Explore 140 service formats across 15 categories, from private training and yoga to massage, food routines and specialist support. Choose an approach, see what the visit involves and ask us to confirm the right professional for your place."><Link to="/contact" className="button button-primary">Help me choose<ArrowUpRight size={16} /></Link></PageIntro>
    <section className="section-compact wellness-directory-section"><div className="shell">
      <div className="directory-toolbar">
        <label className="directory-search"><Search size={19} aria-hidden="true" /><span className="sr-only">Search services</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Try massage, pregnancy, swimming..." type="search" /></label>
        <label className="directory-select"><span>Category</span><select value={category} onChange={(event) => { const next = new URLSearchParams(params); if (event.target.value) next.set('category', event.target.value); else next.delete('category'); setParams(next, { replace: true }) }}><option value="">Every category</option>{wellnessCategories.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
        <label className="directory-select"><span>Setting</span><select value={setting} onChange={(event) => setSetting(event.target.value)}><option value="">Every setting</option><option value="home">Home or villa</option><option value="pool">Private pool</option><option value="kitchen">Your kitchen</option><option value="workplace">Workplace</option><option value="clinical-home">Specialist home visit</option><option value="rental">Equipment rental</option><option value="doorstep-route">A route from home</option></select></label>
      </div>
      <div className="directory-result-line"><p aria-live="polite"><SlidersHorizontal size={15} />{filtered.length} service {filtered.length === 1 ? 'family' : 'families'} to explore</p><p>Exact professional and availability confirmed by quote.</p></div>
      {filtered.length ? <div className="wellness-service-grid">{filtered.map((service) => {
        const prices = service.offers.map((offer) => offer.guidePrice).filter((price): price is number => price !== null)
        const base = service.prices.Bali
        return <article className="wellness-service-card" key={service.slug}>
          <Link to={`/${service.slug}`} className="wellness-card-photo" tabIndex={-1} aria-hidden="true"><img src={service.image} alt="" loading="lazy" width="1200" height="800" /><span>{service.status === 'core' ? 'Core session' : service.status === 'partner' ? 'Specialist request' : 'By request'}</span></Link>
          <div className="wellness-card-copy"><p className="eyebrow">{service.category}</p><h2><Link to={`/${service.slug}`}>{service.title}</Link></h2><p>{service.short}</p><div className="service-format-tags">{service.offers.slice(0, 3).map((offer) => <span key={offer.id}>{offer.name}</span>)}{service.offers.length > 3 && <span>+{service.offers.length - 3} formats</span>}</div><p className="wellness-card-price">{base ? <><strong>{formatIdr(base)}</strong><span> published Bali starting rate</span></> : service.status === 'partner' ? <strong>Personal quote</strong> : prices.length ? <><strong>{formatIdr(Math.min(...prices))}</strong><span> indicative format price</span></> : <strong>Personal quote</strong>}</p><Link to={`/${service.slug}`} className="text-link">Explore the service<ArrowUpRight size={16} /></Link></div>
        </article>
      })}</div> : <div className="directory-empty"><Eyebrow>A different combination</Eyebrow><h2>Tell us what you have in mind.</h2><p>No service matches these filters. Try a broader category or let the coordinator help you choose.</p><button className="button button-outline" onClick={() => { setSearch(''); setSetting(''); setParams({}) }}>Clear filters</button><Link to="/contact" className="text-link">Ask about a service<ArrowUpRight size={16} /></Link></div>}
      <p className="image-disclosure">Images show AI-generated illustrative Indonesian professionals. Real identity, qualifications, location and availability are confirmed for the person assigned to your booking.</p>
    </div></section>
  </>
}

export function WellnessPriceGuide() {
  return <section className="section-compact section-light"><div className="shell"><div className="section-title"><div><Eyebrow>Explore the wider menu</Eyebrow><h2>A guide to every service format.</h2><p>Indicative Bali prices for planning. A written quote confirms scope, actual supply, travel, equipment and the total payable. Clinical, equipment and chef services require individual confirmation.</p></div></div>
    <div className="price-guide-groups">{wellnessCategories.map((category) => {
      const matching = services.flatMap((service) => service.offers.filter((offer) => offer.categoryId === category.id).map((offer) => ({ service, offer })))
      return <details key={category.id} className="price-guide-group"><summary><span>{category.title}</span><span>{matching.length} formats</span></summary><div className="table-scroll"><table className="wellness-price-table"><thead><tr><th>Format</th><th>Visit</th><th>People included</th><th>Planning guide</th></tr></thead><tbody>{matching.map(({ service, offer }) => <tr key={offer.id}><td><Link to={`/${service.slug}#${offer.slug}`}>{offer.name}</Link></td><td>{offer.durationMin ? (offer.priceUnit === 'per_12_visit_programme' ? '12 visits' : `${offer.durationMin} min`) : offer.priceUnit === 'per_7_days_coordination_only' ? '7 days coordination' : 'Agreed in quote'}</td><td>{offer.participants || 'By quote'}</td><td>{offer.guidePrice ? <>{formatIdr(offer.guidePrice)}{offer.quoteOnly && <small>Specialist quote required</small>}</> : 'Written quote'}</td></tr>)}</tbody></table></div></details>
    })}</div>
  </div></section>
}
