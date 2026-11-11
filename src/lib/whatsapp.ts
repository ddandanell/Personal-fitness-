export const WHATSAPP_E164 = '628113803488'
export const WHATSAPP_DISPLAY = '+62 811-3803-488'

const defaultMessage = 'Hello PersonalFitness.id - I would like to ask about a private session in Bali or Jakarta.'

export function whatsappDraftUrl(message = defaultMessage) {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(message)}`
}
