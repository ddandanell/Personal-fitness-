import { createContext, useContext } from 'react'
import type { Service } from './data'

export type BookingStatus = 'received' | 'checking' | 'offer' | 'confirmed'

export type GuestBooking = {
  token: string
  reference: string
  idempotencyKey: string
  serviceSlug: string
  serviceName: string
  date: string
  time: string
  participants: number
  name: string
  whatsapp: string
  email: string
  note: string
  preference: string
  status: BookingStatus
  payment: 'quote' | 'details-sent'
  total: number
  createdAt: string
  offerExpiresAt: string | null
}

export type Role = 'reception' | 'manager'

export type RequestInput = {
  idempotencyKey: string
  serviceSlug: string
  serviceName: string
  date: string
  time: string
  participants: number
  name: string
  whatsapp: string
  email: string
  note: string
  preference: string
  total: number
}

export type DemoStateValue = {
  booking: GuestBooking | null
  role: Role
  submit: (input: RequestInput) => { booking: GuestBooking; created: boolean }
  advance: () => void
  payDemo: () => void
  setRole: (role: Role) => void
  reset: () => void
  findByContact: (reference: string, whatsapp: string) => GuestBooking | null
  serviceFor: (slug: string) => Service | undefined
}

export const DemoContext = createContext<DemoStateValue | null>(null)

export function useDemoState() {
  const value = useContext(DemoContext)
  if (!value) throw new Error('Villa demo state is only available inside the demonstration')
  return value
}
