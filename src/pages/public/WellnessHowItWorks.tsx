import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router'
import { Eyebrow, PageIntro } from '@/components/Primitives'
import { CtaBand } from '@/components/SiteBlocks'

const steps = [
  ['01', 'Check availability', 'Send the service, city, area, two-hour window and headcount. We confirm whether we can honour that visit in a published cluster.'],
  ['02', 'See the starting price', 'Published session rates, extra people, travel and programme savings sit on the estimator. The written quote is the payable total.'],
  ['03', 'Continue in WhatsApp', 'The draft carries the numbers. Nothing is booked until you accept the quote and payment is verified on the merchant link.'],
]

export default function WellnessHowItWorks() {
  return (
    <>
      <PageIntro eyebrow="How it works" title="A click is not a booking." description="Three steps from the first message to a confirmed hour. The website can estimate a starting price. Only a written quote plus verified payment confirms the session.">
        <Link to="/contact" className="button button-primary">Check availability<ArrowUpRight size={16} /></Link>
      </PageIntro>
      <section className="section">
        <div className="content-shell process-list">
          {steps.map(([number, title, copy]) => (
            <article key={number}><span className="process-number">{number}</span><div><h2>{title}</h2><p>{copy}</p></div></article>
          ))}
        </div>
      </section>
      <section className="section-compact section-light">
        <div className="shell split-feature">
          <div>
            <Eyebrow>Before you pay</Eyebrow>
            <h2>Know exactly what is included.</h2>
          </div>
          <ul className="check-list large-list">
            {['A named service and participant count', 'The complete session and travel charges', 'A visible programme saving on eligible visits', 'Cancellation and unused-session terms'].map((text) => (
              <li key={text}><Check size={18} />{text}</li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand dark title="Check availability for your window." copy="Estimate my price on the next page, then continue in WhatsApp." label="Check availability" to="/contact" />
    </>
  )
}
