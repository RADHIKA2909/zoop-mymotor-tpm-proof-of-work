/**
 * Section 5 — all copy + ALL mock data in one place.
 *
 * ⚠️ ILLUSTRATIVE DATA — NOT INTERNAL ZOOP DATA.
 * Per the section guide (§8, §34), realistic placeholder values are used here ONLY
 * to make the proposed Control Tower interface legible. Every data view in the UI
 * carries a visible "illustrative / not internal ZOOP data" label. Transaction and
 * incident IDs, provider names ("Provider A/B/C"), owners and timestamps are all
 * fictional. No real customer data.
 *
 * The Control Tower, its architecture, data model, workflows, severity model,
 * escalation logic, alert rules, metrics and vendor framework are a PROPOSED
 * concept for this TPM proof of work — not an existing ZOOP system.
 */
import type { IconName } from '@/components/ui/Icon'
import type { StatusTone } from '@/components/ui/StatusDot'

export const ILLUSTRATIVE = 'Illustrative operational data — not internal ZOOP data.'

export const HERO = {
  eyebrowNumber: '05',
  eyebrow: 'Reliability Control Tower',
  titleLead: 'From issues',
  titleAccent: 'to action.',
  supporting:
    'Once the failure points are clear, the next challenge is operational: detect issues early, understand their impact, assign ownership and resolve them before they become repeated customer problems.',
  badges: ['Proposed product concept', 'Operational visibility', 'Conceptual control tower'],
  script: ['A more reliable', 'tomorrow.'],
  visualCaption:
    'Conceptual Control Tower — designed from public product and role requirements.',
} as const

/* ---- Users ---------------------------------------------------------- */

export interface Persona {
  icon: IconName
  role: string
  needs: string[]
}

export const PERSONAS: Persona[] = [
  {
    icon: 'gauge',
    role: 'Operations / Control Tower',
    needs: ['Monitor transactions', 'Identify exceptions', 'Assign & escalate', 'Track resolution'],
  },
  {
    icon: 'target',
    role: 'Product Managers',
    needs: ['Spot recurring problems', 'Understand customer impact', 'Prioritise improvements', 'Watch post-release impact'],
  },
  {
    icon: 'headset',
    role: 'Support / Customer Experience',
    needs: ['See current transaction state', 'Know customer-impacting incidents', 'Know ownership', 'Communicate accurate status'],
  },
  {
    icon: 'network',
    role: 'Vendor / Partner Management',
    needs: ['Monitor partner performance', 'Spot SLA breaches', 'Track recurring vendor issues', 'Review reliability trends'],
  },
]

export const JOB = {
  eyebrow: 'The control tower job',
  title: 'What should the team see?',
  lead: 'A control tower should reduce the time between an issue occurring and the right action being taken.',
  cards: [
    { icon: 'eye', title: 'Detect', desc: 'Surface abnormal transaction, charger or service states early.' },
    { icon: 'layers', title: 'Understand', desc: 'Show what happened, who is affected and where the issue may have originated.' },
    { icon: 'bolt', title: 'Act', desc: 'Assign ownership, trigger escalation and coordinate resolution.' },
    { icon: 'refresh', title: 'Learn', desc: 'Turn incidents into trends, root causes and product improvements.' },
  ] as { icon: IconName; title: string; desc: string }[],
} as const

/* ---- Dashboard ------------------------------------------------------- */

export const CATEGORY_FILTERS = ['All', 'Charging', 'Payments', 'Vehicle data', 'Support'] as const
export type Category = (typeof CATEGORY_FILTERS)[number]

export const TIME_WINDOWS = ['Last 1 hour', 'Last 24 hours', 'Last 7 days', 'Last 30 days'] as const
export type TimeWindow = (typeof TIME_WINDOWS)[number]

export interface Kpi {
  label: string
  value: string
  unit?: string
  delta: string
  deltaDirection: 'up' | 'down' | 'flat'
  deltaGood: 'up' | 'down'
  tone: 'default' | 'success' | 'warning' | 'error' | 'info'
  series: number[]
}

