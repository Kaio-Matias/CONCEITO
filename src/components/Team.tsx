import { MEMBERS, TEAM_POINTS } from '../data/content'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

export const initials = (n: string) => n.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()

export function Team() {
  const [ref, seen] = useInView<HTMLElement>(0.15)
  return (
    <section id="equipe" className={`section team reveal ${seen ? 'is-in' : ''}`} ref={ref}>
      <div className="container team__grid">
        <div className="team__quote">
          <span className="team__mark" aria-hidden="true">“</span>
          <p>Transformamos números em estratégia, trazendo clareza para que nossos clientes possam focar no que realmente importa: crescer.</p>
        </div>
        <div>
          <p className="eyebrow"><span /> Nossa equipe</p>
          <h2>Profissionais especializados que entendem o seu negócio como ninguém</h2>
          <p className="lead">
            Nossa equipe é o nosso maior ativo: especialistas com experiência prática e estratégica em
            contabilidade, finanças e tecnologia.
          </p>
          <ul className="checks">
            {TEAM_POINTS.map((t) => (
              <li key={t}><span><Icon name="check" size={14} /></span>{t}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container">
        <ul className="members">
          {MEMBERS.map((m, i) => (
            <li key={m.area} style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="members__avatar">
                {m.photo ? <img src={m.photo} alt={m.name ?? m.area} loading="lazy" /> : m.name ? initials(m.name) : <Icon name={m.icon} size={30} />}
              </span>
              <small>{m.area}</small>
              <h3>{m.name ?? m.area}</h3>
              {m.title && <b>{m.title}</b>}
              <p>{m.role}</p>
              {m.crc && <em>{m.crc}</em>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
