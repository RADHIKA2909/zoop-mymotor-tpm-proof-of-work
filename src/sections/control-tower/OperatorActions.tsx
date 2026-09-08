import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { Callout } from '@/components/ui/Callout'
import { CheckList } from '@/components/ui/CheckList'
import { Timeline } from '@/components/ui/Timeline'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import {
  AUDIT_LOG,
  AUDIT_NOTE,
  CONTROL_CONSIDERATIONS,
  OPERATOR_ACTIONS,
  OPERATOR_NOTE,
} from './_data'
import s from './OperatorActions.module.css'

export function OperatorActions() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <div className={s.grid}>
          <div>
            <Eyebrow>What can the operator do?</Eyebrow>
            <h2 className={s.title}>A dashboard is only useful if you can act from it</h2>
            <ScrollReveal className={s.actions}>
              {OPERATOR_ACTIONS.map((a) => (
                <span className={s.action} key={a.label}>
                  <Icon name={a.icon} size={14} />
                  {a.label}
                  {a.restricted && (
                    <Pill tone="warning" size="sm">
                      <Icon name="lock" size={10} /> Permission-controlled
                    </Pill>
                  )}
                </span>
              ))}
            </ScrollReveal>
            <Callout kind="note" className={s.opNote}>
              {OPERATOR_NOTE}
            </Callout>
          </div>

          <div className={s.auditCol}>
            <h3 className={s.auditTitle}>Every action should leave a trail</h3>
            <Timeline
              items={AUDIT_LOG.map((e) => ({
                marker: e.time,
                title: e.label,
                tone: e.tone,
              }))}
            />
            <Callout kind="assumption" className={s.auditNoteBox}>
              Illustrative audit log. {AUDIT_NOTE}
            </Callout>
          </div>
        </div>

        <div className={s.considerations}>
          <div className={s.consHead}>
            <span className={s.consTitle}>Proposed control considerations</span>
            <Pill tone="proposed" caps size="sm">Proposed</Pill>
          </div>
          <CheckList columns={2} items={[...CONTROL_CONSIDERATIONS]} />
        </div>
      </Container>
    </section>
  )
}
