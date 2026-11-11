import { ArrowUpRight, Plus } from 'lucide-react'
import { Link } from 'react-router'
import { PageIntro } from '@/components/Primitives'

const questions = [
  ['How much does a private session cost?', 'Your quote depends on the service, duration, participants, location, travel, venue and equipment. We confirm the total, inclusions and terms before asking for payment.'],
  ['Does an enquiry reserve my preferred time?', 'No. We first check the professional, location, venue and schedule. Your session is confirmed only when you receive a clear booking confirmation after the required checks and payment status.'],
  ['Where can my session take place?', 'You can enquire about your home, villa, apartment or another suitable space with permission to use it. Share your area and venue type so access, travel, space and equipment can be reviewed.'],
  ['Do I need my own equipment?', 'Not necessarily. Tell us what is already available. Mat, simple prop and other equipment requirements are agreed in advance so both you and the professional know what to expect.'],
  ['Can I enquire for two people or a small group?', 'Yes. Include the number of participants in your enquiry. The suitable format, space, equipment and price can then be quoted for your group.'],
  ['Are the sessions suitable for beginners?', 'Beginner and returning-participant enquiries are welcome. Share your general experience and preferences so the session format can be matched appropriately.'],
  ['What if I have pain, an injury or a health concern?', 'Seek appropriate qualified advice before participating. These are non-clinical fitness sessions and do not replace healthcare. Please do not send detailed medical history in WhatsApp; any necessary screening must use an appropriate confidential route.'],
  ['What are the cancellation and rescheduling terms?', 'Your itemised quote sets out the applicable cancellation, rescheduling, refund and validity terms before you make a payment decision.'],
  ['How do I pay?', 'Use only the secure payment route provided with your confirmed quote. Never send full payment-card, financial-account or personal-ID details in WhatsApp.'],
]

export default function Faq() {
  return <>
    <PageIntro eyebrow="Questions" title="Practical answers before you enquire." description="Everything you need to know about private session pricing, locations, equipment, participants, availability and terms."><Link to="/contact" className="button button-primary">Ask about your session<ArrowUpRight size={16} /></Link></PageIntro>
    <section className="section"><div className="content-shell faq-list">{questions.map(([question, answer]) => <details className="faq-item" key={question}><summary><span>{question}</span><Plus size={20} /></summary><div className="faq-body"><p>{answer}</p></div></details>)}</div></section>
    <section className="section-compact section-dark"><div className="shell split-feature"><div><h2>Still deciding what fits?</h2></div><div><p>Tell us your city, setting, preferred time and what you would like to do. You do not need to have every detail worked out before starting the conversation.</p><Link to="/contact" className="button button-light">Prepare your enquiry<ArrowUpRight size={16} /></Link></div></div></section>
  </>
}
