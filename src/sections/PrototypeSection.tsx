import { SectionScaffold } from '@/components/layout/SectionScaffold'
import { Placeholder } from '@/components/ui'
import { SECTION_BY_ID } from '@/data/sections'

export function PrototypeSection() {
  return (
    <SectionScaffold sectionId="prototype">
      <Placeholder section={SECTION_BY_ID.prototype} />
    </SectionScaffold>
  )
}