export const KPIS: Kpi[] = [
  { label: 'Transactions', value: '12,480', delta: '+3.1% vs prev.', deltaDirection: 'up', deltaGood: 'up', tone: 'default', series: [8, 9, 8, 10, 11, 10, 12] },
  { label: 'Success rate', value: '96.8', unit: '%', delta: '−0.6 pts vs prev.', deltaDirection: 'down', deltaGood: 'up', tone: 'success', series: [97.5, 97.4, 97.2, 97.0, 96.9, 96.7, 96.8] },
  { label: 'Exceptions', value: '401', delta: '+18% vs prev.', deltaDirection: 'up', deltaGood: 'down', tone: 'warning', series: [280, 300, 320, 350, 360, 390, 401] },
  { label: 'Active incidents', value: '7', delta: '+2 vs prev.', deltaDirection: 'up', deltaGood: 'down', tone: 'error', series: [3, 4, 4, 5, 6, 6, 7] },
  { label: 'SLA at risk', value: '14', delta: '+5 vs prev.', deltaDirection: 'up', deltaGood: 'down', tone: 'warning', series: [6, 7, 9, 10, 11, 12, 14] },
  { label: 'Customers impacted', value: '86', delta: '+22 vs prev.', deltaDirection: 'up', deltaGood: 'down', tone: 'info', series: [40, 45, 52, 60, 68, 78, 86] },
]

export const TREND = {
  title: 'Is the system healthy right now?',
  current: [96.4, 96.8, 96.5, 96.2, 95.9, 96.1, 95.8, 96.3, 96.0, 95.7, 96.2, 96.8],
  previous: [97.4, 97.3, 97.5, 97.2, 97.4, 97.3, 97.1, 97.4, 97.2, 97.3, 97.1, 97.4],
  insight: 'Payment exceptions increased over the last observation window.',
} as const

export interface CategorySlice {
  label: string
  value: number
  color: string
}

export const ISSUES_BY_CATEGORY: CategorySlice[] = [
  { label: 'Payment', value: 157, color: 'var(--viz-4)' },
  { label: 'Charger', value: 112, color: 'var(--viz-1)' },
  { label: 'App & data', value: 68, color: 'var(--viz-3)' },
  { label: 'Account', value: 44, color: 'var(--viz-5)' },
  { label: 'Other', value: 20, color: 'var(--viz-6)' },
]

export const ISSUES_BY_REGION = [
  { label: 'Bengaluru', value: 26 },
  { label: 'Mumbai', value: 22 },
  { label: 'Delhi', value: 19 },
  { label: 'Hyderabad', value: 14 },
  { label: 'Chennai', value: 11 },
  { label: 'Other', value: 8 },
]

/* ---- Transactions -------------------------------------------------- */

export type TxStatus = 'Healthy' | 'At risk' | 'Escalated' | 'Resolved'

export interface Txn {
  id: string
  journey: string
  state: string
  dependency: string
  age: string
  impact: string
  status: TxStatus
  owner: string
  timeline: { time: string; label: string }[]
  diagnosis: Diagnosis
}

