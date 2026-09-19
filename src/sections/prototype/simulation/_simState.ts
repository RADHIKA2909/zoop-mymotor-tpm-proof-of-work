/**
 * Section 06 enhancement (CTO deep-dive branch only) — "Operate the Control
 * Tower" simulation. A second, self-contained reducer, independent of the
 * existing 5-scenario incident stepper (`../_state.ts`) so that stepper keeps
 * working exactly as before. One shared state drives BOTH the Control Tower
 * panel and the MyMotor mini app — that's the point: a Control Tower action
 * (change pricing, reconcile a transaction) changes what MyMotor shows, in the
 * same render tree, from the same state.
 *
 * Everything here is a front-end simulation — illustrative data only, no
 * backend, not connected to any ZOOP system.
 */
import type { CtTab, SimRole, SimView } from './_simData'

export interface SimTransaction {
  id: string
  providerStatus: 'success'
  internalStatus: 'pending' | 'success'
  amount: number
}

export interface SimState {
  role: SimRole
  view: SimView
  ctTab: CtTab
  pricing: { providerA: number }
  incidentStatus: 'investigating' | 'resolved'
  incidentDrawerOpen: boolean
  transaction: SimTransaction
  wallet: { balance: number }
  reconciling: boolean
}

export type SimAction =
  | { type: 'SELECT_ROLE'; role: SimRole }
  | { type: 'SELECT_VIEW'; view: SimView }
  | { type: 'SELECT_CT_TAB'; tab: CtTab }
  | { type: 'UPDATE_PRICING'; value: number }
  | { type: 'OPEN_INCIDENT_DRAWER' }
  | { type: 'CLOSE_INCIDENT_DRAWER' }
  | { type: 'START_RECONCILE' }
  | { type: 'RECONCILE_DONE' }
  | { type: 'RESET_SIMULATION' }

export function initialSimState(): SimState {
  return {
    role: 'operations',
    view: 'control-tower',
    ctTab: 'overview',
    pricing: { providerA: 12 },
    incidentStatus: 'investigating',
    incidentDrawerOpen: false,
    transaction: { id: 'TXN-10482', providerStatus: 'success', internalStatus: 'pending', amount: 1000 },
    wallet: { balance: 0 },
    reconciling: false,
  }
}

export function simReducer(state: SimState, action: SimAction): SimState {
  switch (action.type) {
    case 'SELECT_ROLE':
      return { ...state, role: action.role }

    case 'SELECT_VIEW':
      return { ...state, view: action.view }

    case 'SELECT_CT_TAB':
      return { ...state, ctTab: action.tab }

    case 'UPDATE_PRICING':
      return { ...state, pricing: { providerA: action.value } }

    case 'OPEN_INCIDENT_DRAWER':
      return { ...state, incidentDrawerOpen: true }

    case 'CLOSE_INCIDENT_DRAWER':
      return { ...state, incidentDrawerOpen: false }

    case 'START_RECONCILE':
      if (state.transaction.internalStatus === 'success') return state
      return { ...state, reconciling: true }

    case 'RECONCILE_DONE':
      if (state.transaction.internalStatus === 'success') return state
      return {
        ...state,
        reconciling: false,
        incidentStatus: 'resolved',
        transaction: { ...state.transaction, internalStatus: 'success' },
        wallet: { balance: state.wallet.balance + state.transaction.amount },
      }

    case 'RESET_SIMULATION':
      return initialSimState()

    default:
      return state
  }
}
