import { useEffect, useMemo, useState, type CSSProperties } from 'react'

const DURATION = 3300 // ms até começar a sair

/** Mostra a splash a cada carregamento do site, exceto com "reduzir movimento". */
const SHOW_ON_LOAD = !window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Avisa o resto da página (classe no <html>) que a abertura terminou e as animações podem começar. */
const markDone = () => document.documentElement.classList.add('splash-done')
if (!SHOW_ON_LOAD) markDone()

/** Símbolo da Conceito redesenhado em vetor (mesma geometria do logo). */
function Mark() {
  return (
    <svg className="splash__mark" viewBox="0 0 94 87" aria-hidden="true">
      <rect className="splash__square" width="94" height="87" rx="6" />
      <path className="splash__half splash__half--l" d="M44 8 A30 30 0 0 0 44 68 Z" />
      <path className="splash__half splash__half--r" d="M50 19 A30 30 0 0 1 50 79 Z" />
    </svg>
  )
}

/**
 * Abertura do site: o padrão de meias-luas da marca surge em onda a partir do centro,
 * recolhe, o símbolo se monta e o nome é revelado. Clique ou tecla pulam a animação.
 */
export function Splash() {
  const [show, setShow] = useState(SHOW_ON_LOAD)
  const [leaving, setLeaving] = useState(false)

  const { tile, cols, tiles } = useMemo(() => {
    if (!show) return { tile: 0, cols: 0, tiles: [] }
    const TILE = window.innerWidth < 600 ? 56 : 76 // px: tamanho de cada peça do padrão
    const cols = Math.ceil(window.innerWidth / TILE) + 1
    const rows = Math.ceil(window.innerHeight / TILE) + 1
    const cx = (cols - 1) / 2
    const cy = (rows - 1) / 2
    const max = Math.hypot(cx, cy)
    const tiles = Array.from({ length: cols * rows }, (_, i) => {
      const x = i % cols
      const y = Math.floor(i / cols)
      return { d: Math.hypot(x - cx, y - cy) / max, turn: (x + y) % 2 === 1 }
    })
    return { tile: TILE, cols, tiles }
  }, [show])

  useEffect(() => {
    if (!show) return
    document.documentElement.style.overflow = 'hidden'
    const leave = () => setLeaving(true)
    const t = setTimeout(leave, DURATION)
    window.addEventListener('keydown', leave, { once: true })
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', leave)
      document.documentElement.style.overflow = ''
    }
  }, [show])

  // Garantia: remove a splash mesmo que o evento de fim da animação não dispare.
  useEffect(() => {
    if (!leaving) return
    markDone()
    const t = setTimeout(() => setShow(false), 900)
    return () => clearTimeout(t)
  }, [leaving])

  if (!show) return null

  return (
    <div
      className={`splash ${leaving ? 'is-leaving' : ''}`}
      onClick={() => setLeaving(true)}
      onAnimationEnd={(e) => { if (e.target === e.currentTarget && leaving) setShow(false) }}
      role="presentation"
    >
      <div className="splash__pattern" style={{ '--tile': `${tile}px`, gridTemplateColumns: `repeat(${cols}, ${tile}px)` } as CSSProperties} aria-hidden="true">
        {tiles.map((t, i) => (
          <i key={i} className={t.turn ? 'is-turned' : ''} style={{ animationDelay: `${(t.d * 0.55).toFixed(3)}s` }} />
        ))}
      </div>
      <div className="splash__logo">
        <Mark />
        <img src="/logos/logo-02.png" alt="Conceito Business" width={426} height={94} />
      </div>
      <p className="splash__tagline">Contabilidade · Finanças · Gestão</p>
    </div>
  )
}
