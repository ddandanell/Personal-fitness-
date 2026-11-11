import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { PageIntro } from '@/components/Primitives'

export default function Privacy() {
  return <>
    <PageIntro eyebrow="Privacy" title="A simple enquiry helper, with sensitive details left out." description="This website helps you prepare a message on your own device. It does not transmit your form entries to a company server or create a booking." />
    <section className="section"><div className="content-shell privacy-prose">
      <h2>What happens to the form entries</h2><p>The details you type into the enquiry helper are held only in the current page while you use it. They are not submitted to a website database. When you generate a message, you choose whether to copy it or download it as a text file. Closing or reloading the page clears the form.</p>
      <h2>When you choose to contact us</h2><p>If you copy your message into the official PersonalFitness.id WhatsApp conversation, the information you send is used to respond to your request and coordinate the service you discuss. WhatsApp also has its own privacy terms and data practices.</p>
      <h2>Details that do not belong in chat</h2><p>Never send full payment-card, financial-account, personal-ID or similar sensitive identifiers in WhatsApp. Do not send detailed medical history, identity documents or incident records through the enquiry helper. Any necessary screening or payment step must use an appropriate secure channel.</p>
      <h2>Your communication choices</h2><p>You can ask a human for help, question how your details are being used or opt out of further communication. Ambiguity, complaints and safety concerns should always move to a human review rather than an automated response.</p>
      <Link to="/contact" className="button button-primary">Prepare a non-sensitive enquiry<ArrowUpRight size={16} /></Link>
    </div></section>
  </>
}
