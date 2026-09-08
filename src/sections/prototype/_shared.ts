/** Small shared helpers for the Section 6 interactive stage. */
import type { PillTone } from '@/components/ui/Pill'
import type { IncidentStatus } from './_state'

export type { PrototypeState, PrototypeAction } from './_state'

/** Conceptual incident status → Pill tone. */
export const STATUS_TONE: Record<IncidentStatus, PillTone> = {
  Open: 'pending',
  Assigned: 'info',
  Investigating: 'info',
  Escalated: 'warning',
  Resolved: 'success',
  Closed: 'neutral',
}

/** Smooth-scroll to the interactive stage (`#prototype-app`). */
export function scrollToApp() {
  if (typeof document === 'undefined') return
  document
    .getElementById('prototype-app')
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
