import { ArrowRight, ArrowUpRight, Check, MapPin, MessageCircle, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import { Eyebrow, ParallaxImage, SectionTitle, TextLink } from '@/components/Primitives'
import { services } from './serviceRegistry'

const steps = [
  ['01', 'Tell us what you need', 'Choose your service, city, setting, preferred time and number of participants.'],
  ['02', 'We check the fit', 'We review the professional, location, venue, schedule and equipment for your request.'],
  ['03', 'You approve the details', 'Receive a clear quote with the full price, inclusions and cancellation terms before payment.'],
  ['04', 'We coordinate your session', 'Get confirmation, preparation and arrival details, plus support if anything changes.'],
]

export default function Home() {
  return (
    <>
      <section className="sales-hero">
        <div className="shell sales-hero-grid">
          <div className="sales-hero-copy">
            <Eyebrow light>Private sessions · Bali & Jakarta</Eyebrow>
            <h1>Private fitness.<br /><em>Your space.</em><br />We handle the rest.</h1>
            <p className="hero-lede">Personal training, private yoga and mat Pilates coordinated around your goals, setting and schedule.</p>
            <div className="cluster"><Link to="/contact" className="button button-primary">Check availability<ArrowUpRight size={17} /></Link><Link to="/services" className="button button-outline-light">Explore sessions<ArrowRight size={16} /></Link></div>
            <p className="hero-micro"><ShieldCheck size={16} />A clear quote before payment. Confirmation before your session.</p>
          </div>
          <ParallaxImage src="/images/sessions/personal-training.webp" alt="Representative personal training session in a private villa setting" caption="Representative session imagery; not a real PersonalFitness.id client, instructor or venue." eager className="hero-session-image" />
        </div>
        <div className="shell hero-facts">
          <div><strong>One-to-one & small groups</strong><span>A format shaped around your participants.</span></div>
          <div><strong>Your chosen setting</strong><span>Home, villa or another suitable space.</span></div>
          <div><strong>One coordinated journey</strong><span>Enquiry, quote, confirmation and support.</span></div>
        </div>
      </section>

      <section className="section section-light">
        <div className="shell split-statement">
          <div><Eyebrow>Personal, not complicated</Eyebrow><h2>You choose the session.<br />We coordinate the details.</h2></div>
          <div className="statement-copy"><p className="large-copy">No searching through endless profiles. No guessing what happens next.</p><p>Tell us what you want to do and where you would like to do it. We bring the request together around professional fit, timing, venue, equipment and a clear price—then stay connected through your session.</p><TextLink to="/about">Why PersonalFitness.id</TextLink></div>
        </div>
        <div className="shell principle-row">
          <div><MessageCircle /><h3>One clear conversation</h3><p>Share the practical details once and keep your request, quote and session communication connected.</p></div>
          <div><Check /><h3>Details before decisions</h3><p>See the service, schedule, full price, inclusions and terms before you choose to proceed.</p></div>
          <div><MapPin /><h3>Your setting, considered</h3><p>Space, access, travel and equipment are part of the plan—not surprises on the day.</p></div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionTitle eyebrow="Choose your session" title="Private sessions with a clear purpose." copy="Start with personal training, private yoga or mat Pilates. Each request is shaped around your experience, space and preferred time." action={<TextLink to="/services">Explore every service</TextLink>} />
          <div className="service-card-grid">{services.map((service, index) => <Link to={`/services/${service.slug}`} className="service-card" key={service.slug}><div className="service-card-image"><img src={service.image} alt={service.imageAlt} loading="lazy" /></div><span className="service-index">0{index + 1}</span><h3>{service.title}</h3><p>{service.short}</p><span className="text-link">Discover the session<ArrowUpRight size={15} /></span></Link>)}</div>
        </div>
      </section>

      <section className="section section-dark home-journey">
        <div className="shell"><SectionTitle eyebrow="From enquiry to session" title="A simple journey. Properly coordinated." copy="You always know what is being checked, what happens next and when your session is actually confirmed." />
          <div className="journey-grid">{steps.map(([number, title, copy]) => <div className="journey-step" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>)}</div>
          <div className="section-cta"><Link to="/how-it-works" className="button button-light">See how it works<ArrowUpRight size={16} /></Link></div>
        </div>
      </section>

      <section className="section section-light">
        <div className="shell split-feature">
          <div><Eyebrow>Two cities. Your location.</Eyebrow><h2>Fitness that fits the way you travel, live and work.</h2></div>
          <div className="statement-copy"><p className="large-copy">Enquire for Bali or Jakarta and tell us the setting you have in mind.</p><p>A holiday villa, your home, an apartment or another suitable private space can shape the right session. We confirm location feasibility, professional availability, timing and the complete quote before you proceed.</p><div className="cluster"><Link to="/contact?city=Bali" className="button button-dark">Enquire for Bali<ArrowUpRight size={16} /></Link><Link to="/contact?city=Jakarta" className="button button-outline">Enquire for Jakarta<ArrowUpRight size={16} /></Link></div></div>
        </div>
      </section>

      <section className="section quote-feature">
        <div className="shell split-feature">
          <div><Eyebrow>Clear pricing</Eyebrow><h2>Know what you are saying yes to.</h2></div>
          <div className="statement-copy"><p className="large-copy">Your quote is built around the session you actually want.</p><p>Service, duration, participants, location, travel, venue and equipment can all shape the total. We set out the price, inclusions and cancellation terms before asking for payment.</p><TextLink to="/pricing">How your quote works</TextLink></div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="shell final-cta-inner"><Eyebrow light>Your next session starts here</Eyebrow><h2>Tell us where.<br />Tell us when.<br /><em>We’ll take it from there.</em></h2><p>Prepare a clear enquiry for personal training, private yoga or mat Pilates in Bali or Jakarta.</p><Link to="/contact" className="button button-primary">Check availability<ArrowUpRight size={17} /></Link></div>
      </section>
    </>
  )
}
