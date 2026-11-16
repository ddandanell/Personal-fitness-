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
  COMMISSION_BASE: 'session' | 'session-excluding-travel-and-extras' | null
  COMMISSION_PAYOUT_DAY: string | null
  GROUP_YOGA_RATE_BALI: number | null
  GROUP_YOGA_MAX_PEOPLE: number | null
  DEMO_POLICY: 'on' | 'off'
  LIABILITY_TEXT: string | null
  FOUNDER: Founder | null
  COACHES: CoachCard[]
  INSTAGRAM_URL: string | null
  GBP_URL: string | null
  OFFICE_GEO: { lat: number; lng: number } | null
  COORDINATION_HOURS: string | null
  GA4_ID: string | null
}

export const partner: PartnerConfig = {
  COMMISSION_PCT: null,
  COMMISSION_BASE: null,
  COMMISSION_PAYOUT_DAY: null,
  GROUP_YOGA_RATE_BALI: null,
  GROUP_YOGA_MAX_PEOPLE: null,
  DEMO_POLICY: 'off',
  LIABILITY_TEXT: null,
  FOUNDER: null,
  COACHES: [],
  INSTAGRAM_URL: null,
  GBP_URL: null,
  OFFICE_GEO: null,
  COORDINATION_HOURS: null,
  GA4_ID: null,
}

export const PARTNER_MENU_PDF = '/partners/villa-wellness-menu.pdf'

export function commissionShare(lang: 'en' | 'id' = 'en') {
  if (partner.COMMISSION_PCT != null) {
    return lang === 'id'
      ? `${partner.COMMISSION_PCT}% dari setiap sesi yang dibayar`
      : `${partner.COMMISSION_PCT}% of every paid session`
  }
  return lang === 'id' ? 'komisi dari setiap sesi' : 'a commission on every session'
}

export function commissionSentence(lang: 'en' | 'id' = 'en') {
  if (partner.COMMISSION_PCT != null) {
    return lang === 'id'
      ? `Anda dapat ${partner.COMMISSION_PCT}% dari setiap sesi yang dibayar.`
      : `You earn ${partner.COMMISSION_PCT}% of every paid session.`
  }
  return lang === 'id'
    ? 'Anda dapat komisi dari setiap sesi.'
    : 'You earn a commission on every session.'
}

export const EXAMPLE_MONTHLY_SESSIONS = 13
export const EXAMPLE_MONTHLY_SESSION_VALUE = 12_096_000

export function exampleCommission() {
  if (partner.COMMISSION_PCT == null) return null
  return Math.round(EXAMPLE_MONTHLY_SESSION_VALUE * (partner.COMMISSION_PCT / 100))
}

export const visibleCoaches = partner.COACHES.filter((coach) => coach.photo && coach.certification)
export const founderReady = Boolean(partner.FOUNDER?.name && partner.FOUNDER.photo && partner.FOUNDER.bio)
