import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Eyebrow, PageIntro, ParallaxImage } from '@/components/Primitives'
import { services } from './serviceRegistry'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((item) => item.slug === slug)
  if (!service) return <NotFound />

  return <>
    <PageIntro eyebrow="Private session" title={service.title} description={service.description}><Link to={`/contact?service=${service.slug}`} className="button button-primary">Check {service.title.toLowerCase()} availability<ArrowUpRight size={16} /></Link></PageIntro>
    <section className="section"><div className="shell service-detail-grid">
      <ParallaxImage src={service.image} alt={service.imageAlt} caption="Representative imagery; your professional and setting are confirmed for your own session." eager />
      <div className="service-detail-copy"><Eyebrow>What your session includes</Eyebrow><ul className="check-list large-list">{service.includes.map((item) => <li key={item}><Check size={19} />{item}</li>)}</ul><div className="detail-block"><h2>A good fit for</h2><ul>{service.goodFor.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
    </div></section>
    <section className="section-compact section-light"><div className="shell split-feature"><div><Eyebrow>Before your session</Eyebrow><h2>A little preparation makes the session yours.</h2></div><div><ul className="numbered-list">{service.prepare.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ul><p className="small muted">If you have pain, an injury or another health concern, seek appropriate qualified advice before participating. Please do not send detailed medical information in WhatsApp.</p></div></div></section>
    <section className="section-compact"><div className="shell next-step-panel"><div><Eyebrow>Ready when you are</Eyebrow><h2>Ask about your preferred time and place.</h2><p>We will check the professional, setting, schedule, complete price and terms before your session is confirmed.</p></div><div className="cluster"><Link to={`/contact?service=${service.slug}`} className="button button-primary">Start your enquiry<ArrowUpRight size={16} /></Link><Link to="/services" className="button button-outline"><ArrowLeft size={15} />All services</Link></div></div></section>
  </>
}
