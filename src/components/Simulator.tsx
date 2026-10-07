import { useState } from 'react'
import { whatsappUrl } from '../services/leads'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export function Simulator() {
  const [ref, seen] = useInView<HTMLElement>(0.15)
  const [revenue, setRevenue] = useState(60000)
  const [burden, setBurden] = useState(8)
  const [hours, setHours] = useState(20)

  // Premissas do portfólio: até 25% de economia em tributos e 40% menos tempo administrativo.
  const yearlyTax = revenue * 12 * (burden / 100)
  const saving = yearlyTax * 0.25
  const hoursFreed = Math.round(hours * 4 * 0.4)

  const msg = `Olá! Fiz a simulação no site da Conceito Business (faturamento mensal ${brl(revenue)}, carga tributária ${burden}%, ${hours}h/semana em rotinas administrativas) e quero conversar sobre o diagnóstico gratuito.`

  return (
    <section className={`section simulator reveal ${seen ? 'is-in' : ''}`} ref={ref}>
      <div className="container simulator__grid">
        <div>
          <p className="eyebrow"><span /> Simulador</p>
          <h2>Quanto sua empresa pode ganhar com uma gestão estratégica?</h2>
          <p className="lead">Ajuste os valores e veja uma estimativa do potencial de economia e de tempo liberado.</p>
        </div>
        <div className="sim">
          <div className="sim__controls">
            <label>
              <span>Faturamento mensal <b>{brl(revenue)}</b></span>
              <input type="range" min={5000} max={500000} step={5000} value={revenue} onChange={(e) => setRevenue(+e.target.value)} />
            </label>
            <label>
              <span>Carga tributária atual <b>{burden}%</b></span>
              <input type="range" min={2} max={25} step={0.5} value={burden} onChange={(e) => setBurden(+e.target.value)} />
            </label>
            <label>
              <span>Horas/semana em rotinas administrativas <b>{hours}h</b></span>
              <input type="range" min={2} max={80} step={1} value={hours} onChange={(e) => setHours(+e.target.value)} />
            </label>
          </div>
          <div className="sim__out">
            <div>
              <small>Economia potencial em tributos / ano</small>
              <strong>{brl(saving)}</strong>
            </div>
            <div>
              <small>Horas liberadas por mês</small>
              <strong>{hoursFreed}h</strong>
            </div>
            <a className="btn btn--primary" href={whatsappUrl(msg)} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} /> Validar com um especialista
            </a>
            <p>Estimativa ilustrativa baseada nos resultados de referência da Conceito (até 25% de economia tributária e 40% de redução de tempo). O valor real depende do regime e da operação — confirmamos no diagnóstico gratuito.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
