import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { PATHS, TWO_PATHS_HEADER } from './_data'
import { PathCard } from './PathCard'
import s from './TwoPaths.module.css'

export function TwoPaths() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <SectionHeader
          eyebrow={TWO_PATHS_HEADER.eyebrow}
          title={TWO_PATHS_HEADER.title}
          align="split"
          lead={<p>{TWO_PATHS_HEADER.lead}</p>}
        />

        <div className={s.grid}>
          {PATHS.map((path, i) => (
            <ScrollReveal key={path.id} delay={i * 80}>
              <PathCard data={path} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
