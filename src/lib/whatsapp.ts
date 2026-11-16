export const WHATSAPP_E164 = '628113803488'
export const WHATSAPP_DISPLAY = '+62 811-3803-488'

const REF_KEY = 'pf_partner_ref'
const defaultMessage = "Hi PersonalFitness.id, I'd like a private session in Bali or Jakarta."

export function partnerRef() {
  if (typeof window === 'undefined') return ''
  try {
    return sessionStorage.getItem(REF_KEY) || ''
  } catch {
    return ''
  }
}

export function capturePartnerRef(search = typeof window === 'undefined' ? '' : window.location.search) {
  if (typeof window === 'undefined') return ''
  const raw = new URLSearchParams(search).get('ref') || ''
  const code = raw.trim().toUpperCase()
  if (!/^[A-Z0-9_-]{2,24}$/.test(code)) return partnerRef()
  try {
    sessionStorage.setItem(REF_KEY, code)
  } catch {
    /* ignore */
  }
  return code
}

export function withPartnerRef(message: string) {
  const code = partnerRef()
  if (!code || /(?:^|\n)Ref:/i.test(message)) return message
  return message.replace(/\s+$/, '') + '\nRef: ' + code
}

export function whatsappDraftUrl(message = defaultMessage) {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(withPartnerRef(message))}`
}

export const PARTNER_ENQUIRY_MESSAGE = 'Hi PersonalFitness.id, I manage villas and want the partner menu. Company: ___ · Villas: ___ · Areas: ___'
export const PARTNER_ENQUIRY_MESSAGE_ID = 'Halo PersonalFitness.id, saya mengelola villa dan ingin menu partner. Perusahaan: ___ · Jumlah villa: ___ · Lokasi: ___'

export function guestMenuMessage(villa: string, code: string) {
  const place = villa || 'a partner villa'
  const tag = code ? ` (${code})` : ''
  return `Hi, I'm staying at ${place}${tag}. I'd like to book: ___ · Day/time: ___ · People: ___`
}
