import { Icon } from '@/components/ui/Icon'
import type { Diagnosis } from './_data'
import s from './DiagnosisCard.module.css'

/** Renders a conceptual incident diagnosis. Used standalone + inside the drawer. */
export function DiagnosisCard({ d, compact }: { d: Diagnosis; compact?: boolean }) {
  return (
    <div className={compact ? s.compact : s.card}>
      <div className={s.row}>
        <span className={s.key}>Incident</span>
        <span className={s.val}>{d.incident}</span>
      </div>
      <div className={s.states}>
        <div className={s.state} data-kind="expected">
          <span className={s.stateKey}>Expected</span>
          {d.expected}
        </div>
        <Icon name="arrow-right" size={14} className={s.stateArrow} />
        <div className={s.state} data-kind="actual">
          <span className={s.stateKey}>Actual</span>
          {d.actual}
        </div>
      </div>
      <div className={s.row}>
        <span className={s.key}>Possible signals</span>
        <ul className={s.signals}>
          {d.signals.map((sig) => (
            <li key={sig}>{sig}</li>
          ))}
        </ul>
      </div>
      <div className={s.row}>
        <span className={s.key}>Dependency</span>
        <span className={s.val}>{d.dependency}</span>
      </div>
      <div className={s.row}>
        <span className={s.key}>Owner</span>
        <span className={s.val}>{d.owner}</span>
      </div>
      <div className={s.row}>
        <span className={s.key}>Next action</span>
        <span className={s.next}>{d.nextAction}</span>
      </div>
    </div>
  )
}
