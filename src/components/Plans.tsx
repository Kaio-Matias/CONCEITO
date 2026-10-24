import { useState, type CSSProperties } from 'react'
import { PLANS } from '../data/content'
import { whatsappUrl } from '../services/leads'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

export function Plans() {
  const [ref, seen] = useInView<HTMLElement>(0.15)
  const { strip, grid, wide, all, extraNote } = PLANS
  const [picked, setPicked] = useState<string>('impulso')

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

        {/* Seletor de perfil */}
        <div className="plans__profile">
          <span>Qual é o seu perfil?</span>
          <div role="radiogroup" aria-label="Seu perfil">
            {all.map((t) => (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={picked === t.id}
                className={picked === t.id ? 'is-on' : ''}
                onClick={() => setPicked(t.id)}
              >
                {t.profile} {t.featured && '⭐'}
              </button>
            ))}
          </div>
        </div>

        {/* 1. Faixa acima dos cards: Plano Largada (MEI) */}
        <article
          className={`plan-strip ${picked === strip.id ? 'is-on' : ''}`}
          onClick={() => setPicked(strip.id)}
        >
          {picked === strip.id && <span className="plan__badge">Indicado para você</span>}
          <div className="plan-strip__main">
            <span className="plan-strip__icon"><Icon name={strip.icon} size={24} /></span>
            <div className="plan-strip__info">
              <div className="plan-strip__title-row">
                <h3>{strip.name}</h3>
                <span className="plan-strip__tag">{strip.badge}</span>
              </div>
              <p className="plan-strip__audience">{strip.audience}</p>
            </div>
          </div>

          <div className="plan-strip__features">
            {strip.features.map((f) => (
              <span key={f.label} className={`plan-strip__feature ${f.highlight ? 'plan-strip__bonus' : ''}`}>
                <Icon name={f.highlight ? 'star' : 'check'} size={15} />
                <span><strong>{f.label}:</strong> {f.detail}</span>
              </span>
            ))}
          </div>

          <div className="plan-strip__actions">
            <a
              className={`btn ${picked === strip.id ? 'btn--primary hero__btn' : 'plan__btn'}`}
              href={whatsappUrl(strip.ctaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {strip.ctaText} <Icon name="arrow" size={16} />
            </a>
          </div>
        </article>

        {/* 2, 3, 4. Cards principais (Base, Impulso ⭐, Performance) */}
        <div className="plans__grid">
          {grid.map((t, i) => {
            const on = picked === t.id
            return (
              <article
                key={t.id}
                className={`plan ${on ? 'is-on' : ''}`}
                style={{ '--i': i } as CSSProperties}
                onClick={() => setPicked(t.id)}
              >
                {on && <span className="plan__badge">Indicado para você</span>}
                {!on && t.featured && <span className="plan__badge plan__badge--soft">Mais escolhido</span>}
                <span className="plan__icon"><Icon name={t.icon} size={24} /></span>
                <h3>{t.name}</h3>
                <p className="plan__audience">{t.audience}</p>
                <ul className="plan__list">
                  {t.features.map((f) => (
                    <li key={f.label} className={f.included ? '' : 'is-off'}>
                      <Icon name={f.included ? 'check' : 'minus'} size={16} />
                      <span>
                        <strong>{f.label}:</strong> {f.detail}
                        {!f.included && <span className="sr"> (não incluso)</span>}
                      </span>
                    </li>
                  ))}
                  <li className="plan__support">
                    <Icon name="users" size={16} />
                    <span><strong>Atendimento:</strong> {t.support}</span>
                  </li>
                </ul>
                <a
                  className={`btn ${on ? 'btn--primary hero__btn' : 'plan__btn'}`}
                  href={whatsappUrl(t.ctaMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t.ctaText} <Icon name="arrow" size={16} />
                </a>
              </article>
            )
          })}
        </div>

        {/* 5. Card largo abaixo dos cards: Conceito 360 (Grandes empresas) */}
        <article
          className={`plan-wide ${picked === wide.id ? 'is-on' : ''}`}
          onClick={() => setPicked(wide.id)}
        >
          {picked === wide.id && <span className="plan__badge">Indicado para você</span>}
          <div className="plan-wide__header">
            <div className="plan-wide__title-wrap">
              <span className="plan-wide__icon"><Icon name={wide.icon} size={28} /></span>
              <div>
                <div className="plan-wide__title-row">
                  <h3>{wide.name}</h3>
                  <span className="plan-wide__badge">{wide.badge}</span>
                </div>
                <p className="plan-wide__audience">{wide.audience}</p>
              </div>
            </div>
            <a
              className={`btn ${picked === wide.id ? 'btn--primary hero__btn' : 'plan__btn'}`}
              href={whatsappUrl(wide.ctaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {wide.ctaText} <Icon name="arrow" size={16} />
            </a>
          </div>

          <div className="plan-wide__grid">
            {wide.columns?.map((col) => (
              <div key={col.title} className="plan-wide__col">
                <h4 className="plan-wide__col-title">{col.title}</h4>
                <ul className="plan-wide__list">
                  {col.items.map((item, idx) => (
                    <li key={idx}>
                      <Icon name="check" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="plan-wide__footer">
            <div className="plan-wide__support">
              <Icon name="users" size={18} />
              <span><strong>Atendimento:</strong> {wide.support}</span>
            </div>
            <div className="plan-wide__note">
              <Icon name="smartphone" size={18} />
              <span><strong>App & Portal:</strong> Acesso web e mobile corporativo</span>
            </div>
          </div>
        </article>

        <p className="plans__extra">
          <Icon name="plus" size={16} /> {extraNote}
        </p>
      </div>
    </section>
  )
}
