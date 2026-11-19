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
  const proto = History.prototype
  const instancePush = historyObject.pushState.bind(historyObject)
  const instanceReplace = historyObject.replaceState.bind(historyObject)
  const protoPush = proto.pushState
  const protoReplace = proto.replaceState
  const pinHistory = () => {
    const lock = (target: object, name: 'pushState' | 'replaceState', value: History['pushState']) => {
      try {
        Object.defineProperty(target, name, {
          configurable: true,
          enumerable: true,
          get() {
            return value
          },
          set() {},
        })
      } catch {
        // Some browsers may refuse the lock; route views still go out through trackPageView.
      }
    }
    lock(historyObject, 'pushState', instancePush)
    lock(historyObject, 'replaceState', instanceReplace)
    lock(proto, 'pushState', protoPush)
    lock(proto, 'replaceState', protoReplace)
  }
  // Pin before gtag.js loads so enhanced measurement cannot wrap History and send a second page_view.
  pinHistory()
  window.gtag('js', new Date())
  window.gtag('config', GA4_ID, { anonymize_ip: true, send_page_view: false })
  const script = document.createElement('script')
  script.id = 'ga4-src'
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID)
  script.addEventListener('load', pinHistory)
  document.head.appendChild(script)
}
