import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, CalendarDays, Check, Download, Plus, Trash2 } from 'lucide-react'
import { cityAreas, getService, type City } from '@/data/catalog'
import { CopyButton, Eyebrow, Field } from './Primitives'
import { defaultVisits, estimateWellnessPlan, planServices, weekDays, wellnessPlanMessage, type PlanVisit } from '@/lib/wellnessPlan'
import { formatIdr } from '@/lib/money'
import { whatsappDraftUrl } from '@/lib/whatsapp'
import { downloadText } from '@/lib/downloadText'

export default function WellnessSchedule() {
  const [city, setCity] = useState<City>('Bali')
  const [area, setArea] = useState('canggu')
  const [weeks, setWeeks] = useState(4)
  const [startDate, setStartDate] = useState('')
  const [visits, setVisits] = useState<PlanVisit[]>(defaultVisits)
  const [review, setReview] = useState(false)
  const reviewHeading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (!review) return
    reviewHeading.current?.focus({ preventScroll: true })
    reviewHeading.current?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }, [review])
  const input = { city, area, weeks, startDate, visits }
  const estimate = estimateWellnessPlan(input)
  const message = wellnessPlanMessage(input)
  const update = (id: string, change: Partial<PlanVisit>) => { setVisits((items) => items.map((item) => item.id === id ? { ...item, ...change } : item)); setReview(false) }
  const add = () => { setVisits((items) => [...items, { id: 'visit-' + Date.now(), service: 'mat-pilates', day: 'Wednesday', time: '09:00', participants: 1 }]); setReview(false) }
  return <div className="schedule-builder" id="schedule-builder">
    <div className="schedule-controls">
      <div className="schedule-heading"><CalendarDays size={23} /><div><Eyebrow>Your weekly rhythm</Eyebrow><h2>Make room for feeling good.</h2></div></div>
      <p>Choose your visits for a typical week. We repeat that rhythm for your chosen number of weeks, then confirm dates and availability with you.</p>
      <div className="plan-settings">
        <Field label="City"><select value={city} onChange={(event) => { const next = event.target.value as City; setCity(next); setArea(cityAreas(next)[0].slug); setReview(false) }}><option>Bali</option><option>Jakarta</option></select></Field>
        <Field label="Area"><select value={area} onChange={(event) => { setArea(event.target.value); setReview(false) }}>{cityAreas(city).map((item) => <option key={item.slug} value={item.slug}>{item.name}{item.travelQuote ? ' (quote travel)' : ''}</option>)}</select></Field>
        <Field label="Plan length"><select value={weeks} onChange={(event) => { setWeeks(Number(event.target.value)); setReview(false) }}>{[1, 2, 3, 4].map((count) => <option key={count} value={count}>{count} {count === 1 ? 'week' : 'weeks'}</option>)}</select></Field>
        <Field label="Preferred start date" hint="Optional, local date"><input type="date" value={startDate} onChange={(event) => { setStartDate(event.target.value); setReview(false) }} /></Field>
      </div>
      <div className="plan-visit-list">
        {visits.map((visit, index) => <fieldset className="plan-visit" key={visit.id}>
          <legend>Visit {index + 1}</legend>
          <Field label={'Service for visit ' + (index + 1)}><select value={visit.service} onChange={(event) => update(visit.id, { service: event.target.value })}>{planServices.map((slug) => <option key={slug} value={slug}>{getService(slug)?.title}</option>)}</select></Field>
          <div className="plan-visit-timing">
            <Field label={'Day for visit ' + (index + 1)}><select value={visit.day} onChange={(event) => update(visit.id, { day: event.target.value })}>{weekDays.map((day) => <option key={day}>{day}</option>)}</select></Field>
            <Field label={'Time for visit ' + (index + 1)}><input type="time" value={visit.time} onChange={(event) => update(visit.id, { time: event.target.value })} required /></Field>
            <Field label={'People for visit ' + (index + 1)}><input type="number" min="1" max="20" step="1" value={visit.participants} onChange={(event) => update(visit.id, { participants: Number(event.target.value) })} required /></Field>
          </div>
          <button type="button" className="plan-remove" disabled={visits.length === 1} onClick={() => { setVisits((items) => items.filter((item) => item.id !== visit.id)); setReview(false) }} aria-label={'Remove visit ' + (index + 1)}><Trash2 size={16} />Remove</button>
        </fieldset>)}
      </div>
      <button type="button" className="button button-outline" onClick={add} disabled={visits.length >= 12}><Plus size={16} />Add another weekly visit</button>
      <p className="small muted">Need a different window or a pair session? <Link className="inline-link" to="/contact">Check availability.</Link></p>
    </div>
    <aside className="plan-summary" aria-label="Your plan summary">
      <Eyebrow light>Your plan, together</Eyebrow><h3>{estimate.totalVisits} visits.<br />One conversation.</h3>
      <div className="plan-week-preview">{[...visits].sort((a, b) => weekDays.indexOf(a.day as typeof weekDays[number]) - weekDays.indexOf(b.day as typeof weekDays[number]) || a.time.localeCompare(b.time)).map((visit) => <div key={visit.id}><span>{visit.day.slice(0, 3)}<small>{visit.time}</small></span><p>{getService(visit.service)?.title}<small>{visit.participants} {visit.participants === 1 ? 'person' : 'people'} · weekly</small></p></div>)}</div>
      <dl className="plan-totals"><div><dt>Priced sessions</dt><dd>{formatIdr(estimate.sessionTotal)}</dd></div><div><dt>Travel for priced visits</dt><dd>{formatIdr(estimate.travelTotal)}</dd></div><div><dt>Eligible programme saving</dt><dd>{estimate.saving ? '- ' + formatIdr(estimate.saving) : 'No tier yet'}</dd></div></dl>
      <p className="plan-total-label">{estimate.requiresQuote ? 'Priced items subtotal' : 'Starting price for your block'}</p><p className="plan-total">{estimate.pricedVisits ? formatIdr(estimate.total) : 'Written quote'}</p>
      {estimate.requiresQuote && <p className="plan-warning" role="status">{estimate.collisions ? 'Some visits overlap. Choose different times to review your plan.' : estimate.invalid ? 'Check your area, visit time and whole participant count.' : 'A complete quote is required. Some services, group sizes or travel are not included in this subtotal.'}</p>}
      {estimate.discountRate > 0 && <p className="plan-saving"><Check size={16} />{Math.round(estimate.discountRate * 100)}% saving on eligible fitness visits</p>}
      <p className="plan-small">The 6, 9 and 12 visit tiers apply to personal training, private yoga, mat Pilates and mobility. Travel is quoted separately and does not receive this saving. All dates depend on availability.</p>
      <button type="button" className="button button-light" disabled={estimate.invalid} onClick={() => setReview(true)}>Review my schedule<ArrowUpRight size={16} /></button>
      <p className="plan-small">Try one paid visit first. Your monthly plan is prepaid after you accept the full written quote. No automatic renewal.</p>
    </aside>
    {review && <section className="plan-review" aria-label="Review schedule enquiry">
      <Eyebrow>Ready for your coordinator</Eyebrow><h2 ref={reviewHeading} tabIndex={-1}>Your schedule enquiry.</h2><p>Review the details, then open WhatsApp to send your request. This planner does not process payment, save a health record or confirm a booking.</p><pre>{message}</pre><div className="cluster"><a href={whatsappDraftUrl(message)} target="_blank" rel="noopener noreferrer" className="button button-primary">Open WhatsApp draft<ArrowUpRight size={16} /></a><CopyButton value={message} label="Copy schedule" /><button type="button" className="button button-outline" onClick={() => downloadText('PersonalFitness-wellness-schedule.txt', message)}><Download size={16} />Download schedule</button></div>
    </section>}
  </div>
}
