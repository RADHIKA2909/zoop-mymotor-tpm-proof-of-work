import { Icon, type IconName } from '@/components/ui/Icon'
import s from './ConceptualAppScreen.module.css'

/**
 * A stylised, deliberately-simplified MyMotor screen. NOT a real screenshot —
 * it is a conceptual mockup used only to give the ecosystem story a face.
 * Swap for a real screenshot via `_assets.ts` when one is available.
 */
type Variant = 'charging-hub' | 'home'

const QUICK_ACTIONS: { icon: IconName; label: string }[] = [
  { icon: 'file', label: 'Challan' },
  { icon: 'car', label: 'RC details' },
  { icon: 'plug', label: 'EV chargers' },
  { icon: 'shield', label: 'Insurance' },
  { icon: 'leaf', label: 'Pollution' },
  { icon: 'layers', label: 'More' },
]

export function ConceptualAppScreen({ variant }: { variant: Variant }) {
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

      <div className={s.searchField}>
        <Icon name="search" size={13} />
        <span>Search chargers, locations…</span>
      </div>

      {variant === 'charging-hub' && (
        <div className={s.map}>
          <span className={s.pin} style={{ top: '22%', left: '30%' }} />
          <span className={s.pin} style={{ top: '54%', left: '62%' }} />
          <span className={s.pin} style={{ top: '38%', left: '48%' }} />
          <span className={s.me} />
          <div className={s.mapCard}>
            <span className={s.mapCardTitle}>EV Charging Hub</span>
            <span className={s.mapCardSub}>Find. Navigate. Charge. Pay.</span>
          </div>
        </div>
      )}

      <div className={s.grid}>
        {QUICK_ACTIONS.map((a) => (
          <div className={s.action} key={a.label}>
            <span className={s.actionIcon}>
              <Icon name={a.icon} size={15} />
            </span>
            <span className={s.actionLabel}>{a.label}</span>
          </div>
        ))}
      </div>

      {variant === 'home' && (
        <div className={s.homeCard}>
          <span className={s.homeCardTitle}>Drive cleaner</span>
          <span className={s.homeCardSub}>for a greener tomorrow</span>
          <span className={s.homeLeaf}>
            <Icon name="leaf" size={16} />
          </span>
        </div>
      )}
    </div>
  )
}
