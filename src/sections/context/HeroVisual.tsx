import { Icon } from '@/components/ui/Icon'
import { PhoneFrame } from '@/components/diagrams/PhoneFrame'
import { ASSETS } from './_assets'
import { ConceptualAppScreen } from './ConceptualAppScreen'
import s from './HeroVisual.module.css'

/**
 * Right side of the hero. Conceptual by default (green panel + a charger form +
 * a MyMotor "EV Charging Hub" mockup). Swap to a real photo by setting
 * `ASSETS.hero.src` in `_assets.ts`.
 */
export function HeroVisual() {
  const asset = ASSETS.hero

  if (asset.src) {
    return (
      <div className={s.wrap}>
        <img className={s.photo} src={asset.src} alt={asset.alt} />
      </div>
    )
  }

  return (
    <div className={s.wrap}>
      <div className={s.panel}>
        <div className={s.charger} aria-hidden="true">
          <span className={s.chargerHead}>
            <Icon name="bolt" size={20} />
          </span>
          <span className={s.chargerBrand}>ZOOP</span>
          <span className={s.chargerCable} />
        </div>

        <div className={s.phone}>
          <PhoneFrame caption={asset.conceptualCaption} size="md">
            <ConceptualAppScreen variant="charging-hub" />
          </PhoneFrame>
        </div>
      </div>
    </div>
  )
}
