type EnquiryRecord = {
  kind: 'contact' | 'quote' | 'partner' | 'schedule'
  name: string
  email: string
  phone: string
  company: string
  message: string
  page: string
}

type StoreEnv = NodeJS.ProcessEnv

function labeled(message: string, labels: string[]): string {
  const lines = message.split('\n')
  for (const label of labels) {
    const prefix = label.toLowerCase() + ':'
    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed.toLowerCase().startsWith(prefix)) {
        return trimmed.slice(trimmed.indexOf(':') + 1).replace(/\s+/g, ' ').trim()
      }
    }
  }
  return ''
}

function compact(row: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [key, value] of Object.entries(row)) {
    const text = value.trim()
    if (text) out[key] = text
  }
  return out
}

function unquote(value: string): string {
  const text = value.trim()
  if ((text.startsWith('"') && text.endsWith('"') && text.length >= 2) || (text.startsWith("'") && text.endsWith("'") && text.length >= 2)) {
    return text.slice(1, -1).trim()
  }
  return text
}

export function supabaseCredentials(env: StoreEnv): { url: string; key: string } | null {
  const url = unquote(env.SUPABASE_URL || '').replace(/\/$/, '')
  const key = unquote(env.SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_ANON_KEY || '')
  if (!url || !key) return null
  return { url, key }
}

export function payloadForEnquiry(enquiry: EnquiryRecord): { table: 'inquiries' | 'partner_signups'; row: Record<string, string> } {
  if (enquiry.kind === 'partner') {
    return {
      table: 'partner_signups',
      row: compact({
        company: enquiry.company,
        contact: enquiry.name,
        email: enquiry.email,
        whatsapp: enquiry.phone || labeled(enquiry.message, ['WhatsApp', 'Whatsapp']),
        message: enquiry.message,
      }),
    }
  }
  const areaContext = labeled(enquiry.message, ['Area / venue context', 'Area', 'Areas', 'Lokasi'])
  const city = labeled(enquiry.message, ['City'])
  const area = areaContext || city
  return {
    table: 'inquiries',
    row: compact({
      name: enquiry.name,
      email: enquiry.email,
      whatsapp: enquiry.phone || labeled(enquiry.message, ['WhatsApp', 'Whatsapp']),
      villa_or_hotel: enquiry.company,
      area,
      service: labeled(enquiry.message, ['Service']),
      preferred_date: labeled(enquiry.message, ['Preferred date / time', 'Preferred date', 'Start date']),
      message: enquiry.message,
      source_page: enquiry.page,
    }),
  }
}

export async function storeEnquiry(env: StoreEnv, enquiry: EnquiryRecord): Promise<{ stored: boolean; status?: number }> {
  const credentials = supabaseCredentials(env)
  if (!credentials) return { stored: false }
  const { table, row } = payloadForEnquiry(enquiry)
  if (!Object.keys(row).length) return { stored: false }
  const response = await fetch(`${credentials.url}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: credentials.key,
      Authorization: `Bearer ${credentials.key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
    signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) {
    const status = response.status
    await response.text().catch(() => '')
    console.error('enquiry supabase store failed', table, status)
    return { stored: false, status }
  }
  return { stored: true, status: response.status }
}
