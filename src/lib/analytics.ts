declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (...args: unknown[]) => void
  }
}

export const GA4_ID = String(import.meta.env.VITE_GA_MEASUREMENT_ID || '')

export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: name, ...params })
  window.gtag?.('event', name, params)
}

export function trackWhatsApp(source: string) {
  trackEvent('whatsapp_click', { source, method: 'whatsapp' })
}

export function installAnalytics() {
  if (typeof window === 'undefined' || !GA4_ID || document.getElementById('ga4-src')) return
  window.dataLayer = window.dataLayer || []
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args as unknown as Record<string, unknown>)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA4_ID, { anonymize_ip: true })
  const script = document.createElement('script')
  script.id = 'ga4-src'
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID)
  document.head.appendChild(script)
}
