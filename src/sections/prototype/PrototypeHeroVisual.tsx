import { Icon, type IconName } from '@/components/ui/Icon'
import { ASSETS } from './_assets'
import s from './PrototypeHeroVisual.module.css'

const NAV: { icon: IconName; label: string }[] = [
  { icon: 'grid', label: 'Overview' },
  { icon: 'alert', label: 'Incidents' },
  { icon: 'card', label: 'Transactions' },
  { icon: 'plug', label: 'Chargers' },
  { icon: 'network', label: 'Vendors' },
]

const TABS = ['Overview', 'Timeline', 'Customer Impact', 'Diagnostics']

const TIMELINE = [
  { t: '10:24', label: 'Detected', done: true },
  { t: '10:26', label: 'Assigned to Payments Ops', done: true },
  { t: '10:32', label: 'Investigating', done: true },
  { t: '10:41', label: 'Awaiting reconciliation', done: false },
  { t: '10:52', label: 'Resolved', done: false },
]

export function PrototypeHeroVisual() {
  const asset = ASSETS.heroMock
  if (asset.src) {
    return (
      <figure className={s.wrap}>
        <img className={s.photo} src={asset.src} alt={asset.alt} />
      </figure>
    )
  }

  return (
    <figure className={s.wrap} aria-hidden="true">
      <div className={s.laptop}>
        <div className={s.screen}>
          <aside className={s.sidebar}>
            <span className={s.brand}>
              <span className={s.brandMark}>M</span> MyMotor
            </span>
            {NAV.map((n, i) => (
              <span key={n.label} className={i === 1 ? s.navItemActive : s.navItem}>
                <Icon name={n.icon} size={12} />
                {n.label}
              </span>
            ))}
          </aside>

          <div className={s.main}>
            <div className={s.mainHead}>
              <div className={s.headRow}>
                <span className={s.incId}>INC-10482</span>
                <span className={s.sev}>High</span>
              </div>
              <p className={s.incTitle}>Payment status mismatch</p>
              <p className={s.incMeta}>1 customer affected · opened 18 minutes ago</p>
            </div>

            <div className={s.tabs}>
              {TABS.map((t, i) => (
                <span key={t} className={i === 0 ? s.tabActive : s.tab}>
                  {t}
                </span>
              ))}
            </div>

            <div className={s.states}>
              <span className={s.stateChip}>
                <span className={s.stateKey}>Expected</span>Payment → Success
              </span>
              <Icon name="arrow-right" size={12} className={s.stateArrow} />
              <span className={s.stateChipAlt}>
                <span className={s.stateKey}>Actual</span>Payment → Pending
              </span>
            </div>

            <ol className={s.timeline}>
              {TIMELINE.map((e) => (
                <li key={e.t} className={e.done ? s.tlDone : s.tlPending}>
                  <span className={s.tlDot} />
                  <span className={s.tlTime}>{e.t}</span>
                  <span className={s.tlLabel}>{e.label}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className={s.phone}>
        <div className={s.phoneScreen}>
          <span className={s.phoneBrand}>
            <span className={s.brandMark}>M</span> MyMotor
          </span>
          <span className={s.phoneId}>INC-10482 · High</span>
          <p className={s.phoneTitle}>Payment status mismatch</p>
          <div className={s.phoneRows}>
            <span><Icon name="check" size={11} /> Detected 10:24</span>
            <span><Icon name="check" size={11} /> Assigned 10:26</span>
            <span className={s.phoneActive}><Icon name="clock" size={11} /> Investigating 10:32</span>
          </div>
          <span className={s.phoneCta}>Take Action</span>
        </div>
      </div>

      <figcaption className={s.caption}>{asset.conceptualCaption}</figcaption>
    </figure>
  )
}
