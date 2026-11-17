import { useMemo, useState, type ReactNode } from 'react'
import { seedBookings, seedSchedules, type Booking, type Schedule } from './data'
import { DemoContext, type DemoStateValue } from './demo-state'

const KEY = 'arunika-villa-demo-v1'

type State = { bookings: Booking[]; schedules: Schedule[] }

function mergeById<T extends { id: string }>(seed: T[], extra: T[]) {
  const seen = new Set(seed.map((item) => item.id))
  return [...seed, ...extra.filter((item) => item.id && !seen.has(item.id))]
}

function loadState(): State {
  const seed = { bookings: seedBookings, schedules: seedSchedules }
  if (typeof window === 'undefined') return seed
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return seed
    const parsed = JSON.parse(raw) as Partial<State>
    if (!Array.isArray(parsed.bookings) || !Array.isArray(parsed.schedules)) return seed
    return {
      bookings: mergeById(seedBookings, parsed.bookings),
      schedules: mergeById(seedSchedules, parsed.schedules),
    }
  } catch {
    return seed
  }
}

export function DemoStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(loadState)

  const value = useMemo<DemoStateValue>(() => ({
    ...state,
    addBooking: (booking) => setState((current) => {
      const next = { ...current, bookings: [...current.bookings, booking] }
      try { sessionStorage.setItem(KEY, JSON.stringify(next)) } catch { /* The hour still shows in this view. */ }
      return next
    }),
    addSchedule: (schedule) => setState((current) => {
      const next = { ...current, schedules: [...current.schedules, schedule] }
      try { sessionStorage.setItem(KEY, JSON.stringify(next)) } catch { /* The rhythm still shows in this view. */ }
      return next
    }),
    nextBookingId: () => {
      const numbers = state.bookings.map((item) => Number(item.id.replace(/\D/g, ''))).filter((value) => !Number.isNaN(value))
      return `ARK-${Math.max(2000, ...numbers) + 1}`
    },
    nextScheduleId: () => {
      const numbers = state.schedules.map((item) => Number(item.id.replace(/\D/g, ''))).filter((value) => !Number.isNaN(value))
      return `SCH-${Math.max(20, ...numbers) + 1}`
    },
  }), [state])

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}
