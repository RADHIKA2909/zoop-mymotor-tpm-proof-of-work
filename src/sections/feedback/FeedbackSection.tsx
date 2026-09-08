import { useState } from 'react'
import { FeedbackHero } from './FeedbackHero'
import { ReviewOverview } from './ReviewOverview'
import { ThemesGrid } from './ThemesGrid'
import { ReviewEvidence } from './ReviewEvidence'
import { VoicesAndSignals } from './VoicesAndSignals'
import { WorksVsBreaks } from './WorksVsBreaks'
import { KeyInsights } from './KeyInsights'
import { ProblemFlow } from './ProblemFlow'
import { PrioritizationMatrix } from './PrioritizationMatrix'
import { FeedbackTpmLens } from './FeedbackTpmLens'
import { FeedbackTransition } from './FeedbackTransition'
import type { ReviewFilterValue } from './_data'

/**
 * Section 3 — Customer Feedback Analysis.
 *
 * Public review evidence -> recurring themes -> reliability signals -> prioritized
 * problems, so the visitor understands why reliability is the focus of Section 4.
 *
 * Credibility rules (see _data.ts / CLAUDE.md §21): no fabricated statistics;
 * review evidence is paraphrased and labelled, not verbatim; the only number in
 * the section is MyMotor's own publicly-stated rating, attributed. Nothing here
 * claims ZOOP's internal architecture / vendors / SLAs / workflow.
 */
export function FeedbackSection() {
  const [reviewFilter, setReviewFilter] = useState<ReviewFilterValue>('all')

  const viewThemeEvidence = (themeId: string) => {
    setReviewFilter(`theme:${themeId}`)
    requestAnimationFrame(() => {
      document
        .getElementById('evidence')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <article>
      <FeedbackHero />
      <ReviewOverview />
      <ThemesGrid onViewEvidence={viewThemeEvidence} />
      <ReviewEvidence filter={reviewFilter} onFilterChange={setReviewFilter} />
      <VoicesAndSignals />
      <WorksVsBreaks />
      <KeyInsights />
      <ProblemFlow />
      <PrioritizationMatrix />
      <FeedbackTpmLens />
      <FeedbackTransition />
    </article>
  )
}
