import { useMemo, useRef, useState, type FormEvent } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { QrMark } from './qr'
import { BACKUP_LINE, CONCIERGE_LINE, HELP_EMAIL, PAYMENT_LINE, PAYMENT_SENT, POLICY_LINE, SUPPLY_LINE, WHATSAPP_DISPLAY, WHATSAPP_URL, baliISO, featuredServices, formatBali, getService, knownPlacement, packs, rp, services, sessionQuote, sessionTimes, villa } from './data'
import { useDemoState } from './demo-state'
import { QR_LANDING, demoHref } from './host'
import { DemoLink } from './shell'

export function GuestHome() {
  const { code, slug } = useParams()
  if (slug && slug !== villa.slug) return <UnknownVilla slug={slug} />
  if (code && !knownPlacement(code)) return <PausedCode code={code} />
  const featured = featuredServices()
  return (
    <>
      <figure className="sora-hero">
        <img src={villa.photo.src} alt={villa.photo.alt} width={villa.photo.width} height={villa.photo.height} />
        <figcaption>
          <h1>Welcome to {villa.name}</h1>
          <p>{villa.welcome}</p>
          <small>{villa.area} · Powered by Personal Fitness</small>
        </figcaption>
      </figure>
      <div className="pad">
        {code && <p className="note">Opened from placement code {code}. This card shows the villa menu only.</p>}
        <div>
          {featured.map((service) => <ServiceRow key={service.slug} slug={service.slug} />)}
        </div>
        <DemoLink to="/services" className="all-link">All services <span>{services.length}</span></DemoLink>
        <p className="note">{CONCIERGE_LINE}</p>
        <DemoLink to="/help" className="text-link">Need help? Message the coordinator</DemoLink>
      </div>
    </>
  )
}

export function ServicesIndex() {
  return (
    <div className="pad">
      <p className="eyebrow">{villa.name}</p>
      <h1>All services</h1>
      <p className="lede">One hour, at the villa. A pack can be suggested after the first request, as supply allows.</p>
      {services.map((service) => <ServiceRow key={service.slug} slug={service.slug} />)}
      <p className="note">Massage is not on this villa’s menu. {CONCIERGE_LINE}</p>
    </div>
  )
}

function ServiceRow({ slug }: { slug: string }) {
  const service = getService(slug)!
  return (
    <DemoLink to={`/services/${service.slug}`} className="svc">
      <img src={service.image.src} alt="" width={72} height={72} />
      <span>
        <strong>{service.name}</strong>
        <small>{service.duration} · {service.participants}</small>
      </span>
      <em>{rp(1050000)}</em>
    </DemoLink>
  )
}

export function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)
  if (!service) return <div className="pad"><h1>Service unavailable</h1><DemoLink to="/services">Back to the menu</DemoLink></div>
  const quote = sessionQuote(1, service.maxGuests)
  return (
    <article>
      <img className="detail-photo" src={service.image.src} alt={service.image.alt} width={service.image.width} height={service.image.height} />
      <div className="pad">
        <p className="eyebrow">{villa.name} · Demo</p>
        <h1>{service.name}</h1>
        <p className="lede">{service.sentence}</p>
        <dl className="spec">
          <div><dt>Duration</dt><dd>{service.duration}</dd></div>
          <div><dt>Participants</dt><dd>{service.participants}</dd></div>
          <div><dt>Price basis</dt><dd>{service.priceBasis}</dd></div>
          <div><dt>Included</dt><dd>{service.included}</dd></div>
          <div><dt>Brought to the villa</dt><dd>{service.brought}</dd></div>
          <div><dt>The villa provides</dt><dd>{service.guestProvides}</dd></div>
          <div><dt>Setup</dt><dd>{service.setup}</dd></div>
          <div><dt>Service area</dt><dd>{service.area}</dd></div>
          <div><dt>Earliest request</dt><dd>{service.lead}</dd></div>
          <div><dt>Rescheduling</dt><dd>{service.cancel}</dd></div>
          <div><dt>Languages</dt><dd>{service.languages}</dd></div>
          <div><dt>Before a name is confirmed</dt><dd>{service.capability}</dd></div>
        </dl>
        <div className="rates" aria-label="Session packs">
          {packs.map((pack) => (
            <article key={pack.id} className={pack.popular ? 'is-pop' : undefined}>
              <span><strong>{pack.label}</strong>{pack.popular && <em> Most popular</em>}<small style={{ display: 'block', color: 'var(--muted)' }}>{rp(pack.perSession)} / session</small></span>
              <strong>{rp(pack.total)}</strong>
            </article>
          ))}
        </div>
        <p className="quiet">This request is for one session. {CONCIERGE_LINE}</p>
        <div className="sticky-cta">
          <span>One guest<strong>{rp(quote.total)}</strong></span>
          <DemoLink to={`/request/${service.slug}`} className="action">Request this session</DemoLink>
        </div>
      </div>
    </article>
  )
}

