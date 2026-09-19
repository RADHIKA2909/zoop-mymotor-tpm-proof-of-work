import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { DiagramFrame } from '@/components/ui/DiagramFrame'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { NodeFlow } from '@/components/diagrams/NodeFlow'
import { FLOW_DISCLAIMER, FLOW_HEADER, FLOW_NODES } from './_data'
import s from './TransactionFlow.module.css'

export function TransactionFlow() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>{FLOW_HEADER.eyebrow}</Eyebrow>
        <h2 className={s.title}>{FLOW_HEADER.title}</h2>
        <p className={s.lead}>{FLOW_HEADER.lead}</p>

        <ScrollReveal>
          <DiagramFrame disclaimer={FLOW_DISCLAIMER} className={s.frame}>
            <NodeFlow nodes={FLOW_NODES} />
          </DiagramFrame>
        </ScrollReveal>
      </Container>
    </section>
  )
}
