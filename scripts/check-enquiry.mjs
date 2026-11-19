import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import net from 'node:net'
import path from 'node:path'
import { createServer } from 'vite'

const root = process.cwd()
const company = await fs.readFile(new URL('../src/data/company.ts', import.meta.url), 'utf8')
const email = company.match(/COMPANY_EMAIL = '([^']+)'/)?.[1]
assert.equal(email, 'hello@personalfitness.id')

const skipDirs = new Set(['node_modules', 'dist', '.git'])
const emailRe = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g
const textFile = (name) => /\.(ts|tsx|js|mjs|jsx|json|md|txt|html|css|yml|yaml|example)$/.test(name) || name === '.env.example'

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (skipDirs.has(entry.name) || entry.name === 'package-lock.json' || entry.name === 'check-enquiry.mjs') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) await walk(full)
    else if (textFile(entry.name)) {
      const text = await fs.readFile(full, 'utf8')
      for (const found of text.match(emailRe) || []) {
        assert.equal(found.toLowerCase(), email, full + ' uses ' + found)
      }
    }
  }
}
await walk(root)

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
  optimizeDeps: { noDiscovery: true },
})
try {
  const enquiry = await vite.ssrLoadModule('/src/server/enquiry.ts')
  const smtp = await vite.ssrLoadModule('/src/server/smtp.ts')
  const valid = {
    kind: 'quote',
    name: 'Ada',
    email: 'ada@example.com',
    message: 'Private Strength Training in Canggu tomorrow morning for one person.',
    page: '/contact',
  }

  enquiry.resetEnquiryLimits()
  const missing = await enquiry.handleEnquiry({}, { env: {}, ip: '203.0.113.10' })
  assert.equal(missing.status, 400)
  assert.equal(missing.body.code, 'invalid_kind')

  let sent = null
  const honeypot = await enquiry.handleEnquiry({ ...valid, website: 'https://spam.test' }, {
    env: {},
    ip: '203.0.113.11',
    send: async () => { sent = true },
  })
  assert.equal(honeypot.status, 200)
  assert.equal(honeypot.body.ok, true)
  assert.equal(sent, null)

  const delivered = await enquiry.handleEnquiry(valid, {
    env: { RESEND_API_KEY: 're_test_secret' },
    ip: '203.0.113.12',
    origin: 'https://www.personalfitness.id',
    send: async (mail) => { sent = mail },
  })
  assert.equal(delivered.status, 200)
  assert.equal(sent.replyTo, 'ada@example.com')
  assert.equal(sent.to, email)
  assert.equal(sent.from.includes(email), true)
  assert.equal(JSON.stringify(sent).includes('re_test_secret'), false)

  const unconfigured = await enquiry.handleEnquiry(valid, { env: {}, ip: '203.0.113.13', origin: 'https://www.personalfitness.id' })
  assert.equal(unconfigured.status, 503)
  assert.equal(unconfigured.body.code, 'unavailable')
  assert.equal(unconfigured.body.error.includes(email), true)

  const injected = await enquiry.handleEnquiry({ ...valid, email: 'ada@example.com\nBcc: bad@evil.test' }, {
    env: { RESEND_API_KEY: 'x' },
    ip: '203.0.113.14',
    send: async () => { throw new Error('should not send') },
  })
  assert.equal(injected.status, 400)

  const partnerPhone = await enquiry.handleEnquiry({
    kind: 'partner',
    name: 'Sari',
    email: 'sari@example.com',
    phone: '+62 812-3456-7890',
    message: 'Hi PersonalFitness.id, I manage villas in Canggu.\nWhatsApp: +62 812-3456-7890\nCompany: Sari Villas',
    page: '/villa-hotel-partners',
  }, {
    env: {},
    ip: '203.0.113.60',
    origin: 'https://personalfitness-git-example.vercel.app',
    send: async () => {},
  })
  assert.equal(partnerPhone.status, 200)
  const card = await enquiry.handleEnquiry({
    ...valid,
    message: 'Please use card 4111 1111 1111 1111 for the session tomorrow morning.',
  }, { env: {}, ip: '203.0.113.61', origin: 'https://www.personalfitness.id' })
  assert.equal(card.status, 400)
  assert.equal(card.body.code, 'invalid')
  const preview = await enquiry.handleEnquiry(valid, { env: {}, ip: '203.0.113.62', origin: 'https://personalfitness-preview.vercel.app' })
  assert.equal(preview.status, 503)

  const cross = await enquiry.handleEnquiry(valid, {
    env: {},
    ip: '203.0.113.15',
    origin: 'https://evil.example',
    send: async () => { throw new Error('should not send') },
  })
  assert.equal(cross.status, 403)
  assert.equal(cross.body.error.includes(email), true)

  const failed = await enquiry.handleEnquiry(valid, {
    env: { RESEND_API_KEY: 're_secret_value' },
    ip: '203.0.113.16',
    send: async () => { throw new Error('resend') },
  })
  assert.equal(failed.status, 502)
  assert.equal(failed.body.error.includes(email), true)
  assert.equal(JSON.stringify(failed.body).includes('re_secret_value'), false)

  enquiry.resetEnquiryLimits()
  const stored = []
  const storedOk = await enquiry.handleEnquiry(valid, {
    env: { RESEND_API_KEY: 'x' },
    ip: '203.0.113.70',
    origin: 'https://www.personalfitness.id',
    send: async () => {},
    store: async (row) => { stored.push(row) },
  })
  assert.equal(storedOk.status, 200)
  assert.equal(stored.length, 1)
  assert.equal(stored[0].kind, 'quote')

  const storeFailed = await enquiry.handleEnquiry(valid, {
    env: { RESEND_API_KEY: 'x' },
    ip: '203.0.113.71',
    origin: 'https://www.personalfitness.id',
    send: async () => {},
    store: async () => { throw new Error('supabase') },
  })
  assert.equal(storeFailed.status, 200)

  let honeypotStored = false
  const honeypotSkip = await enquiry.handleEnquiry({ ...valid, website: 'https://spam.test' }, {
    env: { RESEND_API_KEY: 'x' },
    ip: '203.0.113.73',
    send: async () => {},
    store: async () => { honeypotStored = true },
  })
  assert.equal(honeypotSkip.status, 200)
  assert.equal(honeypotStored, false)

  const storeMod = await vite.ssrLoadModule('/src/server/supabaseStore.ts')
  const inquiryPayload = storeMod.payloadForEnquiry({
    kind: 'contact',
    name: 'Ada',
    email: 'ada@example.com',
    phone: '',
    company: '',
    message: 'Hello\nService: Private Yoga\nCity: Bali\nArea / venue context: Canggu, private villa\nPreferred date / time: next week\n',
    page: '/contact',
  })
  assert.equal(inquiryPayload.table, 'inquiries')
  assert.equal(inquiryPayload.row.service, 'Private Yoga')
  assert.equal(inquiryPayload.row.area, 'Canggu, private villa')
  assert.equal(inquiryPayload.row.preferred_date, 'next week')
  assert.equal(inquiryPayload.row.source_page, '/contact')
  const partnerPayload = storeMod.payloadForEnquiry({
    kind: 'partner',
    name: 'Sari',
    email: 'sari@example.com',
    phone: '+62 812-3456-7890',
    company: 'Sari Villas',
    message: 'Hi PersonalFitness.id, I manage villas in Canggu.',
    page: '/villa-hotel-partners',
  })
  assert.equal(partnerPayload.table, 'partner_signups')
  assert.equal(partnerPayload.row.contact, 'Sari')
  assert.equal(partnerPayload.row.company, 'Sari Villas')
  assert.equal(partnerPayload.row.whatsapp, '+62 812-3456-7890')
  assert.equal(storeMod.supabaseCredentials({}), null)
  assert.equal(Boolean(storeMod.supabaseCredentials({ SUPABASE_URL: 'https://example.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'pub' })), true)

  enquiry.resetEnquiryLimits()
  for (let index = 0; index < 8; index += 1) {
    const result = await enquiry.handleEnquiry(valid, { env: {}, ip: '203.0.113.50', send: async () => {} })
    assert.equal(result.status, 200)
  }
  const blocked = await enquiry.handleEnquiry(valid, { env: {}, ip: '203.0.113.50', send: async () => {} })
  assert.equal(blocked.status, 429)
  assert.equal(blocked.body.error.includes(email), true)

  const raw = smtp.buildRfc822({
    from: `PersonalFitness.id <${email}>`,
    to: email,
    replyTo: 'ada@example.com',
    subject: 'Hello\r\nBcc: bad@evil.test',
    text: 'Line one\n.hidden command\n',
  })
  const headers = raw.split('\r\n\r\n')[0]
  assert.equal(headers.split('\r\n').some((line) => line.toLowerCase().startsWith('bcc:')), false)
  assert.equal(headers.includes('Reply-To: ada@example.com'), true)
  assert.equal(raw.includes('\r\n..hidden command'), true)
  assert.equal(enquiry.mailProvider({}), 'none')
  assert.equal(enquiry.mailProvider({ RESEND_API_KEY: 'x', SMTP_HOST: 'smtp.gmail.com', SMTP_USER: 'a', SMTP_PASS: 'b' }), 'resend')
  assert.equal(enquiry.mailProvider({ SMTP_HOST: 'smtp.gmail.com', SMTP_USER: 'a', SMTP_PASS: 'b' }), 'smtp')

  const captured = []
  const server = net.createServer((socket) => {
    socket.write('220 localhost ESMTP\r\n')
    let mode = 'command'
    let auth = 0
    let buf = ''
    socket.on('data', (chunk) => {
      buf += chunk.toString('utf8')
      if (mode === 'data') {
        if (buf.includes('\r\n.\r\n')) {
          captured.push(buf)
          socket.write('250 Queued\r\n')
          mode = 'command'
          buf = ''
        }
        return
      }
      while (buf.includes('\r\n')) {
        const index = buf.indexOf('\r\n')
        const line = buf.slice(0, index)
        buf = buf.slice(index + 2)
        const upper = line.toUpperCase()
        if (upper.startsWith('EHLO') || upper.startsWith('HELO')) socket.write('250-localhost\r\n250 AUTH LOGIN\r\n')
        else if (upper === 'AUTH LOGIN') { auth = 1; socket.write('334 VXNlcm5hbWU6\r\n') }
        else if (auth === 1) { auth = 2; socket.write('334 UGFzc3dvcmQ6\r\n') }
        else if (auth === 2) { auth = 0; socket.write('235 OK\r\n') }
        else if (upper.startsWith('MAIL FROM')) socket.write('250 OK\r\n')
        else if (upper.startsWith('RCPT TO')) socket.write('250 OK\r\n')
        else if (upper === 'DATA') { mode = 'data'; buf = ''; socket.write('354 Go\r\n') }
        else if (upper === 'QUIT') { socket.write('221 Bye\r\n'); socket.end() }
        else socket.write('250 OK\r\n')
      }
    })
  })
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const address = server.address()
  await smtp.smtpSend({
    host: '127.0.0.1',
    port: address.port,
    mode: 'plain',
    user: email,
    pass: 'app-password',
    mail: {
      from: `PersonalFitness.id <${email}>`,
      to: email,
      replyTo: 'ada@example.com',
      subject: 'Quote enquiry',
      text: 'Private Strength Training in Canggu.',
    },
  })
  assert.equal(captured.length, 1)
  assert.equal(captured[0].includes('Reply-To: ada@example.com'), true)
  assert.equal(captured[0].includes('RCPT TO:<hello@personalfitness.id>'), false)
  assert.equal(captured[0].includes('app-password'), false)
  await new Promise((resolve) => server.close(resolve))
} finally {
  await vite.close()
}

console.log('enquiry checks passed')
