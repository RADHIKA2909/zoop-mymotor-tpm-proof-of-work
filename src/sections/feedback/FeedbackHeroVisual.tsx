import { Icon } from '@/components/ui/Icon'
import { ASSETS } from './_assets'
import { HERO } from './_data'
import s from './FeedbackHeroVisual.module.css'

/**
 * Conceptual composition: a simplified MyMotor card + store markers + MyMotor's
 * publicly-stated rating (attributed). NOT a real screenshot.
 */
export function FeedbackHeroVisual() {
  const asset = ASSETS.heroPhone

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
        <div className={s.phone} aria-hidden="true">
          <span className={s.mark}>M</span>
          <span className={s.name}>MyMotor</span>
          <span className={s.tagline}>Your EV companion on every journey</span>

          <div className={s.rating}>
            <span className={s.ratingValue}>
              <Icon name="star" size={16} /> {HERO.statedRating.value.replace(' ★', '')}
            </span>
            <span className={s.ratingCount}>{HERO.statedRating.count}</span>
          </div>

          <div className={s.stores}>
            <span className={s.store}>Google Play</span>
            <span className={s.store}>App Store</span>
          </div>
        </div>
      </div>
      <figcaption className={s.caption}>{HERO.statedRating.label}</figcaption>
    </figure>
  )
}
