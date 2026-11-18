import { SESSION_ANCHOR, programmes } from '@/data/catalog'
import { ServiceRequestBadge } from '@/components/PolicyLines'
import { serviceNameId } from '@/data/offerCopy'
import { ArrowUpRight, Check, MapPin } from 'lucide-react'
import { Link } from 'react-router'
import { Eyebrow, SectionTitle, TextLink } from '@/components/Primitives'
import QuoteEstimator from '@/components/QuoteEstimator'
import StructuredData from '@/components/StructuredData'
import { faqJsonLd } from '@/lib/schema'
import { formatIdr } from '@/lib/money'
import { COMPANY_EMAIL, COMPANY_EMAIL_HREF } from '@/data/company'
import { WHATSAPP_DISPLAY } from '@/lib/whatsapp'
import { publicServices } from '@/data/publicOffer'

const faqs = [
  ['Apa itu personal trainer datang ke rumah?', 'PersonalFitness.id mengirim pelatih ke villa atau rumah Anda di klaster Bali dan Jakarta yang kami terbitkan. Sesi berlangsung di ruang Anda, bukan di studio walk-in Denpasar.'],
  ['Berapa harganya?', 'Harga mulai private strength training Rp 1.300.000 untuk 60 menit di zona. Yoga dan meditasi termasuk dua orang. Boxing satu orang. Perjalanan sudah termasuk di Canggu, Seminyak, Sanur, Ubud, dan Uluwatu. Area lain atas permintaan. Total ada di kutipan tertulis.'],
  ['Mengapa lebih mahal dari pelatih lepas?', 'Ini layanan terkelola: koordinator mencocokkan sesi, lokasi dan jam, lalu menamai instruktur di kutipan. Cadangan disebut jika tersedia. Tarif WhatsApp lepas tanpa kutipan adalah produk lain.'],
  ['Apakah ada sesi perkenalan gratis?', 'Tidak. Kunjungan pertama memakai tarif terbit. Kami tidak menjual intro gratis yang kemudian ditarik di chat.'],
  ['Wilayah Jakarta mana yang masuk zona?', 'Jakarta Selatan (Kemang, Senopati, SCBD, Kebayoran, Cilandak, Pondok Indah, Kuningan) dan Jakarta Pusat (Menteng, Gondangdia, Thamrin) masuk zona. Utara, Barat, Timur, dan PIK dikutip setelah cek stok dan perjalanan.'],
] as const

