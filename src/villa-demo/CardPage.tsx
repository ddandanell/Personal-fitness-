import { useParams } from 'react-router'
import { COMPANY_EMAIL, COMPANY_EMAIL_HREF } from '@/data/company'
import card from './guest-card.json'
import { getVilla, villas } from './data'
import { QrMark } from './qr'
import { DemoLink } from './shell'

export default function CardPage() {
  const { slug } = useParams()
  const villa = getVilla(slug) ?? villas[0]
  const url = `https://villademo.personalfitness.id/stay/${villa.slug}`
  const pdf = `/images/villademo/cards/${villa.slug}.pdf`
  return (
    <section>
      <div className="wrap" style={{ paddingTop: 28 }}>
        <p className="kicker">For the bedside</p>
        <h1>The card in the room.</h1>
        <p className="lede" style={{ margin: '14px 0 8px' }}>Two pages, in the house’s own name. Guests scan the code, or the villa team writes to hello@personalfitness.id.</p>
        <div className="villa-switch no-print">
          {villas.map((item) => (
            <DemoLink key={item.slug} to={`/card/${item.slug}`} className={item.slug === villa.slug ? 'chip is-on' : 'chip'}>{item.name}</DemoLink>
          ))}
        </div>
        <div className="cluster no-print" style={{ marginBottom: 18 }}>
          <a className="btn" href={pdf} download>Download the guest card</a>
          <button className="btn-line" type="button" onClick={() => window.print()}>Print</button>
        </div>
      </div>
      <div className="sheet-desk">
        <div className="sheet-row">
          <article className="guest-sheet">
            <header className="sheet-brand">
              <span className="sheet-mark" aria-hidden="true">A</span>
              <div>
                <strong>Arunika</strong>
                <span>{villa.name} · {villa.area}</span>
              </div>
              <em>Private villa wellness</em>
            </header>
            <img src={villa.image.src} alt={villa.image.alt} width={villa.image.width} height={villa.image.height} />
            <p className="sheet-kicker">{card.eyebrow}</p>
            <p className="sheet-display">{card.headline[0]}<br />{card.headline[1]}</p>
            <p className="sheet-copy">Private sessions at {villa.name}, for one or two guests, arranged around the way you want to spend the stay.</p>
            <div className="sheet-services">
              {card.services.map(([title, line]) => (
                <div key={title}><strong>{title}</strong><span>{line}</span></div>
              ))}
            </div>
            <p className="sheet-ask">{card.ask}</p>
            <footer><span>{card.powered}</span><span>01 / 02</span></footer>
          </article>
          <article className="guest-sheet">
            <header className="sheet-brand">
              <span className="sheet-mark" aria-hidden="true">A</span>
              <div>
                <strong>Arunika</strong>
                <span>Make it your stay</span>
              </div>
            </header>
            <p className="sheet-kicker">{card.stayKicker}</p>
            <p className="sheet-display">{card.stayHeadline[0]}<br />{card.stayHeadline[1]}</p>
            <div className="sheet-split">
              <div>
                {card.rhythms.map(([title, line]) => (
                  <div key={title}><strong>{title}</strong><span>{line}</span></div>
                ))}
              </div>
              <img src={villa.detail.src} alt={villa.detail.alt} width={villa.detail.width} height={villa.detail.height} />
            </div>
            <p className="sheet-ask">{card.collectionTitle}</p>
            <div className="sheet-columns">
              {card.columns.map(([title, line]) => (
                <div key={title}><em>{title}</em><span>{line}</span></div>
              ))}
            </div>
            <div className="sheet-arrange">
              <div>
                <strong>{card.arrange}</strong>
                <p><a href={card.whatsappHref}>WhatsApp {card.whatsappDisplay}</a></p>
                <p>60 min from Rp 1.050.000. Packs from Rp 800.000 a session. A second guest is Rp 250.000 a session.</p>
                <a href={COMPANY_EMAIL_HREF}>{COMPANY_EMAIL}</a>
              </div>
              <div>
                <QrMark value={url} label={`QR code for ${villa.name} in-villa wellness`} />
                <span>Scan to enquire</span>
              </div>
            </div>
            <p className="sheet-note">{card.note} {villa.area === 'Uluwatu' ? 'Travel for Uluwatu is a flat fee of Rp 50.000–100.000.' : ''}</p>
            <footer><span>{card.powered}</span><span>02 / 02</span></footer>
          </article>
        </div>
      </div>
    </section>
  )
}
