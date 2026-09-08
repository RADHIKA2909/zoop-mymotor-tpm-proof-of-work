import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { Callout } from '@/components/ui/Callout'
import { KpiCard } from '@/components/ui/KpiCard'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import {
  VENDOR_FRAMEWORK,
  VENDOR_FRAMEWORK_NOTE,
  VENDOR_LABEL,
  VENDOR_METRIC_CARDS,
  VENDORS,
  type SlaStatus,
  type Vendor,
} from './_data'
import s from './VendorHealth.module.css'

const SLA_TONE: Record<SlaStatus, 'success' | 'warning' | 'error'> = {
  Healthy: 'success',
  'At risk': 'warning',
  Breached: 'error',
}

interface Props {
  onOpen: (id: string) => void
}

export function VendorHealth({ onOpen }: Props) {
  const columns: Column<Vendor>[] = [
    { key: 'name', header: 'Provider', render: (r) => <span className={s.name}>{r.name}<span className={s.role}>{r.role}</span></span> },
    { key: 'availability', header: 'Availability', align: 'right', hideOnMobile: true },
    { key: 'successRate', header: 'Success rate', align: 'right' },
    { key: 'latency', header: 'Latency', align: 'right', hideOnMobile: true },
    { key: 'failureRate', header: 'Failure rate', align: 'right', hideOnMobile: true },
    {
      key: 'sla',
      header: 'SLA',
      render: (r) => (
        <Pill tone={SLA_TONE[r.sla]} size="sm" dot>
          {r.sla}
        </Pill>
      ),
    },
    { key: 'openIssues', header: 'Open issues', align: 'right' },
  ]

  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>Vendor &amp; dependency health</Eyebrow>
        <h2 className={s.title}>Which partners are creating operational risk?</h2>

        <Callout kind="assumption" className={s.banner}>
          {VENDOR_LABEL}
        </Callout>

        <ScrollReveal>
          <DataTable
            columns={columns}
            rows={VENDORS}
            getRowId={(r) => r.id}
            onRowClick={(r) => onOpen(r.id)}
            density="compact"
          />
        </ScrollReveal>

        <div className={s.metrics}>
          {VENDOR_METRIC_CARDS.map((c) => (
            <KpiCard key={c.label} label={c.label} value={c.value} unit={c.unit} sublabel="Illustrative" tone="info" />
          ))}
        </div>

        <div className={s.framework}>
          <div className={s.fwHead}>
            <span className={s.fwTitle}>Proposed vendor-governance framework</span>
            <Pill tone="proposed" caps size="sm">Proposed</Pill>
          </div>
          <div className={s.fwRow}>
            {VENDOR_FRAMEWORK.map((f, i) => (
              <span className={s.fwItem} key={f}>
                {f}
                {i < VENDOR_FRAMEWORK.length - 1 && (
                  <span className={s.plus} aria-hidden="true">+</span>
                )}
              </span>
            ))}
          </div>
          <p className={s.fwNote}>{VENDOR_FRAMEWORK_NOTE}</p>
        </div>
      </Container>
    </section>
  )
}
