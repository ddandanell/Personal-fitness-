import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, Check } from 'lucide-react'
import { EnquiryNote, HoneypotField } from '@/components/EnquiryFields'
import { Eyebrow, Field, TextLink } from '@/components/Primitives'
import StructuredData from '@/components/StructuredData'
import { publicServices } from '@/data/publicOffer'
import { formatIdr } from '@/lib/money'
import { COMPANY_EMAIL, COMPANY_EMAIL_HREF, SITE_ORIGIN } from '@/data/company'
import { submitEnquiry } from '@/lib/submitEnquiry'
import { trackEvent, trackWhatsApp } from '@/lib/analytics'
import { PARTNER_ENQUIRY_MESSAGE, PARTNER_ENQUIRY_MESSAGE_ID, WHATSAPP_DISPLAY, whatsappDraftUrl } from '@/lib/whatsapp'
import {
  PARTNER_MENU_PDF,
  commissionSentence,
  commissionShare,
  exampleCommission,
  partner,
  EXAMPLE_MONTHLY_SESSION_VALUE,
  EXAMPLE_MONTHLY_SESSIONS,
} from '@/config/partner'

const AREAS = ['Canggu', 'Seminyak', 'Ubud', 'Sanur', 'Uluwatu', 'Jakarta', 'Other'] as const

const guestCards = [
  { to: '/private-yoga', title: 'Private yoga', note: 'up to 2', bali: 850_000 },
  { to: '/personal-training', title: 'Personal training', note: '1 person', bali: 900_000 },
  { to: '/mat-pilates', title: 'Mat Pilates', note: 'no reformer', bali: 950_000 },
  { to: '/mobility-coaching', title: 'Mobility & stretching', note: 'non-clinical', bali: 850_000 },
  { to: '/boxing-fitness', title: 'Boxing fitness', note: 'pads only, 1 person', bali: 1_000_000 },
  { to: '/guided-meditation', title: 'Guided meditation', note: 'up to 2', bali: 800_000 },
]

