import { MessageCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { areas, listedServices, programmes, type City } from '@/data/catalog'
import { professionals } from '@/data/professionals'
import { estimateQuote, quoteMessage } from '@/lib/quote'
import { formatIdr } from '@/lib/money'
import { whatsappDraftUrl } from '@/lib/whatsapp'
import { CopyButton, Field } from './Primitives'
import { downloadText } from '@/lib/downloadText'

const cities: City[] = ['Bali', 'Jakarta']

export default function QuoteEstimator({ compact = false }: { compact?: boolean }) {
  const [params] = useSearchParams()
  const requestedService = listedServices.find((item) => item.slug === params.get('service'))?.slug || params.get('service') || 'personal-training'
  const requestedCity = params.get('city') === 'Jakarta' ? 'Jakarta' : 'Bali'
  const [service, setService] = useState(listedServices.some((item) => item.slug === requestedService) ? requestedService : 'personal-training')
  const [city, setCity] = useState<City>(requestedCity)
  const [area, setArea] = useState(params.get('area') || '')
  const selectedService = listedServices.find((item) => item.slug === service)
  const [durationMin, setDurationMin] = useState<60 | 90>(60)
  const [participants, setParticipants] = useState(params.get('participants') || '1')
  const [programme, setProgramme] = useState(params.get('programme') || '')
  const [professional, setProfessional] = useState(params.get('professional') || '')
  const [timing, setTiming] = useState('')
  const [goals, setGoals] = useState('')

  const cityAreas = useMemo(() => areas.filter((item) => item.city === city), [city])
  const cityPros = useMemo(
    () => professionals.filter((person) => person.cities.includes(city) && person.services.includes(service)),
    [city, service],
  )
  const quote = useMemo(
    () => estimateQuote({
      service,
      city,
      area: area || undefined,
      durationMin,
      participants: Number(participants) || 1,
      programme: programme || undefined,
    }),
    [service, city, area, durationMin, participants, programme],
  )
  const message = quoteMessage(quote, {
    timing,
    goals,
    professional: cityPros.find((item) => item.slug === professional)?.name,
  })

  return (
    <div className={`estimator ${compact ? 'estimator-compact' : ''}`}>
      <form className="estimator-form" onSubmit={(event) => event.preventDefault()}>
        <div className="form-grid">
          <Field label="Service">
            <select value={service} onChange={(event) => { setService(event.target.value); setProfessional('') }}>
              {listedServices.map((item) => <option value={item.slug} key={item.slug}>{item.title}</option>)}
            </select>
          </Field>
          <Field label="City">
            <select value={city} onChange={(event) => { setCity(event.target.value as City); setArea(''); setProfessional('') }}>
              {cities.map((item) => <option key={item}>{item}</option>)}
            </select>
          </Field>
          <Field label="Area cluster">
            <select value={area} onChange={(event) => setArea(event.target.value)}>
              <option value="">Confirm later</option>
              {cityAreas.map((item) => <option value={item.slug} key={item.slug}>{item.name}{item.travelFee ? ` (+ travel)` : ''}</option>)}
            </select>
          </Field>
          <Field label="Duration">
            <select value={durationMin} onChange={(event) => setDurationMin(Number(event.target.value) as 60 | 90)}>
              <option value={60}>{selectedService?.durationMin === 45 ? '45 minutes published swim block, billed from listed rate' : '60 minutes'}</option>
              <option value={90}>90 minutes (+45%)</option>
            </select>
          </Field>
          <Field label="Participants">
            <input type="number" min="1" max="12" value={participants} onChange={(event) => setParticipants(event.target.value)} />
          </Field>
          <Field label="Programme">
            <select value={programme} onChange={(event) => setProgramme(event.target.value)}>
              <option value="">Single session</option>
              {programmes.map((item) => <option value={item.slug} key={item.slug}>{item.title} · {item.sessions} sessions</option>)}
            </select>
          </Field>
          {!compact && (
            <>
              <Field label="Preferred professional">
                <select value={professional} onChange={(event) => setProfessional(event.target.value)}>
                  <option value="">Match for me</option>
                  {cityPros.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}
                </select>
              </Field>
              <Field label="Preferred window">
                <input value={timing} onChange={(event) => setTiming(event.target.value)} placeholder="e.g. 18 Nov, 07:00–09:00" maxLength={120} />
              </Field>
              <Field label="Goal in one line" hint="General fitness only. No medical history.">
                <input value={goals} onChange={(event) => setGoals(event.target.value)} placeholder="e.g. beginner strength, pair yoga" maxLength={200} />
              </Field>
            </>
          )}
        </div>
      </form>

      <aside className="estimator-result">
        {quote.ok ? (
          <>
            <p className="eyebrow eyebrow-light">Planning estimate</p>
            <p className="estimate-total">{formatIdr(quote.total)}</p>
            <p className="estimate-sub">
              {quote.sessions > 1 ? `${quote.sessions} sessions · ${formatIdr(quote.perSession)} each` : `${quote.durationMin} minutes · ${quote.participants} ${quote.participants === 1 ? 'person' : 'people'}`}
            </p>
            <ul className="estimate-lines">
              <li><span>Base session</span><strong>{formatIdr(quote.base)}</strong></li>
              {quote.durationFee > 0 && <li><span>90-minute uplift</span><strong>{formatIdr(quote.durationFee)}</strong></li>}
              {quote.extraPeopleFee > 0 && <li><span>Extra people</span><strong>{formatIdr(quote.extraPeopleFee)}</strong></li>}
              {quote.travel > 0 && <li><span>Travel · {quote.areaName}</span><strong>{formatIdr(quote.travel)}</strong></li>}
              {quote.discount > 0 && <li><span>Programme reduction</span><strong>−{formatIdr(quote.discount)}</strong></li>}
            </ul>
            <p className="small muted">Not a booking. Supply, access and venue fees can still change the confirmed quote.</p>
          </>
        ) : (
          <>
            <p className="eyebrow eyebrow-light">Needs a written quote</p>
            <p className="estimate-total estimate-total-small">Custom</p>
            <p>{quote.error}</p>
          </>
        )}
        <div className="cluster">
          <a className="button button-primary" href={whatsappDraftUrl(message)} target="_blank" rel="noreferrer">
            <MessageCircle size={16} />Open in WhatsApp
          </a>
          <CopyButton value={message} label="Copy message" />
          <button type="button" className="button button-outline-light" onClick={() => downloadText('PersonalFitness-quote.txt', message)}>Download</button>
        </div>
      </aside>
    </div>
  )
}
