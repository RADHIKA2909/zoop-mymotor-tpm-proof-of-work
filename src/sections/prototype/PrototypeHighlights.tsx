import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { HIGHLIGHTS } from './_data'
import s from './PrototypeHighlights.module.css'

export function PrototypeHighlights() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>Prototype highlights</Eyebrow>
        <h2 className={s.title}>What the prototype demonstrates</h2>

        <ScrollReveal className={s.grid}>
          {HIGHLIGHTS.map((h) => (
            <div className={s.card} key={h.title}>
              <span className={s.icon} aria-hidden="true">
                <Icon name={h.icon} size={18} />
              </span>
              <h3 className={s.cardTitle}>{h.title}</h3>
              <p className={s.cardDesc}>{h.desc}</p>
            </div>
          ))}
        </ScrollReveal>
      </Container>
    </section>
  )
}
