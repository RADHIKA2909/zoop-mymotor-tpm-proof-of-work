import { Icon } from '@/components/ui/Icon'
import { ASSETS } from './_assets'
import s from './JourneyHeroVisual.module.css'

/**
 * Conceptual "charging scene": a ZOOP charging pillar + an EV silhouette + a
 * route arc, on a soft panel. Swap to a real photo via `ASSETS.heroScene.src`.
 */
export function JourneyHeroVisual() {
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
        <svg
          className={s.route}
          viewBox="0 0 220 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M4 52 C 60 52, 70 14, 130 14 S 200 8, 216 8" />
        </svg>

        <div className={s.pillar} aria-hidden="true">
          <span className={s.pillarHead}>
            <Icon name="bolt" size={22} />
          </span>
          <span className={s.pillarBrand}>ZOOP</span>
          <span className={s.pillarBar} />
        </div>

        <div className={s.car} aria-hidden="true">
          <span className={s.carBody} />
          <span className={s.carCabin} />
          <span className={s.wheelFront} />
          <span className={s.wheelRear} />
          <span className={s.plug} />
        </div>
      </div>
    </figure>
  )
}
