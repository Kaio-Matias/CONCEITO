import { useCallback, useEffect, useRef, useState, type PointerEvent as RPointerEvent } from 'react'
import { Icon } from './Icon'
import { whatsappUrl } from '../services/leads'

type Pos = { x: number; y: number }

const KEY = 'conceito:fab'
const MARGIN = 12 // distância mínima das bordas da tela
const SNAP = 40 // perto da borda: encaixa nela
const DRAG_THRESHOLD = 6 // px antes de considerar arraste (abaixo disso é clique)

function load(): { pos: Pos | null; collapsed: boolean } {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* storage indisponível */ }
  return { pos: null, collapsed: false }
}

function save(state: { pos: Pos | null; collapsed: boolean }) {
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* ignora */ }
}

/** Mantém o botão inteiro dentro da tela e encaixa nas bordas quando estiver perto. */
function fit(p: Pos, el: HTMLElement | null, snap = false): Pos {
  const w = el?.offsetWidth ?? 64
  const h = el?.offsetHeight ?? 64
  const maxX = window.innerWidth - w - MARGIN
  const maxY = window.innerHeight - h - MARGIN
  let x = Math.min(Math.max(p.x, MARGIN), Math.max(MARGIN, maxX))
  let y = Math.min(Math.max(p.y, MARGIN), Math.max(MARGIN, maxY))
  if (snap) {
    if (x - MARGIN < SNAP) x = MARGIN
    else if (maxX - x < SNAP) x = maxX
    if (y - MARGIN < SNAP) y = MARGIN
    else if (maxY - y < SNAP) y = maxY
  }
  return { x, y }
}

export function FloatingWhatsApp() {
  const initial = useRef(load())
  const [pos, setPos] = useState<Pos | null>(initial.current.pos)
  const [collapsed, setCollapsed] = useState(initial.current.collapsed)
  const [dragging, setDragging] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef<{ dx: number; dy: number; sx: number; sy: number; moved: boolean } | null>(null)
  const suppressClick = useRef(false)

  // Reajusta a posição quando a tela muda de tamanho ou o botão recolhe/expande.
  const refit = useCallback(() => setPos((p) => (p ? fit(p, ref.current) : p)), [])
  useEffect(() => {
    window.addEventListener('resize', refit)
    return () => window.removeEventListener('resize', refit)
  }, [refit])
  useEffect(() => { refit() }, [collapsed, refit])

  useEffect(() => { save({ pos, collapsed }) }, [pos, collapsed])

  function onPointerDown(e: RPointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return
    if ((e.target as HTMLElement).closest('.fab__toggle')) return
    const r = ref.current!.getBoundingClientRect()
    drag.current = { dx: e.clientX - r.left, dy: e.clientY - r.top, sx: e.clientX, sy: e.clientY, moved: false }
  }

  function onPointerMove(e: RPointerEvent<HTMLDivElement>) {
    const d = drag.current
    if (!d) return
    if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < DRAG_THRESHOLD) return
    if (!d.moved) {
      d.moved = true
      setDragging(true)
      ref.current!.setPointerCapture(e.pointerId)
    }
    setPos(fit({ x: e.clientX - d.dx, y: e.clientY - d.dy }, ref.current))
  }

  function onPointerUp(e: RPointerEvent<HTMLDivElement>) {
    const d = drag.current
    drag.current = null
    if (ref.current?.hasPointerCapture(e.pointerId)) ref.current.releasePointerCapture(e.pointerId)
    if (d?.moved) {
      suppressClick.current = true // soltar após arrastar não deve abrir o WhatsApp
      setTimeout(() => { suppressClick.current = false }, 0)
      setDragging(false)
      setPos((p) => (p ? fit(p, ref.current, true) : p))
    }
  }

  const style = pos ? { left: pos.x, top: pos.y, right: 'auto', bottom: 'auto' } : undefined

  return (
    <div
      ref={ref}
      className={`fab ${collapsed ? 'is-collapsed' : ''} ${dragging ? 'is-dragging' : ''}`}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onDoubleClick={() => setPos(null)}
      title="Arraste para mover · duplo clique para voltar ao canto"
    >
      <a
        className="fab__main"
        href={whatsappUrl('Olá! Vim pelo site da Conceito Business e gostaria de falar com um especialista.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com um especialista no WhatsApp"
        draggable={false}
        onClickCapture={(e) => { if (suppressClick.current) e.preventDefault() }}
      >
        <span className="fab__icon"><Icon name="whatsapp" size={28} /></span>
        <span className="fab__label"><small>Online agora</small>Fale com um especialista</span>
      </a>
      <button
        type="button"
        className="fab__toggle"
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? 'Expandir botão do WhatsApp' : 'Recolher botão do WhatsApp'}
        aria-expanded={!collapsed}
      >
        <Icon name={collapsed ? 'plus' : 'minus'} size={12} />
      </button>
    </div>
  )
}
