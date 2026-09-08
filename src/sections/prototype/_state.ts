/**
 * Section 6 prototype — local state model.
 *
 * One reducer drives the whole interactive workflow. All transitions are
 * conceptual and illustrative; nothing here mirrors ZOOP's real incident states.
 * State is in-memory only — it resets when the component unmounts and via the
 * explicit "Reset scenario" control.
 *
 * Conceptual incident state model:
 *   Open → Assigned → Investigating → Escalated → Resolved → Closed
 *   (Escalated is optional; not every incident is escalated.)
 */
import type { StatusTone } from '@/components/ui/StatusDot'
import {
  AUDIT_SEED_LABEL,
  AUDIT_TIMES,
  SCENARIOS,
  type RoleId,
  type ScenarioId,
  type StepId,
  type TabId,
} from './_data'

export type IncidentStatus =
  | 'Open'
  | 'Assigned'
  | 'Investigating'
  | 'Escalated'
  | 'Resolved'
  | 'Closed'

export type ApprovalState = 'none' | 'requested' | 'approved' | 'rejected'
export type ModalId = 'escalate' | 'provider' | 'customer' | null

export interface AuditEvent {
  time: string
  label: string
  tone: StatusTone
}

export interface PrototypeState {
  scenario: ScenarioId
  step: StepId
  status: IncidentStatus
  role: RoleId
  owner: string | null
  customerStatus: string
  providerContacted: boolean
  escalated: boolean
  retryApproval: ApprovalState
  rcaCaptured: boolean
  incidentOpened: boolean
  activeTab: TabId
  modal: ModalId
  audit: AuditEvent[]
}

export type PrototypeAction =
  | { type: 'SELECT_SCENARIO'; scenario: ScenarioId }
  | { type: 'RESET' }
  | { type: 'SET_STEP'; step: StepId }
  | { type: 'SET_ROLE'; role: RoleId }
  | { type: 'OPEN_INCIDENT' }
  | { type: 'SET_TAB'; tab: TabId }
  | { type: 'ASSIGN_OWNER'; owner: string }
  | { type: 'ADD_NOTE' }
  | { type: 'OPEN_MODAL'; modal: Exclude<ModalId, null> }
  | { type: 'CLOSE_MODAL' }
  | { type: 'CONTACT_PROVIDER' }
  | { type: 'ESCALATE' }
  | { type: 'UPDATE_CUSTOMER_STATUS'; value: string }
  | { type: 'REQUEST_RETRY_APPROVAL' }
  | { type: 'RESOLVE_RETRY_APPROVAL'; decision: 'approved' | 'rejected' }
  | { type: 'RESOLVE_INCIDENT' }
  | { type: 'CAPTURE_RCA' }

function nextTime(count: number): string {
  return AUDIT_TIMES[Math.min(count, AUDIT_TIMES.length - 1)]
}

/** Append an audit event using the next illustrative timestamp. */
function withAudit(state: PrototypeState, label: string, tone: StatusTone): AuditEvent[] {
  return [...state.audit, { time: nextTime(state.audit.length), label, tone }]
}

export function initialState(scenario: ScenarioId): PrototypeState {
  const seedTone: StatusTone =
    SCENARIOS[scenario].incident.severity === 'Critical' ? 'error' : 'info'
  return {
    scenario,
    step: 'detect',
    status: 'Open',
    role: 'operator',
    owner: null,
    customerStatus: '',
    providerContacted: false,
    escalated: false,
    retryApproval: 'none',
    rcaCaptured: false,
    incidentOpened: false,
    activeTab: 'overview',
    modal: null,
    audit: [{ time: AUDIT_TIMES[0], label: AUDIT_SEED_LABEL, tone: seedTone }],
  }
}

