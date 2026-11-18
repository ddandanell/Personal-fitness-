import { PolicySummary } from '@/components/PolicyLines'
import { responsiveSource } from '@/components/EditorialPhoto'
import { ArrowUpRight, Check, Plus, ShieldCheck } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Eyebrow, PageIntro, ParallaxImage, SectionTitle } from '@/components/Primitives'
import { CtaBand, LocationClusters, ProgrammeGrid, Prose } from '@/components/SiteBlocks'
import QuoteEstimator from '@/components/QuoteEstimator'
import WhyTheRate from '@/components/WhyTheRate'
import WellnessSchedule from '@/components/WellnessSchedule'
import { DirectoryPlanningGuide } from '@/components/DirectoryPlanningGuide'
import { SESSION_ANCHOR, programmes, packSessionRate, areas, cancellationRules, extraPersonFee } from '@/data/catalog'
import { CORE_SERVICE_SLUGS, publicServices, sessionPhoto } from '@/data/publicOffer'

const orderedServices = CORE_SERVICE_SLUGS.map((slug) => publicServices.find((item) => item.slug === slug)).filter((item): item is (typeof publicServices)[number] => Boolean(item))
import { COMPANY_EMAIL, COMPANY_EMAIL_HREF } from '@/data/company'
import { faqs, getResource, resources } from '@/data/content'
import StructuredData from '@/components/StructuredData'
import { collectionJsonLd, contactPageJsonLd, faqJsonLd } from '@/lib/schema'
import { formatIdr } from '@/lib/money'
import { estimateQuote } from '@/lib/quote'
import { trackWhatsApp } from '@/lib/analytics'
import { WHATSAPP_DISPLAY, whatsappDraftUrl } from '@/lib/whatsapp'
import { partner } from '@/config/partner'
import NotFound from './NotFound'

const ratePhotos: Record<string, string> = {
  'personal-training': '/images/editorial/core-personal-training.webp',
  'private-yoga': '/images/editorial/core-private-yoga.webp',
  'mat-pilates': '/images/editorial/core-mat-pilates.webp',
  'boxing-fitness': '/images/editorial/core-boxing-fitness.webp',
  'guided-meditation': '/images/editorial/core-guided-meditation.webp',
  'mobility-coaching': '/images/locations/mobility-coaching.webp',
  'bodywork-recovery': '/images/editorial/core-bodywork-recovery.webp',
  'zumba-dance-fitness': '/images/editorial/core-zumba-dance-fitness.webp',
}

const priceExamples = [
  {
    place: 'Canggu',
    title: 'Private Strength Training',
    note: '60 minutes · 1 person · in-zone travel included',
    quote: estimateQuote({ service: 'personal-training', city: 'Bali', area: 'canggu', durationMin: 60, participants: 1 }),
  },
  {
    place: 'Ubud',
    title: 'Private Strength Training',
    note: '60 minutes · 1 person · travel included',
    quote: estimateQuote({ service: 'personal-training', city: 'Bali', area: 'ubud', durationMin: 60, participants: 1 }),
  },
  {
    place: 'Canggu',
    title: 'Private yoga for two',
    note: '60 minutes · 2 people · second person included',
    quote: estimateQuote({ service: 'private-yoga', city: 'Bali', area: 'canggu', durationMin: 60, participants: 2 }),
  },
  {
    place: 'Canggu',
    title: 'Private Strength Training for two',
    note: '60 minutes · 2 people · extra-person fee added',
    quote: estimateQuote({ service: 'personal-training', city: 'Bali', area: 'canggu', durationMin: 60, participants: 2 }),
  },
  {
    place: 'Canggu',
    title: 'Boxing fitness',
    note: '60 minutes · 1 person · in-zone travel included',
    quote: estimateQuote({ service: 'boxing-fitness', city: 'Bali', area: 'canggu', durationMin: 60, participants: 1 }),
  },
  {
    place: 'Canggu',
    title: 'Guided meditation for two',
    note: '60 minutes · 2 people · second person included',
    quote: estimateQuote({ service: 'guided-meditation', city: 'Bali', area: 'canggu', durationMin: 60, participants: 2 }),
  },
]

const travelZones = [
  ['Bali in-zone', 'Included', 'Canggu and Seminyak. Travel is already inside the published session price.'],
  ['Canggu, Seminyak, Sanur, Ubud and Uluwatu', 'Travel included', 'The published Bali session price includes travel in these areas. Other areas are on request.'],
  ['Jakarta in-zone', 'Included', 'South and Central Jakarta. Building access is collected before confirmation.'],
  ['North, West, East Jakarta', 'By quote', 'No in-zone or zero-travel price is assumed. We confirm supply and travel in writing.'],
]

const quoteSteps = [
  ['Starting price', 'The published 60-minute in-zone rate for the session and city.'],
  ['People and length', 'Extra people and a 90-minute visit sit on top of that rate.'],
  ['Travel', 'Travel is included in the five named Bali areas. South and Central Jakarta include travel; other Jakarta areas require a timing and travel quote.'],
  ['Package', '3, 5 and 10 session packs price private strength training at Rp 1.225.000, Rp 1.175.000 and Rp 1.050.000. Savings are shown against Rp 1.300.000.'],
]

