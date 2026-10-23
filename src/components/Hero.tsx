import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { COMPANY } from '../data/content'
import { whatsappUrl } from '../services/leads'
import { Icon } from './Icon'

/** Atalhos dos serviços contábeis logo abaixo da chamada principal. */
const SHORTCUTS = [
  { icon: 'store', title: 'Abertura de empresa', text: 'Do MEI à LTDA: cuidamos de todo o registro.', msg: 'Olá! Quero abrir minha empresa com a Conceito.' },
  { icon: 'refresh', title: 'Troca de contador', text: 'Mudança sem burocracia e sem parar sua empresa.', msg: 'Olá! Quero trocar de contador e conhecer a Conceito.' },
  { icon: 'file-text', title: 'Impostos em dia', text: 'Guias calculadas e entregues antes do prazo.', msg: 'Olá! Quero ajuda com os impostos da minha empresa.' },
  { icon: 'users', title: 'Folha de pagamento', text: 'Salários, férias e admissões sem dor de cabeça.', msg: 'Olá! Quero terceirizar a folha de pagamento da minha empresa.' },
]

// Padrão da marca (meias-luas) com as cores em gradiente: ciano → azul da marca → índigo.
const COLS = 6
const ROWS = 6
const STOPS = [[56, 189, 248], [0, 73, 253], [79, 70, 229]]
function tileColor(p: number) {
  const [a, b, t] = p < 0.5 ? [STOPS[0], STOPS[1], p / 0.5] : [STOPS[1], STOPS[2], (p - 0.5) / 0.5]
  return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',')})`
}
const TILES = Array.from({ length: COLS * ROWS }, (_, i) => {
  const x = i % COLS
  const y = Math.floor(i / COLS)
  return { color: tileColor((x + y) / (COLS + ROWS - 2)), base: (x + y) % 2, delay: (x + y) * 0.05 }
})

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Paralaxe: o mouse move as camadas em profundidades diferentes e a rolagem as desloca em ritmos diferentes. */
function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return
    let raf = 0
    const set = (k: string, v: number) => el.style.setProperty(k, v.toFixed(3))
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        set('--mx', ((e.clientX - r.left) / r.width - 0.5) * 2)
        set('--my', ((e.clientY - r.top) / r.height - 0.5) * 2)
      })
    }
    const onLeave = () => { set('--mx', 0); set('--my', 0) }
    const onScroll = () => {
      const y = window.scrollY
      if (y < el.offsetHeight * 1.2) set('--sy', y)
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return ref
}

/** Painel com o padrão da marca: cada peça gira ao passar o mouse, e algumas giram sozinhas. */
function BrandTiles() {
  const [turns, setTurns] = useState(() => TILES.map((t) => t.base))
  const turn = (i: number) => setTurns((ts) => ts.map((v, k) => (k === i ? v + 1 : v)))

  useEffect(() => {
    if (reduced()) return
    const t = setInterval(() => {
      const picks = new Set(Array.from({ length: 3 }, () => Math.floor(Math.random() * TILES.length)))
      setTurns((ts) => ts.map((v, k) => (picks.has(k) ? v + 1 : v)))
    }, 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="hero__tiles" aria-hidden="true">
      {TILES.map((t, i) => (
        <i
          key={i}
          style={{ '--c': t.color, '--q': turns[i], animationDelay: `${t.delay}s` } as CSSProperties}
          onPointerEnter={() => turn(i)}
        />
      ))}
    </div>
  )
}

export function Hero() {
  const ref = useParallax<HTMLElement>()

  return (
    <section className="hero" id="topo" ref={ref}>
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__glow hero__glow--a" />
        <span className="hero__glow hero__glow--b" />
        <svg className="hero__lines" width="100%" height="100%">
          <defs>
            <pattern id="hero-lines" width="96" height="96" patternUnits="userSpaceOnUse">
              <path d="M0 0A24 24 0 0 1 0 48M48 0A24 24 0 0 0 48 48M48 0A24 24 0 0 0 96 0M48 48A24 24 0 0 1 96 48M0 48A24 24 0 0 0 48 48M0 96A24 24 0 0 1 48 96M48 48A24 24 0 0 1 48 96M96 48A24 24 0 0 0 96 96M0 0H96M0 48H96M0 0V96M48 0V96" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-lines)" />
        </svg>
      </div>

      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__pill"><span /> Escritório de contabilidade · Palmeira dos Índios/AL</p>
          <h1>
            Contabilidade completa para o <em>seu negócio crescer.</em>
          </h1>
          <p className="hero__lead">
            Abrimos sua empresa, cuidamos dos impostos, da folha de pagamento e do imposto de renda — com
            atendimento próximo e 100% digital, para você focar no que realmente importa.
          </p>
          <div className="hero__cta">
            <a href={whatsappUrl(SHORTCUTS[0].msg)} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg hero__btn">
              Abra sua empresa <Icon name="arrow" size={18} />
            </a>
            <a href={whatsappUrl(SHORTCUTS[1].msg)} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--lg">
              Troque de contador
            </a>
          </div>
          <ul className="hero__proof">
            <li><Icon name="check" size={16} /> Contador registrado no CRC-AL</li>
            <li><Icon name="check" size={16} /> Atendimento pelo WhatsApp</li>
            <li><Icon name="check" size={16} /> Do MEI à empresa de grande porte</li>
          </ul>
        </div>

        <div className="hero__visual">
          <div className="hero__layer hero__panel" style={{ '--d': 1 } as CSSProperties}>
            <BrandTiles />
          </div>
          <div className="hero__layer hero__card hero__card--crc" style={{ '--d': 2.6 } as CSSProperties}>
            <span className="hero__card-icon"><Icon name="badge" size={20} /></span>
            <span><small>Contador responsável</small><b>{COMPANY.crc}</b></span>
          </div>
          <div className="hero__layer hero__card hero__card--tax" style={{ '--d': 3.4 } as CSSProperties}>
            <span className="hero__card-icon hero__card-icon--ok"><Icon name="check" size={20} /></span>
            <span><small>Impostos do mês</small><b>Tudo em dia</b></span>
          </div>
          <div className="hero__layer hero__card hero__card--chat" style={{ '--d': 2 } as CSSProperties}>
            <span className="hero__online" /> Fale com um contador agora
          </div>
        </div>
      </div>

      <div className="container">
        <ul className="hero__shortcuts">
          {SHORTCUTS.map((s, i) => (
            <li key={s.title} style={{ animationDelay: `${0.35 + i * 0.08}s` }}>
              <a href={whatsappUrl(s.msg)} target="_blank" rel="noopener noreferrer">
                <span className="hero__sc-icon"><Icon name={s.icon} size={24} /></span>
                <strong>{s.title}</strong>
                <span>{s.text}</span>
                <em>Quero esse serviço <Icon name="arrow" size={14} /></em>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
