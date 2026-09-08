/**
 * Section 3 — all copy + the local review-evidence dataset.
 *
 * CREDIBILITY RULES (see the section guide + CLAUDE.md §21):
 * - There is no scored review dataset. Every entry below is a PARAPHRASED
 *   summary of a signal observed in public Google Play / App Store reviews —
 *   representative, NOT a verbatim quote. `rating` is our read of the sentiment
 *   strength, not a scraped star rating.
 * - No fabricated quantitative values anywhere: no review counts, sentiment %,
 *   theme %, trends, failure rates. The only number shown in the section is
 *   MyMotor's own publicly-stated "4.7 / 25K+ reviews" (from company.ts
 *   PUBLIC_FACTS), attributed to mymotor.in.
 * - Anything beyond an observed signal / public fact is labelled Inferred /
 *   Proposed / Conceptual / Illustrative in the UI.
 */
import type { IconName } from '@/components/ui/Icon'

export const HERO = {
  eyebrowNumber: '03',
  eyebrow: 'Customer Feedback Analysis',
  titleLine1: 'Real user voices.',
  titleLine2: 'Real product insights.',
  supporting:
    'I analysed recent MyMotor app reviews to understand what users love, what frustrates them, and where reliability gaps show up across the journey.',
  badges: ['Public user reviews', 'Google Play + App Store', 'Publicly available data'],
  script: ["Users don't just give ratings —", 'they give us a roadmap.'],
  statedRating: {
    value: '4.7 ★',
    count: '25K+ reviews',
    label: "MyMotor's publicly stated rating (mymotor.in) — a marketing figure, not this analysis.",
  },
} as const

export const OVERVIEW = {
  eyebrow: 'Review overview',
  title: 'What are users saying about MyMotor?',
  lead: 'I reviewed publicly available app-store feedback to identify recurring user needs, frustrations and reliability signals.',
  note: 'Quantitative review percentages are not claimed here — no defined dataset was scored. This is a qualitative synthesis of public feedback, and every card is labelled with what kind of claim it is.',
  cards: [
    {
      label: 'Public reviews',
      value: 'Google Play + App Store',
      hint: 'Recent user feedback read for recurring themes and product issues.',
      icon: 'message' as IconName,
    },
    {
      label: 'Platforms',
      value: '2',
      hint: 'Google Play and the Apple App Store.',
      icon: 'grid' as IconName,
    },
    {
      label: 'Feedback',
      value: 'Positive + negative',
      hint: 'Both strengths and pain points were analysed, not just complaints.',
      icon: 'thumb-up' as IconName,
    },
    {
      label: 'Primary lens',
      value: 'Reliability',
      hint: 'Availability, transaction state, data quality and issue resolution.',
      icon: 'shield' as IconName,
    },
  ],
} as const

/* ---- Themes ------------------------------------------------------------- */

export interface Theme {
  id: string
  name: string
  icon: IconName
  signal: string
  description: string
  tags: string[]
}

export const THEMES: Theme[] = [
  {
    id: 'charger',
    name: 'Charger availability & coverage',
    icon: 'plug',
    signal: 'Reliability-sensitive',
    description:
      'Users need confidence that a charger shown in the app is actually usable when they arrive, and want broader coverage.',
    tags: ['availability', 'coverage', 'integration'],
  },
  {
    id: 'payments',
    name: 'Payments & transactions',
    icon: 'card',
    signal: 'Reliability-sensitive',
    description:
      'When money moves but the transaction state stays unclear, trust drops quickly — even if a refund follows later.',
    tags: ['eChallan', 'payment stuck', 'refund'],
  },
  {
    id: 'data',
    name: 'Data accuracy & freshness',
    icon: 'database',
    signal: 'Recurring',
    description:
      'Users experience stale or incorrect information as a product problem, regardless of which upstream system caused it.',
    tags: ['stale data', 'tax / permit', 'insurance status'],
  },
  {
    id: 'navigation',
    name: 'Navigation & location',
    icon: 'compass',
    signal: 'Mixed',
    description:
      'Finding the right charger only helps if the map, location and navigation experience stay trustworthy.',
    tags: ['map', 'location', 'directions'],
  },
  {
    id: 'support',
    name: 'Customer support & resolution',
    icon: 'headset',
    signal: 'Mixed',
    description:
      'Support can recover a broken journey, but users still expect faster and clearer resolution while they wait.',
    tags: ['helpful support', 'resolution time', 'contact options'],
  },
  {
    id: 'app',
    name: 'App experience & usability',
    icon: 'star',
    signal: 'Mostly positive',
    description:
      'The core experience is frequently appreciated — which makes reliability issues stand out even more when they occur.',
    tags: ['fast', 'clean UI', 'all-in-one', 'no ads'],
  },
]