export const TXNS: Txn[] = [
  {
    id: 'TX-10482',
    journey: 'EV charging',
    state: 'Payment pending',
    dependency: 'Payment provider',
    age: '8m',
    impact: '1 customer',
    status: 'At risk',
    owner: 'Payments Ops',
    timeline: [
      { time: 'T+00:00', label: 'Session ended, payment initiated' },
      { time: 'T+00:03', label: 'Provider acknowledged request' },
      { time: 'T+00:08', label: 'No confirmation callback received — state held as pending' },
    ],
    diagnosis: {
      incident: 'Payment pending',
      expected: 'Payment → Success',
      actual: 'Payment → Pending',
      signals: ['Upstream provider response delayed', 'Callback / webhook not received', 'State reconciliation delayed'],
      dependency: 'External payment provider',
      owner: 'Payments Operations',
      nextAction: 'Verify provider state → reconcile transaction → communicate status',
    },
  },
  {
    id: 'TX-10479',
    journey: 'EV charging',
    state: 'Session active',
    dependency: 'Charging network',
    age: '—',
    impact: '—',
    status: 'Healthy',
    owner: '—',
    timeline: [
      { time: 'T+00:00', label: 'Session started' },
      { time: 'T+00:12', label: 'Live power draw reported' },
    ],
    diagnosis: {
      incident: 'None — healthy session',
      expected: 'Session → Active → Success',
      actual: 'Session → Active',
      signals: ['All state transitions on time'],
      dependency: 'Charging network',
      owner: '—',
      nextAction: 'Monitor to completion',
    },
  },
  {
    id: 'TX-10471',
    journey: 'Payment',
    state: 'Refund pending',
    dependency: 'Payment provider',
    age: '42m',
    impact: '1 customer',
    status: 'Escalated',
    owner: 'Payments Ops',
    timeline: [
      { time: 'T+00:00', label: 'Failed charge — refund requested' },
      { time: 'T+00:20', label: 'Refund submitted to provider' },
      { time: 'T+00:42', label: 'Refund not yet settled — SLA threshold approaching' },
    ],
    diagnosis: {
      incident: 'Refund pending beyond expected window',
      expected: 'Refund → Settled',
      actual: 'Refund → Pending',
      signals: ['Provider settlement queue delay', 'Downstream confirmation missing'],
      dependency: 'External payment provider',
      owner: 'Payments Operations',
      nextAction: 'Escalate with provider → confirm settlement ETA → update customer',
    },
  },
  {
    id: 'TX-10466',
    journey: 'Vehicle data',
    state: 'Data sync delayed',
    dependency: 'Upstream source',
    age: '2h',
    impact: '12 customers',
    status: 'At risk',
    owner: 'Data Ops',
    timeline: [
      { time: 'T+00:00', label: 'Refresh job scheduled' },
      { time: 'T+01:10', label: 'Upstream source slow to respond' },
      { time: 'T+02:00', label: 'Freshness threshold exceeded for affected records' },
    ],
    diagnosis: {
      incident: 'Vehicle data stale',
      expected: 'Data → Current',
      actual: 'Data → Outdated',
      signals: ['Upstream source latency', 'Sync job backlog', 'Freshness threshold exceeded'],
      dependency: 'Upstream data source',
      owner: 'Data Operations',
      nextAction: 'Trigger priority refresh → verify freshness → flag affected records',
    },
  },
  {
    id: 'TX-10455',
    journey: 'EV charging',
    state: 'Session not starting',
    dependency: 'Charging partner',
    age: '15m',
    impact: '2 customers',
    status: 'At risk',
    owner: 'Partner Ops',
    timeline: [
      { time: 'T+00:00', label: 'Start requested' },
      { time: 'T+00:05', label: 'Charger did not confirm start' },
      { time: 'T+00:15', label: 'Retry attempted — still no confirmation' },
    ],
    diagnosis: {
      incident: 'Session fails to start',
      expected: 'Session → Active',
      actual: 'Session → Initiated (no start)',
      signals: ['Charger offline or unreachable', 'Partner API timeout', 'Availability state mismatch'],
      dependency: 'Charging partner',
      owner: 'Partner Operations',
      nextAction: 'Verify charger state with partner → offer alternative → refund hold',
    },
  },
  {
    id: 'TX-10448',
    journey: 'Support',
    state: 'Document download issue',
    dependency: 'Document service',
    age: '3h',
    impact: '4 customers',
    status: 'At risk',
    owner: 'Support',
    timeline: [
      { time: 'T+00:00', label: 'Download requested' },
      { time: 'T+00:02', label: 'Document service returned an error' },
    ],
    diagnosis: {
      incident: 'Document will not download',
      expected: 'Document → Delivered',
      actual: 'Document → Error',
      signals: ['Document service error', 'Token / permission issue', 'Source document not yet generated'],
      dependency: 'Document service',
      owner: 'Support',
      nextAction: 'Investigate service errors → regenerate document → notify users',
    },
  },
  {
    id: 'TX-10430',
    journey: 'Payment',
    state: 'Success',
    dependency: 'Payment provider',
    age: '—',
    impact: '—',
    status: 'Resolved',
    owner: '—',
    timeline: [
      { time: 'T+00:00', label: 'Payment initiated' },
      { time: 'T+00:04', label: 'Confirmation received — success' },
    ],
    diagnosis: {
      incident: 'None — completed successfully',
      expected: 'Payment → Success',
      actual: 'Payment → Success',
      signals: ['All confirmations received'],
      dependency: 'Payment provider',
      owner: '—',
      nextAction: 'No action needed',
    },
  },
  {
    id: 'TX-10419',
    journey: 'EV charging',
    state: 'Session active',
    dependency: 'Charging network',
    age: '—',
    impact: '—',
    status: 'Healthy',
    owner: '—',
    timeline: [
      { time: 'T+00:00', label: 'Session started' },
    ],
    diagnosis: {
      incident: 'None — healthy session',
      expected: 'Session → Active → Success',
      actual: 'Session → Active',
      signals: ['All state transitions on time'],
      dependency: 'Charging network',
      owner: '—',
      nextAction: 'Monitor to completion',
    },
  },
]