const copy = {
  en: {
    eyebrow: 'For villa managers',
    h1: 'Wellness for every villa you manage. You earn on every session.',
    sub: `Put yoga, personal training, Pilates, stretching, boxing and meditation on the menu in every villa you manage. A coordinator sets the week, a vetted coach comes to the guest, and the guest pays us. ${commissionSentence('en')}`,
    primary: 'Talk to us',
    secondary: 'Download the partner menu (PDF)',
    switch: 'Bahasa Indonesia',
    switchTo: '/id/mitra-villa',
    howTitle: 'How it works',
    steps: [
      'Tell your coordinator which villas, areas and days you want covered.',
      'Guests request the session by email or WhatsApp. The request carries your partner code.',
      'A vetted coach comes to the villa. The guest pays us.',
      `You earn ${commissionShare('en')}, with a simple statement from our team each month.`,
    ],
    guestsTitle: 'What your guests can book',
    priceNote: 'Bali prices, 60 minutes. Canggu and Seminyak included. Ubud and Sanur +Rp 150.000, Uluwatu +Rp 200.000 travel per visit.',
    calendarTitle: 'Set a week across the villas you manage.',
    calendar: 'Example: private yoga Monday, personal training Wednesday and mat Pilates Friday at 08:00, each in that guest’s villa. Guests reserve by 18:00 the day before. Your coordinator keeps the diary.',
    getTitle: 'What you get',
    get: [
      'A named coordinator for your villas',
      'A printed menu card for each villa',
      'Booking by email or WhatsApp, with your partner code',
      'A weekly rhythm across the portfolio',
      'A simple monthly statement from our team',
      '30-day pilot at 1–2 villas first',
    ],
    spaceTitle: 'Have a space?',
    space: 'If a villa has a terrace, studio or big living room, we check it and plan a shared class or a regular slot.',
    formTitle: 'Talk to us',
    formLead: `No sales meeting. Send the villas, the areas and the week you want. A person replies by email at ${COMPANY_EMAIL} or on WhatsApp.`,
    consent: 'I agree that PersonalFitness.id may contact me on WhatsApp and email about the partner programme.',
    send: 'Send enquiry',
    footer: `Questions? Email ${COMPANY_EMAIL} or WhatsApp ${WHATSAPP_DISPLAY}. A real person replies.`,
    terms: 'Partner terms',
    faqs: [
      ['Who pays?', 'The guest pays us. We pay you your commission monthly.'],
      ['Do we need a contract?', 'Only our short partner terms.'],
      ['What if a coach can’t come?', 'We tell the guest straight away and offer a new time or a full refund.'],
      ['Privacy?', 'Your team gets the time and villa only. Guest health notes stay with the coach.'],
      ['Insurance and liability?', 'Ask us and we send it in writing.'],
      ['Which areas?', 'Canggu and Seminyak included; Ubud, Sanur, Uluwatu with a travel fee; others on request.'],
    ] as Array<[string, string]>,
    labels: {
      company: 'Company name',
      name: 'Your name',
      role: 'Role',
      whatsapp: 'WhatsApp number',
      email: 'Email',
      villas: 'Number of villas',
      areas: 'Areas',
      start: 'Villas to start with',
      mats: 'Space for 2 yoga mats?',
      lang: 'Guest menu language',
    },
  },
  id: {
    eyebrow: 'Untuk pengelola villa',
    h1: 'Wellness untuk setiap villa Anda. Anda dapat komisi dari setiap sesi.',
    sub: `Letakkan yoga, personal training, Pilates, stretching, boxing dan meditasi di setiap villa yang Anda kelola. Koordinator mengatur mingguannya, coach yang sudah diseleksi datang ke tamu, dan tamu membayar ke kami. ${commissionSentence('id')}`,
    primary: 'Bicara dengan kami',
    secondary: 'Unduh menu partner (PDF)',
    switch: 'English',
    switchTo: '/villa-hotel-partners',
    howTitle: 'Cara kerja',
    steps: [
      'Beritahu koordinator villa, area, dan hari yang ingin dicakup.',
      'Tamu meminta sesi lewat email atau WhatsApp. Pesanan membawa kode partner Anda.',
      'Coach yang sudah diseleksi datang ke villa. Tamu membayar ke kami.',
      `Anda mendapat ${commissionShare('id')}, dengan laporan sederhana dari tim kami setiap bulan.`,
    ],
    guestsTitle: 'Yang bisa dipesan tamu',
    priceNote: 'Harga Bali, 60 menit. Canggu dan Seminyak sudah termasuk. Ubud dan Sanur +Rp 150.000, Uluwatu +Rp 200.000 biaya perjalanan per kunjungan.',
    calendarTitle: 'Atur minggu untuk villa yang Anda kelola.',
    calendar: 'Contoh: yoga privat Senin, personal training Rabu, dan mat Pilates Jumat pukul 08:00, masing-masing di villa tamu. Tamu memesan paling lambat pukul 18:00 sehari sebelumnya. Koordinator yang memegang jadwalnya.',
    getTitle: 'Yang Anda dapat',
    get: [
      'Koordinator tetap untuk villa Anda',
      'Kartu menu cetak untuk setiap villa',
      'Pemesanan lewat email atau WhatsApp, dengan kode partner Anda',
      'Ritme mingguan di seluruh portofolio',
      'Laporan bulanan sederhana dari tim kami',
      'Pilot 30 hari di 1–2 villa dulu',
    ],
    spaceTitle: 'Ada ruang bersama?',
    space: 'Jika villa punya teras, studio atau ruang tamu besar, kami cek dan rencanakan kelas bersama atau slot rutin.',
    formTitle: 'Bicara dengan kami',
    formLead: `Tidak ada rapat penjualan. Kirim villa, area, dan minggu yang Anda inginkan. Orang sungguhan membalas lewat email ${COMPANY_EMAIL} atau WhatsApp.`,
    consent: 'Saya setuju PersonalFitness.id menghubungi saya lewat WhatsApp dan email tentang program partner.',
    send: 'Kirim permintaan',
    footer: `Ada pertanyaan? Email ${COMPANY_EMAIL} atau WhatsApp ${WHATSAPP_DISPLAY}. Dibalas oleh orang sungguhan.`,
    terms: 'Syarat partner',
    faqs: [
      ['Siapa yang membayar?', 'Tamu membayar ke kami. Kami bayar komisi Anda setiap bulan.'],
      ['Perlu kontrak?', 'Hanya syarat partner singkat kami.'],
      ['Kalau coach berhalangan?', 'Kami langsung kabari tamu dan tawarkan waktu baru atau pengembalian dana penuh.'],
      ['Privasi tamu?', 'Tim Anda hanya menerima jadwal dan villa. Catatan kesehatan tamu hanya untuk coach.'],
      ['Asuransi dan tanggung jawab?', 'Tanyakan kepada kami, kami kirim penjelasan tertulis.'],
      ['Area mana saja?', 'Canggu dan Seminyak termasuk; Ubud, Sanur, Uluwatu dengan biaya perjalanan; area lain bisa ditanyakan.'],
    ] as Array<[string, string]>,
    labels: {
      company: 'Nama perusahaan',
      name: 'Nama Anda',
      role: 'Jabatan',
      whatsapp: 'Nomor WhatsApp',
      email: 'Email',
      villas: 'Jumlah villa',
      areas: 'Lokasi',
      start: 'Villa untuk mulai',
      mats: 'Ada tempat untuk 2 matras yoga?',
      lang: 'Bahasa menu tamu',
    },
  },
}

