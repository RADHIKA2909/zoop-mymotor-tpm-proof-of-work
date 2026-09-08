import { SectionScaffold } from '@/components/layout/SectionScaffold'
import { Placeholder } from '@/components/ui'
import { SECTION_BY_ID } from '@/data/sections'

export function JourneySection() {
  return (
    <SectionScaffold sectionId="journey">
      <Placeholder section={SECTION_BY_ID.journey} />
    </SectionScaffold>
  )
}