export const TXN_STATE_MODEL = {
  main: ['Initiated', 'Processing', 'Success'],
  branches: [
    'Processing → Failed',
    'Processing → Pending',
    'Pending → Resolved',
    'Pending → Escalated',
  ],
  statement:
    'Every transaction should have a known current state — including when something goes wrong.',
  label: 'Proposed transaction state model',
} as const

/* ---- Exceptions -------------------------------------------------- */

export type Severity = 'P0' | 'P1' | 'P2' | 'P3'

export interface Exception {
  id: string
  severity: Severity
  issue: string
  impact: string
  dependency: string
  age: string
  owner: string
  nextAction: string
  diagnosis: Diagnosis
}

export const EXCEPTIONS: Exception[] = [
  {
    id: 'INC-4021',
    severity: 'P1',
    issue: 'Payment status mismatch',
    impact: '1 customer',
    dependency: 'Payment provider',
    age: '18m',
    owner: 'Payments Ops',
    nextAction: 'Reconcile',
    diagnosis: TXNS[0].diagnosis,
  },
  {
    id: 'INC-4020',
    severity: 'P1',
    issue: 'Charger availability mismatch',
    impact: '3 customers',
    dependency: 'Charging partner',
    age: '27m',
    owner: 'Partner Ops',
    nextAction: 'Verify state',
    diagnosis: {
      incident: 'Charger shown available but not usable',
      expected: 'Availability = reality',
      actual: 'Availability ≠ reality',
      signals: ['Stale availability feed', 'Charger offline', 'Data refresh lag'],
      dependency: 'Charging partner',
      owner: 'Partner Operations',
      nextAction: 'Verify charger state → refresh availability → suppress if unusable',
    },
  },
  {
    id: 'INC-4018',
    severity: 'P2',
    issue: 'Vehicle data stale',
    impact: '12 customers',
    dependency: 'Upstream source',
    age: '2h',
    owner: 'Data Ops',
    nextAction: 'Refresh',
    diagnosis: TXNS[3].diagnosis,
  },
  {
    id: 'INC-4015',
    severity: 'P2',
    issue: 'Document download issue',
    impact: '4 customers',
    dependency: 'Document service',
    age: '3h',
    owner: 'Support',
    nextAction: 'Investigate',
    diagnosis: TXNS[5].diagnosis,
  },
  {
    id: 'INC-4012',
    severity: 'P1',
    issue: 'Refund pending beyond window',
    impact: '1 customer',
    dependency: 'Payment provider',
    age: '42m',
    owner: 'Payments Ops',
    nextAction: 'Escalate',
    diagnosis: TXNS[2].diagnosis,
  },
  {
    id: 'INC-4009',
    severity: 'P3',
    issue: 'Minor map rendering glitch',
    impact: 'Low',
    dependency: 'App',
    age: '5h',
    owner: 'App team',
    nextAction: 'Backlog',
    diagnosis: {
      incident: 'Map tiles occasionally slow to load',
      expected: 'Map → Rendered',
      actual: 'Map → Slow render',
      signals: ['Tile CDN latency', 'Client cache miss'],
      dependency: 'App / map tiles',
      owner: 'App team',
      nextAction: 'Monitor — non-blocking',
    },
  },
]

export const SEVERITY_META: Record<Severity, { label: string; tone: 'error' | 'warning' | 'info' | 'neutral'; desc: string }> = {
  P0: { label: 'P0 — Critical', tone: 'error', desc: 'Widespread customer impact or major transaction disruption.' },
  P1: { label: 'P1 — High', tone: 'error', desc: 'Significant customer or operational impact.' },
  P2: { label: 'P2 — Medium', tone: 'warning', desc: 'Limited impact with a workaround available.' },
  P3: { label: 'P3 — Low', tone: 'neutral', desc: 'Minor, non-blocking issue.' },
}

export const SEVERITY_DIMENSIONS = [
  'Number of customers affected',
  'Transaction criticality (payment vs convenience)',
  'Financial impact',
  'Duration',
  'Geographic scope',
  'Vendor / system dependency',
  'Workaround availability',
]

