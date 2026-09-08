import { cn } from '@/lib/cn'
import { Container } from '@/components/ui/Container'
import { Callout } from '@/components/ui/Callout'
import { Icon } from '@/components/ui/Icon'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import {
  filterReviews,
  REVIEWS,
  REVIEW_EVIDENCE_LABEL,
  SENTIMENT_FILTERS,
  THEME_BY_ID,
  type ReviewFilterValue,
} from './_data'
import { ReviewCard } from './ReviewCard'
import s from './ReviewEvidence.module.css'

interface ReviewEvidenceProps {
  filter: ReviewFilterValue
  onFilterChange: (f: ReviewFilterValue) => void
}

export function ReviewEvidence({ filter, onFilterChange }: ReviewEvidenceProps) {
  const isTheme = filter.startsWith('theme:')
  const themeId = isTheme ? filter.slice('theme:'.length) : null
  const rows = filterReviews(REVIEWS, filter)

  return (
    <section className={s.section} id="evidence">
      <Container size="wide">
        <div className={s.head}>
          <div>
            <h2 className={s.title}>Review evidence</h2>
            <p className={s.lead}>
              Filter the observed signals by sentiment, or by reliability relevance.
            </p>
          </div>

          <div className={s.filter} role="tablist" aria-label="Filter reviews">
            {SENTIMENT_FILTERS.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                className={cn(s.filterBtn, filter === f.id && s.filterBtnActive)}
                onClick={() => onFilterChange(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {isTheme && themeId && (
          <div className={s.themeChip}>
            <Icon name="filter" size={13} />
            Filtered by theme: <strong>{THEME_BY_ID[themeId]?.name ?? themeId}</strong>
            <button className={s.clear} onClick={() => onFilterChange('all')}>
              Clear
            </button>
          </div>
        )}

        <Callout kind="observed" className={s.evidenceLabel}>
          {REVIEW_EVIDENCE_LABEL}
        </Callout>

        <ScrollReveal>
          <div className={s.grid}>
            {rows.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </ScrollReveal>

        {rows.length === 0 && (
          <p className={s.empty}>No signals match this filter.</p>
        )}
      </Container>
    </section>
  )
}
