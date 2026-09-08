import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { CENTRAL_QUOTE, WHAT_THIS_SHOWS } from './_data'
import s from './WhatThisShows.module.css'

export function WhatThisShows() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>{WHAT_THIS_SHOWS.eyebrow}</Eyebrow>
        <h2 className={s.title}>{WHAT_THIS_SHOWS.title}</h2>
        <p className={s.lead}>{WHAT_THIS_SHOWS.supporting}</p>

        <ScrollReveal className={s.grid}>
          {WHAT_THIS_SHOWS.takeaways.map((t) => (
            <div className={s.card} key={t.title}>
              <span className={s.icon} aria-hidden="true">
                <Icon name={t.icon} size={18} />
              </span>
              <h3 className={s.cardTitle}>{t.title}</h3>
              <p className={s.cardDesc}>{t.desc}</p>
            </div>
          ))}
        </ScrollReveal>

        <blockquote className={s.quote}>
          <Icon name="quote" size={28} className={s.quoteMark} aria-hidden="true" />
          <p className={s.quoteText}>
            {CENTRAL_QUOTE.quote.map((line) => (
              <span key={line}>{line} </span>
            ))}
          </p>
          <p className={s.quoteSub}>{CENTRAL_QUOTE.sub}</p>
          <Pill tone="proposed" variant="outline" caps size="sm">
            {CENTRAL_QUOTE.label}
          </Pill>
        </blockquote>
      </Container>
    </section>
  )
}
