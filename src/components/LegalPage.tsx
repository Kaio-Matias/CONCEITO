import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import { Footer } from './Footer'

export interface LegalSection { id: string; title: string; body: ReactNode }

interface Props {
  eyebrow: string
  title: string
  intro: ReactNode
  updated: string
  description: string
  sections: LegalSection[]
}

/** Layout das páginas legais (Privacidade e Cookies): índice lateral que acompanha a leitura. */
export function LegalPage({ eyebrow, title, intro, updated, description, sections }: Props) {
  const [active, setActive] = useState(sections[0]?.id)

  // Título e descrição da aba/busca para esta página.
  useEffect(() => {
    const prevTitle = document.title
    document.title = `${title} | Conceito Contabilidade e Negócios`
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', description)
    return () => { document.title = prevTitle; meta?.setAttribute('content', prevDesc) }
  }, [title, description])

  // Destaca no índice a seção que está sendo lida.
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) setActive(visible[0].target.id)
    }, { rootMargin: '-90px 0px -60% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [sections])

  return (
    <>
      <header className="legal-bar">
        <div className="container container--wide legal-bar__in">
          <Link to="/" className="logo" aria-label="Conceito Business — página inicial">
            <img src="/logos/logo-02.png" alt="Conceito Business" height={36} />
          </Link>
          <Link to="/" className="legal-bar__back"><Icon name="arrow" size={16} /> Voltar ao site</Link>
        </div>
      </header>

      <main className="legal">
        <div className="legal__hero">
          <div className="container container--wide">
            <p className="eyebrow eyebrow--light"><span /> {eyebrow}</p>
            <h1>{title}</h1>
            <div className="legal__intro">{intro}</div>
            <p className="legal__updated">Última atualização: {updated}</p>
          </div>
        </div>

        <div className="container container--wide legal__grid">
          <nav className="legal__toc" aria-label="Nesta página">
            <strong>Nesta página</strong>
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={active === s.id ? 'is-on' : ''}>
                    <span>{String(i + 1).padStart(2, '0')}</span> {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="legal__body">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="legal__section">
                <h2><span>{String(i + 1).padStart(2, '0')}</span> {s.title}</h2>
                {s.body}
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
