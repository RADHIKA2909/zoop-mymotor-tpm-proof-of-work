/**
 * Section 6 — Interactive Prototype: ALL copy + mock data in one place.
 *
 * ⚠️ ILLUSTRATIVE / CONCEPTUAL — NOT INTERNAL ZOOP DATA OR SOFTWARE.
 * Every incident ID (`INC-104xx`), transaction ID (`TX-104xx`), provider name
 * (`Provider A/B/C`), team, timestamp and message below is fictional and exists
 * only to make the proposed operator workflow tangible for this TPM case study.
 * No real customer data, no financial values, no claim about ZOOP's actual
 * incident-management system, transaction architecture, vendors or SLAs.
 */
import type { IconName } from '@/components/ui/Icon'
import type { StatusTone } from '@/components/ui/StatusDot'

/* ---- Hero ---------------------------------------------------------- */

export const HERO = {
  eyebrowNumber: '06',
  eyebrow: 'Interactive Prototype',
  titleLead: 'From insight',
  titleAccent: 'to action.',
  supporting:
    'An interactive prototype showing how an operator could use the Control Tower to monitor an issue, investigate it, take action and close the loop.',
  badges: ['Interactive product flow', 'Realistic user scenarios', 'End-to-end experience'],
  script: ['A more reliable', 'EV future.'],
  disclaimer: 'Conceptual prototype — not internal ZOOP software.',
} as const

/* ---- Intro + "what you can do" ----------------------------------- */

export const INTRO = {
  eyebrow: 'Try the prototype',
  title: 'A real operator workflow',
  supporting:
    'Explore a realistic scenario based on common reliability problems seen in public user feedback. This prototype shows how an operator can detect an issue, investigate it, take action and resolve it.',
  ctaLabel: 'Launch Interactive Prototype',
  note: 'A clickable, functional prototype with realistic mock data, designed for this case study. Illustrative data throughout.',
} as const

export const WHAT_YOU_CAN_DO: { num: string; icon: IconName; title: string; desc: string }[] = [
  { num: '01', icon: 'search', title: 'Investigate an incident', desc: 'View incident details, timeline, customer impact and related transactions.' },
  { num: '02', icon: 'bolt', title: 'Take operational action', desc: 'Assign, escalate, add notes and update customer status.' },
  { num: '03', icon: 'layers', title: 'See the bigger picture', desc: 'Understand how one issue fits into the wider reliability system.' },
  { num: '04', icon: 'route', title: 'Experience the flow', desc: 'Follow a realistic scenario from detection to resolution.' },
]

/* ---- Scenarios --------------------------------------------------- */

export type ScenarioId = 'payment' | 'charger' | 'vehicle-data' | 'high-impact' | 'vendor'
export type StepId = 'detect' | 'investigate' | 'act' | 'resolve' | 'learn'
export type Severity = 'Critical' | 'High' | 'Medium' | 'Low'

export interface ScenarioData {
  id: ScenarioId
  label: string
  incident: {
    id: string
    issue: string
    severity: Severity
    age: string
    dependency: string
    customers: string
    opened: string
  }
  overview: {
    summary: string
    expected: string
    actual: string
    journeyStage: string
    dependency: string
    owner: string
    nextAction: string
  }
  timeline: { time: string; label: string; tone: StatusTone }[]
  diagnostics: {
    expected: string
    actual: string
    signals: string[]
    dependency: string
    recentEvents: string[]
  }
  customerImpact: {
    count: string
    txnId: string
    journey: string
    state: string
    message: string
  }
  relatedTxns: { id: string; journey: string; state: string; age: string; provider: string }[]
  steps: Record<StepId, { title: string; blurb: string }>
  resolution: { type: string; impact: string; resolvedBy: string; summary: string }
  rca: {
    rootCauseCategory: string
    whatHappened: string
    prevention: string
    relatedImprovement: string
  }
  defaultOwner: string
}

