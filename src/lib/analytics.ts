declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (...args: unknown[]) => void
  }
}

import { partner } from '@/config/partner'
import { partnerRef } from '@/lib/whatsapp'

export const GA4_ID = String(import.meta.env.VITE_GA_MEASUREMENT_ID || '') || partner.GA4_ID || ''

export function trackEvent(name: string, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === 'undefined') return
  const payload = Object.fromEntries(Object.entries({ ...params, partner_code: params.partner_code || partnerRef() }).filter(([, value]) => value !== undefined && value !== ''))
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: name, ...payload })
  window.gtag?.('event', name, payload)
}

export function trackWhatsApp(location: string, extra: Record<string, string | undefined> = {}) {
  trackEvent('whatsapp_click', { location, method: 'whatsapp', source: location, ...extra })
}

export function trackPageView(path: string) {
  if (!GA4_ID) return
  window.gtag?.('event', 'page_view', { page_path: path, page_location: window.location.href, page_title: document.title })
}

export function installAnalytics() {
  if (typeof window === 'undefined' || document.getElementById('ga4-src')) return
  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== 'function') {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args as unknown as Record<string, unknown>)
    }
  }
  const boot = () => {
    if (!GA4_ID || document.getElementById('ga4-src')) return
    window.gtag?.('js', new Date())
    window.gtag?.('config', GA4_ID, { anonymize_ip: true, send_page_view: false })
    const script = document.createElement('script')
    script.id = 'ga4-src'
    script.async = true
    script.defer = true
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID)
    document.head.appendChild(script)
  }
  if (!GA4_ID) return
  const start = () => boot()
  window.addEventListener('pointerdown', start, { once: true, passive: true })
  window.addEventListener('keydown', start, { once: true })
  window.setTimeout(start, 2500)
}
