import { PolicySummary, ServiceRequestBadge } from '@/components/PolicyLines'
import { TRAVEL_DISCLAIMER, TRAVEL_DISCLAIMER_ID } from '@/data/offerCopy'
import { publicServices } from '@/data/publicOffer'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { COMPANY_EMAIL, COMPANY_EMAIL_HREF } from '@/data/company'
import { formatIdr } from '@/lib/money'
import { guestMenuMessage, WHATSAPP_DISPLAY, whatsappDraftUrl } from '@/lib/whatsapp'
import { partner } from '@/config/partner'

const menuSlugs: Record<string, string> = { 'Private yoga': 'private-yoga', 'Private Strength Training': 'personal-training', 'Bodywork & Recovery': 'bodywork-recovery', 'Zumba & Dance Fitness': 'zumba-dance-fitness', 'Mat Pilates': 'mat-pilates', 'Mobility & stretching': 'mobility-coaching', 'Boxing fitness': 'boxing-fitness', 'Guided meditation': 'guided-meditation' }
const lines = [
  ['Private yoga', 'up to 2 people'],
  ['Private Strength Training', '1 guest'],
  ['Bodywork & Recovery', 'wellness hour'],
  ['Zumba & Dance Fitness', 'fun cardio'],
  ['Mat Pilates', 'no reformer'],
  ['Mobility & stretching', 'guided movement'],
  ['Boxing fitness', 'pads only · 1 guest'],
  ['Guided meditation', 'up to 2 people'],
]

const partnerCardId: Record<string, string> = {
  "Private yoga": "Yoga privat",
  "Private Strength Training": "Latihan kekuatan privat",
  "Bodywork & Recovery": "Bodywork & pemulihan",
  "Zumba & Dance Fitness": "Zumba & kebugaran tari",
  "Mat Pilates": "Mat Pilates",
  "Mobility & stretching": "Mobilitas & peregangan",
  "Boxing fitness": "Kebugaran tinju",
  "Guided meditation": "Meditasi terpandu",
  "up to 2": "maks. 2 orang",
  "Rp 1.300.000 single": "Rp 1.300.000 satu orang",
  "wellness hour": "jam pemulihan",
  "fun cardio": "kardio santai",
  "no reformer": "tanpa reformer",
  "guided movement": "gerakan terpandu",
  "pads only": "hanya pad",
  "pads only · 1 guest": "hanya pad · 1 orang",
  "up to 2 people": "maks. 2 orang",
  "1 guest": "1 orang"
}

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
      <p className="large-copy">{lang === 'id' ? 'Instruktur untuk sesi Anda disebutkan pada kutipan tertulis.' : 'Instructors come to your villa.'}</p>
      <ul className="menu-rates">
        {lines.map(([title, note]) => (
          <li key={String(title)}><strong>{lang === 'id' ? partnerCardId[String(title)] || title : title}</strong><ServiceRequestBadge slug={menuSlugs[String(title)]} lang={lang} /><span>{lang === 'id' ? 'mulai' : 'from'} {formatIdr(publicServices.find(service => service.slug === menuSlugs[title])!.prices.Bali!)} · {lang === 'id' ? partnerCardId[String(note)] || note : note}</span></li>
        ))}
      </ul>
      {partner.GROUP_YOGA_RATE_BALI && partner.GROUP_YOGA_MAX_PEOPLE && (
        <p>Villa group yoga · up to {partner.GROUP_YOGA_MAX_PEOPLE} · from {formatIdr(partner.GROUP_YOGA_RATE_BALI)}</p>
      )}
      <p>{lang === 'id'
        ? 'Contoh saja, tergantung ketersediaan: yoga privat Senin, latihan kekuatan privat Rabu, dan mat Pilates Jumat pukul 08:00. Tamu bisa meminta slot paling lambat pukul 18:00 sehari sebelumnya. Sesi baru terkunci setelah kutipan tertulis diterima.'
        : 'Example only, as supply allows: private yoga Monday, private strength training Wednesday and mat Pilates Friday at 08:00. Guests can request a slot by 18:00 the day before. A session is confirmed only after the written quote is accepted.'}</p>
      {code && <p className="menu-code">Partner {code}</p>}
      <p className="small muted">{lang === 'id' ? TRAVEL_DISCLAIMER_ID : TRAVEL_DISCLAIMER}</p><PolicySummary lang={lang} />
      <p className="small"><a href={href}>WhatsApp {WHATSAPP_DISPLAY}</a></p>
      <p className="small"><a href={COMPANY_EMAIL_HREF}>{COMPANY_EMAIL}</a></p>
      <p className="small muted">{lang === 'id' ? 'Kami membalas pukul 08:00-20:00 waktu Bali.' : 'We reply between 08:00 and 20:00 Bali time.'}</p>
    </div>
  )
}
