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

type EstimatorProps = { compact?: boolean; initialService?: string }
export default function QuoteEstimator(props: EstimatorProps) {
  const [params] = useSearchParams()
  return <EstimatorForm key={(props.initialService || '') + params.toString()} {...props} />
}

function EstimatorForm({ compact = false, initialService }: EstimatorProps) {
  const [params] = useSearchParams()
  const first = listedServices.find((item) => item.slug === (initialService || params.get('service'))) || listedServices[0]
  const initialOffer = first.offers.find((offer) => offer.id === params.get('offer')) || first.offers[0]
  const [service, setService] = useState(first.slug)
  const [offerId, setOfferId] = useState(initialOffer.id)
  const [city, setCity] = useState<City>(params.get('city') === 'Jakarta' ? 'Jakarta' : 'Bali')
  const [area, setArea] = useState(params.get('area') || '')
  const [durationMin, setDurationMin] = useState(initialOffer.durationMin || 0)
  const [participants, setParticipants] = useState(params.get('participants') || String(initialOffer.participants || 1))
  const [programme, setProgramme] = useState(params.get('programme') || '')
  const [professional, setProfessional] = useState(params.get('style') || params.get('professional') || '')
  const [timing, setTiming] = useState('')
  const [goals, setGoals] = useState('')
  const selected = listedServices.find((item) => item.slug === service)!
  const offer = selected.offers.find((item) => item.id === offerId) || selected.offers[0]
  const isDefault = offer.id === selected.offers[0].id
  const canExtend = isDefault && offer.durationMin === 60 && ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching', 'boxing-fitness', 'guided-meditation'].includes(service)
  const canProgramme = isDefault && ['personal-training', 'private-yoga', 'mat-pilates', 'mobility-coaching'].includes(service)
  const cityAreas = useMemo(() => areas.filter((item) => item.city === city), [city])
  const cityPros = useMemo(() => professionals.filter((person) => person.cities.includes(city) && person.services.includes(service)), [city, service])
  const quote = useMemo(() => estimateQuote({ service, city, area: area || undefined, durationMin, participants: Number(participants), programme: programme || undefined, offerId }), [service, city, area, durationMin, participants, programme, offerId])
  const message = quoteMessage(quote, { timing, goals, professional: cityPros.find((item) => item.slug === professional)?.name })
  const scopeLabel = offer.priceUnit === 'per_7_days_coordination_only' ? '7 days coordination' : offer.priceUnit === 'per_12_visit_programme' ? 'Programme by quote' : offer.durationMin ? offer.durationMin + ' minutes' : 'Period agreed by quote'

  function chooseService(slug: string) {
    const next = listedServices.find((item) => item.slug === slug)!
    setService(slug); setOfferId(next.offers[0].id); setDurationMin(next.offers[0].durationMin || 0)
    setParticipants(String(next.offers[0].participants || 1)); setProfessional(''); setProgramme('')
  }
  function chooseOffer(id: string) {
    const next = selected.offers.find((item) => item.id === id)!
    setOfferId(id); setDurationMin(next.durationMin || 0); setParticipants(String(next.participants || 1)); setProgramme('')
  }
  return <div className={'estimator ' + (compact ? 'estimator-compact' : '')}>
    <form className="estimator-form" onSubmit={(event) => event.preventDefault()}><div className="form-grid">
      <Field label="Service"><select value={service} onChange={(event) => chooseService(event.target.value)}>{listedServices.map((item) => <option value={item.slug} key={item.slug}>{item.title}</option>)}</select></Field>
      <Field label="Specific format"><select value={offer.id} onChange={(event) => chooseOffer(event.target.value)}>{selected.offers.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></Field>
      <Field label="City"><select value={city} onChange={(event) => { setCity(event.target.value as City); setArea(''); setProfessional('') }}><option>Bali</option><option>Jakarta</option></select></Field>
      <Field label="Area cluster"><select value={area} onChange={(event) => setArea(event.target.value)}><option value="">Confirm later</option>{cityAreas.map((item) => <option value={item.slug} key={item.slug}>{item.name}{item.travelQuote ? ' (travel by quote)' : item.travelFee ? ' (+ travel)' : ''}</option>)}</select></Field>
      <Field label="Visit length"><select value={durationMin} onChange={(event) => setDurationMin(Number(event.target.value))}><option value={offer.durationMin || 0}>{scopeLabel}</option>{canExtend && <option value={90}>90 minutes (+45% of base)</option>}</select></Field>
      <Field label="Participants"><input type="number" min="1" max="100" step="1" value={participants} onChange={(event) => setParticipants(event.target.value)} /></Field>
      <Field label="Programme"><select value={programme} onChange={(event) => setProgramme(event.target.value)}><option value="">Single visit / custom scope</option>{canProgramme && programmes.map((item) => <option value={item.slug} key={item.slug}>{item.title} · {item.sessions} visits</option>)}</select></Field>
      {!compact && <><Field label="Professional preference" hint="We confirm availability for the person you prefer."><select value={professional} onChange={(event) => setProfessional(event.target.value)}><option value="">Match for me</option>{cityPros.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}</select></Field><Field label="Preferred window"><input value={timing} onChange={(event) => setTiming(event.target.value)} placeholder="e.g. 18 Nov, 07:00-09:00" maxLength={120} /></Field><Field label="General preference" hint="Practical goals only. Detailed health information needs a private intake."><input value={goals} onChange={(event) => setGoals(event.target.value)} placeholder="e.g. beginner strength, a quiet pair session" maxLength={200} /></Field></>}
    </div><p className="small muted">Opening WhatsApp creates a draft. Your message is sent only when you choose to send it in WhatsApp.</p></form>
    <aside className="estimator-result">
      {quote.ok ? <><p className="eyebrow eyebrow-light">Planning estimate</p><p className="estimate-total">{formatIdr(quote.total)}</p><p className="estimate-sub">{quote.sessions > 1 ? quote.sessions + ' visits · ' + formatIdr(quote.perSession) + ' each' : quote.formatLabel + ' · ' + quote.participants + (quote.participants === 1 ? ' person' : ' people')}</p><ul className="estimate-lines"><li><span>Base format</span><strong>{formatIdr(quote.base)}</strong></li>{quote.durationFee > 0 && <li><span>90-minute uplift</span><strong>{formatIdr(quote.durationFee)}</strong></li>}{quote.extraPeopleFee > 0 && <li><span>Additional people</span><strong>{formatIdr(quote.extraPeopleFee)}</strong></li>}{quote.travel > 0 && <li><span>Travel per visit</span><strong>{formatIdr(quote.travel)}</strong></li>}{quote.discount > 0 && <li><span>Programme reduction</span><strong>-{formatIdr(quote.discount)}</strong></li>}</ul><p className="small muted">Not a booking. {area ? 'Selected-area travel is included above.' : 'Area and travel remain to be confirmed.'} The written quote confirms all inclusions and the full payable total.</p></> : <><p className="eyebrow eyebrow-light">Your exact request</p><p className="estimate-total estimate-total-small">Personal quote</p><p>{quote.error}</p>{offer.guidePrice && <p className="quote-guide-note">Indicative Bali format guide: {formatIdr(offer.guidePrice)}. This is not a confirmed charge.</p>}</>}
      <div className="cluster"><a className="button button-primary" href={whatsappDraftUrl(message)} target="_blank" rel="noreferrer"><MessageCircle size={16} />Open in WhatsApp</a><CopyButton value={message} label="Copy request" /><button type="button" className="button button-outline-light" onClick={() => downloadText('PersonalFitness-request.txt', message)}>Download</button></div>
    </aside>
  </div>
}
