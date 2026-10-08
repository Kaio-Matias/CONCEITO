import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { MEMBERS, TEAM_POINTS } from '../data/content'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

export const initials = (n: string) => n.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()

// Leque: o CEO fica no centro (frente e mais alto); cada posição mais afastada fica mais atrás, menor e mais baixa.
const SLOTS = [0, -1, 1, -2, 2, -3, 3, -4, 4]

function useCompact() {
  const [c, setC] = useState(() => window.matchMedia('(max-width: 760px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)')
    const on = () => setC(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return c
}

export function Team() {
  const [ref, seen] = useInView<HTMLElement>(0.15)
  const [sel, setSel] = useState<number | null>(null)
  const compact = useCompact()
  const open = sel !== null
  const current = open ? MEMBERS[sel] : null

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSel(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const others = MEMBERS.map((_, i) => i).filter((i) => i !== sel)
  const height = open ? (compact ? 660 : 480) : compact ? 300 : 440
  const slotOf: number[] = []
  MEMBERS.map((m, i) => ({ m, i })).sort((x, y) => x.m.tier - y.m.tier).forEach(({ i }, n) => { slotOf[i] = SLOTS[n] ?? 0 })

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
        <div className={`stage ${open ? 'is-open' : ''}`} style={{ '--sh': `${height}px` } as CSSProperties}>
          <p className="stage__hint">{open ? 'Escolha outra pessoa ou feche para voltar' : 'Clique em uma foto para conhecer cada pessoa da equipe'}</p>
          {MEMBERS.map((m, i) => {
            const d = Math.abs(slotOf[i])
            const isSel = sel === i
            let left: string, top: string, w: number, h: number
            if (isSel) {
              left = compact ? '50%' : '22%'; top = compact ? '190px' : '48%'; w = compact ? 130 : 210; h = w * 1.45
            } else if (open) {
              const step = compact ? 36 : 50
              const rank = others.indexOf(i)
              left = `calc(50% + ${(rank - (others.length - 1) / 2) * step}px)`; top = 'calc(100% - 44px)'; w = compact ? 30 : 40; h = w * 1.35
            } else {
              left = `calc(50% + ${slotOf[i] * (compact ? 30 : 100)}px)`
              w = (compact ? 100 : 190) * (1 - 0.06 * d); h = w * 1.45
              top = `${(compact ? 40 : 56) + d * (compact ? 12 : 26) + h / 2}px`
            }
            return (
              <button
                key={m.name}
                type="button"
                className={`pm ${isSel ? 'is-sel' : ''} ${d === 0 ? 'pm--front' : ''}`}
                style={{ left, top, '--w': `${w}px`, '--h': `${h}px`, '--dim': 1 - d * 0.07, zIndex: isSel ? 50 : 20 - d } as CSSProperties}
                aria-pressed={isSel}
                aria-label={`${m.name}, ${m.title}`}
                onClick={() => setSel(isSel ? null : i)}
              >
                <span className="pm__av">
                  {m.photo ? <img src={m.photo} alt="" loading="lazy" /> : <span>{initials(m.name)}</span>}
                </span>
                {!open && <span className="pm__label"><b>{m.name}</b><small>{m.title}</small></span>}
              </button>
            )
          })}

          <article className="stage__info" aria-live="polite" hidden={!open}>
            {current && (
              <div key={current.name}>
                <small>{current.area}</small>
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
    </section>
  )
}