export const SCENARIOS: Record<ScenarioId, ScenarioData> = {
  payment: {
    id: 'payment',
    label: 'Payment status mismatch',
    incident: {
      id: 'INC-10482',
      issue: 'Payment status mismatch',
      severity: 'High',
      age: '18m',
      dependency: 'Payment Provider',
      customers: '1 customer',
      opened: '18 minutes ago',
    },
    overview: {
      summary:
        'Payment for a charging session remains pending despite the transaction being initiated and the provider acknowledging the request.',
      expected: 'Payment → Success',
      actual: 'Payment → Pending',
      journeyStage: 'Payment',
      dependency: 'Payment Provider',
      owner: 'Payments Ops',
      nextAction: 'Verify provider state and reconcile the transaction.',
    },
    timeline: [
      { time: '10:24', label: 'Incident detected — pending-payment alert triggered', tone: 'info' },
      { time: '10:26', label: 'Assigned to Payments Ops', tone: 'info' },
      { time: '10:32', label: 'Investigation started', tone: 'info' },
      { time: '10:35', label: 'Provider status checked', tone: 'warning' },
      { time: '10:41', label: 'Awaiting reconciliation', tone: 'warning' },
      { time: '10:48', label: 'Transaction reconciled', tone: 'success' },
      { time: '10:50', label: 'Customer status updated', tone: 'success' },
      { time: '10:52', label: 'Incident resolved', tone: 'success' },
    ],
    diagnostics: {
      expected: 'Success',
      actual: 'Pending',
      signals: [
        'Provider response delayed',
        'Callback / webhook not received',
        'State reconciliation delayed',
        'Downstream confirmation missing',
      ],
      dependency: 'External payment provider',
      recentEvents: [
        'Payment initiated',
        'Provider acknowledged request',
        'Provider response pending',
        'No final confirmation received',
      ],
    },
    customerImpact: {
      count: '1',
      txnId: 'TX-10482',
      journey: 'EV charging',
      state: 'Payment pending',
      message: 'Your payment is still being processed. We are checking the status.',
    },
    relatedTxns: [
      { id: 'TX-10482', journey: 'Charging', state: 'Pending', age: '18m', provider: 'Provider A' },
      { id: 'TX-10481', journey: 'Charging', state: 'Success', age: '—', provider: 'Provider A' },
      { id: 'TX-10478', journey: 'Charging', state: 'Success', age: '—', provider: 'Provider A' },
      { id: 'TX-10475', journey: 'Charging', state: 'Success', age: '—', provider: 'Provider A' },
      { id: 'TX-10470', journey: 'Payment', state: 'Success', age: '—', provider: 'Provider A' },
    ],
    steps: {
      detect: { title: 'An alert is triggered for a payment issue', blurb: 'A pending-payment threshold is crossed and an incident appears in the queue.' },
      investigate: { title: 'View transaction details, provider status and logs', blurb: 'Open the incident to see expected vs actual state, the dependency and the customer affected.' },
      resolve: { title: 'Confirm resolution and verify customer impact', blurb: 'Reconcile the transaction with the provider and confirm the customer can continue.' },
      act: { title: 'Assign an owner, contact the provider, update status', blurb: 'Route the incident, coordinate with the dependency and keep the customer informed.' },
      learn: { title: 'Capture notes and link to product improvements', blurb: 'Record the root cause and feed it back into monitoring and the roadmap.' },
    },
    resolution: {
      type: 'Reconciled',
      impact: 'Recovered',
      resolvedBy: 'Payments Ops',
      summary: 'Payment status reconciled with the provider. The charging transaction completed successfully.',
    },
    rca: {
      rootCauseCategory: 'Provider / transaction state',
      whatHappened:
        'The transaction remained pending because the expected final state was not available from the provider within the expected window.',
      prevention: 'Improve state monitoring and add reconciliation alerts for pending transactions.',
      relatedImprovement:
        'Monitor pending transactions proactively, before they become customer-reported issues.',
    },
    defaultOwner: 'Payments Ops',
  },

  charger: {
    id: 'charger',
    label: 'Charger unavailable',
    incident: {
      id: 'INC-10479',
      issue: 'Charger availability mismatch',
      severity: 'Medium',
      age: '27m',
      dependency: 'Charging Partner',
      customers: '3 users',
      opened: '27 minutes ago',
    },
    overview: {
      summary:
        'A charger is shown as available in the app but customers report it is not usable on arrival.',
      expected: 'Availability shown = availability in reality',
      actual: 'Availability shown ≠ availability in reality',
      journeyStage: 'Discover / navigate',
      dependency: 'Charging Partner',
      owner: 'Partner Operations',
      nextAction: 'Verify charger state with the partner and refresh the availability feed.',
    },
    timeline: [
      { time: '09:58', label: 'Incident detected — availability-mismatch signals rising', tone: 'info' },
      { time: '10:04', label: 'Assigned to Partner Operations', tone: 'info' },
      { time: '10:12', label: 'Partner availability feed checked', tone: 'warning' },
      { time: '10:20', label: 'Charger confirmed offline with partner', tone: 'warning' },
      { time: '10:25', label: 'Charger suppressed from availability', tone: 'success' },
    ],
    diagnostics: {
      expected: 'Available',
      actual: 'Not usable',
      signals: ['Stale availability feed', 'Charger offline at the site', 'Data refresh lag'],
      dependency: 'Charging partner availability feed',
      recentEvents: [
        'Availability feed last updated 40+ minutes ago',
        'Multiple failed session-start attempts at the same site',
      ],
    },
    customerImpact: {
      count: '3',
      txnId: 'TX-10466',
      journey: 'EV charging',
      state: 'Session not started',
      message: 'This charger may be unavailable. We are checking and will suggest nearby options.',
    },
    relatedTxns: [
      { id: 'TX-10466', journey: 'Charging', state: 'Not started', age: '27m', provider: 'Provider B' },
      { id: 'TX-10464', journey: 'Charging', state: 'Not started', age: '31m', provider: 'Provider B' },
      { id: 'TX-10461', journey: 'Charging', state: 'Success', age: '—', provider: 'Provider B' },
    ],
    steps: {
      detect: { title: 'Availability-mismatch signals cross a threshold', blurb: 'Repeated failed starts at one site raise an incident.' },
      investigate: { title: 'Check the availability feed and partner status', blurb: 'Compare what the app shows with what the partner reports.' },
      resolve: { title: 'Suppress the charger and refresh availability', blurb: 'Stop showing the charger as available until it is confirmed usable.' },
      act: { title: 'Assign to Partner Operations and contact the partner', blurb: 'Confirm the real charger state and coordinate a fix.' },
      learn: { title: 'Capture the cause and improve the feed', blurb: 'Feed freshness and offline detection become monitoring items.' },
    },
    resolution: {
      type: 'Suppressed + refreshed',
      impact: 'Contained',
      resolvedBy: 'Partner Operations',
      summary: 'Charger suppressed from availability and the feed refreshed. Affected customers were shown nearby options.',
    },
    rca: {
      rootCauseCategory: 'Data freshness / partner dependency',
      whatHappened:
        'The availability feed from the charging partner was stale, so an offline charger continued to show as available.',
      prevention: 'Add a freshness threshold and an offline-detection signal for partner availability feeds.',
      relatedImprovement: 'Show a confidence indicator on charger availability when feed data is old.',
    },
    defaultOwner: 'Partner Operations',
  },

  'vehicle-data': {
    id: 'vehicle-data',
    label: 'Vehicle data delay',
    incident: {
      id: 'INC-10471',
      issue: 'Vehicle data delay',
      severity: 'Medium',
      age: '2h',
      dependency: 'Upstream data source',
      customers: '12 users',
      opened: '2 hours ago',
    },
    overview: {
      summary:
        'Vehicle records for a set of users are stale after a scheduled refresh did not complete within the expected window.',
      expected: 'Vehicle data → current',
      actual: 'Vehicle data → outdated',
      journeyStage: 'Post-journey / account',
      dependency: 'Upstream data source',
      owner: 'Data Ops',
      nextAction: 'Trigger a priority refresh and flag the affected records.',
    },
    timeline: [
      { time: '08:15', label: 'Incident detected — freshness threshold exceeded', tone: 'info' },
      { time: '08:40', label: 'Assigned to Data Ops', tone: 'info' },
      { time: '09:10', label: 'Upstream source latency confirmed', tone: 'warning' },
      { time: '09:45', label: 'Priority refresh triggered', tone: 'warning' },
      { time: '10:20', label: 'Freshness verified for affected records', tone: 'success' },
    ],
    diagnostics: {
      expected: 'Current',
      actual: 'Outdated',
      signals: ['Upstream source latency', 'Sync job backlog', 'Freshness threshold exceeded'],
      dependency: 'Upstream vehicle-data source',
      recentEvents: [
        'Scheduled refresh job started',
        'Upstream source slow to respond',
        'Refresh window exceeded for a batch of records',
      ],
    },
    customerImpact: {
      count: '12',
      txnId: '—',
      journey: 'Vehicle data',
      state: 'Records stale',
      message: 'Some vehicle details may be out of date. We are refreshing them now.',
    },
    relatedTxns: [
      { id: 'TX-10452', journey: 'Vehicle data', state: 'Stale', age: '2h', provider: 'Provider C' },
      { id: 'TX-10450', journey: 'Vehicle data', state: 'Stale', age: '2h', provider: 'Provider C' },
    ],
    steps: {
      detect: { title: 'A freshness threshold is exceeded', blurb: 'A batch of records passes the allowed age since last refresh.' },
      investigate: { title: 'Check the sync job and upstream latency', blurb: 'Identify whether the delay is upstream or in the refresh pipeline.' },
      resolve: { title: 'Run a priority refresh and verify freshness', blurb: 'Bring the affected records current and confirm.' },
      act: { title: 'Assign to Data Ops and trigger a refresh', blurb: 'Prioritise the affected batch and flag records in the app.' },
      learn: { title: 'Capture the cause and tune thresholds', blurb: 'Backlog and latency handling become monitoring items.' },
    },
    resolution: {
      type: 'Refreshed',
      impact: 'Recovered',
      resolvedBy: 'Data Ops',
      summary: 'A priority refresh completed and freshness was verified for all affected records.',
    },
    rca: {
      rootCauseCategory: 'Data sync / upstream dependency',
      whatHappened:
        'A scheduled refresh did not complete in time because the upstream source responded slowly and a backlog built up.',
      prevention: 'Add backlog alerting and a fallback priority-refresh path when the upstream source is slow.',
      relatedImprovement: 'Surface a "last updated" indicator on vehicle records in the app.',
    },
    defaultOwner: 'Data Ops',
  },

  'high-impact': {
    id: 'high-impact',
    label: 'High-impact incident',
    incident: {
      id: 'INC-10488',
      issue: 'Payments degraded — multiple customers',
      severity: 'Critical',
      age: '12m',
      dependency: 'Payment Provider',
      customers: '40+ customers',
      opened: '12 minutes ago',
    },
    overview: {
      summary:
        'Payment success rate has dropped sharply across a short window, with multiple customers unable to complete transactions.',
      expected: 'Payment success rate within normal range',
      actual: 'Payment success rate degraded',
      journeyStage: 'Payment',
      dependency: 'Payment Provider',
      owner: 'Payments Ops',
      nextAction: 'Escalate, confirm scope with the provider and coordinate a cross-team response.',
    },
    timeline: [
      { time: '11:02', label: 'Incident detected — payment success rate drop', tone: 'error' },
      { time: '11:05', label: 'Assigned to Payments Ops', tone: 'info' },
      { time: '11:08', label: 'Escalated — cross-team response opened', tone: 'error' },
      { time: '11:14', label: 'Provider confirmed a regional degradation', tone: 'warning' },
      { time: '11:32', label: 'Provider recovery confirmed', tone: 'success' },
      { time: '11:40', label: 'Backlog reconciled, incident resolved', tone: 'success' },
    ],
    diagnostics: {
      expected: 'Normal success rate',
      actual: 'Degraded success rate',
      signals: [
        'Provider-side degradation',
        'Elevated timeout rate',
        'Multiple dependencies on the same provider',
        'Backlog of pending transactions building',
      ],
      dependency: 'External payment provider (regional)',
      recentEvents: [
        'Success rate dropped within a short window',
        'Timeout errors clustered on one provider',
        'Pending-transaction count rising',
      ],
    },
    customerImpact: {
      count: '40+',
      txnId: 'TX-10488',
      journey: 'Payment',
      state: 'Multiple pending / failed',
      message: 'We are aware of a payment issue and are working on it. Please try again shortly.',
    },
    relatedTxns: [
      { id: 'TX-10488', journey: 'Payment', state: 'Failed', age: '12m', provider: 'Provider A' },
      { id: 'TX-10487', journey: 'Charging', state: 'Pending', age: '13m', provider: 'Provider A' },
      { id: 'TX-10486', journey: 'Payment', state: 'Failed', age: '14m', provider: 'Provider A' },
      { id: 'TX-10485', journey: 'Charging', state: 'Pending', age: '15m', provider: 'Provider A' },
    ],
    steps: {
      detect: { title: 'A success-rate drop triggers a critical alert', blurb: 'The scale of impact is flagged immediately.' },
      investigate: { title: 'Confirm scope, provider status and backlog', blurb: 'Establish how many customers and which dependencies are affected.' },
      resolve: { title: 'Confirm recovery and reconcile the backlog', blurb: 'Once the provider recovers, clear pending transactions.' },
      act: { title: 'Escalate and coordinate a cross-team response', blurb: 'Bring in the provider, support and product; keep customers informed.' },
      learn: { title: 'Run an RCA and reduce single-provider risk', blurb: 'Concentration risk and failover become roadmap items.' },
    },
    resolution: {
      type: 'Provider recovery + reconciliation',
      impact: 'Recovered',
      resolvedBy: 'Payments Ops + cross-team',
      summary: 'The provider recovered and the backlog of pending transactions was reconciled. Affected customers were updated.',
    },
    rca: {
      rootCauseCategory: 'Provider degradation / concentration risk',
      whatHappened:
        'A regional degradation at one payment provider reduced success rate across several journeys that all depend on it.',
      prevention: 'Reduce single-provider concentration and define a failover path for critical payment flows.',
      relatedImprovement: 'Add a provider-health signal to the alerting rules and a customer-facing status message.',
    },
    defaultOwner: 'Payments Ops',
  },

  vendor: {
    id: 'vendor',
    label: 'Vendor issue',
    incident: {
      id: 'INC-10465',
      issue: 'Regional provider errors',
      severity: 'High',
      age: '48m',
      dependency: 'Charging Partner (region)',
      customers: '9 users',
      opened: '48 minutes ago',
    },
    overview: {
      summary:
        'One charging partner is returning elevated errors in a single region, causing session-start failures for customers there.',
      expected: 'Partner error rate within agreed range',
      actual: 'Partner error rate elevated in one region',
      journeyStage: 'Start session',
      dependency: 'Charging Partner (regional)',
      owner: 'Partner Operations',
      nextAction: 'Raise with the partner, track against the agreed range and monitor recovery.',
    },
    timeline: [
      { time: '09:20', label: 'Incident detected — partner error rate elevated', tone: 'info' },
      { time: '09:30', label: 'Assigned to Partner Operations', tone: 'info' },
      { time: '09:45', label: 'Pattern confirmed — one region only', tone: 'warning' },
      { time: '10:00', label: 'Raised with the partner', tone: 'warning' },
      { time: '10:35', label: 'Partner error rate returning to normal', tone: 'success' },
    ],
    diagnostics: {
      expected: 'Normal partner error rate',
      actual: 'Elevated partner error rate (one region)',
      signals: ['Partner API errors clustered by region', 'Session-start failures', 'Partner-side incident likely'],
      dependency: 'Charging partner regional endpoint',
      recentEvents: [
        'Error rate rose for one partner in one region',
        'Other regions and partners unaffected',
        'Session-start success rate down locally',
      ],
    },
    customerImpact: {
      count: '9',
      txnId: 'TX-10455',
      journey: 'EV charging',
      state: 'Session-start failing',
      message: 'Charging in your area may be affected. We are working with our partner to fix it.',
    },
    relatedTxns: [
      { id: 'TX-10455', journey: 'Charging', state: 'Failed to start', age: '48m', provider: 'Provider B' },
      { id: 'TX-10453', journey: 'Charging', state: 'Failed to start', age: '52m', provider: 'Provider B' },
      { id: 'TX-10449', journey: 'Charging', state: 'Success', age: '—', provider: 'Provider C' },
    ],
    steps: {
      detect: { title: 'A partner error rate crosses its threshold', blurb: 'The alerting rule for vendor health fires.' },
      investigate: { title: 'Confirm the pattern and the blast radius', blurb: 'Check whether it is one partner, one region, or wider.' },
      resolve: { title: 'Track partner recovery and confirm', blurb: 'Monitor the error rate back to normal and verify customer journeys.' },
      act: { title: 'Assign to Partner Operations and raise with the partner', blurb: 'Coordinate with the vendor and track against the agreed range.' },
      learn: { title: 'Update the vendor scorecard and review', blurb: 'The incident feeds the partner review and governance.' },
    },
    resolution: {
      type: 'Partner recovery',
      impact: 'Recovered',
      resolvedBy: 'Partner Operations',
      summary: 'The partner resolved the regional issue and error rates returned to normal. The incident was added to the partner review.',
    },
    rca: {
      rootCauseCategory: 'Vendor reliability / regional',
      whatHappened:
        'A regional issue at one charging partner raised its error rate and caused session-start failures for customers in that area.',
      prevention: 'Track per-partner, per-region error rates against the agreed range and review recurring issues in governance.',
      relatedImprovement: 'Add regional partner-health to the vendor scorecard and the escalation triggers.',
    },
    defaultOwner: 'Partner Operations',
  },
}

