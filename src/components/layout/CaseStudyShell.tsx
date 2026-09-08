import { Outlet, ScrollRestoration } from 'react-router-dom'
import { TopNav } from './TopNav'
import { Footer } from './Footer'
import s from './CaseStudyShell.module.css'

/** Persistent frame: sticky top nav, routed content, footer. */
export function CaseStudyShell() {
  return (
    <div className={s.shell}>
      <a href="#main" className={s.skip}>
        Skip to content
      </a>
      <TopNav />
      <main id="main" className={s.main}>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
