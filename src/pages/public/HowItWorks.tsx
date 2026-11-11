import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router'
import { PageIntro } from '@/components/Primitives'

const journey = [
  ['01', 'Share your session', 'Choose personal training, private yoga, mat Pilates, mobility, boxing fitness or guided meditation. Add your city, area, venue type, preferred time, participants and non-sensitive goals.'],
  ['02', 'Let us check the details', 'We review the professional scope, location, venue, timing, participants and equipment needed for your request.'],
  ['03', 'Review your personal quote', 'You receive the full price, inclusions, exclusions and cancellation or rescheduling terms before making a payment decision.'],
  ['04', 'Confirm with clarity', 'Once the details and payment status are confirmed, you receive the session, arrival and preparation information for your booking.'],
  ['05', 'Enjoy coordinated support', 'We stay connected around changes, completion and aftercare, with a clear route for questions or service recovery.'],
]

export default function HowItWorks() {
  return <>
    <PageIntro eyebrow="Your session journey" title="Simple for you. Careful behind the scenes." description="From your first message to aftercare, every step has a clear purpose: understand the request, confirm the right details and coordinate the session you approved."><Link to="/contact" className="button button-primary">Start your enquiry<ArrowUpRight size={16} /></Link></PageIntro>
    <section className="section"><div className="content-shell process-list">{journey.map(([number, title, copy]) => <article key={number}><span className="process-number">{number}</span><div><h2>{title}</h2><p>{copy}</p></div></article>)}</div></section>
    <section className="section-compact section-light"><div className="shell split-feature"><div><h2>A confirmation should answer every practical question.</h2></div><div><ul className="check-list large-list">{['Who the session is for and what service is included', 'Where and when it will take place', 'What equipment or preparation is needed', 'The full price and the terms you accepted'].map((item) => <li key={item}><Check size={19} />{item}</li>)}</ul></div></div></section>
    <section className="section-compact section-dark"><div className="shell grid-3 support-grid"><div><h3>Questions stay human</h3><p>If something is unclear or changes, you have a direct route to discuss it rather than an automated assumption.</p></div><div><h3>Safety comes first</h3><p>Fitness sessions are non-clinical. Pain, injury, unsafe conditions or health concerns require appropriate review.</p></div><div><h3>Your preferences matter</h3><p>Communication opt-outs are respected, and sensitive details do not belong in a general WhatsApp conversation.</p></div></div></section>
  </>
}