export const THEME_BY_ID: Record<string, Theme> = Object.fromEntries(
  THEMES.map((t) => [t.id, t]),
)

/* ---- Review evidence (paraphrased, not verbatim) --------------------- */

export type Sentiment = 'positive' | 'negative' | 'mixed'

export interface ReviewSignal {
  id: string
  sentiment: Sentiment
  /** Our read of the sentiment strength (1–5) — NOT a scraped star rating. */
  rating: 1 | 2 | 3 | 4 | 5
  themeId: string
  reliability: boolean
  /** Paraphrased summary of an observed review signal. */
  summary: string
}

export const REVIEWS: ReviewSignal[] = [
  {
    id: 'r-fast',
    sentiment: 'positive',
    rating: 5,
    themeId: 'app',
    reliability: false,
    summary:
      'App is fast and easy to use — having challan, RC, insurance and charging in one place is genuinely convenient.',
  },
  {
    id: 'r-accurate',
    sentiment: 'positive',
    rating: 5,
    themeId: 'data',
    reliability: false,
    summary:
      'Vehicle and RTO information is detailed and accurate, and the ad-free experience is appreciated.',
  },
  {
    id: 'r-challan-status',
    sentiment: 'positive',
    rating: 4,
    themeId: 'data',
    reliability: false,
    summary:
      'Real-time challan status is useful for staying on top of pending fines.',
  },
  {
    id: 'r-clean-ui',
    sentiment: 'positive',
    rating: 4,
    themeId: 'app',
    reliability: false,
    summary:
      'Clean, user-friendly interface — a smarter, simpler way to handle everyday vehicle admin.',
  },
  {
    id: 'r-support-good',
    sentiment: 'positive',
    rating: 4,
    themeId: 'support',
    reliability: false,
    summary:
      'Support team was responsive and helped resolve an issue that came up.',
  },
  {
    id: 'r-delayed-updates',
    sentiment: 'negative',
    rating: 2,
    themeId: 'data',
    reliability: false,
    summary:
      'Some information updates felt delayed — details took time to reflect the latest state.',
  },
  {
    id: 'r-tax-permit-missing',
    sentiment: 'negative',
    rating: 2,
    themeId: 'data',
    reliability: false,
    summary: 'Tax and permit information was not showing for the vehicle.',
  },
  {
    id: 'r-blank-screen',
    sentiment: 'negative',
    rating: 2,
    themeId: 'app',
    reliability: false,
    summary:
      'Opening recent history → the vehicle tab showed a blank screen.',
  },
  {
    id: 'r-map-usability',
    sentiment: 'negative',
    rating: 3,
    themeId: 'navigation',
    reliability: false,
    summary:
      'Map usability feels limited — the location and interaction experience could be better.',
  },
  {
    id: 'r-charger-coverage',
    sentiment: 'mixed',
    rating: 3,
    themeId: 'charger',
    reliability: false,
    summary:
      'Requests for more charging networks to be integrated and for wider charger coverage.',
  },
  {
    id: 'r-charger-mismatch',
    sentiment: 'negative',
    rating: 2,
    themeId: 'charger',
    reliability: true,
    summary:
      'A charger showed as available in the app, but the experience at the location did not match.',
  },
  {
    id: 'r-echallan-stuck',
    sentiment: 'negative',
    rating: 1,
    themeId: 'payments',
    reliability: true,
    summary:
      "eChallan payment got stuck 'in progress' and the status did not update.",
  },
  {
    id: 'r-money-deducted',
    sentiment: 'negative',
    rating: 1,
    themeId: 'payments',
    reliability: true,
    summary:
      'Money was deducted but the transaction stayed unresolved for some time.',
  },
  {
    id: 'r-govt-server-refund',
    sentiment: 'mixed',
    rating: 2,
    themeId: 'payments',
    reliability: true,
    summary:
      'A payment could not complete due to a government server issue; it was eventually refunded.',
  },
  {
    id: 'r-stale-owner',
    sentiment: 'negative',
    rating: 2,
    themeId: 'data',
    reliability: false,
    summary:
      'Previous-owner details stayed old even after the RC / VAHAN record was updated.',
  },
  {
    id: 'r-insurance-pending',
    sentiment: 'negative',
    rating: 2,
    themeId: 'data',
    reliability: false,
    summary:
      "Insurance status kept appearing as 'pending' when it should not have.",
  },
  {
    id: 'r-docs-download',
    sentiment: 'negative',
    rating: 2,
    themeId: 'app',
    reliability: false,
    summary: 'Documents would not download from the app.',
  },
  {
    id: 'r-contact-options',
    sentiment: 'negative',
    rating: 3,
    themeId: 'support',
    reliability: false,
    summary:
      'Wanted an easier, clearer way to contact support during an active issue.',
  },
  {
    id: 'r-support-refund',
    sentiment: 'mixed',
    rating: 3,
    themeId: 'support',
    reliability: true,
    summary:
      'After a stuck payment, support helped get a refund — resolved in the end, but it took time and follow-up.',
  },
]

