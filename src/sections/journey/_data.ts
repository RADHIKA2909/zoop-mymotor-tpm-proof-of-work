/**
 * Section 2 — all copy and data in one place.
 *
 * The journey model here is a PRODUCT-THINKING model built from publicly
 * observable MyMotor EV Charging Hub capabilities (finding chargers, real-time
 * availability, session tracking, connector filtering, multi-network charging,
 * single wallet — see `src/data/company.ts` PUBLIC_FACTS). Stage mechanics, the
 * emotional-state model, the dependency list and the breakpoints are all
 * PROPOSED / CONCEPTUAL / ILLUSTRATIVE and labelled as such in the UI. Nothing
 * here represents ZOOP's internal workflow.
 */
import type { IconName } from '@/components/ui/Icon'
import type { StatusTone } from '@/components/ui/StatusDot'

export const HERO = {
  eyebrowNumber: '02',
  eyebrow: 'User Journey',
  title: 'From finding a charger to getting back on the road.',
  supporting:
    'I mapped the consumer journey end to end to understand where uncertainty, delay or failure can enter the experience.',
  badge: 'Publicly observed + proposed journey model',
  scriptLeft: ['Same journeys.', 'A cleaner', 'tomorrow.'],
  scriptRight: ["Powering people's", 'next move.'],
  visualCaption:
    'Conceptual journey view based on publicly available product information.',
} as const

export const FLOW_HEADER = {
  eyebrow: 'The consumer journey',
  title: 'A simple flow for the user.',
  lead: 'Multiple systems working behind the scenes.',
  breakpointBanner:
    'Illustrative breakpoint model — not measured failure rates.',
} as const

export type RiskTone = 'warning' | 'error'

export interface JourneyStage {
  num: string
  icon: IconName
  title: string
  desc: string
  goal: string
  uncertainty: string
  breakpoint: { tone: RiskTone; label: string }
}

export const STAGES: JourneyStage[] = [
  {
    num: '01',
    icon: 'search',
    title: 'Discover',
    desc: 'Search for chargers near your location or along your route.',
    goal: 'Find a charger I can actually use, close to where I am or where I am going.',
    uncertainty: 'Are the nearby results complete and current?',
    breakpoint: { tone: 'warning', label: 'Potential availability mismatch' },
  },
  {
    num: '02',
    icon: 'sliders',
    title: 'Evaluate',
    desc: 'Compare options using availability, distance, connector type, charging speed and other available station information.',
    goal: 'Pick the option most likely to work for my vehicle and my time.',
    uncertainty: 'Is the connector, speed and status information accurate?',
    breakpoint: { tone: 'warning', label: 'Potential compatibility issue' },
  },
  {
    num: '03',
    icon: 'navigation',
    title: 'Navigate',
    desc: 'Get directions to the selected charger.',
    goal: 'Reach the exact charger without a detour or a dead end.',
    uncertainty: 'Does the pin match the real, accessible location?',
    breakpoint: { tone: 'error', label: 'Potential location or access issue' },
  },
  {
    num: '04',
    icon: 'plug',
    title: 'Start session',
    desc: 'Reach the charger, verify compatibility and start the charging session through the available MyMotor charging flow.',
    goal: 'Plug in and have charging actually begin.',
    uncertainty: 'Will the session start, and will I know if it does not?',
    breakpoint: { tone: 'error', label: 'Potential session-state failure' },
  },
  {
    num: '05',
    icon: 'bolt',
    title: 'Charge',
    desc: 'Monitor the live charging session and its status.',
    goal: 'See progress and know when I can leave.',
    uncertainty: 'Is the status I see the real status of the session?',
    breakpoint: { tone: 'warning', label: 'Potential session-status mismatch' },
  },
  {
    num: '06',
    icon: 'check',
    title: 'Complete & pay',
    desc: 'Complete the charging session, payment and retain the relevant transaction information.',
    goal: 'End cleanly, pay once, and keep a record.',
    uncertainty: 'Did the payment settle, and is the receipt there if I need it?',
    breakpoint: { tone: 'error', label: 'Potential transaction-state mismatch' },
  },
]

/* ---- App showcase --------------------------------------------------------- */

export const SHOWCASE_HEADER = {
  title: 'A connected experience on the go',
  lead: 'Discover. Navigate. Charge. Pay. All in one app.',
  disclaimer:
    'Conceptual MyMotor journey screens based on publicly available product information.',
} as const

export type ScreenVariant = 'find' | 'navigate' | 'session'

export const SHOWCASE_SCREENS: { variant: ScreenVariant; caption: string }[] = [
  { variant: 'find', caption: '01 — Find chargers' },
  { variant: 'navigate', caption: '02 — Choose and navigate' },
  { variant: 'session', caption: '03 — Track your session' },
]

