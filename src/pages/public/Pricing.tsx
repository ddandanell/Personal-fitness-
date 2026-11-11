import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router'
import { PageIntro } from '@/components/Primitives'

const factors = [
  ['Service & format', 'Personal training, private yoga and mat Pilates have different professional and equipment needs.'],
  ['Duration & participants', 'The session length and whether you train alone, as a pair or in a small group shape the quote.'],
  ['Location & travel', 'Your area, access requirements and realistic travel time are considered for the exact setting.'],
  ['Venue & equipment', 'Mats, simple props, venue charges or special access requirements are clarified rather than assumed.'],
]

export default function Pricing() {
  return <>
    <PageIntro eyebrow="Pricing" title="A clear quote for the session you actually want." description="Private sessions are not one-size-fits-all. We confirm the service, setting, participants and requirements, then set out your full price and terms before you pay."><Link to="/contact" className="button button-primary">Request your quote<ArrowUpRight size={16} /></Link></PageIntro>
    <section className="section"><div className="shell split-feature"><div><h2>What shapes your quote.</h2><p className="large-copy">No generic package pushed onto a different request. The details of your session determine the price.</p></div><div className="quote-factor-list">{factors.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>
    <section className="section-compact section-dark"><div className="shell split-feature"><div><h2>What you see before making a decision.</h2></div><div><ul className="check-list large-list">{['The agreed service, duration and number of participants', 'The location, travel treatment and equipment included', 'The total payable and any additional-person or venue items', 'Cancellation, rescheduling, refund and validity terms'].map((item) => <li key={item}><Check size={19} />{item}</li>)}</ul><Link to="/how-it-works" className="button button-light">See the full session journey<ArrowUpRight size={16} /></Link></div></div></section>
    <section className="section-compact"><div className="content-shell payment-note"><h2>Payment details stay out of chat.</h2><p>Use only the secure payment route provided with your confirmed quote. Never send full payment-card, financial-account or personal-ID details in WhatsApp.</p></div></section>
  </>
}
