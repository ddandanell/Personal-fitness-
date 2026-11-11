import { ArrowUpRight, Check, MapPin } from 'lucide-react'
import { Link, Navigate, useLocation, useParams } from 'react-router'
import { Eyebrow, PageIntro, ParallaxImage, TextLink } from '@/components/Primitives'
import { CtaBand } from '@/components/SiteBlocks'
import QuoteEstimator from '@/components/QuoteEstimator'
import { cities, getArea, getService, type City } from '@/data/catalog'
import { CITY_SERVICE_RELEASED, offerState, publicServices, sessionPhoto } from '@/data/publicOffer'
import { formatIdr } from '@/lib/money'
import StructuredData from '@/components/StructuredData'
import { cityServiceJsonLd } from '@/lib/schema'
import { getSeo } from '@/data/seo'
import Gone from './Gone'
import HeldService from './HeldService'
import NotFound from './NotFound'

const images: Record<City, [string, string]> = {
  Bali: ['/images/professionals/lila-prameswari.webp', 'Private fitness at a Bali villa'],
  Jakarta: ['/images/professionals/nadia-putri.webp', 'Home personal training in a Jakarta apartment'],
}

const citySpace: Record<string, Record<City, string>> = {
  'personal-training': {
    Bali: 'A dry indoor rectangle that can hold a mat plus two steps each way is enough. A villa gym helps. It is not required.',
    Jakarta: 'A living-room rectangle and a written lobby plan are enough. A building gym is optional and only useful if it is private.',
  },
  'private-yoga': {
    Bali: 'Indoor tile or wood beats a midday deck. Two people are included when the floor allows both mats without a walkway fight.',
    Jakarta: 'A quiet room with a door that can close matters more than a view. Two people share the published rate if the floor holds both.',
  },
  'mat-pilates': {
    Bali: 'Mat work needs a level indoor floor. There is no reformer in the van, and a glossy pool deck is a poor substitute.',
    Jakarta: 'Rug corners and furniture have to move before the hour starts. Extra people are billed. A reformer is not part of this visit.',
  },
  'boxing-fitness': {
    Bali: 'Pad work needs ceiling clearance and a floor that will not slide. Wet decks and glass corners fail the space check. One person only.',
    Jakarta: 'Pad rhythm is a neighbour issue. Thin walls and evening building rules belong on the first message. One person only.',
  },
  'guided-meditation': {
    Bali: 'A room that can be quiet for 60 minutes is the product. Wind, staff crossing and a video call in the next chair will eat the sit.',
    Jakarta: 'Shared walls and renovation noise should be named before the quote. Two people are included if both can sit without splitting the hour.',
  },
}

