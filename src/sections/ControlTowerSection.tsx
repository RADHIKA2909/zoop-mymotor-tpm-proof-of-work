import { SectionScaffold } from '@/components/layout/SectionScaffold'
import { Placeholder } from '@/components/ui'
import { SECTION_BY_ID } from '@/data/sections'

export function ControlTowerSection() {
  return (
    <SectionScaffold sectionId="control-tower">
      <Placeholder section={SECTION_BY_ID['control-tower']} />
    </SectionScaffold>
  )
}
