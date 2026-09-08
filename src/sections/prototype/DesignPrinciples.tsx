import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { DESIGN_PRINCIPLES } from './_data'
import s from './DesignPrinciples.module.css'

export function DesignPrinciples() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>Design principles</Eyebrow>
        <h2 className={s.title}>What guided the prototype</h2>

        <ScrollReveal className={s.list}>
          {DESIGN_PRINCIPLES.map((p) => (
            <div className={s.item} key={p.num}>
              <span className={s.num}>{p.num}</span>
              <div>
                <h3 className={s.itemTitle}>{p.title}</h3>
                <p className={s.itemDesc}>{p.desc}</p>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </Container>
    </section>
  )
}
