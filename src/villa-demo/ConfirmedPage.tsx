import { useLocation } from 'react-router'
import { formatIdr } from '@/lib/money'
import { POLICY_LINE, formatDay, getService, getTrainer, getVilla, packs, seedBookings, type Booking } from './data'
import { DemoLink } from './shell'

export default function ConfirmedPage() {
  const location = useLocation()
  const passed = location.state as Booking | null
  const booking = passed && passed.id ? passed : seedBookings.find((item) => item.id === 'ARK-1904') ?? seedBookings[0]
  const sample = !passed?.id
  const villa = getVilla(booking.villa)
  const service = getService(booking.service)
  const trainer = getTrainer(booking.trainer)
  return (
    <section className="confirm wrap">
      <p className="kicker">{sample ? 'Sample confirmation' : 'Request received'}</p>
      <h1>{booking.chargeToStay ? 'It is with the house.' : 'It is with the coordinator.'}</h1>
      <p className="lede">{sample ? 'This is the sample request already on the desk, so the screen is never empty.' : 'Nothing was emailed. In the live service, a coordinator confirms the person and the total in writing before the hour is held.'}</p>
      <p className="ref">{booking.id}</p>
      <div className="summary">
        <div><span>House</span><b>{villa?.name}</b></div>
        <div><span>Guest</span><b>{booking.guest}</b></div>
        <div><span>Session</span><b>{service?.name} · {service?.duration} min</b></div>
        <div><span>When</span><b>{formatDay(booking.date)} · {booking.time}</b></div>
        <div><span>People</span><b>{booking.people}</b></div>
        <div><span>Instructor</span><b>{trainer?.name}</b></div>
        <div><span>Rate</span><b>{packs.find((item) => item.id === booking.packId)?.label ?? 'Single'}</b></div>
        <div><span>Stay charge</span><b>{booking.chargeToStay ? formatIdr(booking.total) : 'To be confirmed'}</b></div>
      </div>
      <p className="quiet">{POLICY_LINE}</p>
      {booking.note && <p className="quiet">Note: {booking.note}</p>}
      <div className="cluster" style={{ marginTop: 22 }}>
        <DemoLink to={`/stay/${villa?.slug ?? 'house-lima'}`} className="btn">Back to the house</DemoLink>
        <DemoLink to="/desk" className="btn-line">See it on the desk</DemoLink>
      </div>
    </section>
  )
}
