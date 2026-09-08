import { useState } from 'react'
import { cn } from '@/lib/cn'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { Callout } from '@/components/ui/Callout'
import { CheckList } from '@/components/ui/CheckList'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import {
  EXCEPTIONS,
  SEVERITY_DIMENSIONS,
  SEVERITY_LABEL,
  SEVERITY_META,
  type Exception,
  type Severity,
} from './_data'
import s from './ExceptionQueue.module.css'

const FILTERS = ['All', 'P0', 'P1', 'P2', 'P3'] as const
type Filter = (typeof FILTERS)[number]

interface Props {
  onOpen: (id: string) => void
}

export function ExceptionQueue({ onOpen }: Props) {
  const [filter, setFilter] = useState<Filter>('All')
  const rows =
    filter === 'All' ? EXCEPTIONS : EXCEPTIONS.filter((e) => e.severity === filter)

  const columns: Column<Exception>[] = [
    {
      key: 'severity',
      header: 'Severity',
      render: (r) => (
        <Pill tone={SEVERITY_META[r.severity].tone} size="sm" dot>
          {r.severity}
        </Pill>
      ),
    },
    { key: 'issue', header: 'Issue', render: (r) => <span className={s.issue}>{r.issue}</span> },
    { key: 'impact', header: 'Customer impact', hideOnMobile: true },
    { key: 'dependency', header: 'Dependency', hideOnMobile: true },
    { key: 'age', header: 'Age', align: 'right', hideOnMobile: true },
    { key: 'owner', header: 'Owner', hideOnMobile: true },
    { key: 'nextAction', header: 'Next action', render: (r) => <span className={s.action}>{r.nextAction}</span> },
  ]

  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>Exception queue</Eyebrow>
        <h2 className={s.title}>What needs attention right now?</h2>

        <div className={s.filters} role="tablist" aria-label="Severity">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={cn(s.filterBtn, filter === f && s.filterBtnActive)}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <ScrollReveal>
          <DataTable
            columns={columns}
            rows={rows}
            getRowId={(r) => r.id}
            onRowClick={(r) => onOpen(r.id)}
            density="compact"
            emptyMessage="No exceptions at this severity."
          />
        </ScrollReveal>
        <Callout kind="assumption" className={s.note}>
          Illustrative exception queue — fictional incidents and IDs.
        </Callout>

        <div className={s.model}>
          <div className={s.modelHead}>
            <span className={s.modelTitle}>Proposed incident severity model</span>
            <Pill tone="proposed" caps size="sm">
              {SEVERITY_LABEL}
            </Pill>
          </div>
          <div className={s.sevGrid}>
            {(Object.keys(SEVERITY_META) as Severity[]).map((k) => (
              <div className={s.sevCard} key={k} data-tone={SEVERITY_META[k].tone}>
                <span className={s.sevLabel}>{SEVERITY_META[k].label}</span>
                <p className={s.sevDesc}>{SEVERITY_META[k].desc}</p>
              </div>
            ))}
          </div>
          <p className={s.dimsTitle}>Severity should consider:</p>
          <CheckList columns={2} items={[...SEVERITY_DIMENSIONS]} />
        </div>
      </Container>
    </section>
  )
}
