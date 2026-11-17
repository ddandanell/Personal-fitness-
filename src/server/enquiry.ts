import { COMPANY_EMAIL } from '@/data/company'
import { extractAddress, safeFromHeader, smtpSend, type OutboundMail } from './smtp'

export type EnquiryKind = 'contact' | 'quote' | 'partner' | 'schedule'
export type EnquiryCode = 'invalid' | 'missing_name' | 'invalid_email' | 'missing_message' | 'invalid_kind' | 'unavailable' | 'rate' | 'forbidden' | 'send_failed'

type EnquiryEnv = NodeJS.ProcessEnv

type ParsedEnquiry = {
  kind: EnquiryKind
  name: string
  email: string
  phone: string
  company: string
  message: string
  page: string
}

const KINDS = new Set<EnquiryKind>(['contact', 'quote', 'partner', 'schedule'])
const hits = new Map<string, number[]>()

export function resetEnquiryLimits() {
  hits.clear()
}

export function mailProvider(env: EnquiryEnv): 'resend' | 'smtp' | 'none' {
  if (env.RESEND_API_KEY?.trim()) return 'resend'
  if (env.SMTP_HOST?.trim() && env.SMTP_USER?.trim() && env.SMTP_PASS) return 'smtp'
  return 'none'
}

function cleanLine(value: unknown, max: number): string {
  let text = ''
  for (const char of String(value ?? '')) {
    const code = char.charCodeAt(0)
    text += code < 32 || code === 127 ? ' ' : char
  }
  return text.replace(/\s+/g, ' ').trim().slice(0, max)
}

function failure(status: number, code: EnquiryCode, error: string) {
  return { status, body: { ok: false as const, code, error } }
}

function limited(ip: string): boolean {
  const now = Date.now()
  if (hits.size > 5000) hits.clear()
  const recent = (hits.get(ip) || []).filter((time) => now - time < 15 * 60 * 1000)
  if (recent.length >= 8) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  return false
}

function allowedOrigin(origin?: string, referer?: string): boolean {
  const candidate = origin || referer
  if (!candidate) return true
  try {
    const host = new URL(candidate).hostname
    return host === 'www.personalfitness.id' || host === 'personalfitness.id' || host === 'localhost' || host === '127.0.0.1'
  } catch {
    return false
  }
}

