import { SEGMENTS } from '../data/content'
import { Icon } from './Icon'

function PortalMock() {
  const bars = [38, 52, 44, 61, 58, 74, 82]
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock__chrome">
        <i /><i /><i />
        <span>portal.conceito — visão geral</span>
      </div>
      <div className="mock__body">
        <div className="mock__row">
          <div className="mock__stat">
            <small>Obrigações do mês</small>
            <strong>100% em dia</strong>
            <div className="mock__pill"><Icon name="check" size={12} /> Sem pendências</div>
          </div>
          <div className="mock__stat">
            <small>Economia tributária</small>
            <strong>+25%</strong>
            <div className="mock__pill mock__pill--blue">Planejamento ativo</div>
          </div>
        </div>
        <div className="mock__chart">
          <div className="mock__chart-head">
            <span>Fluxo de caixa</span>
            <em>últimos 7 meses</em>
          </div>
          <div className="mock__bars">
            {bars.map((h, i) => (
              <span key={i} style={{ height: `${h}%`, animationDelay: `${0.5 + i * 0.08}s` }} />
            ))}
          </div>
        </div>
        <ul className="mock__list">
          <li><Icon name="file-text" size={16} /> Relatório gerencial disponível <b>novo</b></li>
          <li><Icon name="smartphone" size={16} /> Chamado respondido pelo seu gestor <b>2 min</b></li>
        </ul>
      </div>
      <div className="mock__float mock__float--a"><Icon name="landmark" size={18} /> Conta digital <b>Grátis</b></div>
      <div className="mock__float mock__float--b"><Icon name="shield-check" size={18} /> Conformidade <b>100%</b></div>
      <p className="mock__note">Prévia ilustrativa da plataforma</p>
    </div>
  )
}

export function Hero() {
  return (
    <section className="hero" id="topo">
      <div className="hero__bg" aria-hidden="true">
        <span className="ring ring--1" /><span className="ring ring--2" /><span className="ring ring--3" />
      </div>
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow eyebrow--light"><span /> Conceito Business · 2026</p>
          <h1>
            Soluções inteligentes,<br />
            <em>resultados reais.</em>
          </h1>
          <p className="hero__lead">
            O ecossistema completo para o crescimento do seu negócio: contabilidade, finanças,
            pessoal, crédito e banco digital — 100% digital e com gestor de conta dedicado.
          </p>
          <div className="hero__cta">
            <a href="#contato" className="btn btn--primary btn--lg">
              Quero meu diagnóstico gratuito <Icon name="arrow" size={18} />
            </a>
            <a href="#solucoes" className="btn btn--outline btn--lg">Conhecer as soluções</a>
          </div>
          <ul className="hero__proof">
            <li><Icon name="check" size={16} /> Sem papel, sem burocracia</li>
            <li><Icon name="check" size={16} /> Migração assistida</li>
            <li><Icon name="check" size={16} /> Conta digital gratuita</li>
          </ul>
        </div>
        <PortalMock />
      </div>
      <div className="marquee" aria-label="Segmentos atendidos">
        <div className="marquee__track">
          {[...SEGMENTS, ...SEGMENTS, ...SEGMENTS].map((s, i) => (
            <span key={i}>{s}<i /></span>
          ))}
        </div>
      </div>
    </section>
  )
}
