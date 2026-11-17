import { useMemo, useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { formatIdr } from '@/lib/money'
import { bookableDates, formatDay, getService, getTrainer, getVilla, services, sessionTotal, trainersFor, villas, type Booking } from './data'
import { demoHref } from './host'
import { useDemoState } from './demo-state'

export default function BookPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const state = useDemoState()
  const initialVilla = getVilla(params.get('villa') ?? '') ?? villas[0]
  const initialService = getService(params.get('service') ?? '') ?? services[2]
  const [villaSlug, setVillaSlug] = useState(initialVilla.slug)
  const [serviceSlug, setServiceSlug] = useState(initialService.slug)
  const service = getService(serviceSlug) ?? services[0]
  const options = trainersFor(service.slug)
  const requestedTrainer = getTrainer(params.get('trainer') ?? '')
  const [trainerSlug, setTrainerSlug] = useState(requestedTrainer && options.some((item) => item.slug === requestedTrainer.slug) ? requestedTrainer.slug : options[0]?.slug ?? '')
  const trainer = getTrainer(trainerSlug) ?? options[0]
  const [date, setDate] = useState(bookableDates[0])
  const [time, setTime] = useState(trainer?.slots[1] ?? trainer?.slots[0] ?? '07:00')
  const [people, setPeople] = useState(Math.min(service.included, service.max))
  const [guest, setGuest] = useState('')
  const [note, setNote] = useState('')
  const [charge, setCharge] = useState(true)
  const [error, setError] = useState('')
  const villa = getVilla(villaSlug) ?? villas[0]
  const taken = useMemo(() => new Set(state.bookings.filter((item) => item.status !== 'completed').map((item) => `${item.trainer}|${item.date}|${item.time}`)), [state.bookings])
  const total = sessionTotal(service.slug, people)

  function chooseService(slug: string) {
    setServiceSlug(slug)
    const next = getService(slug)
    const roster = trainersFor(slug)
    setTrainerSlug(roster[0]?.slug ?? '')
    setPeople(Math.min(next?.included ?? 1, next?.max ?? 1))
    setTime(roster[0]?.slots[0] ?? '07:00')
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!guest.trim()) { setError('Add the guest name as it should appear on the stay.'); return }
    if (!trainer) { setError('Choose a trainer from the sample roster.'); return }
    const booking: Booking = {
      id: state.nextBookingId(),
      villa: villa.slug,
      guest: guest.trim(),
      service: service.slug,
      trainer: trainer.slug,
      date,
      time,
      people,
      total,
      status: 'requested',
      chargeToStay: charge,
      note: note.trim(),
    }
    state.addBooking(booking)
    navigate(demoHref('/confirmed'), { state: booking })
  }

  return (
    <section className="section" style={{ paddingTop: 28 }}>
      <div className="wrap book-layout">
        <div>
          <p className="kicker">{villa.name}</p>
          <h1>Request the hour.</h1>
          <p className="lede" style={{ marginTop: 14 }}>It is added to {villa.stay}. The preview stops on the confirmation screen. No email leaves this page.</p>
          <img src={service.image.src} alt={service.image.alt} width={service.image.width} height={service.image.height} style={{ marginTop: 22, height: 240, width: '100%', objectFit: 'cover' }} />
        </div>
        <form className="panel" onSubmit={submit}>
          <h2>{service.name}</h2>
          <p className="quiet">{service.note}</p>
          <label className="field">
            <span>House</span>
            <select value={villa.slug} onChange={(event) => setVillaSlug(event.target.value)}>
              {villas.map((item) => <option key={item.slug} value={item.slug}>{item.name} · {item.area}</option>)}
            </select>
          </label>
          <div className="field">
            <span>Session</span>
            <div className="slot-row">
              {services.map((item) => (
                <button key={item.slug} type="button" className={item.slug === service.slug ? 'chip is-on' : 'chip'} onClick={() => chooseService(item.slug)}>{item.name}</button>
              ))}
            </div>
          </div>
          <div className="field">
            <span>Trainer</span>
            <div style={{ display: 'grid', gap: 8 }}>
              {options.map((item) => (
                <button key={item.slug} type="button" className={item.slug === trainer?.slug ? 'choice is-on' : 'choice'} onClick={() => { setTrainerSlug(item.slug); setTime(item.slots[0]) }}>
                  <img src={item.photo.src} alt="" width={item.photo.width} height={item.photo.height} />
                  <span>{item.name}<small>{item.role} · {item.languages.join(', ')}</small></span>
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <span>Day</span>
            <div className="slot-row">
              {bookableDates.map((item) => (
                <button key={item} type="button" className={item === date ? 'chip is-on' : 'chip'} onClick={() => setDate(item)}>{formatDay(item)}</button>
              ))}
            </div>
          </div>
          <div className="field">
            <span>Time</span>
            <div className="slot-row">
              {(trainer?.slots ?? []).map((slot) => {
                const busy = taken.has(`${trainer?.slug}|${date}|${slot}`)
                return <button key={slot} type="button" className={slot === time ? 'chip is-on' : 'chip'} disabled={busy} onClick={() => setTime(slot)}>{busy ? `${slot} held` : slot}</button>
              })}
            </div>
          </div>
          <div className="field">
            <span>People · up to {service.max}</span>
            <div className="stepper">
              <button type="button" onClick={() => setPeople((value) => Math.max(1, value - 1))} aria-label="Fewer people">−</button>
              <strong>{people}</strong>
              <button type="button" onClick={() => setPeople((value) => Math.min(service.max, value + 1))} aria-label="More people">+</button>
            </div>
          </div>
          <label className="field">
            <span>Guest name</span>
            <input value={guest} onChange={(event) => setGuest(event.target.value)} autoComplete="name" placeholder="Name on the stay" />
          </label>
          <label className="field">
            <span>Note for the house</span>
            <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Terrace, pool deck, or the gym room" />
          </label>
          <label className="check">
            <input type="checkbox" checked={charge} onChange={(event) => setCharge(event.target.checked)} />
            <span>Charge this hour to the {villa.name} stay. The written quote still confirms the person and the total.</span>
          </label>
          {error && <p className="form-error">{error}</p>}
          <div className="total-line">
            <span>Sample total</span>
            <strong>{formatIdr(total)}</strong>
          </div>
          <button className="btn" type="submit" style={{ width: '100%' }}>Send the request</button>
        </form>
      </div>
    </section>
  )
}
