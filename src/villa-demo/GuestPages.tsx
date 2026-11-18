import { PHOTO_CAPTION } from '@/data/offerCopy'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check, CheckCircle2, ChevronDown, Clock3, Leaf, MapPin, MessageCircle, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { QrMark } from './qr'
import { CONCIERGE_LINE, HELP_EMAIL, PAYMENT_LINE, POLICY_LINE, SINGLE_SESSION, baliISO, formatBali, getService, knownPlacement, packsForService, rp, services, sessionQuote, sessionTimes, villa, type DemoImage, type Service } from './data'
import { useDemoState } from './demo-state'
import { QR_LANDING, demoHref } from './host'
import { DemoLink, GuestDialog, VillaQr } from './shell'

export function GuestPhoto({ image, className, priority = false, sizes = '(max-width: 600px) 50vw, (max-width: 1000px) 50vw, 25vw' }: { image: DemoImage; className?: string; priority?: boolean; sizes?: string }) {
  return <img className={className} src={image.src} srcSet={`${image.src.replace('.webp', '-640.webp')} 640w, ${image.src} 1600w`} sizes={sizes} alt={image.alt} width={image.width} height={image.height} loading={priority ? 'eager' : 'lazy'} decoding="async" fetchPriority={priority ? 'high' : 'auto'} />
}

const serviceMood: Record<string, { category: 'move' | 'restore'; tag: string; short: string }> = {
  'private-yoga': { category: 'restore', tag: 'BREATHE & BALANCE', short: 'A slower morning, or a stronger flow. Your practice, your pace.' },
  'private-strength': { category: 'move', tag: 'STRENGTH & ENERGY', short: 'Keep your rhythm with a workout made around you.' },
  'mat-pilates': { category: 'move', tag: 'CONTROL & CONNECTION', short: 'Mindful movement to feel a little more centred.' },
  bodywork: { category: 'restore', tag: 'REST & RECOVERY', short: 'Switch off and settle into an unhurried recovery hour.' },
  zumba: { category: 'move', tag: 'MOVEMENT & JOY', short: 'Good music, easy energy and a private dance-fitness hour.' },
  'quieter-hour': { category: 'restore', tag: 'STILLNESS & SPACE', short: 'A quiet pause in your day, with gentle guidance.' },
  mobility: { category: 'move', tag: 'STRETCH & RESET', short: 'Make a little room to stretch, move and feel at ease.' },
  boxing: { category: 'move', tag: 'FOCUS & FITNESS', short: 'Find your energy with private pad work and conditioning.' },
}

export function GuestHome() {
  const { code, slug } = useParams()
  if (slug && slug !== villa.slug) return <Unavailable title="Let's get you to your villa." text="This villa link is not active. Open the Villa Sora menu or ask the concierge for help." />
  if (code && !knownPlacement(code)) return <Unavailable title="Let's find your wellness menu." text="This QR code is no longer active. Your concierge can help you find the right villa menu." />
  return <>
    <section className="guest-hero" aria-labelledby="welcome-title">
      <GuestPhoto image={villa.photo} priority sizes="(max-width: 1280px) 100vw, 1240px" />
      <div className="hero-shade" />
      <div className="hero-copy"><span className="hero-eyebrow"><span /> WELCOME TO VILLA SORA</span><h1 id="welcome-title">Your villa.<br /><em>Your pace.</em></h1><p>Move, unwind and feel good.<br />Private wellness, brought to you.</p><a className="hero-action" href="#sessions">Find your session <ArrowUpRight size={18} /></a></div>
      <div className="hero-location"><MapPin size={13} /> Canggu, Bali</div>
      <div className="hero-detail"><Leaf size={18} strokeWidth={1.3} /><span>A little time<br /><strong>just for you.</strong></span></div>
    </section>
    <p className="photo-policy-caption">{PHOTO_CAPTION}</p><div className="guest-reassurance"><span><MapPin size={16} /> At your villa</span><span><Users size={16} /> Private, personal sessions</span><span><MessageCircle size={16} /> English-speaking instructors</span><span><Sparkles size={16} /> Everything coordinated</span></div>
    <ServiceCollection />
    <section className="guest-bottom-grid" aria-label="Your villa concierge">
      <div className="concierge-banner"><span className="round-symbol"><MessageCircle size={25} strokeWidth={1.3} /></span><div><span className="eyebrow">A LITTLE GUIDANCE</span><h2>Let us help you choose.</h2><p>A slower start, a workout for two, or a moment of calm. Your concierge is here to help.</p><DemoLink to="/help" className="text-link">Ask your concierge <ArrowUpRight size={16} /></DemoLink></div></div>
      <div className="qr-banner"><VillaQr compact /></div>
    </section>
  </>
}

