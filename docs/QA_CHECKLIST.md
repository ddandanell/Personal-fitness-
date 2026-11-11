# Acceptance checks

## Routes and discoverability
- Every existing canonical route works on a fresh direct GET and browser refresh with status 200.
- Newly created real family pages also return 200, correct title, description, canonical and meaningful HTML content.
- A deliberately unknown route returns a genuine 404; broken routes are not masked by the homepage.
- HTTP/HTTPS and apex/www resolve to one canonical host without loops.
- Sitemap contains only canonical, indexable public pages; robots does not accidentally block required content or assets.
- Search Console is checked if access is supplied; no claim of indexing or rankings is made from code tests alone.

## Catalogue, content and price
- Exactly 140 stable offer IDs import once, with unique IDs and variants; family pages are deduplicated.
- All three existing core service URLs remain valid, with migration redirects only where explicitly necessary.
- Every public offer has a clear duration or rental/programme period, participant unit and scope.
- New recommended prices are labelled as indicative planning guides. A binding quote requires confirmed tax treatment, scope, costs and delivery capacity.
- Quote-only rentals and myCHEF offers have no invented numeric price or Offer schema.
- Group prices, duration, included staff, equipment and participant limits match the accepted quote.
- Package arithmetic matches component prices and discounts; no automatic discount/referral stacking.
- No invented qualifications, addresses, testimonials, client counts, ratings or outcome claims.
- Images load with useful alt text. Do not label photographs as AI-generated, illustrative or fictional on the public site.
- Clinical descriptions receive a qualified review; ordinary fitness does not promise treatment.

## Availability and enquiry
- Bali and Jakarta use separate availability records and correct venue timezones.
- No offer is bookable solely because its page exists or a provider once worked in that area.
- Child, pool, pregnancy, adaptive, clinical and equipment conditions cannot be bypassed by the enquiry UI.
- Existing query-prefill behavior continues to work, with stable service IDs rather than fragile display names.
- Customer can see the service and selected variant in the final enquiry summary.
- A WhatsApp open/copy action is not counted as a submitted or received lead.
- Any actual backend submission is validated, rate limited and deduplicated; retries do not create duplicate leads.
- Website acknowledgement states what has happened and what remains subject to confirmation.
- No real test message, booking or charge is sent to a customer or practitioner.

## Privacy and resilience
- New data collection is accurately described in the privacy notice before launch.
- Health details, child records and identity documents do not appear in analytics, URL parameters or general AI logs.
- Restricted records require appropriate permissions; the marketing/CMS agent cannot read clinical notes.
- Contact data does not leak through public JSON, prerendered HTML or page source.
- Keyboard navigation, labels, errors and focus behavior work; forms remain usable at 375 px and 1440 px widths.
- CMS version conflicts are detected; reruns do not duplicate records or overwrite unrelated changes.
- Every changed batch can be reverted by ID/version using the saved manifest; regression checks pass after rollback.
