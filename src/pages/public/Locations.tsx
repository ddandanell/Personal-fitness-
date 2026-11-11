import { ArrowUpRight, Check, MapPin } from 'lucide-react'
import { Link } from 'react-router'
import { PageIntro, ParallaxImage } from '@/components/Primitives'

const cities = [
  {
    city: 'Bali',
    title: 'Your villa, your routine, your space.',
    copy: 'Keep your training or practice close to where you are staying or living. Share your area and venue type, and we will check whether the session, setting and schedule can be coordinated for you.',
    detail: 'For visitors, longer-stay residents, pairs, households and small groups looking for a private session in a suitable villa, home or other approved space.',
    image: '/images/professionals/lila-prameswari.webp',
    alt: 'Representative private yoga session in a tropical indoor-outdoor setting',
  },
  {
    city: 'Jakarta',
    title: 'A private session that works around your day.',
    copy: 'Make room for training, yoga or mat Pilates without crossing the city for a class. Tell us your neighbourhood, preferred window and available space so we can review the right session format.',
    detail: 'For busy professionals, beginners, returning participants, pairs and households who prefer the convenience of a coordinated private session.',
    image: '/images/professionals/sofia-wijaya.webp',
    alt: 'Representative private mat Pilates session in a city apartment',
  },
]

export default function Locations() {
  return <>
    <PageIntro eyebrow="Bali & Jakarta" title="Your session starts with where you are." description="Tell us your city, area and setting. We confirm professional availability, location feasibility, timing and the full quote before you decide to proceed." />
    <section className="section"><div className="shell city-list">{cities.map((city) => <article className="city-feature" key={city.city}>
      <ParallaxImage src={city.image} alt={city.alt} caption="Representative session imagery; not a specific service location." />
      <div className="city-copy"><p className="eyebrow"><MapPin size={14} />{city.city}</p><h2>{city.title}</h2><p className="large-copy">{city.copy}</p><p>{city.detail}</p><Link to={`/contact?city=${city.city}`} className="button button-dark">Enquire for {city.city}<ArrowUpRight size={16} /></Link></div>
    </article>)}</div></section>
    <section className="section-compact section-light"><div className="shell split-feature"><div><h2>What we consider before confirming your location.</h2></div><div><ul className="check-list large-list">{['A suitable space and permission to use it', 'Access, parking and realistic travel timing', 'Participants, mats and any required equipment', 'Any venue or travel cost that belongs in your quote'].map((item) => <li key={item}><Check size={19} />{item}</li>)}</ul><p className="small muted">An enquiry tells us where you would like to train. It does not guarantee coverage or availability until the details are confirmed.</p></div></div></section>
  </>
}
