import { KpiCard } from '@/components/ui/KpiCard'
import { StatGrid } from '@/components/ui/StatGrid'
import { OVERVIEW_KPIS } from './_simData'
import s from './OverviewTab.module.css'

export function OverviewTab() {
  return (
    <div className={s.wrap}>
      <StatGrid minColumn={160}>
        {OVERVIEW_KPIS.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} sublabel={k.sublabel} tone="info" />
        ))}
      </StatGrid>
    </div>
  )
}
