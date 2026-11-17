import { COMPANY_EMAIL } from '@/data/company'

export type EnquiryKind = 'contact' | 'quote' | 'partner' | 'schedule'

export type EnquiryInput = {
  kind: EnquiryKind
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  page?: string
  website?: string
}

const unavailable = `We could not send this from the website just now. Email ${COMPANY_EMAIL} and we will reply.`

const english: Record<string, string> = {
  missing_name: 'Add your name.',
  invalid_email: 'Add a valid email address so we can reply.',
  missing_message: 'Add the practical details of the request.',
  invalid_kind: 'Check the form and try again.',
  invalid: 'Check the form and try again.',
  unavailable,
  send_failed: unavailable,
  forbidden: unavailable,
  rate: `Too many messages just now. Email ${COMPANY_EMAIL} and we will reply.`,
}

const indonesian: Record<string, string> = {
  missing_name: 'Isi nama Anda.',
  invalid_email: 'Isi email yang valid agar kami bisa membalas.',
  missing_message: 'Lengkapi detail praktis permintaannya.',
  invalid_kind: 'Periksa formulirnya, lalu coba lagi.',
  invalid: 'Periksa formulirnya, lalu coba lagi.',
  unavailable: `Formulir ini belum terkirim. Email ${COMPANY_EMAIL} dan kami akan membalas.`,
  send_failed: `Formulir ini belum terkirim. Email ${COMPANY_EMAIL} dan kami akan membalas.`,
  forbidden: `Formulir ini belum terkirim. Email ${COMPANY_EMAIL} dan kami akan membalas.`,
  rate: `Terlalu banyak pesan. Email ${COMPANY_EMAIL} dan kami akan membalas.`,
}

export function enquiryMessage(code: string, lang: 'en' | 'id' = 'en'): string {
  const table = lang === 'id' ? indonesian : english
  return table[code] || table.unavailable
}

export async function submitEnquiry(input: EnquiryInput, lang: 'en' | 'id' = 'en'): Promise<{ ok: true } | { ok: false; message: string; code: string }> {
  try {
    const response = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(input),
    })
    const data = await response.json().catch(() => null) as { ok?: boolean; code?: string } | null
    if (response.ok && data?.ok) return { ok: true }
    const code = data?.code || 'unavailable'
    return { ok: false, code, message: enquiryMessage(code, lang) }
  } catch {
    return { ok: false, code: 'unavailable', message: enquiryMessage('unavailable', lang) }
  }
}
