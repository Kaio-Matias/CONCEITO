import { STEPS } from '../data/content'
import { useInView } from '../hooks/useReveal'

export function Process() {
  const [ref, seen] = useInView<HTMLElement>(0.2)
  return (
    <section className={`section process reveal ${seen ? 'is-in' : ''}`} id="processo" ref={ref}>
      <div className="container">
        <div className="section__head">
          <p className="eyebrow"><span /> Como funciona</p>
          <h2>Do primeiro contato à entrega de resultados: um processo simples e transparente</h2>
          <p className="lead">Iniciar a parceria é simples, rápido e sem burocracia.</p>
        </div>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.n} style={{ transitionDelay: `${i * 110}ms` }}>
              <span className="steps__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
