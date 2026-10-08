import { useEffect, useRef, useState, type FormEvent } from 'react'
import { TESTIMONIALS } from '../data/content'
import { submitFeedback } from '../services/feedback'
import { Icon } from './Icon'
import { initials } from './Team'
import { useInView } from '../hooks/useReveal'

const LABELS = ['Ruim', 'Regular', 'Bom', 'Muito bom', 'Excelente']

function Stars({ value }: { value: number }) {
  return (
    <span className="stars" role="img" aria-label={`${value} de 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((n) => <Icon key={n} name="star" size={16} className={n <= value ? 'on' : ''} />)}
    </span>
  )
}

const AUTOPLAY_MS = 6500

function Carousel() {
  const n = TESTIMONIALS.length
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const drag = useRef<number | null>(null)
  const go = (d: number) => setIdx((i) => (i + d + n) % n)

  useEffect(() => {
    if (paused || n < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => setIdx((i) => (i + 1) % n), AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [idx, paused, n])

  const half = Math.floor(n / 2)
  return (
    <div
      className="car"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Depoimentos de clientes"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }}
    >
      <span className="car__mark" aria-hidden="true">“</span>
      <div
        className="car__stage"
        onPointerDown={(e) => { drag.current = e.clientX }}
        onPointerUp={(e) => {
          if (drag.current === null) return
          const dx = e.clientX - drag.current
          drag.current = null
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        }}
        onPointerCancel={() => { drag.current = null }}
      >
        {TESTIMONIALS.map((t, i) => {
          const off = ((i - idx + n + half) % n) - half
          const a = Math.abs(off)
          const active = off === 0
          return (
            <figure
              key={t.name}
              className={`car__card ${active ? 'is-active' : ''}`}
              aria-hidden={!active}
              style={{
                transform: `translateX(${off * 56}%) scale(${1 - a * 0.13}) rotateY(${off * -10}deg)`,
                opacity: a > 1 ? 0 : 1 - a * 0.5,
                zIndex: 10 - a,
                filter: a ? `blur(${a * 1.5}px)` : 'none',
                pointerEvents: a > 1 ? 'none' : 'auto',
              }}
              onClick={() => { if (!active) setIdx(i) }}
            >
              <div className="wall__top">
                <Stars value={t.rating} />
                {t.result && <em>{t.result}</em>}
              </div>
              <blockquote>{t.text}</blockquote>
              <figcaption>
                <span className="wall__av">{initials(t.name)}</span>
                <div><strong>{t.name}</strong><span>{t.role} · {t.company}</span></div>
              </figcaption>
            </figure>
          )
        })}
      </div>
      {n > 1 && (
        <div className="car__ctrl">
          <button type="button" onClick={() => go(-1)} aria-label="Depoimento anterior" className="car__btn car__btn--prev"><Icon name="arrow" size={18} /></button>
          <div className="car__dots">
            {TESTIMONIALS.map((t, i) => (
              <button key={t.name} type="button" aria-label={`Ir para o depoimento de ${t.name}`} aria-current={i === idx} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)}>
                {i === idx && <i key={idx} className={paused ? 'is-paused' : ''} style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Próximo depoimento" className="car__btn"><Icon name="arrow" size={18} /></button>
        </div>
      )}
    </div>
  )
}

export function Feedback() {
  const [ref, seen] = useInView<HTMLElement>(0.1)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [state, setState] = useState<'idle' | 'sent' | 'norating'>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!rating) { setState('norating'); return }
    const form = e.currentTarget
    const f = new FormData(form)
    await submitFeedback({
      name: String(f.get('name')),
      company: String(f.get('company')),
      rating,
      message: String(f.get('message')),
      canPublish: f.get('publish') === 'on',
    })
    form.reset()
    setRating(0)
    setState('sent')
  }

  const shown = hover || rating

  return (
    <section className={`section feedback reveal ${seen ? 'is-in' : ''}`} id="feedback" ref={ref}>
      <div className="container">
        <div className="section__head">
          <p className="eyebrow"><span /> Clientes Conceito</p>
          <h2>Já é nosso cliente? Sua opinião molda o nosso atendimento</h2>
          <p className="lead">Conte como está sendo a experiência. Cada feedback é lido pela nossa equipe e vira melhoria.</p>
        </div>

        <div className="feedback__grid">
          {TESTIMONIALS.length ? <Carousel /> : (
            <div className="wall">
              <div className="wall__empty">
                <span><Icon name="quote" size={28} /></span>
                <h3>O mural de depoimentos é construído por clientes</h3>
                <p>Os feedbacks autorizados para publicação aparecem aqui, com nome e empresa. Seja um dos primeiros a contar sua experiência.</p>
              </div>
            </div>
          )}

          <form className="form fbform" onSubmit={onSubmit}>
            <fieldset>
              <legend>Como você avalia a Conceito?</legend>
              <div className="rate" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button type="button" key={n} aria-label={`${n} — ${LABELS[n - 1]}`} aria-pressed={rating === n}
                    className={n <= shown ? 'on' : ''} onMouseEnter={() => setHover(n)}
                    onClick={() => { setRating(n); setState('idle') }}>
                    <Icon name="star" size={30} />
                  </button>
                ))}
                <span>{shown ? LABELS[shown - 1] : 'Toque nas estrelas'}</span>
              </div>
            </fieldset>
            <div className="fbform__two">
              <label>Seu nome
                <input name="name" required autoComplete="name" />
              </label>
              <label>Empresa
                <input name="company" required autoComplete="organization" />
              </label>
            </div>
            <label>Seu feedback
              <textarea name="message" required rows={4} minLength={10} placeholder="O que está funcionando bem? O que podemos melhorar?" />
            </label>
            <label className="check">
              <input type="checkbox" name="publish" />
              <span>Autorizo a Conceito Business a publicar meu nome, empresa e depoimento no site.</span>
            </label>
            <button className="btn btn--primary btn--lg"><Icon name="arrow" size={18} /> Enviar feedback</button>
            <p className="form__note" role="status">
              {state === 'sent' && 'Obrigado! Recebemos seu feedback. 💙'}
              {state === 'norating' && 'Escolha uma nota de 1 a 5 estrelas antes de enviar.'}
              {state === 'idle' && 'Leva menos de 1 minuto.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
