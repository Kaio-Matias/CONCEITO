import { RESULTS } from '../data/content'
import { useCountUp, useInView } from '../hooks/useReveal'

function Metric({ value, suffix, title, text, active }: (typeof RESULTS)[number] & { active: boolean }) {
  const v = useCountUp(value, active)
  return (
    <article className="metric">
      <div className="metric__num" aria-label={`${value}${suffix}`}>
        <span>{v}</span><em>{suffix}</em>
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

export function Results() {
  const [ref, seen] = useInView<HTMLElement>(0.25)
  return (
    <section className={`section results reveal ${seen ? 'is-in' : ''}`} id="resultados" ref={ref}>
      <div className="container">
        <div className="section__head">
          <p className="eyebrow eyebrow--light"><span /> Resultados</p>
          <h2>Contabilidade estratégica não é custo — é a alavanca do seu crescimento</h2>
          <p className="lead">
            Cada real investido na Conceito Business retorna multiplicado em eficiência, economia e crescimento.
          </p>
        </div>
        <div className="metrics">
          {RESULTS.map((r) => <Metric key={r.title} {...r} active={seen} />)}
        </div>
        <p className="results__foot">Empresas que adotam gestão contábil estratégica crescem até 3x mais rápido.</p>
      </div>
    </section>
  )
}
