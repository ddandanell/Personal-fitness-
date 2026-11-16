import fs from 'node:fs/promises'
import path from 'node:path'
import QRCode from 'qrcode'

const root = process.cwd()
const outDir = path.join(root, 'public', 'partners')
await fs.mkdir(outDir, { recursive: true })
const message = "Hi PersonalFitness.id, I'd like to book: ___ · Day/time: ___ · People: ___"
const url = 'https://wa.me/628113803488?text=' + encodeURIComponent(message)
await fs.writeFile(path.join(outDir, 'default-qr.svg'), await QRCode.toString(url, { type: 'svg', margin: 1, width: 360 }))

function pdfEscape(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

function pageStream(lines) {
  const commands = ['BT', '/F1 16 Tf', '36 540 Td', `(${pdfEscape(lines[0])}) Tj`]
  for (const line of lines.slice(1)) {
    commands.push('/F1 11 Tf', '0 -18 Td', `(${pdfEscape(line)}) Tj`)
  }
  commands.push('ET')
  return commands.join('\n')
}

function buildPdf(pages) {
  const objects = ['', '<< /Type /Catalog /Pages 2 0 R >>']
  const kids = pages.map((_, index) => `${3 + index} 0 R`).join(' ')
  objects.push(`<< /Type /Pages /Kids [${kids}] /Count ${pages.length} >>`)
  const streams = pages.map((lines) => pageStream(lines))
  for (let index = 0; index < pages.length; index += 1) {
    const contentId = 3 + pages.length + index
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 419.53 595.28] /Contents ${contentId} 0 R /Resources<< /Font<< /F1 ${3 + pages.length * 2} 0 R >> >> >>`)
  }
  for (const stream of streams) {
    objects.push(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`)
  }
  objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>')
  let output = '%PDF-1.4\n'
  const offsets = [0]
  for (let index = 1; index < objects.length; index += 1) {
    offsets[index] = Buffer.byteLength(output)
    output += `${index} 0 obj\n${objects[index]}\nendobj\n`
  }
  const startxref = Buffer.byteLength(output)
  output += `xref\n0 ${objects.length}\n`
  output += '0000000000 65535 f \n'
  for (let index = 1; index < objects.length; index += 1) {
    output += String(offsets[index]).padStart(10, '0') + ' 00000 n \n'
  }
  output += `trailer<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`
  return output
}

const pdf = buildPdf([
  [
    'PersonalFitness.id villa wellness menu',
    'Our coaches come to the guest villa. Guest pays us.',
    'Private yoga from Rp 850.000 (up to 2)',
    'Personal training from Rp 900.000',
    'Mat Pilates from Rp 950.000',
    'Mobility from Rp 850.000',
    'Boxing fitness from Rp 1.000.000',
    'Guided meditation from Rp 800.000',
    'Bali, 60 minutes. Canggu and Seminyak included.',
    'Ubud/Sanur +Rp 150.000. Uluwatu +Rp 200.000 travel.',
    'WhatsApp +62 811-3803-488',
    'personalfitness.id/partners/menu',
  ],
  [
    'How the partner programme works',
    '1. We send a menu card and QR for each villa.',
    '2. Guests book on WhatsApp with your partner code.',
    '3. Our coach comes to the villa. The guest pays us.',
    '4. You earn a commission on every paid session.',
    '30-day pilot at 1-2 villas. Guests pay website prices.',
    'Full terms: www.personalfitness.id/partner-terms',
    'Join: www.personalfitness.id/villa-hotel-partners',
    'Bahasa: www.personalfitness.id/id/mitra-villa',
  ],
])
await fs.writeFile(path.join(outDir, 'villa-wellness-menu.pdf'), pdf)
console.log(JSON.stringify({ passed: true, qr: '/partners/default-qr.svg', pdf: '/partners/villa-wellness-menu.pdf' }))
