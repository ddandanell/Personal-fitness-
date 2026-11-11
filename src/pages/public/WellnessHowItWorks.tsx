import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router'
import { Eyebrow, PageIntro } from '@/components/Primitives'
import { CtaBand } from '@/components/SiteBlocks'
import { WeeklyRhythm, WellnessProfileStory } from '@/components/WellnessStory'

const steps = [
  ['01', 'Tell us what a good week looks like.', 'Choose a single session or mix services. Share your city, area, dates, group size and general preferences. A family might choose Tuesday yoga for two, Thursday massage and a Friday personal trainer.'],
  ['02', 'Try one paid visit.', 'We match the right professional, check your space and agree the full price. Your first visit is paid at the agreed single-session rate. Use it to see whether the approach, timing and pace suit you.'],
  ['03', 'Build your personal schedule.', 'When you want to continue, your coordinator combines the services into a practical weekly rhythm. We agree exact dates, who attends each visit, equipment, access and a suitable backup arrangement before confirming.'],
  ['04', 'Prepay your agreed block.', 'Choose two, three or four weeks. A monthly plan means a four-week block paid ahead, with a written session count. Six, nine and twelve eligible fitness visits receive 5%, 8% and 12% savings. There is no automatic renewal.'],
  ['05', 'Create one wellness brief.', 'Agree the goals, teaching preferences and practical notes you want your coordinator to keep. You choose which relevant non-clinical information may be shared with assigned coaches. Sensitive clinical records are handled separately by the appropriate professional.'],
  ['06', 'Keep every visit connected.', 'After each visit, the professional reports the agreed activities, feedback and next-session considerations to your coordinator. Your next coach can work from the relevant agreed notes, so the programme feels connected as your preferences evolve.'],
]

export default function WellnessHowItWorks() {
  return <><PageIntro eyebrow="How it works" title="All your wellness. One thoughtful plan." description="Private visits that fit together, from your first paid session to a month of personalised support. One coordinator keeps the schedule, professionals and practical details connected."><Link to="/wellness-plan" className="button button-primary">Build my wellness week<ArrowUpRight size={16} /></Link></PageIntro><WeeklyRhythm compact /><section className="section"><div className="content-shell process-list">{steps.map(([number, title, copy]) => <article key={number}><span className="process-number">{number}</span><div><h2>{title}</h2><p>{copy}</p></div></article>)}</div></section><WellnessProfileStory /><section className="section"><div className="shell split-feature"><div><Eyebrow>Before you pay</Eyebrow><h2>Know exactly what is included.</h2></div><ul className="check-list large-list">{['A named service and participant count for every visit', 'Your actual professional and confirmed dates', 'The complete session, travel and equipment charges', 'A visible programme saving on eligible visits', 'Cancellation, validity and unused-session terms', 'The sharing choices for your managed wellness brief'].map((text) => <li key={text}><Check size={18} />{text}</li>)}</ul></div></section><CtaBand dark title="Your next good week starts here." copy="Create your weekly rhythm, review the planning price and send the schedule to your coordinator." label="Create my schedule" to="/wellness-plan" /></>
}
