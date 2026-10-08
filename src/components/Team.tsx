import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, PointerEvent } from 'react'
import { MEMBERS, TEAM_POINTS } from '../data/content'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

export const initials = (n: string) => n.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()

/** Largura real do palco (o leque se adapta a ela, não à largura da janela). */
function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [w, setW] = useState(() => Math.min(window.innerWidth - 40, 1200))
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, w] as const
}

const N = MEMBERS.length
const HALF = Math.floor(N / 2)
// ordem do leque: hierarquia (CEO → sócios → demais)
const ORDER = MEMBERS.map((m, i) => ({ i, t: m.tier })).sort((a, b) => a.t - b.t).map((x) => x.i)
const POS = ORDER.reduce<number[]>((acc, mi, p) => { acc[mi] = p; return acc }, [])
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function Team() {
  const [ref, seen] = useInView<HTMLElement>(0.15)
  const [stageRef, sw] = useWidth<HTMLDivElement>()
  const [center, setCenter] = useState(0)             // posição (em ORDER) que está na frente
  const [sel, setSel] = useState<number | null>(null) // índice do membro aberto
  const [hold, setHold] = useState(false)             // mouse/foco no palco: pausa o giro automático
  const drag = useRef({ x: 0, moved: false })

  const open = sel !== null
  const current = open ? MEMBERS[sel] : null
  const compact = sw < 600

  const w0 = compact ? Math.min(104, sw * 0.3) : Math.min(190, sw * 0.26)
  const fanStep = Math.min(100, (sw - w0 - 24) / (HALF * 2))
  const gy = w0 * 0.137
  const top0 = compact ? 44 : 60
  const closedH = Math.max(top0 + 1.45 * w0, top0 + HALF * gy + 1.45 * w0 * 0.78) + 96
  const height = open ? (compact ? 680 : 520) : Math.round(closedH)

  const spin = (d: number) => setCenter((c) => (c + d + N) % N)
  const offOf = (mi: number) => { let d = (((POS[mi] - center) % N) + N) % N; if (d > HALF) d -= N; return d }

  // giro automático (pausa ao interagir, com a pessoa aberta ou com "reduzir movimento")
  useEffect(() => {
    if (!seen || open || hold || reduced()) return
    const t = setInterval(() => spin(1), 3600)
    return () => clearInterval(t)
  }, [seen, open, hold])

  useEffect(() => {
    if (!open) return
    const onKey = (e: globalThis.KeyboardEvent) => { if (e.key === 'Escape') setSel(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const others = MEMBERS.map((_, i) => i).filter((i) => i !== sel)

  function onKeyDown(e: KeyboardEvent) {
    if (open) return
    if (e.key === 'ArrowRight') { e.preventDefault(); spin(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); spin(-1) }
  }
  function onPointerDown(e: PointerEvent) { drag.current = { x: e.clientX, moved: false } }
  function onPointerUp(e: PointerEvent) {
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 8) drag.current.moved = true
    if (!open && Math.abs(dx) > 45) spin(dx < 0 ? 1 : -1)
  }
  function onPointerMove(e: PointerEvent) {
    if (e.pointerType !== 'mouse' || open) return
    const el = stageRef.current!
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', String(((e.clientX - r.left) / r.width - 0.5) * 2))
    el.style.setProperty('--my', String(((e.clientY - r.top) / r.height - 0.5) * 2))
  }
  function onPointerLeave() {
    const el = stageRef.current!
    el.style.setProperty('--mx', '0'); el.style.setProperty('--my', '0')
    setHold(false)
  }

  function pick(i: number) {
    if (drag.current.moved) return
    if (open) { setSel(sel === i ? null : i); setCenter(POS[i]); return }
    if (offOf(i) === 0) setSel(i)
    else setCenter(POS[i])
  }

  return (
    <section id="equipe" className={`section team reveal ${seen ? 'is-in' : ''}`} ref={ref}>
      <div className="container team__grid">
        <div className="team__quote">
          <span className="team__mark" aria-hidden="true">“</span>
          <p>Transformamos números em estratégia, trazendo clareza para que nossos clientes possam focar no que realmente importa: crescer.</p>
        </div>
        <div>
          <p className="eyebrow"><span /> Nossa equipe</p>
          <h2>Profissionais especializados que entendem o seu negócio como ninguém</h2>
          <p className="lead">
            Nossa equipe é o nosso maior ativo: especialistas com experiência prática e estratégica em
            contabilidade, finanças e tecnologia.
          </p>
          <ul className="checks">
            {TEAM_POINTS.map((t) => (
              <li key={t}><span><Icon name="check" size={14} /></span>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container">
        <div
          ref={stageRef}
          className={`stage ${open ? 'is-open' : ''} ${compact ? 'is-compact' : ''}`}
          style={{ '--sh': `${height}px` } as CSSProperties}
          role="group"
          aria-roledescription="carrossel"
          aria-label="Equipe Conceito"
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerMove={onPointerMove}
          onPointerEnter={() => setHold(true)}
          onPointerLeave={onPointerLeave}
          onFocus={() => setHold(true)}
          onBlur={() => setHold(false)}
        >
          <p className="stage__hint">
            {open ? 'Escolha outra pessoa ou feche para voltar' : compact ? 'Deslize e toque na foto central' : 'Arraste ou use as setas · clique na foto central para conhecer'}
          </p>

          {MEMBERS.map((m, i) => {
            const off = offOf(i)
            const d = Math.abs(off)
            const isSel = sel === i
            const front = !open && d === 0
            let left: string, top: string, w: number, h: number, rot = 0
            if (isSel) {
              left = compact ? '50%' : '22%'; top = compact ? '196px' : '243px'; w = compact ? 130 : 210; h = w * 1.45
            } else if (open) {
              const step = Math.min(compact ? 36 : 50, (sw - 60) / others.length)
              const rank = others.indexOf(i)
              left = `calc(50% + ${(rank - (others.length - 1) / 2) * step}px)`; top = 'calc(100% - 44px)'; w = compact ? 30 : 40; h = w * 1.35
            } else {
              left = `calc(50% + ${off * fanStep}px)`
              w = w0 * (1 - 0.06 * d); h = w * 1.45
              top = `${top0 + d * gy + h / 2}px`
              rot = off * (compact ? 2.6 : 3.6)
            }
            return (
              <button
                key={m.name}
                type="button"
                className={`pm ${isSel ? 'is-sel' : ''} ${front ? 'pm--front' : ''}`}
                style={{
                  left, top, '--w': `${w}px`, '--h': `${h}px`, '--dim': 1 - d * 0.07, '--rot': `${rot}deg`,
                  '--par': open ? 0 : HALF + 1 - d, zIndex: isSel ? 50 : 20 - d,
                } as CSSProperties}
                aria-pressed={isSel}
                aria-label={`${m.name}, ${m.title}${front ? ' — clique para conhecer' : ''}`}
                onClick={() => pick(i)}
              >
                <span className="pm__av">
                  {m.photo
                    ? <img src={m.photo} alt="" loading="lazy" draggable={false} />
                    : <span className="pm__ph"><i /><b>{initials(m.name)}</b></span>}
                  {!open && <span className="pm__tag">{m.area}</span>}
                  <span className="pm__shine" />
                </span>
                {!open && <span className="pm__label"><b>{m.name}</b><small>{m.title}</small></span>}
              </button>
            )
          })}

          {!open && (
            <div className="stage__ctrl">
              <button type="button" className="stage__arrow" onClick={() => spin(-1)} aria-label="Pessoa anterior"><Icon name="arrow" size={18} style={{ transform: 'scaleX(-1)' }} /></button>
              <div className="stage__dots" aria-hidden="true">
                {ORDER.map((mi, p) => <button key={mi} type="button" tabIndex={-1} className={p === center ? 'on' : ''} onClick={() => setCenter(p)} />)}
              </div>
              <button type="button" className="stage__arrow" onClick={() => spin(1)} aria-label="Próxima pessoa"><Icon name="arrow" size={18} /></button>
            </div>
          )}

          <div className="stage__side" hidden={!open}>
            <article className="stage__info" aria-live="polite">
              {current && (
                <div key={current.name}>
                  <small><i />{current.area}</small>
                  <h3>{current.name}</h3>
                  <b>{current.title}</b>
                  <p>{current.about}</p>
                  {current.crc && <em><Icon name="check" size={14} /> {current.crc}</em>}
                </div>
              )}
              <button type="button" className="stage__close" onClick={() => setSel(null)} aria-label="Fechar">×</button>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
