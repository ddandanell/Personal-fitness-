import { spawnSync } from 'node:child_process'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PDFDocument, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { encode } from 'uqr'
import card from '../src/villa-demo/guest-card.json' with { type: 'json' }

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public', 'images', 'villademo', 'cards')
const cream = rgb(0.969, 0.953, 0.925)
const green = rgb(0.102, 0.2, 0.173)
const terracotta = rgb(0.745, 0.322, 0.216)
const muted = rgb(0.33, 0.4, 0.36)
const white = rgb(0.98, 0.97, 0.95)

const villas = [
  ['house-lima', 'House Lima', 'Pererenan', 'house-lima.webp', 'rice.webp'],
  ['cliff-seseh', 'Cliff House', 'Seseh', 'cliff-seseh.webp', 'interior.webp'],
  ['atelier-uluwatu', 'Atelier Uluwatu', 'Uluwatu', 'atelier-uluwatu.webp', 'hero-pool.webp'],
  ['garden-berawa', 'Garden House', 'Berawa', 'garden-berawa.webp', 'training.webp'],
  ['pavilion-echo', 'Pavilion', 'Echo Beach', 'pavilion-echo.webp', 'meditation.webp'],
]

function jpgFor(webpName) {
  const source = path.join(root, 'public', 'images', 'villademo', webpName)
  const target = path.join(os.tmpdir(), webpName.replace('.webp', '-card.jpg'))
  const result = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', source, '-vf', 'scale=1400:-2', '-q:v', '4', target], { encoding: 'utf8' })
  if (result.status !== 0) throw new Error('Could not prepare ' + webpName + ' ' + result.stderr)
  return target
}

function wrap(text, font, size, width) {
  const lines = []
  let line = ''
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word
    if (font.widthOfTextAtSize(next, size) > width && line) {
      lines.push(line)
      line = word
    } else line = next
  }
  if (line) lines.push(line)
  return lines
}

function drawLines(page, lines, x, y, font, size, color, leading) {
  let cursor = y
  for (const line of lines) {
    page.drawText(line, { x, y: cursor, size, font, color })
    cursor -= leading
  }
  return cursor
}

function drawQr(page, value, x, y, size) {
  const qr = encode(value, { ecc: 'M', border: 1 })
  const cell = size / qr.size
  page.drawRectangle({ x, y, width: size, height: size, color: white })
  qr.data.forEach((row, rowIndex) => {
    row.forEach((on, column) => {
      if (!on) return
      page.drawRectangle({
        x: x + column * cell,
        y: y + size - (rowIndex + 1) * cell,
        width: cell,
        height: cell,
        color: green,
      })
    })
  })
}

await fs.mkdir(outDir, { recursive: true })
const mediumBytes = await fs.readFile(path.join(root, 'scripts', 'fonts', 'Cormorant-Medium.ttf'))
const semiBytes = await fs.readFile(path.join(root, 'scripts', 'fonts', 'Cormorant-SemiBold.ttf'))

