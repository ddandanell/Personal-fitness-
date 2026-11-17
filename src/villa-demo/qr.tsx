import { encode } from 'uqr'

export function QrMark({ value, label }: { value: string; label: string }) {
  const qr = encode(value, { ecc: 'M', border: 4 })
  const cells: string[] = []
  qr.data.forEach((row, y) => {
    row.forEach((on, x) => {
      if (on) cells.push(`<rect x="${x}" y="${y}" width="1" height="1" />`)
    })
  })
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${qr.size} ${qr.size}" role="img" aria-label="${label.replace(/"/g, '')}"><rect width="100%" height="100%" fill="#f7f3ec"/><g fill="#1c1915">${cells.join('')}</g></svg>`
  return <div className="qr-mark" dangerouslySetInnerHTML={{ __html: svg }} />
}