export const SCENARIO_ORDER: ScenarioId[] = ['payment', 'charger', 'vehicle-data', 'high-impact', 'vendor']

/* ---- Incident list (Detect step) -------------------------------- */

export interface IncidentRow {
  scenarioId: ScenarioId | null
  id: string
  issue: string
  severity: Severity
  status: 'Open' | 'Investigating' | 'Resolved'
  age: string
  owner: string
}

export const INCIDENT_LIST: IncidentRow[] = [
  { scenarioId: 'high-impact', id: 'INC-10488', issue: 'Payments degraded — multiple customers', severity: 'Critical', status: 'Open', age: '12m', owner: 'Payments Ops' },
  { scenarioId: 'payment', id: 'INC-10482', issue: 'Payment status mismatch', severity: 'High', status: 'Open', age: '18m', owner: 'Unassigned' },
  { scenarioId: 'charger', id: 'INC-10479', issue: 'Charger availability mismatch', severity: 'Medium', status: 'Investigating', age: '27m', owner: 'Partner Operations' },
  { scenarioId: 'vehicle-data', id: 'INC-10471', issue: 'Vehicle data delay', severity: 'Medium', status: 'Open', age: '2h', owner: 'Data Ops' },
  { scenarioId: 'vendor', id: 'INC-10465', issue: 'Regional provider errors', severity: 'High', status: 'Investigating', age: '48m', owner: 'Partner Operations' },
  { scenarioId: null, id: 'INC-10466', issue: 'Session not starting (single charger)', severity: 'Low', status: 'Resolved', age: '3h', owner: 'Charging Ops' },
]

