import { Check } from 'lucide-react'
import { Link } from 'react-router'
import { Eyebrow, TextLink } from './Primitives'

const points = [
  'A coordinator matches the session, cluster and window, then names the professional on the quote.',
  'The hour is private at your villa or home. You are not buying a class pack or a public gym intro.',
  'Access checks and a written total are part of the rate. A cash WhatsApp rate usually does not include those. A backup instructor is named where available.',
  'There is no free first session. The first visit uses the published rate so the quote and the hour match.',
]

export default function WhyTheRate() {
  return (
    <section className="section">
      <div className="shell split-feature">
        <div>
          <Eyebrow>Why this rate</Eyebrow>
          <h2>The published hour is a managed visit, not a walk-up class.</h2>
          <p className="large-copy">Some Bali trainers advertise Rp 550.000–650.000 and a complimentary first session. PersonalFitness.id publishes from Rp 1.050.000 because the product is different: matching, confirmation, travel rules and a professional named in writing before you pay.</p>
          <p>That is the comparison that matters. A cheaper cash rate without access checks or a written quote is a different service. Read <TextLink to="/professional-standards">how we match professionals</TextLink> and <TextLink to="/how-it-works">how the hour is confirmed</TextLink>.</p>
        </div>
        <ul className="check-list large-list">
          {points.map((item) => (
            <li key={item}><Check size={19} />{item}</li>
          ))}
        </ul>
      </div>
      <div className="shell" style={{ marginTop: 12 }}>
        <Link to="/contact" className="text-link">Check a window at the published rate</Link>
      </div>
    </section>
  )
}
