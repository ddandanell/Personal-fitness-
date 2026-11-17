import { useParams } from 'react-router'
import { getVilla, villas } from './data'
import { QrMark } from './qr'
import { DemoLink } from './shell'

export default function CardPage() {
  const { slug } = useParams()
  const villa = getVilla(slug) ?? villas[0]
  const url = `https://villademo.personalfitness.id/stay/${villa.slug}`
  return (
    <section>
      <div className="wrap" style={{ paddingTop: 28 }}>
        <p className="kicker">For the bedside</p>
        <h1>The card in the room.</h1>
        <p className="lede" style={{ margin: '14px 0 8px' }}>Print one for each house. The code opens that house’s wellness page. Guests request the hour; the stay carries the charge.</p>
        <div className="villa-switch no-print">
          {villas.map((item) => (
            <DemoLink key={item.slug} to={`/card/${item.slug}`} className={item.slug === villa.slug ? 'chip is-on' : 'chip'}>{item.name}</DemoLink>
          ))}
        </div>
      </div>
      <div className="card-stage">
        <article className="room-card">
          <header>
            <span>Arunika · {villa.area}</span>
            <strong>{villa.name}</strong>
          </header>
          <img src={villa.detail.src} alt={villa.detail.alt} width={villa.detail.width} height={villa.detail.height} style={{ height: 160, width: '100%', objectFit: 'cover' }} />
          <div>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', lineHeight: 1.05 }}>In-villa wellness</p>
            <p className="quiet">Scan for a private hour at the house. Yoga, Pilates, training and a quiet recovery session. Added to your stay.</p>
          </div>
          <QrMark value={url} label={`QR code for ${villa.name} in-villa wellness`} />
          <footer>
            <span>{villa.name}</span>
            <span>PersonalFitness.id</span>
          </footer>
        </article>
        <p className="no-print" style={{ textAlign: 'center', marginTop: 18 }}>
          <button className="btn light" type="button" onClick={() => window.print()}>Print this card</button>
        </p>
      </div>
    </section>
  )
}