export function CityPage({ city }: { city: City }) {
  const data = cities[city]
  const [image, alt] = images[city]
  const cityPath = city.toLowerCase()

  return (
    <>
      <PageIntro eyebrow={city} title={data.headline} description={data.lede}>
        <p className="price-highlight">{city === 'Bali' ? `Starting price · personal training ${formatIdr(900_000)} · 60 minutes · in-zone Canggu and Seminyak` : `Starting price · personal training ${formatIdr(950_000)} · 60 minutes · in-zone South and Central Jakarta`}</p>
        <div className="cluster">
          <Link to={`/contact?city=${city}`} className="button button-primary">Check {city} availability<ArrowUpRight size={16} /></Link>
          <Link to={`/${cityPath}/personal-training`} className="button button-outline">{city} personal training</Link>
          <Link to="/pricing" className="button button-outline">See session prices</Link>
        </div>
      </PageIntro>
      <section className="section">
        <div className="shell city-feature">
          <ParallaxImage src={image} alt={alt} eager />
          <div className="city-copy">
            <p className="eyebrow"><MapPin size={14} />{city} clusters</p>
            <h2>Published clusters, with travel written on the quote.</h2>
            <ul className="check-list">{data.clusters.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul>
            <ul className="check-list" style={{ marginTop: 24 }}>{data.notes.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className="section-compact section-light">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Sessions</Eyebrow><h2>{city} sessions with a published starting price.</h2></div></div>
          <div className="service-card-grid">
            {publicServices.filter((item) => item.cities.includes(city)).map((service, index) => (
              <Link to={CITY_SERVICE_RELEASED.includes(service.slug as typeof CITY_SERVICE_RELEASED[number]) ? `/${cityPath}/${service.slug}` : `/${service.slug}`} className="service-card" key={service.slug}>
                <div className="service-card-image"><img src={sessionPhoto(service.slug, service.image)} alt={service.imageAlt} width="800" height="870" loading="lazy" decoding="async" /></div>
                <span className="service-index">0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.prices[city] ? `Starting price ${formatIdr(service.prices[city]!)} / ${service.durationMin} min` : service.short}</p>
                <span className="text-link">{service.title} in {city}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand dark title={`Tell us where in ${city}.`} copy="Area, venue type and a two-hour window are enough to start the availability check." to={`/contact?city=${city}`} label="Check availability" />
    </>
  )
}

function useCityFromPath(): City | undefined {
  const { pathname } = useLocation()
  if (pathname.startsWith('/bali')) return 'Bali'
  if (pathname.startsWith('/jakarta')) return 'Jakarta'
  return undefined
}

export function AreaPage() {
  const { slug } = useParams()
  const city = useCityFromPath()
  const area = slug ? getArea(slug) : undefined
  if (!city || !area || area.city !== city) return <NotFound />
  const cityPath = city === 'Bali' ? 'bali' : 'jakarta'

  return (
    <>
      <PageIntro eyebrow={`${area.city} · ${area.cluster}`} title={(getSeo('/' + cityPath + '/' + area.slug)?.title || ('Private fitness in ' + area.name)) + '.'} description={getSeo('/' + cityPath + '/' + area.slug)?.description || area.copy}>
        <p className="price-highlight">{area.travelQuote ? 'Availability and travel confirmed by written quote' : area.travelFee ? `Travel ${formatIdr(area.travelFee)} per visit` : 'In-zone travel included in the session starting price'}</p>
        <Link to={`/contact?city=${area.city}&area=${area.slug}`} className="button button-primary">Check availability<ArrowUpRight size={16} /></Link>
      </PageIntro>
      <section className="section-compact">
        <div className="shell split-feature">
          <div><Eyebrow>Venues we can use</Eyebrow><h2>{area.driveNote}</h2></div>
          <ul className="check-list large-list">{area.venues.map((item) => <li key={item}><Check size={19} />{item}</li>)}</ul>
        </div>
      </section>
      <section className="section-compact section-light">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Sessions</Eyebrow><h2>Core sessions we can quote for {area.name}.</h2><p>Starting prices for this cluster follow the {area.city} session page for each service, then travel if you are outside the in-zone list.</p></div></div>
          <div className="area-grid">
            {publicServices.map((service) => (
              <Link to={CITY_SERVICE_RELEASED.includes(service.slug as typeof CITY_SERVICE_RELEASED[number]) ? `/${cityPath}/${service.slug}` : `/${service.slug}`} className="area-card" key={service.slug}>
                <p className="eyebrow">{area.name}</p>
                <h3>{service.title}</h3>
                <p>{service.prices[city] ? `${formatIdr(service.prices[city]!)} starting price` : 'Written quote'}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand dark title={`Request ${area.name}.`} copy="We confirm availability after a timing and access check." to={`/contact?city=${area.city}&area=${area.slug}`} label="Check availability" />
    </>
  )
}

export function CityServicePage() {
  const { slug } = useParams()
  const city = useCityFromPath()
  const service = slug ? getService(slug) : undefined
  if (!city || !service || !service.cities.includes(city)) return <NotFound />
  const price = service.prices[city]
  const cityPath = city.toLowerCase()
  const seo = getSeo('/' + cityPath + '/' + service.slug)
  const access = city === 'Bali'
    ? 'Villa gates, staff briefings and a dry indoor floor matter more than a pin on a map. Canggu and Seminyak sit inside the published rate. Ubud and Sanur add Rp 150.000 travel. Uluwatu adds Rp 200.000. The Denpasar office is an office, not a walk-in studio.'
    : 'Lifts, visitor passes, parking and a usable indoor rectangle go on the quote. South and Central Jakarta are in-zone. North, West, East and BSD are timing-and-travel checks. We do not claim Greater Jakarta coverage.'
  const siblings = publicServices.filter((item) => item.slug !== service.slug && CITY_SERVICE_RELEASED.includes(item.slug as typeof CITY_SERVICE_RELEASED[number]))

  return (
    <>
      <StructuredData data={cityServiceJsonLd(service, city, seo?.title, seo?.description)} />
      <PageIntro eyebrow={`${city} · ${service.title}`} title={seo?.title ? seo.title + '.' : `${service.title} in ${city}.`} description={seo?.description || `${service.short} ${price ? `Starting price ${formatIdr(price)} for ${service.durationMin} minutes.` : 'Quoted after the operational checks.'}`}>
        <p className="price-highlight">{price ? `Starting price ${formatIdr(price)} / ${service.durationMin} min in ${city}` : 'Written quote only'}</p>
        <Link to={`/contact?city=${city}&service=${service.slug}`} className="button button-primary">Check availability<ArrowUpRight size={16} /></Link>
      </PageIntro>
      <section className="section-compact"><div className="shell"><ParallaxImage src={sessionPhoto(service.slug, service.image)} alt={service.imageAlt} eager /></div></section>
      <section className="section-compact">
        <div className="shell split-feature">
          <div>
            <h2>{service.title} working rules in {city}.</h2>
            <p className="large-copy">{cities[city].lede}</p>
            <p>{access}</p>
            {citySpace[service.slug]?.[city] && <p>{citySpace[service.slug][city]}</p>}
          </div>
          <ul className="check-list large-list">
            {service.includes.slice(0, 4).map((item) => <li key={item}><Check size={19} />{item}</li>)}
            <li><Check size={19} />{price ? `${formatIdr(price)} starting ${city} price before extras.` : 'Written quote only.'}</li>
            {cities[city].clusters.slice(0, 3).map((item) => <li key={item}><Check size={19} />{item}</li>)}
          </ul>
        </div>
      </section>
      <section className="section-compact section-light">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Estimator</Eyebrow><h2>Estimate {service.title.toLowerCase()} in {city}.</h2></div></div>
          <QuoteEstimator compact initialService={service.slug} initialCity={city} />
        </div>
      </section>
      <section className="section-compact">
        <div className="shell split-feature">
          <div>
            <Eyebrow>Same city</Eyebrow>
            <h2>Other private sessions we can quote in {city}.</h2>
            <p>Each session is a separate hour. Mix them on a programme only after the first paid visit.</p>
            <div className="cluster" style={{ marginTop: 18 }}>
              <TextLink to={'/' + service.slug}>All {service.title.toLowerCase()} details</TextLink>
              <TextLink to="/pricing">See session prices</TextLink>
            </div>
          </div>
          <div>
            {siblings.map((item) => (
              <p key={item.slug}><TextLink to={`/${cityPath}/${item.slug}`}>{item.title} in {city}</TextLink></p>
            ))}
          </div>
        </div>
      </section>
      <CtaBand dark title="Send the area and the window." copy={cities[city].clusters.join(' · ')} to={`/contact?city=${city}&service=${service.slug}`} label="Check availability" />
    </>
  )
}

export function CityOrAreaOrService() {
  const { slug } = useParams()
  if (slug === 'mobility' || slug === 'mobility-coaching') return <Navigate to="/mobility-coaching" replace />
  const service = slug ? getService(slug) : undefined
  if (service) {
    const state = offerState(service.slug)
    if (state === 'unpublished') return <Gone />
    if (state === 'held') return <HeldService slug={service.slug} />
    if (CITY_SERVICE_RELEASED.includes(service.slug as typeof CITY_SERVICE_RELEASED[number])) return <CityServicePage />
    return <Navigate to={'/' + service.slug} replace />
  }
  if (slug && getArea(slug)) return <AreaPage />
  return <NotFound />
}