export function ServicesIndex() {
  return <><div className="page-intro"><span className="eyebrow">THE VILLA SORA WELLNESS MENU</span><h1>Make time for yourself.</h1><p>Private sessions, in the comfort of your villa. Choose the hour that feels right for you.</p></div><ServiceCollection standalone /><section className="quiet-help"><p>Not sure where to start?</p><DemoLink to="/help" className="text-link">Your concierge can help <ArrowUpRight size={16} /></DemoLink></section></>
}

function ServiceCollection({ standalone = false }: { standalone?: boolean }) {
  const [filter, setFilter] = useState('all')
  const visible = services.filter((service) => filter === 'all' || serviceMood[service.slug]?.category === filter)
  return <section className="guest-services" id="sessions" aria-labelledby="sessions-title">
    <div className="section-heading"><div><span className="eyebrow">WELLNESS, YOUR WAY</span><h2 id="sessions-title">{standalone ? 'Find your kind of feel-good.' : 'How would you like to feel?'}</h2><p>Thoughtful sessions. Expert guidance. All at your villa.</p></div><span className="session-count">{services.length} ways to make time for you</span></div>
    <div className="service-filters" role="group" aria-label="Filter wellness sessions">{[['all', 'All sessions'], ['move', 'Move & energise'], ['restore', 'Unwind & restore']].map(([id, label]) => <button type="button" key={id} aria-pressed={filter === id} className={filter === id ? 'selected' : ''} onClick={() => setFilter(id)}>{label}</button>)}</div>
    <div className="guest-service-grid" aria-live="polite">{visible.map((service) => <ServiceCard key={service.slug} service={service} />)}</div>
    <p className="menu-note"><ShieldCheck size={14} /><span>60-minute private sessions. Your instructor and full quote are confirmed before you pay.</span></p>
  </section>
}

function ServiceCard({ service }: { service: Service }) {
  const mood = serviceMood[service.slug]
  return <DemoLink to={`/services/${service.slug}`} className="guest-service-card">
    <div className="service-card-photo"><GuestPhoto image={service.image} /><span className="duration-badge"><Clock3 size={12} /> 60 min</span><span className="card-arrow" aria-hidden="true"><ArrowUpRight size={20} strokeWidth={1.5} /></span></div>
    <div className="service-card-copy"><span className="eyebrow">{mood?.tag}</span><h3>{service.name}</h3><p>{mood?.short || service.sentence}</p><div className="card-price"><span><strong>{service.maxGuests > (service.includedGuests ?? 1) ? 'From ' : ''}{rp(service.basePrice ?? SINGLE_SESSION)}</strong><small> / session</small></span><span>{service.maxGuests === 1 ? '1 guest' : '1–2 guests'}</span></div></div>
  </DemoLink>
}

