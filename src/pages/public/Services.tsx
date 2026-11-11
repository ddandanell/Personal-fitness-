import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router'
import { PageIntro, ParallaxImage, TextLink } from '@/components/Primitives'
import { services } from './serviceRegistry'

export default function Services() {
  return <>
    <PageIntro eyebrow="Private sessions" title="Choose how you want to move." description="Personal training, private yoga and mat Pilates—coordinated for your goals, experience, setting and schedule."><Link to="/contact" className="button button-primary">Check availability<ArrowUpRight size={16} /></Link></PageIntro>
    <section className="section"><div className="shell service-editorial-list">{services.map((service, index) => <article className="service-editorial" key={service.slug}>
      <ParallaxImage src={service.image} alt={service.imageAlt} caption="Representative session imagery." />
      <div className="service-editorial-copy"><span className="service-index">0{index + 1}</span><h2>{service.title}</h2><p className="large-copy">{service.short}</p><p>{service.description}</p><ul className="check-list">{service.includes.slice(0, 3).map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul><TextLink to={`/services/${service.slug}`}>Explore {service.title.toLowerCase()}</TextLink></div>
    </article>)}</div></section>
    <section className="section-compact section-dark"><div className="shell split-feature"><div><h2>Not sure which session fits?</h2></div><div><p>Tell us what you would like to work on, where you are and who will join. We can start with the practical details and find the right direction together.</p><Link to="/contact" className="button button-light">Describe your session<ArrowUpRight size={16} /></Link></div></div></section>
  </>
}
