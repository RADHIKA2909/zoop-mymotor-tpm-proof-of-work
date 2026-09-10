import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { Callout } from '@/components/ui/Callout'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { TXNS, type Txn, type TxStatus } from './_data'
import s from './TransactionMonitoring.module.css'

const STATUS_TONE: Record<TxStatus, 'success' | 'warning' | 'error' | 'neutral'> = {
  Healthy: 'success',
  'At risk': 'warning',
  Escalated: 'error',
  Resolved: 'neutral',
}

interface Props {
  onOpen: (id: string) => void
}

export function TransactionMonitoring({ onOpen }: Props) {
  const columns: Column<Txn>[] = [
    { key: 'id', header: 'Transaction', render: (r) => <code className={s.id}>{r.id}</code> },
    { key: 'journey', header: 'Journey', hideOnMobile: true },
    { key: 'state', header: 'Current state', render: (r) => <span className={s.state}>{r.state}</span> },
    { key: 'dependency', header: 'Dependency', hideOnMobile: true },
    { key: 'age', header: 'Age', align: 'right', hideOnMobile: true },
    { key: 'impact', header: 'Impact', hideOnMobile: true },
    {
      key: 'status',
      header: 'Status',
      render: (r) => (
        <Pill tone={STATUS_TONE[r.status]} size="sm" dot>
          {r.status}
        </Pill>
      ),
    },
    { key: 'owner', header: 'Owner', hideOnMobile: true },
  ]

  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>Transaction monitoring</Eyebrow>
        <h2 className={s.title}>What exactly happened?</h2>
        <p className={s.lead}>
          A live view of transactions and their current state. Click a row to open the
          detail view.
        </p>

        <ScrollReveal>
          <DataTable
            columns={columns}
            rows={TXNS}
            getRowId={(r) => r.id}
            onRowClick={(r) => onOpen(r.id)}
            density="compact"
          />
        </ScrollReveal>
        <Callout kind="assumption" className={s.note}>
          Illustrative transaction data — fictional transaction IDs, no real customer data.
        </Callout>
      </Container>
    </section>
  )
}