export function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)
  if (!service) return <Unavailable title="Let's find your next session." text="This session is not on the villa menu. Explore the available services or ask your concierge." />
  return <article className="service-detail-page">
    <DemoLink to="/" className="back-link"><ArrowLeft size={15} /> Back to your villa menu</DemoLink>
    <div className="service-detail-grid"><div className="service-detail-image"><GuestPhoto image={service.image} priority sizes="(max-width: 800px) 100vw, 55vw" /><div className="photo-caption"><Leaf size={15} /> {PHOTO_CAPTION}</div></div>
      <div className="service-detail-copy"><span className="eyebrow">{serviceMood[service.slug]?.tag} · VILLA SORA</span><h1>{service.name}</h1><p className="detail-lede">{service.sentence}</p><div className="detail-pills"><span><Clock3 size={15} /> 60 minutes</span><span><Users size={15} /> {service.participants}</span><span><MapPin size={15} /> At your villa</span></div>
        <div className="detail-book-box"><span className="eyebrow">YOUR PRIVATE SESSION</span><p className="detail-price">{rp(service.basePrice ?? SINGLE_SESSION)}<small> / {service.includedGuests === 2 ? 'up to two guests' : 'one guest'}</small></p>{service.maxGuests > (service.includedGuests ?? 1) && <p className="second-guest">Bring a friend for an additional {rp(250_000)}.</p>}<DemoLink to={`/request/${service.slug}`} className="action">Choose date & time <ArrowRight size={17} /></DemoLink><p className="price-reassurance"><Check size={14} /> Travel included at Villa Sora</p></div>
        <div className="service-accordions"><details open><summary>What's included <ChevronDown size={16} /></summary><p>{service.included}</p><p><b>We bring:</b> {service.brought}</p></details><details><summary>Your villa setup <ChevronDown size={16} /></summary><p>{service.guestProvides}</p><p>{service.setup}</p></details><details><summary>Booking & rescheduling <ChevronDown size={16} /></summary><p>{CONCIERGE_LINE}</p><p>{POLICY_LINE} {PAYMENT_LINE}</p><p>Your professional is named in your written confirmation. Payment instructions are on the written quote. We never ask for card or bank details in WhatsApp.</p></details></div>
      </div>
    </div>
    <section className="stay-longer"><div><span className="eyebrow">SETTLE INTO A RHYTHM</span><h2>Staying a little longer?</h2><p>Ask your concierge about a session pack. The schedule is arranged around your stay and instructor availability.</p></div><div className="pack-grid">{packsForService(service.basePrice ?? SINGLE_SESSION).map((pack) => <div key={pack.id} className={pack.popular ? 'pack popular' : 'pack'}>{pack.popular && <span className="pack-label">5-SESSION OPTION</span>}<strong>{pack.sessions} sessions</strong><span>{rp(pack.perSession)} / session</span><small>{rp(pack.total)} total · {service.includedGuests === 2 ? 'up to two guests' : 'one guest'}</small></div>)}</div></section>
  </article>
}

