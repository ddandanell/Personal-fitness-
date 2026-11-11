import { Download, FileText, MessageCircle, RotateCcw, ShieldAlert } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { CopyButton, Field, PageIntro } from '@/components/Primitives'
import { downloadText } from '@/lib/downloadText'
import { services } from './serviceRegistry'

type Planner = { service: string; city: string; area: string; timing: string; participants: string; goals: string; acknowledgement: boolean }
const empty: Planner = { service: '', city: '', area: '', timing: '', participants: '1', goals: '', acknowledgement: false }

export default function Contact() {
  const [params] = useSearchParams()
  const requested = params.get('service') || ''
  const requestedService = services.find((item) => item.slug === requested)
  const requestedCity = params.get('city')
  const [form, setForm] = useState<Planner>({ ...empty, service: requestedService?.slug || '', city: requestedCity === 'Bali' || requestedCity === 'Jakarta' ? requestedCity : '' })
  const [generated, setGenerated] = useState('')
  const [error, setError] = useState('')
  const selected = services.find((item) => item.slug === form.service)

  function update<K extends keyof Planner>(key: K, value: Planner[K]) {
    setForm((current) => ({ ...current, [key]: value }))
    setGenerated('')
    setError('')
  }

  function generate(event: React.FormEvent) {
    event.preventDefault()
    if (!form.service || !form.city || !form.area.trim() || !form.timing.trim() || !form.participants) {
      setError('Please complete the service, city, area, preferred timing and participants.')
      return
    }
    if (Number(form.participants) < 1 || Number(form.participants) > 20) {
      setError('Please enter between 1 and 20 participants. For a larger group, describe your event in the goals field.')
      return
    }
    if (!form.acknowledgement) {
      setError('Please confirm that your message contains no sensitive health, identity or payment details.')
      return
    }
    const output = [
      'Hello PersonalFitness.id. I would like to check the availability of a private session.',
      '',
      `Service: ${selected?.title || form.service}`,
      `City: ${form.city}`,
      `Area / venue context: ${form.area.trim()}`,
      `Preferred date / time: ${form.timing.trim()}`,
      `Participants: ${form.participants}`,
      `Goals or preferences: ${form.goals.trim() || 'I would like to discuss this with the coordinator'}`,
      '',
      'Please confirm the professional, location, availability, full price, inclusions and cancellation terms before I make any payment.',
      'I understand this enquiry is not a booking confirmation.',
    ].join('\n')
    setGenerated(output)
    setError('')
    window.setTimeout(() => document.getElementById('message-preview')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50)
  }

  function reset() { setForm(empty); setGenerated(''); setError('') }

  return <>
    <PageIntro eyebrow="Your private session" title="Tell us what you have in mind." description="Share the practical details and create a clear message for the official PersonalFitness.id WhatsApp conversation. This website does not send the message or make a booking." />
    <section className="section-compact"><div className="shell enquiry-layout">
      <form className="enquiry-form" onSubmit={generate} noValidate>
        <div className="enquiry-warning"><ShieldAlert size={22} /><div><strong>Keep sensitive details out of this form and WhatsApp.</strong><p>Do not include full payment-card, financial-account, personal-ID, detailed health or similar sensitive information.</p></div></div>
        <div className="form-grid">
          <Field label="Service *"><select value={form.service} onChange={(event) => update('service', event.target.value)} required><option value="">Choose a service</option>{services.map((item) => <option value={item.slug} key={item.slug}>{item.title}</option>)}</select></Field>
          <Field label="City *"><select value={form.city} onChange={(event) => update('city', event.target.value)} required><option value="">Choose a city</option><option>Bali</option><option>Jakarta</option></select></Field>
          <Field label="Area / venue context *" hint="Your area and venue type are enough at this stage."><input value={form.area} onChange={(event) => update('area', event.target.value)} placeholder="e.g. Canggu, private villa" maxLength={120} required /></Field>
          <Field label="Preferred date / time *"><input value={form.timing} onChange={(event) => update('timing', event.target.value)} placeholder="e.g. 18 November, 07:00–09:00" maxLength={120} required /></Field>
          <Field label="Participants *"><input type="number" min="1" max="20" value={form.participants} onChange={(event) => update('participants', event.target.value)} required /></Field>
          <Field label="Goals / preferences" hint="General fitness goals only; no medical history."><input value={form.goals} onChange={(event) => update('goals', event.target.value)} placeholder="e.g. general strength, beginner-friendly" maxLength={300} /></Field>
        </div>
        {selected && <p className="selected-service"><strong>{selected.title}:</strong> {selected.short}</p>}
        <label className="consent-row"><input type="checkbox" checked={form.acknowledgement} onChange={(event) => update('acknowledgement', event.target.checked)} /><span>I confirm that I have included no sensitive health, identity or payment details.</span></label>
        <p className="form-message form-error" role="alert">{error}</p>
        <div className="cluster"><button type="submit" className="button button-primary"><FileText size={16} />Create enquiry message</button><button type="button" className="button button-outline" onClick={reset}><RotateCcw size={15} />Reset</button></div>
      </form>
      <aside className="enquiry-aside"><MessageCircle size={28} /><p className="eyebrow eyebrow-light">One clear conversation</p><h2>Start with the practical details.</h2><ol><li>Tell us what you want and where.</li><li>Let us check the professional, venue and schedule.</li><li>Review your complete quote and terms.</li><li>Proceed only when the details are clear.</li></ol><p>Your entries stay in this page until you choose to copy or download your message. This website does not transmit the form.</p></aside>
    </div>
    {generated && <div className="content-shell message-section" id="message-preview"><div className="message-heading"><div><p className="eyebrow">Ready to copy</p><h2>Your enquiry message</h2></div><span className="draft-label">Draft only</span></div><pre>{generated}</pre><div className="cluster"><CopyButton value={generated} label="Copy enquiry message" /><button type="button" className="button button-outline" onClick={() => downloadText('PersonalFitness-enquiry.txt', generated)}><Download size={16} />Download .txt</button></div><p className="small muted">This message has not been sent and your session is not booked. Copy it into the official PersonalFitness.id WhatsApp conversation to begin your request.</p></div>}
    </section>
  </>
}
