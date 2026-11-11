import { ArrowUpRight, Check } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Eyebrow, PageIntro, ParallaxImage } from '@/components/Primitives'
import { CtaBand, PricePills, ProfessionalGrid } from '@/components/SiteBlocks'
import QuoteEstimator from '@/components/QuoteEstimator'
import { getService } from '@/data/catalog'
import { professionalsFor } from '@/data/professionals'
import { formatIdr } from '@/lib/money'
import NotFound from './NotFound'

export default function ServicePage({ slug: slugProp }: { slug?: string }) {
  const params = useParams()
  const service = getService(slugProp || params.slug || '')
  if (!service) return <NotFound />
  const people = professionalsFor({ service: service.slug })
  const bali = service.prices.Bali
  const jakarta = service.prices.Jakarta

  return (
    <>
      <PageIntro eyebrow={service.status === 'core' ? 'Core session' : service.status === 'partner' ? 'Partner service' : 'By request'} title={service.title} description={service.description}>
        <PricePills slug={service.slug} />
        <div className="cluster" style={{ marginTop: 22 }}>
          <Link to={`/contact?service=${service.slug}`} className="button button-primary">Get this quote<ArrowUpRight size={16} /></Link>
          <Link to="/professionals" className="button button-outline">See professionals</Link>
        </div>
      </PageIntro>

      <section className="section">
        <div className="shell service-detail-grid">
          <ParallaxImage src={service.image} alt={service.imageAlt} caption="Representative session imagery. Your professional and room are confirmed on the quote." eager />
          <div className="service-detail-copy">
            <Eyebrow>Included</Eyebrow>
            <ul className="check-list large-list">{service.includes.map((item) => <li key={item}><Check size={19} />{item}</li>)}</ul>
            <div className="detail-block">
              <h2>Not included</h2>
              <ul>{service.excludes.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <p className="status-note">{service.statusNote}</p>
          </div>
        </div>
      </section>

      <section className="section-compact section-light">
        <div className="shell split-feature">
          <div>
            <Eyebrow>A good fit</Eyebrow>
            <h2>Who this session is for.</h2>
          </div>
          <ul className="check-list large-list">{service.goodFor.map((item) => <li key={item}><Check size={19} />{item}</li>)}</ul>
        </div>
      </section>

      <section className="section-compact">
        <div className="shell split-feature">
          <div>
            <Eyebrow>Before we confirm</Eyebrow>
            <h2>Prepare the space. We prepare the rest.</h2>
          </div>
          <ul className="numbered-list">{service.prepare.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ul>
        </div>
      </section>

      {(bali || jakarta) && (
        <section className="section-compact section-dark">
          <div className="shell">
            <div className="section-title">
              <div>
                <Eyebrow light>Published rates</Eyebrow>
                <h2>Starting prices, then the extras.</h2>
                <p>Standard duration is {service.durationMin} minutes. Extra people, outer-zone travel and 90-minute sessions are added in the estimator.</p>
              </div>
            </div>
            <div className="price-board">
              {bali ? <div><span>Bali</span><strong>{formatIdr(bali)}</strong><p>Up to {service.includedParticipants} {service.includedParticipants === 1 ? 'person' : 'people'}</p></div> : null}
              {jakarta ? <div><span>Jakarta</span><strong>{formatIdr(jakarta)}</strong><p>Up to {service.includedParticipants} {service.includedParticipants === 1 ? 'person' : 'people'}</p></div> : <div><span>Jakarta</span><strong>Not listed</strong><p>This service is Bali-first.</p></div>}
            </div>
          </div>
        </section>
      )}

      {people.length > 0 && (
        <section className="section">
          <div className="shell">
            <div className="section-title">
              <div>
                <Eyebrow>Professionals</Eyebrow>
                <h2>People we coordinate for {service.title.toLowerCase()}.</h2>
              </div>
              <Link to="/professionals" className="text-link">All professionals<ArrowUpRight size={15} /></Link>
            </div>
            <ProfessionalGrid people={people} />
          </div>
        </section>
      )}

      <section className="section-compact section-light">
        <div className="shell">
          <div className="section-title">
            <div>
              <Eyebrow>Estimate</Eyebrow>
              <h2>Price this session now.</h2>
            </div>
          </div>
          <QuoteEstimator compact />
        </div>
      </section>

      <CtaBand dark title={`Ask for ${service.title.toLowerCase()} at your place.`} copy="Name the city, area and window. We match a professional and send the full quote before payment." to={`/contact?service=${service.slug}`} label="Request this session" />
    </>
  )
}
