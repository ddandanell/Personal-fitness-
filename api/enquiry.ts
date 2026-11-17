import { clientIp, handleEnquiry } from '../src/server/enquiry'

type HeaderValue = string | string[] | undefined

type EnquiryRequest = {
  method?: string
  body?: unknown
  headers: Record<string, HeaderValue>
  socket?: { remoteAddress?: string | null }
}

type EnquiryResponse = {
  status: (code: number) => EnquiryResponse
  json: (body: unknown) => void
  setHeader: (name: string, value: string) => void
}

function header(headers: EnquiryRequest['headers'], name: string): string | undefined {
  const value = headers[name] ?? headers[name.toLowerCase()]
  return Array.isArray(value) ? value[0] : value
}

export default async function handler(req: EnquiryRequest, res: EnquiryResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ ok: false, code: 'invalid', error: 'Method not allowed' })
    return
  }
  const result = await handleEnquiry(req.body, {
    ip: clientIp(req.headers, req.socket?.remoteAddress || ''),
    origin: header(req.headers, 'origin'),
    referer: header(req.headers, 'referer'),
  })
  res.status(result.status).json(result.body)
}
