import { ArrowUpRight, Check, Plus } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Eyebrow, PageIntro, ParallaxImage } from '@/components/Primitives'
import { CtaBand, ExtraFees, ProgrammeGrid, Prose } from '@/components/SiteBlocks'
import QuoteEstimator from '@/components/QuoteEstimator'
import WellnessSchedule from '@/components/WellnessSchedule'
import { cancellationRules } from '@/data/catalog'
import { publicServices } from '@/data/publicOffer'
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_EMAIL_HREF, COMPANY_MAPS_URL } from '@/data/company'
import { faqs, getResource, resources } from '@/data/content'
import { formatIdr } from '@/lib/money'
import { WHATSAPP_DISPLAY, whatsappDraftUrl } from '@/lib/whatsapp'
import NotFound from './NotFound'

export function Programmes() {
  return (
    <>
      <PageIntro eyebrow="Programmes" title="Plan my sessions as a prepaid block." description="Start with one paid session. Then mix personal training, private yoga, mat Pilates and mobility into a prepaid two, three or four-week plan. Six, nine and twelve visits receive 5%, 8% and 12% savings on session charges.">
        <a href="#schedule-builder" className="button button-primary">Plan my sessions<ArrowUpRight size={16} /></a>
      </PageIntro>
      <section className="section"><div className="shell"><ProgrammeGrid /></div></section>
      <section className="section-compact section-light">
        <div className="shell split-feature">
          <div><h2>What you are actually buying.</h2></div>
          <ul className="check-list large-list">
            {['A named session count, not an open membership', 'The same professional where supply allows, with a backup named if not', 'A validity window for unused sessions, written on the quote', 'The 24-hour reschedule rule still applies inside the block'].map((item) => <li key={item}><Check size={19} />{item}</li>)}
          </ul>
        </div>
      </section>
      <section className="section" id="schedule-builder">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Planner</Eyebrow><h2>Build a weekly rhythm, then continue in WhatsApp.</h2></div></div>
          <WellnessSchedule />
        </div>
      </section>
      <CtaBand dark title="Price a 6, 9 or 12 session block." copy="Pick the city and service first. The estimator applies the programme reduction on top." to="/pricing" label="Estimate my price" />
    </>
  )
}

export function ServiceAreas() {
  return (
    <>
      <PageIntro eyebrow="Service areas" title="Clusters, not island-wide coverage." description="Travel is either inside the session starting price or added once per visit. If we cannot honour an address, we decline it rather than stretch a route.">
        <Link to="/contact" className="button button-primary">Check availability<ArrowUpRight size={16} /></Link>
      </PageIntro>
      <section className="section-compact section-dark">
        <div className="shell split-feature">
          <div><h2>How travel is charged.</h2></div>
          <ul className="check-list large-list">
            {['In-zone: Canggu–Seminyak, South Jakarta, Central Jakarta', 'Ubud and Sanur: Rp 150.000 per visit', 'Uluwatu / Bukit: Rp 200.000 per visit', 'Other Jakarta municipalities: quoted after a timing check', 'Parking, building fees and pool entry stay extra if they exist'].map((item) => <li key={item}><Check size={19} />{item}</li>)}
          </ul>
        </div>
      </section>
      <CtaBand title="Check your address." copy="Area name and venue type are enough. A pin can wait until we are quoting." to="/contact" label="Check availability" />
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
            ['01', 'Identity and work eligibility', 'We confirm who is arriving at your door and that they can lawfully do the work.'],
            ['02', 'Discipline competence', 'Personal training, yoga, mat Pilates and mobility are separate approvals.'],
            ['03', 'Practical delivery', 'A session in a real villa or apartment, not only a studio CV.'],
            ['04', 'Safety and conduct', 'Safeguarding, insurance, data conduct and a way to suspend someone quickly.'],
            ['05', 'Backup', 'A launched cluster needs two suitable people or an owner-approved safe equivalent.'],
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
      <PageIntro eyebrow="Questions" title="Prices, areas, trainers, cancellation." description="If the answer depends on your building or your pool, the estimator plus a human quote is the next step.">
        <Link to="/pricing" className="button button-primary">Open prices<ArrowUpRight size={16} /></Link>
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
      <CtaBand dark title="If it is not in this list, send the practical details." copy="Service, city, area, window, headcount. Keep health, ID and card numbers out." />
    </>
  )
}

