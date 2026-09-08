/**
 * Public, verifiable context only. Everything here is sourced from the public
 * MyMotor website / app-store listings (see SOURCES). This file must NOT gain
 * any claim about ZOOP's internal architecture, vendors, SLAs, KPIs or process.
 *
 * Captured 2026-09 for a Technical Product Manager interview proof of work.
 */

export interface SourceRef {
  id: string
  label: string
  url: string
}

export const SOURCES: SourceRef[] = [
  { id: 'zoop-site', label: 'ZOOP Energy — official site', url: 'https://zoop.energy/' },
  { id: 'mymotor-site', label: 'MyMotor — official site', url: 'https://www.mymotor.in/' },
  { id: 'mymotor-app', label: 'MyMotor — app page', url: 'https://www.mymotor.in/mymotor-app' },
  {
    id: 'play',
    label: 'MyMotor on Google Play',
    url: 'https://play.google.com/store/apps/details?id=info.vehicle.rto.car',
  },
  {
    id: 'appstore',
    label: 'MyMotor on the App Store',
    url: 'https://apps.apple.com/in/app/mymotor-challan-ev-rto-info/id6752399714',
  },
]

/** Public product facts. `source` points at a SOURCES id. */
export interface PublicFact {
  statement: string
  source: string
}

export const PUBLIC_FACTS: PublicFact[] = [
  {
    statement:
      'MyMotor is a consumer vehicle-and-mobility app published by Zoop Energy Private Limited.',
    source: 'mymotor-site',
  },
  {
    statement:
      'MyMotor positions itself as "Your vehicle details and more now in one place" and highlights "RTO-verified data, Instant results, Ad-free experience".',
    source: 'mymotor-site',
  },
  {
    statement: 'The app page states "TRUSTED BY 1M+ VEHICLE OWNERS".',
    source: 'mymotor-app',
  },
  {
    statement:
      'Public marketing numbers include 4.7/5 from 25K+ reviews, 50L+ vehicles searched, 15L+ vehicles added, and 2Cr+ worth of policies insured.',
    source: 'mymotor-site',
  },
  {
    statement:
      'MyMotor features: RC / owner / RTO / PUC lookup; challan search and payment ("lowest fees in 30 seconds"); insurance status and renewal comparison; FASTag balance and recharge.',
    source: 'mymotor-site',
  },
  {
    statement:
      'MyMotor has an EV Charging Hub advertising "4,500+ chargers", real-time availability, live charging-session tracking, connector/speed filters, and "a single wallet for all networks".',
    source: 'mymotor-app',
  },
  {
    statement:
      'Other app surfaces: MyGarage (deadline alerts, dues), Glovebox (DigiLocker-verified documents), MyVerse (AI-summarised mobility news), fuel/energy prices, vehicle valuation, transaction history and receipt downloads.',
    source: 'mymotor-app',
  },
  {
    statement:
      'Support contact for the app is help@mymotor.in. Store identifiers: Android info.vehicle.rto.car, iOS id6752399714.',
    source: 'appstore',
  },
]

/**
 * ZOOP Energy's business / freight side. The public zoop.energy site did not
 * render extractable content during research, so this side is described from
 * the interview brief and MUST be treated as ASSUMPTION pending confirmation.
 */
export const ZOOP_B2B_NOTE =
  'ZOOP Energy also operates a business / freight side (fleet-focused charging infrastructure, heavy-duty electric prime movers, coordination of electric freight across industrial corridors). Public detail was not extractable during research — treat specifics as assumptions to confirm with the interviewer.'

/** Author / attribution — rendered in the shell footer and landing page. */
export const AUTHOR = {
  name: 'Radhika Maheshwari',
  role: 'Technical Product Manager — candidate',
  forRole: 'Technical Product Manager, ZOOP Energy',
  context: 'Interview proof of work',
  contact: 'mradhikaa29@gmail.com',
}

export const DISCLAIMER =
  'Independent interview proof of work. Not affiliated with, endorsed by, or based on any internal information from ZOOP Energy or MyMotor. Built from public product information and the role description.'

export const CASE_STUDY = {
  org: 'ZOOP Energy',
  product: 'MyMotor',
  kicker: 'Technical Product Management — Proof of Work',
  thesis:
    "Understanding MyMotor's Consumer Journey and Designing for Reliable Transactions",
  researchDate: 'September 2026',
}