export const SEVERITY_FILTERS = ['All severities', 'Critical', 'High', 'Medium', 'Low'] as const
export const STATUS_FILTERS = ['All statuses', 'Open', 'Investigating', 'Resolved'] as const

export const SEVERITY_TONE: Record<Severity, 'error' | 'warning' | 'neutral'> = {
  Critical: 'error',
  High: 'error',
  Medium: 'warning',
  Low: 'neutral',
}

export const INCIDENT_STATUS_TONE: Record<IncidentRow['status'], 'pending' | 'info' | 'success'> = {
  Open: 'pending',
  Investigating: 'info',
  Resolved: 'success',
}

/* ---- Stepper --------------------------------------------------- */

export const STEPS: { id: StepId; num: string; label: string }[] = [
  { id: 'detect', num: '01', label: 'Detect' },
  { id: 'investigate', num: '02', label: 'Investigate' },
  { id: 'act', num: '03', label: 'Take action' },
  { id: 'resolve', num: '04', label: 'Resolve' },
  { id: 'learn', num: '05', label: 'Learn' },
]

export const STEP_ORDER: StepId[] = ['detect', 'investigate', 'act', 'resolve', 'learn']

/* ---- Detail tabs ---------------------------------------------- */

export type TabId = 'overview' | 'timeline' | 'impact' | 'diagnostics' | 'related'

