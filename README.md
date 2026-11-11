# PersonalFitness.id public website

A client-facing React and TypeScript website for private personal training, private yoga and mat Pilates enquiries in Bali and Jakarta.

## Run locally

```bash
npm ci --ignore-scripts
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`. It includes route-level code splitting, responsive layouts, original representative imagery and PWA support.

## Quality checks

```bash
npm run lint
```

With the production preview running on `127.0.0.1:4173`, the two scripts in `scripts/` provide browser-based route, responsive, accessibility, interaction and PWA checks through `playwright-cli run-code`.

## Enquiry behaviour

The enquiry helper runs entirely in the current browser page. It prepares a message for clipboard copy or text-file download; it does not transmit form entries, send a WhatsApp message, process a payment or confirm a booking. No company WhatsApp destination is embedded in the site.
