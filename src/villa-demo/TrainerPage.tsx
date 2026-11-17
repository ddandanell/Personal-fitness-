import { useParams, useSearchParams } from 'react-router'
import { getService, getTrainer, getVilla, villas } from './data'
import { DemoLink } from './shell'

export default function TrainerPage() {
  const { slug } = useParams()
  const [params] = useSearchParams()
  const trainer = getTrainer(slug)
  const villa = getVilla(params.get('villa') ?? '') ?? villas[0]
  if (!trainer) {
    return (
      <section className="section wrap">
        <h1>This trainer is not in the preview.</h1>
        <DemoLink to={`/stay/${villa.slug}`} className="text-link">Back to the house</DemoLink>
      </section>
    )
  }
  const offered = trainer.services.flatMap((item) => {
    const service = getService(item)
    return service ? [service] : []
  })
  return (
    <article className="wrap profile">
      <img src={trainer.photo.src} alt={trainer.photo.alt} width={trainer.photo.width} height={trainer.photo.height} fetchPriority="high" />
      <div>
        <p className="kicker">Sample profile · {villa.name}</p>
        <h1>{trainer.name}</h1>
        <p className="lede" style={{ marginTop: 14 }}>{trainer.bio}</p>
        <div className="fact-list">
          <div><span>Practice</span><b>{trainer.role}</b></div>
          <div><span>Languages</span><b>{trainer.languages.join(', ')}</b></div>
          <div><span>Sample score</span><b>{trainer.rating.toFixed(1)} from {trainer.sampleSessions} preview hours</b></div>
          <div><span>Specialties</span><b>{trainer.specialties.join(' · ')}</b></div>
        </div>
        <p className="quiet">Sample availability this week. A held hour is confirmed only after the written quote.</p>
        <div className="slot-row" style={{ margin: '12px 0 22px' }}>
          {trainer.slots.map((slot) => <span className="chip" key={slot}>{slot}</span>)}
        </div>
        <div className="cluster">
          {offered.map((service) => (
            <DemoLink key={service.slug} to={`/book?villa=${villa.slug}&service=${service.slug}&trainer=${trainer.slug}`} className="btn">{service.name}</DemoLink>
          ))}
        </div>
      </div>
    </article>
  )
}