export const DETAIL_TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'impact', label: 'Customer impact' },
  { id: 'diagnostics', label: 'Diagnostics' },
  { id: 'related', label: 'Related' },
]

/* ---- Roles (proposed model) --------------------------------- */

export type RoleId = 'operator' | 'lead' | 'support' | 'product'

export const ROLES: { id: RoleId; label: string; can: string }[] = [
  { id: 'operator', label: 'Control Tower Operator', can: 'Investigate, assign, escalate, update status.' },
  { id: 'lead', label: 'Team Lead', can: 'Approve sensitive actions, escalate, close high-severity incidents.' },
  { id: 'support', label: 'Support', can: 'View customer impact, update customer communication.' },
  { id: 'product', label: 'Product', can: 'View analytics, create improvement items, review RCA.' },
]

export const ROLE_LABEL = 'Proposed role model — conceptual, not ZOOP’s actual roles or permissions.'

/* ---- Operator actions --------------------------------------- */

export type ActionKind = 'direct' | 'modal' | 'approval' | 'resolve'

export const OPERATOR_ACTIONS: { id: string; icon: IconName; label: string; kind: ActionKind }[] = [
  { id: 'assign', icon: 'user', label: 'Assign to team', kind: 'direct' },
  { id: 'note', icon: 'message', label: 'Add internal note', kind: 'direct' },
  { id: 'provider', icon: 'network', label: 'Contact provider', kind: 'modal' },
  { id: 'retry', icon: 'refresh', label: 'Retry transaction', kind: 'approval' },
  { id: 'escalate', icon: 'arrow-up-right', label: 'Escalate incident', kind: 'modal' },
  { id: 'customer', icon: 'headset', label: 'Update customer status', kind: 'modal' },
  { id: 'resolve', icon: 'flag', label: 'Mark as resolved', kind: 'resolve' },
]

