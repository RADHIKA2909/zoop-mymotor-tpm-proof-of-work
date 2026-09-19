/**
 * Section 06 — "Behind the Control Tower" (CTO deep-dive branch only).
 *
 * All copy in one place. This section extends the proposed Control Tower
 * (Section 05) with the transaction-reliability operating model behind it —
 * built for the CTO / co-founder round. Everything here is PROPOSED /
 * ILLUSTRATIVE unless explicitly marked otherwise:
 *  - The flow, failure modes, metrics and operating loop are a proposed TPM
 *    operating model based on publicly observable MyMotor behavior and the
 *    role requirements — NOT ZOOP's internal architecture or incident history.
 *  - No real ZOOP failure rate, SLA, vendor name, API or incident is claimed.
 */
import type { IconName } from '@/components/ui/Icon'
import type { FlowNode } from '@/components/diagrams/NodeFlow'

export const HERO = {
  eyebrowNumber: '06',
  eyebrow: 'Behind the Control Tower',
  title: 'Behind the Control Tower',
  subtitle: 'From customer failure → detection → diagnosis → resolution.',
  supporting:
    "The Control Tower in Section 05 is not just a dashboard. It's the operational layer connecting product configuration, transaction visibility, vendor monitoring, exception management and operational actions to a customer-facing outcome. This section walks through how.",
  disclaimer:
    "Technical flows, metrics and incident scenarios in this section are illustrative — my proposed TPM operating model based on publicly observable MyMotor behavior and the role requirements. They are not representations of ZOOP's internal architecture.",
} as const

/* ---- Block 1 — the customer journey, as a flow ---------------------- */

export const FLOW_HEADER = {
  eyebrow: 'One transaction, many systems',
  title: 'One transaction, multiple failure points',
  lead: 'A customer sees one simple action — add money and charge the vehicle. Behind that action are multiple systems, APIs and vendors. A failure in any one layer can become a customer-facing problem.',
} as const

export const FLOW_NODES: FlowNode[] = [
  { id: 'customer', label: 'Customer', icon: 'user', tone: 'brand' },
  { id: 'app', label: 'MyMotor app', icon: 'car', tone: 'muted' },
  { id: 'payment', label: 'Payment & vendor APIs', sublabel: 'Provider, webhook / event', icon: 'network', tone: 'muted' },
  { id: 'state', label: 'Transaction state', icon: 'database', tone: 'muted' },
  { id: 'charging', label: 'Charging service / CPO', icon: 'plug', tone: 'muted' },
  { id: 'outcome', label: 'Customer outcome', icon: 'check', tone: 'brand' },
]

export const FLOW_DISCLAIMER =
  'Illustrative product + technical flow — simplified for this walkthrough, not an engineering architecture diagram.'

/* ---- Block 2 — failure mode analysis --------------------------------- */

export const FAILURE_HEADER = {
  eyebrow: 'Failure mode analysis',
  title: 'Where can the journey fail?',
  lead: 'Five illustrative failure modes across the same flow — how each could be detected, what the customer sees, and how I would propose responding operationally.',
} as const

export interface FailureMode {
  icon: IconName
  title: string
  detection: string
  impact: string
  response: string
}

export const FAILURE_MODES: FailureMode[] = [
  {
    icon: 'bell',
    title: 'Missing payment webhook',
    detection: 'Provider payment is successful but the internal transaction remains pending.',
    impact: 'Wallet balance does not update.',
    response: 'Reconcile provider and internal transaction state.',
  },
  {
    icon: 'network',
    title: 'Payment provider degradation',
    detection: 'Increased API error rate / latency from the provider.',
    impact: 'Payment failures or delayed confirmation.',
    response: 'Vendor escalation, closer monitoring, fallback where supported.',
  },
  {
    icon: 'refresh',
    title: 'Duplicate webhook',
    detection: 'The same event / transaction identifier is received more than once.',
    impact: 'Risk of a duplicate credit or duplicate update.',
    response: 'Idempotency check before applying the event.',
  },
  {
    icon: 'plug',
    title: 'Charger availability mismatch',
    detection: 'A vendor reports a stale or unavailable charger state.',
    impact: 'The customer sees a charger as available but cannot start charging.',
    response: 'Validate the vendor state and mark it stale / unavailable.',
  },
  {
    icon: 'wallet',
    title: 'Payment successful, wallet not updated',
    detection: 'Provider state = successful, internal state = pending or failed.',
    impact: 'The customer has paid but cannot use the balance.',
    response: 'Reconciliation, state correction and a customer notification.',
  },
]

