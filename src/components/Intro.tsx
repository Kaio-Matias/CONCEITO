import { PAINS, PILLARS } from '../data/content'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

export function Problem() {
  const [ref, seen] = useInView<HTMLElement>(0.15)
  return (
    <section className={`section problem reveal ${seen ? 'is-in' : ''}`} ref={ref}>
      <div className="container problem__grid">
        <div>
          <p className="eyebrow"><span /> O desafio</p>
          <h2>Sua empresa ainda perde tempo com processos que deveriam ser automáticos?</h2>
          <p className="lead">
            Muitos empresários enfrentam os mesmos desafios diários: pilhas de documentos, guias
            fiscais atrasadas, dificuldade para acessar crédito, fluxo de caixa descontrolado e
            equipe sobrecarregada com tarefas operacionais. Enquanto isso, o negócio fica parado —
            ou pior, regride.
          </p>
          <blockquote>
            Cada hora gasta com processos manuais é uma hora a menos investida no crescimento do seu negócio.
          </blockquote>
        </div>
        <ul className="pains">
          {PAINS.map((p, i) => (
            <li key={p.title} style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="pains__icon"><Icon name={p.icon} size={22} /></span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function About() {
  const [ref, seen] = useInView<HTMLElement>(0.15)
  return (
    <section className={`section about reveal ${seen ? 'is-in' : ''}`} id="sobre" ref={ref}>
      <div className="container">
        <div className="section__head">
          <p className="eyebrow"><span /> Quem somos</p>
          <h2>Não somos apenas um escritório contábil — somos seu parceiro estratégico de negócios</h2>
          <p className="lead">
            A Conceito Business foi criada com uma missão clara: ir além do cumprimento de obrigações
            fiscais e atuar como um verdadeiro motor de crescimento para nossos clientes.
          </p>
        </div>
        <div className="pillars">
          {PILLARS.map((p, i) => (
            <article key={p.title} style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="pillars__n">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
