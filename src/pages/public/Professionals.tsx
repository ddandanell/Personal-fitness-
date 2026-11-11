import { ArrowUpRight, Check } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Eyebrow, PageIntro } from '@/components/Primitives'
import { CtaBand, ProfessionalGrid } from '@/components/SiteBlocks'
import { getService } from '@/data/catalog'
import { getProfessional, professionals } from '@/data/professionals'
import NotFound from './NotFound'

export function Professionals() {
  return (
    <>
      <PageIntro eyebrow="Professionals" title="Named people. Coordinated by us." description="These are the trainers, yoga teachers and Pilates coaches we actually dispatch. You can name a preference. Availability is confirmed on the quote, not on this page.">
        <Link to="/professional-standards" className="button button-outline">How we vet them</Link>
      </PageIntro>
      <section className="section">
        <div className="shell">
          <ProfessionalGrid />
        </div>
      </section>
      <CtaBand dark title="Ask for a named professional." copy="If they are already booked, we offer a second match for the same service and cluster rather than inventing a free slot." to="/contact" />
    </>
  )
}

export function ProfessionalDetail() {
  const { slug } = useParams()
  const person = slug ? getProfessional(slug) : undefined
  if (!person) return <NotFound />
  const sessionList = person.services.map((item) => getService(item)).filter(Boolean)

  return (
    <>
      <PageIntro eyebrow={person.role} title={person.name} description={person.bio}>
        <div className="pro-hero-meta">
          <span>{person.cities.join(' and ')}</span>
          <span>{person.languages.join(' · ')}</span>
          <span>{person.years} years coaching</span>
        </div>
        <Link to={`/contact?professional=${person.slug}&service=${person.services[0]}`} className="button button-primary">Request {person.name.split(' ')[0]}<ArrowUpRight size={16} /></Link>
      </PageIntro>
      <section className="section">
        <div className="shell split-feature">
          <div>
            <div className="pro-portrait" style={{ background: person.tone }} aria-hidden="true">{person.initials}</div>
            <p className="large-copy">{person.focus}</p>
          </div>
          <div>
            <Eyebrow>How they coach</Eyebrow>
            <ul className="check-list large-list">{person.style.map((item) => <li key={item}><Check size={19} />{item}</li>)}</ul>
            <div className="detail-block">
              <h2>Typical windows</h2>
              <ul>{person.typical.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>
      <section className="section-compact section-light">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Sessions</Eyebrow><h2>Services this professional is approved for.</h2></div></div>
          <div className="area-grid">
            {sessionList.map((service) => service && (
              <Link to={`/${service.slug}`} className="area-card" key={service.slug}>
                <p className="eyebrow">{person.cities.join(' / ')}</p>
                <h3>{service.title}</h3>
                <p>{service.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-compact">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Same cluster</Eyebrow><h2>Other people we can send.</h2></div></div>
          <ProfessionalGrid people={professionals.filter((item) => item.slug !== person.slug && item.cities.some((city) => person.cities.includes(city))).slice(0, 4)} />
        </div>
      </section>
      <CtaBand dark title={`Ask for ${person.name}.`} copy="A preference is a preference. Confirmation still waits on the diary, the area and the written quote." to={`/contact?professional=${person.slug}&service=${person.services[0]}`} />
    </>
  )
}
