import { createBrowserRouter } from 'react-router-dom'
import { CaseStudyShell } from '@/components/layout/CaseStudyShell'
import { HomeSection } from '@/sections/HomeSection'
import { ContextSection } from '@/sections/context/ContextSection'
import { JourneySection } from '@/sections/journey/JourneySection'
import { FeedbackSection } from '@/sections/feedback/FeedbackSection'
import { ReliabilitySection } from '@/sections/reliability/ReliabilitySection'
import { ControlTowerSection } from '@/sections/control-tower/ControlTowerSection'
import { ControlTowerDeepDiveSection } from '@/sections/control-tower-deep-dive/ControlTowerDeepDiveSection'
import { PrototypeSection } from '@/sections/prototype/PrototypeSection'
import { StyleGuideSection } from '@/sections/StyleGuideSection'
import { NotFoundSection } from '@/sections/NotFoundSection'

/**
 * Routes mirror the case-study navigation (`src/data/sections.ts`). Deeper
 * brief artefacts (PRD, RCA, metrics, vendor scorecards) render inside these
 * sections, not as extra routes.
 *
 * CTO deep-dive branch only: `control-tower-deep-dive` is a 7th route added
 * between Control Tower and Prototype — not present on `main`. See CLAUDE.md §22.
 */
export const router = createBrowserRouter([
  {
    element: <CaseStudyShell />,
    children: [
      { index: true, element: <HomeSection /> },
      { path: 'context', element: <ContextSection /> },
      { path: 'journey', element: <JourneySection /> },
      { path: 'feedback', element: <FeedbackSection /> },
      { path: 'reliability', element: <ReliabilitySection /> },
      { path: 'control-tower', element: <ControlTowerSection /> },
      { path: 'control-tower-deep-dive', element: <ControlTowerDeepDiveSection /> },
      { path: 'prototype', element: <PrototypeSection /> },
      { path: 'styleguide', element: <StyleGuideSection /> },
      { path: '*', element: <NotFoundSection /> },
    ],
  },
])
