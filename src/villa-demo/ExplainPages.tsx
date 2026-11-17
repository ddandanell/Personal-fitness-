import { useState, type FormEvent } from 'react'
import { CONCIERGE_LINE, HELP_EMAIL, PAYMENT_LINE, POLICY_LINE, SUPPLY_LINE, commissionRate, earnedCommission, eligibleRevenue, rp, villa } from './data'
import { DemoLink } from './shell'

const journey = [
  ['Scan', 'The guest opens the villa QR. The page is Villa Sora, with its photograph and menu.'],
  ['Choose', 'Four services are on the first screen. All services holds the rest of the menu.'],
  ['Request', 'One session: a future Bali date, a preferred time, the guests, and a way to reply.'],
  ['Coordinate', 'Personal Fitness matches a vetted instructor. The preferred time is not reserved yet.'],
  ['Confirm', 'The guest sees the total. Payment details are shared in the written quote. A session is confirmed only as supply allows.'],
]

export function HowItWorks() {
  return (
    <div className="pad">
      <p className="eyebrow">Built for villa managers</p>
      <h1>A guest menu for your villa. We coordinate the hour.</h1>
      <p className="lede">Guests scan a code in the room, choose a private session and send a request. Personal Fitness places a vetted instructor. You follow the booking and the commission agreed for completed sessions.</p>
      <div className="split">
        <section>
          <h2>Three views</h2>
          <dl className="spec">
            <div><dt>Guest</dt><dd>The villa menu, one request, a private status page and help. No sign-in.</dd></div>
            <div><dt>Villa desk</dt><dd>Upcoming sessions, a way to help a guest, the QR card, and commission for a manager.</dd></div>
            <div><dt>Coordination</dt><dd>The queue, the match, the written quote and the sample payout statement.</dd></div>
          </dl>
        </section>
        <section>
          <h2>The guest journey</h2>
          <ol className="steps">
            {journey.map(([title, copy], index) => <li key={title}><b>{index + 1}</b><span><strong>{title}</strong><br />{copy}</span></li>)}
          </ol>
        </section>
      </div>
      <h2>What you can tell the team</h2>
      <p>Your guests can scan this code to book a private wellness session at the villa. They choose the service and a preferred time, and Personal Fitness coordinates a vetted instructor. You can follow requests in the desk and earn the commission agreed for completed bookings.</p>
      <h2>A sample commercial agreement</h2>
      <p>The demonstration uses a proposed {Math.round(commissionRate * 100)}% of eligible completed service revenue. Twelve sample sessions at {rp(1050000)} are {rp(eligibleRevenue)}, so the sample commission is {rp(earnedCommission)}. These figures are for the demonstration. They are not a client list, a published offer, or a profit figure. {PAYMENT_LINE}</p>
      <p className="note">{CONCIERGE_LINE} {POLICY_LINE} {SUPPLY_LINE}</p>
      <div className="actions">
        <DemoLink to="/">Open Villa Sora</DemoLink>
        <DemoLink to="/setup">Request a villa setup</DemoLink>
        <DemoLink to="/walkthrough">Follow the demo script</DemoLink>
      </div>
    </div>
  )
}

const script = [
  ['Arrive at the villa', 'Open the guest menu. You should see Villa Sora, a Demo badge, and four services.', '/'],
  ['Request Private Yoga', 'Use tomorrow at 08:00 Bali and the prefilled sample guest. Send the request. The time is not reserved.', '/request/private-yoga?name=Demo%20Guest&whatsapp=%2B6281200000001&email=demo.guest%40example.com&time=08:00'],
  ['Follow the booking', 'On My booking, preview the availability check, then the offer, then Payment details sent with confirmation.', '/booking'],
  ['Open the villa desk', 'Switch to manager and read the sample commission, then open the QR card.', '/partner'],
  ['See coordination', 'The same request appears in the operations queue for this browser.', '/ops'],
  ['Ask for a real setup', 'The setup form is the live-inquiry shape. This demo does not send it.', '/setup'],
]

export function Walkthrough() {
  return (
    <div className="pad">
      <p className="eyebrow">Guided path</p>
      <h1>Show the whole journey</h1>
      <p className="lede">Built for villa managers. Try Villa Sora in this browser. Reset from the Demo badge when you want a clean pass.</p>
      <ol className="steps">
        {script.map(([title, copy, to], index) => (
          <li key={title}>
            <b>{index + 1}</b>
            <span>
              <strong>{title}</strong>
              <br />{copy}
              <br /><DemoLink to={to} className="text-link">Open this step</DemoLink>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function SetupPage() {
  const [sent, setSent] = useState(false)
  function onSubmit(event: FormEvent) {
    event.preventDefault()
    setSent(true)
  }
  return (
    <div className="pad">
      <p className="eyebrow">Real inquiry shape</p>
      <h1>Request a villa setup</h1>
      <p className="lede">This is the form a manager would use for their own villa. It is separate from the sample guest booking. This demonstration does not send email.</p>
      {sent ? (
        <p className="note" role="status">Nothing was sent. A live request would go to {HELP_EMAIL}. You can still walk the Villa Sora demo.</p>
      ) : (
        <form onSubmit={onSubmit}>
          <label className="field"><span>Your name</span><input required name="name" /></label>
          <label className="field"><span>Villa or company</span><input required name="villa" /></label>
          <label className="field"><span>Email</span><input required type="email" name="email" /></label>
          <label className="field"><span>Phone</span><input required name="phone" /></label>
          <button className="action" type="submit">Record setup request</button>
        </form>
      )}
    </div>
  )
}

export function PortalEntry() {
  return (
    <div className="pad">
      <p className="eyebrow">villas.personalfitness.id</p>
      <h1>For villa managers</h1>
      <p className="lede">Built for villa managers. Guests use their own villa link. This demonstration opens Villa Sora and a sample desk.</p>
      <div className="actions">
        <DemoLink to="/">Villa Sora guest menu</DemoLink>
        <DemoLink to="/partner">Partner desk</DemoLink>
        <DemoLink to="/how-it-works">How it works</DemoLink>
      </div>
      <p className="quiet">Guest address in this demo: /v/{villa.slug}. Printed cards use /q/sora-table.</p>
    </div>
  )
}
