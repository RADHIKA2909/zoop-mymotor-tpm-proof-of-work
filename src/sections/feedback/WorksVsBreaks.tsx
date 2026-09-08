import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { POS_PAIN } from './_data'
import s from './WorksVsBreaks.module.css'

export function WorksVsBreaks() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <h2 className={s.title}>{POS_PAIN.title}</h2>

        <div className={s.grid}>
          <ScrollReveal className={s.col}>
            <div className={s.panel} data-tone="works">
              <span className={s.panelLabel}>When it works</span>
              <ul className={s.list}>
                {POS_PAIN.works.map((item) => (
                  <li key={item} className={s.item}>
                    <span className={s.markWorks} aria-hidden="true">
                      <Icon name="check" size={12} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal className={s.col} delay={80}>
            <div className={s.panel} data-tone="breaks">
              <span className={s.panelLabel}>When it breaks</span>
              <ul className={s.list}>
                {POS_PAIN.breaks.map((item) => (
                  <li key={item} className={s.item}>
                    <span className={s.markBreaks} aria-hidden="true">
                      <Icon name="alert" size={12} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <p className={s.insight}>{POS_PAIN.insight}</p>
      </Container>
    </section>
  )
}
