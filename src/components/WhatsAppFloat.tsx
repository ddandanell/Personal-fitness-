import { WHATSAPP_DISPLAY, whatsappDraftUrl } from '@/lib/whatsapp'

function WhatsAppMark() {
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M19.11 17.2c-.3-.15-1.76-.87-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.48.71.3 1.26.48 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35zM16.04 28c-2.08 0-4.12-.55-5.9-1.6L4 28l1.63-5.92A11.96 11.96 0 1 1 16.04 28zm0-21.4a9.44 9.44 0 0 0-8.04 14.4l.5.8-.97 3.5 3.6-.94.77.46A9.44 9.44 0 1 0 16.04 6.6z"
      />
    </svg>
  )
}

export default function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={whatsappDraftUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp at ${WHATSAPP_DISPLAY}`}
    >
      <WhatsAppMark />
      <span className="wa-float-label">WhatsApp</span>
    </a>
  )
}
