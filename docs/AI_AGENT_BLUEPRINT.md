# PersonalFitness expansion blueprint

Research checked 11 November 2026. The owner subsequently authorised implementation and pushing the completed website to GitHub. The factual readiness gates below remain relevant to real-world service delivery.

You are the implementation agent for PersonalFitness.id. Expand the existing website into a premium home, villa and workplace fitness and wellness concierge, using this approved planning pack as a specification. The owner has authorised this website expansion and its GitHub publication. Public catalogue pages may present indicative price guides. A confirmed professional and accepted written quote are required before actual delivery. Do not label photographs or profiles as AI-generated, illustrative or fictional on the public site.

1. Inspect the existing repository, host configuration, route handling, content source and enquiry implementation. Read local AGENTS.md instructions. Record the current routes and preserve the existing PersonalFitness visual identity, domain, three core service slugs and Bali/Jakarta context. Do not replace the application or migrate its backend merely because another stack is available.
2. Reproduce and fix direct route access first. A fresh HTTP GET to every real page must return 200 with its own content and metadata. An unknown path must return an actual 404. Add a sitemap of canonical indexable pages and an appropriate robots file. Use server rendering or pre-rendered HTML for marketing pages where supported by the present architecture. Confirm site-specific behavior; do not infer Search Console status from this report.
3. Import SERVICE_CATALOGUE.json with stable service_id values. There are 140 offer records grouped into service families. They include variants, groups, programmes and equipment requests. They are not 140 independent professions or an instruction to generate 140 near-duplicate pages. Preserve existing URLs. Put variants on their family page using sections, selectors and shareable anchors. New pages need distinct useful content and confirmed purpose.
4. Create the new directory and category filters. Required filters are service, goal, delivery setting, age/life-stage, participant count, duration and verified local availability. Use 'Check availability' for enquiry services, 'Ask about a specialist' for gated clinical categories and 'Request equipment quote' for rentals. Never label research records available or bookable. Empty filters must explain the result and allow an enquiry.
5. Generate family pages using the required content contract. Each page must state audience, scope, real format, session agenda, participant limit, location/space requirements, included equipment, exclusions, preparation, qualifications, proposed or approved price status, FAQs and a relevant enquiry CTA. Do not pad to a word count. Use accurate original writing rather than copying competitor content. Place general training and clinical services in clearly distinct flows.
6. Treat all proposed_premium_price_idr values as planning recommendations. They may appear as clearly labelled indicative guides, but not as binding prices or structured-data Offers until price_approved, tax_treatment, unit, inclusions and a viable provider cost have been confirmed. Use the pricing formula in this pack. Never invent a supplier cost, equipment rental tariff, practitioner fee, tax rate, credential, review, verified employee, operating address or response-time guarantee. Do not label photographs or profiles as AI-generated, illustrative or fictional on the public site.
7. Availability is a service x city/zone x provider x date/time decision. For Bali use Asia/Makassar; for Jakarta use Asia/Jakarta. Store instants in UTC with the venue timezone. A service offered in Bali is not automatically offered in Jakarta. 'Bookable' requires current qualifications and permissions, approved delivery scope, capacity, equipment/site feasibility, approved price and operational confirmation. Clinical authority is verified by a responsible human, not inferred by AI from an uploaded certificate.
8. Add a service-aware enquiry flow. Prefill service_id, variant, participant count, location area and dates. The initial lead form collects practical booking details and consent, not detailed health histories, identity documents or payment-card data. A verified official WhatsApp number must come from the owner's configuration; do not reuse a number from another business or the research sources. A click that opens WhatsApp is not a sent or received lead. If adding a backend, create a lead reference only after successful server acknowledgement, show the true status and update the existing privacy notice to describe the new data flow.
9. Keep confidential health screening in a separate restricted channel owned by the appropriate practitioner. Do not put health data in URL parameters, tracking events, browser storage, public CMS content, ordinary AI prompts or general customer notes. The marketing agent must not diagnose, prescribe, approve clinical readiness or turn a health concern into an automatic sale. Child, pregnancy, adaptive, pool and equipment formats require their specific qualified review.
10. Build drafts in small reversible batches, starting with the 20 launch_shortlist offers and their shared family pages. Then draft wave 2 families and partner-only wave 3 pages. Save an audit manifest before each mutation, including record IDs, prior versions, new versions, source references and changed fields. Upsert by service_id and family_slug. A rerun must not duplicate pages, overwrite unrelated edits or reset verified data. Stop only the affected batch on version conflict or a failed gate; continue independent valid work.
11. Use licensed or owned imagery and keep a rights log. Publish practitioner identities, credentials and review scores only from verified records with consent. Do not add public captions or badges that say photographs are AI-generated, illustrative or fictional. No fabricated before/after photographs, credentials, client counts, medical promises, fake scarcity or 'largest in Bali' claim without comparative evidence.
12. Validate the full journey on mobile and desktop: direct URL, content and price -> selected service -> enquiry -> truthful acknowledgement -> coordinator handoff. Run every acceptance check in QA_CHECKLIST.md. Do not send a real customer message, create a paid booking or charge a card for testing. Use test records and a test payment route only if authorised and already configured.
13. Return the staging URL, service/page change manifest, exact list of drafted versus publish-ready offers, price proposal list, unresolved facts, test results and rollback procedure. A complete draft is a valid deliverable when supply or clinical permissions remain unknown; inventing readiness is not. Do not publish until the owner instructs publication and the relevant factual gates pass.