export default function IndonesianHome() {
  return (
    <>
      <StructuredData data={faqJsonLd([...faqs])} />
      <section className="sales-hero" lang="id">
        <div className="shell sales-hero-grid">
          <div className="sales-hero-copy">
            <Eyebrow light>Bali · Jakarta</Eyebrow>
            <h1>Personal trainer datang ke rumah di Bali dan Jakarta</h1>
            <p className="hero-lede">Instruktur yang sudah diseleksi datang ke villa, rumah, atau hotel Anda untuk private strength training, yoga, Pilates, mobilitas, boxing, bodywork, atau meditasi. Sesi tergantung ketersediaan instruktur dan konfirmasi lokasi.</p>
            <div className="cluster">
              <Link to="/contact" className="button button-primary">Cek ketersediaan<ArrowUpRight size={17} /></Link>
              <Link to="/pricing" className="button button-outline-light">Lihat harga</Link>
            </div>
            <p className="hero-micro">Kutipan tertulis sebelum Anda bayar. WhatsApp {WHATSAPP_DISPLAY}.</p>
          </div>
          <div className="hero-session-image">
            <img src="/images/editorial/home.webp" srcSet="/images/editorial/home-640.webp 640w, /images/editorial/home.webp 1440w" sizes="(max-width: 700px) 92vw, 1200px" width="1440" height="960" alt="Pelatih privat mendampingi klien dewasa di villa" decoding="async" />
          </div>
        </div>
        <div className="shell hero-facts">
          <div><strong>{formatIdr(SESSION_ANCHOR)}</strong><span>Private strength training, 60 menit, satu tamu.</span></div>
          <div><strong>{formatIdr(programmes.find(pack => pack.sessions === 5)!.perSession)}</strong><span>Paket 5 sesi, per sesi.</span></div>
          <div><strong>Delapan pilihan</strong><span>Latihan kekuatan, yoga, dan Pilates. Mobilitas, boxing, bodywork, dance, dan meditasi atas permintaan.</span></div>
        </div>
      </section>

      <section className="section" lang="id">
        <div className="shell split-feature">
          <div>
            <Eyebrow>Untuk jam Anda</Eyebrow>
            <h2>Anda berlatih di villa, rumah, atau hotel, dengan instruktur yang sudah diseleksi.</h2>
            <p className="large-copy">Jamnya privat: strength training, yoga, Pilates, mobilitas, boxing, bodywork, dance fitness, atau meditasi. Anda mendapat sesi yang selesai, bukan paket kelas atau diagnosis klinis.</p>
            <p>Instruktur disebut di kutipan tertulis. Cadangan disebut jika tersedia.</p>
          </div>
          <ul className="check-list large-list">
            {['Instruktur yang sudah diseleksi, namanya di kutipan', 'Cadangan disebut jika tersedia', 'Harga tertulis sebelum Anda bayar', `WhatsApp ${WHATSAPP_DISPLAY} dan ${COMPANY_EMAIL}`, 'Kantor Denpasar adalah administrasi, bukan studio'].map((item) => (
              <li key={item}><Check size={19} />{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-light" lang="id">
        <div className="shell">
          <SectionTitle eyebrow="Sesi" title="Sesi privat di villa, rumah, atau hotel Anda." copy="Latihan kekuatan, yoga, dan Pilates, serta mobilitas, boxing, bodywork, dance fitness, dan meditasi atas permintaan. Yoga dan meditasi termasuk dua orang jika lantai muat. Orang kedua menambah Rp 250.000 per sesi jika tarif untuk satu orang. Boxing hanya untuk satu orang." action={<TextLink to="/services">Semua sesi</TextLink>} />
          <div className="service-card-grid">
            {publicServices.map((service) => (
              <Link to={`/${service.slug}`} className="service-card" key={service.slug}>
                <span className="eyebrow">{serviceNameId(service.slug, service.title)}</span><ServiceRequestBadge slug={service.slug} lang="id" />
                <h3>Bali {formatIdr(service.prices.Bali!)}</h3>
                <p>Jakarta {formatIdr(service.prices.Jakarta!)} · {service.durationMin} menit</p>
                <span className="text-link">Buka {serviceNameId(service.slug, service.title).toLowerCase()}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" lang="id">
        <div className="shell split-feature">
          <div>
            <Eyebrow>Lokasi</Eyebrow>
            <h2>Klaster yang kami terbitkan, bukan seluruh pulau.</h2>
            <p className="large-copy">Perjalanan Bali termasuk di Canggu, Seminyak, Sanur, Ubud, dan Uluwatu. Jakarta dalam zona: Jakarta Selatan dan Jakarta Pusat, termasuk Kemang, Senopati, Menteng, dan Thamrin.</p>
            <p>Perjalanan sudah termasuk di Canggu, Seminyak, Sanur, Ubud, dan Uluwatu. Area lain atas permintaan. Utara, Barat, Timur Jakarta, dan PIK dikutip setelah cek waktu. Kantor di Jl. Tukad Barito Timur III No.16, Panjer, adalah administrasi, bukan studio.</p>
            <div className="cluster">
              <Link to="/bali" className="button button-dark">Bali<MapPin size={16} /></Link>
              <Link to="/jakarta" className="button button-outline">Jakarta<MapPin size={16} /></Link>
            </div>
          </div>
          <ul className="check-list large-list">
            {['Kirim kota, area, sesi, dan jendela dua jam', 'Kutipan tertulis sebelum bayar', 'Bayar sesuai detail pembayaran di kutipan tertulis', 'Tidak ada sesi perkenalan gratis'].map((item) => (
              <li key={item}><Check size={19} />{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-light" lang="id">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Perkiraan</Eyebrow><h2>Hitung harga mulai, lalu lanjut di WhatsApp.</h2></div></div>
          <QuoteEstimator />
        </div>
      </section>

      <section className="section" lang="id">
        <div className="content-shell faq-list">
          <div className="section-title"><div><Eyebrow>Pertanyaan</Eyebrow><h2>Harga, zona, dan konfirmasi.</h2></div></div>
          {faqs.map(([question, answer]) => (
            <details className="faq-item" key={question}>
              <summary><span>{question}</span></summary>
              <div className="faq-body"><p>{answer}</p></div>
            </details>
          ))}
          <TextLink to="/faq">Pertanyaan dalam bahasa Inggris</TextLink>
        </div>
      </section>

      <section className="section-compact" lang="id">
        <div className="shell split-feature">
          <div>
            <Eyebrow>Pengelola villa</Eyebrow>
            <h2>Mengelola villa? Ada halaman partner terpisah.</h2>
            <p>Sesi di situs ini untuk orang yang berlatih. Pengelola villa dapat membaca syarat partner di halaman mereka sendiri.</p>
          </div>
          <div>
            <Link to="/id/mitra-villa" className="button button-outline">Untuk pengelola villa<ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="section final-cta" lang="id">
        <div className="shell final-cta-inner">
          <Eyebrow light>Pesan sesi</Eyebrow>
          <h2>Cek ketersediaan<br />untuk jam Anda.</h2>
          <p>Kirim kota, area, dan jendela dua jam. Koordinator membalas, tergantung ketersediaan.</p>
          <div className="cluster">
            <Link to="/contact" className="button button-primary">Cek ketersediaan<ArrowUpRight size={17} /></Link>
            <a href={COMPANY_EMAIL_HREF} className="button button-outline-light">Email kami</a>
          </div>
        </div>
      </section>
    </>
  )
}
