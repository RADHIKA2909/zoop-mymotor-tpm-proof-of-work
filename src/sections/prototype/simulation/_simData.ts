/**
 * "Operate the Control Tower" simulation — all copy + mock data.
 *
 * CTO deep-dive branch only. Illustrative simulation data — Provider A/B/C,
 * TXN-10482, every metric and timestamp below are fictional, exist only to
 * make the proposed operator workflow tangible, and are not connected to any
 * real ZOOP system, vendor, transaction or customer.
 */
import type { IconName } from '@/components/ui/Icon'
import type { StatusTone } from '@/components/ui/StatusDot'

export type SimRole = 'operations' | 'product' | 'support' | 'finance' | 'marketing'
export type SimView = 'control-tower' | 'mymotor'
export type CtTab = 'overview' | 'transactions' | 'vendors' | 'incidents' | 'configuration'
export type PermissionLevel = 'hidden' | 'view' | 'edit' | 'execute'

export const SIM_DISCLAIMER =
  'Interactive simulation — illustrative data, not connected to ZOOP systems.'

export const SIM_INTRO = {
  eyebrow: 'Operate the Control Tower',
  title: 'See how a Control Tower action changes the MyMotor experience',
  lead: 'A small role-based simulation: switch roles, change a configuration or reconcile a transaction on the Control Tower side, then toggle to MyMotor and watch the same shared state change the customer experience.',
} as const

export const SIM_ROLES: { id: SimRole; label: string; can: string }[] = [
  { id: 'operations', label: 'Operations', can: 'View transactions, vendors and configuration. Investigate and reconcile incidents.' },
  { id: 'product', label: 'Product', can: 'View product metrics and manage product configuration.' },
  { id: 'support', label: 'Support', can: 'Search transactions and view incident status.' },
  { id: 'finance', label: 'Finance', can: 'View payments, pricing configuration and transaction status.' },
  { id: 'marketing', label: 'Marketing', can: 'View overview metrics only.' },
]

export const ROLE_LABEL = "Proposed role model — conceptual, not ZOOP's actual roles or permissions."

export const CT_TABS: { id: CtTab; label: string; icon: IconName }[] = [
  { id: 'overview', label: 'Overview', icon: 'grid' },
  { id: 'transactions', label: 'Transactions', icon: 'card' },
  { id: 'vendors', label: 'Vendors', icon: 'network' },
  { id: 'incidents', label: 'Incidents', icon: 'alert' },
  { id: 'configuration', label: 'Configuration', icon: 'sliders' },
]

/** Role -> tab -> permission. A tab absent for a role is treated as 'hidden'. */
export const SIM_PERMISSIONS: Record<SimRole, Partial<Record<CtTab, PermissionLevel>>> = {
  operations: { overview: 'view', transactions: 'view', vendors: 'view', incidents: 'execute', configuration: 'view' },
  product: { overview: 'view', transactions: 'view', vendors: 'view', configuration: 'edit' },
  support: { overview: 'view', transactions: 'view', incidents: 'view' },
  finance: { overview: 'view', transactions: 'view', configuration: 'view' },
  marketing: { overview: 'view' },
}

export function permissionFor(role: SimRole, tab: CtTab): PermissionLevel {
  return SIM_PERMISSIONS[role][tab] ?? 'hidden'
}

export const PERMISSION_BADGE: Record<Exclude<PermissionLevel, 'hidden'>, string> = {
  view: 'View',
  edit: 'Edit',
  execute: 'Execute',
}

export const NO_PERMISSION_NOTE = "You don't have permission to view this section."
export const NO_EDIT_NOTE = "You don't have permission to modify this configuration."
export const NO_EXECUTE_NOTE = "You don't have permission to modify this incident."

/* ---- Overview tab ------------------------------------------------------ */

export const OVERVIEW_KPIS: { label: string; value: string; sublabel?: string }[] = [
  { label: 'Transactions today', value: '12,480', sublabel: 'Illustrative' },
  { label: 'Success rate', value: '96.8%', sublabel: 'Illustrative' },
  { label: 'Open incidents', value: '1', sublabel: 'Illustrative' },
  { label: 'Customers impacted', value: '86', sublabel: 'Illustrative' },
]

