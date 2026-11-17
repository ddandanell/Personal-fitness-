import { responsiveSource } from '@/components/EditorialPhoto'
import { ArrowUpRight, Check, MapPin, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import { Eyebrow, ParallaxImage, SectionTitle, TextLink } from '@/components/Primitives'
import QuoteEstimator from '@/components/QuoteEstimator'
import WhyTheRate from '@/components/WhyTheRate'
import { COMPANY_EMAIL, COMPANY_EMAIL_HREF } from '@/data/company'
import { publicServices, sessionPhoto } from '@/data/publicOffer'
import { blogPosts } from '@/data/blog'
import { faqs } from '@/data/content'
import StructuredData from '@/components/StructuredData'
import { faqJsonLd } from '@/lib/schema'
import { formatIdr } from '@/lib/money'

const steps = [
  ['01', 'Tell us the villas', 'Send the areas, how many villas, and the week you want covered. A coordinator takes it from there.'],
  ['02', 'See the guest price', 'Published rates, extra people, travel and programme savings sit on the estimator. The written quote is what the guest pays.'],
  ['03', 'Guests book simply', `They email ${COMPANY_EMAIL} or message WhatsApp. You earn a commission. Nothing is booked until the quote is accepted.`],
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
            <Eyebrow light>For villa managers · Bali · Jakarta</Eyebrow>
            <h1>Offer a personal trainer at home in Bali and Jakarta to your villa guests</h1>
            <p className="hero-lede">PersonalFitness.id works with villa managers, rental agencies and hotels. Guests can book private training, yoga, mat Pilates, mobility, boxing or meditation in the villa. A coordinator sets the week, a vetted professional arrives, and the guest pays us. You earn a commission.</p>
            <div className="cluster">
              <Link to="/contact" className="button button-primary">Offer this to your guests<ArrowUpRight size={17} /></Link>
              <Link to="/villa-hotel-partners" className="button button-outline-light">Become a villa partner</Link>
              <a href={COMPANY_EMAIL_HREF} className="button button-outline-light">Talk to us</a>
            </div>
            <p className="hero-micro"><ShieldCheck size={16} />Clear guest prices. A written quote before anyone pays.</p>
          </div>
          <ParallaxImage src="/images/editorial/home.webp" alt="Instructor coaching an adult client through a private villa workout" eager className="hero-session-image" />
        </div>
        <div className="shell hero-facts">
          <div><strong>{formatIdr(900_000)}</strong><span>Starting price · Bali personal training, 60 minutes, in-zone.</span></div>
          <div><strong>{formatIdr(950_000)}</strong><span>Starting price · Jakarta personal training, 60 minutes, in-zone.</span></div>
          <div><strong>Six sessions</strong><span>Training, yoga, Pilates, mobility, boxing and meditation.</span></div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionTitle eyebrow="Guest menu" title="Six private sessions you can offer guests." copy="Training, yoga, Pilates, mobility, boxing and meditation, at the villa. Yoga and meditation include up to two people. Boxing is one person. Extra people, 90 minutes and outer-zone travel sit on top of the starting price." action={<TextLink to="/pricing">See session prices</TextLink>} />
          <div className="service-card-grid">
            {publicServices.map((service, index) => (
              <Link to={`/${service.slug}`} className="service-card" key={service.slug}>
                <div className="service-card-image"><img src={sessionPhoto(service.slug, service.image)} srcSet={responsiveSource(sessionPhoto(service.slug, service.image))} sizes="(max-width: 700px) 90vw, 30vw" alt={service.imageAlt} width="800" height="870" loading="lazy" decoding="async" /></div>
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
            <Eyebrow>For the portfolio</Eyebrow>
            <h2>A weekly rhythm across many villas, handled by a coordinator.</h2>
            <p className="large-copy">Set different sessions on different days: yoga on Monday, personal training on Wednesday, Pilates on Friday, each in that guest’s villa. Your team does not run the diary. A coordinator matches a vetted professional, confirms access, and sends the written price.</p>
            <p>Guests pay the published rate. You earn a commission on paid sessions, and our team sends a simple statement. Read <TextLink to="/villa-hotel-partners">the villa partner programme</TextLink>, <TextLink to="/professional-standards">how professionals are matched</TextLink> or <TextLink to="/id/mitra-villa">Bahasa Indonesia</TextLink>.</p>
          </div>
          <ul className="check-list large-list">
            {['A named coordinator for your villas', 'Vetted professional named on the written quote', 'Guests book by email or WhatsApp', 'Recurring weeks across the properties you manage', `Email ${COMPANY_EMAIL} or WhatsApp +62 811-3803-488`].map((item) => (
              <li key={item}><Check size={19} />{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-dark home-journey">
        <div className="shell">
          <SectionTitle eyebrow="How it works" title="From your villas to a confirmed guest hour." />
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
            <h2>Cover the Bali and Jakarta clusters your villas use.</h2>
          </div>
          <div className="statement-copy">
            <p className="large-copy">Bali in-zone is Canggu and Seminyak. Jakarta in-zone is South and Central Jakarta, including Kemang, Senopati, Menteng and Thamrin.</p>
            <p>Ubud and Sanur add {formatIdr(150_000)} per visit. Uluwatu adds {formatIdr(200_000)}. North, West and East Jakarta neighbourhoods are quoted after a timing check. See <TextLink to="/service-areas">travel and clusters</TextLink>, <TextLink to="/jakarta">Jakarta locations</TextLink>, <TextLink to="/jakarta/kemang">Kemang</TextLink>, <TextLink to="/jakarta/menteng">Menteng</TextLink>, <TextLink to="/resources/personal-trainer-in-canggu-villa-access-and-in-zone-rates">personal trainer in Canggu</TextLink> or <TextLink to="/bali/seminyak">Seminyak</TextLink>, and <TextLink to="/pricing">every starting rate</TextLink>. We work in these areas so your coach arrives on time.</p>
            <div className="cluster">
              <Link to="/bali" className="button button-dark">Bali<MapPin size={16} /></Link>
              <Link to="/jakarta" className="button button-outline">Jakarta<MapPin size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Guest prices</Eyebrow><h2>See a starting price, then talk to us.</h2><p>The estimator is for the guest rate. Email the week you want, or continue on WhatsApp. Nothing is booked until the written quote is accepted.</p></div></div>
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
            <h2>The starting price, the extras, the cancellation line.</h2>
          </div>
          <div>
            <ul className="check-list large-list">
              {['City starting price for the session and duration', 'Extra people and outer-zone travel if they apply', 'Programme count and the reduction', 'A written quote before payment'].map((item) => (
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

      <section className="section final-cta">
        <div className="shell final-cta-inner">
          <Eyebrow light>For villa managers</Eyebrow>
          <h2>Offer private fitness<br />to every guest villa.</h2>
          <p>Tell us how many villas, the areas and the week you have in mind. A coordinator replies.</p>
          <div className="cluster">
            <Link to="/contact" className="button button-primary">Offer this to your guests<ArrowUpRight size={17} /></Link>
            <a href={COMPANY_EMAIL_HREF} className="button button-outline-light">Talk to us</a>
          </div>
        </div>
      </section>
    </>
  )
}