for (const [slug, name, area, hero, detail] of villas) {
  const pdf = await PDFDocument.create()
  pdf.registerFontkit(fontkit)
  const serif = await pdf.embedFont(mediumBytes)
  const display = await pdf.embedFont(semiBytes)
  const heroJpg = await pdf.embedJpg(await fs.readFile(await jpgFor(hero)))
  const detailJpg = await pdf.embedJpg(await fs.readFile(await jpgFor(detail)))
  const pageWidth = 595.28
  const pageHeight = 841.89
  const margin = 36
  const contentWidth = pageWidth - margin * 2

  const first = pdf.addPage([pageWidth, pageHeight])
  first.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: cream })
  first.drawCircle({ x: margin + 8, y: pageHeight - 46, size: 8, color: terracotta })
  first.drawText('A', { x: margin + 4.2, y: pageHeight - 50, size: 11, font: display, color: white })
  first.drawText('Arunika', { x: margin + 24, y: pageHeight - 44, size: 18, font: display, color: green })
  first.drawText(name.toUpperCase() + '  ·  ' + area.toUpperCase(), { x: margin + 24, y: pageHeight - 58, size: 8, font: serif, color: terracotta })
  const label = 'PRIVATE VILLA WELLNESS'
  first.drawText(label, { x: pageWidth - margin - serif.widthOfTextAtSize(label, 8), y: pageHeight - 46, size: 8, font: serif, color: muted })

  const photoTop = pageHeight - 78
  const photoHeight = 248
  first.drawImage(heroJpg, { x: margin, y: photoTop - photoHeight, width: contentWidth, height: photoHeight })

  let y = photoTop - photoHeight - 28
  first.drawText('YOUR WELLNESS. YOUR PLACE.', { x: margin, y, size: 8, font: serif, color: terracotta })
  y -= 34
  y = drawLines(first, card.headline, margin, y, display, 30, green, 32)
  y -= 8
  y = drawLines(first, wrap(card.lede, serif, 11, contentWidth), margin, y, serif, 11, green, 15)
  y -= 16
  const colWidth = (contentWidth - 22) / 2
  card.services.forEach((service, index) => {
    const column = index % 2
    const row = Math.floor(index / 2)
    const x = margin + column * (colWidth + 22)
    const rowY = y - row * 46
    first.drawText(service[0], { x, y: rowY, size: 13, font: display, color: green })
    drawLines(first, wrap(service[1], serif, 9.5, colWidth), x, rowY - 14, serif, 9.5, muted, 12)
  })
  y -= Math.ceil(card.services.length / 2) * 46 + 8
  first.drawText(card.ask, { x: margin, y, size: 11, font: display, color: green })
  first.drawLine({ start: { x: margin, y: 42 }, end: { x: pageWidth - margin, y: 42 }, thickness: 0.4, color: rgb(0.75, 0.72, 0.66) })
  first.drawText(card.powered.toUpperCase(), { x: margin, y: 26, size: 7.5, font: serif, color: muted })
  first.drawText('01  /  02', { x: pageWidth - margin - 42, y: 26, size: 7.5, font: serif, color: muted })

  const second = pdf.addPage([pageWidth, pageHeight])
  second.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: cream })
  second.drawText('MAKE IT YOUR STAY', { x: pageWidth - margin - serif.widthOfTextAtSize('MAKE IT YOUR STAY', 8), y: pageHeight - 40, size: 8, font: serif, color: muted })
  second.drawText(card.stayKicker.toUpperCase(), { x: margin, y: pageHeight - 78, size: 8, font: serif, color: terracotta })
  y = pageHeight - 116
  y = drawLines(second, card.stayHeadline, margin, y, display, 32, green, 34)
  y -= 8
  y = drawLines(second, wrap(card.stayLede, serif, 11, 300), margin, y, serif, 11, green, 15)
  const rhythmTop = y - 18
  card.rhythms.forEach((rhythm, index) => {
    const rowY = rhythmTop - index * 58
    second.drawText(rhythm[0], { x: margin, y: rowY, size: 13, font: display, color: green })
    drawLines(second, wrap(rhythm[1], serif, 10, 300), margin, rowY - 15, serif, 10, muted, 13)
  })
  second.drawImage(detailJpg, { x: 360, y: rhythmTop - 168, width: 198, height: 168 })
  y = rhythmTop - 196
  second.drawLine({ start: { x: margin, y }, end: { x: pageWidth - margin, y }, thickness: 0.4, color: rgb(0.75, 0.72, 0.66) })
  y -= 24
  second.drawText(card.collectionTitle, { x: margin, y, size: 14, font: display, color: green })
  y -= 22
  card.columns.forEach((column, index) => {
    const x = margin + index * (contentWidth / 3)
    second.drawText(column[0].toUpperCase(), { x, y, size: 8, font: serif, color: terracotta })
    drawLines(second, wrap(column[1], serif, 9, contentWidth / 3 - 16), x, y - 14, serif, 9, muted, 12)
  })

  const bandY = 78
  second.drawRectangle({ x: margin, y: bandY, width: contentWidth, height: 118, color: green })
  second.drawText(card.arrange, { x: margin + 18, y: bandY + 82, size: 16, font: display, color: cream })
  second.drawText('WhatsApp  ' + card.whatsappDisplay, { x: margin + 18, y: bandY + 58, size: 12, font: serif, color: white })
  second.drawText('hello@personalfitness.id', { x: margin + 18, y: bandY + 38, size: 11, font: serif, color: terracotta })
  drawQr(second, `https://villademo.personalfitness.id/stay/${slug}`, pageWidth - margin - 92, bandY + 22, 74)
  second.drawText('SCAN TO ENQUIRE', { x: pageWidth - margin - 90, y: bandY + 10, size: 6, font: serif, color: cream })
  const noteLines = wrap(card.note, serif, 8, contentWidth)
  drawLines(second, noteLines, margin, 58, serif, 8, muted, 11)
  second.drawText(card.powered.toUpperCase(), { x: margin, y: 26, size: 7.5, font: serif, color: muted })
  second.drawText('02  /  02', { x: pageWidth - margin - 42, y: 26, size: 7.5, font: serif, color: muted })

  const bytes = await pdf.save()
  await fs.writeFile(path.join(outDir, `${slug}.pdf`), bytes)
}

console.log(JSON.stringify({ passed: true, cards: villas.length, dir: '/images/villademo/cards/' }))
