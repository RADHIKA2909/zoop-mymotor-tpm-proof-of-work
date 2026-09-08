/**
 * Information architecture for the case study.
 *
 * The reference design uses a 6-item top nav (Context, Journey, Feedback,
 * Reliability, Control Tower, Prototype). The interview brief lists ~11 areas;
 * those fold INTO these six as sub-blocks (see `planned` + `absorbs`). The story
 * still runs end to end:
 *
 *   public user evidence -> problem discovery -> prioritization -> product
 *   proposal -> operational workflow -> technical design -> metrics -> prototype
 *   -> rollout / UAT / monitoring
 */

export type SectionStatus = 'planned' | 'in-progress' | 'done'

export interface SectionDef {
  /** Stable key. */
  id: string
  /** Display number, e.g. "01". */
  num: string
  /** URL path. */
  path: string
  /** Short label for the top nav. */
  navLabel: string
  /** Full section title. */
  title: string
  /** One-line description of the section's job in the argument. */
  tagline: string
  /** Where this sits in the end-to-end narrative. */
  phase: string
  status: SectionStatus
  /** Planned content blocks — shown in the placeholder until the section is built. */
  planned: string[]
  /** Which brief areas this section absorbs. */
  absorbs: string[]
}

export const SECTIONS: SectionDef[] = [
  {
    id: 'context',
    num: '01',
    path: '/context',
    navLabel: 'Context',
    title: 'ZOOP × MyMotor — Ecosystem Context',
    tagline:
      'What ZOOP Energy does, where MyMotor sits, and why this product maps to the Technical Product Manager role.',
    phase: 'Context',
    status: 'done',
    planned: [
      'What ZOOP Energy does — business / freight side (labelled as brief-derived / assumption)',
      'MyMotor — the consumer / B2C side, from public product information',
      'Why MyMotor is the right lens for this TPM role (operations, transactions, vendors, APIs)',
      'Key consumer journeys at a glance',
      'Conceptual ecosystem map: driver → app → charging networks / payment / government systems (labelled "not internal architecture")',
    ],
    absorbs: ['Brief §1 — ZOOP + MyMotor context'],
  },
  {
    id: 'journey',
    num: '02',
    path: '/journey',
    navLabel: 'Journey',
    title: 'The Consumer Journey',
    tagline:
      'Mapping the end-to-end journeys and marking every point where failure, delay or uncertainty can enter.',
    phase: 'Problem discovery',
    status: 'planned',
    planned: [
      'Vehicle / service journey map (discover → check info → select action → transaction → external API → result → receipt → history / support)',
      'EV charging journey map (discover charger → check availability → navigate → start → monitor → pay → receipt / history)',
      'Failure, delay and uncertainty points called out on each map',
      'Moments that matter for trust',
    ],
    absorbs: ['Brief §2 — User / customer journey'],
  },
  {
    id: 'feedback',
    num: '03',
    path: '/feedback',
    navLabel: 'Feedback',
    title: 'Customer Feedback Analysis',
    tagline:
      'A structured read of real public app reviews — themes, signals, pain points, severity and customer impact.',
    phase: 'Problem discovery',
    status: 'planned',
    planned: [
      'Review corpus and method (source, window, how coded) — using evidence provided, no fabricated counts',
      'Themes: RTO / vehicle-data accuracy, challan / payment, real-time updates, documents, EV charging, UX, support, feature requests',
      'Observed positive signals vs. observed pain points',
      'Repeated issues, severity and customer impact',
      'What the reviews do and do not tell us',
    ],
    absorbs: ['Brief §3 — Customer feedback analysis'],
  },
  {
    id: 'reliability',
    num: '04',
    path: '/reliability',
    navLabel: 'Reliability',
    title: 'Transaction Reliability & Exception Management',
    tagline:
      'From the review analysis to a prioritized problem, a proposed solution, a mini-PRD, an incident / RCA workflow and a metrics framework.',
    phase: 'Prioritization → Product proposal → Technical design → Metrics',
    status: 'planned',
    planned: [
      'Problem prioritization — scoring across frequency, customer / business / operational impact, complexity, role relevance, automation opportunity',
      'The one primary problem selected for the case study',
      'Proposed solution (working name: Transaction Reliability & Exception Management) — components chosen after the analysis',
      'Mini-PRD — problem, goals, non-goals, user stories, functional requirements, business rules, exception cases, acceptance criteria, rollout, post-launch monitoring',
      'Example production incident + RCA template (detection → triage → mitigation → customer resolution → preventive action)',
      'KPI framework — proposed north star + supporting metrics + guardrails (all labelled "proposed")',
    ],
    absorbs: [
      'Brief §4 — Problem prioritization',
      'Brief §5 — Proposed solution',
      'Brief §8 — Mini PRD',
      'Brief §9 — RCA / incident workflow',
      'Brief §10 — Metrics',
    ],
  },
  {
    id: 'control-tower',
    num: '05',
    path: '/control-tower',
    navLabel: 'Control Tower',
    title: 'The Control Tower',
    tagline:
      'A proposed operations console for real-time transaction monitoring, exception handling and vendor management — plus the technical architecture behind it.',
    phase: 'Operational workflow → Technical design',
    status: 'planned',
    planned: [
      'Control Tower dashboard concept — KPI header, transaction table, filters, transaction detail view',
      'Proposed technical architecture — client → API → orchestration → vendors → webhooks / polling → event processing → transaction state → monitoring / exception engine → tower → ops / support / vendor → customer resolution (labelled "proposed architecture")',
      'Technical concepts where relevant — state machines, idempotency, retries, timeouts, reconciliation, webhooks, SLA timers, alerting, audit logs, RBAC, observability',
      'Vendor management — performance scorecards, vendor lifecycle (onboarding → integration validation → UAT → production → monitoring → SLA tracking → incident management → review → offboarding)',
    ],
    absorbs: [
      'Brief §6 — Control Tower',
      'Brief §6/§7 — Control Tower technical thinking',
      'Brief §7 — Vendor management',
    ],
  },
  {
    id: 'prototype',
    num: '06',
    path: '/prototype',
    navLabel: 'Prototype',
    title: 'Interactive Prototype',
    tagline:
      'Clickable screens of the proposed solution — the operator view and the customer view, side by side.',
    phase: 'Prototype → Rollout / UAT / Monitoring',
    status: 'planned',
    planned: [
      'Control Tower dashboard (interactive)',
      'Transaction detail view',
      'Exception management queue',
      'Vendor performance view',
      'Incident / RCA detail',
      'Customer-facing transaction status',
      'Resolution / reconciliation workflow',
      'Rollout, UAT and post-release monitoring plan for shipping this',
    ],
    absorbs: ['Brief §11 — Interactive prototype'],
  },
]

export const SECTION_BY_ID: Record<string, SectionDef> = Object.fromEntries(
  SECTIONS.map((s) => [s.id, s]),
)

export function getAdjacentSections(id: string): {
  prev?: SectionDef
  next?: SectionDef
} {
  const i = SECTIONS.findIndex((s) => s.id === id)
  if (i === -1) return {}
  return {
    prev: i > 0 ? SECTIONS[i - 1] : undefined,
    next: i < SECTIONS.length - 1 ? SECTIONS[i + 1] : undefined,
  }
}

/** Narrative spine shown on the landing page. */
export const NARRATIVE_FLOW: string[] = [
  'Public user evidence',
  'Problem discovery',
  'Prioritization',
  'Product proposal',
  'Operational workflow',
  'Technical design',
  'Metrics',
  'Prototype',
  'Rollout / UAT / monitoring',
]

/** Progress across the six buildable sections. */
export function buildProgress(): { done: number; total: number } {
  return {
    done: SECTIONS.filter((s) => s.status === 'done').length,
    total: SECTIONS.length,
  }
}