export function RequestPage() {
  const { slug } = useParams()
  const service = getService(slug)
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { submit } = useDemoState()
  const key = useRef(typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `key-${slug}-${Date.now()}`)
  const errorRef = useRef<HTMLDivElement>(null)
  const [date, setDate] = useState(baliISO(1))
  const [time, setTime] = useState('08:00')
  const [people, setPeople] = useState(params.get('people') === '2' && service?.maxGuests === 2 ? 2 : 1)
  const [name, setName] = useState('')
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email'>('whatsapp')
  const [contact, setContact] = useState('')
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [busy, setBusy] = useState(false)
  useEffect(() => { if (errors.length) errorRef.current?.focus() }, [errors])
  if (!service) return <Unavailable title="Choose your session first." text="Explore the villa wellness menu to find the right hour for you." />
  const selected = service
  const quote = sessionQuote(people, selected.maxGuests, selected.slug)
  const minDate = baliISO(1)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (busy) return
    const next: string[] = []
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < minDate) next.push('Please choose a future date in Bali.')
    if (!sessionTimes.includes(time as typeof sessionTimes[number])) next.push('Please choose your preferred start time.')
    if (name.trim().length < 2) next.push('Please add your name.')
    const valid = contactMethod === 'whatsapp' ? /^\+[\d\s()-]{8,24}$/.test(contact.trim()) && contact.replace(/\D/g, '').length >= 8 && contact.replace(/\D/g, '').length <= 15 : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim())
    if (!valid) next.push(contactMethod === 'whatsapp' ? 'Please add your WhatsApp number, starting with + and your country code.' : 'Please add a valid email address.')
    setErrors(next)
    if (next.length) return
    setBusy(true)
    const result = submit({ idempotencyKey: key.current, serviceSlug: selected.slug, serviceName: selected.name, date, time, participants: quote.guests, name: name.trim(), whatsapp: contactMethod === 'whatsapp' ? contact.trim() : '', email: contactMethod === 'email' ? contact.trim() : '', note: note.trim(), preference: '', total: quote.total })
    navigate(demoHref(`/booking/${result.booking.token}`))
  }

  return <section className="request-page"><DemoLink to={`/services/${service.slug}`} className="back-link"><ArrowLeft size={15} /> Back to {service.name.toLowerCase()}</DemoLink><div className="request-heading"><span className="eyebrow">A LITTLE TIME FOR YOU</span><h1>Make it your hour.</h1><p>Choose your preferred time. We will take care of the details.</p></div><div className="request-grid"><form className="guest-request-form" onSubmit={onSubmit} noValidate>
    {errors.length > 0 && <div className="form-errors" role="alert" ref={errorRef} tabIndex={-1}><strong>A few details to check</strong>{errors.map((error) => <p key={error}>{error}</p>)}</div>}
    <fieldset><legend><span>01</span> Your session</legend><label className="field"><span>Preferred date</span><input type="date" value={date} min={minDate} maxLength={10} required onChange={(event) => setDate(event.target.value)} /></label><div className="field"><span id="preferred-time-label">Preferred time <small>Bali time · UTC+8</small></span><div className="time-choices" role="group" aria-labelledby="preferred-time-label">{sessionTimes.map((item) => <button key={item} type="button" aria-pressed={time === item} className={time === item ? 'is-on' : ''} onClick={() => setTime(item)}>{item}</button>)}</div></div><div className="field"><span id="guest-count-label">Who's joining?</span><div className="choice-row" role="group" aria-labelledby="guest-count-label">{Array.from({ length: service.maxGuests }, (_, i) => i + 1).map((count) => <button type="button" key={count} aria-pressed={people === count} className={people === count ? 'is-on' : ''} onClick={() => setPeople(count)}><Users size={16} /> {count === 1 ? 'Just me' : 'Two of us'} {people === count && <Check size={14} />}</button>)}</div></div></fieldset>
    <fieldset><legend><span>02</span> A way to reach you</legend><label className="field"><span>Your name</span><input value={name} maxLength={100} autoComplete="name" placeholder="Your first and last name" onChange={(event) => setName(event.target.value)} required /></label><div className="contact-label"><span>{contactMethod === 'whatsapp' ? 'WhatsApp number' : 'Email address'}</span><button type="button" onClick={() => { setContactMethod(contactMethod === 'whatsapp' ? 'email' : 'whatsapp'); setContact('') }}>Use {contactMethod === 'whatsapp' ? 'email' : 'WhatsApp'} instead</button></div><label className="field"><span className="sr-only">{contactMethod === 'whatsapp' ? 'WhatsApp number with country code' : 'Email address'}</span><input type={contactMethod === 'email' ? 'email' : 'tel'} value={contact} maxLength={200} autoComplete={contactMethod === 'email' ? 'email' : 'tel'} placeholder={contactMethod === 'whatsapp' ? '+61 4XX XXX XXX' : 'Your email address'} onChange={(event) => setContact(event.target.value)} required /><small>For your quote and session confirmation.</small></label><details className="optional-notes"><summary>Anything you would like us to know? <span>Optional</span></summary><label className="field"><span className="sr-only">Optional requests</span><textarea value={note} maxLength={1000} placeholder="Your experience, preferred pace or an access request…" onChange={(event) => setNote(event.target.value)} /></label></details></fieldset>
    <div className="form-submit"><p><ShieldCheck size={15} /> A clear quote before you pay.</p><button className="action" type="submit" disabled={busy}>{busy ? 'Saving your request…' : 'Request my session'} <ArrowRight size={17} /></button><small>Demo request only. Details stay in this tab; no message or payment is sent.</small></div>
  </form><aside className="request-summary"><GuestPhoto image={service.image} sizes="(max-width: 800px) 100vw, 36vw" /><div className="summary-copy"><p className="photo-policy-caption">{PHOTO_CAPTION}</p><span className="eyebrow">YOUR HOUR AT VILLA SORA</span><h2>{service.name}</h2><ul><li><CalendarDays size={16} /> {formatBali(date || minDate)}</li><li><Clock3 size={16} /> {time} · 60 minutes · Bali time</li><li><Users size={16} /> {quote.guests} {quote.guests === 1 ? 'guest' : 'guests'}</li><li><MapPin size={16} /> Villa Sora, Canggu</li></ul><dl><div><dt>Private session</dt><dd>{rp(quote.session)}</dd></div>{quote.extra > 0 && <div><dt>Second guest</dt><dd>{rp(quote.extra)}</dd></div>}<div><dt>Travel to your villa</dt><dd>Included</dd></div><div className="summary-total"><dt>Session total</dt><dd>{rp(quote.total)}</dd></div></dl><p className="summary-policy">Free rescheduling up to 24 hours before your session, if supply allows. Inside 24 hours, the session is charged. A 50% deposit confirms your booking; packs are paid in full upfront.</p></div></aside></div></section>
}

