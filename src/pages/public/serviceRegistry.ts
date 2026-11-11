export type Service = {
  slug: string
  title: string
  short: string
  description: string
  includes: string[]
  goodFor: string[]
  prepare: string[]
  image: string
  imageAlt: string
}

export const services: Service[] = [
  {
    slug: 'personal-training',
    title: 'Personal training',
    short: 'Private training shaped around your goals, experience and available space.',
    description: 'Build a session around general strength, fitness or maintaining your routine. We coordinate the professional, timing, setting and equipment with you before confirmation.',
    includes: [
      'A session matched to your goals and experience',
      'Professional, schedule and location coordination',
      'Equipment and preparation agreed in advance',
      'A clear price, inclusions and terms before payment',
    ],
    goodFor: [
      'Maintaining your routine while travelling',
      'Starting or returning to general fitness',
      'Training at home, in a villa or another suitable private space',
    ],
    prepare: [
      'Share your preferred setting and time',
      'Tell us what equipment is already available',
      'Wear comfortable training clothes and bring water',
    ],
    image: '/images/sessions/personal-training.webp',
    imageAlt: 'Representative personal training session in a private villa setting',
  },
  {
    slug: 'private-yoga',
    title: 'Private yoga',
    short: 'One-to-one or small-group yoga at your pace, in your own setting.',
    description: 'Make space for a private yoga session shaped around your experience, preferred pace and group size. Style, mats, venue access and timing are agreed before your session is confirmed.',
    includes: [
      'A format matched to your experience and preferences',
      'Individual, pair and small-group enquiries',
      'Mat, space and venue requirements agreed in advance',
      'Coordination before arrival and support afterwards',
    ],
    goodFor: [
      'A quieter alternative to a group class',
      'Visitors wanting to keep a practice while away',
      'Pairs, households or friends practising together',
    ],
    prepare: [
      'Tell us your experience and preferred pace',
      'Choose a clear, comfortable space with venue permission',
      'Let us know how many mats and participants to plan for',
    ],
    image: '/images/sessions/private-yoga.webp',
    imageAlt: 'Representative private yoga session in an indoor-outdoor setting',
  },
  {
    slug: 'mat-pilates',
    title: 'Mat Pilates',
    short: 'Focused, mat-based Pilates coordinated for your space and experience.',
    description: 'Choose a private mat Pilates session for general strength, control and movement. This is a mat-based service, not reformer Pilates or clinical care, and the format is agreed with you in advance.',
    includes: [
      'A mat-based session suited to your experience',
      'Space, simple props and participant requirements checked',
      'Professional and schedule coordination',
      'Clear arrival details, price and session terms',
    ],
    goodFor: [
      'People who prefer focused one-to-one instruction',
      'Pairs or small groups with a suitable clear space',
      'Adding a controlled mat session to a weekly routine',
    ],
    prepare: [
      'Clear enough floor space for each participant and mat',
      'Tell us whether mats or small props are already available',
      'Share any preferences for pace or prior experience',
    ],
    image: '/images/sessions/mat-pilates.webp',
    imageAlt: 'Representative private mat Pilates session in an apartment setting',
  },
]