/* ---- Vendors tab --------------------------------------------------------- */

export type VendorStatus = 'Healthy' | 'Degraded'

export interface SimVendor {
  id: string
  name: string
  role: string
  successRate: string
  latency: 'Normal' | 'High'
  sla: 'Within target' | 'Breached'
  status: VendorStatus
}

export const SIM_VENDORS: SimVendor[] = [
  { id: 'provider-a', name: 'Provider A', role: 'Payment provider', successRate: '96.8%', latency: 'High', sla: 'Breached', status: 'Degraded' },
  { id: 'provider-b', name: 'Provider B', role: 'Charging network', successRate: '99.4%', latency: 'Normal', sla: 'Within target', status: 'Healthy' },
  { id: 'provider-c', name: 'Provider C', role: 'Vehicle / RTO data', successRate: '98.9%', latency: 'Normal', sla: 'Within target', status: 'Healthy' },
]

export const VENDOR_NOTE = 'Illustrative data for prototype — not actual ZOOP vendor metrics.'

/* ---- Incidents tab ------------------------------------------------------- */

export const INCIDENT = {
  id: 'INC-10490',
  title: 'Provider A payment degradation',
  severity: 'P1',
  started: '10:42 AM',
  affectedTransactions: 427,
  customerImpact: 'High',
  detectedThrough: 'Payment success-rate alert',
} as const

export const INCIDENT_TIMELINE: { time: string; label: string; tone: StatusTone }[] = [
  { time: '10:24', label: 'Payment initiated', tone: 'info' },
  { time: '10:24', label: 'Provider payment successful', tone: 'success' },
  { time: '10:26', label: 'Webhook delayed / missing', tone: 'warning' },
  { time: '10:26', label: 'Internal transaction = Pending', tone: 'warning' },
  { time: '10:42', label: 'Reconciliation triggered', tone: 'info' },
]

export const RECONCILE_STEP_LABEL = 'Reconciling provider and internal state…'
export const RECONCILE_SUCCESS_LABEL = 'Transaction reconciled successfully.'

export const RCA = {
  problem: 'Payment confirmation delayed.',
  impact: 'Customers see pending payments and cannot reliably use wallet balance.',
  rootCause: 'Webhook delivery degradation from the payment provider.',
  mitigation: 'Reconciliation of affected transactions.',
  improvements: [
    'Webhook monitoring',
    'Retry / reconciliation strategy',
    'Vendor SLA alerting',
    'Idempotent event processing',
    'Clearer customer-facing payment state',
  ],
} as const

export const RCA_LABEL = 'Proposed RCA example — not a claim about an actual ZOOP incident.'

/* ---- Configuration tab --------------------------------------------------- */

export const PRICING_LABEL = 'EV charging pricing'
export const PRICING_PROVIDER = 'Provider A'
export const CONFIG_SAVED_MESSAGE = '✓ Configuration updated'
export const CONFIG_NOTE = 'Front-end simulation only — changes are not sent to any backend.'

/* ---- MyMotor mini app ----------------------------------------------------- */

export type MyMotorScreen = 'home' | 'charger' | 'wallet' | 'transaction'

export const MYMOTOR_SCREENS: { id: MyMotorScreen; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'charger', label: 'Charger Detail' },
  { id: 'wallet', label: 'Wallet' },
  { id: 'transaction', label: 'Transaction Status' },
]

export const PAYMENT_PENDING_COPY = {
  title: 'Payment Pending',
  body: "Payment of ₹1,000 is currently being verified. Your payment provider has received the request, but confirmation is still pending. We'll update your wallet once the transaction is confirmed.",
} as const

export const PAYMENT_SUCCESS_COPY = '₹1,000 added to your wallet.'

export const ARCHITECTURE_LINK_LABEL = 'See the illustrative architecture this simulation is based on'
