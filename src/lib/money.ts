/** Rupiah with a dot as the thousands separator: Rp 1.050.000 */
export function formatIdr(value: number) {
  const rounded = Math.round(value)
  const sign = rounded < 0 ? '-' : ''
  const grouped = String(Math.abs(rounded)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `Rp ${sign}${grouped}`
}

export function formatIdrRange(min: number, max: number) {
  if (min === max) return formatIdr(min)
  return `${formatIdr(min)}–${formatIdr(max)}`
}
