import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { OWNERS, type Owner } from '../data/content'
import { whatsappUrl } from '../services/leads'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

export const initials = (n: string) => n.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()

const HOVER_DELAY = 60 // ms de movimento sobre o card antes de abrir (evita aberturas de passagem)
const CLOSE_DELAY = 300 // ms fora do grupo antes de fechar

function Info({ o }: { o: Owner }) {
  const first = o.name.split(' ')[0]
  return (
    <>
      <p className="owner__area">{o.area}</p>
      <h3>{o.name}</h3>
      <p className="owner__role">{o.role}</p>
      <p className="owner__about">{o.about}</p>
      <p className="owner__label">Especialidades</p>
      <ul className="owner__tags">{o.specialties.map((s) => <li key={s}>{s}</li>)}</ul>
      <p className="owner__label">O que faz por você</p>
      <ul className="owner__list">{o.forYou.map((s) => <li key={s}><Icon name="check" size={16} /> {s}</li>)}</ul>
      <div className="owner__foot">
        {o.crc && <span className="owner__crc"><Icon name="badge" size={16} /> {o.crc}</span>}
        <a className="btn btn--primary hero__btn" href={whatsappUrl(`Olá! Gostaria de falar com o ${first}, da Conceito.`)} target="_blank" rel="noopener noreferrer">
          Falar com {first} <Icon name="arrow" size={16} />
        </a>
      </div>
    </>
  )
}

export function Team() {
  const [ref, seen] = useInView<HTMLElement>(0.15)
  const [open, setOpen] = useState<number | null>(null)
  const timer = useRef<number>()
  const pending = useRef<number | null>(null)
  const change = (i: number | null) => setOpen(i)

  /**
   * Abre pelo movimento do mouse (pointermove), e não por pointerenter: quando os cards mudam de
   * tamanho, um card pode deslizar para baixo do cursor parado — sem movimento, ele não abre sozinho.
   */
  function hoverMove(i: number, e: PointerEvent) {
    if (e.pointerType !== 'mouse') return
    if (open === i) { window.clearTimeout(timer.current); pending.current = null; return }
    if (pending.current === i) return
    window.clearTimeout(timer.current)
    pending.current = i
    timer.current = window.setTimeout(() => { pending.current = null; change(i) }, HOVER_DELAY)
  }
  function leaveGroup(e: PointerEvent) {
    if (e.pointerType !== 'mouse') return
    window.clearTimeout(timer.current)
    pending.current = null
    timer.current = window.setTimeout(() => change(null), CLOSE_DELAY)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null) }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); window.clearTimeout(timer.current) }
  }, [])

  return (
    <section className={`section team reveal ${seen ? 'is-in' : ''}`} id="equipe" ref={ref}>
      <div className="container container--wide">
        <div className="team__head">
          <div>
            <p className="eyebrow"><span /> Quem está à frente</p>
            <h2>Conheça os sócios que <em>cuidam da sua empresa.</em></h2>
          </div>
          <p className="lead">Cada sócio é responsável por uma área da contabilidade. Passe o mouse ou toque na foto para conhecer o que cada um faz.</p>
        </div>

        <div className={`owners ${open !== null ? 'has-open' : ''}`} onPointerLeave={leaveGroup}>
          {OWNERS.map((o, i) => {
            const isOpen = open === i
            return (
              <article key={o.name} className={`owner ${isOpen ? 'is-open' : ''} ${open !== null && !isOpen ? 'is-shrunk' : ''}`} style={{ '--i': i } as CSSProperties}>
                <button
                  type="button"
                  className="owner__card"
                  aria-expanded={isOpen}
                  aria-controls={`owner-info-${i}`}
                  onClick={() => change(isOpen ? null : i)}
                  onPointerMove={(e) => hoverMove(i, e)}
                >
                  {o.photo
                    ? <img src={o.photo} alt="" loading="lazy" />
                    : <span className="owner__ph" aria-hidden="true"><b>{initials(o.name)}</b></span>}
                  <span className="owner__meta">
                    <em>{o.area}</em>
                    <strong>{o.name}</strong>
                    <small>{o.role}</small>
                  </span>
                  <span className="owner__plus" aria-hidden="true"><Icon name="plus" size={20} /></span>
                </button>
                <div className="owner__info" id={`owner-info-${i}`} aria-hidden={!isOpen}>
                  <div className="owner__inner"><Info o={o} /></div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