export const CAPABILITY_CARD = {
  title: 'One app. Many networks. A smoother journey.',
  bullets: [
    'Multiple charging networks',
    'Real-time availability',
    'Live session tracking',
    'Single wallet for charging',
  ],
  source: 'Publicly observed',
} as const

/* ---- Where the journey can break --------------------------------------- */

export const BREAK_HEADER = {
  title: 'Where the journey can break',
  lead: 'At each step, multiple factors can cause delay, failure or uncertainty — for the user and behind the scenes.',
} as const

export const RISK_LEGEND: { tone: StatusTone; label: string }[] = [
  { tone: 'success', label: 'Lower risk' },
  { tone: 'warning', label: 'Moderate risk' },
  { tone: 'error', label: 'Higher risk' },
]

export interface CustomerRow {
  icon: IconName
  step: string
  line: string
  state: string
}

export const CUSTOMER_ROWS: CustomerRow[] = [
  { icon: 'search', step: 'Find', line: 'I look for a nearby charger.', state: 'Curious' },
  { icon: 'sliders', step: 'Decide', line: 'I compare options and choose.', state: 'Confident' },
  { icon: 'map-pin', step: 'Arrive', line: 'I reach the charger location.', state: 'Hopeful' },
  { icon: 'bolt', step: 'Charge', line: 'I start and monitor the session.', state: 'Waiting' },
  { icon: 'check', step: 'Leave', line: 'I complete the transaction and continue my journey.', state: 'Satisfied' },
]

export interface DependencyRow {
  icon: IconName
  label: string
  desc: string
  risk: { tone: RiskTone; text: string }
}

export const DEPENDENCY_ROWS: DependencyRow[] = [
  {
    icon: 'wifi',
    label: 'Availability data',
    desc: 'Live charger state needs to be current.',
    risk: { tone: 'warning', text: 'Potential availability mismatch' },
  },
  {
    icon: 'file',
    label: 'Charger information',
    desc: 'Location, connector type, pricing and station information.',
    risk: { tone: 'warning', text: 'Potential compatibility issue' },
  },
  {
    icon: 'compass',
    label: 'Navigation & location',
    desc: 'Maps, directions and physical charger access.',
    risk: { tone: 'error', text: 'Potential location or access issue' },
  },
  {
    icon: 'cog',
    label: 'Session management',
    desc: 'Charging session start / stop and status.',
    risk: { tone: 'error', text: 'Potential session-state failure' },
  },
  {
    icon: 'wallet',
    label: 'Payments & wallet',
    desc: 'Transaction processing and confirmation.',
    risk: { tone: 'error', text: 'Potential transaction-state mismatch' },
  },
  {
    icon: 'headset',
    label: 'Customer support',
    desc: 'Issue resolution when the journey does not complete normally.',
    risk: { tone: 'warning', text: 'Potential resolution delay' },
  },
]

export const BREAK_NOTE =
  'Hypothetical failure modes and operational questions — not claims that these failures occur at MyMotor, and not measured rates. Each is a potential breakpoint to check against real feedback.'

/* ---- The moment that matters ------------------------------------------- */

export const MOMENT = {
  title: 'The moment that matters',
  body: 'The customer does not care which system failed. They care whether they can charge, complete the session, and continue the journey.',
  quote:
    'A great EV charging experience feels effortless. The complexity should be invisible to the user.',
  quoteLabel: 'Working design principle',
} as const

/* ---- TPM lens --------------------------------------------------------- */

export interface TpmQuestion {
  icon: IconName
  question: string
  detail: string
}

export const TPM_QUESTIONS: TpmQuestion[] = [
  {
    icon: 'eye',
    question: 'What should the customer see?',
    detail: 'How do we communicate status, delays and next steps clearly?',
  },
  {
    icon: 'database',
    question: 'What state should the system know?',
    detail: 'How do we track, reconcile and validate every session and payment?',
  },
  {
    icon: 'users',
    question: 'Who owns the exception?',
    detail: 'How do we route, escalate and resolve issues across providers?',
  },
  {
    icon: 'clock',
    question: 'How quickly should it recover?',
    detail: 'What are the SLAs and TATs for different failure scenarios?',
  },
]

export const TPM_HEADER = {
  eyebrow: 'My TPM lens',
  title: 'Key questions this journey raises',
} as const

export const TRANSITION = {
  eyebrow: 'Next: listen to the customer',
  heading:
    "Now that we understand the journey, let's look at what real users are saying about their experience.",
  ctaLabel: 'Explore Public Feedback',
} as const
