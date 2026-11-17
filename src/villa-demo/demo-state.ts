import { createContext, useContext } from 'react'
import type { Booking, Schedule } from './data'

export type DemoStateValue = {
  bookings: Booking[]
  schedules: Schedule[]
  addBooking: (booking: Booking) => void
  addSchedule: (schedule: Schedule) => void
  nextBookingId: () => string
  nextScheduleId: () => string
}

export const DemoContext = createContext<DemoStateValue | null>(null)

export function useDemoState() {
  const value = useContext(DemoContext)
  if (!value) throw new Error('Demo state is only available inside the villa preview')
  return value
}
