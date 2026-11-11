import { ArrowUpRight, Check, MapPin, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import { Eyebrow, ParallaxImage, SectionTitle, TextLink } from '@/components/Primitives'
import QuoteEstimator from '@/components/QuoteEstimator'
import { publicServices } from '@/data/publicOffer'
import { faqs } from '@/data/content'
import { formatIdr } from '@/lib/money'

const steps = [
  ['01', 'Check availability', 'Send the city, area, session and a two-hour window. We confirm whether we can honour that visit.'],
  ['02', 'See the starting price', 'Published rates, extra people, travel and programme savings sit on the estimator. The written quote is the payable total.'],
  ['03', 'Continue in WhatsApp', 'The draft carries the numbers. Nothing is booked until you accept the quote and payment is verified.'],
]

const homeFaqs = faqs.slice(0, 5)

export default function Home() {
  return (
    <>
      <section className="sales-hero">
        <div className="shell sales-hero-grid">
          <div className="sales-hero-copy">
            <Eyebrow light>Bali · Jakarta</Eyebrow>
            <h1>Private fitness sessions at your villa or home</h1>
            <p className="hero-lede">Personal training, yoga, mat Pilates, mobility, boxing fitness and guided meditation at your villa or home in published Bali and Jakarta clusters.</p>
            <div className="cluster">
              <Link to="/contact" className="button button-primary">Check availability<ArrowUpRight size={17} /></Link>
              <Link to="/pricing" className="button button-outline-light">See session prices</Link>
            </div>
            <p className="hero-micro"><ShieldCheck size={16} />A click is not a booking. Confirmation follows a written quote.</p>
          </div>
          <ParallaxImage src="/images/wellness/villa-yoga-partners.webp" alt="Private yoga in a Bali villa" eager className="hero-session-image" />
        </div>
        <div className="shell hero-facts">
          <div><strong>{formatIdr(900_000)}</strong><span>Starting price · Bali personal training, 60 minutes, in-zone.</span></div>
          <div><strong>{formatIdr(950_000)}</strong><span>Starting price · Jakarta personal training, 60 minutes, in-zone.</span></div>
          <div><strong>Six sessions</strong><span>Training, yoga, Pilates, mobility, boxing and meditation.</span></div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionTitle eyebrow="Sessions" title="Six private sessions with a published starting price." copy="Yoga and meditation include up to two people. Boxing is one person. Extra people, 90 minutes and outer-zone travel sit on top of the starting price." action={<TextLink to="/pricing">See session prices</TextLink>} />
          <div className="service-card-grid">
            {publicServices.map((service, index) => (
              <Link to={`/${service.slug}`} className="service-card" key={service.slug}>
                <div className="service-card-image"><img src={service.image} alt={service.imageAlt} width="1200" height="800" /></div>
                <span className="service-index">0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>Starting price · Bali {formatIdr(service.prices.Bali!)} · Jakarta {formatIdr(service.prices.Jakarta!)}</p>
                <span className="text-link">Open {service.title.toLowerCase()}<ArrowUpRight size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark home-journey">
        <div className="shell">
          <SectionTitle eyebrow="How it works" title="Three steps from the first message to a confirmed hour." />
          <div className="journey-grid">
            {steps.map(([number, title, copy]) => (
              <div className="journey-step" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>
            ))}
          </div>
          <div className="section-cta"><Link to="/how-it-works" className="button button-light">Read the full sequence<ArrowUpRight size={16} /></Link></div>
        </div>
      </section>

      <section className="section">
        <div className="shell split-feature">
          <div>
            <Eyebrow>Areas</Eyebrow>
            <h2>Bali and Jakarta clusters we publish.</h2>
          </div>
          <div className="statement-copy">
            <p className="large-copy">Bali in-zone is Canggu and Seminyak. Jakarta in-zone is South and Central Jakarta.</p>
            <p>Ubud and Sanur add {formatIdr(150_000)} per visit. Uluwatu adds {formatIdr(200_000)}. North, West and East Jakarta are quoted after a timing check. We do not claim island-wide or city-wide coverage.</p>
            <div className="cluster">
              <Link to="/bali" className="button button-dark">Bali<MapPin size={16} /></Link>
              <Link to="/jakarta" className="button button-outline">Jakarta<MapPin size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Estimator</Eyebrow><h2>Estimate my price, then continue in WhatsApp.</h2></div></div>
          <QuoteEstimator />
        </div>
      </section>

      <section className="section">
        <div className="content-shell faq-list">
          <div className="section-title"><div><Eyebrow>Questions</Eyebrow><h2>Prices, areas and confirmation.</h2></div></div>
          {homeFaqs.map(([q, a]) => (
            <details className="faq-item" key={q}>
              <summary><span>{q}</span></summary>
              <div className="faq-body"><p>{a}</p></div>
            </details>
          ))}
          <TextLink to="/faq">All questions</TextLink>
        </div>
      </section>

      <section className="section quote-feature">
        <div className="shell split-feature">
          <div>
            <Eyebrow>Before you pay</Eyebrow>
            <h2>The starting price, the extras, the cancellation line.</h2>
          </div>
          <div>
            <ul className="check-list large-list">
              {['City starting price for the session and duration', 'Extra people and outer-zone travel if they apply', 'Programme count and the reduction', 'A written quote before payment'].map((item) => (
                <li key={item}><Check size={19} />{item}</li>
              ))}
            </ul>
            <TextLink to="/pricing">See session prices</TextLink>
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="shell final-cta-inner">
          <Eyebrow light>Start with availability</Eyebrow>
          <h2>Private fitness sessions<br />at your villa or home.</h2>
          <p>Tell us the city, the area and the window. We confirm whether we can run the hour, then send the quote.</p>
          <div className="cluster">
            <Link to="/contact" className="button button-primary">Check availability<ArrowUpRight size={17} /></Link>
            <Link to="/pricing" className="button button-outline-light">See session prices</Link>
          </div>
        </div>
      </section>
    </>
  )
}
