import type { RefObject } from 'react'
import { COMPANY_EMAIL, COMPANY_EMAIL_HREF } from '@/data/company'

export function HoneypotField({ inputRef }: { inputRef: RefObject<HTMLInputElement | null> }) {
  return (
    <div className="sr-only" aria-hidden="true">
      <label>
        Leave this blank
        <input ref={inputRef} tabIndex={-1} autoComplete="off" name="pf_leave_blank" defaultValue="" />
      </label>
    </div>
  )
}

export function EnquiryNote({ text, tone }: { text: string; tone: 'error' | 'success' | '' }) {
  if (!text) return null
  const parts = text.split(COMPANY_EMAIL)
  return (
    <p className={'form-message' + (tone === 'error' ? ' form-error' : '')} role={tone === 'error' ? 'alert' : 'status'}>
      {parts.map((part, index) => (
        <span key={index}>
          {index > 0 && <a href={COMPANY_EMAIL_HREF}>{COMPANY_EMAIL}</a>}
          {part}
        </span>
      ))}
    </p>
  )
}
