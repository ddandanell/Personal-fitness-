# Villa-manager positioning, 17 November 2026

## Intent

- Homepage, Indonesian homepage, header and contact page now speak to villa managers first. Guest prices stay as the menu.
- Printed partner menu remains at `/partners/menu`. Booking codes for guests to scan were removed from the page, the PDF and the partner terms. The URL is unchanged.
- No commission percentage is stated. `COMMISSION_PCT` is still null.
- No URL or price change. Not published from this branch.

## Checks

- `npm run check:release` passed after the copy change: 100 prerendered pages, 41 location routes, minimum local main content 1,282 words, 103 keyword locks.
- Partner and menu HTML contain no QR wording. The QR library and `public/partners/default-qr.svg` are removed.
- No Search Console or GA4 data was used.
