import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from 'react'
import { Icon } from './Icon'
import { whatsappUrl } from '../services/leads'

type Pos = { x: number; y: number }

const KEY = 'conceito:fab'
const MARGIN = 12 // distância mínima das bordas da tela
const SNAP = 40 // perto da borda: encaixa nela
const DRAG_THRESHOLD = 6 // px antes de considerar arraste (abaixo disso é clique)
const AUTO_COLLAPSE_MS = 4000 // tempo aberto antes de recolher sozinho

function load(): { pos: Pos | null } {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* storage indisponível */ }
  return { pos: null }
}

function save(state: { pos: Pos | null }) {
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* ignora */ }
}

/**
 * `pos` é o canto superior esquerdo do ícone (o botão recolhido, de lado `size`).
 * Mantém o ícone dentro da tela e encaixa nas bordas quando estiver perto.
 */
function fit(p: Pos, size: number, snap = false): Pos {
  const maxX = window.innerWidth - size - MARGIN
  const maxY = window.innerHeight - size - MARGIN
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
  // Retrátil automático: abre ao carregar e ao passar o mouse; recolhe sozinho depois.
  const [hover, setHover] = useState(false)
  const [peek, setPeek] = useState(true)
  const [dragging, setDragging] = useState(false)
  const collapsed = dragging || (!hover && !peek)
  const ref = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)
  // Tamanho do botão recolhido: ícone + respiro de 6px de cada lado.
  const size = () => (iconRef.current?.offsetWidth ?? 50) + 12
  const drag = useRef<{ dx: number; dy: number; sx: number; sy: number; moved: boolean } | null>(null)
  const suppressClick = useRef(false)

  // Reajusta a posição quando a tela muda de tamanho.
  useEffect(() => {
    const refit = () => setPos((p) => (p ? fit(p, size()) : p))
    window.addEventListener('resize', refit)
    return () => window.removeEventListener('resize', refit)
  }, [])

  useEffect(() => { save({ pos }) }, [pos])

  // Recolhe depois de alguns segundos aberto.
  useEffect(() => {
    if (!peek) return
    const t = setTimeout(() => setPeek(false), AUTO_COLLAPSE_MS)
    return () => clearTimeout(t)
  }, [peek])

  // Rolar a página recolhe na hora, para não cobrir o conteúdo.
  useEffect(() => {
    const onScroll = () => setPeek(false)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function onPointerDown(e: RPointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return
    const r = iconRef.current!.getBoundingClientRect()
    drag.current = { dx: e.clientX - (r.left - 6), dy: e.clientY - (r.top - 6), sx: e.clientX, sy: e.clientY, moved: false }
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
    setPos(fit({ x: e.clientX - d.dx, y: e.clientY - d.dy }, size()))
  }

  function onPointerUp(e: RPointerEvent<HTMLDivElement>) {
    const d = drag.current
    drag.current = null
    if (ref.current?.hasPointerCapture(e.pointerId)) ref.current.releasePointerCapture(e.pointerId)
    if (d?.moved) {
      suppressClick.current = true // soltar após arrastar não deve abrir o WhatsApp
      setTimeout(() => { suppressClick.current = false }, 0)
      setDragging(false)
      setPos((p) => (p ? fit(p, size(), true) : p))
    }
  }

  // Na metade direita da tela o botão fica preso pela direita e o texto abre para a esquerda.
  const vw = typeof window === 'undefined' ? 0 : window.innerWidth
  const right = !pos || pos.x + size() / 2 > vw / 2
  const style = !pos
    ? undefined
    : right
      ? { right: vw - pos.x - size(), top: pos.y, left: 'auto', bottom: 'auto' }
      : { left: pos.x, top: pos.y, right: 'auto', bottom: 'auto' }

  return (
    <div
      ref={ref}
      className={`fab ${right ? 'is-right' : ''} ${collapsed ? 'is-collapsed' : ''} ${dragging ? 'is-dragging' : ''}`}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onDoubleClick={() => setPos(null)}
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHover(true) }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse' && !drag.current) setHover(false) }}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
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
        <span className="fab__icon" ref={iconRef}><Icon name="whatsapp" size={28} /></span>
        <span className="fab__label"><small>Online agora</small>Fale com um especialista</span>
      </a>
    </div>
  )
}
