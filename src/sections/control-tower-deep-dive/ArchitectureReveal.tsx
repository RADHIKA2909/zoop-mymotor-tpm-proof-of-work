import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { Pill } from '@/components/ui/Pill'
import { DisclosureRow } from '@/components/ui/DisclosureRow'
import { NodeFlow } from '@/components/diagrams/NodeFlow'
import { ARCH_LABEL, ARCH_NODES, ARCH_NOTE } from './_data'
import s from './ArchitectureReveal.module.css'

/** True when the page was reached via a `#architecture` deep link (e.g. from
 * the prototype's "See the illustrative architecture…" link) — used to open
 * the disclosure and scroll to it on load, instead of leaving it collapsed. */
function linkedToArchitecture() {
  return typeof window !== 'undefined' && window.location.hash === '#architecture'
}

export function ArchitectureReveal() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (linkedToArchitecture()) ref.current?.scrollIntoView({ block: 'start' })
  }, [])

  return (
    <section className={s.section} id="architecture" ref={ref}>
      <Container size="wide">
        <DisclosureRow
          summary="View architecture"
          defaultOpen={linkedToArchitecture()}
          meta={
            <Pill tone="assumption" variant="outline" size="sm" caps>
              {ARCH_LABEL}
            </Pill>
          }
        >
          <div className={s.diagram}>
            <NodeFlow nodes={ARCH_NODES} direction="column" connector="line" />
          </div>
          <p className={s.note}>{ARCH_NOTE}</p>
        </DisclosureRow>
      </Container>
    </section>
  )
}
