import { ArrowUpRight, Check, Clock3, Users, MapPin } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router'
import { Eyebrow, PageIntro, ParallaxImage } from '@/components/Primitives'
import { CtaBand, PricePills, ProfessionalGrid } from '@/components/SiteBlocks'
import QuoteEstimator from '@/components/QuoteEstimator'
import { getService, type WellnessOffer } from '@/data/catalog'
import { professionalsFor } from '@/data/professionals'
import articleData from '@/data/service-articles.json'
import { formatIdr } from '@/lib/money'
import NotFound from './NotFound'

function formatDuration(offer: WellnessOffer) {
  if (offer.priceUnit === 'per_12_visit_programme') return 'A counted programme'
  if (offer.priceUnit === 'per_7_days_coordination_only') return '7 days coordination'
  return offer.durationMin ? String(offer.durationMin) + ' minutes' : 'Period agreed by quote'
}

export default function ServicePage({ slug: slugProp }: { slug?: string }) {
  const params = useParams()
  const service = getService(slugProp || params.slug || '')
  const { hash } = useLocation()
  useEffect(() => { if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ block: 'start' }) }, [hash, service?.slug])
  if (!service) return <NotFound />
  const people = professionalsFor({ service: service.slug })
  const article = (articleData as Record<string, { title: string; body: string }[]>)[service.slug] || []
  const published = Object.values(service.prices).some(Boolean)
  const clinical = ['physiotherapy', 'occupational-therapy', 'speech-therapy', 'psychology', 'acupuncture', 'lactation-support'].includes(service.slug)
  const cta = clinical ? 'Ask about a specialist' : service.slug === 'wellness-equipment-rental' ? 'Request an equipment quote' : 'Plan this service'
  const request = '/contact?service=' + service.slug
  return <>
    <PageIntro eyebrow={service.category + ' · ' + (service.status === 'core' ? 'Core session' : 'By request')} title={service.title} description={service.description}>
      {published ? <PricePills slug={service.slug} /> : <p className="service-request-label">A personal quote for your exact format and location.</p>}
      <div className="cluster" style={{ marginTop: 22 }}><Link to={request} className="button button-primary">{cta}<ArrowUpRight size={16} /></Link><a href="#formats" className="button button-outline">Explore formats</a></div>
    </PageIntro>
    <section className="section-compact"><div className="shell service-detail-grid">
      <ParallaxImage src={service.image} alt={service.imageAlt} caption="AI-generated illustrative professional and setting. Your actual professional is confirmed separately." eager />
      <div className="service-detail-copy"><Eyebrow>Thoughtfully coordinated</Eyebrow><h2>A private visit that fits your plans.</h2><p className="large-copy">{service.short}</p><ul className="check-list">{service.includes.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul><p className="status-note">{service.statusNote}</p></div>
    </div></section>
    <section className="section section-light" id="formats"><div className="shell">
      <div className="section-title"><div><Eyebrow>Your choices</Eyebrow><h2>{service.offers.length === 1 ? 'One considered format.' : String(service.offers.length) + ' ways to make it yours.'}</h2><p>Choose a format to prefill your enquiry. Guide prices help with planning; your written quote confirms the complete payable total and actual availability.</p></div></div>
      <div className="offer-grid">{service.offers.map((offer) => <article className="offer-card" id={offer.slug} key={offer.id}>
        <>{offer.image && <img className="offer-photo" src={offer.image} alt={offer.imageAlt || offer.name} loading="lazy" width="1200" height="800" />}</>
        <p className="eyebrow">{offer.id} · {offer.quoteOnly ? 'Specialist or custom quote' : 'Private format'}</p><h3>{offer.name}</h3><p>{offer.description}</p>
        <div className="offer-facts"><span><Clock3 size={15} />{formatDuration(offer)}</span><span><Users size={15} />{offer.participants ? 'Up to ' + offer.participants + (offer.participants === 1 ? ' person' : ' people') : 'Scope agreed first'}</span><span><MapPin size={15} />{offer.deliveryMode === 'pool' ? 'Suitable private pool' : offer.deliveryMode === 'rental' ? 'Delivery and setup' : offer.deliveryMode === 'doorstep-route' ? 'From your property' : offer.deliveryMode === 'clinical-home' ? 'Approved private setting' : offer.deliveryMode === 'existing-equipment' ? 'Existing equipment required' : offer.deliveryMode === 'workplace' ? 'Your workplace' : 'Home or villa request'}</span></div>
        <p className="offer-price">{offer.guidePrice ? <><strong>{formatIdr(offer.guidePrice)}</strong><span>{offer.priceUnit === 'per_7_days_coordination_only' ? 'Coordination fee guide; sessions extra' : 'Indicative Bali format price'}</span></> : <><strong>Written quote</strong><span>Equipment, ingredients or programme scope agreed first</span></>}</p>
        <p className="offer-requirement">{offer.requirement}</p><Link to={request + '&offer=' + offer.id} className="text-link">Enquire about this format<ArrowUpRight size={15} /></Link>
      </article>)}</div>
    </div></section>
    <section className="section"><div className="shell service-reading-layout"><div className="service-article">{article.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}</div><aside className="service-reading-aside"><Eyebrow>A little preparation</Eyebrow><h3>Before your visit</h3><ul>{service.prepare.map((item) => <li key={item}>{item}</li>)}</ul><h3>Outside the agreed scope</h3><ul>{service.excludes.map((item) => <li key={item}>{item}</li>)}</ul><Link to={request} className="button button-primary">{cta}<ArrowUpRight size={15} /></Link></aside></div></section>
    {people.length > 0 && <section className="section-compact section-light"><div className="shell"><div className="section-title"><div><Eyebrow>Find your approach</Eyebrow><h2>Explore the kind of support you prefer.</h2><p>These are illustrative profile guides with generated portraits. We confirm the actual professional, credentials and availability in your quote.</p></div><Link to="/professionals" className="text-link">All profile guides<ArrowUpRight size={16} /></Link></div><ProfessionalGrid people={people} /></div></section>}
    {published && <section className="section-compact"><div className="shell"><div className="section-title"><div><Eyebrow>Planning estimate</Eyebrow><h2>Put your visit together.</h2></div></div><QuoteEstimator compact initialService={service.slug} /></div></section>}
    <CtaBand dark title={'Bring ' + service.title.toLowerCase() + ' to your plans.'} copy="Share the city, area, date window and chosen format. We check professional fit, practical requirements and the full price before confirmation." to={request} label={cta} />
  </>
}
