import { ArrowUpRight, Check } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Eyebrow, PageIntro, ParallaxImage, TextLink } from '@/components/Primitives'
import { CtaBand, PricePills } from '@/components/SiteBlocks'
import QuoteEstimator from '@/components/QuoteEstimator'
import { getService } from '@/data/catalog'
import { getSeo } from '@/data/seo'
import { blogPosts } from '@/data/blog'
import { CITY_SERVICE_RELEASED, publicServices, sessionPhoto } from '@/data/publicOffer'
import StructuredData from '@/components/StructuredData'
import { faqJsonLd, serviceJsonLd } from '@/lib/schema'
import { faqs } from '@/data/content'
import { DetailedServiceGuide } from '@/components/DetailedServiceGuide'
import NotFound from './NotFound'

export default function ServicePage({ slug: slugProp }: { slug?: string }) {
  const params = useParams()
  const service = getService(slugProp || params.slug || '')
  if (!service) return <NotFound />
  const request = '/contact?service=' + service.slug
  const seo = getSeo('/' + service.slug)
  const cityReleased = CITY_SERVICE_RELEASED.includes(service.slug as typeof CITY_SERVICE_RELEASED[number])
  const articles = blogPosts.filter((post) => post.landingPage === '/' + service.slug || post.service.toLowerCase() === service.title.toLowerCase()).slice(0, 4)
  const siblings = publicServices.filter((item) => item.slug !== service.slug).slice(0, 5)
  const pageFaqs = faqs.filter((pair) => {
    const hay = (pair[0] + ' ' + pair[1]).toLowerCase()
    return hay.includes(service.title.toLowerCase()) || hay.includes(service.slug.replace(/-/g, ' '))
  }).slice(0, 4)
  const photo = sessionPhoto(service.slug, service.image)

  return (
    <>
      <StructuredData data={serviceJsonLd(service, seo?.title, seo?.description)} />
      {pageFaqs.length >= 2 && <StructuredData data={faqJsonLd(pageFaqs)} />}
      <PageIntro eyebrow="Private session" title={seo?.title || service.title} description={seo?.description || service.description}>
        <PricePills slug={service.slug} />
        <div className="cluster" style={{ marginTop: 22 }}>
          <Link to={request} className="button button-primary">Check availability<ArrowUpRight size={16} /></Link>
          <Link to="/pricing" className="button button-outline">See session prices</Link>
        </div>
      </PageIntro>
      <section className="section-compact">
        <div className="shell service-detail-grid">
          <ParallaxImage src={photo} alt={service.imageAlt} eager />
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
        <div className="shell grid-3">
          <div>
            <Eyebrow>Who it is for</Eyebrow>
            <ul className="check-list">{service.goodFor.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul>
          </div>
          <div>
            <Eyebrow>Prepare</Eyebrow>
            <ul className="check-list">{service.prepare.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul>
          </div>
          <div>
            <Eyebrow>On the day</Eyebrow>
            <ul className="check-list">{service.expect.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul>
          </div>
        </div>
      </section>
      <DetailedServiceGuide service={service} />
      {cityReleased && (
        <section className="section-compact section-light">
          <div className="shell split-feature">
            <div>
              <Eyebrow>Cities</Eyebrow>
              <h2>Open the {service.title.toLowerCase()} page for Bali or Jakarta.</h2>
              <p className="large-copy">Each city page uses that city’s starting price, in-zone clusters and travel rules. The hour is the same session. The logistics are not.</p>
            </div>
            <div className="cluster">
              <Link to={'/bali/' + service.slug} className="button button-dark">Bali {service.title.toLowerCase()}</Link>
              <Link to={'/jakarta/' + service.slug} className="button button-outline">Jakarta {service.title.toLowerCase()}</Link>
            </div>
          </div>
        </section>
      )}
      <section className="section-compact">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Estimator</Eyebrow><h2>Estimate my price for this session.</h2></div></div>
          <QuoteEstimator compact initialService={service.slug} />
        </div>
      </section>
      {(articles.length > 0 || siblings.length > 0) && (
        <section className="section-compact section-light">
          <div className="shell split-feature">
            <div>
              <Eyebrow>Keep reading</Eyebrow>
              <h2>Related sessions and how this hour is quoted.</h2>
              <p>Prices, travel and programmes live on their own pages. Use them before you send the first WhatsApp.</p>
              <div className="cluster" style={{ marginTop: 18 }}>
                <TextLink to="/pricing">See session prices</TextLink>
                <TextLink to="/programmes">Plan a programme</TextLink>
                <TextLink to="/resources/what-to-put-in-a-whatsapp-enquiry-for-a-home-trainer">WhatsApp enquiry template</TextLink>
              </div>
            </div>
            <div>
              {articles.map((post) => (
                <p key={post.slug}><TextLink to={'/resources/' + post.slug}>{post.title}</TextLink></p>
              ))}
              {siblings.map((item) => (
                <p key={item.slug}><TextLink to={'/' + item.slug}>{item.title} at home</TextLink></p>
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand dark title={'Check ' + service.title.toLowerCase() + ' availability.'} copy="Share the city, area and a two-hour window via Contact or WhatsApp +62 811-3803-488. The written quote confirms the payable total." to={request} label="Check availability" />
    </>
  )
}
