import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { COMPANY_EMAIL, COMPANY_EMAIL_HREF } from '@/data/company'
import { formatIdr } from '@/lib/money'
import { guestMenuMessage, WHATSAPP_DISPLAY, whatsappDraftUrl } from '@/lib/whatsapp'
import { partner } from '@/config/partner'

const lines = [
  ['Private yoga', 850_000, 'up to 2 people'],
  ['Personal training', 900_000, '1 person'],
  ['Mat Pilates', 950_000, 'no reformer'],
  ['Mobility & stretching', 850_000, 'non-clinical'],
  ['Boxing fitness', 1_000_000, 'pads only, 1 person'],
  ['Guided meditation', 800_000, 'up to 2 people'],
]

export default function PartnerMenu() {
  const [params] = useSearchParams()
  const code = (params.get('partner') || '').toUpperCase()
  const villa = params.get('villa') || 'your villa'
  const lang = params.get('lang') === 'id' ? 'id' : 'en'
  const href = whatsappDraftUrl(guestMenuMessage(villa, code))
  const heading = useMemo(() => lang === 'id' ? `Wellness di ${villa}` : `Wellness at ${villa}`, [lang, villa])
  return (
    <div className="menu-card" lang={lang}>
      <p className="eyebrow">PersonalFitness.id</p>
      <h1>{heading}</h1>
      <p className="large-copy">{lang === 'id' ? 'Coach kami datang ke villa Anda.' : 'Our coaches come to your villa.'}</p>
      <ul className="menu-rates">
        {lines.map(([title, price, note]) => (
          <li key={String(title)}><strong>{title}</strong><span>{lang === 'id' ? 'mulai' : 'from'} {formatIdr(Number(price))} · {note}</span></li>
        ))}
      </ul>
      {partner.GROUP_YOGA_RATE_BALI && partner.GROUP_YOGA_MAX_PEOPLE && (
        <p>Villa group yoga · up to {partner.GROUP_YOGA_MAX_PEOPLE} · from {formatIdr(partner.GROUP_YOGA_RATE_BALI)}</p>
      )}
      <p>{lang === 'id'
        ? 'Contoh: yoga pagi privat Senin, Rabu, Jumat pukul 08:00. Pesan paling lambat pukul 18:00 sehari sebelumnya.'
        : 'Example: private yoga Monday, personal training Wednesday, mat Pilates Friday at 08:00. Reserve by 18:00 the day before.'}</p>
      {code && <p className="menu-code">Partner {code}</p>}
      <p className="small muted">60 minutes. Prices from. Travel added outside Canggu/Seminyak. Confirmed in writing before you pay.</p>
      <p className="small"><a href={href}>WhatsApp {WHATSAPP_DISPLAY}</a></p>
      <p className="small"><a href={COMPANY_EMAIL_HREF}>{COMPANY_EMAIL}</a></p>
    </div>
  )
}
