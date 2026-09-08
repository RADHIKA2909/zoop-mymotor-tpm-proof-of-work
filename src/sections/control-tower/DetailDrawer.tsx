import type { ReactNode } from 'react'
import { Drawer } from '@/components/ui/Drawer'
import { Pill } from '@/components/ui/Pill'
import { Callout } from '@/components/ui/Callout'
import { Timeline } from '@/components/ui/Timeline'
import { Icon } from '@/components/ui/Icon'
import { DiagnosisCard } from './DiagnosisCard'
import {
  AUDIT_LOG,
  DIAGNOSIS_LABEL,
  EXCEPTIONS,
  SEVERITY_META,
  TXNS,
  VENDORS,
  type SlaStatus,
  type TxStatus,
} from './_data'
import s from './DetailDrawer.module.css'

export type DetailEntity =
  | { kind: 'transaction'; id: string }
  | { kind: 'incident'; id: string }
  | { kind: 'vendor'; id: string }

interface Props {
  entity: DetailEntity | null
  onClose: () => void
}

const STATUS_TONE: Record<TxStatus, 'success' | 'warning' | 'error' | 'neutral'> = {
  Healthy: 'success',
  'At risk': 'warning',
  Escalated: 'error',
  Resolved: 'neutral',
}
const SLA_TONE: Record<SlaStatus, 'success' | 'warning' | 'error'> = {
  Healthy: 'success',
  'At risk': 'warning',
  Breached: 'error',
}

function DefRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={s.defRow}>
      <span className={s.defKey}>{label}</span>
      <span className={s.defVal}>{children}</span>
    </div>
  )
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={s.block}>
      <h3 className={s.blockTitle}>{title}</h3>
      {children}
    </section>
  )
}

const RestrictedFooter = (
  <div className={s.footer}>
    <span className={s.footerActions}>
      <button className={s.action} disabled>
        <Icon name="user" size={14} /> Assign
      </button>
      <button className={s.action} disabled>
        <Icon name="arrow-up-right" size={14} /> Escalate
      </button>
    </span>
    <span className={s.footerNote}>
      <Icon name="lock" size={12} /> Illustrative — actions are permission-controlled and
      disabled in this proof of work.
    </span>
  </div>
)

export function DetailDrawer({ entity, onClose }: Props) {
  const txn = entity?.kind === 'transaction' ? TXNS.find((t) => t.id === entity.id) : null
  const inc = entity?.kind === 'incident' ? EXCEPTIONS.find((e) => e.id === entity.id) : null
  const ven = entity?.kind === 'vendor' ? VENDORS.find((v) => v.id === entity.id) : null

  const open = Boolean(txn || inc || ven)

  let eyebrow = ''
  let title: ReactNode = ''
  let body: ReactNode = null

  if (txn) {
    eyebrow = `Transaction · ${txn.id}`
    title = txn.state
    body = (
      <>
        <div className={s.pills}>
          <Pill tone={STATUS_TONE[txn.status]} size="sm" dot>
            {txn.status}
          </Pill>
          <Pill tone="neutral" size="sm">
            {txn.journey}
          </Pill>
        </div>
        <Block title="Summary">
          <DefRow label="Current state">{txn.state}</DefRow>
          <DefRow label="Dependency">{txn.dependency}</DefRow>
          <DefRow label="Age">{txn.age}</DefRow>
          <DefRow label="Customer impact">{txn.impact}</DefRow>
          <DefRow label="Owner">{txn.owner}</DefRow>
        </Block>
        <Block title="Transaction timeline">
          <Timeline
            items={txn.timeline.map((t) => ({ marker: t.time, title: t.label, tone: 'info' }))}
          />
        </Block>
        <Block title="Diagnosis">
          <DiagnosisCard d={txn.diagnosis} compact />
          <Callout kind="inferred" className={s.callout}>
            {DIAGNOSIS_LABEL}
          </Callout>
        </Block>
      </>
    )
  } else if (inc) {
    const meta = SEVERITY_META[inc.severity]
    eyebrow = `Incident · ${inc.id}`
    title = inc.issue
    body = (
      <>
        <div className={s.pills}>
          <Pill tone={meta.tone} size="sm" dot>
            {meta.label}
          </Pill>
          <Pill tone="neutral" size="sm">
            {inc.dependency}
          </Pill>
        </div>
        <Block title="Summary">
          <DefRow label="Issue">{inc.issue}</DefRow>
          <DefRow label="Customer impact">{inc.impact}</DefRow>
          <DefRow label="Dependency">{inc.dependency}</DefRow>
          <DefRow label="Age">{inc.age}</DefRow>
          <DefRow label="Owner">{inc.owner}</DefRow>
          <DefRow label="Next action">{inc.nextAction}</DefRow>
        </Block>
        <Block title="Diagnosis">
          <DiagnosisCard d={inc.diagnosis} compact />
          <Callout kind="inferred" className={s.callout}>
            {DIAGNOSIS_LABEL}
          </Callout>
        </Block>
        <Block title="Audit log">
          <Timeline
            items={AUDIT_LOG.map((e) => ({ marker: e.time, title: e.label, tone: e.tone }))}
          />
          <Callout kind="assumption" className={s.callout}>
            Illustrative audit log — fictional timestamps.
          </Callout>
        </Block>
      </>
    )
  } else if (ven) {
    eyebrow = `Vendor · ${ven.name}`
    title = ven.role
    body = (
      <>
        <div className={s.pills}>
          <Pill tone={SLA_TONE[ven.sla]} size="sm" dot>
            SLA {ven.sla}
          </Pill>
          <Pill tone="neutral" size="sm">
            {ven.openIssues} open {ven.openIssues === 1 ? 'issue' : 'issues'}
          </Pill>
        </div>
        <Block title="Reliability">
          <DefRow label="Availability">{ven.availability}</DefRow>
          <DefRow label="Success rate">{ven.successRate}</DefRow>
          <DefRow label="Latency">{ven.latency}</DefRow>
          <DefRow label="Failure rate">{ven.failureRate}</DefRow>
          <DefRow label="SLA status">{ven.sla}</DefRow>
        </Block>
        <Block title="Recent incidents">
          <ul className={s.list}>
            {ven.recentIncidents.map((r) => (
              <li key={r}>
                <Icon name="chevron-right" size={12} />
                {r}
              </li>
            ))}
          </ul>
        </Block>
        <Callout kind="assumption" className={s.callout}>
          Illustrative vendor data — not internal ZOOP data. Provider names are fictional.
        </Callout>
      </>
    )
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      eyebrow={eyebrow}
      title={title}
      width={480}
      footer={open ? RestrictedFooter : undefined}
    >
      {body}
    </Drawer>
  )
}
