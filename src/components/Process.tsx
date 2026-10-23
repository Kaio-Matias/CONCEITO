import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { PROCESS_PATHS } from '../data/content'
import { whatsappUrl } from '../services/leads'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

/** Progresso (0–1) da linha do tempo conforme ela atravessa a tela. */
function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setP(1); return }
    let raf = 0
    const update = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // começa quando o topo da linha passa de 85% da tela e completa meia tela depois
      const travel = Math.max(vh * 0.45, r.height * 0.6)
      setP(Math.min(Math.max((vh * 0.85 - r.top) / travel, 0), 1))
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
  return [ref, p] as const
}

export function Process() {
  const [ref, seen] = useInView<HTMLElement>(0.15)
  const [lineRef, progress] = useScrollProgress<HTMLDivElement>()
  const [pathIdx, setPathIdx] = useState(0)
  const path = PROCESS_PATHS[pathIdx]
  const n = path.steps.length

  return (
    <section className={`section process reveal ${seen ? 'is-in' : ''}`} id="processo" ref={ref}>
      <div className="container container--wide">
        <div className="process__head">
          <div>
            <p className="eyebrow"><span /> Como funciona</p>
            <h2>Começar é simples. <em>A parte difícil fica com a gente.</em></h2>
          </div>
          <div>
            <p className="lead">Escolha o seu caso e veja o passo a passo. Você só precisa dar o primeiro passo — o resto é por nossa conta.</p>
            <div className="process__switch" role="radiogroup" aria-label="Escolha o seu caso">
              {PROCESS_PATHS.map((p, i) => (
                <button key={p.id} type="button" role="radio" aria-checked={i === pathIdx} className={i === pathIdx ? 'is-on' : ''} onClick={() => setPathIdx(i)}>
                  <Icon name={p.icon} size={18} /> {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="tl" ref={lineRef} style={{ '--p': progress } as CSSProperties}>
          <span className="tl__track" aria-hidden="true"><span className="tl__fill" /></span>
          <ol className="tl__list">
          {path.steps.map((s, i) => {
            const on = progress >= (i / (n - 1)) * 0.92
            return (
              <li key={`${path.id}-${s.title}`} className={`tl__step ${on ? 'is-on' : ''}`} style={{ '--i': i } as CSSProperties}>
                <span className="tl__dot"><Icon name={s.icon} size={22} /></span>
                <div className="tl__card">
                  <span className="tl__n">Passo {i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <em className={s.who.startsWith('Você') ? 'is-you' : ''}>{s.who}</em>
                </div>
              </li>
            )
          })}
          </ol>
        </div>

        <div className="process__cta">
          <p><strong>Pronto para o passo 1?</strong> A primeira conversa é sem compromisso.</p>
          <a className="btn btn--primary btn--lg hero__btn" href={whatsappUrl(path.message)} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={18} /> Começar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
