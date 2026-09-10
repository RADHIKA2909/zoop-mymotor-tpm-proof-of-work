import { useState } from 'react'
import { ControlTowerHero } from './ControlTowerHero'
import { ControlTowerJob } from './ControlTowerJob'
import { Dashboard } from './Dashboard'
import { TransactionMonitoring } from './TransactionMonitoring'
import { ExceptionQueue } from './ExceptionQueue'
import { DiagnosisSection } from './DiagnosisSection'
import { VendorHealth } from './VendorHealth'
import { Architecture } from './Architecture'
import { ControlTowerMetrics } from './ControlTowerMetrics'
import { ControlTowerTakeaways } from './ControlTowerTakeaways'
import { ControlTowerTransition } from './ControlTowerTransition'
import { DetailDrawer, type DetailEntity } from './DetailDrawer'
import {
  CATEGORY_FILTERS,
  TIME_WINDOWS,
  type Category,
  type TimeWindow,
} from './_data'

/**
 * Section 5 — Reliability Control Tower.
 *
 * Takes Section 4's reliability failure points and designs a PROPOSED operational
 * control tower: how a TPM would give ops / product / support / partner teams the
 * visibility to detect -> understand -> act -> learn on reliability issues in a
 * transaction-heavy B2C EV ecosystem.
 *
 * ⚠️ Illustrative operational data — NOT internal ZOOP data. Realistic placeholder
 * values are used ONLY to make the proposed interface legible; every data view
 * carries a visible "not internal ZOOP data" label. Transaction / incident IDs,
 * provider names, owners and timestamps are fictional. The control tower, its
 * architecture, severity model, escalation logic, metrics and vendor framework
 * are all a proposed concept — not an existing ZOOP system.
 */
export function ControlTowerSection() {
  const [category, setCategory] = useState<Category>(CATEGORY_FILTERS[0])
  const [timeWindow, setTimeWindow] = useState<TimeWindow>(TIME_WINDOWS[1])
  const [detail, setDetail] = useState<DetailEntity | null>(null)

  return (
    <article>
      <ControlTowerHero />
      <ControlTowerJob />
      <Dashboard
        category={category}
        onCategory={setCategory}
        window={timeWindow}
        onWindow={setTimeWindow}
      />
      <TransactionMonitoring
        onOpen={(id) => setDetail({ kind: 'transaction', id })}
      />
      <ExceptionQueue onOpen={(id) => setDetail({ kind: 'incident', id })} />
      <DiagnosisSection />
      <VendorHealth onOpen={(id) => setDetail({ kind: 'vendor', id })} />
      <Architecture />
      <ControlTowerMetrics />
      <ControlTowerTakeaways />
      <ControlTowerTransition />

      <DetailDrawer entity={detail} onClose={() => setDetail(null)} />
    </article>
  )
}
