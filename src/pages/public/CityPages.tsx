import { ArrowUpRight, Check, MapPin } from 'lucide-react'
import { Link, Navigate, useLocation, useParams } from 'react-router'
import { Eyebrow, PageIntro, ParallaxImage } from '@/components/Primitives'
import { AreaGrid, CtaBand, ProfessionalGrid } from '@/components/SiteBlocks'
import { cities, cityAreas, coreServices, getArea, getService, type City } from '@/data/catalog'
import { professionalsFor } from '@/data/professionals'
import { formatIdr } from '@/lib/money'
import NotFound from './NotFound'

const images: Record<City, [string, string]> = {
  Bali: ['/images/professionals/lila-prameswari.webp', 'Villa yoga setting in Bali'],
  Jakarta: ['/images/professionals/nadia-putri.webp', 'Apartment mat session in Jakarta'],
}

export function CityPage({ city }: { city: City }) {
  const data = cities[city]
  const people = professionalsFor({ city })
  const localAreas = cityAreas(city)
  const [image, alt] = images[city]

  return (
    <>
      <PageIntro eyebrow={city} title={data.headline} description={data.lede}>
        <Link to={`/contact?city=${city}`} className="button button-primary">Check {city} availability<ArrowUpRight size={16} /></Link>
      </PageIntro>
      <section className="section">
        <div className="shell city-feature">
          <ParallaxImage src={image} alt={alt} eager />
          <div className="city-copy">
            <p className="eyebrow"><MapPin size={14} />{city} clusters</p>
            <h2>We publish the areas we can honour.</h2>
            <ul className="check-list">{data.clusters.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul>
            <ul className="check-list" style={{ marginTop: 24 }}>{data.notes.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className="section-compact section-light">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Sessions</Eyebrow><h2>{city} services with a published rate.</h2></div></div>
          <div className="service-card-grid">
            {coreServices.filter((item) => item.cities.includes(city)).map((service, index) => (
              <Link to={`/${data.slug}/${service.slug}`} className="service-card" key={service.slug}>
                <div className="service-card-image"><img src={service.image} alt={service.imageAlt} /></div>
                <span className="service-index">0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.prices[city] ? `${formatIdr(service.prices[city]!)} / ${service.durationMin} min` : service.short}</p>
                <span className="text-link">Open {city} {service.title.toLowerCase()}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Areas</Eyebrow><h2>{localAreas.length} published clusters.</h2></div></div>
          <AreaGrid city={city} />
        </div>
      </section>
      <section className="section-compact section-light">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>People</Eyebrow><h2>Explore approaches for {city}.</h2></div></div>
          <ProfessionalGrid people={people} />
        </div>
      </section>
      <CtaBand dark title={`Tell us where in ${city}.`} copy="Area, venue type and a two-hour window are enough to start the supply check." to={`/contact?city=${city}`} />
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
  const people = professionalsFor({ city, area: area.slug })
  const areaServices = area.services.map((item) => getService(item)).filter(Boolean)

  return (
    <>
      <PageIntro eyebrow={`${area.city} · ${area.cluster}`} title={`Private sessions in ${area.name}.`} description={area.copy}>
        <p className="price-highlight">{area.travelFee ? `Travel ${formatIdr(area.travelFee)} per visit` : 'In-zone travel included in the session price'}</p>
        <Link to={`/contact?city=${area.city}&area=${area.slug}`} className="button button-primary">Check {area.name}<ArrowUpRight size={16} /></Link>
      </PageIntro>
      <section className="section-compact">
        <div className="shell split-feature">
          <div><Eyebrow>Venues we can use</Eyebrow><h2>{area.driveNote}</h2></div>
          <ul className="check-list large-list">{area.venues.map((item) => <li key={item}><Check size={19} />{item}</li>)}</ul>
        </div>
      </section>
      <section className="section-compact section-light">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Sessions here</Eyebrow><h2>Services to enquire about in {area.name}.</h2></div></div>
          <div className="area-grid">
            {areaServices.map((service) => service && (
              <Link to={`/${cityPath}/${service.slug}`} className="area-card" key={service.slug}>
                <p className="eyebrow">{area.city}</p>
                <h3>{service.title}</h3>
                <p>{service.prices[city] ? `${formatIdr(service.prices[city]!)} starting rate` : 'Itemised quote'}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {people.length > 0 && (
        <section className="section">
          <div className="shell">
            <div className="section-title"><div><Eyebrow>Who covers this cluster</Eyebrow><h2>Explore relevant professional approaches.</h2></div></div>
            <ProfessionalGrid people={people} />
          </div>
        </section>
      )}
      <CtaBand dark title={`Request ${area.name}.`} copy={area.bestFor.join(' · ')} to={`/contact?city=${area.city}&area=${area.slug}`} />
    </>
  )
}

export function CityServicePage() {
  const { slug } = useParams()
  const city = useCityFromPath()
  const service = slug ? getService(slug) : undefined
  if (!city || !service || !service.cities.includes(city)) return <NotFound />
  const price = service.prices[city]
  const people = professionalsFor({ city, service: service.slug })
  const localAreas = cityAreas(city)

  return (
    <>
      <PageIntro eyebrow={`${city} · ${service.title}`} title={`${service.title} in ${city}.`} description={`${service.short} ${price ? `Starting at ${formatIdr(price)} for ${service.durationMin} minutes.` : 'Quoted after the operational checks.'}`}>
        <Link to={`/contact?city=${city}&service=${service.slug}`} className="button button-primary">Quote {city} {service.title.toLowerCase()}<ArrowUpRight size={16} /></Link>
      </PageIntro>
      <section className="section-compact"><div className="shell"><ParallaxImage src={service.image} alt={service.imageAlt} eager /></div></section>
      <section className="section-compact">
        <div className="shell split-feature">
          <div>
            <h2>Local working rules.</h2>
            <p className="large-copy">{cities[city].lede}</p>
          </div>
          <ul className="check-list large-list">
            {service.includes.slice(0, 4).map((item) => <li key={item}><Check size={19} />{item}</li>)}
            <li><Check size={19} />{price ? `${formatIdr(price)} published ${city} rate before extras.` : 'Itemised quote only.'}</li>
          </ul>
        </div>
      </section>
      <section className="section-compact section-light">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Areas</Eyebrow><h2>Where this {service.title.toLowerCase()} request can land.</h2></div></div>
          <AreaGrid city={city} />
        </div>
      </section>
      {people.length > 0 && (
        <section className="section">
          <div className="shell">
            <div className="section-title"><div><Eyebrow>Professionals</Eyebrow><h2>{city} names for this service.</h2></div></div>
            <ProfessionalGrid people={people} />
          </div>
        </section>
      )}
      <CtaBand dark title="Send the area and the window." copy={`Typical ${city} clusters: ${localAreas.map((item) => item.name).join(', ')}.`} to={`/contact?city=${city}&service=${service.slug}`} />
    </>
  )
}

export function CityOrAreaOrService() {
  const { slug } = useParams()
  const { pathname } = useLocation()
  if (slug === 'mobility') {
    const base = pathname.startsWith('/bali') ? '/bali' : '/jakarta'
    return <Navigate to={`${base}/mobility-coaching`} replace />
  }
  if (slug && getArea(slug)) return <AreaPage />
  if (slug && getService(slug)) return <CityServicePage />
  return <NotFound />
}
