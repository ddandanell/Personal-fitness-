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
  if (!GA4_ID || typeof window === 'undefined') return
  window.gtag?.('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: path,
    send_to: GA4_ID,
  })
}

export function installAnalytics() {
  if (typeof window === 'undefined' || !GA4_ID || document.getElementById('ga4-src')) return
  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== 'function') {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args as unknown as Record<string, unknown>)
    }
  }
  const historyObject = window.history
  const pushState = historyObject.pushState.bind(historyObject)
  const replaceState = historyObject.replaceState.bind(historyObject)
  window.gtag('js', new Date())
  // send_page_view: false avoids a duplicate initial view. Route changes are sent once via trackPageView.
  // Restoring History API methods after gtag.js loads stops enhanced measurement from adding a second page_view.
  window.gtag('config', GA4_ID, { anonymize_ip: true, send_page_view: false })
  const script = document.createElement('script')
  script.id = 'ga4-src'
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID)
  script.addEventListener('load', () => {
    historyObject.pushState = pushState
    historyObject.replaceState = replaceState
  })
  document.head.appendChild(script)
}
