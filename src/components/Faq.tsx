import { FAQ } from '../data/content'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

export function Faq() {
  const [ref, seen] = useInView<HTMLElement>(0.15)
  return (
    <section className={`section faq reveal ${seen ? 'is-in' : ''}`} id="faq" ref={ref}>
      <div className="container faq__grid">
        <div>
          <p className="eyebrow"><span /> Dúvidas frequentes</p>
          <h2>Antes de falar com a gente, talvez você queira saber…</h2>
          <p className="lead">Não achou o que procurava? Chame no WhatsApp e respondemos rapidamente.</p>
        </div>
        <div className="faq__list">
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}<Icon name="plus" size={20} /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
