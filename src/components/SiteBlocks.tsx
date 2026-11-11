import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { type ReactNode } from 'react'
import { areas, extraPersonFee, programmes, services, type City } from '@/data/catalog'
import { professionals, type Professional } from '@/data/professionals'
import { reviews } from '@/data/content'
import { formatIdr } from '@/lib/money'
import { Eyebrow } from './Primitives'

export function CtaBand({
  eyebrow = 'Next step',
  title,
  copy,
  to = '/contact',
  label = 'Request a quote',
  dark = false,
}: {
  eyebrow?: string
  title: string
  copy: string
  to?: string
  label?: string
  dark?: boolean
}) {
  return (
    <section className={`section-compact ${dark ? 'section-dark' : ''}`}>
      <div className="shell next-step-panel">
        <div>
          <Eyebrow light={dark}>{eyebrow}</Eyebrow>
          <h2>{title}</h2>
          <p>{copy}</p>
        </div>
        <Link to={to} className={dark ? 'button button-light' : 'button button-primary'}>
          {label}
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  )
}

export function PricePills({ slug }: { slug: string }) {
  const service = services.find((item) => item.slug === slug)
  if (!service) return null
  return (
    <div className="price-pills">
      {(['Bali', 'Jakarta'] as City[]).map((city) => {
        const price = service.prices[city]
        return (
          <div key={city} className="price-pill">
            <span>{city}</span>
            <strong>{price ? `${formatIdr(price)} / ${service.durationMin} min` : 'Quote only'}</strong>
          </div>
        )
      })}
    </div>
  )
}

export function ProfessionalCard({ person }: { person: Professional }) {
  return (
    <Link to={`/professionals/${person.slug}`} className="pro-card">
      <div className="pro-card-photo"><img src={person.image} alt={person.imageAlt} loading="lazy" width="1200" height="800" /></div>
      <div>
        <p className="pro-role">{person.role}</p>
        <h3>{person.name}</h3>
        <p>{person.focus}</p>
        <p className="pro-meta">{person.cities.join(' · ')}</p>
        <span className="text-link">View profile<ArrowUpRight size={15} /></span>
      </div>
    </Link>
  )
}

export function ProfessionalGrid({ people = professionals, limit }: { people?: Professional[]; limit?: number }) {
  const list = limit ? people.slice(0, limit) : people
  return (
    <div className="pro-grid">
      {list.map((person) => <ProfessionalCard person={person} key={person.slug} />)}
    </div>
  )
}

export function ReviewGrid({ limit = 6 }: { limit?: number }) {
  return (
    <div className="review-grid">
      {reviews.slice(0, limit).map((item) => (
        <blockquote className="review-card" key={item.name}>
          <p>{item.quote}</p>
          <footer>
            <strong>{item.name}</strong>
            <span>{item.place} · {item.service}</span>
          </footer>
        </blockquote>
      ))}
    </div>
  )
}

export function AreaGrid({ city }: { city?: City }) {
  const list = city ? areas.filter((item) => item.city === city) : areas
  return (
    <div className="area-grid">
      {list.map((area) => (
        <Link to={`/${area.city === 'Bali' ? 'bali' : 'jakarta'}/${area.slug}`} className="area-card" key={area.slug}>
          <p className="eyebrow">{area.city}</p>
          <h3>{area.name}</h3>
          <p>{area.driveNote}</p>
          <strong>{area.travelFee ? `Travel ${formatIdr(area.travelFee)}` : 'In-zone travel included'}</strong>
        </Link>
      ))}
    </div>
  )
}

export function ProgrammeGrid() {
  return (
    <div className="programme-grid">
      {programmes.map((item) => (
        <article className="programme-card" key={item.slug}>
          <p className="eyebrow">{item.weeks} weeks · {item.sessions} sessions</p>
          <h3>{item.title}</h3>
          <p className="programme-save">{Math.round(item.discount * 100)}% off session rates</p>
          <p>{item.blurb}</p>
          <ul className="check-mini">{item.includes.map((line) => <li key={line}>{line}</li>)}</ul>
          <Link to={`/contact?programme=${item.slug}`} className="text-link">Design this block<ArrowUpRight size={15} /></Link>
        </article>
      ))}
    </div>
  )
}

export function ExtraFees() {
  return (
    <div className="meta-table">
      <div><span>Extra person, Bali</span><strong>{formatIdr(extraPersonFee.Bali)}</strong></div>
      <div><span>Extra person, Jakarta</span><strong>{formatIdr(extraPersonFee.Jakarta)}</strong></div>
      <div><span>90-minute session</span><strong>+45% of base rate</strong></div>
      <div><span>Yoga / meditation pair</span><strong>Second person included</strong></div>
    </div>
  )
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="privacy-prose">{children}</div>
}
