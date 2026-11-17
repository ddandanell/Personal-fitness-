import { MessageCircle } from 'lucide-react'
import { Suspense, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { areaPockets, extraPersonFee, programmes, quoteAreas, type City } from '@/data/catalog'
import { COMPANY_EMAIL } from '@/data/company'
import { AVAILABILITY_NOTE, RESCHEDULE_NOTE, TRAVEL_DISCLAIMER } from '@/data/offerCopy'
import { publicServices } from '@/data/publicOffer'
import { estimateQuote, quoteMessage } from '@/lib/quote'
import { formatIdr } from '@/lib/money'
import { trackEvent, trackWhatsApp } from '@/lib/analytics'
import { submitEnquiry } from '@/lib/submitEnquiry'
import { whatsappDraftUrl } from '@/lib/whatsapp'
import { EnquiryNote, HoneypotField } from './EnquiryFields'
import { CopyButton, Field } from './Primitives'
import { downloadText } from '@/lib/downloadText'

type EstimatorProps = { compact?: boolean; initialService?: string; initialCity?: City }
export default function QuoteEstimator(props: EstimatorProps) {
  return (
    <Suspense fallback={<div className="estimator estimator-pending" aria-hidden="true" />}>
      <QuoteEstimatorReady {...props} />
    </Suspense>
  )
}

function QuoteEstimatorReady(props: EstimatorProps) {
  const [params] = useSearchParams()
  return <EstimatorForm key={(props.initialService || '') + (props.initialCity || '') + params.toString()} {...props} />
}

function EstimatorForm({ compact = false, initialService, initialCity }: EstimatorProps) {
  const [params] = useSearchParams()
  const first = publicServices.find((item) => item.slug === (initialService || params.get('service'))) || publicServices[0]
  const [service, setService] = useState(first.slug)
  const [city, setCity] = useState<City>(initialCity || (params.get('city') === 'Jakarta' ? 'Jakarta' : 'Bali'))
  const [area, setArea] = useState(params.get('area') || '')
  const [durationMin, setDurationMin] = useState(Number(params.get('duration')) || first.durationMin)
  const [participants, setParticipants] = useState(params.get('participants') === '2' ? '2' : '1')
  const [programme, setProgramme] = useState(programmes.some((item) => item.slug === params.get('programme')) ? params.get('programme') || 'single' : 'single')
  const [timing, setTiming] = useState('')
  const [goals, setGoals] = useState('')
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [notice, setNotice] = useState('')
  const [noticeTone, setNoticeTone] = useState<'error' | 'success' | ''>('')
  const honeypot = useRef<HTMLInputElement>(null)
  const selected = publicServices.find((item) => item.slug === service) || publicServices[0]
  const canExtend = selected.durationMin === 60
  const cityHubs = useMemo(() => quoteAreas(city), [city])
  const quote = useMemo(() => estimateQuote({
    service,
    city,
    area: area || undefined,
    durationMin,
    participants: Number(participants),
    programme: programme || undefined,
  }), [service, city, area, durationMin, participants, programme])
  const message = quoteMessage(quote, { timing, goals })

  async function sendEmail() {
    setSending(true)
    setNotice('')
    setNoticeTone('')
    const result = await submitEnquiry({
      kind: 'quote',
      name: senderName,
      email: senderEmail,
      message,
      page: window.location.pathname,
      website: honeypot.current?.value || '',
    })
    setSending(false)
    if (result.ok) {
      trackEvent('enquiry_email', { kind: 'quote', service, city })
      setNoticeTone('success')
      setNotice(`Sent. We will reply to ${senderEmail.trim()}. Nothing is booked until you accept the written quote.`)
      return
    }
    setNoticeTone('error')
    setNotice(result.message)
  }

  function chooseService(slug: string) {
    const next = publicServices.find((item) => item.slug === slug)
    if (!next) return
    const keepNinety = durationMin === 90 && next.durationMin === 60
    const keepProgramme = Boolean(programme)
    setService(slug)
    if (!keepNinety) setDurationMin(next.durationMin)
    if (!keepProgramme) setProgramme('single')
  }

  return (
    <div className={'estimator ' + (compact ? 'estimator-compact' : '')}>
      <form className="estimator-form" onSubmit={(event) => { event.preventDefault(); void sendEmail() }}>
        <div className="form-grid">
          <Field label="Service">
            <select value={service} onChange={(event) => chooseService(event.target.value)}>
              {publicServices.map((item) => <option value={item.slug} key={item.slug}>{item.title}</option>)}
            </select>
          </Field>
          <Field label="City">
            <select value={city} onChange={(event) => { setCity(event.target.value as City); setArea('') }}>
              <option>Bali</option>
              <option>Jakarta</option>
            </select>
          </Field>
          <Field label="Area cluster">
            <select value={area} onChange={(event) => setArea(event.target.value)}>
              <option value="">Confirm later</option>
              {cityHubs.map((hub) => {
                const pockets = areaPockets(hub.slug)
                const label = (item: typeof hub) => item.name + (item.travelQuote ? ' (by request)' : item.outerTravel ? ' (outer travel fee)' : '')
                if (!pockets.length) return <option value={hub.slug} key={hub.slug}>{label(hub)}</option>
                return (
                  <optgroup label={hub.name} key={hub.slug}>
                    <option value={hub.slug}>{label(hub)}</option>
                    {pockets.map((item) => <option value={item.slug} key={item.slug}>{label(item)}</option>)}
                  </optgroup>
                )
              })}
            </select>
          </Field>
          <Field label="Session Duration">
            <select value={durationMin} onChange={(event) => setDurationMin(Number(event.target.value))}>
              <option value={selected.durationMin}>{selected.durationMin} minutes</option>
              {canExtend && <option value={90}>90 minutes (+45% of the session rate)</option>}
            </select>
          </Field>
          <fieldset className="guest-toggle-field">
            <legend>Guests</legend>
            <div className="guest-toggle" role="radiogroup" aria-label="Guests">
              <button type="button" aria-pressed={participants === '1'} onClick={() => setParticipants('1')}>1 Guest</button>
              <button type="button" aria-pressed={participants === '2'} onClick={() => setParticipants('2')}>2 Guests</button>
            </div>
            <p className="small muted">2 Guests adds {formatIdr(extraPersonFee.Bali)} per session when the session rate is for one guest.</p>
          </fieldset>
          <Field label="Package">
            <select value={programme} onChange={(event) => setProgramme(event.target.value)}>
              {programmes.map((item) => <option value={item.slug} key={item.slug}>{item.title}</option>)}
            </select>
          </Field>
          {!compact && (
            <>
              <Field label="Preferred window">
                <input value={timing} onChange={(event) => setTiming(event.target.value)} placeholder="e.g. 18 Nov, 07:00-09:00" maxLength={120} />
              </Field>
              <Field label="General preference" hint="Practical goals only. Keep health details out of this form.">
                <input value={goals} onChange={(event) => setGoals(event.target.value)} placeholder="e.g. beginner strength, a calm recovery hour" maxLength={200} />
              </Field>
            </>
          )}
          <Field label="Your name"><input value={senderName} onChange={(event) => setSenderName(event.target.value)} maxLength={100} autoComplete="name" /></Field>
          <Field label="Your email" hint="We reply to this address."><input type="email" value={senderEmail} onChange={(event) => setSenderEmail(event.target.value)} maxLength={180} autoComplete="email" /></Field>
        </div>
        <HoneypotField inputRef={honeypot} />
        <p className="small muted">Email this request to {COMPANY_EMAIL}, or open WhatsApp when you want to send the draft yourself. Nothing is booked until you accept the written quote.</p>
      </form>
      <aside className="estimator-result">
        {quote.ok ? (
          <>
            <p className="eyebrow eyebrow-light">Starting price</p>
            <p className="estimate-total">{formatIdr(quote.total)}</p>
            <p className="estimate-sub">{quote.sessions > 1 ? quote.sessions + ' sessions · ' + formatIdr(quote.perSession) + ' each' : quote.formatLabel + ' · ' + quote.participants + (quote.participants === 1 ? ' guest' : ' guests')}</p>
            <ul className="estimate-lines">
              <li><span>Session rate</span><strong>{formatIdr(quote.base)}</strong></li>
              {quote.durationFee > 0 && <li><span>90-minute uplift</span><strong>{formatIdr(quote.durationFee)}</strong></li>}
              {quote.extraPeopleFee > 0 && <li><span>Second guest</span><strong>{formatIdr(quote.extraPeopleFee)}</strong></li>}
              {quote.discount > 0 && <li><span>Package savings</span><strong>-{formatIdr(quote.discount)}</strong></li>}
            </ul>
            <p className="small muted">{AVAILABILITY_NOTE}</p>
            <p className="small muted">{TRAVEL_DISCLAIMER}</p>
          </>
        ) : (
          <>
            <p className="eyebrow eyebrow-light">Written quote required</p>
            <p className="estimate-total estimate-total-small">Confirm with us</p>
            <p>{quote.error}</p>
          </>
        )}
        <div className="cluster">
          <button type="button" className="button button-outline-light" disabled={sending} onClick={() => void sendEmail()}>{sending ? 'Sending…' : 'Email this request'}</button>
          <a className="button button-primary" href={whatsappDraftUrl(message)} target="_blank" rel="noreferrer" onClick={() => { trackWhatsApp('estimator', { service, city }); trackEvent('estimator_used', { service, city }) }}><MessageCircle size={16} />Continue in WhatsApp</a>
          <p className="small wa-handoff">{RESCHEDULE_NOTE}</p>
          <CopyButton value={message} label="Copy request" />
          <button type="button" className="button button-outline-light" onClick={() => downloadText('PersonalFitness-request.txt', message)}>Download</button>
        </div>
        <EnquiryNote text={notice} tone={noticeTone} />
      </aside>
    </div>
  )
}
