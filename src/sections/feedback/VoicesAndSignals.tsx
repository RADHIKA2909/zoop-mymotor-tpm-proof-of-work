import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { Callout } from '@/components/ui/Callout'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import {
  KEYWORDS,
  KEYWORDS_LABEL,
  REVIEWS,
  THEME_BY_ID,
  VOICES_HEADER,
  VOICE_IDS,
} from './_data'
import s from './VoicesAndSignals.module.css'

const SENTIMENT_TONE = { positive: 'success', negative: 'error', mixed: 'warning' } as const

export function VoicesAndSignals() {
  const voices = VOICE_IDS.map((id) => REVIEWS.find((r) => r.id === id)).filter(
    (r): r is (typeof REVIEWS)[number] => Boolean(r),
  )

  return (
    <section className={s.section}>
      <Container size="wide">
        <div className={s.grid}>
          <div className={s.voicesCol}>
            <Eyebrow>{VOICES_HEADER.eyebrow}</Eyebrow>
            <h2 className={s.title}>{VOICES_HEADER.title}</h2>
            <p className={s.lead}>{VOICES_HEADER.lead}</p>

            <div className={s.voices}>
              {voices.map((v, i) => (
                <ScrollReveal key={v.id} delay={i * 60}>
                  <figure className={s.voice}>
                    <Icon name="quote" size={20} className={s.quoteMark} />
                    <blockquote className={s.voiceText}>{v.summary}</blockquote>
                    <figcaption className={s.voiceMeta}>
                      <Pill tone={SENTIMENT_TONE[v.sentiment]} size="sm" dot>
                        {THEME_BY_ID[v.themeId]?.name ?? v.themeId}
                      </Pill>
                      <span>Public app-store review · paraphrased</span>
                    </figcaption>
                  </figure>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <aside className={s.signalsCol}>
            <Eyebrow>Recurring signals</Eyebrow>
            <h2 className={s.title}>What keeps coming up</h2>
            <div className={s.chips}>
              {KEYWORDS.map((k) => (
                <span key={k} className={s.chip}>
                  {k}
                </span>
              ))}
            </div>
            <Callout kind="note" className={s.chipsNote}>
              {KEYWORDS_LABEL}
            </Callout>
          </aside>
        </div>
      </Container>
    </section>
  )
}
