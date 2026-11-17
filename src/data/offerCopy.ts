/** Owner-approved operating policy, 18 November 2026. */
export const RESCHEDULE_NOTE = 'Free rescheduling up to 24 hours before your session, if supply allows. Inside 24 hours, the session is charged. A 50% deposit confirms each booking; packs are paid in full upfront.'
export const RESCHEDULE_NOTE_ID = 'Penjadwalan ulang gratis hingga 24 jam sebelum sesi, jika tersedia. Dalam 24 jam, sesi tetap dikenakan biaya. Deposit 50% mengunci setiap pemesanan. Paket dibayar lunas di muka.'
export const TRAVEL_DISCLAIMER = 'Travel is included across Canggu, Seminyak, Sanur, Ubud and Uluwatu. Other areas on request.'
export const TRAVEL_DISCLAIMER_ID = 'Perjalanan sudah termasuk di Canggu, Seminyak, Sanur, Ubud, dan Uluwatu. Area lain atas permintaan.'
export const DEPOSIT_NOTE = 'A 50% deposit confirms each booking. Packs are paid in full upfront.'
export const DEPOSIT_NOTE_ID = 'Deposit 50% mengunci setiap pemesanan. Paket dibayar lunas di muka.'
export const PAYMENT_INSTRUCTIONS = 'Payment instructions are on the written quote. We never ask for card or bank details in WhatsApp.'
export const REPLY_HOURS = 'We reply between 08:00 and 20:00 Bali time.'
export const REPLY_HOURS_ID = 'Kami membalas pukul 08:00-20:00 waktu Bali.'
export const PHOTO_CAPTION = 'Photos are illustrative. The professional for your hour is named on the quote.'
export const PHOTO_CAPTION_ID = 'Foto bersifat ilustratif. Profesional untuk sesi Anda disebutkan pada kutipan tertulis.'
export const AVAILABILITY_NOTE = 'Subject to instructor availability and location confirmation.'
export const AVAILABILITY_NOTE_ID = 'Tergantung ketersediaan instruktur dan konfirmasi lokasi.'
export const ON_REQUEST_SLUGS = new Set(['boxing-fitness', 'guided-meditation', 'mobility-coaching', 'bodywork-recovery', 'zumba-dance-fitness'])
export function isOnRequest(slug: string) { return ON_REQUEST_SLUGS.has(slug) }
export function serviceNameId(slug: string, fallback = '') {
  return ({ 'personal-training': 'Latihan kekuatan privat', 'private-yoga': 'Yoga privat', 'mat-pilates': 'Mat Pilates', 'mobility-coaching': 'Mobilitas dan peregangan', 'boxing-fitness': 'Kebugaran tinju', 'guided-meditation': 'Meditasi terpandu', 'bodywork-recovery': 'Bodywork dan pemulihan', 'zumba-dance-fitness': 'Zumba dan kebugaran tari' } as Record<string, string>)[slug] || fallback
}
