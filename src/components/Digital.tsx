import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { CLIENT_APP } from '../services/clientArea'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

/** Recursos do app, cada um ligado à tela real publicada nas lojas. */
const FEATURES = [
  { icon: 'monitor', title: 'Painel da empresa', text: 'Faturamento e atalhos assim que você abre o app.', src: '/app/tela-1.webp' },
  { icon: 'file-text', title: 'Guias de impostos', text: 'Valores e vencimentos prontos para pagar, sem atraso.', src: '/app/tela-2.webp' },
  { icon: 'folder', title: 'Documentos', text: 'Envie e receba documentos em um só lugar.', src: '/app/tela-3.webp' },
  { icon: 'message', title: 'Chat com a equipe', text: 'Tire dúvidas direto com a sua contabilidade.', src: '/app/tela-4.webp' },
  { icon: 'list', title: 'Seus processos', text: 'Acompanhe cada pedido e guia em tempo real.', src: '/app/tela-5.webp' },
  { icon: 'bell', title: 'Avisos importantes', text: 'Comunicados e lembretes de prazo no celular.', src: '/app/tela-6.webp' },
  { icon: 'receipt', title: 'Notas fiscais', text: 'Seus arquivos XML organizados, com relatórios.', src: '/app/tela-7.webp' },
]

const STEP_MS = 4500
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function Digital() {
  const [ref, seen] = useInView<HTMLElement>(0.2)
  const [active, setActive] = useState(0)
  const [hold, setHold] = useState(false)
  const deck = useRef<HTMLDivElement>(null)
  const n = FEATURES.length

  // Avança sozinho enquanto a seção está na tela e ninguém está interagindo.
  useEffect(() => {
    if (!seen || hold || reduced()) return
    const t = setTimeout(() => setActive((a) => (a + 1) % n), STEP_MS)
    return () => clearTimeout(t)
  }, [seen, hold, active, n])

  function tilt(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse') return
    const el = deck.current!
    const r = el.getBoundingClientRect()
    el.style.setProperty('--tx', (((e.clientX - r.left) / r.width) - 0.5).toFixed(3))
    el.style.setProperty('--ty', (((e.clientY - r.top) / r.height) - 0.5).toFixed(3))
  }
  function untilt() {
    deck.current?.style.setProperty('--tx', '0')
    deck.current?.style.setProperty('--ty', '0')
    setHold(false)
  }

  return (
    <section className={`section digital reveal ${seen ? 'is-in' : ''}`} id="digital" ref={ref}>
      <div className="container container--wide digital__grid">
        <div className="digital__copy">
          <p className="eyebrow"><span /> App Conceito Negócios</p>
          <h2>Sua contabilidade <em>na palma da mão.</em></h2>
          <p className="lead">
            Pelo app ou pelo computador, você acompanha tudo o que fazemos pela sua empresa — a qualquer hora,
            sem papel e sem precisar ligar.
          </p>

          <ol className="app-feats" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
            {FEATURES.map((f, i) => {
              const on = i === active
              return (
                <li key={f.title} className={on ? 'is-on' : ''}>
                  <button type="button" aria-pressed={on} onClick={() => setActive(i)}>
                    <span className="app-feats__icon"><Icon name={f.icon} size={20} /></span>
                    <span className="app-feats__txt"><strong>{f.title}</strong><small>{f.text}</small></span>
                  </button>
                  {on && (
                    <span
                      key={active}
                      className={`app-feats__bar ${hold || !seen ? 'is-paused' : ''}`}
                      style={{ animationDuration: `${STEP_MS}ms` }}
                      aria-hidden="true"
                    />
                  )}
                </li>
              )
            })}
          </ol>

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
              <span><small>Ou acesse pelo</small>Portal web</span>
            </a>
          </div>
        </div>

        <div
          className="app-deck"
          ref={deck}
          onPointerMove={tilt}
          onPointerEnter={() => setHold(true)}
          onPointerLeave={untilt}
        >
          <span className="app-deck__glow" aria-hidden="true" />
          {FEATURES.map((f, i) => {
            const off = (i - active + n) % n
            return (
              <img
                key={f.src}
                src={f.src}
                alt={off === 0 ? `Tela do app: ${f.title}` : ''}
                aria-hidden={off !== 0}
                className={`app-deck__card ${off > 2 ? 'is-hidden' : ''}`}
                style={{ '--o': Math.min(off, 3) } as CSSProperties}
                loading={i < 2 ? 'eager' : 'lazy'}
                width={720}
                height={1558}
                onClick={() => setActive(i)}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
