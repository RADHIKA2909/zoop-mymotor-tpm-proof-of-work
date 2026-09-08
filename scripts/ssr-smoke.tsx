/* Throwaway runtime smoke test: render every route to string via a memory router.
   Run: npx vite build --ssr scripts/ssr-smoke.tsx --outDir .smoke && node .smoke/ssr-smoke.js */
import { renderToString } from 'react-dom/server'
import { createElement } from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '../src/hooks/useTheme'
import { CaseStudyShell } from '../src/components/layout/CaseStudyShell'
import { HomeSection } from '../src/sections/HomeSection'
import { ContextSection } from '../src/sections/context/ContextSection'
import { JourneySection } from '../src/sections/journey/JourneySection'
import { FeedbackSection } from '../src/sections/feedback/FeedbackSection'
import { ReliabilitySection } from '../src/sections/reliability/ReliabilitySection'
import { ControlTowerSection } from '../src/sections/control-tower/ControlTowerSection'
import { PrototypeSection } from '../src/sections/prototype/PrototypeSection'
import { StyleGuideSection } from '../src/sections/StyleGuideSection'
import { NotFoundSection } from '../src/sections/NotFoundSection'

const routes = [
  {
    element: createElement(CaseStudyShell),
    children: [
      { index: true, element: createElement(HomeSection) },
      { path: 'context', element: createElement(ContextSection) },
      { path: 'journey', element: createElement(JourneySection) },
      { path: 'feedback', element: createElement(FeedbackSection) },
      { path: 'reliability', element: createElement(ReliabilitySection) },
      { path: 'control-tower', element: createElement(ControlTowerSection) },
      { path: 'prototype', element: createElement(PrototypeSection) },
      { path: 'styleguide', element: createElement(StyleGuideSection) },
      { path: '*', element: createElement(NotFoundSection) },
    ],
  },
]

const paths = ['/', '/context', '/journey', '/feedback', '/reliability', '/control-tower', '/prototype', '/styleguide', '/nonsense']

let failures = 0
for (const p of paths) {
  try {
    const router = createMemoryRouter(routes, { initialEntries: [p] })
    const html = renderToString(createElement(ThemeProvider, null, createElement(RouterProvider, { router })))
    const ok = html.length > 200
    console.log(`${ok ? 'PASS' : 'THIN'}  ${p.padEnd(16)} ${html.length} chars`)
    if (!ok) failures++
  } catch (err) {
    failures++
    console.log(`FAIL  ${p.padEnd(16)} ${(err as Error).message}`)
  }
}
console.log(failures === 0 ? '\nALL ROUTES RENDER' : `\n${failures} ROUTE(S) FAILED`)
process.exit(failures === 0 ? 0 : 1)
