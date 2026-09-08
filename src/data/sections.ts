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
    status: 'done',
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
    status: 'done',
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
    title: 'Reliability Analysis',
    tagline:
      'Turning the customer feedback into a structured reliability analysis — journey failure points, potential root causes, customer impact, and the problems worth solving.',
    phase: 'Prioritization',
    status: 'done',
    planned: [
      'Journey failure points with qualitative, illustrative risk levels',
      'Three-way analysis — reliability signals / inferred root causes / customer impact',
      'The reliability gap: expected state vs actual state → uncertainty',
      'A proposed exception-management model (detect → classify → assign → escalate → resolve → communicate)',
      'Reliability opportunity areas + an illustrative prioritization',
      'Why transaction reliability deserves the deepest look → hand-off to the Control Tower',
    ],
    absorbs: [
      'Brief §4 — Problem prioritization',
      'Brief §5, §8, §9, §10 (proposed solution / PRD / RCA / metrics) → moved into §5 Control Tower / §6 Prototype',
    ],
  },
  {
    id: 'control-tower',
    num: '05',
    path: '/control-tower',
    navLabel: 'Control Tower',
    title: 'Reliability Control Tower',
    tagline:
      'A proposed operational model for turning reliability issues into action — detect, understand, act, learn — with a conceptual dashboard, transaction and exception monitoring, a severity model, vendor scorecards, incident workflow, a conceptual architecture and a metrics framework.',
    phase: 'Proposed solution → Operational workflow → Technical design → Metrics',
    status: 'done',
    planned: [
      'The control-tower job — detect / understand / act / learn — and a proposed user model (ops, product, support, vendor management)',
      'Conceptual reliability dashboard — KPI header, reliability trend, issues by category and region (illustrative data, labelled "not internal ZOOP data")',
      'Transaction monitoring + a proposed transaction state model; an exception queue + a proposed P0–P3 severity model',
      'Customer-impact prioritisation and a worked, conceptual incident diagnosis',
      'Vendor & dependency health + a proposed vendor-governance framework; SLA / escalation logic; an 8-step incident workflow',
      'Operator actions, audit trail and control considerations (RBAC, permissioned actions, audit logs); proposed alerting rules',
      'A conceptual control-tower architecture flow (labelled "not internal ZOOP architecture")',
      'A proposed metrics framework + candidate north star; the reactive → proactive operating-model shift; validation questions',
    ],
    absorbs: [
      'Brief §5 — Proposed solution (operational model)',
      'Brief §6 — Control Tower + technical thinking',
      'Brief §7 — Vendor management',
      'Brief §10 — Metrics framework',
    ],
  },
  {
    id: 'prototype',
    num: '06',
    path: '/prototype',
    navLabel: 'Prototype',
    title: 'Interactive Prototype',
    tagline:
      'A clickable operator workflow — detect, investigate, act, resolve, learn — that turns the conceptual Control Tower into a working experience.',
    phase: 'Proposed solution in practice',
    status: 'done',
    planned: [
      'A conceptual operator workflow with a laptop / phone hero mockup',
      'A stepper-driven payment-incident walkthrough (detect → investigate → act → resolve → learn)',
      'Incident detail: Overview, Timeline, Customer Impact, Diagnostics, Related Transactions tabs',
      'Action panel — owner assignment, escalation, provider contact, customer status',
      'A proposed role model with request → approve for financially sensitive actions',
      'A live illustrative audit log, a resolution state and an RCA / closure step',
      'Four further scenarios (charger, vehicle data, high-impact, vendor)',
      'Prototype highlights, design principles, the Control Tower → prototype mapping',
      'Production-validation questions and a full case-study recap',
    ],
    absorbs: [
      'Brief §11 — Interactive prototype',
      'Demonstrates Brief §5 (proposed solution), §8 (PRD as a working flow) and §9 (RCA) in practice',
    ],
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
