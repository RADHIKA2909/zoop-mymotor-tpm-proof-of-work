import { Icon } from '@/components/ui/Icon'
import type { ScreenVariant } from './_data'
import s from './JourneyAppScreen.module.css'

/**
 * Conceptual, deliberately-simplified MyMotor journey screens. NOT real
 * screenshots — captioned as conceptual wherever they appear.
 */
export function JourneyAppScreen({ variant }: { variant: ScreenVariant }) {
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

      {variant === 'find' && <FindBody />}
      {variant === 'navigate' && <NavigateBody />}
      {variant === 'session' && <SessionBody />}
    </div>
  )
}

function FindBody() {
  return (
    <>
      <div className={s.searchField}>
        <Icon name="search" size={12} />
        <span>Search chargers, locations…</span>
      </div>
      <div className={s.map}>
        <span className={s.pin} style={{ top: '24%', left: '28%' }} />
        <span className={s.pin} style={{ top: '52%', left: '60%' }} />
        <span className={s.pin} style={{ top: '40%', left: '44%' }} />
        <span className={s.me} />
      </div>
      <div className={s.card}>
        <span className={s.cardTitle}>EV Charging Hub</span>
        <span className={s.cardSub}>Find. Navigate. Charge. Pay.</span>
      </div>
    </>
  )
}

function NavigateBody() {
  return (
    <>
      <div className={s.routeMap}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={s.routeLine}>
          <path d="M14 82 C 40 82, 44 40, 70 34 S 88 20, 90 16" />
        </svg>
        <span className={s.me} style={{ top: '78%', left: '12%' }} />
        <span className={s.pin} style={{ top: '12%', left: '86%' }} />
      </div>
      <div className={s.card}>
        <span className={s.cardTitle}>EV charging station</span>
        <span className={s.cardSub}>1.2 km · 4 min · CCS2 · 60 kW · 2/4 available</span>
        <span className={s.cta}>Get Directions</span>
      </div>
    </>
  )
}

function SessionBody() {
  const pct = 62
  const r = 34
  const circ = 2 * Math.PI * r
  return (
    <>
      <p className={s.sessionLabel}>Charging in progress</p>
      <div className={s.ringWrap}>
        <svg viewBox="0 0 84 84" className={s.ring}>
          <circle cx="42" cy="42" r={r} className={s.ringTrack} />
          <circle
            cx="42"
            cy="42"
            r={r}
            className={s.ringFill}
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - pct / 100)}
            transform="rotate(-90 42 42)"
          />
        </svg>
        <span className={s.ringPct}>
          {pct}%<Icon name="bolt" size={12} />
        </span>
      </div>
      <div className={s.stats}>
        <div>
          <span className={s.statValue}>28 min</span>
          <span className={s.statLabel}>Time elapsed</span>
        </div>
        <div>
          <span className={s.statValue}>18.4 kWh</span>
          <span className={s.statLabel}>Energy delivered</span>
        </div>
      </div>
      <span className={s.ctaGhost}>Stop Charging</span>
    </>
  )
}