export const SEVERITY_LABEL = 'Proposed incident severity model — not ZOOP’s actual incident levels.'

/* ---- Customer impact ---------------------------------------------- */

export interface ImpactRow {
  issue: string
  customers: string
  transactions: string
  delay: string
  stage: string
  status: string
  statusTone: StatusTone
}

export const IMPACT_ROWS: ImpactRow[] = [
  {
    issue: 'Payment pending',
    customers: '3 customers',
    transactions: '3 transactions',
    delay: '18 min average delay',
    stage: 'PAY',
    status: 'Customer-visible',
    statusTone: 'error',
  },
  {
    issue: 'Charger availability mismatch',
    customers: '7 searches affected',
    transactions: '—',
    delay: '—',
    stage: 'DISCOVER',
    status: 'Customer-visible',
    statusTone: 'warning',
  },
  {
    issue: 'Data freshness',
    customers: '21 customers',
    transactions: '—',
    delay: '—',
    stage: 'POST-JOURNEY',
    status: 'Low urgency',
    statusTone: 'success',
  },
]

/* ---- Diagnosis (shared shape) ----------------------------------- */

export interface Diagnosis {
  incident: string
  expected: string
  actual: string
  signals: string[]
  dependency: string
  owner: string
  nextAction: string
}

export const DIAGNOSIS_LABEL =
  'Conceptual incident diagnosis — potential signals, not confirmed ZOOP architecture.'

/* ---- Vendors ---------------------------------------------------- */

export type SlaStatus = 'Healthy' | 'At risk' | 'Breached'

export interface Vendor {
  id: string
  name: string
  role: string
  availability: string
  successRate: string
  latency: string
  failureRate: string
  sla: SlaStatus
  openIssues: number
  recentIncidents: string[]
}

export const VENDORS: Vendor[] = [
  {
    id: 'prov-a',
    name: 'Provider A',
    role: 'Payment provider',
    availability: '99.8%',
    successRate: '98.4%',
    latency: '420 ms',
    failureRate: '1.6%',
    sla: 'Healthy',
    openIssues: 2,
    recentIncidents: ['Settlement queue delay (P2, resolved)', 'Callback latency spike (P3)'],
  },
  {
    id: 'prov-b',
    name: 'Provider B',
    role: 'Charging network',
    availability: '99.1%',
    successRate: '96.2%',
    latency: '680 ms',
    failureRate: '3.8%',
    sla: 'At risk',
    openIssues: 5,
    recentIncidents: ['Session-start failures in one region (P1, open)', 'Availability feed lag (P2, open)', 'API timeout cluster (P2)'],
  },
  {
    id: 'prov-c',
    name: 'Provider C',
    role: 'Data / RTO source',
    availability: '99.9%',
    successRate: '99.1%',
    latency: '310 ms',
    failureRate: '0.9%',
    sla: 'Healthy',
    openIssues: 1,
    recentIncidents: ['Nightly sync ran long (P3)'],
  },
]

export const VENDOR_LABEL = 'Illustrative vendor data — not internal ZOOP data. Provider names are fictional.'

export const VENDOR_METRIC_CARDS = [
  { label: 'API / service availability', value: '99.6', unit: '%' },
  { label: 'Transaction success rate', value: '97.9', unit: '%' },
  { label: 'SLA adherence', value: '92', unit: '%' },
  { label: 'Open critical issues', value: '1' },
]

export const VENDOR_FRAMEWORK = [
  'Availability',
  'Latency',
  'Success rate',
  'Failure rate',
  'TAT',
  'SLA adherence',
  'Customer impact',
]

export const VENDOR_FRAMEWORK_NOTE =
  'A vendor should not be evaluated only on uptime. Reliability needs to be measured across the full customer journey.'

/* ---- Incident workflow ---------------------------------------- */

export const WORKFLOW_STEPS: { num: string; title: string; desc: string; tone: StatusTone }[] = [
  { num: '01', title: 'Detect', desc: 'Monitoring identifies an abnormal state.', tone: 'info' },
  { num: '02', title: 'Triage', desc: 'Determine severity and customer impact.', tone: 'info' },
  { num: '03', title: 'Assign', desc: 'Route to the responsible team or vendor.', tone: 'info' },
  { num: '04', title: 'Investigate', desc: 'Check transaction state, dependency health and recent changes.', tone: 'warning' },
  { num: '05', title: 'Escalate', desc: 'Trigger SLA-based escalation if unresolved.', tone: 'warning' },
  { num: '06', title: 'Resolve', desc: 'Recover, reconcile, retry, refund or restore service.', tone: 'success' },
  { num: '07', title: 'Communicate', desc: 'Give the customer accurate status and next steps.', tone: 'success' },
  { num: '08', title: 'Learn', desc: 'Capture RCA and prevent recurrence.', tone: 'neutral' },
]

