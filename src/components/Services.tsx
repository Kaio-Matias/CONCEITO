import type { MouseEvent } from 'react'
import { SERVICES } from '../data/content'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

function spotlight(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export function Services() {
  const [ref, seen] = useInView<HTMLElement>(0.1)
  return (
    <section className={`section services reveal ${seen ? 'is-in' : ''}`} id="solucoes" ref={ref}>
      <div className="container">
        <div className="section__head section__head--split">
          <div>
            <p className="eyebrow eyebrow--light"><span /> Soluções</p>
            <h2>8 soluções integradas para cada fase da sua empresa</h2>
          </div>
          <p className="lead">
            Um portfólio completo, estruturado para empresas em diferentes estágios de maturidade —
            do empreendedor que está começando ao empresário que busca escalar com segurança.
          </p>
        </div>
        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <a href="#contato" key={s.title} className="svc" onMouseMove={spotlight} style={{ transitionDelay: `${(i % 4) * 70}ms` }}>
              <span className="svc__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="svc__icon"><Icon name={s.icon} size={24} /></span>
              <h3>{s.title}{s.title === 'Registro de Marcas' && <sup>™</sup>}</h3>
              <p>{s.text}</p>
              <span className="svc__more">Saber mais <Icon name="arrow-up-right" size={16} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