function PartnerForm({ lang }: { lang: 'en' | 'id' }) {
  const text = copy[lang]
  const [company, setCompany] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [villas, setVillas] = useState('1–5')
  const [areas, setAreas] = useState<string[]>([])
  const [start, setStart] = useState('')
  const [mats, setMats] = useState('not sure')
  const [menuLang, setMenuLang] = useState(lang === 'id' ? 'Bahasa' : 'English')
  const [consent, setConsent] = useState(false)
  const [sending, setSending] = useState(false)
  const [notice, setNotice] = useState('')
  const [noticeTone, setNoticeTone] = useState<'error' | 'success' | ''>('')
  const honeypot = useRef<HTMLInputElement>(null)
  const toggleArea = (area: string) => {
    setAreas((current) => current.includes(area) ? current.filter((item) => item !== area) : [...current, area])
  }
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!areas.length) {
      setNoticeTone('error')
      setNotice(lang === 'id' ? 'Pilih minimal satu lokasi.' : 'Choose at least one area.')
      return
    }
    if (!consent) {
      setNoticeTone('error')
      setNotice(lang === 'id' ? 'Centang persetujuan untuk mengirim.' : 'Tick the consent box to send this.')
      return
    }
    const lines = lang === 'id'
      ? ['Halo PersonalFitness.id, saya mengelola villa dan ingin menu partner.', 'Perusahaan: ' + company.trim(), 'Nama: ' + name.trim(), role.trim() ? 'Jabatan: ' + role.trim() : '', 'WhatsApp: ' + phone.trim(), email.trim() ? 'Email: ' + email.trim() : '', 'Jumlah villa: ' + villas, 'Lokasi: ' + (areas.join(', ') || '—'), start.trim() ? 'Villa mulai: ' + start.trim() : '', 'Ruang 2 matras: ' + mats, 'Bahasa menu: ' + menuLang]
      : ['Hi PersonalFitness.id, I manage villas and want the partner menu.', 'Company: ' + company.trim(), 'Name: ' + name.trim(), role.trim() ? 'Role: ' + role.trim() : '', 'WhatsApp: ' + phone.trim(), email.trim() ? 'Email: ' + email.trim() : '', 'Villas: ' + villas, 'Areas: ' + (areas.join(', ') || '—'), start.trim() ? 'Start with: ' + start.trim() : '', 'Space for 2 yoga mats: ' + mats, 'Guest menu language: ' + menuLang]
    const message = lines.filter(Boolean).join('\n')
    window.open(whatsappDraftUrl(message), '_blank', 'noopener,noreferrer')
    setSending(true)
    setNotice('')
    setNoticeTone('')
    const result = await submitEnquiry({
      kind: 'partner',
      name,
      email,
      phone,
      company,
      message,
      page: window.location.pathname,
      website: honeypot.current?.value || '',
    }, lang)
    setSending(false)
    trackEvent('partner_form_submit', { portfolio_size: villas, areas: areas.join(',') || 'unspecified' })
    if (result.ok) {
      setNoticeTone('success')
      setNotice(lang === 'id' ? `Terkirim. Kami membalas ke ${email.trim()}. Draft WhatsApp juga terbuka.` : `Sent. We will reply to ${email.trim()}. A WhatsApp draft is open as well.`)
      return
    }
    setNoticeTone('error')
    setNotice(result.message)
  }
  return (
    <form className="partner-form" onSubmit={submit}>
      <Field label={text.labels.company}><input value={company} onChange={(event) => setCompany(event.target.value)} required maxLength={120} autoComplete="organization" /></Field>
      <div className="partner-field-pair">
        <Field label={text.labels.name}><input value={name} onChange={(event) => setName(event.target.value)} required maxLength={100} autoComplete="name" /></Field>
        <Field label={text.labels.role}><input value={role} onChange={(event) => setRole(event.target.value)} maxLength={80} /></Field>
      </div>
      <div className="partner-field-pair">
        <Field label={text.labels.whatsapp}><input value={phone} onChange={(event) => setPhone(event.target.value)} required maxLength={30} inputMode="tel" autoComplete="tel" /></Field>
        <Field label={text.labels.email}><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={180} autoComplete="email" required /></Field>
      </div>
      <Field label={text.labels.villas}>
        <select value={villas} onChange={(event) => setVillas(event.target.value)}>
          <option>1–5</option>
          <option>6–24</option>
          <option>25+</option>
        </select>
      </Field>
      <fieldset className="partner-areas">
        <legend>{text.labels.areas}</legend>
        {AREAS.map((area) => (
          <label key={area} className="partner-check">
            <input type="checkbox" checked={areas.includes(area)} onChange={() => toggleArea(area)} />
            {area}
          </label>
        ))}
      </fieldset>
      <Field label={text.labels.start}><input value={start} onChange={(event) => setStart(event.target.value)} maxLength={200} /></Field>
      <div className="partner-field-pair">
        <Field label={text.labels.mats}>
          <select value={mats} onChange={(event) => setMats(event.target.value)}>
            <option value="yes">{lang === 'id' ? 'Ya' : 'Yes'}</option>
            <option value="no">{lang === 'id' ? 'Tidak' : 'No'}</option>
            <option value="not sure">{lang === 'id' ? 'Belum tahu' : 'Not sure'}</option>
          </select>
        </Field>
        <Field label={text.labels.lang}>
          <select value={menuLang} onChange={(event) => setMenuLang(event.target.value)}>
            <option>English</option>
            <option>Bahasa</option>
          </select>
        </Field>
      </div>
      <label className="partner-check partner-consent">
        <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required />
        {text.consent}
      </label>
      <HoneypotField inputRef={honeypot} />
      <button type="submit" className="button button-primary" disabled={sending}>{sending ? (lang === 'id' ? 'Mengirim…' : 'Sending…') : text.send}<ArrowUpRight size={16} /></button>
      <EnquiryNote text={notice} tone={noticeTone} />
    </form>
  )
}