const priceFaqKeys = [
  'How do I book a personal trainer in Bali on WhatsApp?',
  'Is Canggu in-zone for a personal trainer?',
  'What should I write in the first WhatsApp?',
  'Can I book a personal trainer in South Jakarta?',
  'How much does a session cost?',
  'Is the number on the website the final price?',
  'Which Bali areas are in-zone?',
  'Which Jakarta areas are in-zone?',
  'Can two people share a session?',
  'How do programmes work?',
  'Do you cover the whole of Bali or Jakarta?',
  'How do I pay?',
]

export function Programmes() {
  return (
    <>
      <PageIntro eyebrow="Packages" title="Session packs for a villa stay." description="A single session of private strength training is Rp 1.300.000. A 3-session pack is Rp 1.225.000 each. A 5-session pack is Rp 1.175.000 each. A 10-session pack is Rp 1.050.000 each. Savings are the exact difference from Rp 1.300.000 per session.">
        <a href="#schedule-builder" className="button button-primary">Plan my sessions<ArrowUpRight size={16} /></a>
      </PageIntro>
      <section className="section"><div className="shell"><ProgrammeGrid /></div></section>
      <section className="section-compact section-light">
        <div className="shell split-feature">
          <div>
            <h2>What you are actually buying.</h2>
            <p style={{ marginTop: 18 }}><Link to="/resources/two-three-or-four-weeks-choosing-a-fitness-programme-for-your-stay" className="text-link">How to choose a 2, 3 or 4 week block<ArrowUpRight size={15} /></Link></p>
          </div>
          <ul className="check-list large-list">
            {['A named session count, not an open membership', 'The instructor is named on the written quote', 'A validity window for unused sessions, written on the quote', 'Free rescheduling up to 24 hours before your session, if supply allows. Inside 24 hours, the session is charged. A 50% deposit confirms each booking; packs are paid in full upfront.'].map((item) => <li key={item}><Check size={19} />{item}</li>)}
          </ul>
        </div>
      </section>
      <section className="section" id="schedule-builder">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Planner</Eyebrow><h2>Build a weekly rhythm, then continue in WhatsApp.</h2></div></div>
          <WellnessSchedule />
        </div>
      </section>
      <CtaBand dark title="Price a 3, 5 or 10 session block." copy="Pick the city and service first. The estimator applies the programme reduction on top." to="/pricing" label="Estimate my price" />
    </>
  )
}

export function ServiceAreas() {
  const bali = areas.filter((area) => area.city === 'Bali' && !area.parent)
  return (
    <>
      <PageIntro eyebrow="Service areas" title="Clusters, not island-wide coverage." description="Travel is either inside the session starting price or added once per visit. If we cannot honour an address, we decline it rather than stretch a route.">
        <div className="cluster">
          <Link to="/bali" className="button button-primary">Bali clusters<ArrowUpRight size={16} /></Link>
          <Link to="/jakarta" className="button button-outline">Jakarta clusters</Link>
        </div>
      </PageIntro>
      <section className="section-compact section-dark">
        <div className="shell split-feature">
          <div><h2>How travel is charged.</h2></div>
          <ul className="check-list large-list">
            {['Central areas: Canggu, Seminyak, South Jakarta and Central Jakarta, travel included', 'Travel is included across Canggu, Seminyak, Sanur, Ubud and Uluwatu. Other areas on request.', 'North, West and East Jakarta: by request', 'Parking, building fees and pool entry stay extra if they exist'].map((item) => <li key={item}><Check size={19} />{item}</li>)}
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Bali</Eyebrow><h2>Villa and home clusters we publish.</h2><p>Open the Bali hub for session rates. Area pages explain access; they point back to the city page.</p></div></div>
          <div className="area-grid">
            {bali.map((area) => (
              <Link to={'/bali/' + area.slug} className="area-card" key={area.slug}>
                <p className="eyebrow">{area.cluster}</p>
                <h3>{area.name}</h3>
                <p>{area.travelQuote ? 'Travel quoted after a timing check' : area.travelFee ? `Travel ${formatIdr(area.travelFee)} per visit` : 'In-zone travel included'}</p>
              </Link>
            ))}
          </div>
          <div className="cluster" style={{ marginTop: 28 }}>
            <Link to="/bali/personal-training" className="text-link">Private Strength Training in Bali<ArrowUpRight size={15} /></Link>
            <Link to="/bali/private-yoga" className="text-link">Private yoga in Bali<ArrowUpRight size={15} /></Link>
            <Link to="/pricing" className="text-link">All starting prices<ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </section>
      <section className="section section-light">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Jakarta</Eyebrow><h2>Home and apartment clusters we publish.</h2><p>South and Central Jakarta sit inside the published rate, including named neighbourhood pages. Other municipalities wait on supply and a travel line.</p></div></div>
          <LocationClusters city="Jakarta" />
          <div className="cluster" style={{ marginTop: 28 }}>
            <Link to="/jakarta/personal-training" className="text-link">Private Strength Training in Jakarta<ArrowUpRight size={15} /></Link>
            <Link to="/jakarta/private-yoga" className="text-link">Private yoga in Jakarta<ArrowUpRight size={15} /></Link>
            <Link to="/contact" className="text-link">Check a building<ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </section>
      <CtaBand title="Check your address." copy="Area name and venue type are enough. A pin can wait until we are quoting." to="/contact" label="Check availability" />
      <DirectoryPlanningGuide />
    </>
  )
}

