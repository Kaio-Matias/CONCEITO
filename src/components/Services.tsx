import { useState, type CSSProperties } from 'react'
import { SERVICES } from '../data/content'
import { whatsappUrl } from '../services/leads'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

type Service = (typeof SERVICES)[number]

/** Detalhe de um serviço: o que é, o que está incluso, para quem é e a chamada para o WhatsApp. */
function Detail({ s }: { s: Service }) {
  return (
    <div className="sv-detail" key={s.title}>
      <div className="sv-detail__top">
        <span className="sv-detail__icon"><Icon name={s.icon} size={28} /></span>
        <div>
          <small>{'tag' in s && s.tag ? s.tag : s.short}</small>
          <h3>{s.title}</h3>
        </div>
      </div>
      <p className="sv-detail__text">{s.text}</p>
      <p className="sv-detail__label">O que está incluso</p>
      <ul className="sv-detail__list">
        {s.includes.map((x, i) => (
          <li key={x} style={{ animationDelay: `${0.1 + i * 0.06}s` }}><Icon name="check" size={16} /> {x}</li>
        ))}
      </ul>
      <div className="sv-detail__foot">
        <span className="sv-detail__ideal"><Icon name="users" size={16} /> Ideal para: {s.ideal}</span>
        <a className="btn btn--primary hero__btn" href={whatsappUrl(`Olá! Tenho interesse no serviço de ${s.title.toLowerCase()} da Conceito.`)} target="_blank" rel="noopener noreferrer">
          Quero esse serviço <Icon name="arrow" size={18} />
        </a>
      </div>
    </div>
  )
}

export function Services() {
  const [ref, seen] = useInView<HTMLElement>(0.1)
  const [active, setActive] = useState(0)

  return (
    <section className={`section services reveal ${seen ? 'is-in' : ''}`} id="solucoes" ref={ref}>
      <span className="services__glow" aria-hidden="true" />
      <div className="container container--wide">
        <div className="services__head">
          <div>
            <p className="eyebrow eyebrow--light"><span /> Nossos serviços</p>
            <h2>Tudo o que sua empresa precisa, <em>em um só escritório.</em></h2>
          </div>
          <p className="lead">
            Você não precisa procurar vários profissionais. Escolha um serviço para ver o que está incluso —
            e contrate só o que fizer sentido para a sua empresa.
          </p>
        </div>

        <div className="services__body">
          <ol className="sv-list">
            {SERVICES.map((s, i) => {
              const on = i === active
              return (
                <li key={s.title} className={on ? 'is-on' : ''} style={{ '--i': i } as CSSProperties}>
                  <button type="button" aria-expanded={on} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                    <span className="sv-list__n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="sv-list__icon"><Icon name={s.icon} size={20} /></span>
                    <span className="sv-list__txt"><strong>{s.title}</strong><small>{s.short}</small></span>
                    <Icon name="arrow" size={18} className="sv-list__go" />
                  </button>
                  {/* No celular, o detalhe abre logo abaixo do item (acordeão) */}
                  {on && <div className="sv-list__inline"><Detail s={s} /></div>}
                </li>
              )
            })}
          </ol>

          <div className="sv-panel" aria-live="polite">
            <span className="sv-panel__pattern" aria-hidden="true" />
            <Detail s={SERVICES[active]} />
          </div>
        </div>
      </div>
    </section>
  )
}
