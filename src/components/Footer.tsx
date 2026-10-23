import { Link } from 'react-router-dom'
import { goClient } from '../services/clientArea'
import { whatsappUrl } from '../services/leads'
import { COMPANY, NAV, SERVICES } from '../data/content'
import { Icon } from './Icon'
import { Logo } from './Logo'
import { FloatingWhatsApp } from './FloatingWhatsApp'

const DEVELOPER = 'IL Rotulagem & Soluções'

export function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })

  return (
    <>
      <footer className="footer">
        <span className="footer__pattern" aria-hidden="true" />
        <div className="container container--wide">
          <div className="footer__grid">
            <div className="footer__brand">
              <Logo light />
              <p>Escritório de contabilidade em Palmeira dos Índios/AL. Cuidamos dos números para você cuidar do seu negócio.</p>
              <div className="footer__social">
                <a href={whatsappUrl('Olá! Vim pelo site da Conceito.')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" size={20} /></a>
                <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Icon name="instagram" size={20} /></a>
                <a href={`mailto:${COMPANY.email}`} aria-label="E-mail"><Icon name="mail" size={20} /></a>
              </div>
            </div>

            <nav className="footer__col footer__col--nav" aria-label="Navegação do rodapé">
              <strong>Navegação</strong>
              {NAV.map((n) => <a key={n.href} href={`/${n.href}`}>{n.label}</a>)}
            </nav>

            <div className="footer__col">
              <strong>Serviços</strong>
              {SERVICES.map((s) => <a key={s.title} href="/#solucoes">{s.title}</a>)}
            </div>

            <div className="footer__col">
              <strong>Atendimento</strong>
              <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer">{COMPANY.phone}</a>
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              <a href="/cliente" onClick={goClient}>Área do cliente</a>
              <a href="/#feedback">Deixe seu feedback</a>
            </div>

            <address className="footer__col footer__office">
              <strong>Escritório</strong>
              <span>{COMPANY.address}</span>
              <span>{COMPANY.city}</span>
              <span className="footer__ids">
                <em>CNPJ {COMPANY.cnpj}</em>
                <em>{COMPANY.crc}</em>
              </span>
            </address>
          </div>

          <div className="footer__legal">
            <span>© {new Date().getFullYear()} {COMPANY.legalName}. Todos os direitos reservados.</span>
            <span className="footer__links">
              <Link to="/privacidade">Política de Privacidade</Link>
              <Link to="/cookies">Política de Cookies</Link>
            </span>
            <span className="footer__dev">Desenvolvido e mantido por <b>{DEVELOPER}</b></span>
            <button type="button" className="footer__top" onClick={toTop}>
              Voltar ao topo <Icon name="arrow" size={16} />
            </button>
          </div>
        </div>
      </footer>
      <FloatingWhatsApp />
    </>
  )
}
