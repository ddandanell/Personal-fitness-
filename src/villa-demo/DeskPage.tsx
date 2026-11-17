import { useMemo, useState, type FormEvent } from 'react'
import { formatIdr } from '@/lib/money'
import { bookableDates, formatDay, getService, getTrainer, getVilla, services, sessionTotal, trainers, trainersFor, villas, weekDays, type Booking, type Schedule } from './data'
import { demoHref } from './host'
import { DemoLink } from './shell'
import { useDemoState } from './demo-state'

export default function DeskPage({ view }: { view: 'today' | 'book' | 'schedules' | 'roster' }) {
  const state = useDemoState()
  const completed = state.bookings.filter((item) => item.status === 'completed')
  const upcoming = state.bookings.filter((item) => item.status !== 'completed').slice().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
  const revenue = completed.reduce((sum, item) => sum + item.total, 0)
  const nav = [
    ['/desk', 'Today', view === 'today'],
    ['/desk/book', 'Book a guest', view === 'book'],
    ['/desk/schedules', 'Recurring', view === 'schedules'],
    ['/desk/roster', 'Roster', view === 'roster'],
  ] as const

  return (
    <section className="section" style={{ paddingTop: 20 }}>
      <div className="wrap desk">
        <nav className="desk-nav" aria-label="Desk">
          <p className="kicker">Arunika desk</p>
          {nav.map(([to, label, on]) => <DemoLink key={to} to={to} className={on ? 'is-on' : undefined}>{label}</DemoLink>)}
          <DemoLink to="/card/house-lima">Room cards</DemoLink>
        </nav>
        <div>
          {view === 'today' && <Today revenue={revenue} upcoming={upcoming} count={completed.length} />}
          {view === 'book' && <DeskBook />}
          {view === 'schedules' && <Schedules />}
          {view === 'roster' && <Roster />}
        </div>
      </div>
    </section>
  )
}

function Today({ revenue, upcoming, count }: { revenue: number; upcoming: Booking[]; count: number }) {
  return (
    <>
      <p className="kicker">November · sample ledger</p>
      <h1>The house desk.</h1>
      <p className="desk-total">{formatIdr(revenue)}</p>
      <p className="quiet">Charged to stays this month. Commission is agreed in writing and is not invented here.</p>
      <div className="stat-row" style={{ margin: '22px 0 32px' }}>
        <div className="stat"><b>{count}</b><span className="quiet">Completed hours</span></div>
        <div className="stat"><b>{upcoming.length}</b><span className="quiet">Coming up</span></div>
        <div className="stat"><b>{villas.length}</b><span className="quiet">Houses on the book</span></div>
      </div>
      <h2>Coming up</h2>
      <div className="booking-list">
        {upcoming.map((item) => <BookingRow key={item.id} item={item} />)}
      </div>
      <h2 style={{ marginTop: 36 }}>Houses</h2>
      <div className="villa-grid" style={{ marginTop: 14 }}>
        {villas.map((villa) => (
          <DemoLink to={`/stay/${villa.slug}`} className="villa-tile" key={villa.slug}>
            <img src={villa.image.src} alt="" width={villa.image.width} height={villa.image.height} />
            <div>
              <strong>{villa.name}</strong>
              <p>{villa.area} · {villa.stay}</p>
            </div>
          </DemoLink>
        ))}
      </div>
    </>
  )
}

function BookingRow({ item }: { item: Booking }) {
  const villa = getVilla(item.villa)
  const service = getService(item.service)
  const trainer = getTrainer(item.trainer)
  return (
    <article className="booking">
      <div>
        <p className="status">{item.id} · {item.status}</p>
        <strong>{formatDay(item.date)} · {item.time}</strong>
      </div>
      <div>
        <strong>{item.guest}</strong>
        <p className="quiet">{villa?.name} · {item.people} {item.people === 1 ? 'person' : 'people'}</p>
      </div>
      <p>{service?.name}<br /><span className="quiet">{trainer?.name}</span></p>
      <strong>{item.chargeToStay ? formatIdr(item.total) : 'Quote'}</strong>
    </article>
  )
}