export function HowItWorksPage() {
  const steps = [
    ['01', 'Enquiry', 'You send service, city, area, window, headcount and a non-sensitive goal.'],
    ['02', 'Qualification', 'We check that the request is in scope: fitness, a usable space, a cluster we publish, no clinical work hiding in the brief.'],
    ['03', 'Supply check', 'A suitable professional accepts the exact window and cost ceiling, or we offer a second name.'],
    ['04', 'Quote', 'You receive the total, extras, exclusions and cancellation terms. The website estimator shows the starting price for this step.'],
    ['05', 'Payment', 'You pay only on the merchant link in the quote. Nothing is booked on a screenshot.'],
    ['06', 'Confirmation', 'You get the professional, arrival window, access note and preparation list.'],
    ['07', 'Delivery', 'The session runs as confirmed. Deviations and incidents are recorded. Safety issues leave the normal queue.'],
    ['08', 'Aftercare', 'A next-session hold if you want one, and a human owner if something failed.'],
  ]
  return (
    <>
      <PageIntro eyebrow="How it works" title="A click is not a booking." description="Eight steps from the first message to aftercare. The website can estimate a price. Only a written quote plus verified payment confirms the hour.">
        <Link to="/contact" className="button button-primary">Start at step one<ArrowUpRight size={16} /></Link>
      </PageIntro>
      <section className="section">
        <div className="content-shell process-list">
          {steps.map(([n, t, c]) => <article key={n}><span className="process-number">{n}</span><div><h2>{t}</h2><p>{c}</p></div></article>)}
        </div>
      </section>
      <CtaBand dark title="Put the details in one message." copy="The estimator builds the numbers. WhatsApp carries the request. The quote closes the loop." />
    </>
  )
}

