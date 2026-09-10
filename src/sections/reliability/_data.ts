/**
 * Section 4 — all copy in one place.
 *
 * CREDIBILITY (same rules as Section 3 / CLAUDE.md §21): we have NO ZOOP-internal
 * data (failure rates, SLAs, vendor performance, incident logs, architecture,
 * escalation matrix, TAT). Everything here is:
 *  - OBSERVED  — public MyMotor product facts + the paraphrased review signals
 *               already established in Section 3.
 *  - INFERRED  — potential explanations for why an issue may occur.
 *  - PROPOSED / CONCEPTUAL / ILLUSTRATIVE — the reliability framework, exception
 *               model, dependency chain, prioritization and hypotheses.
 * Risk levels are qualitative (lower / moderate / higher) and explicitly
 * illustrative — never measured failure rates. Nothing here is ZOOP's internal
 * system.
 */
import type { IconName } from '@/components/ui/Icon'

export const HERO = {
  eyebrowNumber: '04',
  eyebrow: 'Reliability Analysis',
  titleLead: 'From user signals to',
  titleAccent: 'reliability insights.',
  supporting:
    'I analysed the customer feedback and journey to identify where reliability can break down, understand potential root causes, and define the key problems worth solving.',
  badges: ['Journey + feedback insights', 'Reliability focus', 'Conceptual analysis'],
  script: ['Reliability turns a good', 'journey into a great', 'experience.'],
} as const

/* ---- Three-way analysis --------------------------------------------- */

export interface SignalRow {
  num: string
  icon: IconName
  title: string
  desc: string
  badge: 'Recurring' | 'Observed'
}

export const SIGNALS: SignalRow[] = [
  {
    num: '01',
    icon: 'plug',
    title: 'Charger availability mismatch',
    desc: 'Chargers may appear available in the product while the real-world experience differs.',
    badge: 'Recurring',
  },
  {
    num: '02',
    icon: 'card',
    title: 'Transaction state uncertainty',
    desc: 'Payments can remain stuck or unclear after a transaction has been initiated.',
    badge: 'Recurring',
  },
  {
    num: '03',
    icon: 'database',
    title: 'Data accuracy and freshness',
    desc: 'Vehicle, tax, permit or insurance information may not always reflect the latest state.',
    badge: 'Recurring',
  },
  {
    num: '04',
    icon: 'headset',
    title: 'Slow exception resolution',
    desc: 'Users appreciate support, but some issues take time to resolve.',
    badge: 'Observed',
  },
  {
    num: '05',
    icon: 'map-pin',
    title: 'Navigation / location issues',
    desc: 'Users also report location and map-related friction.',
    badge: 'Observed',
  },
]

export interface CauseRow {
  num: string
  icon: IconName
  title: string
  desc: string
}

export const CAUSES: CauseRow[] = [
  {
    num: '01',
    icon: 'link',
    title: 'External dependencies',
    desc: 'Multiple partners, charging networks or upstream systems may influence the information shown to users.',
  },
  {
    num: '02',
    icon: 'refresh',
    title: 'Data synchronisation',
    desc: 'Delays or mismatches between systems can lead to stale or inconsistent information.',
  },
  {
    num: '03',
    icon: 'layers',
    title: 'Transaction complexity',
    desc: 'Payments and charging journeys may involve multiple states and systems, increasing the chance of unclear intermediate states.',
  },
  {
    num: '04',
    icon: 'eye',
    title: 'Limited real-time visibility',
    desc: 'Users may not see the actual system state when information is delayed or an exception occurs.',
  },
  {
    num: '05',
    icon: 'users',
    title: 'Support and escalation flow',
    desc: 'Resolving an exception may require coordination across internal teams and external providers.',
  },
]

export const CAUSES_NOTE =
  'Illustrative analysis based on public product information and user feedback — not internal ZOOP data. These are hypotheses, not confirmed causes.'

export interface ImpactCard {
  icon: IconName
  title: string
  voice: string
}

export const IMPACTS: ImpactCard[] = [
  {
    icon: 'eye',
    title: 'Uncertainty',
    voice: 'The user does not know whether the transaction or charging session succeeded.',
  },
  {
    icon: 'clock',
    title: 'Wasted time',
    voice: 'The user may need to wait, retry, contact support or find another option.',
  },
  {
    icon: 'shield',
    title: 'Loss of trust',
    voice: 'Repeated uncertainty can make users less confident in relying on the product.',
  },
  {
    icon: 'cog',
    title: 'Extra effort',
    voice: 'Users may have to manually verify information or resolve an issue themselves.',
  },
]

