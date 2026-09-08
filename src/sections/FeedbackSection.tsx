import { SectionScaffold } from '@/components/layout/SectionScaffold'
import { Placeholder } from '@/components/ui'
import { SECTION_BY_ID } from '@/data/sections'

export function FeedbackSection() {
  return (
    <SectionScaffold sectionId="feedback">
      <Placeholder section={SECTION_BY_ID.feedback} />
    </SectionScaffold>
  )
}