export function ServicesHub() {
  return (
    <>
      <PageIntro eyebrow="Services" title="Four private sessions at your villa or home." description="Personal training, private yoga, mat Pilates and mobility coaching. Published starting prices, then a written quote before payment.">
        <Link to="/pricing" className="button button-primary">See session prices<ArrowUpRight size={16} /></Link>
      </PageIntro>
      <section className="section">
        <div className="shell">
          <div className="service-card-grid">
            {publicServices.map((service, index) => (
              <Link to={`/${service.slug}`} className="service-card" key={service.slug}>
                <div className="service-card-image"><img src={service.image} alt={service.imageAlt} width="1200" height="800" /></div>
                <span className="service-index">0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>Starting price · Bali {formatIdr(service.prices.Bali!)} · Jakarta {formatIdr(service.prices.Jakarta!)}</p>
                <span className="text-link">Open {service.title.toLowerCase()}<ArrowUpRight size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand dark title="Check availability for your window." copy="City, area and a two-hour window are enough to start." to="/contact" label="Check availability" />
    </>
  )
}

export function PricingPage() {
  return (
    <>
      <PageIntro eyebrow="Pricing" title="Starting prices, then a live estimate." description="These are the published session starting prices. Extra people, outer-zone travel, 90 minutes and programmes change the total. The confirmed quote can still move after a supply and access check.">
        <Link to="/contact" className="button button-primary">Check availability<ArrowUpRight size={16} /></Link>
      </PageIntro>
      <section className="section-compact">
        <div className="shell">
          <div className="price-board price-board-wide">
            {publicServices.map((service) => (
              <div key={service.slug}>
                <span>{service.title}</span>
                <strong>{service.prices.Bali ? formatIdr(service.prices.Bali) : ' - '}</strong>
                <p>Bali starting price · {service.durationMin} min</p>
                <strong>{service.prices.Jakarta ? formatIdr(service.prices.Jakarta) : ' - '}</strong>
                <p>Jakarta starting price · {service.durationMin} min</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-compact section-light">
        <div className="shell split-feature">
          <div>
            <Eyebrow>Extras</Eyebrow>
            <h2>The lines that sit on top of the session rate.</h2>
          </div>
          <ExtraFees />
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Estimator</Eyebrow><h2>Estimate my price, then continue in WhatsApp.</h2></div></div>
          <QuoteEstimator />
        </div>
      </section>
      <section className="section-compact section-dark">
        <div className="shell split-feature">
          <div><h2>Cancellation, in one place.</h2></div>
          <div className="meta-table">
            {cancellationRules.map(([k, v]) => <div key={k}><span>{k}</span><strong>{v}</strong></div>)}
          </div>
        </div>
      </section>
    </>
  )
}

export function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Quote" title="Check availability, then send the estimate." description="The estimator uses the same starting prices as the pricing page. WhatsApp opens a chat with us. Nothing is booked until a written quote is accepted and payment is verified." />
      <section className="section-compact">
        <div className="shell">
          <div className="office-card">
            <div>
              <p className="eyebrow">Office</p>
              <h2>Find us in Denpasar.</h2>
              <p>This is the company address. Sessions still run at your villa or home in the published Bali and Jakarta clusters.</p>
              <address className="office-lines">
                <a href={COMPANY_MAPS_URL} target="_blank" rel="noopener noreferrer">{COMPANY_ADDRESS}</a>
              </address>
            </div>
            <div>
              <p className="eyebrow">WhatsApp</p>
              <p className="office-phone">{WHATSAPP_DISPLAY}</p>
              <a className="button button-primary" href={whatsappDraftUrl()} target="_blank" rel="noopener noreferrer">Open WhatsApp<ArrowUpRight size={16} /></a>
            </div>
            <div>
              <p className="eyebrow">Email</p>
              <p className="office-phone"><a href={COMPANY_EMAIL_HREF}>{COMPANY_EMAIL}</a></p>
              <a className="button button-outline" href={COMPANY_EMAIL_HREF}>Write to us<ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="enquiry-warning contact-warning">
            <div>
              <strong>Keep card numbers, ID photos and medical files out of this message.</strong>
              <p>Area, window, headcount and a one-line goal are enough. Screening and payment use separate channels.</p>
            </div>
          </div>
          <QuoteEstimator />
        </div>
      </section>
    </>
  )
}

export function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About" title="Private fitness sessions at your villa or home." description="PersonalFitness.id coordinates personal training, private yoga, mat Pilates and mobility coaching in published Bali and Jakarta clusters. Choose a session, agree the practical details and receive a written quote." />
      <section className="section-compact"><div className="shell"><ParallaxImage src="/images/professionals/eka-pranata.webp" alt="Wellness coordinator in a private villa" eager /></div></section>
      <section className="section">
        <div className="content-shell privacy-prose">
          <h2>What we sell</h2>
          <p>A coordinated private fitness session at a villa, home or other suitable lawful space in Bali or Jakarta. The product is the sequence: enquiry, match, quote, confirmation, delivery, aftercare.</p>
          <h2>What we do not sell</h2>
          <p>We do not publish a public trainer directory, guest reviews, clinical booking, nutrition plans or an expanded spa catalogue. Reformer instruction, swimming and other held requests are not on the live offer.</p>
          <h2>Scope</h2>
          <p>The live offer is general fitness: personal training, private yoga, mat Pilates and mobility coaching. Nutrition and clinical requests are not booked on this site.</p>
          <h2>Office</h2>
          <p>PersonalFitness.id is based in Denpasar. Private sessions are still delivered at your location in the published clusters, not as walk-in studio classes at this address.</p>
          <p><a href={COMPANY_MAPS_URL} target="_blank" rel="noopener noreferrer">{COMPANY_ADDRESS}</a></p>
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
      ['On this website', 'The estimator, wellness planner and partnership form keep the details you enter in the current page until you copy, download or open a WhatsApp draft. Reloading the page clears them. These forms do not create an account, save a health record or send your details automatically.'],
      ['Managed wellness brief', 'For an agreed programme, your coordinator can maintain practical goals, preferences and session feedback. You choose which relevant non-clinical notes can be shared with assigned professionals. Ask your coordinator about access, correction or ending this sharing. Clinical records stay with the responsible provider and are separate from the general wellness brief.'],
      ['WhatsApp', 'If you send the draft to PersonalFitness.id, it is used to qualify and coordinate the request. WhatsApp has its own terms. Keep payment-card, bank, ID and detailed health data out of that chat.'],
      ['Booking records', 'Confirmed sessions need a customer record on our side: name, contact, address type, session IDs, payment status. Health details, if ever required, use a restricted screening route, not the public site.'],
      ['Your choices', 'Ask a human, request a correction, or opt out of further messages. Complaints and safety issues go to a person, not an auto-reply.'],
      ['Company address', COMPANY_ADDRESS + '. WhatsApp ' + WHATSAPP_DISPLAY + '. Email ' + COMPANY_EMAIL + '.'],
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
      ['Quotes and payment', 'Nothing is confirmed until the quote is accepted and payment is verified on the merchant link. Chat messages are not settlement.'],
      ['Prepaid wellness plans', 'The first visit is a paid single session unless your written quote states otherwise. A monthly wellness plan is a four-week block paid ahead with an agreed session count, dates and validity window. There is no automatic renewal. Programme savings apply once to eligible fitness session charges; travel, massage, clinical services, food, rentals and external costs are excluded.'],
      ['Your space', 'You confirm permission to use the villa, home, hotel room or pool. Access failures, unsafe floors and missing permission can stop the session under the refund rules.'],
      ['Liability', 'You participate in physical activity at your own risk within a non-clinical fitness session. We stop work that looks unsafe. We do not accept clinical responsibility we are not qualified to hold.'],
    ],
  },
  refunds: {
    eyebrow: 'Refunds',
    title: 'Reschedule, charge, replace or stop.',
    lede: 'The 24-hour line is the working rule. Programme unused sessions follow the validity window on the quote.',
    cta: 'Ask about a booking',
    blocks: [
      ...cancellationRules.map(([k, v]) => [k, v] as [string, string]),
      ['Payment route', 'Refunds, if due, go back through the same merchant path. We will not ask you to message a card number to “speed it up”.'],
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
      ['What we can do', 'We can still quote personal training, private yoga, mat Pilates and mobility coaching.'],
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