export function RequestPage() {
  const { slug } = useParams()
  const service = getService(slug)
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { submit } = useDemoState()
  const key = useRef(typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `key-${slug}`)
  const [date, setDate] = useState(baliISO(1))
  const [time, setTime] = useState(params.get('time') || '08:00')
  const [people, setPeople] = useState(1)
  const [name, setName] = useState(params.get('name') || '')
  const [whatsapp, setWhatsapp] = useState(params.get('whatsapp') || '')
  const [email, setEmail] = useState(params.get('email') || '')
  const [note, setNote] = useState('')
  const [preference, setPreference] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [savedNote, setSavedNote] = useState('')
  if (!service) return <div className="pad"><h1>Service unavailable</h1></div>
  const selected = service
  const quote = sessionQuote(people, selected.maxGuests)
  const minDate = baliISO(1)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const next: string[] = []
    if (!date || date < minDate) next.push('Choose a future Bali date. Same-day requests are reviewed by a coordinator and are not reserved.')
    if (!sessionTimes.includes(time as typeof sessionTimes[number])) next.push('Choose a preferred start time.')
    if (name.trim().length < 2) next.push('Add the lead guest’s name.')
    const digits = whatsapp.replace(/\D/g, '')
    if (digits.length < 8 && !email.includes('@')) next.push('Add a WhatsApp number with the country code, or an email address.')
    setErrors(next)
    if (next.length) return
    const result = submit({
      idempotencyKey: key.current,
      serviceSlug: selected.slug,
      serviceName: selected.name,
      date,
      time,
      participants: quote.guests,
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      note,
      preference,
      total: quote.total,
    })
    if (!result.created) setSavedNote(`This request was already saved as ${result.booking.reference}.`)
    navigate(demoHref(`/booking/${result.booking.token}`))
  }

  return (
    <div className="pad">
      <p className="eyebrow">Session details · {villa.name}</p>
      <h1>{service.name}</h1>
      <p className="lede">The villa is already on this request. A preferred time is not a reservation.</p>
      <form onSubmit={onSubmit} noValidate>
        {errors.length > 0 && <div className="note" role="alert">{errors.map((item) => <p key={item}>{item}</p>)}</div>}
        {savedNote && <p className="note">{savedNote}</p>}
        <label className="field"><span>Preferred date</span><input type="date" value={date} min={minDate} required onChange={(event) => setDate(event.target.value)} /></label>
        <label className="field"><span>Preferred time, Bali</span>
          <select value={time} onChange={(event) => setTime(event.target.value)}>
            {sessionTimes.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <div className="field"><span>Participants</span>
          <div className="choice-row" role="group" aria-label="Participants">
            {[1, service.maxGuests].filter((value, index, list) => list.indexOf(value) === index).map((count) => (
              <button type="button" key={count} className={people === count ? 'is-on' : undefined} onClick={() => setPeople(count)}>{count === 1 ? '1 guest' : `${count} guests`}</button>
            ))}
          </div>
        </div>
        <label className="field"><span>Your name</span><input value={name} autoComplete="name" onChange={(event) => setName(event.target.value)} required /></label>
        <label className="field"><span>WhatsApp, with country code</span><input value={whatsapp} inputMode="tel" autoComplete="tel" placeholder="+62…" onChange={(event) => setWhatsapp(event.target.value)} /></label>
        <label className="field"><span>Email, if you do not use WhatsApp</span><input type="email" value={email} autoComplete="email" onChange={(event) => setEmail(event.target.value)} /></label>
        <details className="more">
          <summary>Optional requests</summary>
          <label className="field"><span>Experience, access, or a note for the villa</span><textarea value={note} onChange={(event) => setNote(event.target.value)} /></label>
          <label className="field"><span>Instructor preference, if you have one</span><input value={preference} onChange={(event) => setPreference(event.target.value)} /><small className="quiet">A preference is passed on. It is not a confirmed assignment.</small></label>
        </details>
        <div className="total-box"><span>Demo total, one session<br /><small>Second guest {people > 1 ? rp(250000) : 'Rp 0'} · Travel Rp 0</small></span><strong>{rp(quote.total)}</strong></div>
        <p className="quiet">{POLICY_LINE} {SUPPLY_LINE} {CONCIERGE_LINE} {PAYMENT_LINE} This demonstration stores the request in this browser and does not send email.</p>
        <button className="action" type="submit">Request this session</button>
      </form>
    </div>
  )
}