function DeskBook() {
  const state = useDemoState()
  const [villaSlug, setVillaSlug] = useState(villas[0].slug)
  const [serviceSlug, setServiceSlug] = useState(services[0].slug)
  const service = getService(serviceSlug) ?? services[0]
  const roster = trainersFor(service.slug)
  const [trainerSlug, setTrainerSlug] = useState(roster[0]?.slug ?? '')
  const [date, setDate] = useState(bookableDates[0])
  const [time, setTime] = useState('08:00')
  const [people, setPeople] = useState(service.included)
  const [guest, setGuest] = useState('')
  const [done, setDone] = useState<Booking | null>(null)
  const [error, setError] = useState('')

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!guest.trim()) { setError('Name the guest.'); return }
    const booking: Booking = {
      id: state.nextBookingId(),
      villa: villaSlug,
      guest: guest.trim(),
      service: service.slug,
      trainer: trainerSlug,
      date,
      time,
      people,
      total: sessionTotal(service.slug, people),
      status: 'confirmed',
      chargeToStay: true,
      note: 'Placed from the desk.',
    }
    state.addBooking(booking)
    setDone(booking)
    setGuest('')
    setError('')
  }

  return (
    <form onSubmit={submit}>
      <p className="kicker">Place an hour</p>
      <h1>Book a trainer for a guest.</h1>
      <p className="lede" style={{ margin: '12px 0 18px' }}>The request lands on the coming-up list for this browser only.</p>
      {done && <p className="success">{done.id} is on the desk for {getVilla(done.villa)?.name}. <a href={demoHref('/desk')}>See today.</a></p>}
      <div className="panel">
        <label className="field"><span>House</span>
          <select value={villaSlug} onChange={(event) => setVillaSlug(event.target.value)}>{villas.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select>
        </label>
        <label className="field"><span>Guest</span><input value={guest} onChange={(event) => setGuest(event.target.value)} placeholder="Name on the stay" /></label>
        <label className="field"><span>Session</span>
          <select value={service.slug} onChange={(event) => { setServiceSlug(event.target.value); const next = trainersFor(event.target.value); setTrainerSlug(next[0]?.slug ?? ''); setPeople(getService(event.target.value)?.included ?? 1) }}>
            {services.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
          </select>
        </label>
        <label className="field"><span>Trainer</span>
          <select value={trainerSlug} onChange={(event) => setTrainerSlug(event.target.value)}>{roster.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select>
        </label>
        <label className="field"><span>Day</span>
          <select value={date} onChange={(event) => setDate(event.target.value)}>{bookableDates.map((item) => <option key={item} value={item}>{formatDay(item)}</option>)}</select>
        </label>
        <label className="field"><span>Time</span><input value={time} onChange={(event) => setTime(event.target.value)} placeholder="07:00" /></label>
        <div className="field"><span>People · up to {service.max}</span>
          <div className="stepper">
            <button type="button" onClick={() => setPeople((value) => Math.max(1, value - 1))} aria-label="Fewer people">−</button>
            <strong>{people}</strong>
            <button type="button" onClick={() => setPeople((value) => Math.min(service.max, value + 1))} aria-label="More people">+</button>
          </div>
        </div>
        {error && <p className="form-error">{error}</p>}
        <div className="total-line"><span>Stay charge</span><strong>{formatIdr(sessionTotal(service.slug, people))}</strong></div>
        <button className="btn" type="submit">Add to the stay</button>
      </div>
    </form>
  )
}

function Schedules() {
  const state = useDemoState()
  const [name, setName] = useState('Evening stretch')
  const [serviceSlug, setServiceSlug] = useState('mobility-coaching')
  const [time, setTime] = useState('17:30')
  const [days, setDays] = useState<string[]>(['Tue', 'Thu'])
  const [selected, setSelected] = useState<string[]>(['pavilion-echo'])
  const [made, setMade] = useState<Schedule | null>(null)

  function toggle(list: string[], value: string, set: (next: string[]) => void) {
    set(list.includes(value) ? list.filter((item) => item !== value) : [...list, value])
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!days.length || !selected.length) return
    const roster = trainersFor(serviceSlug)
    const schedule: Schedule = {
      id: state.nextScheduleId(),
      name: name.trim() || 'Recurring hour',
      service: serviceSlug,
      trainer: roster[0]?.slug ?? trainers[0].slug,
      time,
      days,
      villas: selected,
    }
    state.addSchedule(schedule)
    setMade(schedule)
  }

  return (
    <>
      <p className="kicker">Repeating hours</p>
      <h1>The same morning, across the houses.</h1>
      <div className="booking-list" style={{ marginTop: 20 }}>
        {state.schedules.map((item) => {
          const service = getService(item.service)
          const trainer = getTrainer(item.trainer)
          return (
            <article className="booking" key={item.id}>
              <div><p className="status">{item.id}</p><strong>{item.name}</strong></div>
              <p>{item.days.join(' · ')} · {item.time}<br /><span className="quiet">{service?.name} · {trainer?.name}</span></p>
              <p className="quiet">{item.villas.map((slug) => getVilla(slug)?.name).filter(Boolean).join(', ')}</p>
              <span />
            </article>
          )
        })}
      </div>
      <form onSubmit={submit} className="panel" style={{ marginTop: 28 }}>
        <h2>Add a repeating hour</h2>
        {made && <p className="success">{made.name} is on the book for this browser.</p>}
        <label className="field"><span>Name</span><input value={name} onChange={(event) => setName(event.target.value)} /></label>
        <label className="field"><span>Session</span>
          <select value={serviceSlug} onChange={(event) => setServiceSlug(event.target.value)}>{services.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select>
        </label>
        <label className="field"><span>Time</span><input value={time} onChange={(event) => setTime(event.target.value)} /></label>
        <div className="field"><span>Days</span>
          <div className="slot-row">{weekDays.map((day) => <button type="button" key={day} className={days.includes(day) ? 'chip is-on' : 'chip'} onClick={() => toggle(days, day, setDays)}>{day}</button>)}</div>
        </div>
        <div className="field"><span>Houses</span>
          <div className="slot-row">{villas.map((villa) => <button type="button" key={villa.slug} className={selected.includes(villa.slug) ? 'chip is-on' : 'chip'} onClick={() => toggle(selected, villa.slug, setSelected)}>{villa.name}</button>)}</div>
        </div>
        <button className="btn" type="submit" style={{ marginTop: 16 }}>Save the rhythm</button>
      </form>
    </>
  )
}

function Roster() {
  const hours = useMemo(() => trainers.map((trainer) => ({ trainer, slots: trainer.slots })), [])
  return (
    <>
      <p className="kicker">Who can be sent</p>
      <h1>The roster for these houses.</h1>
      <div className="roster-grid" style={{ marginTop: 22 }}>
        {hours.map(({ trainer }) => (
          <article className="roster-card" key={trainer.slug}>
            <img src={trainer.photo.src} alt={trainer.photo.alt} width={trainer.photo.width} height={trainer.photo.height} />
            <h3 style={{ marginTop: 12 }}>{trainer.name}</h3>
            <p>{trainer.role}</p>
            <p className="quiet">{trainer.languages.join(' · ')} · sample {trainer.rating.toFixed(1)}</p>
            <p className="quiet">{trainer.slots.join(' · ')}</p>
            <DemoLink to={`/trainers/${trainer.slug}`} className="text-link">Guest view</DemoLink>
          </article>
        ))}
      </div>
    </>
  )
}
