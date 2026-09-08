/**
 * Asset-slot registry for Section 2 (same pattern as Section 1).
 * `src: null` -> the component renders its conceptual CSS/SVG fallback. To use a
 * real, rights-cleared file: drop it in `src/assets/` and set `src` here, e.g.
 *   src: new URL('../../assets/journey-hero.jpg', import.meta.url).href
 */
export interface AssetSlot {
  src: string | null
  alt: string
  conceptualCaption: string
}

export const ASSETS: Record<'heroScene' | 'showcaseFigure', AssetSlot> = {
  heroScene: {
    src: null,
    alt: 'An EV charging at a ZOOP station on a tree-lined street',
    conceptualCaption: 'Conceptual journey view',
  },
  showcaseFigure: {
    src: null,
    alt: 'A driver checking the MyMotor app next to their car',
    conceptualCaption: 'Conceptual',
  },
}