export const REVIEW_EVIDENCE_LABEL =
  'Paraphrased from public Google Play / App Store reviews — representative of observed feedback, not verbatim quotes. Sentiment is our reading, not a scraped rating.';

export type ReviewFilterValue =
  | 'all'
  | 'positive'
  | 'negative'
  | 'reliability'
  | `theme:${string}`

export const SENTIMENT_FILTERS: { id: ReviewFilterValue; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'positive', label: 'Positive' },
  { id: 'negative', label: 'Negative' },
  { id: 'reliability', label: 'Reliability' },
]

export function filterReviews(reviews: ReviewSignal[], filter: ReviewFilterValue) {
  if (filter === 'all') return reviews
  if (filter === 'positive') return reviews.filter((r) => r.sentiment === 'positive')
  if (filter === 'negative')
    return reviews.filter((r) => r.sentiment === 'negative' || r.sentiment === 'mixed')
  if (filter === 'reliability') return reviews.filter((r) => r.reliability)
  const themeId = filter.slice('theme:'.length)
  return reviews.filter((r) => r.themeId === themeId)
}

/* ---- Real user voices (representative) ------------------------------- */

export const VOICES_HEADER = {
  eyebrow: 'Representative feedback',
  title: 'What users are actually saying',
  lead: 'A few representative comments reveal the moments where the experience feels effortless — and where trust breaks. Paraphrased, not verbatim.',
} as const

export const VOICE_IDS = ['r-fast', 'r-charger-mismatch', 'r-money-deducted', 'r-support-refund']

/* ---- Recurring signals (keywords) --------------------------------- */

export const KEYWORDS = [
  'charger',
  'payment',
  'location',
  'support',
  'charging',
  'vehicle',
  'refund',
  'update',
  'accurate',
  'insurance',
  'tax',
  'document',
  'status',
  'map',
  'stuck',
  'helpful',
]

export const KEYWORDS_LABEL =
  'Observed recurring terms across reviewed feedback. Chip size is uniform — this is an evidence-synthesis visual, not a calculated NLP frequency chart.'

/* ---- Feedback signal panel --------------------------------------- */

export const WHAT_WORKS = [
  'Easy to use',
  'Useful, detailed vehicle information',
  'Clean UI',
  'Helpful support',
  'Convenient all-in-one experience',
]

export const WHAT_BREAKS = [
  'Stale information',
  'Payment uncertainty',
  'Charger availability mismatch',
  'Status / data issues',
  'Document / download issues',
  'Delayed resolution',
]

/* ---- Positive vs pain ------------------------------------------- */

export const POS_PAIN = {
  title: 'Users love the convenience. They struggle when the system becomes uncertain.',
  works: [
    'Easy to use',
    'Fast',
    'Accurate vehicle information',
    'All-in-one experience',
    'Clean UI / UX',
    'Helpful support',
  ],
  breaks: [
    'Stale information',
    'Incorrect status',
    'Payment stuck',
    'Charger availability mismatch',
    'Document download issues',
    'Unclear transaction state',
    'Delayed resolution',
  ],
  insight:
    'The contrast matters: the product creates strong value when the journey is smooth, but trust becomes fragile when users cannot tell what state the system is actually in.',
} as const

/* ---- Key insights (dark section) ------------------------------- */

export const INSIGHTS_HEADER = {
  eyebrow: 'What this means',
  title: 'Key takeaways for a TPM',
  lead: 'The reviews point beyond isolated bugs. They reveal moments where users lose confidence because the product cannot clearly communicate the current state of a real-world transaction or service.',
} as const

export interface Insight {
  icon: IconName
  title: string
  body: string
}

export const INSIGHTS: Insight[] = [
  {
    icon: 'shield',
    title: 'Reliability matters more than feature breadth',
    body: 'Users appreciate the breadth of MyMotor, but issues around payments, charger availability and data freshness can quickly outweigh that convenience.',
  },
  {
    icon: 'database',
    title: 'Data freshness is part of the product experience',
    body: 'A stale or incorrect status is experienced as a product failure even when the underlying source system is responsible.',
  },
  {
    icon: 'eye',
    title: 'Uncertainty is worse than a visible failure',
    body: 'When users know something failed, they can decide what to do next. When payment, charger or status information is unclear, they are left waiting.',
  },
  {
    icon: 'refresh',
    title: 'Recovery is part of the experience',
    body: 'Support can turn a failure into a recoverable experience — but the product should first detect, communicate and route the exception quickly.',
  },
]

