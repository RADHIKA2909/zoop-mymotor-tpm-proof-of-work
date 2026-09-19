import { Pill } from '@/components/ui/Pill'
import { SIM_VENDORS, VENDOR_NOTE, type VendorStatus } from './_simData'
import s from './VendorsTab.module.css'

const STATUS_TONE: Record<VendorStatus, 'success' | 'warning'> = {
  Healthy: 'success',
  Degraded: 'warning',
}

export function VendorsTab() {
  return (
    <div className={s.wrap}>
      <div className={s.grid}>
        {SIM_VENDORS.map((v) => (
          <div className={s.card} key={v.id}>
            <div className={s.head}>
              <div>
                <p className={s.name}>{v.name}</p>
                <p className={s.role}>{v.role}</p>
              </div>
              <Pill tone={STATUS_TONE[v.status]} size="sm" dot>{v.status}</Pill>
            </div>
            <dl className={s.metrics}>
              <div><dt>Success</dt><dd>{v.successRate}</dd></div>
              <div><dt>Latency</dt><dd>{v.latency}</dd></div>
              <div><dt>SLA</dt><dd>{v.sla}</dd></div>
            </dl>
          </div>
        ))}
      </div>
      <p className={s.note}>{VENDOR_NOTE}</p>
    </div>
  )
}
