export type Founder = {
  name: string
  photo: string
  bio: string
  whatsapp?: string
  role?: string
}

export type CoachCard = {
  firstName: string
  photo: string
  disciplines: string[]
  certification: string
  issuer: string
  year: string
  languages: string[]
  areas: string[]
}

export type PartnerConfig = {
  COMMISSION_PCT: number | null
  COMMISSION_BASE: 'session' | 'session-excluding-travel-and-extras' | 'guest-payment' | null
  COMMISSION_PAYOUT_DAY: string | null
  GROUP_YOGA_RATE_BALI: number | null
  GROUP_YOGA_MAX_PEOPLE: number | null
  DEMO_POLICY: 'on' | 'off'
  LIABILITY_TEXT: string | null
  FOUNDER: Founder | null
  COACHES: CoachCard[]
  INSTAGRAM_URL: string | null
  GBP_URL: string | null
  COORDINATION_HOURS: string | null
  GA4_ID: string | null
}

export const partner: PartnerConfig = {
  COMMISSION_PCT: 10,
  COMMISSION_BASE: 'guest-payment',
  COMMISSION_PAYOUT_DAY: 'Monthly by bank transfer, with a statement',
  GROUP_YOGA_RATE_BALI: null,
  GROUP_YOGA_MAX_PEOPLE: null,
  DEMO_POLICY: 'off',
  LIABILITY_TEXT: null,
  FOUNDER: null,
  COACHES: [],
  INSTAGRAM_URL: null,
  GBP_URL: null,
  COORDINATION_HOURS: '08:00-20:00',
  GA4_ID: 'G-0V93D5LJF4',
}

export const PARTNER_MENU_PDF = '/partners/villa-wellness-menu.pdf'

export function commissionShare(lang: 'en' | 'id' = 'en') {
  if (partner.COMMISSION_PCT != null) {
    return lang === 'id'
      ? `${partner.COMMISSION_PCT}% dari yang dibayar tamu`
      : `${partner.COMMISSION_PCT}% of what the guest paid`
  }
  return lang === 'id' ? 'komisi dari setiap sesi' : 'a commission on every session'
}

export function commissionSentence(lang: 'en' | 'id' = 'en') {
  if (partner.COMMISSION_PCT != null) {
    return lang === 'id'
      ? `Anda mendapat komisi ${partner.COMMISSION_PCT}% dari yang dibayar tamu.`
      : `You earn a ${partner.COMMISSION_PCT}% commission of what the guest paid.`
  }
  return lang === 'id'
    ? 'Anda dapat komisi dari setiap sesi.'
    : 'You earn a commission on every session.'
}

export const EXAMPLE_MONTHLY_SESSIONS = 13
export const EXAMPLE_MONTHLY_SESSION_VALUE = 14_112_000

export function exampleCommission() {
  if (partner.COMMISSION_PCT == null) return null
  return Math.round(EXAMPLE_MONTHLY_SESSION_VALUE * (partner.COMMISSION_PCT / 100))
}

export const visibleCoaches = partner.COACHES.filter((coach) => coach.photo && coach.certification)
export const founderReady = Boolean(partner.FOUNDER?.name && partner.FOUNDER.photo && partner.FOUNDER.bio)
