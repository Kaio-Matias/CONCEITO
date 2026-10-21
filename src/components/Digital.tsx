import { useEffect, useState } from 'react'
import { DIGITAL_FEATURES } from '../data/content'
import { CLIENT_APP } from '../services/clientArea'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

const SHOTS = [
  { src: '/app/tela-1.webp', alt: 'Tela inicial do app Conceito Negócios com faturamento e atalhos' },
  { src: '/app/tela-2.webp', alt: 'Guias pendentes com valores e vencimentos' },
  { src: '/app/tela-3.webp', alt: 'Central de documentos compartilhados com a contabilidade' },
  { src: '/app/tela-4.webp', alt: 'Chat direto com a contabilidade' },
  { src: '/app/tela-5.webp', alt: 'Acompanhamento de processos e guias' },
  { src: '/app/tela-6.webp', alt: 'Notificações e comunicados fiscais' },
  { src: '/app/tela-7.webp', alt: 'Central de arquivos XML com indicadores' },
]

/** Telas reais do app (as mesmas publicadas na Play Store e App Store). */
function AppShots() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = SHOTS.length

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((v) => (v + 1) % n), 3800)
    return () => clearInterval(t)
  }, [paused, n])

  return (
    <div className="shots" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="shots__stage">
        {SHOTS.map((s, k) => {
          const off = ((k - i + n) % n)
          const pos = off === 0 ? 'is-active' : off === 1 ? 'is-next' : off === n - 1 ? 'is-prev' : 'is-hidden'
          return (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              className={`shots__img ${pos}`}
              loading={k < 2 ? 'eager' : 'lazy'}
              width={720}
              height={1558}
              onClick={() => setI(k)}
              aria-hidden={off !== 0}
            />
          )
        })}
      </div>
      <div className="shots__nav">
        <button type="button" aria-label="Tela anterior" onClick={() => setI((v) => (v - 1 + n) % n)}><Icon name="arrow" size={16} /></button>
        <div className="shots__dots">
          {SHOTS.map((s, k) => (
            <button key={s.src} type="button" aria-label={`Ver tela ${k + 1}`} aria-current={k === i} className={k === i ? 'is-on' : ''} onClick={() => setI(k)} />
          ))}
        </div>
        <button type="button" aria-label="Próxima tela" onClick={() => setI((v) => (v + 1) % n)}><Icon name="arrow" size={16} /></button>
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
          <AppShots />
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
          <div className="stores">
            <a className="stores__btn" href={CLIENT_APP.playStore} target="_blank" rel="noopener noreferrer">
              <img src="/app/icone.png" alt="" width={28} height={28} />
              <span><small>Disponível no</small>Google Play</span>
            </a>
            <a className="stores__btn" href={CLIENT_APP.appStore} target="_blank" rel="noopener noreferrer">
              <img src="/app/icone.png" alt="" width={28} height={28} />
              <span><small>Baixar na</small>App Store</span>
            </a>
            <a className="stores__btn stores__btn--web" href={CLIENT_APP.portal} target="_blank" rel="noopener noreferrer">
              <Icon name="monitor" size={22} />
              <span><small>Acesse pelo</small>Portal web</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