## A. Personal training and strength

Qualified trainer; portable equipment or a verified home gym. No clinical treatment claims.

Comparators: S01. All numeric prices below are planning recommendations.

| ID | Offer | Format | Proposed premium price | Wave |
|---|---|---|---|---|
| PF-001 | Personal training | 60 min; 1 participant(s) | IDR 900,000 | 1 |
| PF-002 | Beginner strength training | 60 min; 1 participant(s) | IDR 900,000 | 1 |
| PF-003 | Strength and muscle training | 60 min; 1 participant(s) | IDR 1,000,000 | 2 |
| PF-004 | Weight management fitness | 60 min; 1 participant(s) | IDR 950,000 | 2 |
| PF-005 | Low impact personal training | 60 min; 1 participant(s) | IDR 850,000 | 2 |
| PF-006 | Functional fitness | 60 min; 1 participant(s) | IDR 950,000 | 2 |
| PF-007 | HIIT and conditioning | 60 min; 1 participant(s) | IDR 950,000 | 2 |
| PF-008 | Bodyweight and calisthenics | 60 min; 1 participant(s) | IDR 950,000 | 2 |
| PF-009 | Kettlebell coaching | 60 min; 1 participant(s) | IDR 1,000,000 | 2 |
| PF-010 | Couples personal training | 60 min; 2 participant(s) | IDR 1,150,000 | 1 |
| PF-011 | Small group villa training | 60 min; 6 participant(s) | IDR 2,100,000 | 1 |
| PF-012 | Exercise assessment and written plan | 90 min; 1 participant(s) | IDR 1,350,000 | 2 |

## B. Pilates and barre

Mat and portable props travel easily. Reformer instruction needs approved existing equipment or a separately agreed studio partner.

Comparators: S04. All numeric prices below are planning recommendations.

| ID | Offer | Format | Proposed premium price | Wave |
|---|---|---|---|---|
| PF-013 | Mat Pilates | 60 min; 1 participant(s) | IDR 950,000 | 1 |
| PF-014 | Beginner mat Pilates | 60 min; 1 participant(s) | IDR 950,000 | 2 |
| PF-015 | Dynamic mat Pilates | 60 min; 1 participant(s) | IDR 1,000,000 | 2 |
| PF-016 | Small props Pilates | 60 min; 1 participant(s) | IDR 1,000,000 | 2 |
| PF-017 | Private barre fitness | 60 min; 1 participant(s) | IDR 950,000 | 1 |
| PF-018 | Duo mat Pilates | 60 min; 2 participant(s) | IDR 1,350,000 | 2 |
| PF-019 | Small group mat Pilates | 60 min; 4 participant(s) | IDR 1,800,000 | 2 |
| PF-020 | Reformer Pilates at your property | 60 min; 1 participant(s) | IDR 1,250,000 | 3 |

## C. Yoga and private practice

Teacher, style, mats, props and participant compatibility agreed. Styles are variants of a useful family page.

Comparators: S02, S03. All numeric prices below are planning recommendations.