export function Standards() {
  return (
    <>
      <PageIntro eyebrow="Standards" title="The right professional for the exact service." description="A professional is not “on the team” in the abstract. They are approved for a service, a city cluster, a language and a commercial term. That approval expires and can be suspended." />
      <section className="section">
        <div className="content-shell process-list">
          {[
            ['01', 'Identity and work eligibility', 'We confirm who is arriving at your door. Identity and work-eligibility documents are collected before a first session.'],
            ['02', 'Discipline competence', 'Private Strength Training, yoga, mat Pilates, mobility, boxing and meditation are separate approvals.'],
            ['03', 'Practical delivery', 'A session in a real villa or apartment, not only a studio CV.'],
            ['04', 'Safety and conduct', 'Safeguarding, data conduct and a way to suspend someone quickly.'],
            ['05', 'Backup', 'A backup instructor is named where available. We will not confirm a session we cannot staff.'],
          ].map(([n, t, c]) => <article key={n}><span className="process-number">{n}</span><div><h2>{t}</h2><p>{c}</p></div></article>)}
        </div>
      </section>
      <CtaBand dark title="Ask who would be sent." copy="You can name a preference. Confirmation still waits on the diary and a written quote." to="/contact" label="Check availability" />
    </>
  )
}

export function Resources() {
  return (
    <>
      <PageIntro eyebrow="Guides" title="Practical pages, not keyword filler." description="Villa setup, Jakarta access, how a quote is built, beginners, pairs and programmes." />
      <section className="section">
        <div className="shell resource-grid">
          {resources.map((item) => (
            <Link to={`/resources/${item.slug}`} className="resource-card" key={item.slug}>
              <p className="eyebrow">{item.eyebrow} · {item.minutes} min</p>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export function ResourceArticle() {
  const { slug } = useParams()
  const article = slug ? getResource(slug) : undefined
  if (!article) return <NotFound />
  return (
    <>
      <PageIntro eyebrow={article.eyebrow} title={article.title} description={article.summary} />
      <section className="section">
        <div className="content-shell privacy-prose">
          {article.body.map((p) => <p key={p}>{p}</p>)}
          <Link to="/contact" className="button button-primary">Use this in an enquiry<ArrowUpRight size={16} /></Link>
        </div>
      </section>
    </>
  )
}

export function FaqPage() {
  return (
    <>
      <StructuredData data={faqJsonLd(faqs)} />
      <PageIntro eyebrow="Questions" title="Personal trainer Bali and Jakarta, common questions." description="Prices, in-zone areas, extra people, cancellation and what we will not book. For numbers, open the pricing page; for clusters, Bali or Jakarta. If the answer depends on your building, use the estimator and wait for the written quote.">
        <div className="cluster">
          <Link to="/pricing" className="button button-primary">Open prices<ArrowUpRight size={16} /></Link>
          <Link to="/contact" className="button button-outline">Check availability</Link>
        </div>
      </PageIntro>
      <section className="section">
        <div className="content-shell faq-list">
          {faqs.map(([q, a]) => (
            <details className="faq-item" key={q}>
              <summary><span>{q}</span><Plus size={20} /></summary>
              <div className="faq-body"><p>{a}</p></div>
            </details>
          ))}
        </div>
      </section>
      <CtaBand dark title="If it is not in this list, send the practical details." copy={`Send service, city, area, window and headcount to Contact, WhatsApp +62 811-3803-488, or ${COMPANY_EMAIL}. Keep health, ID and card numbers out.`} />
    </>
  )
}

export function ServicesHub() {
  return (
    <>
      <StructuredData data={collectionJsonLd(
        'Private fitness sessions at home',
        '/services',
        'Private Strength Training, private yoga, mat Pilates, mobility coaching, boxing fitness and guided meditation at your villa or home in Bali and Jakarta.',
        publicServices.map((service) => ({ name: service.title, url: '/' + service.slug })),
      )} />
      <PageIntro eyebrow="Services" title="Private sessions at your villa or home." description="Private strength training, bodywork and recovery, Zumba and dance fitness, private yoga, mat Pilates, mobility coaching, boxing fitness and guided meditation. Published starting prices, then a written quote before payment.">
        <Link to="/pricing" className="button button-primary">See session prices<ArrowUpRight size={16} /></Link>
      </PageIntro>
      <section className="section">
        <div className="shell">
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
      <section className="section-compact section-light">
        <div className="shell split-feature">
          <div>
            <Eyebrow>Who each hour suits</Eyebrow>
            <h2>Pick the format that matches the room and the people.</h2>
            <p className="large-copy">Private strength training is the individual coached hour. Bodywork and recovery is assisted stretching, myofascial release and relaxation. Zumba and dance fitness is high-energy cardio at the villa. Private yoga suits one or two people who want a mat practice. Mat Pilates needs a dry even floor, not a reformer. Mobility is stretching and guided movement. Boxing fitness is pad work for one guest. Guided meditation is a calm sit for one or two people.</p>
            <p>Booking is the same for every format. Send city, area, session and a two-hour window. A coordinator matches a professional, you receive a written quote, then the hour runs at your villa or home. Open <Link to="/bali">Bali</Link> or <Link to="/jakarta">Jakarta</Link> for clusters, then <Link to="/pricing">pricing</Link> for extras, travel and programmes.</p>
            <p>Villa managers who want a guest menu can start on the <Link to="/villa-hotel-partners">partner programme</Link>. Guests still pay the published website price. WhatsApp +62 811-3803-488 or email {COMPANY_EMAIL} after the estimator.</p>
          </div>
          <ul className="check-list large-list">
            {['Open the Bali or Jakarta page for that city’s clusters', 'Use pricing for extras, travel and programmes', 'Send WhatsApp +62 811-3803-488 after the estimator', 'Yoga and meditation include up to two people', 'Boxing stays one person, pad work only', 'The coach who arrives is named on the quote'].map((item) => (
              <li key={item}><Check size={19} />{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand dark title="Check availability for your window." copy="City, area and a two-hour window are enough to start." to="/contact" label="Check availability" />
    </>
  )
}

export function PricingPage() {
  return (
    <>
      <section className="sales-hero">
        <div className="shell sales-hero-grid">
          <div className="sales-hero-copy">
            <Eyebrow light>Published rates · Bali and Jakarta</Eyebrow>
            <h1>Personal trainer Bali and Jakarta prices</h1>
            <p className="hero-lede">Private sessions in Bali and Jakarta, with starting rates you can read before WhatsApp. An eligible second guest, session packs and 90 minutes can change the total. Travel is included in the five named Bali areas. The written quote is what you pay.</p>
            <div className="cluster">
              <a href="#estimator" className="button button-primary">Estimate my price<ArrowUpRight size={17} /></a>
              <Link to="/contact" className="button button-outline-light">Check availability</Link>
            </div>
            <p className="hero-micro"><ShieldCheck size={16} />These are starting prices for 60 minutes. Your written quote shows the final total.</p>
          </div>
          <ParallaxImage src="/images/editorial/pricing.webp" alt="Instructor discussing the appointment details with adult clients" eager className="hero-session-image" />
        </div>
        <div className="shell hero-facts">
          <div><strong>{formatIdr(SESSION_ANCHOR)}</strong><span>Private strength training, 60 minutes, one guest.</span></div>
          <div><strong>{formatIdr(programmes.find(pack => pack.sessions === 5)!.perSession)}</strong><span>5-session pack, per session.</span></div>
          <div><strong>2 Guests</strong><span>Adds Rp 250.000 per session when the rate is for one guest. Yoga and meditation already include a pair.</span></div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionTitle
            eyebrow="Session rates"
            title="Private hours, priced before you ask."
            copy="These are 60-minute starting prices. Open a session page for the format, then use the estimator for guests, duration and packages."
            action={<Link to="/services" className="text-link">All sessions<ArrowUpRight size={15} /></Link>}
          />
          <div className="pricing-rate-grid">
            {orderedServices.map((service) => (
              <Link to={`/${service.slug}`} className="pricing-rate-card" key={service.slug}>
                <div className="pricing-rate-photo">
                  <img src={ratePhotos[service.slug] || service.image} srcSet={responsiveSource(ratePhotos[service.slug] || service.image)} sizes="(max-width: 700px) 90vw, 30vw" alt={service.imageAlt} width="800" height="1000" loading="lazy" decoding="async" />
                </div>
                <div className="pricing-rate-copy">
                  <p className="photo-policy-caption">Photos are illustrative. The professional for your hour is named on the quote.</p><h3>{service.title}</h3>
                  <p>{service.durationMin} minutes · up to {service.includedParticipants === 1 ? '1 person included' : `${service.includedParticipants} people included`}</p>
                  <div className="pricing-rate-cities">
                    <div>
                      <span>Bali</span>
                      <strong>{service.prices.Bali ? formatIdr(service.prices.Bali) : 'Quote'}</strong>
                    </div>
                    <div>
                      <span>Jakarta</span>
                      <strong>{service.prices.Jakarta ? formatIdr(service.prices.Jakarta) : 'Quote'}</strong>
                    </div>
                  </div>
                  <span className="text-link">Open {service.title.toLowerCase()}<ArrowUpRight size={15} /></span>
                </div>
              </Link>
            ))}
            {partner.GROUP_YOGA_RATE_BALI && partner.GROUP_YOGA_MAX_PEOPLE && (
              <article className="pricing-rate-card">
                <div className="pricing-rate-copy">
                  <p className="photo-policy-caption">Photos are illustrative. The professional for your hour is named on the quote.</p><h3>Villa group yoga</h3>
                  <p>60 minutes · up to {partner.GROUP_YOGA_MAX_PEOPLE} people in one space</p>
                  <div className="pricing-rate-cities">
                    <div>
                      <span>Bali</span>
                      <strong>{formatIdr(partner.GROUP_YOGA_RATE_BALI)}</strong>
                    </div>
                    <div>
                      <span>Jakarta</span>
                      <strong>Quote</strong>
                    </div>
                  </div>
                  <p>Shared class in a checked terrace, studio or large living room. Not a private pair rate.</p>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      <WhyTheRate />

      <section className="section section-light">
        <div className="shell">
          <SectionTitle eyebrow="How a quote is built" title="Start with the session rate. Then add only what applies." copy="Nothing is hidden in chat. If a line is not on the estimator, it is not assumed." />
          <div className="quote-build">
            {quoteSteps.map(([title, copy], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionTitle
            eyebrow="Worked examples"
            title="The same maths the estimator uses."
            copy="These are starting totals for named clusters. Availability, access and the payable amount are still confirmed in writing."
          />
          <div className="pricing-example-grid">
            {priceExamples.map((item) => (
              <article className="pricing-example" key={item.title + item.place}>
                <p className="eyebrow">{item.place}</p>
                <h3>{item.title}</h3>
                <strong>{item.quote.ok ? formatIdr(item.quote.total) : 'Quote required'}</strong>
                <p>{item.note}</p>
                {item.quote.ok && item.quote.travel > 0 && <p className="small muted">Includes {formatIdr(item.quote.travel)} travel.</p>}
                {item.quote.ok && item.quote.extraPeopleFee > 0 && <p className="small muted">Includes {formatIdr(item.quote.extraPeopleFee)} extra-person fee.</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="shell">
          <SectionTitle eyebrow="Travel" title="Travel included in all five named Bali areas." copy="Travel is included across Canggu, Seminyak, Sanur, Ubud and Uluwatu. Other areas on request. Sessions are subject to instructor availability and location confirmation." />
          <div className="pricing-zone-grid">
            {travelZones.map(([title, price, copy]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{price}</strong>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="cluster" style={{ marginTop: 36 }}>
            <Link to="/bali" className="button button-light">Bali clusters</Link>
            <Link to="/jakarta" className="button button-outline-light">Jakarta clusters</Link>
            <Link to="/service-areas" className="button button-outline-light">Travel notes</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell split-feature">
          <div>
            <Eyebrow>Extras</Eyebrow>
            <h2>People, length and a pair session.</h2>
            <p className="large-copy">Private yoga includes the second person. Other sessions add an extra-person fee. A 90-minute visit adds 45% of the base rate.</p>
            <p>Venue hire, parking and unusual equipment appear only when they are written on the quote.</p>
          </div>
          <div className="price-board">
            <div>
              <span>Extra person · Bali</span>
              <strong>{formatIdr(extraPersonFee.Bali)}</strong>
              <p>Added once per extra person, not per minute.</p>
            </div>
            <div>
              <span>Extra person · Jakarta</span>
              <strong>{formatIdr(extraPersonFee.Jakarta)}</strong>
              <p>Same rule. Building access is still checked first.</p>
            </div>
            <div>
              <span>90-minute session</span>
              <strong>+45%</strong>
              <p>Of the 60-minute city rate, before travel. <Link to="/resources/sixty-or-ninety-minutes-how-home-session-duration-is-quoted">Compare 60 and 90 minutes.</Link></p>
            </div>
            <div>
              <span>Private yoga pair</span>
              <strong>Included</strong>
              <p>Two people at the published yoga rate.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="shell">
          <SectionTitle
            eyebrow="Programmes"
            title="Compare the price per session."
            copy="Rates below are per 60-minute visit. Prepaid packs start at Rp 850.000 per visit. Yoga and meditation include up to two guests."
            action={<Link to="/programmes" className="text-link">Plan a block<ArrowUpRight size={15} /></Link>}
          />
          {(['Bali', 'Jakarta'] as const).map(city => (
            <details key={city} className="pack-rate-details" open={city === 'Bali'}>
              <summary>{city} session and pack rates</summary>
              <div className="pack-rate-scroll" role="region" aria-label={city + ' rates in rupiah'} tabIndex={0}>
                <table>
                  <thead><tr><th scope="col">Service</th>{programmes.map(pack => <th key={pack.slug} scope="col">{pack.sessions === 1 ? 'Single' : pack.sessions + '-pack'}</th>)}</tr></thead>
                  <tbody>{orderedServices.map(service => <tr key={service.slug}>
                    <th scope="row">{service.title}</th>
                    {programmes.map(pack => <td key={pack.slug}>{service.prices[city] == null ? 'By quote' : formatIdr(packSessionRate(service.prices[city], pack.pricePercent))}</td>)}
                  </tr>)}</tbody>
                </table>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="section" id="estimator">
        <div className="shell">
          <SectionTitle eyebrow="Estimator" title="Estimate my price, then continue in WhatsApp." copy={`Choose the session, city, cluster, people and length. The draft carries the numbers. Email it to ${COMPANY_EMAIL} or send it in WhatsApp. Nothing is booked until you accept the written quote.`} />
          <QuoteEstimator /><PolicySummary />
        </div>
      </section>

      <section className="section section-light">
        <StructuredData data={faqJsonLd(faqs.filter(([question]) => priceFaqKeys.includes(question)))} />
        <div className="content-shell faq-list">
          <SectionTitle eyebrow="Questions" title="Prices, travel and what you actually pay." />
          {faqs.filter(([question]) => priceFaqKeys.includes(question)).map(([question, answer]) => (
            <details className="faq-item" key={question}>
              <summary><span>{question}</span></summary>
              <div className="faq-body"><p>{answer}</p></div>
            </details>
          ))}
          <Link to="/faq" className="text-link">All questions<ArrowUpRight size={15} /></Link>
        </div>
      </section>

      <section className="section-compact section-dark">
        <div className="shell split-feature">
          <div>
            <Eyebrow light>Before you pay</Eyebrow>
            <h2>Cancellation, in one place.</h2><PolicySummary />
            <p>The quote repeats these lines. Pay securely using the payment details in your written quote. Never send card numbers, bank details or ID photos in WhatsApp.</p>
            <Link to="/refunds-rescheduling" className="text-link">Full refund terms<ArrowUpRight size={15} /></Link>
          </div>
          <div className="meta-table">
            {cancellationRules.map(([k, v]) => <div key={k}><span>{k}</span><strong>{v}</strong></div>)}
          </div>
        </div>
      </section>

      <CtaBand dark title="Check availability for your window." copy="City, area and a two-hour window are enough to start. We confirm whether we can run the hour, then send the quote." to="/contact" label="Check availability" />
    </>
  )
}

export function ContactPage() {
  return (
    <>
      <StructuredData data={contactPageJsonLd()} />
      <PageIntro eyebrow="Book" title="Check availability for your session." description={`Send the city, area, session and a two-hour window. Email ${COMPANY_EMAIL} or use the form, or message WhatsApp +62 811-3803-488. Nothing is booked until you accept the written quote.`}>
        <div className="cluster">
          <Link to="/pricing" className="button button-outline">See session prices</Link>
          <Link to="/faq" className="button button-outline">Read the FAQ</Link>
          <Link to="/how-it-works" className="button button-outline">How it works</Link>
          <Link to="/resources/what-to-put-in-a-whatsapp-enquiry-for-a-home-trainer" className="button button-outline">WhatsApp template</Link>
        </div>
      </PageIntro>
      <section className="section-compact">
        <div className="shell">
          <div className="contact-channels">
            <div>
              <p className="eyebrow">WhatsApp</p>
              <p className="contact-channel-value">{WHATSAPP_DISPLAY}</p>
              <a className="button button-primary" href={whatsappDraftUrl()} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp('contact')}>Open WhatsApp<ArrowUpRight size={16} /></a>
            </div>
            <div>
              <p className="eyebrow">Email</p>
              <p className="contact-channel-value"><a href={COMPANY_EMAIL_HREF}>{COMPANY_EMAIL}</a></p><p>We reply between 08:00 and 20:00 Bali time.</p><p>A 50% deposit confirms each booking. Packs are paid in full upfront.</p>
              <a className="button button-outline" href={COMPANY_EMAIL_HREF}>Write to us<ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="enquiry-warning contact-warning">
            <div>
              <strong>Keep card numbers, ID photos and medical files out of this message.</strong>
              <p>Area, window, headcount and a one-line goal are enough. Payment details are shared in your written quote.</p>
            </div>
          </div>
          <QuoteEstimator /><PolicySummary />
        </div>
      </section>
      <section className="section">
        <div className="content-shell faq-list">
          <div className="section-title"><div><Eyebrow>Before you write</Eyebrow><h2>Short answers for a first message.</h2></div></div>
          {[
            ['What should I send?', 'Session, city, area, a two-hour window and headcount. Villa or apartment notes help. Keep card numbers and medical files out.'],
            ['Does the estimator book the hour?', 'No. It shows a starting total. The written quote is what you pay, after we confirm supply and access.'],
            ['Can villa managers use this page?', 'Guests book here. Managers who want a menu in every villa should open the partner programme.'],
          ].map(([q, a]) => (
            <details className="faq-item" key={q}>
              <summary><span>{q}</span></summary>
              <div className="faq-body"><p>{a}</p></div>
            </details>
          ))}
          <Link to="/villa-hotel-partners" className="text-link">For villa managers</Link>
        </div>
      </section>
    </>
  )
}

export function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About" title="Private fitness sessions at your villa or home." description="PersonalFitness.id coordinates private strength training, private yoga, mat Pilates, mobility, boxing fitness and guided meditation in published Bali and Jakarta clusters. Choose a session, agree the practical details and receive a written quote." />
      <section className="section-compact"><div className="shell"><ParallaxImage src="/images/editorial/about.webp" alt="Instructors discussing a private home session with adult clients" eager /></div></section>
      <section className="section">
        <div className="content-shell privacy-prose">
          <h2>Why this exists</h2>
          <p>Villa and home guests in Bali and Jakarta kept asking the same thing: a private hour in the place they already paid for, with a clear price and a professional named on a written quote. PersonalFitness.id was built as a company-managed service for that request. You do not pick from a public trainer directory. A coordinator matches the session, cluster and window, then names the professional on a written quote.</p>
          <h2>How coaches are chosen</h2>
          <p>Matching follows the <Link to="/professional-standards">professional standards</Link>: a published fitness format, a usable private space, and a professional who can take the window, as supply allows. A backup instructor is named where available if supply changes before confirmation. Photographs on this site show the type of hour we coordinate. They do not identify the person who will walk through your gate. That name sits on the quote. Read the <Link to="/team">team page</Link> for how we publish people only when a real photograph and certification exist.</p>
          <h2>Where we work</h2>
          <p>Travel is included in Canggu, Seminyak, Sanur, Ubud and Uluwatu. Other Bali areas are by request. Jakarta in-zone is South and Central Jakarta, including Kemang, Senopati, Menteng and Thamrin. North, West and East Jakarta are quoted after a timing check. Your instructor comes to your villa or home.</p>
          <h2>What we focus on</h2>
          <p>We offer eight private sessions, from strength training, yoga and mat Pilates to mobility coaching, boxing fitness, guided meditation, bodywork and dance fitness. Starting prices sit on the <Link to="/pricing">pricing page</Link>. The sequence is on <Link to="/how-it-works">how it works</Link>: enquiry, match, quote, payment, confirmation, delivery, aftercare. We focus on private fitness hours that can be confirmed. Nutrition, physiotherapy, reformer machines and swimming stay held until a qualified scope exists.</p>
          <h2>Villa managers</h2>
          <p>These pages are for the person booking a session. Villa managers who want a menu for the properties they look after can read the <Link to="/villa-hotel-partners">partner programme</Link> and the <Link to="/partner-terms">partner terms</Link>.</p>
          <h2>Contact</h2>
          <p>WhatsApp {WHATSAPP_DISPLAY}. Email <a href={COMPANY_EMAIL_HREF}>{COMPANY_EMAIL}</a>.</p>
          <Link to="/professional-standards" className="button button-primary">Read the vetting standard<ArrowUpRight size={16} /></Link>
        </div>
      </section>
    </>
  )
}

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' | 'refunds' | 'safety' | 'editorial' | 'nutrition' | 'physio' }) {
  const copy = legalCopy[kind]
  return (
    <>
      <PageIntro eyebrow={copy.eyebrow} title={copy.title} description={copy.lede} />
      <section className="section">
        <Prose>
          {copy.blocks.map((block) => (
            <div key={block[0]}>
              <h2>{block[0]}</h2>
              {block.slice(1).map((p) => <p key={p}>{p}</p>)}
            </div>
          ))}
          <Link to="/contact" className="button button-primary">{copy.cta}<ArrowUpRight size={16} /></Link>
        </Prose>
      </section>
    </>
  )
}

const legalCopy = {
  privacy: {
    eyebrow: 'Privacy',
    title: 'What this website holds, and what it must never hold.',
    lede: 'The estimator runs in your browser. We do not store card numbers, identity documents or medical files in this form.',
    cta: 'Prepare a non-sensitive enquiry',
    blocks: [
      ['On this website', 'The estimator, wellness planner and partnership form keep what you type in the current page until you send it. If you choose email, that message goes to ' + COMPANY_EMAIL + ' and we reply to the address you entered. Reloading the page clears the form. These forms do not create an account or save a health record. WhatsApp drafts are sent only when you send them in WhatsApp.'],
      ['Analytics cookies', 'If a measurement ID is configured, this site may load Google Analytics after you interact, to understand page views and WhatsApp clicks. You can refuse analytics cookies in your browser. We do not use them to invent reviews or to store health details.'],
      ['Managed wellness brief', 'For an agreed programme, your coordinator can maintain practical goals, preferences and session feedback. You choose which relevant non-clinical notes can be shared with assigned professionals. Ask your coordinator about access, correction or ending this sharing. Clinical records stay with the responsible provider and are separate from the general wellness brief.'],
      ['WhatsApp', 'If you send the draft to PersonalFitness.id, it is used to qualify and coordinate the request. WhatsApp has its own terms. Keep payment-card, bank, ID and detailed health data out of that chat.'],
      ['Booking records', 'Confirmed sessions need a customer record on our side: name, contact, address type, session IDs, payment status. Health details, if ever required, use a restricted screening route, not the public site.'],
      ['Your choices', 'Ask a human, request a correction, or opt out of further messages. Complaints and safety issues go to a person, not an auto-reply.'],
      ['Contact', 'WhatsApp ' + WHATSAPP_DISPLAY + '. Email ' + COMPANY_EMAIL + '.'],
    ],
  },
  terms: {
    eyebrow: 'Terms',
    title: 'The rules that sit under every quote.',
    lede: 'A published website rate is a starting price. The contract for a session is the written quote you accept, plus these terms.',
    cta: 'Ask about a quote',
    blocks: [
      ['Parties', 'PersonalFitness.id sells a coordinated session. The professional is dispatched for a named service and cluster. They are not offering you a separate studio membership through this site.'],
      ['Scope', 'The selected service and written quote define the scope. General fitness and relaxation visits do not include clinical diagnosis or treatment. Clinical or qualified health requests require an appropriately authorised professional and any separate clinical agreement. Swimming requires a suitable permitted pool; chef and equipment requests are itemised separately.'],
      ['Quotes and payment', 'A 50% deposit confirms each booking after the written quote is accepted. Packs are paid in full upfront. Payment instructions are on the written quote. We never ask for card or bank details in WhatsApp. Free rescheduling is available up to 24 hours before the session, if supply allows. Inside 24 hours, the session is charged. Chat messages are not settlement.'],
      ['Prepaid wellness plans', 'Packs are paid in full upfront. A 50% deposit confirms a single-session booking. The first visit is a paid single session unless your written quote states otherwise. A monthly wellness plan is a four-week block paid ahead with an agreed session count, dates and validity window. There is no automatic renewal. Programme savings apply once to eligible fitness session charges; travel, held services, food, rentals and external costs are excluded.'],
      ['Your space', 'You confirm permission to use the villa, home, hotel room or pool. Access failures, unsafe floors and missing permission can stop the session under the refund rules.'],
      ['Liability', 'You participate in physical activity at your own risk within a non-clinical fitness session. We stop work that looks unsafe. We do not accept clinical responsibility we are not qualified to hold.'],
    ],
  },
  refunds: {
    eyebrow: 'Refunds',
    title: 'Reschedule, charge, replace or stop.',
    lede: 'The 24-hour line is the working rule. A 50% deposit confirms each booking. Packs are paid in full upfront. Unused pack sessions follow the validity window on the quote.',
    cta: 'Ask about a booking',
    blocks: [
      ...cancellationRules.map(([k, v]) => [k, v] as [string, string]),
      ['Refunds', 'Refunds, if due, are returned to the original payment method where applicable. We will not ask you to message a card number to “speed it up”.'],
    ],
  },
  safety: {
    eyebrow: 'Safety',
    title: 'When we run the session, and when we stop it.',
    lede: 'Fitness is not healthcare. Children, water, heat, neighbours and buildings all change the brief.',
    cta: 'Discuss a participation limit',
    blocks: [
      ['Screening', 'Tell us if the session needs a quieter pace or a ground-floor room. Do not send clinic letters in WhatsApp. If pain, swelling or a recent procedure is in play, get clinical advice first.'],
      ['Stop conditions', 'We stop for unsafe floors, heat illness, aggressive animals, missing permission, a pool that fails a basic check, or a request that has turned clinical.'],
      ['Emergencies', 'Life-threatening events go to local emergency services first. Then a human incident owner. Not a chatbot.'],
      ['Children', 'Minors only with a parent or guardian present and a session that is still in fitness scope. No unsupervised coaching.'],
    ],
  },
  editorial: {
    eyebrow: 'Editorial',
    title: 'How these pages are written.',
    lede: 'Prices, clusters and professional names are treated as operational facts. Marketing adjectives are not.',
    cta: 'Suggest a correction',
    blocks: [
      ['Sources', 'Session rates come from the operating workbook. Area travel fees are the published cluster rules. Named public profiles are not part of the live site.'],
      ['Session photographs', 'Photographs show the type of private coaching we coordinate. They do not identify the professional who will arrive, a customer, a property or guaranteed local availability. The person who attends is named on your written quote.'],
      ['Corrections', 'If a price, area or name is wrong, the page is updated and the quote template follows. We do not leave a cheaper number on a banner than operations will honour.'],
      ['AI assistance', 'Copy may be drafted with AI. Release still needs a human pass for prices, safety and legal pages.'],
    ],
  },
  nutrition: {
    eyebrow: 'Held',
    title: 'Nutrition consultation is not live.',
    lede: 'There is no dietitian on this website to book. We will not quote a meal plan as if it were a personal-training add-on.',
    cta: 'Ask a fitness question instead',
    blocks: [
      ['Why it is held', 'Nutrition advice that looks clinical needs a qualified professional, a defined scope, a fee and a records rule. Those gates are not open.'],
      ['What we can do', 'We can still quote private strength training, private yoga, mat Pilates, mobility, boxing fitness and guided meditation.'],
    ],
  },
  physio: {
    eyebrow: 'Held',
    title: 'Physiotherapy is not booked here.',
    lede: 'If you need a clinician, you need a clinician. We will not relabel rehab as “mobility” to take the payment.',
    cta: 'See mobility only if it is fitness',
    blocks: [
      ['Boundary', 'Mobility coaching is a fitness session for stiffness and range. It does not treat injury, post-surgery protocols or pain.'],
      ['If you are hurt', 'Speak to an appropriate licensed professional. Come back to PersonalFitness.id when you want a non-clinical session in a villa or home.'],
    ],
  },
}
