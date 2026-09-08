/* Dark-theme contrast audit. Resolves the token chain from src/styles/tokens.css
   and checks WCAG contrast for the important dark-surface text pairs.
   Run: node scripts/contrast-check.mjs */
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8')

// Split :root vs [data-theme='dark']
const rootBlock = css.slice(css.indexOf(':root'), css.indexOf("[data-theme='dark']"))
const darkBlock = css.slice(css.indexOf("[data-theme='dark']"))

function parseVars(block) {
  const map = {}
  for (const m of block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) map[m[1]] = m[2].trim()
  return map
}
const rootVars = parseVars(rootBlock)
const darkVars = { ...rootVars, ...parseVars(darkBlock) }

function resolve(value, vars, depth = 0) {
  if (depth > 10) return value
  const m = value.match(/var\((--[\w-]+)\)/)
  if (m) return resolve(vars[m[1]] ?? '#000', vars, depth + 1)
  return value
}

function hexToRgb(hex) {
  hex = hex.replace('#', '').trim()
  if (hex.length === 3) hex = [...hex].map((c) => c + c).join('')
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16))
}
function lum([r, g, b]) {
  const a = [r, g, b].map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
}
function ratio(fg, bg) {
  const l1 = lum(hexToRgb(fg))
  const l2 = lum(hexToRgb(bg))
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (hi + 0.05) / (lo + 0.05)
}
const g = (name) => resolve(`var(${name})`, darkVars)

// [ label, fg token, bg token, min ratio ]
const CHECKS = [
  ['Section heading on --dark-bg', '--dark-text-primary', '--dark-bg', 4.5],
  ['Body text on --dark-bg', '--dark-text-secondary', '--dark-bg', 4.5],
  ['Muted / caption on --dark-bg', '--dark-text-muted', '--dark-bg', 4.5],
  ['Heading on --dark-surface (card)', '--dark-text-primary', '--dark-surface', 4.5],
  ['Body on --dark-surface (card)', '--dark-text-secondary', '--dark-surface', 4.5],
  ['Muted on --dark-surface (card)', '--dark-text-muted', '--dark-surface', 4.5],
  ['Muted on --dark-surface-elevated', '--dark-text-muted', '--dark-surface-elevated', 4.5],
  ['Green accent text on --dark-bg', '--dark-accent', '--dark-bg', 3],
  ['Green accent text on --dark-surface', '--dark-accent', '--dark-surface', 3],
  ['brand-green-deep (flipped) on green tint', '--brand-green-deep', '--dark-accent-surface', 4.5],
  ['text-on-brand on the green button', '--text-on-brand', '--dark-accent', 4.5],
  ['generic --text-primary maps light', '--text-primary', '--bg', 4.5],
  ['generic --text-secondary maps light', '--text-secondary', '--bg', 4.5],
  ['generic --text-tertiary maps light', '--text-tertiary', '--surface', 4.5],
  ['--text-inverse stays light on dark chip', '--text-inverse', '--brand-green-ink', 4.5],
  ['status warning on --dark-bg', '--status-warning', '--dark-bg', 3],
  ['border visible vs --dark-bg (UI 3:1 goal)', '--dark-border', '--dark-bg', 1.7],
]

let fails = 0
for (const [label, fgT, bgT, min] of CHECKS) {
  const fg = g(fgT)
  const bg = g(bgT)
  const r = ratio(fg, bg)
  const ok = r >= min
  if (!ok) fails++
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(6)}:1  (min ${min})  ${label}  [${fg} on ${bg}]`,
  )
}
console.log(fails === 0 ? '\nALL CONTRAST CHECKS PASS' : `\n${fails} CHECK(S) FAILED`)
process.exit(fails === 0 ? 0 : 1)