export const ANALYSIS_HEADERS = {
  signals: { eyebrow: 'Key reliability signals', title: 'What the feedback tells us', lead: 'Common reliability signals observed in user reviews and across the journey.' },
  causes: { eyebrow: 'Potential root causes', title: 'Why these issues might happen', lead: 'Illustrative analysis based on public information and user feedback — not internal ZOOP data.' },
  impact: { eyebrow: 'Impact on users', title: 'Why it matters', lead: 'Reliability issues create real friction and can affect trust, usage and overall satisfaction.' },
} as const

/* ---- Exception management model -------------------------------- */

export interface ExceptionStep {
  key: string
  label: string
  example: string
}

export const EXCEPTION = {
  title: 'A reliable experience needs more than a successful transaction.',
  lead: 'When the expected state does not happen, a reliable product still needs to detect it, make sense of it, and get the customer to a clear next step.',
  steps: [
    { key: 'event', label: 'Event', example: 'A payment remains pending.' },
    { key: 'detect', label: 'Detect', example: 'The system identifies that the expected state transition did not happen.' },
    { key: 'classify', label: 'Classify', example: 'Payment / vendor / upstream dependency / unknown.' },
    { key: 'assign', label: 'Assign', example: 'Route to the responsible team or provider.' },
    { key: 'escalate', label: 'Escalate', example: 'Trigger SLA-based escalation if it stays unresolved.' },
    { key: 'resolve', label: 'Resolve', example: 'Reconcile / retry / refund / recover where appropriate.' },
    { key: 'communicate', label: 'Communicate', example: 'Show the customer a clear state and next step.' },
  ] as ExceptionStep[],
  label: "Proposed exception management model — not ZOOP's current workflow.",
} as const

/* ---- Why transaction reliability ------------------------ */

export const TXN_FOCUS = {
  title: 'Why transaction reliability deserves deeper investigation',
  chain: [
    { label: 'Customer intent', value: '“Start charging.”' },
    { label: 'System action', value: 'Session / transaction initiated.' },
    { label: 'Expected state', value: 'Charging active.' },
    { label: 'Potential reality', value: 'Pending / failed / unknown.' },
    { label: 'Customer question', value: '“Did it work?”' },
    { label: 'Trust impact', value: 'Confidence in relying on the product drops.' },
  ],
  statement:
    'One unresolved transaction can create more friction than several missing convenience features.',
  label: 'Proposed product hypothesis — not a measured business result.',
} as const

/* ---- TPM takeaways (dark) ------------------------------ */

export const TAKEAWAYS_HEADER = {
  eyebrow: 'Key takeaways',
  title: 'What this means for a TPM',
  lead: 'Reliability is not just a technical problem — it is a product and operational challenge. Solving these issues should reduce friction, improve user trust and create a more reliable customer experience.',
} as const

export interface Takeaway {
  num: string
  icon: IconName
  title: string
  desc: string
}

export const TAKEAWAYS: Takeaway[] = [
  {
    num: '01',
    icon: 'target',
    title: 'Focus on real user impact',
    desc: 'Prioritize problems that directly affect trust and usage.',
  },
  {
    num: '02',
    icon: 'eye',
    title: 'Improve visibility',
    desc: 'Make real-time and system states clearer and more transparent.',
  },
  {
    num: '03',
    icon: 'refresh',
    title: 'Design for exceptions',
    desc: 'Detect, communicate and resolve issues instead of treating failures as isolated bugs.',
  },
  {
    num: '04',
    icon: 'gauge',
    title: 'Enable better operations',
    desc: 'Give teams the data and signals needed to proactively prevent issues.',
  },
]

export const CENTRAL_INSIGHT = {
  statement: [
    "The goal isn't simply to prevent every failure.",
    'It is to make failures visible, understandable and recoverable.',
  ],
  chain: ['Prevent', 'Detect', 'Diagnose', 'Resolve', 'Recover'],
} as const

export const TRANSITION = {
  eyebrow: 'Next: building a reliability control tower',
  heading: 'If reliability needs visibility, the next question is: what should the team see?',
  supporting:
    "Now that the key failure points and reliability problems are defined, I'll design a control tower that helps teams detect, monitor, triage and resolve operational exceptions.",
  ctaLabel: 'Explore Control Tower',
} as const
