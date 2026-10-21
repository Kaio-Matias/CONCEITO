import { goClient } from '../services/clientArea'
import { COMPANY, NAV } from '../data/content'
import { Logo } from './Logo'
import { FloatingWhatsApp } from './FloatingWhatsApp'

export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container footer__grid">
          <div>
            <Logo light />
            <p>{COMPANY.tagline}</p>
            <address className="footer__addr">
              <strong>{COMPANY.legalName}</strong>
              <span>CNPJ {COMPANY.cnpj}</span>
              <span>{COMPANY.crc}</span>
              <span>{COMPANY.address}</span>
              <span>{COMPANY.city}</span>
            </address>
          </div>
          <nav aria-label="Rodapé">
            {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          </nav>
          <div className="footer__contact">
            <a href="/cliente" onClick={goClient}>Área do cliente</a>
            <a href="#feedback">Deixe seu feedback</a>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer">{COMPANY.instagram}</a>
          </div>
        </div>
        <div className="container footer__legal">
          <span>© {new Date().getFullYear()} {COMPANY.legalName} · CNPJ {COMPANY.cnpj}. Todos os direitos reservados.</span>
          <span className="footer__dev">Desenvolvido por Kaio Matias Melo</span>
        </div>
      </footer>
      <FloatingWhatsApp />
    </>
  )
}
