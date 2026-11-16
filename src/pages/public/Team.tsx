import { Link } from 'react-router'
import { PageIntro } from '@/components/Primitives'
import { COMPANY_EMAIL, COMPANY_EMAIL_HREF } from '@/data/company'
import { WHATSAPP_DISPLAY, whatsappDraftUrl } from '@/lib/whatsapp'
import { trackWhatsApp } from '@/lib/analytics'
import { founderReady, partner, visibleCoaches } from '@/config/partner'

export default function Team() {
  const founder = founderReady ? partner.FOUNDER : null
  return (
    <>
      <PageIntro eyebrow="Team" title="The people behind a confirmed hour." description="PersonalFitness.id is a company-managed service. The coach who arrives is named on your written quote. We do not publish a public trainer directory.">
        <Link to="/professional-standards" className="button button-outline">How we match coaches</Link>
      </PageIntro>
      <section className="section">
        <div className="shell team-grid">
          {founder && (
            <article className="team-card">
              <img src={founder.photo} alt={founder.name} width="640" height="800" />
              <p className="eyebrow">{founder.role || 'Founder'}</p>
              <h2>{founder.name}</h2>
              <p>{founder.bio}</p>
              {founder.whatsapp && <a className="button button-primary" href={whatsappDraftUrl('Hi PersonalFitness.id, I would like to speak with the founder about a villa partnership.')} onClick={() => trackWhatsApp('team_founder')}>WhatsApp</a>}
            </article>
          )}
          <article className="team-card">
            <p className="eyebrow">Coordinator</p>
            <h2>A named coordinator on every confirmed visit.</h2>
            <p>After you send a window, a coordinator matches the session, cluster and access notes, then names the professional on the quote. WhatsApp {WHATSAPP_DISPLAY}. Email <a href={COMPANY_EMAIL_HREF}>{COMPANY_EMAIL}</a>.</p>
          </article>
          {visibleCoaches.map((coach) => (
            <article className="team-card" key={coach.firstName}>
              <img src={coach.photo} alt={coach.firstName} width="640" height="800" />
              <p className="eyebrow">{coach.disciplines.join(' · ')}</p>
              <h2>{coach.firstName}</h2>
              <p>{coach.certification} — {coach.issuer}, {coach.year}.</p>
              <p>{coach.languages.join(', ')}. {coach.areas.join(', ')}.</p>
            </article>
          ))}
        </div>
        {!founder && visibleCoaches.length === 0 && (
          <div className="content-shell" style={{ marginTop: 28 }}>
            <p>We publish a coach’s first name, disciplines and real certifications here only when the person has given a photograph and a certificate we can show. Until then, the confirmation names the professional for your hour.</p>
            <p>Villa managers can start on the <Link to="/villa-hotel-partners">partner programme</Link>. Guests start on <Link to="/contact">WhatsApp</Link>.</p>
          </div>
        )}
      </section>
    </>
  )
}