const statusCopy = {
  received: 'Request received. The time is not reserved yet.',
  checking: 'Checking availability. A coordinator is matching the session, the area and your preferred time.',
  offer: 'Offer ready. A vetted instructor can take this hour. The total below is the amount due.',
  confirmed: 'Confirmation preview, as supply allows. Payment details sent with confirmation.',
} as const

export function BookingLookup() {
  return <BookingPage />
}

export function BookingPage() {
  const { token } = useParams()
  const { booking, findByContact, advance, payDemo } = useDemoState()
  const [reference, setReference] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [miss, setMiss] = useState(false)
  const navigate = useNavigate()
  const match = booking && (!token || booking.token === token) ? booking : null
  const service = getService(match?.serviceSlug)

  function lookup(event: FormEvent) {
    event.preventDefault()
    const found = findByContact(reference, whatsapp)
    if (!found) {
      setMiss(true)
      return
    }
    navigate(demoHref(`/booking/${found.token}`))
  }

  if (!match) {
    return (
      <div className="pad">
        <p className="eyebrow">Private to this request</p>
        <h1>My booking</h1>
        <p className="lede">The villa QR does not open a booking list. Enter the reference and WhatsApp from your own request.</p>
        <form onSubmit={lookup}>
          {miss && <p className="note" role="alert">No request in this browser matches that reference and number.</p>}
          <label className="field"><span>Reference</span><input value={reference} onChange={(event) => setReference(event.target.value)} autoComplete="off" /></label>
          <label className="field"><span>WhatsApp</span><input value={whatsapp} inputMode="tel" onChange={(event) => setWhatsapp(event.target.value)} /></label>
          <button className="action" type="submit">Show my request</button>
        </form>
      </div>
    )
  }

  const steps = ['received', 'checking', 'offer', 'confirmed'] as const
  return (
    <div className="pad">
      <p className="eyebrow">{match.reference}</p>
      <h1>{statusCopy[match.status].split('.')[0]}</h1>
      <p className="lede">{statusCopy[match.status]} {CONCIERGE_LINE}</p>
      <ol className="status-list">
        {steps.map((step) => <li key={step} className={step === match.status ? 'is-on' : undefined}><span>{statusCopy[step].split('.')[0]}</span></li>)}
      </ol>
      <dl className="spec">
        <div><dt>Service</dt><dd>{match.serviceName}</dd></div>
        <div><dt>Villa</dt><dd>{villa.name}, {villa.area}</dd></div>
        <div><dt>Preferred time</dt><dd>{formatBali(match.date)} · {match.time} Bali</dd></div>
        <div><dt>Guests</dt><dd>{match.participants}</dd></div>
        <div><dt>Total</dt><dd>{rp(match.total)}. {match.payment === 'details-sent' ? PAYMENT_SENT : PAYMENT_LINE}</dd></div>
        <div><dt>Rescheduling</dt><dd>{POLICY_LINE} {SUPPLY_LINE}</dd></div>
        {match.status === 'confirmed' && <div><dt>Sample assignment</dt><dd>Ayu Prameswari is a sample name in this preview. In a live booking the instructor is named on the written quote. {BACKUP_LINE} {service?.languages}</dd></div>}
      </dl>
      {match.preference && <p className="note">Preference noted: {match.preference}. It is not a confirmed assignment.</p>}
      <div className="demo-panel">
        <p className="eyebrow">Demonstration only</p>
        <p>Preview the next status. Nothing here sends a quote or an email.</p>
        <div className="row">
          {match.status === 'received' && <button type="button" className="ghost" onClick={advance}>Preview availability check</button>}
          {match.status === 'checking' && <button type="button" className="ghost" onClick={advance}>Preview the offer</button>}
          {match.status === 'offer' && <button type="button" className="action" onClick={payDemo}>Payment details sent with confirmation</button>}
        </div>
        {match.offerExpiresAt && match.status === 'offer' && <p className="quiet">The sample offer stays open as supply allows. {PAYMENT_LINE}</p>}
      </div>
    </div>
  )
}

