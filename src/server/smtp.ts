import net from 'node:net'
import tls from 'node:tls'

export type OutboundMail = {
  from: string
  to: string
  replyTo: string
  subject: string
  text: string
}

const ADDRESS = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i

export function extractAddress(value: string): string | null {
  const trimmed = value.replace(/[\r\n]/g, '').trim()
  const angle = trimmed.match(/<([^<>]+)>/)
  const candidate = (angle ? angle[1] : trimmed).trim().toLowerCase()
  if (candidate.length > 180 || !ADDRESS.test(candidate)) return null
  return candidate
}

function headerText(value: string): string {
  let clean = ''
  for (const char of value) {
    const code = char.charCodeAt(0)
    if (code === 10 || code === 13) clean += ' '
    else if (code >= 32 && code !== 127) clean += char
  }
  clean = clean.trim()
  if (/^[\x20-\x7E]*$/.test(clean)) return clean
  return `=?UTF-8?B?${Buffer.from(clean, 'utf8').toString('base64')}?=`
}

export function safeFromHeader(value: string, fallbackAddress: string): string {
  const address = extractAddress(value) || fallbackAddress
  const name = value.split('<')[0].replace(/["<>]/g, '').trim()
  if (!name || extractAddress(name) === address) return address
  return `${headerText(name)} <${address}>`
}

export function buildRfc822(mail: OutboundMail): string {
  const fromAddress = extractAddress(mail.from)
  const toAddress = extractAddress(mail.to)
  const replyTo = extractAddress(mail.replyTo)
  if (!fromAddress || !toAddress || !replyTo) throw new Error('smtp-address')
  const body = mail.text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').map((line) => (line.startsWith('.') ? `.${line}` : line)).join('\r\n')
  const headers = [
    `From: ${safeFromHeader(mail.from, fromAddress)}`,
    `To: ${toAddress}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${headerText(mail.subject) || 'Website enquiry'}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${Date.now()}.${Math.random().toString(16).slice(2)}@personalfitness.id>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: 8bit',
  ]
  return `${headers.join('\r\n')}\r\n\r\n${body}`
}

class LineBuffer {
  private pending = ''
  private waiters: Array<(line: string) => void> = []

  push(chunk: Buffer | string) {
    this.pending += typeof chunk === 'string' ? chunk : chunk.toString('utf8')
    this.flush()
  }

  private flush() {
    while (this.waiters.length && this.pending.includes('\n')) {
      const index = this.pending.indexOf('\n')
      const line = this.pending.slice(0, index).replace(/\r$/, '')
      this.pending = this.pending.slice(index + 1)
      this.waiters.shift()?.(line)
    }
  }

  readLine() {
    return new Promise<string>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('smtp-timeout')), 15000)
      this.waiters.push((line) => {
        clearTimeout(timer)
        resolve(line)
      })
      this.flush()
    })
  }

  async readCode() {
    let line = await this.readLine()
    const code = line.slice(0, 3)
    while (line[3] === '-') line = await this.readLine()
    return code
  }
}

function attach(socket: net.Socket | tls.TLSSocket) {
  const lines = new LineBuffer()
  const onData = (chunk: Buffer) => lines.push(chunk)
  socket.on('data', onData)
  return {
    lines,
    detach() { socket.off('data', onData) },
  }
}

async function expect(lines: LineBuffer, code: string, label: string) {
  const actual = await lines.readCode()
  if (actual !== code) throw new Error(`smtp-${label}`)
}

async function command(socket: net.Socket | tls.TLSSocket, lines: LineBuffer, line: string, code: string, label: string) {
  socket.write(`${line}\r\n`)
  await expect(lines, code, label)
}

export async function smtpConversation(socket: net.Socket | tls.TLSSocket, options: { user: string; pass: string; mail: OutboundMail; greeted?: boolean }): Promise<void> {
  const user = options.user.replace(/[\r\n]/g, '')
  const pass = options.pass.replace(/[\r\n]/g, '')
  const fromAddress = extractAddress(options.mail.from)
  const toAddress = extractAddress(options.mail.to)
  if (!user || !pass || user.length > 180 || pass.length > 400 || !fromAddress || !toAddress) throw new Error('smtp-auth')
  const { lines } = attach(socket)
  if (!options.greeted) await expect(lines, '220', 'banner')
  await command(socket, lines, 'EHLO personalfitness.id', '250', 'ehlo')
  await command(socket, lines, 'AUTH LOGIN', '334', 'auth')
  await command(socket, lines, Buffer.from(user).toString('base64'), '334', 'user')
  await command(socket, lines, Buffer.from(pass).toString('base64'), '235', 'pass')
  await command(socket, lines, `MAIL FROM:<${fromAddress}>`, '250', 'from')
  await command(socket, lines, `RCPT TO:<${toAddress}>`, '250', 'to')
  await command(socket, lines, 'DATA', '354', 'data')
  socket.write(`${buildRfc822(options.mail)}\r\n.\r\n`)
  await expect(lines, '250', 'body')
  socket.write('QUIT\r\n')
  socket.end()
}

export async function smtpSend(options: {
  host: string
  port: number
  mode: 'tls' | 'starttls' | 'plain'
  user: string
  pass: string
  mail: OutboundMail
}): Promise<void> {
  if (options.mode === 'plain' && options.host !== '127.0.0.1' && options.host !== 'localhost') throw new Error('smtp-plain')
  if (options.mode === 'starttls') {
    const plain = await connect(options.host, options.port, false)
    const secure = await startTls(plain, options.host)
    try {
      await smtpConversation(secure, { ...options, greeted: true })
    } catch (error) {
      secure.destroy()
      throw error
    }
    return
  }
  const socket = await connect(options.host, options.port, options.mode === 'tls')
  try {
    await smtpConversation(socket, options)
  } catch (error) {
    socket.destroy()
    throw error
  }
}

function connect(host: string, port: number, secure: boolean): Promise<net.Socket | tls.TLSSocket> {
  return new Promise((resolve, reject) => {
    const socket = secure
      ? tls.connect({ host, port, servername: host }, () => resolve(socket))
      : net.connect({ host, port }, () => resolve(socket))
    socket.once('error', reject)
    socket.setTimeout(15000, () => { socket.destroy(); reject(new Error('smtp-timeout')) })
  })
}

async function startTls(socket: net.Socket, host: string): Promise<tls.TLSSocket> {
  const { lines, detach } = attach(socket)
  await expect(lines, '220', 'banner')
  await command(socket, lines, 'EHLO personalfitness.id', '250', 'ehlo')
  await command(socket, lines, 'STARTTLS', '220', 'starttls')
  detach()
  return new Promise((resolve, reject) => {
    const secure = tls.connect({ socket, servername: host }, () => resolve(secure))
    secure.once('error', reject)
  })
}
