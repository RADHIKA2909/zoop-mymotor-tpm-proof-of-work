import { useState } from 'react'
import { cn } from '@/lib/cn'
import { PhoneFrame } from '@/components/diagrams/PhoneFrame'
import { MYMOTOR_SCREENS, type MyMotorScreen } from './_simData'
import type { SimState } from './_simState'
import { MyMotorScreenBody } from './MyMotorScreenBody'
import s from './MyMotorPanel.module.css'

export function MyMotorPanel({ state }: { state: SimState }) {
  const [screen, setScreen] = useState<MyMotorScreen>('home')

  return (
    <div className={s.wrap}>
      <div className={s.tabs} role="tablist" aria-label="MyMotor screen">
        {MYMOTOR_SCREENS.map((sc) => (
          <button
            key={sc.id}
            role="tab"
            aria-selected={screen === sc.id}
            className={cn(s.tab, screen === sc.id && s.tabActive)}
            onClick={() => setScreen(sc.id)}
          >
            {sc.label}
          </button>
        ))}
      </div>

      <div className={s.phoneWrap}>
        <PhoneFrame size="md" caption="Conceptual MyMotor mini prototype — reads the shared simulation state">
          <MyMotorScreenBody screen={screen} state={state} />
        </PhoneFrame>
      </div>
    </div>
  )
}