export function HelpPage() {
  const message = `Villa Sora, Canggu. I need help with a wellness request.`
  return (
    <div className="pad">
      <p className="eyebrow">{villa.name}</p>
      <h1>Help</h1>
      <p className="lede">The message includes the villa. A coordinator replies as supply allows. {CONCIERGE_LINE}</p>
      <dl className="spec">
        <div><dt>WhatsApp</dt><dd><a className="text-link" href={`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`}>{WHATSAPP_DISPLAY}</a></dd></div>
        <div><dt>Email</dt><dd><a className="text-link" href={`mailto:${HELP_EMAIL}?subject=Villa%20Sora`}>{HELP_EMAIL}</a></dd></div>
        <div><dt>Changing villa</dt><dd>Ask here. The location and the total are checked before a request moves.</dd></div>
      </dl>
      <p className="quiet">{POLICY_LINE}</p>
    </div>
  )
}

function UnknownVilla({ slug }: { slug: string }) {
  return (
    <div className="pad">
      <h1>This villa link is not active</h1>
      <p className="lede">{slug} is not on this demonstration. Existing sessions would keep their private links.</p>
      <DemoLink to="/help" className="text-link">Contact the coordinator</DemoLink>
    </div>
  )
}

function PausedCode({ code }: { code: string }) {
  return (
    <div className="pad">
      <h1>This card is paused</h1>
      <p className="lede">Code {code} does not open a guest list. Ask the villa for the current card, or message the coordinator.</p>
      <DemoLink to="/help" className="action solid">Help for Villa Sora</DemoLink>
    </div>
  )
}

export function QrCard() {
  const value = useMemo(() => QR_LANDING, [])
  return (
    <div className="pad">
      <p className="eyebrow no-print">Printable A6 card</p>
      <article className="card-sheet">
        <p className="eyebrow">Villa Sora</p>
        <h1>Scan to book private wellness at your villa.</h1>
        <QrMark value={value} label="QR code opening the Villa Sora menu" />
        <p>demo.personalfitness.id/q/sora-table</p>
        <p>{WHATSAPP_DISPLAY}<br />{HELP_EMAIL}</p>
        <p className="quiet">Powered by Personal Fitness. {POLICY_LINE}</p>
      </article>
      <p className="no-print quiet">The printed code is /q/sora-table. The villa page can change without reprinting that code. The QR does not contain a booking.</p>
      <button type="button" className="ghost no-print" onClick={() => window.print()}>Print or save as PDF</button>
    </div>
  )
}