export function BookingLookup() { return <BookingPage /> }

export function BookingPage() {
  const { token } = useParams()
  const { booking } = useDemoState()
  const match = booking && (!token || booking.token === token) ? booking : null
  const service = getService(match?.serviceSlug)
  if (!match || !service) return <section className="booking-empty"><div className="empty-symbol"><CalendarDays size={36} strokeWidth={1} /></div><span className="eyebrow">YOUR TIME AT VILLA SORA</span><h1>A little time for you.</h1><p>{token ? 'This request is not available in this tab. You can start a new session request below.' : 'Your session request will appear here. Start with an hour that feels right for you.'}</p><DemoLink to="/services" className="action">Explore your sessions <ArrowRight size={17} /></DemoLink><DemoLink to="/help" className="text-link">Ask your concierge</DemoLink></section>
  const confirmed = match.status === 'confirmed'
  return <section className="booking-page"><div className="booking-heading"><span className="success-symbol"><CheckCircle2 size={35} strokeWidth={1.3} /></span><span className="eyebrow">THANK YOU, {match.name.split(' ')[0].toUpperCase()}</span><h1>{confirmed ? 'Your session details.' : 'Your request is in.'}</h1><p>{confirmed ? 'Your selected session, all in one place.' : 'A little time for you, one step closer. Here is what you have requested.'}</p></div><div className="booking-grid"><div className="booking-session"><GuestPhoto image={service.image} sizes="(max-width: 800px) 100vw, 50vw" /><div><span className="eyebrow">VILLA SORA · {match.reference}</span><h2>{match.serviceName}</h2><div className="booking-facts"><span><CalendarDays size={17} /> {formatBali(match.date)}</span><span><Clock3 size={17} /> {match.time} Bali time · 60 minutes</span><span><Users size={17} /> {match.participants} {match.participants === 1 ? 'guest' : 'guests'}</span><span><MapPin size={17} /> Villa Sora, Canggu</span></div><p className="booking-total">Session total <strong>{rp(match.total)}</strong></p></div></div><aside className="booking-next"><span className="eyebrow">WHAT HAPPENS NEXT</span><h2>We've got the details.</h2><ol><li className="done"><span><Check size={15} /></span><div><strong>Request received</strong><p>Your preferred session and time are saved.</p></div></li><li><span>2</span><div><strong>Instructor matching</strong><p>Your concierge checks the right professional for your session.</p></div></li><li><span>3</span><div><strong>Your written confirmation</strong><p>You receive your instructor, final quote and payment details.</p></div></li></ol><p className="demo-booking-note">This is a demo request. No instructor has been booked and no payment is due.</p><DemoLink to="/help" className="action secondary"><MessageCircle size={16} /> Ask your concierge</DemoLink></aside></div><DemoLink to="/" className="back-link"><ArrowLeft size={15} /> Back to your villa menu</DemoLink></section>
}

const faq = [
  ['Where does my session take place?', 'Right here at Villa Sora. Depending on your session, a shaded terrace, the garden or a clear area indoors is ideal. We coordinate the setup with you.'],
  ['Can two of us join a session?', 'Yoga and meditation include up to two guests. A second guest adds Rp 250.000 to eligible one-person rates. Boxing and Bodywork & Recovery are for one guest.'],
  ['Do I need to bring equipment?', 'The service page tells you what your instructor brings and what to prepare. Wear comfortable clothes and keep drinking water nearby.'],
  ['How do I confirm my session?', 'Choose your preferred date and time. Your concierge checks instructor availability and sends a written quote before payment. Your professional is named in the confirmation.'],
  ['Can I reschedule?', 'Free rescheduling is available up to 24 hours before your session, if supply allows. Inside 24 hours, the session is charged. A 50% deposit confirms a booking. Packs are paid in full upfront.'],
]

