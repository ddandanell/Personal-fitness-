import { useState, type FormEvent } from 'react'
import { PAYMENT_LINE, PAYMENT_SENT, baliISO, commissionRate, completedCount, earnedCommission, eligibleRevenue, formatBali, rp, sampleBookings, sampleQueue, services, villa, type QueueStage } from './data'
import { useDemoState } from './demo-state'
import { DemoLink } from './shell'

export function PartnerDesk() {
  const { role, setRole, booking, submit } = useDemoState()
  const upcoming = sampleBookings().filter((item) => item.reference !== 'PF-20390')
  const [made, setMade] = useState('')

  function createForGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const service = services.find((item) => item.slug === String(form.get('service'))) ?? services[0]
    const name = String(form.get('name') || '').trim()
    const whatsapp = String(form.get('whatsapp') || '').trim()
    const date = String(form.get('date') || '')
    const result = submit({
      idempotencyKey: ['desk', name, whatsapp, service.slug, date].join('|'),
      serviceSlug: service.slug,
      serviceName: service.name,
      date,
      time: '09:00',
      participants: 1,
      name,
      whatsapp,
      email: '',
      note: 'Created from the villa desk in this demonstration.',
      preference: '',
      total: 1_050_000,
    })
    const saved = `${result.booking.reference}: ${result.booking.serviceName} on ${result.booking.date}`
    setMade(result.created ? `Saved ${saved}` : `Already saved as ${saved}`)
  }

  return (
    <div className="pad">
      <p className="eyebrow">Demo data · {villa.name}</p>
      <h1>Villa desk</h1>
      <p className="lede">Built for villa managers. Reception sees upcoming sessions. A manager also sees the sample commission. This switch stays in this browser.</p>
      <div className="role-switch" role="group" aria-label="Sample role">
        <button type="button" className={role === 'reception' ? 'is-on' : undefined} onClick={() => setRole('reception')}>Reception</button>
        <button type="button" className={role === 'manager' ? 'is-on' : undefined} onClick={() => setRole('manager')}>Manager</button>
      </div>
      {role === 'manager' && (
        <div className="stats">
          <article><span>Completed sessions</span><strong>{completedCount}</strong></article>
          <article><span>Eligible service revenue</span><strong>{rp(eligibleRevenue)}</strong></article>
          <article><span>Earned commission</span><strong>{rp(earnedCommission)}</strong></article>
        </div>
      )}
      <div className="actions">
        <DemoLink to="/">View guest page</DemoLink>
        <DemoLink to="/card">Download villa QR</DemoLink>
        <a href="#create-request">Create guest request</a>
      </div>
      <h2>Upcoming bookings</h2>
      <ul className="ledger">
        <li className="head"><span>Guest</span><span>Service</span><span>Bali time</span><span>Status</span></li>
        {booking && (
          <li>
            <span>{booking.name}</span>
            <span>{booking.serviceName} · {villa.name}</span>
            <span>{formatBali(booking.date)} · {booking.time}</span>
            <span className="pill">{booking.status === 'received' ? 'Request received' : booking.status === 'checking' ? 'Checking availability' : booking.status === 'offer' ? 'Offer ready' : 'Confirmed, as supply allows'}</span>
          </li>
        )}
        {upcoming.map((item) => (
          <li key={item.reference}>
            <span>{item.guest}</span>
            <span>{item.service} · {villa.name}</span>
            <span>{formatBali(item.iso)} · {item.time}</span>
            <span className="pill">{item.status}</span>
          </li>
        ))}
      </ul>
      <p className="quiet">Sample guests are fictional. Their references do not open a private booking from the villa QR.</p>
      {role === 'manager' && (
        <>
          <h2>Commission</h2>
          <p>A proposed 10% of eligible completed service revenue for this sample agreement. {rp(eligibleRevenue)} × {Math.round(commissionRate * 100)}% = {rp(earnedCommission)}. It is a demonstration figure, earned in the sample only after a completed session, and it is not a guest price or a profit figure.</p>
        </>
      )}
      <h2 id="create-request">Create a request</h2>
      <form onSubmit={createForGuest}>
        <label className="field"><span>Guest name</span><input name="name" required /></label>
        <label className="field"><span>WhatsApp</span><input name="whatsapp" required defaultValue="+62 812 0000 0099" /></label>
        <label className="field"><span>Service</span>
          <select name="service">{services.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select>
        </label>
        <label className="field"><span>Date</span><input type="date" name="date" required defaultValue={baliISO(1)} /></label>
        <button className="action" type="submit">Save sample request</button>
      </form>
      {made && <p className="note">{made}. The private link stays off the printed QR.</p>}
    </div>
  )
}