| ID | Offer | Format | Proposed premium price | Wave |
|---|---|---|---|---|
| PF-021 | Private Hatha yoga | 60 min; 2 participant(s) | IDR 850,000 | 1 |
| PF-022 | Private Vinyasa yoga | 60 min; 2 participant(s) | IDR 850,000 | 2 |
| PF-023 | Private Yin yoga | 60 min; 2 participant(s) | IDR 850,000 | 1 |
| PF-024 | Restorative yoga | 75 min; 2 participant(s) | IDR 950,000 | 2 |
| PF-025 | Ashtanga coaching | 60 min; 1 participant(s) | IDR 1,000,000 | 2 |
| PF-026 | Beginner yoga | 60 min; 2 participant(s) | IDR 850,000 | 2 |
| PF-027 | Chair yoga | 60 min; 1 participant(s) | IDR 850,000 | 2 |
| PF-028 | Yin yoga and sound relaxation | 90 min; 2 participant(s) | IDR 1,500,000 | 2 |
| PF-029 | Private small group yoga | 60 min; 4 participant(s) | IDR 1,500,000 | 2 |
| PF-030 | Yoga practice and philosophy | 90 min; 2 participant(s) | IDR 1,100,000 | 2 |

## D. Mobility, stretching and ergonomics

General movement and workstation coaching. Treatment of pain or injury belongs with the clinical pathway.

Comparators: S01, S09. All numeric prices below are planning recommendations.

| ID | Offer | Format | Proposed premium price | Wave |
|---|---|---|---|---|
| PF-031 | Assisted stretching | 60 min; 1 participant(s) | IDR 850,000 | 1 |
| PF-032 | Mobility coaching | 60 min; 1 participant(s) | IDR 850,000 | 1 |
| PF-033 | Desk comfort movement | 60 min; 1 participant(s) | IDR 850,000 | 2 |
| PF-034 | Balance and coordination | 60 min; 1 participant(s) | IDR 850,000 | 2 |
| PF-035 | Active flexibility coaching | 60 min; 1 participant(s) | IDR 950,000 | 2 |
| PF-036 | Movement coaching review | 75 min; 1 participant(s) | IDR 1,000,000 | 2 |
| PF-037 | Home desk ergonomics visit | 90 min; 1 participant(s) | IDR 1,200,000 | 2 |
| PF-038 | Gentle recovery movement | 45 min; 1 participant(s) | IDR 700,000 | 2 |

## E. Boxing, dance and movement skills

Non-contact fitness, suitable flooring and clearance. Children need a separate safeguarding and competence gate.

Comparators: S01. All numeric prices below are planning recommendations.

| ID | Offer | Format | Proposed premium price | Wave |
|---|---|---|---|---|
| PF-039 | Boxing fitness | 60 min; 1 participant(s) | IDR 1,000,000 | 1 |
| PF-040 | Kickboxing fitness | 60 min; 1 participant(s) | IDR 950,000 | 2 |
| PF-041 | Muay Thai fitness | 60 min; 1 participant(s) | IDR 1,000,000 | 2 |
| PF-042 | Personal safety skills coaching | 60 min; 1 participant(s) | IDR 1,100,000 | 2 |
| PF-043 | Dance fitness | 60 min; 1 participant(s) | IDR 900,000 | 1 |
| PF-044 | Zumba style dance fitness | 60 min; 1 participant(s) | IDR 900,000 | 2 |
| PF-045 | Couples Latin dance | 60 min; 2 participant(s) | IDR 1,200,000 | 2 |
| PF-046 | Children's dance and movement | 60 min; 4 participant(s) | IDR 950,000 | 2 |

## F. Swimming and sport conditioning

Pool, property access and rescue competence checked. Route sessions begin at the property; specialist sports skills may need a different venue.

Comparators: S05. All numeric prices below are planning recommendations.

| ID | Offer | Format | Proposed premium price | Wave |
|---|---|---|---|---|
| PF-047 | Adult swimming lesson | 45 min; 1 participant(s) | IDR 1,050,000 | 1 |
| PF-048 | Child swimming lesson | 45 min; 1 participant(s) | IDR 900,000 | 1 |
| PF-049 | Baby or toddler water familiarisation | 30 min; 1 participant(s) | IDR 1,000,000 | 2 |
| PF-050 | Parent and child pool skills | 30 min; 2 participant(s) | IDR 1,000,000 | 2 |
| PF-051 | Private aqua fitness | 45 min; 2 participant(s) | IDR 1,100,000 | 2 |
| PF-052 | Running technique coaching | 60 min; 1 participant(s) | IDR 1,000,000 | 2 |
| PF-053 | Guided training run | 60 min; 1 participant(s) | IDR 850,000 | 2 |
| PF-054 | Dry land surf conditioning | 60 min; 1 participant(s) | IDR 1,000,000 | 2 |
| PF-055 | Golf fitness conditioning | 60 min; 1 participant(s) | IDR 1,100,000 | 2 |
| PF-056 | Indoor cycling coaching | 60 min; 1 participant(s) | IDR 1,100,000 | 2 |