export const UNCERTAINTY = {
  statement: [
    "The customer doesn't experience an API failure.",
    'They experience uncertainty.',
  ],
  model: ['Charger state', 'Session state', 'Transaction state', 'Customer communication', 'Resolution'],
  modelLabel: 'Conceptual reliability model — not ZOOP’s internal architecture.',
} as const

/* ---- From feedback to problems --------------------------------- */

export const PROBLEM_FLOW_HEADER = {
  eyebrow: 'From feedback to product problems',
  title: 'From customer feedback to problems worth solving',
  lead: 'Individual complaints are useful signals, but the PM job is to identify the recurring problem underneath them.',
  flow: [
    'User feedback',
    'Recurring theme',
    'User problem',
    'Operational / system signal',
    'Prioritized problem',
  ],
} as const

export interface Problem {
  id: string
  title: string
  userSignal: string
  underlyingSignal: string
  productImplication: string
}

export const PROBLEMS: Problem[] = [
  {
    id: 'charger-mismatch',
    title: 'Charger availability mismatch',
    userSignal:
      'Users may see a charger as available but experience something different when they arrive.',
    underlyingSignal:
      'Availability data may become stale or differ from the actual charger state.',
    productImplication:
      'Users need trustworthy availability and clearer exception handling when it is wrong.',
  },
  {
    id: 'transaction-uncertainty',
    title: 'Transaction state uncertainty',
    userSignal:
      'Payments can remain stuck or unclear after money has been deducted.',
    underlyingSignal:
      'Different systems may not share a consistently visible transaction state.',
    productImplication:
      'The customer needs a clear state, a next step, and an expected resolution time.',
  },
  {
    id: 'data-freshness',
    title: 'Data freshness and accuracy',
    userSignal:
      'Vehicle, insurance, tax or permit information may not always reflect the latest source data.',
    underlyingSignal:
      'Data synchronisation lag or dependency on an upstream source.',
    productImplication:
      'The product needs better freshness visibility and exception handling.',
  },
  {
    id: 'exception-resolution',
    title: 'Slow exception resolution',
    userSignal:
      'Users appreciate support but sometimes experience delays while an issue is being resolved.',
    underlyingSignal:
      'Exceptions may require coordination across internal teams or external providers.',
    productImplication:
      'Ownership, escalation and SLA visibility become important.',
  },
]

export const PROBLEM_LABEL = 'Inferred / Proposed'

/* ---- Prioritization matrix ----------------------------------- */

export const MATRIX_HEADER = {
  title: 'Not every complaint needs the same response.',
  lead: 'The next step is not to fix every issue mentioned in a review. I want to prioritize the problems where customer impact and reliability risk intersect.',
  xAxis: 'Customer / operational impact',
  yAxis: 'Reliability signal',
  note: 'Illustrative prioritization based on public feedback signals — not internal ZOOP data. No numerical scores are claimed.',
} as const

/** x / y in 0–100. Highlighted = the two we investigate in Section 4. */
export const MATRIX_POINTS: {
  id: string
  label: string
  x: number
  y: number
  highlight?: boolean
}[] = [
  { id: 'transaction-uncertainty', label: 'Transaction state uncertainty', x: 82, y: 86, highlight: true },
  { id: 'charger-mismatch', label: 'Charger availability mismatch', x: 70, y: 72, highlight: true },
  { id: 'data-freshness', label: 'Data freshness & accuracy', x: 58, y: 46 },
  { id: 'exception-resolution', label: 'Slow exception resolution', x: 44, y: 60 },
]

/* ---- TPM lens ------------------------------------------------ */

export const TPM_HEADER = {
  eyebrow: 'My TPM lens',
  title: 'The reviews changed the question.',
  before: 'Which features should we build?',
  after:
    'Where does the customer journey lose reliability, and how can we detect and recover from it?',
} as const

export interface TpmQuestion {
  num: string
  title: string
  body: string
  icon: IconName
}

export const TPM_QUESTIONS: TpmQuestion[] = [
  {
    num: '01',
    title: 'Detect',
    body: 'How quickly can we know that a transaction or service has failed?',
    icon: 'activity',
  },
  {
    num: '02',
    title: 'Diagnose',
    body: 'Can we distinguish a customer issue from a vendor, API or upstream-system issue?',
    icon: 'eye',
  },
  {
    num: '03',
    title: 'Assign',
    body: 'Does every exception have a clear owner and escalation path?',
    icon: 'users',
  },
  {
    num: '04',
    title: 'Recover',
    body: 'Can we communicate the right status and resolution path to the customer?',
    icon: 'refresh',
  },
]

export const TRANSITION = {
  eyebrow: 'Next: from feedback to reliability',
  heading: 'The reviews point to a bigger problem: reliability needs visibility.',
  supporting:
    "Next, I'll translate these user signals into a reliability model — identifying failure points, operational dependencies and the problems a control tower should help teams solve.",
  ctaLabel: 'Explore Reliability Analysis',
} as const