export const FAILURE_LABEL = 'Proposed — illustrative failure-mode examples, not observed ZOOP incidents.'

/* ---- Block 3 — operational metrics ------------------------------------ */

export const METRICS_HEADER = {
  eyebrow: 'Operational metrics',
  title: 'How I would know the system is healthy',
  lead: 'Product metrics tell us whether customers are completing the journey. Reliability metrics tell us why they are — or are not.',
} as const

export const METRIC_NAMES: string[] = [
  'Transaction success rate',
  'Payment failure rate',
  'Webhook success rate',
  'P95 / P99 API latency',
  'Vendor SLA adherence',
  'Pending transaction age',
  'Charger availability accuracy',
]

export const METRIC_RELATIONSHIP: FlowNode[] = [
  { id: 'outcome', label: 'Customer outcome', icon: 'check', tone: 'brand' },
  { id: 'success', label: 'Transaction success rate', icon: 'gauge', tone: 'muted' },
  { id: 'health', label: 'Latency / error rate / webhook health', icon: 'activity', tone: 'muted' },
  { id: 'vendor', label: 'Vendor / service reliability', icon: 'network', tone: 'muted' },
]

export const METRICS_NOTE = 'Illustrative metric names only — no ZOOP values are claimed here. Example values appear inside the prototype, always labelled illustrative.'

/* ---- Block 4 — control tower operating loop --------------------------- */

export const LOOP_HEADER = {
  eyebrow: 'The operating loop',
  title: 'From detection to resolution',
} as const

export interface LoopStep {
  key: string
  label: string
  example: string
  icon: IconName
}

export const LOOP_STEPS: LoopStep[] = [
  { key: 'detect', label: 'Detect', example: 'Payment provider failure rate increases.', icon: 'target' },
  { key: 'diagnose', label: 'Diagnose', example: 'Identify the affected provider and transaction states.', icon: 'search' },
  { key: 'act', label: 'Act', example: 'Escalate the vendor, reconcile pending transactions, activate a fallback.', icon: 'cog' },
  { key: 'verify', label: 'Verify', example: 'Success rate returns to normal.', icon: 'check' },
  { key: 'learn', label: 'Learn', example: 'RCA feeds alerting, retry, reconciliation and vendor SLA improvements.', icon: 'bulb' },
]

export const LOOP_LABEL = "Proposed operating loop — one possible model, not ZOOP's current workflow."

/* ---- Architecture reveal (expandable) --------------------------------- */

export const ARCH_NODES: FlowNode[] = [
  { id: 'mymotor', label: 'MyMotor', icon: 'car', tone: 'muted' },
  { id: 'api', label: 'API / Backend', icon: 'server', tone: 'muted' },
  { id: 'txn-service', label: 'Transaction Service', icon: 'server', tone: 'muted' },
  { id: 'provider', label: 'Payment Provider', icon: 'network', tone: 'muted' },
  { id: 'webhook', label: 'Webhook / Event', icon: 'bell', tone: 'muted' },
  { id: 'txn-state', label: 'Transaction State', icon: 'database', tone: 'muted' },
  { id: 'control-tower', label: 'Control Tower', icon: 'gauge', tone: 'brand' },
  { id: 'teams', label: 'Ops / Product / Support', icon: 'users', tone: 'muted' },
]

export const ARCH_LABEL = 'Illustrative architecture — proposed for this case study.'
export const ARCH_NOTE =
  'The Control Tower acts as the operational layer over transaction, vendor and configuration state; it should not become the source of truth for every domain.'

export const TRANSITION = {
  eyebrow: 'Next: the interactive prototype',
  heading: 'See this operating model as a working experience.',
  supporting:
    'The prototype turns this into something you can click through — an operator working the Control Tower, and a customer experience that changes in response.',
  ctaLabel: 'Explore the interactive prototype',
} as const