export const WORKFLOW_LABEL = 'Proposed incident management workflow'

export interface EscalationRow {
  type: string
  expected: string
  trigger: string
  owner: string
  state: 'Normal' | 'At risk' | 'SLA breached'
}

export const ESCALATION_ROWS: EscalationRow[] = [
  { type: 'Payment pending', expected: 'Defined by business / vendor SLA', trigger: 'Approaching threshold', owner: 'Payments Ops', state: 'At risk' },
  { type: 'Charging session failure', expected: 'Defined by business / vendor SLA', trigger: 'Customer blocked', owner: 'Partner Ops', state: 'SLA breached' },
  { type: 'Data sync issue', expected: 'Defined by freshness threshold', trigger: 'Freshness threshold exceeded', owner: 'Data Ops', state: 'At risk' },
  { type: 'Document error', expected: 'Defined by support SLA', trigger: 'Multiple customers affected', owner: 'Support', state: 'Normal' },
]

export const ESCALATION_FORMULA = ['Time elapsed', 'Customer impact', 'Issue severity']
export const ESCALATION_LABEL = 'Proposed escalation logic'

/* ---- Operator actions + audit -------------------------------- */

export interface OperatorAction {
  icon: IconName
  label: string
  restricted?: boolean
}

export const OPERATOR_ACTIONS: OperatorAction[] = [
  { icon: 'eye', label: 'View incident' },
  { icon: 'user', label: 'Assign owner' },
  { icon: 'network', label: 'Contact vendor' },
  { icon: 'refresh', label: 'Retry / reprocess', restricted: true },
  { icon: 'check', label: 'Mark acknowledged' },
  { icon: 'arrow-up-right', label: 'Escalate' },
  { icon: 'message', label: 'Add internal note' },
  { icon: 'headset', label: 'Update customer status' },
  { icon: 'flag', label: 'Resolve', restricted: true },
  { icon: 'file', label: 'Close with RCA' },
]

export const OPERATOR_NOTE =
  'Destructive or financially sensitive actions should require appropriate authorization and audit logging.';

export const AUDIT_LOG = [
  { time: '10:42', label: 'Incident created', tone: 'info' as StatusTone },
  { time: '10:44', label: 'Assigned to Payments Ops', tone: 'info' as StatusTone },
  { time: '10:48', label: 'Provider contacted', tone: 'warning' as StatusTone },
  { time: '10:53', label: 'Transaction reconciled', tone: 'success' as StatusTone },
  { time: '10:55', label: 'Customer status updated', tone: 'success' as StatusTone },
  { time: '10:57', label: 'Incident resolved', tone: 'success' as StatusTone },
  { time: '11:02', label: 'RCA added', tone: 'neutral' as StatusTone },
]

export const AUDIT_NOTE =
  'For a transaction-heavy product, auditability matters for accountability, incident review and compliance.'

export const CONTROL_CONSIDERATIONS = [
  'Role-based access control',
  'Permission-controlled actions',
  'Audit logs on every action',
  'Tenant / data isolation where applicable',
  'No sensitive customer information in dashboards',
  'Authorization for financial or destructive actions',
]

/* ---- Alerting ----------------------------------------------- */

export const ALERT_RULES = [
  { ifText: 'A payment stays pending beyond a threshold', thenText: 'Create an exception' },
  { ifText: 'A provider’s success rate drops below a threshold', thenText: 'Raise a vendor alert' },
  { ifText: 'Charger availability-mismatch signals increase', thenText: 'Investigate provider / data freshness' },
  { ifText: 'Multiple customers are affected by the same dependency', thenText: 'Create an incident and escalate' },
]

export const ALERT_LABEL = 'Proposed alerting rules — generic thresholds, not ZOOP values.'

/* ---- Architecture ------------------------------------------ */

