import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ABOUT_FACTS, COMPANY, COMPARISON, REASONS } from '../data/content'
import { whatsappUrl } from '../services/leads'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

// Frase de apresentação; palavras entre *asteriscos* ganham destaque na cor da marca.
const MANIFESTO = `Somos a *Conceito,* um escritório de contabilidade de ${COMPANY.city.split('/')[0]} que cuida de cada empresa *como se fosse a nossa* — para você ter *tempo e tranquilidade* para crescer.`
  .split(/(\*[^*]+\*)/).filter(Boolean)
  .flatMap((part) => {
    const accent = part.startsWith('*')
    return part.replace(/\*/g, '').split(/\s+/).filter(Boolean).map((text) => ({ text, accent }))
  })

/**
 * Por que ter uma contabilidade (cards que viram: "Sem contador" × "Com a Conceito")
 * e por que a Conceito é a escolha certa.
 */
export function Problem() {
  const [ref, seen] = useInView<HTMLElement>(0.25)
  const [withUs, setWithUs] = useState(false)
  const [flipped, setFlipped] = useState<boolean[]>(() => COMPARISON.map(() => false))

  // Ao aparecer na tela, os cards viram sozinhos para mostrar a diferença.
  useEffect(() => {
    if (!seen) return
    const t = setTimeout(() => showAll(true), 900)
    return () => clearTimeout(t)
  }, [seen])

  function showAll(v: boolean) {
    setWithUs(v)
    setFlipped(COMPARISON.map(() => v))
  }
  const flip = (i: number) => setFlipped((f) => f.map((x, k) => (k === i ? !x : x)))

  return (
    <section className={`section why reveal ${seen ? 'is-in' : ''}`} id="por-que" ref={ref}>
      <div className="container container--wide">
        <div className="why__head">
          <div>
            <p className="eyebrow"><span /> Por que ter uma contabilidade</p>
            <h2>Uma boa contabilidade é o que mantém sua empresa <em>segura e crescendo.</em></h2>
          </div>
          <div className="why__intro">
            <p className="lead">
              Não é só pagar imposto: é evitar multas, entender para onde vai o dinheiro e ter tranquilidade
              para tomar decisões. Veja a diferença no dia a dia.
            </p>
            <div className="why__switch" role="radiogroup" aria-label="Comparar situações">
              <button type="button" role="radio" aria-checked={!withUs} className={!withUs ? 'is-on' : ''} onClick={() => showAll(false)}>Sem contador</button>
              <button type="button" role="radio" aria-checked={withUs} className={withUs ? 'is-on' : ''} onClick={() => showAll(true)}>Com a Conceito</button>
              <span className="why__thumb" aria-hidden="true" />
            </div>
          </div>
        </div>

        <ul className="why__cards">
          {COMPARISON.map((c, i) => (
            <li key={c.topic} style={{ '--i': i } as CSSProperties}>
              <button type="button" className={`flip ${flipped[i] ? 'is-flipped' : ''}`} onClick={() => flip(i)} aria-pressed={flipped[i]}
                aria-label={`${c.topic}: ${flipped[i] ? 'com a Conceito' : 'sem contador'}. Toque para comparar.`}>
                <span className="flip__inner">
                  <span className="flip__face flip__face--without">
                    <span className="flip__top"><span className="flip__icon"><Icon name={c.icon} size={22} /></span><small>Sem contador</small></span>
                    <strong>{c.topic}</strong>
                    <span className="flip__text"><Icon name="close" size={16} /> {c.without}</span>
                    <em>Toque para ver a solução <Icon name="refresh" size={14} /></em>
                  </span>
                  <span className="flip__face flip__face--with">
                    <span className="flip__top"><span className="flip__icon"><Icon name={c.icon} size={22} /></span><small>Com a Conceito</small></span>
                    <strong>{c.topic}</strong>
                    <span className="flip__text"><Icon name="check" size={16} /> {c.with}</span>
                    <em>Toque para comparar <Icon name="refresh" size={14} /></em>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="choice">
          <div className="choice__copy">
            <p className="eyebrow eyebrow--light"><span /> Por que a Conceito</p>
            <h3>A escolha certa para quem quer crescer com segurança.</h3>
            <p>Unimos o cuidado de um escritório de confiança com a praticidade do digital. Você tem um time inteiro cuidando da sua empresa.</p>
            <a className="btn btn--primary btn--lg hero__btn" href={whatsappUrl('Olá! Quero saber como a Conceito pode cuidar da contabilidade da minha empresa.')} target="_blank" rel="noopener noreferrer">
              Falar com um contador <Icon name="arrow" size={18} />
            </a>
          </div>
          <ul className="choice__list">
            {REASONS.map((r, i) => (
              <li key={r.title} style={{ '--i': i } as CSSProperties}>
                <span className="choice__icon"><Icon name={r.icon} size={22} /></span>
                <strong>{r.title}</strong>
                <span>{r.text}</span>
              </li>
            ))}
          </ul>
          <span className="choice__pattern" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

/**
 * Quem somos: uma frase de apresentação cujas palavras "acendem" conforme a pessoa rola,
 * seguida apenas de fatos verificáveis sobre o escritório.
 */
export function About() {
  const ref = useRef<HTMLElement>(null)
  const [lit, setLit] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.setProperty('--p', '1'); setLit(MANIFESTO.length); return }
    let raf = 0
    const update = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(Math.max((vh * 0.9 - r.top) / (vh * 0.4 + r.height * 0.35), 0), 1)
      el.style.setProperty('--p', p.toFixed(3))
      setLit(Math.round(p * MANIFESTO.length))
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section className="section about" id="sobre" ref={ref}>
      <div className="container container--wide">
        <div className="about__grid">
          <div>
            <p className="eyebrow"><span /> Quem somos</p>
            <p className="manifesto" aria-label={MANIFESTO.map((w) => w.text).join(' ')}>
              {MANIFESTO.map((w, i) => (
                <span key={i} aria-hidden="true" className={`${i < lit ? 'is-lit' : ''} ${w.accent ? 'is-accent' : ''}`}>{w.text} </span>
              ))}
            </p>
          </div>
          {/* Símbolo da marca: as metades se encaixam conforme a frase acende */}
          <svg className="about__mark" viewBox="0 0 94 87" aria-hidden="true">
            <rect className="about__square" width="94" height="87" rx="6" />
            <path className="about__half about__half--l" d="M44 8 A30 30 0 0 0 44 68 Z" />
            <path className="about__half about__half--r" d="M50 19 A30 30 0 0 1 50 79 Z" />
          </svg>
        </div>
        <ul className="about__facts">
          {ABOUT_FACTS.map((f) => (
            <li key={f.title}>
              <span className="about__icon"><Icon name={f.icon} size={22} /></span>
              <span><strong>{f.title}</strong><small>{f.text}</small></span>
            </li>
          ))}
          <li className="about__more">
            <a href="#equipe">Conheça quem cuida da sua empresa <Icon name="arrow" size={18} /></a>
          </li>
        </ul>
      </div>
    </section>
  )
}
