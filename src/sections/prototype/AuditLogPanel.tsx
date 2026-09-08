import { Pill } from '@/components/ui/Pill'
import { Timeline } from '@/components/ui/Timeline'
import { AUDIT_NOTE } from './_data'
import type { PrototypeState } from './_state'
import s from './AuditLogPanel.module.css'

export function AuditLogPanel({ state }: { state: PrototypeState }) {
  return (
    <aside className={s.rail} aria-label="Audit log">
      <div className={s.head}>
        <span className={s.title}>Audit log</span>
        <Pill tone="assumption" size="sm">
          Illustrative
        </Pill>
      </div>
      <Timeline
        className={s.timeline}
        items={state.audit.map((e) => ({ marker: e.time, title: e.label, tone: e.tone }))}
      />
      <p className={s.note}>{AUDIT_NOTE}</p>
    </aside>
  )
}