export const ARCH_FLOW = [
  'MyMotor / consumer journeys',
  'Transaction + system events',
  'Event / data ingestion',
  'Normalisation + state reconciliation',
  'Reliability rules / monitoring',
  'Control Tower',
]

export const ARCH_OUTPUTS = ['Incidents', 'Vendor health', 'Analytics']
export const ARCH_CONSUMERS = 'Ops · Product · Support · Partner teams'
export const ARCH_SIDE_OUTPUT = 'Customer communication'
export const ARCH_LABEL = 'Conceptual Control Tower architecture — NOT internal ZOOP architecture.'

/* ---- Metrics --------------------------------------------- */

export const METRIC_CATEGORIES: { title: string; metrics: string[] }[] = [
  { title: 'Detection', metrics: ['Mean time to detect', '% of issues detected proactively'] },
  { title: 'Diagnosis', metrics: ['Mean time to diagnose', '% of incidents with identified cause'] },
  { title: 'Resolution', metrics: ['Mean time to resolve', 'SLA adherence', 'First-contact resolution (where applicable)'] },
  { title: 'Customer', metrics: ['Transaction success rate', 'Customer-impacting incidents', 'Repeat incident rate', 'Support contacts caused by reliability issues'] },
  { title: 'Vendor', metrics: ['Vendor success rate', 'Vendor SLA adherence', 'Vendor incident frequency', 'API / service availability', 'Latency'] },
]

export const NORTH_STAR = {
  primary: 'Reliable journeys completed successfully.',
  explain:
    'The Control Tower itself is not the goal. The goal is fewer customer-impacting failures and faster recovery when failures occur.',
  candidate: 'Customer-impacting transaction exception rate',
  supporting: ['Success rate', 'Time to detect', 'Time to resolve', 'SLA adherence', 'Repeat incident rate', 'Customer support contacts'],
  label: 'Proposed metric framework — not ZOOP’s official North Star.',
} as const

/* ---- Before / after ------------------------------------ */

export const BEFORE_AFTER = {
  title: 'From reactive support to proactive operations.',
  before: [
    'Customer reports issue',
    'Support investigates',
    'Team identifies dependency',
    'Vendor contacted',
    'Issue resolved',
    'Limited learning',
  ],
  after: [
    'System detects issue',
    'Impact identified',
    'Owner assigned',
    'Vendor / dependency identified',
    'SLA tracked',
    'Resolution coordinated',
    'Customer updated',
    'RCA captured',
    'Pattern monitored',
  ],
} as const

/* ---- Takeaways (dark) --------------------------------- */

export const TAKEAWAYS_HEADER = {
  eyebrow: 'Key takeaways',
  title: 'What this means for a TPM',
  lead: 'A control tower is not just a dashboard. It is an operating model for turning system signals into customer outcomes.',
} as const

export const TAKEAWAYS: { num: string; icon: IconName; title: string; desc: string }[] = [
  { num: '01', icon: 'eye', title: 'Visibility', desc: 'You can’t improve what you cannot see.' },
  { num: '02', icon: 'users', title: 'Ownership', desc: 'Every exception needs a clear owner and escalation path.' },
  { num: '03', icon: 'target', title: 'Customer impact', desc: 'Prioritise operational issues based on who is affected and how badly.' },
  { num: '04', icon: 'refresh', title: 'Learning', desc: 'Every incident should feed back into product, engineering and vendor improvements.' },
]

export const CENTRAL_INSIGHT = [
  'A control tower should not just tell us that something failed.',
  'It should tell us: what happened, who is affected, who owns it, what happens next, and whether the customer has recovered.',
]

/* ---- Validation --------------------------------------- */

export const VALIDATION_QUESTIONS = [
  'Which transaction states are already available?',
  'Which events are real-time versus batch?',
  'Which vendors expose reliable APIs / webhooks?',
  'How is transaction reconciliation currently handled?',
  'What are the existing vendor SLAs?',
  'Which teams own each exception?',
  'Which actions can safely be automated?',
  'What customer-facing status can be exposed?',
  'What data can be stored for auditability?',
  'What operational workflows already exist?',
]

export const TRANSITION = {
  eyebrow: 'Next: from concept to experience',
  heading: 'A control tower is only useful if people can act through it.',
  supporting:
    "Next, I'll turn this operational model into an interactive product experience — showing how an operator would monitor an issue, investigate it, take action and close the loop.",
  ctaLabel: 'Explore Interactive Prototype',
} as const