export const SENSITIVE_NOTE =
  'Financially sensitive or destructive actions (retry, refund, reconciliation) should require appropriate approval and audit logging.'

export const TEAMS = [
  'Payments Ops',
  'Charging Ops',
  'Data Ops',
  'Partner Operations',
  'Customer Support',
] as const

/* ---- Customer status options ------------------------------- */

export const CUSTOMER_STATUS_OPTIONS: { value: string; message: string }[] = [
  { value: 'Payment processing', message: "Your payment is still being processed. We're checking the status and will update you once it's confirmed." },
  { value: 'Payment successful', message: 'Your payment is confirmed. Thanks for your patience.' },
  { value: 'Payment failed', message: "Your payment didn't go through. You have not been charged — please try again." },
  { value: 'Refund initiated', message: 'We\'ve started a refund for this transaction. It should reach you within the usual window.' },
  { value: 'Issue under investigation', message: "We're looking into an issue affecting your transaction and will update you as soon as we can." },
]

/* ---- Audit log ------------------------------------------------ */

export const AUDIT_TIMES = [
  '10:24', '10:26', '10:29', '10:32', '10:36', '10:41', '10:45', '10:48', '10:50', '10:52', '10:55', '10:58',
]

export const AUDIT_SEED_LABEL = 'Incident detected — system alert triggered'
export const AUDIT_NOTE = 'Illustrative audit log — updates as you take actions in the prototype.'

