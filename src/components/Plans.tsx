import { PLANS } from '../data/content'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

function Cell({ v }: { v: boolean | string }) {
  if (typeof v === 'string') return <span className="plans__free">{v}</span>
  return v
    ? <span className="plans__yes"><Icon name="check" size={16} /><span className="sr">Incluído</span></span>
    : <span className="plans__no"><Icon name="minus" size={16} /><span className="sr">Não incluído</span></span>
}

export function Plans() {
  const [ref, seen] = useInView<HTMLElement>(0.15)
  const { tiers, rows } = PLANS
  return (
    <section className={`section plans reveal ${seen ? 'is-in' : ''}`} id="planos" ref={ref}>
      <div className="container">
        <div className="section__head">
          <p className="eyebrow"><span /> Planos</p>
          <h2>Soluções que crescem com você: do MEI ao empresário consolidado</h2>
          <p className="lead">
            Planos flexíveis que se adaptam ao porte e às necessidades de cada empresa. Sem pagar por serviços que você não utiliza.
          </p>
        </div>
        <div className="plans__wrap">
          <table className="plans__table">
            <thead>
              <tr>
                <th><span className="sr">Recursos</span></th>
                {tiers.map((t) => (
                  <th key={t.name} className={t.featured ? 'is-featured' : ''}>
                    {t.featured && <em>Mais escolhido</em>}
                    <strong>{t.name}</strong>
                    <small>{t.audience}</small>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  {r.values.map((v, i) => <td key={i} className={tiers[i].featured ? 'is-featured' : ''}><Cell v={v} /></td>)}
                </tr>
              ))}
              <tr>
                <th scope="row">Suporte</th>
                {tiers.map((t) => <td key={t.name} className={t.featured ? 'is-featured' : ''}><b>{t.support}</b></td>)}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="plans__cta">
          <p>Fale com um especialista e descubra qual plano é ideal para a sua empresa.</p>
          <a href="#contato" className="btn btn--primary">Descobrir meu plano <Icon name="arrow" size={18} /></a>
        </div>
      </div>
    </section>
  )
}
