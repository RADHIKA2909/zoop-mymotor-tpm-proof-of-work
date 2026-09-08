import { cn } from '@/lib/cn'
import { Pill } from '@/components/ui/Pill'
import { Icon } from '@/components/ui/Icon'
import { THEME_BY_ID, type ReviewSignal } from './_data'
import s from './ReviewCard.module.css'

const SENTIMENT_TONE = {
  positive: 'success',
  negative: 'error',
  mixed: 'warning',
} as const

const SENTIMENT_LABEL = {
  positive: 'Positive',
  negative: 'Pain point',
  mixed: 'Mixed',
} as const

export function ReviewCard({ review }: { review: ReviewSignal }) {
  const theme = THEME_BY_ID[review.themeId]

  return (
    <article className={cn(s.card, review.reliability && s.reliability)}>
      <div className={s.top}>
        <span className={s.stars} aria-label={`Sentiment read: ${review.rating} of 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Icon
              key={i}
              name="star"
              size={13}
              className={cn(s.star, i < review.rating && s.starOn)}
            />
          ))}
        </span>
        <Pill tone={SENTIMENT_TONE[review.sentiment]} size="sm" dot>
          {SENTIMENT_LABEL[review.sentiment]}
        </Pill>
      </div>

      <p className={s.summary}>{review.summary}</p>

      <div className={s.meta}>
        <span className={s.source}>Public app-store review</span>
        <span className={s.theme}>{theme?.name ?? review.themeId}</span>
      </div>

      {review.reliability && (
        <span className={s.flag}>
          <Icon name="activity" size={12} />
          Reliability signal
        </span>
      )}
    </article>
  )
}