## G. Massage and bodywork

Bring table, clean linens and agreed products. Touch, draping, privacy and pressure consent are part of delivery.

Comparators: S06, S07. All numeric prices below are planning recommendations.

| ID | Offer | Format | Proposed premium price | Wave |
|---|---|---|---|---|
| PF-057 | Balinese relaxation massage | 60 min; 1 participant(s) | IDR 650,000 | 1 |
| PF-058 | Sports massage | 60 min; 1 participant(s) | IDR 750,000 | 1 |
| PF-059 | Deep tissue massage | 60 min; 1 participant(s) | IDR 750,000 | 1 |
| PF-060 | Thai style massage | 75 min; 1 participant(s) | IDR 850,000 | 2 |
| PF-061 | Aromatherapy massage | 60 min; 1 participant(s) | IDR 700,000 | 2 |
| PF-062 | Foot reflexology relaxation | 45 min; 1 participant(s) | IDR 550,000 | 2 |
| PF-063 | Head, neck and shoulder massage | 60 min; 1 participant(s) | IDR 650,000 | 2 |
| PF-064 | Couples Balinese massage | 60 min; 2 participant(s) | IDR 1,300,000 | 2 |
| PF-065 | Lomi Lomi style massage | 75 min; 1 participant(s) | IDR 850,000 | 2 |
| PF-066 | Four hands relaxation massage | 60 min; 1 participant(s) | IDR 1,400,000 | 2 |

## H. Recovery sessions and equipment

Device use, suitability and installation are checked separately. Equipment rental quotes need period, setup, maintenance and collection.

Comparators: S13. All numeric prices below are planning recommendations.

| ID | Offer | Format | Proposed premium price | Wave |
|---|---|---|---|---|
| PF-067 | Supervised compression boots session | 45 min; 1 participant(s) | IDR 600,000 | 3 |
| PF-068 | Foam rolling and recovery skills | 60 min; 1 participant(s) | IDR 850,000 | 2 |
| PF-069 | Percussion relaxation session | 45 min; 1 participant(s) | IDR 650,000 | 3 |
| PF-070 | Cold plunge coaching at your property | 60 min; 1 participant(s) | IDR 1,250,000 | 3 |
| PF-071 | Ice bath rental and setup | Scope and period by quote | Written quote | 3 |
| PF-072 | Portable sauna rental and setup | Scope and period by quote | Written quote | 3 |

## I. Mindfulness, sleep routines and relaxation

Separate ordinary coaching from clinical mental healthcare. Sound and Reiki are described as experiences without healing promises.

Comparators: S03, S10, S18. All numeric prices below are planning recommendations.

| ID | Offer | Format | Proposed premium price | Wave |
|---|---|---|---|---|
| PF-073 | Guided meditation | 45 min; 2 participant(s) | IDR 800,000 | 1 |
| PF-074 | Gentle breathwork | 60 min; 2 participant(s) | IDR 850,000 | 1 |
| PF-075 | Yoga Nidra | 60 min; 2 participant(s) | IDR 850,000 | 2 |
| PF-076 | Private sound bath | 60 min; 2 participant(s) | IDR 1,500,000 | 1 |
| PF-077 | Guided journaling and reflection | 60 min; 1 participant(s) | IDR 850,000 | 2 |
| PF-078 | Stress and wellbeing habits coaching | 60 min; 1 participant(s) | IDR 1,000,000 | 2 |
| PF-079 | Sleep routine coaching | 60 min; 1 participant(s) | IDR 1,100,000 | 2 |
| PF-080 | Travel routine and jet lag planning | 60 min; 1 participant(s) | IDR 1,000,000 | 2 |
| PF-081 | Progressive muscle relaxation | 45 min; 2 participant(s) | IDR 750,000 | 2 |
| PF-082 | Reiki relaxation experience | 60 min; 1 participant(s) | IDR 1,000,000 | 2 |

