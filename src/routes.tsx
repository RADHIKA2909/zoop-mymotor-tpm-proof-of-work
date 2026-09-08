import { createBrowserRouter } from 'react-router-dom'
import { CaseStudyShell } from '@/components/layout/CaseStudyShell'
import { HomeSection } from '@/sections/HomeSection'
import { ContextSection } from '@/sections/context/ContextSection'
import { JourneySection } from '@/sections/journey/JourneySection'
import { FeedbackSection } from '@/sections/feedback/FeedbackSection'
import { ReliabilitySection } from '@/sections/ReliabilitySection'
import { ControlTowerSection } from '@/sections/ControlTowerSection'
import { PrototypeSection } from '@/sections/PrototypeSection'
import { StyleGuideSection } from '@/sections/StyleGuideSection'
import { NotFoundSection } from '@/sections/NotFoundSection'

/**
 * Routes mirror the six-section navigation. Deeper brief artefacts (PRD, RCA,
 * metrics, vendor scorecards) render inside these sections, not as extra routes.
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
      { path: 'prototype', element: <PrototypeSection /> },
      { path: 'styleguide', element: <StyleGuideSection /> },
      { path: '*', element: <NotFoundSection /> },
    ],
  },
])
