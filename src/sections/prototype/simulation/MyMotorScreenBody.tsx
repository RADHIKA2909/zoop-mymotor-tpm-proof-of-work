import { Icon } from '@/components/ui/Icon'
import { PAYMENT_PENDING_COPY, PAYMENT_SUCCESS_COPY, type MyMotorScreen } from './_simData'
import type { SimState } from './_simState'
import s from './MyMotorScreenBody.module.css'

/**
 * Conceptual, deliberately-simplified MyMotor screens for the simulation's
 * mini prototype — NOT real screenshots. Every value shown reads from the
 * shared simulation state, so a Control Tower action (pricing, reconciliation)
 * is reflected here immediately.
 */
export function MyMotorScreenBody({ screen, state }: { screen: MyMotorScreen; state: SimState }) {
  const pending = state.transaction.internalStatus === 'pending'

  return (
    <div className={s.screen} aria-hidden="true">
      <div className={s.statusbar}>
        <span>9:41</span>
        <span className={s.signal} />
      </div>
      <div className={s.appbar}>
        <span className={s.mark}>M</span>
        <span className={s.wordmark}>MyMotor</span>
      </div>

      {screen === 'home' && <HomeBody />}
      {screen === 'charger' && <ChargerBody price={state.pricing.providerA} />}
      {screen === 'wallet' && <WalletBody pending={pending} balance={state.wallet.balance} />}
      {screen === 'transaction' && <TransactionBody state={state} />}
    </div>
  )
}

function HomeBody() {
  return (
    <>
      <div className={s.searchField}>
        <Icon name="search" size={12} />
        <span>Find chargers, locations…</span>
      </div>
      <div className={s.map}>
        <span className={s.pin} style={{ top: '24%', left: '28%' }} />
        <span className={s.pin} style={{ top: '52%', left: '60%' }} />
        <span className={s.me} />
      </div>
      <div className={s.card}>
        <span className={s.cardTitle}>EV Charging Hub</span>
        <span className={s.cardSub}>Find. Navigate. Charge. Pay.</span>
      </div>
    </>
  )
}

function ChargerBody({ price }: { price: number }) {
  return (
    <>
      <div className={s.card}>
        <span className={s.cardTitle}>EV charging station</span>
        <span className={s.cardSub}>1.2 km · CCS2 · 60 kW · 2/4 available</span>
      </div>
      <div className={s.priceCard}>
        <span className={s.priceLabel}>Provider A</span>
        <span className={s.priceValue}>₹{price} / kWh</span>
      </div>
      <span className={s.cta}>Start Charging</span>
    </>
  )
}

function WalletBody({ pending, balance }: { pending: boolean; balance: number }) {
  return (
    <>
      <p className={s.walletLabel}>Wallet balance</p>
      <p className={s.walletValue}>₹{balance.toLocaleString('en-IN')}</p>

      {pending ? (
        <div className={s.pendingCard}>
          <span className={s.pendingTitle}>{PAYMENT_PENDING_COPY.title}</span>
          <p className={s.pendingBody}>{PAYMENT_PENDING_COPY.body}</p>
        </div>
      ) : (
        <div className={s.successCard}>
          <Icon name="check" size={14} />
          <span>{PAYMENT_SUCCESS_COPY}</span>
        </div>
      )}

      {pending ? (
        <span className={s.ctaDisabled}>Charging unavailable until payment is confirmed</span>
      ) : (
        <span className={s.cta}>Start Charging</span>
      )}
    </>
  )
}

function TransactionBody({ state }: { state: SimState }) {
  const success = state.transaction.internalStatus === 'success'
  return (
    <>
      <p className={s.sessionLabel}>Transaction status</p>
      <div className={s.card}>
        <span className={s.cardTitle}>{state.transaction.id}</span>
        <span className={s.cardSub}>₹{state.transaction.amount.toLocaleString('en-IN')}</span>
      </div>
      <div className={s.stats}>
        <div>
          <span className={s.statValue}>Success</span>
          <span className={s.statLabel}>Provider status</span>
        </div>
        <div>
          <span className={s.statValue} data-pending={!success}>
            {success ? 'Success' : 'Pending'}
          </span>
          <span className={s.statLabel}>Internal status</span>
        </div>
      </div>
      {!success && <p className={s.pendingNote}>Still being verified with the payment provider.</p>}
    </>
  )
}