export default function PartnerProgramme({ lang }: { lang: 'en' | 'id' }) {
  const text = copy[lang]
  const commission = exampleCommission()
  const faqs = [...text.faqs]
  if (partner.DEMO_POLICY === 'on' && lang === 'en') faqs.push(['Can our team try it first?', 'Yes. Once you accept the partner terms, we run one free 60-minute session for your team at a pilot villa.'])
  if (partner.DEMO_POLICY === 'on' && lang === 'id') faqs.push(['Boleh tim kami coba dulu?', 'Ya. Setelah syarat partner diterima, kami jalankan satu sesi 60 menit gratis untuk tim Anda di villa percontohan.'])
  const heroMessage = lang === 'id' ? PARTNER_ENQUIRY_MESSAGE_ID : PARTNER_ENQUIRY_MESSAGE
  const groupLine = partner.GROUP_YOGA_RATE_BALI && partner.GROUP_YOGA_MAX_PEOPLE
    ? lang === 'id'
      ? `Punya teras atau studio besar? Kelas villa bersama hingga ${partner.GROUP_YOGA_MAX_PEOPLE} tamu mulai ${formatIdr(partner.GROUP_YOGA_RATE_BALI)}.`
      : `Have a big terrace or studio? Run a shared villa class for up to ${partner.GROUP_YOGA_MAX_PEOPLE} guests from ${formatIdr(partner.GROUP_YOGA_RATE_BALI)}.`
    : null
  return (
    <>
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Villa wellness partner programme',
        serviceType: 'Villa wellness partner programme',
        provider: { '@id': SITE_ORIGIN + '/#business' },
        areaServed: { '@type': 'AdministrativeArea', name: 'Bali' },
        url: SITE_ORIGIN + (lang === 'id' ? '/id/mitra-villa' : '/villa-hotel-partners'),
        offers: publicServices.map((service) => ({
          '@type': 'Offer',
          name: service.title,
          price: String(service.prices.Bali),
          priceCurrency: 'IDR',
        })),
      }} />
      <section className="partner-hero" lang={lang}>
        <div className="shell partner-hero-top">
          <div>
            <Eyebrow>{text.eyebrow}</Eyebrow>
            <h1>{text.h1}</h1>
          </div>
          <div>
            <p className="large-copy">{text.sub}</p>
            <div className="cluster">
              <a className="button button-primary" href="#partner-enquiry">{text.primary}<ArrowUpRight size={16} /></a>
              <a className="button button-outline" href={PARTNER_MENU_PDF} onClick={() => trackEvent('partner_deck_download')}>{text.secondary}</a>
            </div>
            <p className="partner-hero-note"><a href={COMPANY_EMAIL_HREF}>{COMPANY_EMAIL}</a> · <Link to={text.switchTo}>{text.switch}</Link> · <Link to="/partner-terms">{text.terms}</Link></p>
          </div>
        </div>
        <div className="shell">
          <img className="partner-hero-photo" src="/images/editorial/villa-hotel-partners.webp" alt={lang === 'id' ? 'Sesi yoga privat di villa Bali' : 'Private yoga session at a Bali villa'} width="1100" height="619" fetchPriority="high" />
        </div>
      </section>

      <section className="section" lang={lang}>
        <div className="shell partner-process">
          <div>
            <Eyebrow>{text.howTitle}</Eyebrow>
            <h2>{text.howTitle}</h2>
          </div>
          <div>
            {text.steps.map((step, index) => (
              <article key={step}><span>{String(index + 1).padStart(2, '0')}</span><div><p>{step}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light" lang={lang}>
        <div className="shell">
          <Sectionish title={text.guestsTitle} copy={text.priceNote} />
          <div className="partner-service-grid">
            {guestCards.map((card) => (
              <Link to={card.to} className="partner-service-card" key={card.to}>
                <div>
                  <h3>{card.title}</h3>
                  <p>{lang === 'id' ? 'Mulai' : 'From'} {formatIdr(card.bali)} · {card.note}</p>
                  <span className="text-link">{lang === 'id' ? 'Buka sesi' : 'Open session'}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" lang={lang}>
        <div className="shell split-feature">
          <div>
            <Eyebrow>{lang === 'id' ? 'Jadwal yoga' : 'Weekly yoga'}</Eyebrow>
            <h2>{text.calendarTitle}</h2>
            <p className="large-copy">{text.calendar}</p>
            <p><Link to="/resources/how-villa-managers-book-guest-fitness-sessions">{lang === 'id' ? 'Lihat panduan booking tamu untuk pengelola (English).' : 'See the villa manager guest-booking checklist.'}</Link></p>
            {groupLine && <p>{groupLine}</p>}
          </div>
          <ul className="check-list large-list">
            {text.get.map((item) => <li key={item}><Check size={19} />{item}</li>)}
          </ul>
        </div>
      </section>

      {commission != null && (
        <section className="section section-light" lang={lang}>
          <div className="content-shell">
            <Eyebrow>{lang === 'id' ? 'Contoh penghasilan' : 'Earnings example'}</Eyebrow>
            <h2>{lang === 'id' ? 'Contoh saja, bukan jaminan.' : 'Example only, not a guarantee.'}</h2>
            <p>Example only: 8 villas, 70% occupancy, 5-night stays, 1 in 5 stays booking two Rp 900.000 sessions = about {EXAMPLE_MONTHLY_SESSIONS} sessions and {formatIdr(EXAMPLE_MONTHLY_SESSION_VALUE)} a month in sessions. At {partner.COMMISSION_PCT}% you would earn about {formatIdr(commission)} a month.</p>
          </div>
        </section>
      )}

      <section className="section" lang={lang}>
        <div className="shell split-feature">
          <div>
            <Eyebrow>{text.spaceTitle}</Eyebrow>
            <h2>{text.spaceTitle}</h2>
            <p className="large-copy">{text.space}</p>
          </div>
          <p>{text.getTitle}. {text.get.join(' · ')}.</p>
        </div>
      </section>

      <section className="section section-light" id="partner-enquiry" lang={lang}>
        <div className="shell partner-enquiry-grid">
          <div>
            <Eyebrow>{text.formTitle}</Eyebrow>
            <h2>{text.formTitle}</h2>
            <p className="large-copy">{text.formLead}</p>
            <p><TextLink to="/partner-terms">{text.terms}</TextLink></p>
          </div>
          <PartnerForm lang={lang} />
        </div>
      </section>

      <section className="section" lang={lang}>
        <div className="content-shell">
          <Eyebrow>FAQ</Eyebrow>
          <h2>{lang === 'id' ? 'Pertanyaan partner' : 'Partner questions'}</h2>
          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details className="faq-item" key={q}>
                <summary><span>{q}</span></summary>
                <div className="faq-body"><p>{q === 'Do we need a contract?' || q === 'Perlu kontrak?' ? <>{a} <Link to="/partner-terms">{text.terms}</Link>.</> : a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta" lang={lang}>
        <div className="shell final-cta-inner">
          <h2>{text.footer}</h2>
          <div className="cluster">
            <a className="button button-primary" href="#partner-enquiry">{text.primary}<ArrowUpRight size={16} /></a>
            <a className="button button-outline-light" href={whatsappDraftUrl(heroMessage)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp('partner_footer')}>WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  )
}

function Sectionish({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="section-title">
      <div>
        <Eyebrow>Menu</Eyebrow>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
    </div>
  )
}
