/**
 * Section 1 — all copy and data in one place.
 *
 * Factual basis: only the public MyMotor / ZOOP positioning captured in
 * `src/data/company.ts` (PUBLIC_FACTS). The freight side is brief-derived and
 * kept deliberately generic. The ecosystem diagram (provider names, counts,
 * "3K+ locations") is ILLUSTRATIVE and labelled as such in the UI.
 */
import type { IconName } from '@/components/ui/Icon'

export const HERO = {
  eyebrowNumber: '01',
  eyebrow: 'Ecosystem Context',
  subhead: 'From electric infrastructure to the everyday EV journey.',
  supporting:
    'Before designing for reliability, I first mapped the ecosystem MyMotor operates within.',
  metaPill: 'Public product research · Sep 2026',
  script: ['Same roads,', 'greener', 'tomorrows.'],
} as const

export interface HeroStat {
  icon: IconName
  label: string
}

/** Aspirational framing, never numbers. */
export const HERO_STATS: HeroStat[] = [
  { icon: 'leaf', label: 'Cleaner cities' },
  { icon: 'users', label: 'Happier drivers' },
  { icon: 'trend', label: 'A more connected EV future' },
]

export const TWO_PATHS_HEADER = {
  eyebrow: 'Two paths. One mobility network.',
  title: 'Different needs. A shared future.',
  lead: 'ZOOP builds charging infrastructure for fleet and logistics operators, while MyMotor brings electric mobility into the everyday consumer experience — different use cases, one cleaner tomorrow.',
} as const

export interface PathCardData {
  id: 'freight' | 'consumer'
  eyebrow: string
  icon: IconName
  title: string
  body: string
  points: string[]
  cta: {
    label: string
    kind: 'link' | 'primary'
    href?: string
    scrollTo?: string
  }
  highlighted?: boolean
}

export const PATHS: PathCardData[] = [
  {
    id: 'freight',
    eyebrow: 'Business / Freight',
    icon: 'truck',
    title: 'Energy for the freight network',
    body: 'ZOOP is building electric freight infrastructure for fleet and logistics operators — supporting heavy-duty electric movement across industrial corridors.',
    points: [
      'Fleet-focused charging hubs',
      'High-uptime infrastructure',
      'Built for heavy-duty vehicles',
      'Support for logistics operators',
    ],
    cta: { label: 'Explore ZOOP', kind: 'link', href: 'https://zoop.energy/' },
  },
  {
    id: 'consumer',
    eyebrow: 'Consumer / MyMotor',
    icon: 'user',
    title: 'MyMotor for electric mobility',
    body: 'MyMotor simplifies electric mobility for Indian EV drivers — charger discovery across networks, route-aware planning and a unified charging experience.',
    points: [
      'Find & navigate to chargers',
      'Check RC, insurance & challan',
      'Easy & secure payments',
      'A smarter, simpler EV experience',
    ],
    cta: {
      label: 'Explore the consumer journey',
      kind: 'primary',
      scrollTo: 'capabilities',
    },
    highlighted: true,
  },
]

export const FREIGHT_NOTE =
  'This proof of work follows the consumer journey. The freight side is included here as public context, not as a second case study.'

export const CAPABILITIES_HEADER = {
  eyebrow: 'What MyMotor brings together',
  title: 'Everything an EV owner needs, in one place.',
  lead: 'MyMotor brings vehicle information and EV charging into a single consumer experience.',
} as const

export interface CapabilityCard {
  id: string
  icon: IconName
  title: string
  summary: string
  detail: string
  side: 'left' | 'right'
  row: 'top' | 'bottom'
}

export const CAPABILITIES: CapabilityCard[] = [
  {
    id: 'vehicle',
    icon: 'car',
    title: 'Vehicle',
    summary: 'RC, insurance, documents, garage',
    detail: 'All your vehicle information in one place.',
    side: 'left',
    row: 'top',
  },
  {
    id: 'charging',
    icon: 'plug',
    title: 'Charging',
    summary: 'Live availability, session tracking',
    detail: 'Find, navigate and charge with confidence.',
    side: 'left',
    row: 'bottom',
  },
  {
    id: 'mobility',
    icon: 'compass',
    title: 'Mobility',
    summary: 'Charger discovery, navigation',
    detail: 'Plan your journeys, anywhere in India.',
    side: 'right',
    row: 'top',
  },
  {
    id: 'transactions',
    icon: 'wallet',
    title: 'Transactions',
    summary: 'EV wallet, charging history',
    detail: 'Secure and seamless payments.',
    side: 'right',
    row: 'bottom',
  },
]

export const CAPABILITIES_SOURCE =
  'Based on publicly observed MyMotor product capabilities — a product-feature map, not an internal architecture diagram.'

export const ECOSYSTEM_HEADER = {
  eyebrow: 'The bigger picture',
  titleLines: ['The experience is simple.', "The ecosystem isn't."],
  lead: 'MyMotor brings the consumer experience together across charging networks and real-world systems.',
  disclaimer: 'Conceptual ecosystem — not internal architecture',
} as const

export interface EcoNode {
  id: string
  kind: 'driver' | 'app' | 'providers' | 'chargers'
  label: string
  sublabel?: string
  steps?: string[]
  providers?: string[]
  icon: IconName
}

export const ECO_NODES: EcoNode[] = [
  {
    id: 'driver',
    kind: 'driver',
    label: 'EV driver',
    steps: ['Search', 'Plan', 'Charge', 'Pay'],
    icon: 'user',
  },
  {
    id: 'mymotor',
    kind: 'app',
    label: 'MyMotor',
    sublabel: 'One app. Many connections.',
    icon: 'route',
  },
  {
    id: 'providers',
    kind: 'providers',
    label: 'Charging network providers',
    providers: ['Provider A', 'Provider B', 'Provider C', '+30 networks'],
    icon: 'network',
  },
  {
    id: 'chargers',
    kind: 'chargers',
    label: 'Physical chargers',
    sublabel: 'Across 3K+ locations in India',
    icon: 'plug',
  },
]

export const ECO_CAPTION =
  'A conceptual view of the systems a single charging journey can touch. Provider names and counts are illustrative placeholders.'

export interface ReliabilityQ {
  id: string
  icon: IconName
  label: string
  question: string
}

export const RELIABILITY_QS: ReliabilityQ[] = [
  {
    id: 'availability',
    icon: 'wifi',
    label: 'Availability',
    question: 'Is the charger state still correct?',
  },
  {
    id: 'session',
    icon: 'cog',
    label: 'Session state',
    question: 'Did the charge start and stop correctly?',
  },
  {
    id: 'transaction',
    icon: 'card',
    label: 'Transaction',
    question: 'Did the payment complete?',
  },
  {
    id: 'support',
    icon: 'headset',
    label: 'Support',
    question: 'Who resolves the issue?',
  },
]

export const TPM_LENS = {
  eyebrow: 'The TPM lens',
  title: 'A simple customer journey can hide a complex operational system.',
  body: 'The customer sees one experience. Behind it are multiple providers, transaction states, dependencies and potential failure points — the complexity a Technical Product Manager has to make visible and keep manageable.',
  steps: [
    'Customer journey',
    'Transaction reliability',
    'Operational visibility',
    'Control tower',
  ],
} as const

export const TRANSITION = {
  eyebrow: 'Where this goes next',
  progression: ['Customer journey', 'Transaction reliability', 'Control tower'],
  subtext: 'A more connected, reliable and delightful EV experience for everyone.',
  ctaLabel: 'Next: User Journey',
  ctaLead: 'Understand the journey from the driver’s point of view.',
} as const
