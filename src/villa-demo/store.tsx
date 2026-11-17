import { useMemo, useRef, useState, type ReactNode } from 'react'
import { getService, sessionQuote } from './data'
import { DemoContext, type GuestBooking, type RequestInput, type Role } from './demo-state'

const KEY = 'villa-sora-guest-demo-v3-policy'

type Saved = { booking: GuestBooking | null; role: Role }

function load(): Saved {
  const empty = { booking: null, role: 'manager' as Role }
  if (typeof window === 'undefined') return empty
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw) as Partial<Saved>
    return {
      booking: parsed.booking && parsed.booking.token ? parsed.booking : null,
      role: parsed.role === 'reception' ? 'reception' : 'manager',
    }
  } catch {
    return empty
  }
}

function referenceFor(token: string) {
  let hash = 0
  for (const char of token) hash = (hash * 33 + char.charCodeAt(0)) % 90000
  return 'PF-' + String(10000 + hash)
}

export function DemoStateProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<Saved>(load)
  const current = useRef(saved)

  const api = useMemo(() => {
    const persist = (next: Saved) => {
      current.current = next
      setSaved(next)
      try { sessionStorage.setItem(KEY, JSON.stringify(next)) } catch { /* private mode */ }
    }
    return {
      booking: saved.booking,
      role: saved.role,
      serviceFor: getService,
      setRole: (role: Role) => persist({ ...saved, role }),
      reset: () => {
        try { sessionStorage.removeItem(KEY) } catch { /* ignore */ }
        current.current = { booking: null, role: 'manager' }
        setSaved(current.current)
      },
      findByContact: (reference: string, whatsapp: string) => {
        const booking = saved.booking
        if (!booking) return null
        const digits = (value: string) => value.replace(/\D/g, '')
        const ref = reference.trim().toUpperCase()
        if (ref !== booking.reference.toUpperCase()) return null
        if (digits(whatsapp) !== digits(booking.whatsapp)) return null
        return booking
      },
      submit: (input: RequestInput) => {
        if (current.current.booking && current.current.booking.idempotencyKey === input.idempotencyKey) {
          return { booking: current.current.booking, created: false }
        }
        const quote = sessionQuote(input.participants, getService(input.serviceSlug)?.maxGuests ?? 2, input.serviceSlug)
        const token = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `tok-${Date.now()}`
        const booking: GuestBooking = {
          ...input,
          token,
          reference: referenceFor(token),
          participants: quote.guests,
          total: quote.total,
          status: 'received',
          payment: 'quote',
          createdAt: new Date().toISOString(),
          offerExpiresAt: null,
        }
        persist({ ...saved, booking })
        return { booking, created: true }
      },
      advance: () => {
        const booking = saved.booking
        if (!booking) return
        if (booking.status === 'received') persist({ ...saved, booking: { ...booking, status: 'checking' } })
        else if (booking.status === 'checking') {
          persist({ ...saved, booking: { ...booking, status: 'offer', offerExpiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() } })
        }
      },
      payDemo: () => {
        const booking = saved.booking
        if (!booking || booking.status !== 'offer') return
        persist({ ...saved, booking: { ...booking, status: 'confirmed', payment: 'details-sent' } })
      },
    }
  }, [saved])

  return <DemoContext.Provider value={api}>{children}</DemoContext.Provider>
}
