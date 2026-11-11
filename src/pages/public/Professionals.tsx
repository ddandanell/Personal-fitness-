import { ArrowUpRight, Check, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { Eyebrow, PageIntro, ParallaxImage } from '@/components/Primitives'
import { CtaBand, ProfessionalGrid } from '@/components/SiteBlocks'
import { getService, services } from '@/data/catalog'
import { getProfessional, professionals } from '@/data/professionals'
import articleData from '@/data/professional-articles.json'
import NotFound from './NotFound'

export function Professionals() {
  const [search, setSearch] = useState('')
  const [service, setService] = useState('')
  const [city, setCity] = useState('')
  const filtered = useMemo(() => professionals.filter((person) => (!search || (person.name + ' ' + person.role + ' ' + person.focus).toLowerCase().includes(search.toLowerCase())) && (!service || person.services.includes(service)) && (!city || person.cities.some((value) => value === city))), [search, service, city])
  return <>
    <PageIntro eyebrow="A more personal approach" title="Find the approach that feels right." description="Explore 26 detailed instructor and specialist profile guides, from strength and yoga to private massage, nutrition and family support. Each explains the kind of approach you can discuss when we match the actual professional for your visit."><Link to="/professional-standards" className="button button-outline">Our matching standards</Link></PageIntro>
    <section className="section-compact"><div className="shell">
      <div className="profile-disclosure"><strong>Illustrative profiles and AI-generated portraits.</strong><p>These guides are not a verified staff roster. Names, biographies and images illustrate a service approach. We confirm real identity, relevant qualifications, language, area and availability for the professional proposed in your written quote.</p></div>
      <div className="directory-toolbar"><label className="directory-search"><Search size={18} /><span className="sr-only">Search profiles</span><input type="search" placeholder="Search a name or approach..." value={search} onChange={(event) => setSearch(event.target.value)} /></label><label className="directory-select"><span>Service approach</span><select value={service} onChange={(event) => setService(event.target.value)}><option value="">Every approach</option>{services.filter((item) => professionals.some((person) => person.services.includes(item.slug))).map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}</select></label><label className="directory-select"><span>City interest</span><select value={city} onChange={(event) => setCity(event.target.value)}><option value="">Bali and Jakarta</option><option>Bali</option><option>Jakarta</option></select></label></div>
      <p className="directory-count" aria-live="polite">{filtered.length} profile {filtered.length === 1 ? 'guide' : 'guides'}</p>
      {filtered.length ? <ProfessionalGrid people={filtered} /> : <div className="directory-empty"><h2>Let us help with the right match.</h2><p>Try another approach or send the coordinator your preferred service.</p><Link to="/contact" className="button button-primary">Ask for a match<ArrowUpRight size={16} /></Link></div>}
    </div></section>
    <CtaBand dark title="Tell us the support you want." copy="Your preferences guide the match. The real professional and exact scope are confirmed before you decide to book." />
  </>
}

export function ProfessionalDetail() {
  const { slug } = useParams()
  const person = slug ? getProfessional(slug) : undefined
  if (!person) return <NotFound />
  const sessionList = person.services.map((item) => getService(item)).filter(Boolean)
  const article = (articleData as Record<string, { title: string; body: string }[]>)[person.slug] || []
  const request = '/contact?style=' + person.slug + '&service=' + person.services[0]
  return <>
    <PageIntro eyebrow={person.role + ' · Illustrative profile'} title={person.name} description={person.focus}><p className="profile-type-note">Profile guide and AI-generated portrait. Real professional details are confirmed for your booking.</p><Link to={request} className="button button-primary">Request this approach<ArrowUpRight size={16} /></Link></PageIntro>
    <section className="section-compact"><div className="shell profile-feature"><ParallaxImage src={person.image} alt={person.imageAlt} caption="AI-generated illustrative Indonesian professional. This is not a photograph of a verified staff member." eager /><div className="profile-feature-copy"><Eyebrow>What matters to you</Eyebrow><h2>A thoughtful private visit, with the details agreed.</h2><p>{person.bio}</p><ul className="check-list">{person.style.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul><p className="profile-city-interest">Request area interest: {person.cities.join(' / ')}. Actual coverage and language confirmed individually.</p></div></div></section>
    <section className="section section-light"><div className="shell profile-reading-layout"><article className="profile-article">{article.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}</article><aside className="profile-reading-aside"><Eyebrow>Service approaches</Eyebrow><h3>Explore the relevant visits.</h3>{sessionList.map((service) => service && <Link to={'/' + service.slug} className="profile-service-link" key={service.slug}><span>{service.title}</span><ArrowUpRight size={15} /></Link>)}<p>No slot is reserved by choosing a profile guide. The coordinator checks the real professional and your request.</p><Link to={request} className="button button-primary">Find a matching professional<ArrowUpRight size={16} /></Link></aside></div></section>
    <section className="section-compact"><div className="shell"><div className="section-title"><div><Eyebrow>More approaches</Eyebrow><h2>Different people, different ways to begin.</h2></div><Link to="/professionals" className="text-link">Browse all profiles<ArrowUpRight size={16} /></Link></div><ProfessionalGrid people={professionals.filter((item) => item.slug !== person.slug && item.services.some((service) => person.services.includes(service))).slice(0, 3)} /></div></section>
    <CtaBand dark title="Bring the right approach to your place." copy="Share your service, area and preferred dates. We confirm the actual person, the practical plan and a complete quote." to={request} />
  </>
}
