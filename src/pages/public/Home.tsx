import { ArrowRight, ArrowUpRight, Check, MapPin, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import { Eyebrow, ParallaxImage, SectionTitle, TextLink } from '@/components/Primitives'
import { ProfessionalGrid, ProgrammeGrid, ReviewGrid } from '@/components/SiteBlocks'
import { blogPosts } from '@/data/blog'
import { coreServices } from '@/data/catalog'
import { professionals } from '@/data/professionals'
import { formatIdr } from '@/lib/money'

const steps = [
  ['01', 'Tell us the session', 'Service, city, area, window, headcount. Name a professional if you want one.'],
  ['02', 'We check supply', 'A suitable person accepts the exact scope, or we offer a second name.'],
  ['03', 'You see the number', 'Base rate, extras, travel, programme reduction, cancellation line.'],
  ['04', 'We run the hour', 'Confirmation, access, the session, aftercare. Not a mystery marketplace.'],
]

export default function Home() {
  return (
    <>
      <section className="sales-hero">
        <div className="shell sales-hero-grid">
          <div className="sales-hero-copy">
            <Eyebrow light>Private sessions · Bali & Jakarta</Eyebrow>
            <h1>Private fitness.<br /><em>Priced.</em><br />Staffed.</h1>
            <p className="hero-lede">Personal training from {formatIdr(900_000)}, private yoga from {formatIdr(850_000)}, mat Pilates from {formatIdr(950_000)}. Named professionals. A quote before you pay.</p>
            <div className="cluster">
              <Link to="/contact" className="button button-primary">Get a quote<ArrowUpRight size={17} /></Link>
              <Link to="/pricing" className="button button-outline-light">See every price<ArrowRight size={16} /></Link>
            </div>
            <p className="hero-micro"><ShieldCheck size={16} />Published rates. Named people. No fake availability grid.</p>
          </div>
          <ParallaxImage src="/images/sessions/personal-training.webp" alt="Private personal training in a villa" caption="Representative session imagery." eager className="hero-session-image" />
        </div>
        <div className="shell hero-facts">
          <div><strong>{formatIdr(900_000)}</strong><span>Bali personal training, 60 minutes, in-zone.</span></div>
          <div><strong>{formatIdr(950_000)}</strong><span>Jakarta personal training, 60 minutes, in-zone.</span></div>
          <div><strong>14 professionals</strong><span>Approved by service and cluster, not a public marketplace.</span></div>
        </div>
      </section>

      <section className="section section-light">
        <div className="shell split-statement">
          <div>
            <Eyebrow>Managed, not listed</Eyebrow>
            <h2>You ask for a session.<br />We send a person.</h2>
          </div>
          <div className="statement-copy">
            <p className="large-copy">This is not a directory of coaches to ping. It is a company-managed mobile service with prices on the wall.</p>
            <p>Pick the work, the city and the cluster. The estimator builds a planning total. WhatsApp carries the request. A written quote confirms the professional, the access and the terms.</p>
            <TextLink to="/how-it-works">Eight steps, start to aftercare</TextLink>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionTitle eyebrow="Core sessions" title="Three services with a published rate in both cities." copy="Yoga includes up to two people. Extra people, 90 minutes and outer-zone travel sit on top." action={<TextLink to="/services">All sessions</TextLink>} />
          <div className="service-card-grid">
            {coreServices.map((service, index) => (
              <Link to={`/${service.slug}`} className="service-card" key={service.slug}>
                <div className="service-card-image"><img src={service.image} alt={service.imageAlt} /></div>
                <span className="service-index">0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>Bali {formatIdr(service.prices.Bali!)} · Jakarta {formatIdr(service.prices.Jakarta!)}</p>
                <span className="text-link">Open the session<ArrowUpRight size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark home-journey">
        <div className="shell">
          <SectionTitle eyebrow="From message to session" title="The hour is confirmed. The click is not." />
          <div className="journey-grid">
            {steps.map(([number, title, copy]) => (
              <div className="journey-step" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>
            ))}
          </div>
          <div className="section-cta"><Link to="/pricing" className="button button-light">Price it first<ArrowUpRight size={16} /></Link></div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionTitle eyebrow="Professionals" title="People we actually dispatch." copy="Fourteen named coaches across Bali and Jakarta. Preference is allowed. Instant booking is not." action={<TextLink to="/professionals">All professionals</TextLink>} />
          <ProfessionalGrid people={professionals} limit={8} />
        </div>
      </section>

      <section className="section section-light">
        <div className="shell split-feature">
          <div>
            <Eyebrow>Two cities</Eyebrow>
            <h2>Canggu to Menteng, with travel rules that stay visible.</h2>
          </div>
          <div className="statement-copy">
            <p className="large-copy">Bali in-zone is Canggu and Seminyak. Jakarta in-zone is South and Central.</p>
            <p>Ubud and Sanur add {formatIdr(150_000)}. Uluwatu adds {formatIdr(200_000)}. We do not pretend the island or the city is fully covered.</p>
            <div className="cluster">
              <Link to="/bali" className="button button-dark">Bali<MapPin size={16} /></Link>
              <Link to="/jakarta" className="button button-outline">Jakarta<MapPin size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionTitle eyebrow="Programmes" title="6, 9 or 12 sessions if you are staying put." action={<TextLink to="/programmes">Programme rules</TextLink>} />
          <ProgrammeGrid />
        </div>
      </section>

      <section className="section section-light">
        <div className="shell">
          <SectionTitle eyebrow="Guest notes" title="The coordination is the product." action={<TextLink to="/reviews">More notes</TextLink>} />
          <ReviewGrid limit={3} />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionTitle eyebrow="Blog" title="Guides that send traffic to a real session." copy="The first ten pieces from the editorial calendar: Bali and Jakarta training, yoga, mat Pilates, programmes and prices." action={<TextLink to="/resources">Open the blog</TextLink>} />
          <div className="resource-grid">
            {blogPosts.slice(0, 6).map((post) => (
              <Link to={`/resources/${post.slug}`} className="resource-card" key={post.slug}>
                <p className="eyebrow">{post.city}</p>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section quote-feature">
        <div className="shell split-feature">
          <div>
            <Eyebrow>What you see before paying</Eyebrow>
            <h2>The total, the extras, the cancellation line.</h2>
          </div>
          <div>
            <ul className="check-list large-list">
              {['City rate for the service and duration', 'Extra people and outer-zone travel if they apply', 'Programme count and the reduction', 'Who is coming, and the access note for the building or villa'].map((item) => (
                <li key={item}><Check size={19} />{item}</li>
              ))}
            </ul>
            <TextLink to="/pricing">Open the live estimator</TextLink>
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="shell final-cta-inner">
          <Eyebrow light>Start with the number</Eyebrow>
          <h2>Tell us the area.<br />Tell us the hour.<br /><em>Get the price.</em></h2>
          <p>Personal training, yoga, Pilates and the rest of the roster, quoted before payment.</p>
          <Link to="/contact" className="button button-primary">Build a quote<ArrowUpRight size={17} /></Link>
        </div>
      </section>
    </>
  )
}
