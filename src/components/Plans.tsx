import { useState, type CSSProperties } from 'react'
import { PLANS } from '../data/content'
import { whatsappUrl } from '../services/leads'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

export function Plans() {
  const [ref, seen] = useInView<HTMLElement>(0.15)
  const { tiers, features } = PLANS
  const [picked, setPicked] = useState(() => Math.max(0, tiers.findIndex((t) => t.featured)))

  return (
    <section className={`section plans reveal ${seen ? 'is-in' : ''}`} id="planos" ref={ref}>
      <span className="plans__glow" aria-hidden="true" />
      <div className="container container--wide">
        <div className="plans__head">
          <div>
            <p className="eyebrow eyebrow--light"><span /> Planos</p>
            <h2>Planos que acompanham <em>o tamanho da sua empresa.</em></h2>
          </div>
          <p className="lead">Você só paga pelo que usa. O valor é combinado depois de uma conversa rápida, de acordo com a realidade da sua empresa.</p>
        </div>

        <div className="plans__profile">
          <span>Qual é o seu perfil?</span>
          <div role="radiogroup" aria-label="Seu perfil">
            {tiers.map((t, i) => (
              <button key={t.id} type="button" role="radio" aria-checked={i === picked} className={i === picked ? 'is-on' : ''} onClick={() => setPicked(i)}>
                {t.profile}
              </button>
            ))}
          </div>
        </div>

        <div className="plans__grid">
          {tiers.map((t, i) => {
            const on = i === picked
            return (
              <article
                key={t.id}
                className={`plan ${on ? 'is-on' : ''}`}
                style={{ '--i': i } as CSSProperties}
                onClick={() => setPicked(i)}
              >
                {on && <span className="plan__badge">Indicado para você</span>}
                {!on && t.featured && <span className="plan__badge plan__badge--soft">Mais escolhido</span>}
                <span className="plan__icon"><Icon name={t.icon} size={24} /></span>
                <h3>{t.name}</h3>
                <p className="plan__audience">{t.audience}</p>
                <ul className="plan__list">
                  {features.map((f) => {
                    const has = f.values[i]
                    return (
                      <li key={f.label} className={has ? '' : 'is-off'}>
                        <Icon name={has ? 'check' : 'minus'} size={16} />
                        <span>{f.label}{!has && <span className="sr"> (não incluso)</span>}</span>
                      </li>
                    )
                  })}
                  <li className="plan__support"><Icon name="users" size={16} /> <span>{t.support}</span></li>
                </ul>
                <a
                  className={`btn ${on ? 'btn--primary hero__btn' : 'plan__btn'}`}
                  href={whatsappUrl(`Olá! Tenho interesse no plano ${t.name} da Conceito e gostaria de uma proposta.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Quero o plano {t.name} <Icon name="arrow" size={16} />
                </a>
              </article>
            )
          })}
        </div>

        <p className="plans__extra">
          <Icon name="plus" size={16} /> Folha de pagamento, certificado digital, abertura de empresa e registro de marca podem ser
          incluídos em qualquer plano.
        </p>
      </div>
    </section>
  )
}
