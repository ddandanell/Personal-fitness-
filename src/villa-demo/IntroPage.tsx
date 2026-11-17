import { COMPANY_EMAIL, COMPANY_EMAIL_HREF } from '@/data/company'
import { formatIdr } from '@/lib/money'
import { services } from './data'
import { DemoLink } from './shell'

const steps = [
  ['01', 'A card in the room', 'Each house has a small card. The guest scans it and lands on that house’s own wellness page, not a generic listing.'],
  ['02', 'They request the hour', 'They choose the session, a time and how many people. The request is marked against the villa stay.'],
  ['03', 'You see the whole book', 'Every house, the coming hours, the trainers and the mornings that repeat sit on one desk.'],
  ['04', 'The month has a number', 'Stay charges collect into a simple November total, so the extra income is visible without a spreadsheet.'],
]

export default function IntroPage() {
  const shown = services.slice(0, 3)
  return (
    <>
      <section className="hero">
        <img src="/images/villademo/hero-pool.webp" alt="An infinity pool above the ocean, lined with palms" width={1600} height={1066} fetchPriority="high" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="kicker rise">For villa managers · a clickable preview</p>
          <h1 className="rise d2">A private hour, in the guest’s own house.</h1>
          <p className="lede rise d3">Arunika is a fictional collection in Pererenan, Seseh and Uluwatu. This is how their guests would book wellness, and how the manager would see it.</p>
          <div className="hero-actions rise d3">
            <DemoLink to="/stay/house-lima" className="btn light">Open House Lima</DemoLink>
            <DemoLink to="/desk" className="btn-line">Open the desk</DemoLink>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="split">
            <div>
              <p className="kicker">How it works</p>
              <h2>Four steps, from the bedside card to the month.</h2>
            </div>
            <p className="lede">PersonalFitness.id sends the trainer. The guest never has to leave the property, and the house keeps the relationship.</p>
          </div>
          <div className="steps">
            {steps.map(([index, title, copy]) => (
              <article className="step" key={index}>
                <b>{index}</b>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="rate-row">
            {shown.map((service) => (
              <article className="rate" key={service.slug}>
                <span className="quiet">Bali · 60 min</span>
                <strong>{formatIdr(service.price)}</strong>
                <p>{service.name}</p>
              </article>
            ))}
          </div>
          <p className="quiet" style={{ marginTop: 18 }}>Jakarta is a little higher: personal training {formatIdr(950000)}, mat Pilates {formatIdr(1000000)}, private yoga {formatIdr(900000)}. Mobility and guided meditation use the published Bali rates in this preview. A written quote still names the person and the total before anything is confirmed.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap split">
          <DemoLink to="/card/house-lima">
            <img src="/images/villademo/interior.webp" alt="A timber bedroom with garden doors, the sort of room that holds a small wellness card" width={1600} height={1100} />
            <p className="text-link" style={{ marginTop: 12 }}>See the room card</p>
          </DemoLink>
          <DemoLink to="/desk">
            <img src="/images/villademo/rice.webp" alt="Rice terraces beside palms, the setting for the fictional House Lima" width={1400} height={876} />
            <p className="text-link" style={{ marginTop: 12 }}>See November on the desk</p>
          </DemoLink>
        </div>
      </section>
      <section className="contact-band">
        <div className="wrap">
          <p className="kicker" style={{ color: '#e7c2b2' }}>Bring it to your houses</p>
          <h2>Show this to the people who manage the villas.</h2>
          <p className="lede" style={{ color: 'rgba(243,238,230,.84)', marginTop: 16 }}>Tell us how many houses you look after and where they sit. We will reply from the real inbox.</p>
          <a className="btn" href={COMPANY_EMAIL_HREF}>Write to {COMPANY_EMAIL}</a>
        </div>
      </section>
    </>
  )
}