export function reducer(state: PrototypeState, action: PrototypeAction): PrototypeState {
  switch (action.type) {
    case 'SELECT_SCENARIO':
      return initialState(action.scenario)

    case 'RESET':
      return initialState(state.scenario)

    case 'SET_ROLE':
      return { ...state, role: action.role }

    case 'SET_TAB':
      return { ...state, activeTab: action.tab }

    case 'OPEN_INCIDENT': {
      if (state.incidentOpened) return { ...state, step: 'investigate' }
      return {
        ...state,
        incidentOpened: true,
        step: 'investigate',
        audit: withAudit(state, 'Incident opened by operator', 'info'),
      }
    }

    case 'SET_STEP': {
      let next: PrototypeState = { ...state, step: action.step, incidentOpened: true }
      // Entering "Take action" moves an untouched incident into Investigating.
      if (
        action.step === 'act' &&
        (state.status === 'Open' || state.status === 'Assigned')
      ) {
        next = {
          ...next,
          status: 'Investigating',
          audit: withAudit(state, 'Investigation started', 'info'),
        }
      }
      return next
    }

    case 'ASSIGN_OWNER':
      return {
        ...state,
        owner: action.owner,
        status: state.status === 'Open' ? 'Assigned' : state.status,
        audit: withAudit(state, `Assigned to ${action.owner}`, 'info'),
      }

    case 'ADD_NOTE':
      return { ...state, audit: withAudit(state, 'Internal note added', 'info') }

    case 'OPEN_MODAL':
      return { ...state, modal: action.modal }

    case 'CLOSE_MODAL':
      return { ...state, modal: null }

    case 'CONTACT_PROVIDER':
      return {
        ...state,
        providerContacted: true,
        modal: null,
        status:
          state.status === 'Open' || state.status === 'Assigned'
            ? 'Investigating'
            : state.status,
        audit: withAudit(state, 'Provider contacted', 'warning'),
      }

    case 'ESCALATE':
      return {
        ...state,
        escalated: true,
        status: 'Escalated',
        modal: null,
        audit: withAudit(state, 'Incident escalated to Team Lead', 'warning'),
      }

    case 'UPDATE_CUSTOMER_STATUS':
      return {
        ...state,
        customerStatus: action.value,
        modal: null,
        audit: withAudit(state, `Customer status updated: ${action.value}`, 'success'),
      }

    case 'REQUEST_RETRY_APPROVAL':
      if (state.role === 'lead' || state.retryApproval === 'requested') return state
      return {
        ...state,
        retryApproval: 'requested',
        audit: withAudit(state, 'Retry transaction — approval requested', 'warning'),
      }

    case 'RESOLVE_RETRY_APPROVAL': {
      if (state.role !== 'lead' || state.retryApproval !== 'requested') return state
      const approved = action.decision === 'approved'
      return {
        ...state,
        retryApproval: action.decision,
        audit: withAudit(
          state,
          approved ? 'Retry approved by Team Lead' : 'Retry rejected by Team Lead',
          approved ? 'success' : 'neutral',
        ),
      }
    }

    case 'RESOLVE_INCIDENT':
      if (state.status === 'Resolved' || state.status === 'Closed') {
        return { ...state, step: 'resolve' }
      }
      return {
        ...state,
        status: 'Resolved',
        step: 'resolve',
        audit: withAudit(state, 'Incident resolved', 'success'),
      }

    case 'CAPTURE_RCA':
      if (state.rcaCaptured) return { ...state, step: 'learn' }
      return {
        ...state,
        rcaCaptured: true,
        status: 'Closed',
        step: 'learn',
        audit: withAudit(state, 'RCA captured — incident closed', 'neutral'),
      }

    default:
      return state
  }
}

/** Which stepper milestones are complete (drives the stepper's done state). */
export function stepDone(state: PrototypeState, step: StepId): boolean {
  switch (step) {
    case 'detect':
      return state.incidentOpened
    case 'investigate':
      return state.status !== 'Open' || state.step === 'act' || state.step === 'resolve' || state.step === 'learn'
    case 'act':
      return state.status === 'Resolved' || state.status === 'Closed'
    case 'resolve':
      return state.status === 'Closed'
    case 'learn':
      return state.rcaCaptured
    default:
      return false
  }
}
