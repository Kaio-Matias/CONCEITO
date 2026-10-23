import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { whatsappUrl } from '../services/leads'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
const brlShort = (n: number) => (n >= 1000 ? `R$ ${(n / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} mil` : brl(n))

// Premissas de referência da Conceito (as mesmas da seção Resultados).
const TAX_SAVING = 0.25
const TIME_SAVING = 0.4
const DEFAULT_BURDEN = 8

const REVENUE_PRESETS = [10000, 30000, 60000, 100000, 300000]

/** Número que "corre" até o novo valor sempre que ele muda. */
function useTween(target: number, ms = 600) {
  const [v, setV] = useState(target)
  const from = useRef(target)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(target); return }
    const start = from.current
    const t0 = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min((t - t0) / ms, 1)
      const val = start + (target - start) * (1 - Math.pow(1 - p, 3))
      from.current = val
      setV(val)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, ms])
  return v
}

/** Controle deslizante com a parte preenchida colorida. */
function Range({ value, min, max, step, onChange, label }: { value: number; min: number; max: number; step: number; onChange: (v: number) => void; label: string }) {
  const fill = ((value - min) / (max - min)) * 100
  return (
    <input type="range" className="calc__range" aria-label={label} min={min} max={max} step={step} value={value}
      style={{ '--fill': `${fill}%` } as CSSProperties} onChange={(e) => onChange(+e.target.value)} />
  )
}

export function Simulator() {
  const [ref, seen] = useInView<HTMLElement>(0.15)
  const [revenue, setRevenue] = useState(60000)
  const [burden, setBurden] = useState(DEFAULT_BURDEN)
  const [hours, setHours] = useState(20)

  const taxYear = revenue * 12 * (burden / 100)
  const savingYear = taxYear * TAX_SAVING
  const hoursFreed = Math.round(hours * 4 * TIME_SAVING)

  const vYear = useTween(savingYear)
  const vMonth = useTween(savingYear / 12)
  const vHours = useTween(hoursFreed)
  const days = Math.round(vHours / 8)
  const afterPct = (1 - TAX_SAVING) * 100

  const msg = `Olá! Fiz a simulação no site da Conceito (faturamento mensal ${brl(revenue)}, impostos de ${burden}% e ${hours}h por semana com burocracia) e quero conversar com um contador.`

  return (
    <section className={`section calc ${seen ? 'is-in' : ''}`} id="simulador" ref={ref}>
      <div className="container container--wide calc__grid">
        <div className="calc__intro">
          <p className="eyebrow"><span /> Simulador</p>
          <h2>Quanto sua empresa pode <em>economizar?</em></h2>
          <p className="lead">Responda três perguntas rápidas e veja uma estimativa de quanto dinheiro e quanto tempo sobram com a contabilidade da Conceito.</p>

          <div className="calc__form">
            <div className="calc__q">
              <div className="calc__qhead">
                <span><b>1</b> Quanto sua empresa fatura por mês?</span>
                <output>{brl(revenue)}</output>
              </div>
              <Range label="Faturamento mensal" value={revenue} min={5000} max={500000} step={5000} onChange={setRevenue} />
              <div className="calc__chips">
                {REVENUE_PRESETS.map((p) => (
                  <button key={p} type="button" className={revenue === p ? 'is-on' : ''} onClick={() => setRevenue(p)}>{brlShort(p)}</button>
                ))}
              </div>
            </div>

            <div className="calc__q">
              <div className="calc__qhead">
                <span><b>2</b> Quanto do faturamento vai para impostos?</span>
                <output>{burden.toLocaleString('pt-BR')}%</output>
              </div>
              <Range label="Percentual de impostos" value={burden} min={2} max={25} step={0.5} onChange={setBurden} />
              <p className="calc__hint">
                Não sabe? <button type="button" onClick={() => setBurden(DEFAULT_BURDEN)}>Use o valor sugerido ({DEFAULT_BURDEN}%)</button>
              </p>
            </div>

            <div className="calc__q">
              <div className="calc__qhead">
                <span><b>3</b> Quantas horas por semana você gasta com papelada?</span>
                <output>{hours}h</output>
              </div>
              <Range label="Horas por semana com rotinas administrativas" value={hours} min={2} max={60} step={1} onChange={setHours} />
            </div>
          </div>
        </div>

        <div className="calc__result" aria-live="polite">
          <span className="calc__pattern" aria-hidden="true" />
          <p className="calc__label">Sua estimativa com a Conceito</p>

          <div className="calc__big">
            <small>Economia em impostos por ano</small>
            <strong>{brl(vYear)}</strong>
            <span>≈ {brl(vMonth)} a mais no caixa todo mês</span>
          </div>

          <div className="calc__compare" aria-hidden="true">
            <div>
              <small>Impostos hoje</small>
              <span className="calc__bar calc__bar--now"><i style={{ width: '100%' }} /></span>
              <em>{brlShort(taxYear)}/ano</em>
            </div>
            <div>
              <small>Com a Conceito</small>
              <span className="calc__bar"><i style={{ width: `${afterPct}%` }} /></span>
              <em>{brlShort(taxYear - savingYear)}/ano</em>
            </div>
          </div>

          <div className="calc__time">
            <span className="calc__time-icon"><Icon name="clock" size={22} /></span>
            <div>
              <strong>{Math.round(vHours)} horas livres por mês</strong>
              <small>≈ {days} {days === 1 ? 'dia' : 'dias'} de trabalho para cuidar do que importa</small>
            </div>
          </div>

          <a className="btn btn--lg calc__cta" href={whatsappUrl(msg)} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={18} /> Validar com um contador
          </a>
          <p className="calc__note">
            Estimativa ilustrativa, baseada nos resultados de referência da Conceito (até 25% de economia em impostos e 40%
            menos tempo com burocracia). O valor real depende do regime e da atividade — confirmamos numa conversa.
          </p>
        </div>
      </div>
    </section>
  )
}
