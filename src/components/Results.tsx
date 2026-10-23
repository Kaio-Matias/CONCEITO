import type { CSSProperties } from 'react'
import { RESULTS } from '../data/content'
import { whatsappUrl } from '../services/leads'
import { useCountUp, useInView } from '../hooks/useReveal'
import { Icon } from './Icon'

type Result = (typeof RESULTS)[number]

/** Gráfico simples de cada resultado, animado quando a seção aparece. */
function Visual({ kind }: { kind: Result['kind'] }) {
  if (kind === 'time') {
    return (
      <div className="rv rv--time" aria-hidden="true">
        <div><small>Sem organização</small><span className="rv__bar rv__bar--gray" style={{ '--w': '100%' } as CSSProperties} /></div>
        <div><small>Com a Conceito</small><span className="rv__bar" style={{ '--w': '60%' } as CSSProperties} /></div>
      </div>
    )
  }
  if (kind === 'tax') {
    return (
      <div className="rv rv--tax" aria-hidden="true">
        <span className="rv__donut" />
        <small><b>Economia</b> que fica no seu caixa</small>
      </div>
    )
  }
  if (kind === 'credit') {
    return (
      <div className="rv rv--credit" aria-hidden="true">
        {[1, 2, 3].map((n) => <span key={n} style={{ '--h': `${n * 33}%`, '--i': n } as CSSProperties}><i>{n}x</i></span>)}
      </div>
    )
  }
  return (
    <div className="rv rv--ok" aria-hidden="true">
      <span className="rv__ring"><Icon name="check" size={30} /></span>
      <small>Sem multas<br />e sem atrasos</small>
    </div>
  )
}

function Metric({ r, active, i }: { r: Result; active: boolean; i: number }) {
  const v = useCountUp(r.value, active)
  return (
    <article className="rcard" style={{ '--i': i } as CSSProperties}>
      <Visual kind={r.kind} />
      <div className="rcard__num" aria-label={`${r.prefix} ${r.value}${r.suffix}`}>
        {r.prefix && <small>{r.prefix}</small>}
        <span>{v}</span><em>{r.suffix}</em>
      </div>
      <h3>{r.title}</h3>
      <p>{r.text}</p>
    </article>
  )
}

export function Results() {
  const [ref, seen] = useInView<HTMLElement>(0.25)
  return (
    <section className={`section results reveal ${seen ? 'is-in' : ''}`} id="resultados" ref={ref}>
      <span className="results__glow" aria-hidden="true" />
      <div className="container container--wide">
        <div className="results__head">
          <div>
            <p className="eyebrow eyebrow--light"><span /> Resultados</p>
            <h2>Contabilidade bem feita <em>aparece no resultado.</em></h2>
          </div>
          <p className="lead">Veja o que muda na prática quando sua empresa tem uma contabilidade organizada ao lado.</p>
        </div>

        <div className="rcards">
          {RESULTS.map((r, i) => <Metric key={r.kind} r={r} i={i} active={seen} />)}
        </div>

        <div className="results__foot">
          <p>
            <strong>Quer saber quanto a sua empresa pode ganhar?</strong>
            <small>Números de referência da Conceito com clientes atendidos. O resultado de cada empresa depende do regime, da atividade e da situação inicial.</small>
          </p>
          <a className="btn btn--primary btn--lg hero__btn" href={whatsappUrl('Olá! Quero saber quanto minha empresa pode economizar com a Conceito.')} target="_blank" rel="noopener noreferrer">
            Falar com um contador <Icon name="arrow" size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
