import { Container } from '@/components/ui/Container'
import { IconChip } from '@/components/ui/IconChip'
import { Icon } from '@/components/ui/Icon'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { MOMENT } from './_data'
import s from './MomentThatMatters.module.css'

export function MomentThatMatters() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <ScrollReveal className={s.grid}>
          <div className={s.card}>
            <IconChip icon="bulb" size="lg" tone="deep" />
            <h3 className={s.title}>{MOMENT.title}</h3>
            <p className={s.body}>{MOMENT.body}</p>
          </div>

          <figure className={s.quote}>
            <span className={s.quoteMark} aria-hidden="true">
              <Icon name="quote" size={28} />
            </span>
            <blockquote className={s.quoteText}>{MOMENT.quote}</blockquote>
            <figcaption className={s.quoteLabel}>{MOMENT.quoteLabel}</figcaption>
          </figure>
        </ScrollReveal>
      </Container>
    </section>
  )
}
