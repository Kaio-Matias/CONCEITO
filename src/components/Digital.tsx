import { DIGITAL_FEATURES } from '../data/content'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

function Phone() {
  return (
    <div className="phone" aria-hidden="true">
      <div className="phone__notch" />
      <div className="phone__screen">
        <div className="phone__top">
          <small>Olá, bem-vindo 👋</small>
          <strong>Sua empresa hoje</strong>
        </div>
        <div className="phone__card">
          <small>Status das obrigações</small>
          <strong>Tudo em dia</strong>
          <div className="phone__progress"><span /></div>
        </div>
        <div className="phone__tiles">
          <div><Icon name="file-text" size={18} /><span>Enviar documento</span></div>
          <div><Icon name="whatsapp" size={18} /><span>Abrir chamado</span></div>
          <div><Icon name="bar-chart" size={18} /><span>Relatórios</span></div>
          <div><Icon name="landmark" size={18} /><span>Conta digital</span></div>
        </div>
        <div className="phone__ticket">
          <i /> Chamado #— em andamento
        </div>
      </div>
    </div>
  )
}

export function Digital() {
  const [ref, seen] = useInView<HTMLElement>(0.15)
  return (
    <section className={`section digital reveal ${seen ? 'is-in' : ''}`} id="digital" ref={ref}>
      <div className="container digital__grid">
        <div className="digital__visual">
          <span className="digital__glow" aria-hidden="true" />
          <Phone />
        </div>
        <div>
          <p className="eyebrow"><span /> 100% digital</p>
          <h2>Sua empresa na palma da mão: documentos, relatórios e suporte a um toque de distância.</h2>
          <p className="lead">
            Na Conceito Business, a tecnologia não é um diferencial — é a base de tudo. Eliminamos
            completamente o papel dos nossos processos, garantindo agilidade, segurança e
            rastreabilidade em cada interação.
          </p>
          <ul className="features">
            {DIGITAL_FEATURES.map((f) => (
              <li key={f.title}>
                <span><Icon name={f.icon} size={22} /></span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
