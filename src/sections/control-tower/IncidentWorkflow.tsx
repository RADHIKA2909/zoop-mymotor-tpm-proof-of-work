import { Container } from '@/components/ui/Container'
import { Pill } from '@/components/ui/Pill'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import {
  ESCALATION_FORMULA,
  ESCALATION_LABEL,
  ESCALATION_ROWS,
  WORKFLOW_LABEL,
  WORKFLOW_STEPS,
  type EscalationRow,
} from './_data'
import s from './IncidentWorkflow.module.css'

const STATE_TONE = {
  Normal: 'success',
  'At risk': 'warning',
  'SLA breached': 'error',
} as const

export function IncidentWorkflow() {
  const columns: Column<EscalationRow>[] = [
    { key: 'type', header: 'Issue type', render: (r) => <span className={s.type}>{r.type}</span> },
    { key: 'expected', header: 'Expected resolution', hideOnMobile: true },
    { key: 'trigger', header: 'Escalation trigger' },
    { key: 'owner', header: 'Owner', hideOnMobile: true },
    {
      key: 'state',
      header: 'State',
      render: (r) => (
        <Pill tone={STATE_TONE[r.state]} size="sm" dot>
          {r.state}
        </Pill>
      ),
    },
  ]

  return (
    <section className={s.section}>
      <Container size="wide">
        <h2 className={s.title}>From detection to resolution</h2>
        <p className={s.lead}>
          A reliable experience needs more than a successful transaction — it needs a
          repeatable path from an abnormal signal to a recovered customer.
        </p>

        <ScrollReveal>
          <ol className={s.flow}>
            {WORKFLOW_STEPS.map((step) => (
              <li className={s.step} key={step.num} data-tone={step.tone}>
                <span className={s.stepNum}>{step.num}</span>
                <div>
                  <span className={s.stepTitle}>{step.title}</span>
                  <p className={s.stepDesc}>{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </ScrollReveal>
        <Pill tone="proposed" variant="outline" caps size="sm" className={s.flowLabel}>
          {WORKFLOW_LABEL}
        </Pill>

        <div className={s.escalation}>
          <div className={s.escHead}>
            <h3 className={s.escTitle}>When should we escalate?</h3>
            <Pill tone="proposed" caps size="sm">{ESCALATION_LABEL}</Pill>
          </div>
          <DataTable
            columns={columns}
            rows={ESCALATION_ROWS}
            getRowId={(r) => r.type}
            density="compact"
          />
          <div className={s.formula}>
            {ESCALATION_FORMULA.map((f, i) => (
              <span key={f}>
                <span className={s.formulaItem}>{f}</span>
                {i < ESCALATION_FORMULA.length - 1 ? (
                  <span className={s.op}>+</span>
                ) : (
                  <>
                    <span className={s.op}>=</span>
                    <span className={s.formulaResult}>Escalation priority</span>
                  </>
                )}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
