import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import type { JourneyStage as Stage } from './_data'
import s from './JourneyStage.module.css'

interface JourneyStageProps {
  stage: Stage
  mode: 'happy' | 'breakpoints'
}

export function JourneyStage({ stage, mode }: JourneyStageProps) {
  const showBreak = mode === 'breakpoints'

  return (
    <div className={s.stage} tabIndex={0}>
      <div className={s.node}>
        <span className={s.num}>{stage.num}</span>
        <span className={s.icon} aria-hidden="true">
          <Icon name={stage.icon} size={18} />
        </span>
      </div>

      <p className={s.title}>{stage.title}</p>
      <p className={s.desc}>{stage.desc}</p>

      {showBreak && (
        <p className={cn(s.breakpoint, s[`tone-${stage.breakpoint.tone}`])}>
          <span className={s.breakDot} aria-hidden="true" />
          <span>
            <span className={s.breakKicker}>Potential issue</span>
            {stage.breakpoint.label}
          </span>
        </p>
      )}

      <div className={s.tooltip} role="note">
        <p className={s.tipRow}>
          <span className={s.tipLabel}>Customer goal</span>
          {stage.goal}
        </p>
        <p className={s.tipRow}>
          <span className={s.tipLabel}>Potential uncertainty</span>
          {stage.uncertainty}
        </p>
      </div>
    </div>
  )
}