export function HelpPage() {
  const [chat, setChat] = useState(false)
  return <section className="help-page"><div className="page-intro"><span className="eyebrow">YOUR VILLA CONCIERGE</span><h1>A little help, anytime you need it.</h1><p>Choosing your hour should feel easy. Let us help you find the right session for your stay.</p></div><div className="help-grid"><div className="help-contact-card"><span className="round-symbol"><MessageCircle size={30} strokeWidth={1.2} /></span><h2>Let's find your kind of feel-good.</h2><p>Ask about a session, tell us what you enjoy, or get help with your request.</p><button type="button" className="action" onClick={() => setChat(true)}>Chat with your concierge <ArrowUpRight size={17} /></button><span className="help-villa"><MapPin size={14} /> Villa Sora, Canggu</span><p className="quiet">We reply between 08:00 and 20:00 Bali time.</p><span className="quiet">Prefer email? <a href={`mailto:${HELP_EMAIL}`}>{HELP_EMAIL}</a></span></div><div className="help-faq"><span className="eyebrow">A FEW HELPFUL DETAILS</span><h2>Good to know.</h2>{faq.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={16} /></summary><p>{answer}</p></details>)}</div></div>{chat && <ConciergeChat onClose={() => setChat(false)} />}</section>
}

function ConciergeChat({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<{ text: string; guest: boolean }[]>([])
  function send(text: string) {
    const input = text.trim()
    if (!input) return
    const answer = /two|friend|couple/i.test(input) ? 'Yoga and meditation include up to two guests. A second guest adds Rp 250.000 for strength training and Pilates. Boxing is one guest only. Choose your session and preferred time.' : /relax|calm|slow/i.test(input) ? 'Private yoga, guided meditation or a quiet bodywork hour could be a lovely fit. You can explore each session in your villa menu.' : /book|request|time|reschedule/i.test(input) ? 'Your latest request is in My booking. The concierge confirms your preferred time and instructor before payment.' : 'Thank you. Explore the sessions in your villa menu and include your preferences in the request. Your concierge coordinates the details.'
    setMessages((prev) => [...prev, { text: input, guest: true }, { text: answer, guest: false }])
    setMessage('')
  }
  return <GuestDialog title="Villa Sora concierge" onClose={onClose}><p className="chat-demo-label">Demo chat · messages stay in this tab</p><div className="chat-messages" role="log" aria-live="polite"><p className="chat-reply">Hello! A little movement or a slower morning? Let's find the right hour for you.</p>{messages.map((item, i) => <p key={i} className={item.guest ? 'chat-guest' : 'chat-reply'}>{item.text}</p>)}</div>{messages.length === 0 && <div className="chat-suggestions">{['Something relaxing', 'A workout for two', 'Help with my booking'].map((q) => <button type="button" key={q} onClick={() => send(q)}>{q} <ArrowUpRight size={13} /></button>)}</div>}<form className="chat-form" onSubmit={(e) => { e.preventDefault(); send(message) }}><label className="sr-only" htmlFor="concierge-message">Your message</label><input id="concierge-message" value={message} maxLength={500} placeholder="Ask your concierge…" onChange={(e) => setMessage(e.target.value)} /><button type="submit" aria-label="Send demo message" disabled={!message.trim()}><ArrowRight size={20} /></button></form></GuestDialog>
}

function Unavailable({ title, text }: { title: string; text: string }) {
  return <section className="booking-empty"><div className="empty-symbol"><Leaf size={35} strokeWidth={1} /></div><h1>{title}</h1><p>{text}</p><DemoLink to="/" className="action">Open your villa menu <ArrowRight size={17} /></DemoLink><DemoLink to="/help" className="text-link">Ask the concierge</DemoLink></section>
}

export function QrCard() {
  return <section className="qr-print-page"><article className="print-villa-card"><Leaf size={28} strokeWidth={1} /><span className="eyebrow">VILLA SORA · CANGGU, BALI</span><h1>Your villa.<br /><em>Your pace.</em></h1><p>Private training, yoga, Pilates and more.<br />Scan to find your hour.</p><QrMark value={QR_LANDING} label="QR code opening the Villa Sora guest wellness menu" /><p className="qr-address">villademo.personalfitness.id</p><small>Powered by Personal Fitness</small></article><button type="button" className="action no-print" onClick={() => window.print()}>Print your villa card <ArrowUpRight size={17} /></button></section>
}