/* ---- Other scenarios (cards) ------------------------------- */

export const OTHER_SCENARIOS: { scenarioId: ScenarioId; icon: IconName; title: string; desc: string }[] = [
  { scenarioId: 'charger', icon: 'plug', title: 'Charger offline', desc: 'See how a charger availability issue could be investigated from detection to resolution.' },
  { scenarioId: 'vehicle-data', icon: 'database', title: 'Vehicle data delay', desc: 'Explore a data synchronisation issue from detection to resolution.' },
  { scenarioId: 'high-impact', icon: 'alert', title: 'High-impact incident', desc: 'See how a larger incident might trigger escalation and cross-team coordination.' },
  { scenarioId: 'vendor', icon: 'network', title: 'Vendor issue', desc: 'Explore how a regional provider issue could be investigated and governed.' },
]

export const OTHER_SCENARIOS_LEAD =
  'The same operator workflow can be applied across different reliability problems, with the right actions and ownership for each case.'

/* ---- Design principles (compact) ---------------------------- */

export const DESIGN_PRINCIPLES = [
  'Show state clearly',
  'Surface customer impact',
  'Make ownership explicit',
  'Actions should be safe',
  'Close the loop',
]

/* ---- Closing ---------------------------------------- */

export const CLOSING = {
  eyebrow: 'Thank you for exploring the case study',
  titleLead: 'Building products that work',
  titleAccent: 'when the real world gets messy.',
  supporting:
    'That’s where I believe technical product management creates the most value — connecting customer needs, operational realities and technology into experiences people can trust.',
}