## J. Nutrition, cooking and food routines

Nutrition scope and secure intake checked. Chef work uses the existing myCHEF operation and its current written quote.

Comparators: S11, S12. All numeric prices below are planning recommendations.

| ID | Offer | Format | Proposed premium price | Wave |
|---|---|---|---|---|
| PF-083 | Qualified nutrition consultation | 60 min; 1 participant(s) | IDR 1,200,000 | 1 |
| PF-084 | Sports nutrition consultation | 75 min; 1 participant(s) | IDR 1,500,000 | 2 |
| PF-085 | Household meal planning | 90 min; 4 participant(s) | IDR 1,500,000 | 2 |
| PF-086 | Plant based eating consultation | 60 min; 1 participant(s) | IDR 1,200,000 | 2 |
| PF-087 | Grocery shopping coaching | 90 min; 1 participant(s) | IDR 1,500,000 | 2 |
| PF-088 | Pantry and fridge coaching | 90 min; 1 participant(s) | IDR 1,200,000 | 2 |
| PF-089 | Healthy cooking lesson | 120 min; 4 participant(s) | IDR 2,800,000 | 2 |
| PF-090 | Healthy villa chef service | Scope and period by quote | Written quote | 2 |
| PF-091 | Recurring meal preparation | Scope and period by quote | Written quote | 2 |
| PF-092 | Arrival fridge stocking coordination | 60 min; 1 participant(s) | IDR 850,000 | 2 |

## K. Women's life stages and postpartum support

Specialist competence is required for pregnancy and postnatal work. Lactation and clinical concerns use an appropriate partner pathway.

Comparators: S14, S21. All numeric prices below are planning recommendations.

| ID | Offer | Format | Proposed premium price | Wave |
|---|---|---|---|---|
| PF-093 | Prenatal personal training | 60 min; 1 participant(s) | IDR 1,100,000 | 2 |
| PF-094 | Prenatal yoga | 60 min; 1 participant(s) | IDR 1,000,000 | 2 |
| PF-095 | Postnatal return to fitness | 60 min; 1 participant(s) | IDR 1,100,000 | 2 |
| PF-096 | Postnatal mat Pilates | 60 min; 1 participant(s) | IDR 1,100,000 | 2 |
| PF-097 | Menopause stage strength coaching | 60 min; 1 participant(s) | IDR 1,100,000 | 2 |
| PF-098 | Pregnancy relaxation massage | 60 min; 1 participant(s) | IDR 950,000 | 2 |
| PF-099 | Lactation support consultation | 60 min; 1 participant(s) | IDR 1,500,000 | 3 |
| PF-100 | Birth preparation education | 90 min; 2 participant(s) | IDR 1,800,000 | 3 |
| PF-101 | Practical postpartum support visit | 240 min; 1 participant(s) | IDR 1,800,000 | 2 |
| PF-102 | Gentle movement around the menstrual cycle | 60 min; 1 participant(s) | IDR 950,000 | 2 |

## L. Children, families, older adults and adaptive fitness

Separate qualifications, consent, guardian presence and accessibility checks. General fitness is distinct from clinical rehabilitation or care.

Comparators: S05, S09. All numeric prices below are planning recommendations.

| ID | Offer | Format | Proposed premium price | Wave |
|---|---|---|---|---|
| PF-103 | Teen fitness coaching | 60 min; 1 participant(s) | IDR 950,000 | 2 |
| PF-104 | Children's active play | 60 min; 4 participant(s) | IDR 1,200,000 | 2 |
| PF-105 | Family fitness session | 60 min; 4 participant(s) | IDR 1,500,000 | 2 |
| PF-106 | Older adult strength coaching | 60 min; 1 participant(s) | IDR 1,000,000 | 2 |
| PF-107 | Balance and confidence exercise | 60 min; 1 participant(s) | IDR 1,000,000 | 2 |
| PF-108 | Chair based strength exercise | 60 min; 1 participant(s) | IDR 900,000 | 2 |
| PF-109 | Adaptive fitness coaching | 60 min; 1 participant(s) | IDR 1,200,000 | 2 |
| PF-110 | Guided walking and movement companion | 60 min; 1 participant(s) | IDR 750,000 | 2 |

## M. Beauty, grooming and private spa

A qualified mobile beauty partner, hygienic tools and realistic setup requirements. Restrict initial scope to non-invasive services.

