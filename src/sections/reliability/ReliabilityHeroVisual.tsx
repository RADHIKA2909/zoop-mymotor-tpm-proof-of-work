import { Icon, type IconName } from '@/components/ui/Icon'
import { ASSETS } from './_assets'
import s from './ReliabilityHeroVisual.module.css'

const FEATURES: { icon: IconName; label: string }[] = [
  { icon: 'plug', label: 'Find chargers' },
  { icon: 'car', label: 'Track your vehicle' },
  { icon: 'wallet', label: 'Pay & manage' },
  { icon: 'layers', label: 'All in one app' },
]

/** Conceptual EV-charging composition. Not a real screenshot. */
export function ReliabilityHeroVisual() {
  const asset = ASSETS.heroScene

  if (asset.src) {
    return (
      <figure className={s.wrap}>
        <img className={s.photo} src={asset.src} alt={asset.alt} />
      </figure>
    )
  }

  return (
    <figure className={s.wrap}>
      <div className={s.panel}>
        <div className={s.pillar} aria-hidden="true">
          <span className={s.pillarHead}>
            <Icon name="bolt" size={18} />
          </span>
          <span className={s.pillarBrand}>MyMotor</span>
        </div>

        <div className={s.phone} aria-hidden="true">
          <span className={s.mark}>M</span>
          <span className={s.name}>MyMotor</span>
          <span className={s.tagline}>Drive today. A cleaner tomorrow.</span>
          <ul className={s.features}>
            {FEATURES.map((f) => (
              <li key={f.label}>
                <span className={s.featureIcon}>
                  <Icon name={f.icon} size={12} />
                </span>
                {f.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  )
}