function parseEnquiry(raw: unknown): { ok: true; value: ParsedEnquiry } | { ok: false; code: EnquiryCode; error: string } {
  if (!raw || typeof raw !== 'object') return { ok: false, code: 'invalid', error: 'Check the form and try again.' }
  const input = raw as Record<string, unknown>
  const kind = cleanLine(input.kind, 20) as EnquiryKind
  if (!KINDS.has(kind)) return { ok: false, code: 'invalid_kind', error: 'Check the form and try again.' }
  const name = cleanLine(input.name, 100)
  if (name.length < 1) return { ok: false, code: 'missing_name', error: 'Add your name.' }
  const email = extractAddress(cleanLine(input.email, 180))
  if (!email) return { ok: false, code: 'invalid_email', error: 'Add a valid email address so we can reply.' }
  const message = String(input.message ?? '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim()
  if (message.length < 10 || message.length > 8000) return { ok: false, code: 'missing_message', error: 'Add the practical details of the request.' }
  if (/\d(?:[ -]?\d){12,}/.test(message)) return { ok: false, code: 'invalid', error: 'Keep card numbers and long ID numbers out of this message.' }
  const page = cleanLine(input.page, 200)
  const safePage = page.startsWith('/') || page.startsWith('https://www.personalfitness.id') || page.startsWith('https://personalfitness.id') ? page : ''
  return {
    ok: true,
    value: {
      kind,
      name,
      email,
      phone: cleanLine(input.phone, 40),
      company: cleanLine(input.company, 120),
      message,
      page: safePage,
    },
  }
}

function mailFor(env: EnquiryEnv, enquiry: ParsedEnquiry): OutboundMail {
  const to = extractAddress(env.ENQUIRY_TO_EMAIL || '') || COMPANY_EMAIL
  const from = safeFromHeader(env.ENQUIRY_FROM_EMAIL || `PersonalFitness.id <${COMPANY_EMAIL}>`, COMPANY_EMAIL)
  const labels = { contact: 'Contact', quote: 'Quote', partner: 'Villa partner', schedule: 'Schedule' }
  return {
    from,
    to,
    replyTo: enquiry.email,
    subject: `${labels[enquiry.kind]} enquiry from ${enquiry.name}`.slice(0, 140),
    text: [
      `Website ${labels[enquiry.kind].toLowerCase()} enquiry`,
      `Page: ${enquiry.page || 'not supplied'}`,
      '',
      `Name: ${enquiry.name}`,
      `Email: ${enquiry.email}`,
      `Phone: ${enquiry.phone || '—'}`,
      `Company: ${enquiry.company || '—'}`,
      '',
      enquiry.message,
    ].join('\n'),
  }
}

async function deliver(env: EnquiryEnv, mail: OutboundMail): Promise<void> {
  const provider = mailProvider(env)
  if (provider === 'resend') {
    const apiKey = env.RESEND_API_KEY?.trim() || ''
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: mail.from, to: [mail.to], reply_to: mail.replyTo, subject: mail.subject, text: mail.text }),
      signal: AbortSignal.timeout(12000),
    })
    if (!response.ok) {
      let detail = ''
      try {
        const payload = await response.json() as { message?: string }
        detail = typeof payload.message === 'string' ? payload.message.slice(0, 180) : ''
      } catch { /* The status is enough when the body is not JSON. */ }
      if (detail.includes(apiKey)) detail = ''
      console.error('enquiry resend failed', response.status, detail)
      throw new Error('resend')
    }
    return
  }
  const port = Number(env.SMTP_PORT || '465')
  if (port !== 465 && port !== 587) throw new Error('smtp-port')
  await smtpSend({
    host: env.SMTP_HOST?.trim() || '',
    port,
    mode: port === 465 ? 'tls' : 'starttls',
    user: env.SMTP_USER?.trim() || '',
    pass: env.SMTP_PASS || '',
    mail,
  })
}

const unavailable = `We could not send this from the website just now. Email ${COMPANY_EMAIL} and we will reply.`

export async function handleEnquiry(raw: unknown, options: {
  ip?: string
  origin?: string
  referer?: string
  env?: EnquiryEnv
  send?: (mail: OutboundMail) => Promise<void>
} = {}) {
  const body = typeof raw === 'string' ? safeJson(raw) : raw
  if (!allowedOrigin(options.origin, options.referer)) return failure(403, 'forbidden', unavailable)
  const ip = options.ip || 'unknown'
  if (limited(ip)) return failure(429, 'rate', `Too many messages just now. Email ${COMPANY_EMAIL} and we will reply.`)
  if (body && typeof body === 'object' && cleanLine((body as Record<string, unknown>).website, 200)) {
    return { status: 200, body: { ok: true as const } }
  }
  const parsed = parseEnquiry(body)
  if (!parsed.ok) return failure(400, parsed.code, parsed.error)
  const env = options.env || process.env
  const mail = mailFor(env, parsed.value)
  try {
    if (options.send) await options.send(mail)
    else if (mailProvider(env) === 'none') return failure(503, 'unavailable', unavailable)
    else await deliver(env, mail)
  } catch (error) {
    const name = error instanceof Error ? error.message.replace(/[\r\n]/g, ' ').slice(0, 80) : 'send'
    if (!name.toLowerCase().includes('key') && !name.toLowerCase().includes('pass')) console.error('enquiry send failed', name)
    return failure(502, 'send_failed', unavailable)
  }
  return { status: 200, body: { ok: true as const } }
}

function safeJson(value: string): unknown {
  if (value.length > 20000) return null
  try { return JSON.parse(value) } catch { return null }
}

export function clientIp(headers: Record<string, string | string[] | undefined>, fallback = ''): string {
  const forwarded = headers['x-forwarded-for']
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded
  return (value || '').split(',')[0]?.trim() || fallback
}

export { buildRfc822 } from './smtp'
