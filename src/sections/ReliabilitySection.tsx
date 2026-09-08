import { SectionScaffold } from '@/components/layout/SectionScaffold'
import { Placeholder } from '@/components/ui'
import { SECTION_BY_ID } from '@/data/sections'

export function ReliabilitySection() {
  return (
    <SectionScaffold sectionId="reliability">
      <Placeholder section={SECTION_BY_ID.reliability} />
    </SectionScaffold>
  )
}
