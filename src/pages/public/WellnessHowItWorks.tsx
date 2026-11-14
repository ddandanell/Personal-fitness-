import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router'
import { Eyebrow, PageIntro, TextLink } from '@/components/Primitives'
import { CtaBand } from '@/components/SiteBlocks'
import StructuredData from '@/components/StructuredData'
import { faqs } from '@/data/content'
import { faqJsonLd, howToJsonLd } from '@/lib/schema'
import { WHATSAPP_DISPLAY } from '@/lib/whatsapp'

const steps = [
  { id: '01', name: 'Enquiry', text: 'Send the service, city, area, two-hour window, headcount and a non-sensitive goal. WhatsApp +62 811-3803-488 or the contact estimator is enough.' },
  { id: '02', name: 'Qualification', text: 'We check that the request is in scope: a published fitness session, a usable private space, a cluster we publish, and no clinical work hiding in the brief.' },
  { id: '03', name: 'Supply check', text: 'A suitable professional accepts the exact window and cost ceiling, or we offer a second name. An enquiry does not reserve 07:00.' },
  { id: '04', name: 'Written quote', text: 'You receive the total, extras, exclusions and cancellation terms. The website estimator shows the starting price for this step. The quote is what you pay.' },
  { id: '05', name: 'Payment', text: 'You pay only on the merchant link in the quote. Nothing is booked on a screenshot, a chat “ok”, or a card number sent in WhatsApp.' },
  { id: '06', name: 'Confirmation', text: 'You get the professional, arrival window, access note and preparation list. That is the booking, not the first message.' },
  { id: '07', name: 'Delivery', text: 'The session runs as confirmed at your villa or home. Deviations and incidents are recorded. Safety issues leave the normal queue.' },
  { id: '08', name: 'Aftercare', text: 'A next-session hold if you want one, and a human owner if something failed. Programmes start after the first paid visit unless the quote says otherwise.' },
]

const pageFaqs = [
  faqs.find((pair) => pair[0].includes('book a personal trainer')),
  faqs.find((pair) => pair[0].includes('enquiry reserve')),
  faqs.find((pair) => pair[0] === 'How do I pay?'),
  faqs.find((pair) => pair[0] === 'Is this a marketplace of coaches?'),
].filter((pair): pair is (typeof faqs)[number] => Boolean(pair))

export default function WellnessHowItWorks() {
  return (
    <>
      <StructuredData data={howToJsonLd('How to book a personal trainer at home in Bali or Jakarta', 'Eight steps from the first WhatsApp to aftercare. A click is not a booking. Only a written quote plus verified payment confirms the hour.', steps)} />
      {pageFaqs.length >= 2 && <StructuredData data={faqJsonLd(pageFaqs)} />}
      <PageIntro eyebrow="How it works" title="A click is not a booking." description="Eight steps from the first message to aftercare. The website can estimate a starting price. Only a written quote plus verified payment confirms the session at your villa or home.">
        <div className="cluster">
          <Link to="/contact" className="button button-primary">Start at step one<ArrowUpRight size={16} /></Link>
          <Link to="/pricing" className="button button-outline">See session prices</Link>
        </div>
      </PageIntro>
      <section className="section">
        <div className="content-shell process-list">
          {steps.map((step) => (
            <article key={step.id} id={'step-' + step.id}>
              <span className="process-number">{step.id}</span>
              <div>
                <h2>{step.name}</h2>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section-compact section-light">
        <div className="shell split-feature">
          <div>
            <Eyebrow>Before you pay</Eyebrow>
            <h2>Know exactly what is included.</h2>
            <p className="large-copy">The quote names the session, the people, the travel and the cancellation line. If a cost is not written there, it is not assumed.</p>
            <div className="cluster" style={{ marginTop: 18 }}>
              <TextLink to="/pricing">Published starting prices</TextLink>
              <TextLink to="/resources/what-to-put-in-a-whatsapp-enquiry-for-a-home-trainer">WhatsApp enquiry template</TextLink>
              <TextLink to="/faq">Common questions</TextLink>
            </div>
          </div>
          <ul className="check-list large-list">
            {['A named service and participant count', 'The complete session and travel charges', 'A visible programme saving on eligible visits', 'Cancellation and unused-session terms', `WhatsApp ${WHATSAPP_DISPLAY} carries the request, not the payment`].map((text) => (
              <li key={text}><Check size={18} />{text}</li>
            ))}
          </ul>
        </div>
      </section>
      {pageFaqs.length > 0 && (
        <section className="section-compact">
          <div className="content-shell faq-list">
            <div className="section-title"><div><Eyebrow>Questions</Eyebrow><h2>Booking, payment and confirmation.</h2></div></div>
            {pageFaqs.map(([question, answer]) => (
              <details className="faq-item" key={question}>
                <summary><span>{question}</span></summary>
                <div className="faq-body"><p>{answer}</p></div>
              </details>
            ))}
          </div>
        </section>
      )}
      <CtaBand dark title="Put the details in one message." copy="The estimator builds the numbers. WhatsApp carries the request. The quote closes the loop." to="/contact" label="Check availability" />
    </>
  )
}
