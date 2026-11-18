import { RESCHEDULE_NOTE, RESCHEDULE_NOTE_ID, REPLY_HOURS, REPLY_HOURS_ID, PAYMENT_INSTRUCTIONS } from '@/data/offerCopy'

export function PolicySummary({ lang = 'en' }: { lang?: 'en' | 'id' }) {
  return <div className="public-policy-summary"><p>{lang === 'id' ? RESCHEDULE_NOTE_ID : RESCHEDULE_NOTE}</p><p>{lang === 'id' ? 'Instruksi pembayaran tercantum pada kutipan tertulis. Kami tidak meminta data kartu atau rekening bank melalui WhatsApp.' : PAYMENT_INSTRUCTIONS}</p><p>{lang === 'id' ? REPLY_HOURS_ID : REPLY_HOURS}</p></div>
}
