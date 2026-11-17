import { useParams } from 'react-router'
import { formatIdr } from '@/lib/money'
import { getVilla, services, trainers } from './data'
import { DemoLink } from './shell'

export default function StayPage() {
  const { slug } = useParams()
  const villa = getVilla(slug)
  if (!villa) {
    return (
      <section className="section wrap">
        <h1>This house is not in the preview.</h1>
        <DemoLink to="/" className="text-link">Back to Arunika</DemoLink>
      </section>
    )
  }
  return (
    <>
      <section className="stay-hero">
        <figure>
          <img src={villa.image.src} alt={villa.image.alt} width={villa.image.width} height={villa.image.height} fetchPriority="high" />
          <figcaption>{villa.area} · sample house</figcaption>
        </figure>
        <div className="stay-intro wrap">
          <p className="kicker">In-villa wellness · {villa.area}</p>
          <h1>{villa.name}</h1>
          <p className="lede" style={{ marginTop: 16 }}>{villa.line} The current sample stay is {villa.stay}. Scan the card in the room, choose an hour, and the request is added to the stay.</p>
          <p className="quiet">{villa.bedrooms} bedrooms · the trainer comes to the house</p>
          <div className="mobile-bar">
            <div>
              <p className="quiet">From</p>
              <strong>{formatIdr(800000)}</strong>
            </div>
            <DemoLink to={`/book?villa=${villa.slug}&service=private-yoga`} className="btn">Request an hour</DemoLink>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <p className="kicker">The menu</p>
          <h2>What the house can offer this week.</h2>
          <div style={{ marginTop: 28 }}>
            {services.map((service, index) => (
              <article className="menu-row" key={service.slug}>
                <img src={service.image.src} alt={service.image.alt} width={service.image.width} height={service.image.height} />
                <div>
                  <p className="menu-index">{String(index + 1).padStart(2, '0')} · {service.duration} min</p>
                  <h3>{service.name}</h3>
                  <p>{service.line}</p>
                  <p className="quiet">{service.note}</p>
                </div>
                <div className="menu-price">
                  <strong>{formatIdr(service.price)}</strong>
                  <DemoLink to={`/book?villa=${villa.slug}&service=${service.slug}`} className="text-link">Request</DemoLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="rail-head">
            <div>
              <p className="kicker">People who come to the house</p>
              <h2>Sample trainers.</h2>
            </div>
            <p className="quiet">Names and scores are invented. The person who arrives is named on the written quote.</p>
          </div>
          <div className="trainer-rail">
            {trainers.map((trainer) => (
              <DemoLink to={`/trainers/${trainer.slug}?villa=${villa.slug}`} className="trainer-card" key={trainer.slug}>
                <img src={trainer.photo.src} alt={trainer.photo.alt} width={trainer.photo.width} height={trainer.photo.height} />
                <h3>{trainer.name}</h3>
                <p>{trainer.role}</p>
                <p className="stars">Sample {trainer.rating.toFixed(1)} · {trainer.languages.join(' · ')}</p>
              </DemoLink>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
