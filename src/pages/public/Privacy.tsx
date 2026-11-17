import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { PageIntro } from '@/components/Primitives'
import { COMPANY_EMAIL } from '@/data/company'

export default function Privacy() {
  return <>
    <PageIntro eyebrow="Privacy" title="A simple enquiry helper, with sensitive details left out." description={`If you email a request from this website, it goes to ${COMPANY_EMAIL}. Sending a form does not create a booking.`} />
    <section className="section"><div className="content-shell privacy-prose">
      <h2>What happens to the form entries</h2><p>The details you type stay in the current page until you send them. If you choose email, that message is delivered to {COMPANY_EMAIL} and we reply to the address you entered. The form is not saved as an account or a health record. Closing or reloading the page clears it.</p>
      <h2>When you choose to contact us</h2><p>If you copy your message into the official PersonalFitness.id WhatsApp conversation, the information you send is used to respond to your request and coordinate the service you discuss. WhatsApp also has its own privacy terms and data practices.</p>
      <h2>Details that do not belong in chat</h2><p>Never send full payment-card, financial-account, personal-ID or similar sensitive identifiers in WhatsApp. Do not send detailed medical history, identity documents or incident records through the enquiry helper. Any necessary screening or payment step must use an appropriate secure channel.</p>
      <h2>Your communication choices</h2><p>You can ask a human for help, question how your details are being used or opt out of further communication. Ambiguity, complaints and safety concerns should always move to a human review rather than an automated response.</p>
      <Link to="/contact" className="button button-primary">Prepare a non-sensitive enquiry<ArrowUpRight size={16} /></Link>
    </div></section>
  </>
}
