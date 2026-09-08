import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import s from './NotFoundSection.module.css'

export function NotFoundSection() {
  return (
    <Container>
      <div className={s.wrap}>
        <Eyebrow>404</Eyebrow>
        <h1 className={s.title}>That page isn't part of the walkthrough.</h1>
        <p className={s.text}>
          The case study has six sections plus an overview. Head back to the start.
        </p>
        <Button to="/" iconRight="arrow-right">
          Back to overview
        </Button>
      </div>
    </Container>
  )
}
