import { Link } from 'react-router'
import { PageIntro } from '@/components/Primitives'
import { COMPANY_EMAIL, COMPANY_EMAIL_HREF } from '@/data/company'
import { WHATSAPP_DISPLAY } from '@/lib/whatsapp'
import { commissionShare, partner } from '@/config/partner'

export default function PartnerTerms() {
  const share = commissionShare('en')
  const base = partner.COMMISSION_BASE === 'session-excluding-travel-and-extras'
    ? ' of the session price, excluding travel and extra-person fees,'
    : ' of the session price'
  const payout = partner.COMMISSION_PAYOUT_DAY
    ? `Monthly, by ${partner.COMMISSION_PAYOUT_DAY} of the next month, to the account you give us in writing.`
    : 'Monthly, to the account you give us in writing.'
  const liability = partner.LIABILITY_TEXT || 'Ask us and we send the current written explanation. We do not publish placeholder legal wording.'
  return (
    <>
      <PageIntro eyebrow="Partners" title="Villa partner terms." description="Plain-English terms for villa managers, agencies and boutique hosts. Guests still pay the published website price." />
      <section className="section">
        <div className="content-shell privacy-prose">
          <h2>1. Commission</h2>
          <p>You earn {share}{partner.COMMISSION_PCT != null ? base : ''} for every session paid by a guest who booked with your partner code.</p>
          <h2>2. Payout</h2>
          <p>{payout} Refunded sessions earn no commission.</p>
          <h2>3. Prices</h2>
          <p>Guests pay the published website price. Partners do not resell above it unless agreed in writing.</p>
          <h2>4. Attribution</h2>
          <p>A booking counts for you if the guest’s first WhatsApp message carries your partner code, or your team sends the request.</p>
          <h2>5. Materials</h2>
          <p>We provide menu cards and QR codes. You place them. Either side can remove them at any time.</p>
          <h2>6. Pilot and ending</h2>
          <p>30-day pilot at 1–2 villas. Either side can stop with 14 days’ notice by email or WhatsApp. Earned commission is still paid.</p>
          <h2>7. Guests and privacy</h2>
          <p>We share only time and villa with your team. Guest health information stays with the coach.</p>
          <h2>8. Safety and liability</h2>
          <p>{liability}</p>
          <h2>9. Contact</h2>
          <p>Email <a href={COMPANY_EMAIL_HREF}>{COMPANY_EMAIL}</a>. WhatsApp {WHATSAPP_DISPLAY}.</p>
          <p><Link to="/villa-hotel-partners">Back to the partner programme</Link></p>
        </div>
      </section>
    </>
  )
}
