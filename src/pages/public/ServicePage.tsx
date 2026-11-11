import { ArrowUpRight, Check } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Eyebrow, PageIntro, ParallaxImage } from '@/components/Primitives'
import { CtaBand, PricePills } from '@/components/SiteBlocks'
import QuoteEstimator from '@/components/QuoteEstimator'
import { getService } from '@/data/catalog'
import { getSeo } from '@/data/seo'
import { SITE_ORIGIN } from '@/data/company'
import StructuredData from '@/components/StructuredData'
import NotFound from './NotFound'

export default function ServicePage({ slug: slugProp }: { slug?: string }) {
  const params = useParams()
  const service = getService(slugProp || params.slug || '')
  if (!service) return <NotFound />
  const request = '/contact?service=' + service.slug
  const seo = getSeo('/' + service.slug)
  return (
    <>
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: seo?.title || service.title,
        description: seo?.description || service.description,
        url: SITE_ORIGIN + '/' + service.slug,
        image: SITE_ORIGIN + service.image,
        serviceType: service.title,
        provider: { '@type': 'Organization', name: 'PersonalFitness.id', url: SITE_ORIGIN },
        areaServed: service.cities.map((city) => ({ '@type': 'Place', name: city })),
      }} />
      <PageIntro eyebrow="Private session" title={seo?.title || service.title} description={seo?.description || service.description}>
        <PricePills slug={service.slug} />
        <div className="cluster" style={{ marginTop: 22 }}>
          <Link to={request} className="button button-primary">Check availability<ArrowUpRight size={16} /></Link>
          <Link to="/pricing" className="button button-outline">See session prices</Link>
        </div>
      </PageIntro>
      <section className="section-compact">
        <div className="shell service-detail-grid">
          <ParallaxImage src={service.image} alt={service.imageAlt} eager />
          <div className="service-detail-copy">
            <Eyebrow>At your location</Eyebrow>
            <h2>A private {service.title.toLowerCase()} visit at your villa or home.</h2>
            <p className="large-copy">{service.short}</p>
            <ul className="check-list">{service.includes.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className="section section-light">
        <div className="shell split-feature">
          <div>
            <Eyebrow>Scope</Eyebrow>
            <h2>What this hour includes, and what it does not.</h2>
          </div>
          <div>
            <ul className="check-list large-list">{service.excludes.map((item) => <li key={item}><Check size={19} />{item}</li>)}</ul>
            <p className="small muted" style={{ marginTop: 18 }}>{service.statusNote}</p>
          </div>
        </div>
      </section>
      <section className="section-compact">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Estimator</Eyebrow><h2>Estimate my price for this session.</h2></div></div>
          <QuoteEstimator compact initialService={service.slug} />
        </div>
      </section>
      <CtaBand dark title={'Check ' + service.title.toLowerCase() + ' availability.'} copy="Share the city, area and a two-hour window. The written quote confirms the payable total." to={request} label="Check availability" />
    </>
  )
}
