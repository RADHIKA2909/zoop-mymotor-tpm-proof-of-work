import { Icon, type IconName } from '@/components/ui/Icon'
import { Sparkline, Donut } from '@/components/charts/Charts'
import { ASSETS } from './_assets'
import s from './ControlTowerHeroVisual.module.css'

const NAV: { icon: IconName; label: string }[] = [
  { icon: 'grid', label: 'Overview' },
  { icon: 'alert', label: 'Incidents' },
  { icon: 'card', label: 'Transactions' },
  { icon: 'plug', label: 'Chargers' },
  { icon: 'users', label: 'Users' },
  { icon: 'network', label: 'Vendors' },
]

const TILES = [
  { label: 'Active incidents', value: '7', tone: 'error' },
  { label: 'Mean time to resolve', value: '2h 14m', tone: 'default' },
  { label: 'Customers impacted', value: '86', tone: 'info' },
  { label: 'Success rate', value: '96.8%', tone: 'success' },
]

export function ControlTowerHeroVisual() {
  const asset = ASSETS.heroDashboard
  if (asset.src) {
    return (
      <figure className={s.wrap}>
        <img className={s.photo} src={asset.src} alt={asset.alt} />
      </figure>
    )
  }

  return (
    <figure className={s.wrap} aria-hidden="true">
      <div className={s.laptop} data-theme="dark">
        <div className={s.screen}>
          <aside className={s.sidebar}>
            <span className={s.brand}>
              <span className={s.brandMark}>M</span> MyMotor
            </span>
            {NAV.map((n, i) => (
              <span key={n.label} className={i === 0 ? s.navItemActive : s.navItem}>
                <Icon name={n.icon} size={13} />
                {n.label}
              </span>
            ))}
          </aside>

          <div className={s.main}>
            <div className={s.mainHead}>
              <div>
                <p className={s.mainTitle}>Reliability Control Tower</p>
                <p className={s.mainSub}>Monitor. Resolve. Improve.</p>
              </div>
              <span className={s.windowChip}>Last 24 hours</span>
            </div>

            <div className={s.tiles}>
              {TILES.map((t) => (
                <div key={t.label} className={s.tile} data-tone={t.tone}>
                  <span className={s.tileLabel}>{t.label}</span>
                  <span className={s.tileValue}>{t.value}</span>
                </div>
              ))}
            </div>

            <div className={s.charts}>
              <div className={s.chartCard}>
                <span className={s.chartTitle}>Issues trend</span>
                <Sparkline data={[6, 5, 7, 6, 8, 7, 9, 8, 7, 9]} height={44} color="var(--status-error)" />
              </div>
              <div className={s.chartCard}>
                <span className={s.chartTitle}>By category</span>
                <Donut
                  size={92}
                  thickness={12}
                  centerValue="401"
                  centerLabel="exceptions"
                  segments={[
                    { label: 'Payment', value: 157, color: 'var(--viz-4)' },
                    { label: 'Charger', value: 112, color: 'var(--viz-1)' },
                    { label: 'App & data', value: 68, color: 'var(--viz-3)' },
                    { label: 'Other', value: 64, color: 'var(--viz-5)' },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className={s.caption}>{asset.conceptualCaption}</figcaption>
    </figure>
  )
}