Comparators: S07. All numeric prices below are planning recommendations.

| ID | Offer | Format | Proposed premium price | Wave |
|---|---|---|---|---|
| PF-111 | Hydrating spa facial | 60 min; 1 participant(s) | IDR 850,000 | 2 |
| PF-112 | Facial relaxation massage | 45 min; 1 participant(s) | IDR 650,000 | 2 |
| PF-113 | Body scrub | 60 min; 1 participant(s) | IDR 650,000 | 2 |
| PF-114 | Body wrap and relaxation | 75 min; 1 participant(s) | IDR 850,000 | 2 |
| PF-115 | Scalp and head spa | 75 min; 1 participant(s) | IDR 950,000 | 2 |
| PF-116 | Classic manicure | 60 min; 1 participant(s) | IDR 650,000 | 2 |
| PF-117 | Classic pedicure | 60 min; 1 participant(s) | IDR 700,000 | 2 |
| PF-118 | Gel manicure | 75 min; 1 participant(s) | IDR 850,000 | 2 |
| PF-119 | Gel pedicure | 75 min; 1 participant(s) | IDR 850,000 | 2 |
| PF-120 | Private blow dry and hair styling | 60 min; 1 participant(s) | IDR 900,000 | 2 |

## N. Clinical and specialist partner services

Partner pathway only until professional permissions, home visit scope, contracting, insurance, consent and restricted records are verified.

Comparators: S08, S09, S14, S15, S16, S17, S22. All numeric prices below are planning recommendations.

| ID | Offer | Format | Proposed premium price | Wave |
|---|---|---|---|---|
| PF-121 | Physiotherapy initial home visit | 60 min; 1 participant(s) | IDR 1,600,000 | 3 |
| PF-122 | Physiotherapy follow up | 45 min; 1 participant(s) | IDR 1,300,000 | 3 |
| PF-123 | Sports rehabilitation physiotherapy | 60 min; 1 participant(s) | IDR 1,800,000 | 3 |
| PF-124 | Postoperative rehabilitation visit | 60 min; 1 participant(s) | IDR 1,800,000 | 3 |
| PF-125 | Pelvic health physiotherapy | 60 min; 1 participant(s) | IDR 1,800,000 | 3 |
| PF-126 | Neurological rehabilitation visit | 60 min; 1 participant(s) | IDR 2,000,000 | 3 |
| PF-127 | Occupational therapy home visit | 60 min; 1 participant(s) | IDR 1,800,000 | 3 |
| PF-128 | Speech and language therapy visit | 60 min; 1 participant(s) | IDR 1,600,000 | 3 |
| PF-129 | Private psychology consultation | 60 min; 1 participant(s) | IDR 1,800,000 | 3 |
| PF-130 | Acupuncture consultation and session | 60 min; 1 participant(s) | IDR 1,600,000 | 3 |

## O. Villa groups, workplaces and programmes

These are packages or delivery formats of the underlying services. They are not ten new professions or ten automatic landing pages.

Comparators: S03, S04, S10. All numeric prices below are planning recommendations.

| ID | Offer | Format | Proposed premium price | Wave |
|---|---|---|---|---|
| PF-131 | Villa sunrise yoga group | 60 min; 6 participant(s) | IDR 2,000,000 | 2 |
| PF-132 | Villa sound bath group | 60 min; 6 participant(s) | IDR 2,800,000 | 2 |
| PF-133 | Holiday group bootcamp | 60 min; 8 participant(s) | IDR 2,600,000 | 2 |
| PF-134 | Office mobility class | 45 min; 10 participant(s) | IDR 2,800,000 | 2 |
| PF-135 | Workplace wellbeing workshop | 60 min; 20 participant(s) | IDR 3,500,000 | 2 |
| PF-136 | Team workstation coaching | 180 min; 6 participant(s) | IDR 4,500,000 | 2 |
| PF-137 | Private wellness morning | 180 min; 6 participant(s) | IDR 8,000,000 | 2 |
| PF-138 | Retreat wellness facilitation day | 480 min; 10 participant(s) | IDR 12,000,000 | 2 |
| PF-139 | Four week fitness routine | 12 x 60 min; one adult | Written quote | 2 |
| PF-140 | Weekly wellness concierge coordination | 7 days; one household; coordination only | IDR 1,500,000 | 2 |