export function OpsDesk() {
  const { booking } = useDemoState()
  const [stage, setStage] = useState<QueueStage | 'All'>('All')
  const rows = sampleQueue()
  const live = booking ? {
    reference: booking.reference,
    villa: villa.name,
    service: booking.serviceName,
    when: `${formatBali(booking.date)} · ${booking.time} Bali`,
    age: 'Just now',
    owner: booking.status === 'received' ? 'Unassigned' : 'Dewi',
    stage: booking.status === 'received' ? 'New' as const : booking.status === 'checking' ? 'Matching' as const : booking.status === 'offer' ? 'Offered' as const : 'Confirmed' as const,
    next: booking.status === 'offer' ? 'Share the written quote, as supply allows' : booking.status === 'confirmed' ? PAYMENT_SENT : 'Validate the request and assign Dewi',
  } : null
  const all = live ? [live, ...rows] : rows
  const visible = stage === 'All' ? all : all.filter((item) => item.stage === stage)
  const stages: (QueueStage | 'All')[] = ['All', 'New', 'Matching', 'Offered', 'Confirmed', 'Exceptions']
  return (
    <div className="pad">
      <p className="eyebrow">Personal Fitness coordination</p>
      <h1>Request queue</h1>
      <p className="lede">Every sample request has an owner and a next action. A first update during coordination hours is an internal aim, as supply allows.</p>
      <div className="queue-tabs" role="tablist" aria-label="Queue">
        {stages.map((item) => <button type="button" key={item} className={stage === item ? 'is-on' : undefined} onClick={() => setStage(item)}>{item}</button>)}
      </div>
      <ul className="ledger">
        {visible.map((item) => (
          <li key={item.reference}>
            <span><strong>{item.reference}</strong><br />{item.villa}</span>
            <span>{item.service}<br />{item.when}</span>
            <span>{item.age} · {item.owner}<br />{item.next}</span>
            <span className="pill">{item.stage}</span>
          </li>
        ))}
      </ul>
      <div className="split">
        <section>
          <h2>Written quotes</h2>
          <ul className="ledger payments">
            <li><span>PF-20418</span><span>{PAYMENT_SENT} {rp(1050000)}</span></li>
            <li><span>PF-20430</span><span>{PAYMENT_LINE} {rp(1050000)}</span></li>
            {booking && <li><span>{booking.reference}</span><span>{booking.payment === 'details-sent' ? PAYMENT_SENT : PAYMENT_LINE} {rp(booking.total)}</span></li>}
          </ul>
          <p className="quiet">This demonstration does not take a payment. The confirmation step reads: {PAYMENT_SENT}</p>
        </section>
        <section>
          <h2>Partner payout</h2>
          <p>{villa.name} sample statement. Eligible completed revenue {rp(eligibleRevenue)}. Commission at 10% {rp(earnedCommission)}. An adjustment after a statement would be a separate line on the next one.</p>
          <h2>Sample hours</h2>
          <p>Lena Ortiz, Private Yoga, {formatBali(sampleBookings()[0].iso)} at 08:00 Bali, as supply allows. Travel and setup sit outside the 60 minutes.</p>
        </section>
      </div>
    </div>
  )
}
