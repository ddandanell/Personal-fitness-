import { MessageCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { areas, programmes, type City } from '@/data/catalog'
import { publicServices } from '@/data/publicOffer'
import { estimateQuote, quoteMessage } from '@/lib/quote'
import { formatIdr } from '@/lib/money'
import { whatsappDraftUrl } from '@/lib/whatsapp'
import { CopyButton, Field } from './Primitives'
import { downloadText } from '@/lib/downloadText'

type EstimatorProps = { compact?: boolean; initialService?: string; initialCity?: City }
export default function QuoteEstimator(props: EstimatorProps) {
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
  const [participants, setParticipants] = useState(params.get('participants') || '1')
  const [programme, setProgramme] = useState(params.get('programme') || '')
  const [timing, setTiming] = useState('')
  const [goals, setGoals] = useState('')
  const selected = publicServices.find((item) => item.slug === service) || publicServices[0]
  const canExtend = selected.durationMin === 60
  const cityAreas = useMemo(() => areas.filter((item) => item.city === city), [city])
  const quote = useMemo(() => estimateQuote({
    service,
    city,
    area: area || undefined,
    durationMin,
    participants: Number(participants),
    programme: programme || undefined,
  }), [service, city, area, durationMin, participants, programme])
  const message = quoteMessage(quote, { timing, goals })

  function chooseService(slug: string) {
    const next = publicServices.find((item) => item.slug === slug)
    if (!next) return
    const keepNinety = durationMin === 90 && next.durationMin === 60
    const keepProgramme = Boolean(programme)
    setService(slug)
    if (!keepNinety) setDurationMin(next.durationMin)
    if (!keepProgramme) setProgramme('')
    const max = next.maxParticipants
    if (Number(participants) > max) setParticipants(String(max))
  }

  return (
    <div className={'estimator ' + (compact ? 'estimator-compact' : '')}>
      <form className="estimator-form" onSubmit={(event) => event.preventDefault()}>
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
              {cityAreas.map((item) => (
                <option value={item.slug} key={item.slug}>
                  {item.name}{item.travelQuote ? ' (travel by quote)' : item.travelFee ? ' (+ travel)' : ''}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Visit length">
            <select value={durationMin} onChange={(event) => setDurationMin(Number(event.target.value))}>
              <option value={selected.durationMin}>{selected.durationMin} minutes</option>
              {canExtend && <option value={90}>90 minutes (+45% of base)</option>}
            </select>
          </Field>
          <Field label="Participants">
            <input type="number" min="1" max={selected.maxParticipants} step="1" value={participants} onChange={(event) => setParticipants(event.target.value)} />
          </Field>
          <Field label="Programme">
            <select value={programme} onChange={(event) => setProgramme(event.target.value)}>
              <option value="">Single visit</option>
              {programmes.map((item) => <option value={item.slug} key={item.slug}>{item.title} · {item.sessions} visits</option>)}
            </select>
          </Field>
          {!compact && (
            <>
              <Field label="Preferred window">
                <input value={timing} onChange={(event) => setTiming(event.target.value)} placeholder="e.g. 18 Nov, 07:00-09:00" maxLength={120} />
              </Field>
              <Field label="General preference" hint="Practical goals only. Detailed health information needs a private intake.">
                <input value={goals} onChange={(event) => setGoals(event.target.value)} placeholder="e.g. beginner strength, a quiet pair session" maxLength={200} />
              </Field>
            </>
          )}
        </div>
        <p className="small muted">Opening WhatsApp creates a draft. Your message is sent only when you choose to send it in WhatsApp.</p>
      </form>
      <aside className="estimator-result">
        {quote.ok ? (
          <>
            <p className="eyebrow eyebrow-light">Starting price</p>
            <p className="estimate-total">{formatIdr(quote.total)}</p>
            <p className="estimate-sub">{quote.sessions > 1 ? quote.sessions + ' visits · ' + formatIdr(quote.perSession) + ' each' : quote.formatLabel + ' · ' + quote.participants + (quote.participants === 1 ? ' person' : ' people')}</p>
            <ul className="estimate-lines">
              <li><span>Session rate</span><strong>{formatIdr(quote.base)}</strong></li>
              {quote.durationFee > 0 && <li><span>90-minute uplift</span><strong>{formatIdr(quote.durationFee)}</strong></li>}
              {quote.extraPeopleFee > 0 && <li><span>Additional people</span><strong>{formatIdr(quote.extraPeopleFee)}</strong></li>}
              {quote.travel > 0 && <li><span>Travel per visit</span><strong>{formatIdr(quote.travel)}</strong></li>}
              {quote.discount > 0 && <li><span>Programme reduction</span><strong>-{formatIdr(quote.discount)}</strong></li>}
            </ul>
            <p className="small muted">Not a booking. {area ? 'Selected-area travel is included above.' : 'Area and travel remain to be confirmed.'} The written quote confirms all inclusions and the payable total.</p>
          </>
        ) : (
          <>
            <p className="eyebrow eyebrow-light">Written quote required</p>
            <p className="estimate-total estimate-total-small">Confirm with us</p>
            <p>{quote.error}</p>
          </>
        )}
        <div className="cluster">
          <a className="button button-primary" href={whatsappDraftUrl(message)} target="_blank" rel="noreferrer"><MessageCircle size={16} />Continue in WhatsApp</a>
          <CopyButton value={message} label="Copy request" />
          <button type="button" className="button button-outline-light" onClick={() => downloadText('PersonalFitness-request.txt', message)}>Download</button>
        </div>
      </aside>
    </div>
  )
}
