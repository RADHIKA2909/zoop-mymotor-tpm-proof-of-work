import { Pill } from '@/components/ui/Pill'
import type { SimState } from './_simState'
import s from './TransactionsTab.module.css'

export function TransactionsTab({ state }: { state: SimState }) {
  const { transaction } = state
  const success = transaction.internalStatus === 'success'

  return (
    <div className={s.card}>
      <div className={s.row}>
        <span className={s.key}>Transaction</span>
        <span className={s.val}>{transaction.id}</span>
      </div>
      <div className={s.row}>
        <span className={s.key}>Provider status</span>
        <Pill tone="success" size="sm" dot>Success</Pill>
      </div>
      <div className={s.row}>
        <span className={s.key}>Internal status</span>
        <Pill tone={success ? 'success' : 'pending'} size="sm" dot>
          {success ? 'Success' : 'Pending'}
        </Pill>
      </div>
      <div className={s.row}>
        <span className={s.key}>Amount</span>
        <span className={s.val}>₹{transaction.amount.toLocaleString('en-IN')}</span>
      </div>
      {!success && (
        <p className={s.note}>
          Provider and internal state disagree. See the Incidents tab to investigate and reconcile.
        </p>
      )}
    </div>
  )
}
