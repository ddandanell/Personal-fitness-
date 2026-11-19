import { SESSION_ANCHOR, programmes } from '@/data/catalog'
import { PolicySummary } from '@/components/PolicyLines'
import { responsiveSource } from '@/components/EditorialPhoto'
import { ArrowUpRight, Check, MapPin, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import { Eyebrow, IntroText, ParallaxImage, SectionTitle, TextLink } from '@/components/Primitives'
import QuoteEstimator from '@/components/QuoteEstimator'
import WhyTheRate from '@/components/WhyTheRate'
import { COMPANY_EMAIL, COMPANY_EMAIL_HREF } from '@/data/company'
import { publicServices, sessionPhoto } from '@/data/publicOffer'
import { blogPosts } from '@/data/blog'
import { faqs } from '@/data/content'
import StructuredData from '@/components/StructuredData'
import { faqJsonLd } from '@/lib/schema'
import { formatIdr } from '@/lib/money'
import { seoOverride } from '@/data/seoOverrides'

const HOME_SEO = seoOverride('/')

const steps = [
  ['01', 'Check availability', 'Send the city, area, session and a two-hour window. We confirm whether that visit is available, as supply allows.'],
  ['02', 'See the starting price', 'Published rates, a second guest and session packs sit on the estimator. The written quote is the payable total.'],
  ['03', 'Continue in WhatsApp', `The draft carries the numbers. Email ${COMPANY_EMAIL} if you prefer. Nothing is booked until you accept the written quote.`],
]

const homeFaqs = [
  faqs.find((pair) => pair[0].includes('book a personal trainer')),
  faqs.find((pair) => pair[0] === 'How much does a session cost?'),
  faqs.find((pair) => pair[0].includes('more expensive')),
  faqs.find((pair) => pair[0].includes('enquiry reserve')),
  faqs.find((pair) => pair[0].includes('Bali areas')),
  faqs.find((pair) => pair[0].includes('boxing at a villa')),
  faqs.find((pair) => pair[0].includes('guided meditation a therapy')),
  faqs.find((pair) => pair[0].includes('Canggu in-zone')),
].filter((pair): pair is (typeof faqs)[number] => Boolean(pair))

export default function Home() {
  return (
    <>
      <section className="sales-hero">
        <div className="shell sales-hero-grid">
          <div className="sales-hero-copy">
            <Eyebrow light>Bali · Jakarta</Eyebrow>
            <h1>{HOME_SEO?.h1 || 'Personal trainer at your villa or home in Bali and Jakarta'}</h1>
            <p className="hero-lede">{HOME_SEO?.intro ? <IntroText text={HOME_SEO.intro} /> : 'Private strength training, yoga, Pilates and more, brought to villas, homes and hotels in Bali and Jakarta. Book on WhatsApp and get a written quote.'}</p>
            <div className="cluster">
              <Link to="/contact" className="button button-primary">Check availability<ArrowUpRight size={17} /></Link>
              <Link to="/pricing" className="button button-outline-light">See session prices</Link>
              <Link to="/bali/personal-training" className="button button-outline-light">Bali sessions</Link>
            </div>
            <p className="hero-micro"><ShieldCheck size={16} />You get a clear written quote before you pay.</p>
          </div>
          <ParallaxImage src="/images/editorial/home.webp" alt="Instructor coaching an adult client through a private villa workout" eager className="hero-session-image" />
        </div>
        <div className="shell hero-facts">
          <div><strong>{formatIdr(SESSION_ANCHOR)}</strong><span>Private strength training, 60 minutes, one guest.</span></div>
          <div><strong>{formatIdr(programmes.find(pack => pack.sessions === 5)!.perSession)}</strong><span>5-session pack, per session. Save {formatIdr((SESSION_ANCHOR - programmes.find(pack => pack.sessions === 5)!.perSession) * 5)}.</span></div>
          <div><strong>Your place</strong><span>Villa, home or hotel. A second guest is Rp 250.000 when the rate is for one person.</span></div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionTitle eyebrow="Sessions" title="Private sessions at your villa, home or hotel." copy="Choose strength training, yoga, mat Pilates, bodywork and recovery, dance fitness, mobility coaching, boxing fitness or guided meditation. A second guest adds Rp 250.000 per session when the rate is for one person. Yoga and meditation already include a pair. Boxing is for one guest." action={<TextLink to="/pricing">See session prices</TextLink>} />
          <div className="service-card-grid">
            {publicServices.map((service, index) => (
              <Link to={`/${service.slug}`} className="service-card" key={service.slug}>
                <div className="service-card-image"><img src={sessionPhoto(service.slug, service.image)} srcSet={responsiveSource(sessionPhoto(service.slug, service.image))} sizes="(max-width: 700px) 90vw, 30vw" alt={service.imageAlt} width="800" height="870" loading="lazy" decoding="async" /></div><p className="photo-policy-caption">Photos are illustrative. The professional for your hour is named on the quote.</p>
                <span className="service-index">0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>Starting price · Bali {formatIdr(service.prices.Bali!)} · Jakarta {formatIdr(service.prices.Jakarta!)}</p>
                <span className="text-link">Open {service.title.toLowerCase()}<ArrowUpRight size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="shell split-feature">
          <div>
            <Eyebrow>What the hour is for</Eyebrow>
            <h2>You train at your villa, home or hotel, with an instructor.</h2>
            <p className="large-copy">The hour is private: strength training, yoga, Pilates, mobility, pad work, bodywork, dance fitness or a quiet sit. You leave with a completed session, not a class pack or a clinical diagnosis.</p>
            <p>The instructor is named on the written quote. A backup is named where available. Read <TextLink to="/professional-standards">how we match instructors</TextLink> or <TextLink to="/id">Bahasa Indonesia</TextLink>.</p>
          </div>
          <ul className="check-list large-list">
            {['An instructor named on the written quote', 'A backup named where available', 'You get the price in writing before you pay', `WhatsApp +62 811-3803-488 and ${COMPANY_EMAIL}`].map((item) => (
              <li key={item}><Check size={19} />{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-dark home-journey">
        <div className="shell">
          <SectionTitle eyebrow="How it works" title="From your first message to a session at your door." />
          <div className="journey-grid">
            {steps.map(([number, title, copy]) => (
              <div className="journey-step" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>
            ))}
          </div>
          <div className="section-cta"><Link to="/how-it-works" className="button button-light">Read the full sequence<ArrowUpRight size={16} /></Link></div>
        </div>
      </section>

      <section className="section">
        <div className="shell split-feature">
          <div>
            <Eyebrow>Areas</Eyebrow>
            <h2>Find your Bali or Jakarta location.</h2>
          </div>
          <div className="statement-copy">
            <p className="large-copy">Bali travel is included in Canggu, Seminyak, Sanur, Ubud and Uluwatu. Jakarta in-zone is South and Central Jakarta, including Kemang, Senopati, Menteng and Thamrin.</p>
            <p>Travel is included across Canggu, Seminyak, Sanur, Ubud and Uluwatu. Other areas on request. North, West and East Jakarta neighbourhoods are quoted after a timing check. See <TextLink to="/service-areas">travel and clusters</TextLink>, <TextLink to="/jakarta">Jakarta locations</TextLink>, <TextLink to="/jakarta/kemang">Kemang</TextLink>, <TextLink to="/jakarta/menteng">Menteng</TextLink>, <TextLink to="/resources/personal-trainer-in-canggu-villa-access-and-in-zone-rates">personal trainer in Canggu</TextLink> or <TextLink to="/bali/seminyak">Seminyak</TextLink>, and <TextLink to="/pricing">every starting rate</TextLink>. Sessions are subject to instructor availability and location confirmation.</p>
            <div className="cluster">
              <Link to="/bali" className="button button-dark">Bali<MapPin size={16} /></Link>
              <Link to="/jakarta" className="button button-outline">Jakarta<MapPin size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Your price</Eyebrow><h2>See a starting price, then send the request.</h2><p>Use the estimator for your session. Email it or continue on WhatsApp. Nothing is booked until you accept the written quote.</p></div></div>
          <QuoteEstimator />
        </div>
      </section>

      <WhyTheRate />

      <section className="section">
        <StructuredData data={faqJsonLd(homeFaqs)} />
        <div className="content-shell faq-list">
          <div className="section-title"><div><Eyebrow>Questions</Eyebrow><h2>Prices, areas and confirmation.</h2></div></div>
          {homeFaqs.map(([q, a]) => (
            <details className="faq-item" key={q}>
              <summary><span>{q}</span></summary>
              <div className="faq-body"><p>{a}</p></div>
            </details>
          ))}
          <TextLink to="/faq">All questions</TextLink>
        </div>
      </section>

      <section className="section quote-feature">
        <div className="shell split-feature">
          <div>
            <Eyebrow>Before you pay</Eyebrow>
            <h2>The starting price, the extras, the cancellation line.</h2><PolicySummary />
          </div>
          <div>
            <ul className="check-list large-list">
              {['City starting price for the session and duration', 'Eligible extra guests and any separately agreed external costs', 'Programme count and the reduction', 'A written quote before payment'].map((item) => (
                <li key={item}><Check size={19} />{item}</li>
              ))}
            </ul>
            <TextLink to="/pricing">See session prices</TextLink>
          </div>
        </div>
      </section>

      <section className="section-compact section-light">
        <div className="shell">
          <SectionTitle eyebrow="Guides" title="How a villa or home session actually works." copy="Start with Seminyak villas, extra-people pricing, Jakarta yoga or the WhatsApp template, then send the window." action={<TextLink to="/resources">All guides</TextLink>} />
          <div className="resource-grid">
            {blogPosts.slice(-4).reverse().map((post) => (
              <Link to={'/resources/' + post.slug} className="resource-card" key={post.slug}>
                <p className="eyebrow">{post.city} · {post.service}</p>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <span className="text-link">Read the guide<ArrowUpRight size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-compact">
        <div className="shell split-feature">
          <div>
            <Eyebrow>Villa managers</Eyebrow>
            <h2>Manage villas? There is a separate partner page.</h2>
            <p>The sessions on this site are for the person in the room. Villa managers and hospitality teams can read the partner terms on their own page.</p>
          </div>
          <div>
            <Link to="/villa-hotel-partners" className="button button-outline">For villa managers<ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="shell final-cta-inner">
          <Eyebrow light>Book a session</Eyebrow>
          <h2>Check availability<br />for your next hour.</h2>
          <p>Send the city, the area and a two-hour window. A coordinator replies, as supply allows.</p>
          <div className="cluster">
            <Link to="/contact" className="button button-primary">Check availability<ArrowUpRight size={17} /></Link>
            <a href={COMPANY_EMAIL_HREF} className="button button-outline-light">Email us</a>
          </div>
        </div>
      </section>
    </>
  )
}
