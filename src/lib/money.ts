export function formatIdr(value: number) {
  return `Rp ${Math.round(value).toLocaleString('id-ID')}`
}

export function formatIdrRange(min: number, max: number) {
  if (min === max) return formatIdr(min)
  return `${formatIdr(min)}–${formatIdr(max)}`
}
