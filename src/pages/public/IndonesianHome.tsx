import { ArrowUpRight, Check, MapPin } from 'lucide-react'
import { Link } from 'react-router'
import { Eyebrow, SectionTitle, TextLink } from '@/components/Primitives'
import QuoteEstimator from '@/components/QuoteEstimator'
import StructuredData from '@/components/StructuredData'
import { faqJsonLd } from '@/lib/schema'
import { formatIdr } from '@/lib/money'
import { WHATSAPP_DISPLAY } from '@/lib/whatsapp'
import { publicServices } from '@/data/publicOffer'

const faqs = [
  ['Apa itu personal trainer datang ke rumah?', 'PersonalFitness.id mengirim pelatih ke villa atau rumah Anda di klaster Bali dan Jakarta yang kami terbitkan. Sesi berlangsung di ruang Anda, bukan di studio walk-in Denpasar.'],
  ['Berapa harganya?', 'Harga mulai personal training Bali Rp 900.000 dan Jakarta Rp 950.000 untuk 60 menit di zona. Yoga dan meditasi termasuk dua orang. Boxing satu orang. Perjalanan ke Ubud atau Sanur Rp 150.000 per kunjungan, Uluwatu Rp 200.000. Total ada di kutipan tertulis.'],
  ['Mengapa lebih mahal dari pelatih lepas?', 'Ini layanan terkelola: koordinator mencocokkan sesi, lokasi dan jam, lalu menamai profesional di kutipan. Cek akses, cadangan, dan total tertulis masuk ke harga. Tarif WhatsApp lepas tanpa kutipan adalah produk lain.'],
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
            <p className="hero-lede">Pelatih privat ke villa atau rumah Anda. Personal training mulai {formatIdr(900_000)} di Bali, plus yoga, mat Pilates, mobilitas, boxing fitness, dan meditasi terpandu di klaster yang kami terbitkan.</p>
            <div className="cluster">
              <Link to="/contact" className="button button-primary">Cek ketersediaan<ArrowUpRight size={17} /></Link>
              <Link to="/pricing" className="button button-outline-light">Lihat harga sesi</Link>
              <Link to="/" className="button button-outline-light">English</Link>
            </div>
            <p className="hero-micro">Koordinator mencocokkan profesional, lalu Anda menerima kutipan tertulis di WhatsApp {WHATSAPP_DISPLAY}.</p>
          </div>
          <div className="hero-session-image">
            <img src="/images/editorial/home.webp" srcSet="/images/editorial/home-640.webp 640w, /images/editorial/home.webp 1440w" sizes="(max-width: 700px) 92vw, 1200px" width="1440" height="960" alt="Pelatih privat mendampingi klien dewasa di villa" decoding="async" />
          </div>
        </div>
        <div className="shell hero-facts">
          <div><strong>{formatIdr(900_000)}</strong><span>Mulai · personal training Bali, 60 menit, dalam zona.</span></div>
          <div><strong>{formatIdr(950_000)}</strong><span>Mulai · personal training Jakarta, 60 menit, dalam zona.</span></div>
          <div><strong>Enam sesi</strong><span>Training, yoga, Pilates, mobilitas, boxing, meditasi.</span></div>
        </div>
      </section>

      <section className="section" lang="id">
        <div className="shell split-feature">
          <div>
            <Eyebrow>Yang Anda dapat</Eyebrow>
            <h2>Satu jam privat di rumah, dengan nama profesional di kutipan.</h2>
            <p className="large-copy">Anda melatih di ruang yang sudah Anda miliki. Kami tidak menjual kelas umum, paket gym, atau direktori pelatih untuk dipilih dari foto. Setelah pembayaran terverifikasi, konfirmasi memuat nama orang yang datang, jendela kedatangan, dan catatan akses.</p>
          </div>
          <ul className="check-list large-list">
            {['Sesi privat di villa atau rumah, bukan studio walk-in', 'Koordinator mencocokkan sesi, klaster, dan jam', 'Profesional disebut di kutipan, bukan di katalog publik', 'Cadangan jika stok berubah sebelum konfirmasi', 'Kantor Denpasar adalah kantor, bukan tempat latihan'].map((item) => (
              <li key={item}><Check size={19} />{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-light" lang="id">
        <div className="shell">
          <SectionTitle eyebrow="Sesi" title="Enam format yang bisa dikutip hari ini." copy="Yoga dan meditasi termasuk dua orang jika lantai muat. Boxing satu orang. Orang tambahan, 90 menit, dan perjalanan luar zona ditambahkan pada harga mulai." action={<TextLink to="/services">Semua sesi</TextLink>} />
          <div className="service-card-grid">
            {publicServices.map((service) => (
              <Link to={`/${service.slug}`} className="service-card" key={service.slug}>
                <span className="eyebrow">{service.title}</span>
                <h3>Bali {formatIdr(service.prices.Bali!)}</h3>
                <p>Jakarta {formatIdr(service.prices.Jakarta!)} · {service.durationMin} menit</p>
                <span className="text-link">Buka {service.title.toLowerCase()}</span>
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
            <p className="large-copy">Bali dalam zona: Canggu dan Seminyak. Jakarta dalam zona: Jakarta Selatan dan Jakarta Pusat, termasuk Kemang, Senopati, Menteng, dan Thamrin.</p>
            <p>Ubud dan Sanur menambah {formatIdr(150_000)} per kunjungan. Uluwatu {formatIdr(200_000)}. Utara, Barat, Timur Jakarta, dan PIK dikutip setelah cek waktu. Kantor di Jl. Tukad Barito Timur III No.16, Panjer, adalah administrasi, bukan studio.</p>
            <div className="cluster">
              <Link to="/bali" className="button button-dark">Bali<MapPin size={16} /></Link>
              <Link to="/jakarta" className="button button-outline">Jakarta<MapPin size={16} /></Link>
            </div>
          </div>
          <ul className="check-list large-list">
            {['Kirim kota, area, sesi, dan jendela dua jam', 'Kutipan tertulis sebelum bayar', 'Bayar hanya di tautan merchant', 'Tidak ada sesi perkenalan gratis'].map((item) => (
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

      <section className="section final-cta" lang="id">
        <div className="shell final-cta-inner">
          <Eyebrow light>Mulai dari ketersediaan</Eyebrow>
          <h2>Sesi kebugaran privat<br />di villa atau rumah Anda.</h2>
          <p>Kirim kota, area, dan jendela jam. Kami cek apakah jam itu bisa dijalankan, lalu mengirim kutipan.</p>
          <div className="cluster">
            <Link to="/contact" className="button button-primary">Cek ketersediaan<ArrowUpRight size={17} /></Link>
            <Link to="/" className="button button-outline-light">English homepage</Link>
          </div>
        </div>
      </section>
    </>
  )
}
