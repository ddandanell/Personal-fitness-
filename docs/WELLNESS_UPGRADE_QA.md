# Wellness upgrade validation

11 November 2026. Website flow: visitor chooses services and area, the browser calculates an estimate from the catalogue, the visitor reviews the schedule, and a WhatsApp draft carries the request to the coordinator. The partnership form follows the same review-before-send pattern. There is no payment, messaging send, account creation or clinical record write in these public flows.

| Check | Result |
| --- | --- |
| TypeScript and production build | Passed; 239 complete HTML pages plus a real 404 |
| ESLint | Passed |
| Service content | 53 guides; minimum 1,231 body words |
| Existing professional content | 26 profiles; minimum 608 body words |
| Internal links | 11,270 references checked across generated pages |
| Images and static assets | 2,867 references checked |
| Structured data | 355 JSON-LD blocks parsed successfully |
| Location coverage navigation | Five Bali areas and five Jakarta municipalities |
| Partnership placement | Footer link present; absent from header and mobile navigation |
| Mixed plan, four weeks | Yoga for two and training for one: Rp 6,650,000 planning total |
| Add weekly mat Pilates | 12 visits; 12% eligible saving; Rp 9,504,000 |
| Ubud travel | Rp 1,800,000 travel retained; total Rp 11,304,000 |
| Unpriced Jakarta travel | Complete written quote required; no assumed in-zone total |
| Invalid input | Zero and fractional counts rejected; missing time and overlapping visits flagged |
| Excluded-service discount | Adding massage does not increase the eligible fitness saving |
| Schedule draft | Correct services, times, area, counts and total in the reviewable WhatsApp link |
| Partnership draft | Business name, contact, email, portfolio and interest carried correctly; not sent automatically |
| Browser layout | Desktop navigation at 1440px; mobile at 375px; no horizontal overflow on checked service, planner and partner pages |
| Browser console | No errors during the tested preview flows |

Preview browser checks used the GitHub-connected Vercel deployment of commit 92d659d. Final polish adds keyboard focus and scrolling to the schedule review, restores two-column mobile navigation and reduces the partner heading size for narrow screens. These changes do not alter pricing or submitted draft content.

The shared wellness brief is a coordinator-managed service workflow. An authenticated multi-coach records portal is not represented as implemented. Sensitive clinical records remain outside this public planner.
