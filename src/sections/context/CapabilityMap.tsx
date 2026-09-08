import { useState } from 'react'
import { cn } from '@/lib/cn'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Callout } from '@/components/ui/Callout'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { PhoneFrame } from '@/components/diagrams/PhoneFrame'
import {
  CAPABILITIES,
  CAPABILITIES_HEADER,
  CAPABILITIES_SOURCE,
  type CapabilityCard,
} from './_data'
import { ConceptualAppScreen } from './ConceptualAppScreen'
import s from './CapabilityMap.module.css'

/** Connector geometry in the 0-100 x 0-60 viewBox (preserveAspectRatio none). */
const CONNECTORS: Record<string, string> = {
  vehicle: 'M50 30 C 34 30, 30 14, 16 14',
  charging: 'M50 30 C 34 30, 30 46, 16 46',
  mobility: 'M50 30 C 66 30, 70 14, 84 14',
  transactions: 'M50 30 C 66 30, 70 46, 84 46',
}

function Node({
  card,
  hovered,
  onHover,
}: {
  card: CapabilityCard
  hovered: string | null
  onHover: (id: string | null) => void
}) {
  return (
    <div
      className={cn(s.node, hovered === card.id && s.nodeActive)}
      onMouseEnter={() => onHover(card.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(card.id)}
      onBlur={() => onHover(null)}
      tabIndex={0}
    >
      <span className={s.nodeIcon} aria-hidden="true">
        <Icon name={card.icon} size={18} />
      </span>
      <div>
        <p className={s.nodeTitle}>{card.title}</p>
        <p className={s.nodeSummary}>{card.summary}</p>
        <p className={s.nodeDetail}>{card.detail}</p>
      </div>
    </div>
  )
}

export function CapabilityMap() {
  const [hovered, setHovered] = useState<string | null>(null)
  const left = CAPABILITIES.filter((c) => c.side === 'left')
  const right = CAPABILITIES.filter((c) => c.side === 'right')

  return (
    <section className={s.section} id="capabilities">
      <Container size="wide">
        <SectionHeader
          eyebrow={CAPABILITIES_HEADER.eyebrow}
          title={CAPABILITIES_HEADER.title}
          align="center"
          lead={<p>{CAPABILITIES_HEADER.lead}</p>}
        />

        <ScrollReveal>
          <div className={s.map}>
            <svg
              className={s.wires}
              viewBox="0 0 100 60"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {CAPABILITIES.map((c) => (
                <path
                  key={c.id}
                  d={CONNECTORS[c.id]}
                  className={cn(s.wire, hovered === c.id && s.wireActive)}
                />
              ))}
            </svg>

            <div className={s.col}>
              {left.map((c) => (
                <Node key={c.id} card={c} hovered={hovered} onHover={setHovered} />
              ))}
            </div>

            <div className={s.center}>
              <PhoneFrame size="md" caption="Conceptual app mockup">
                <ConceptualAppScreen variant="home" />
              </PhoneFrame>
              <p className={s.centerLabel}>Your EV companion on every journey</p>
            </div>

            <div className={s.col}>
              {right.map((c) => (
                <Node key={c.id} card={c} hovered={hovered} onHover={setHovered} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        <Callout kind="source" className={s.source}>
          {CAPABILITIES_SOURCE}
        </Callout>
      </Container>
    </section>
  )
}
