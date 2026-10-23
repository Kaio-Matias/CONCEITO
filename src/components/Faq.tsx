import { useMemo, useState, type CSSProperties } from 'react'
import { FAQ, FAQ_CATEGORIES } from '../data/content'
import { whatsappUrl } from '../services/leads'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

/** Minúsculas e sem acentos, para a busca encontrar "imposto" em "Impostos" e "voces" em "vocês". */
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export function Faq() {
  const [ref, seen] = useInView<HTMLElement>(0.15)
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<string | null>(null)
  const [open, setOpen] = useState<string | null>(FAQ[0].q)

  const results = useMemo(() => {
    const words = norm(query).split(/\s+/).filter(Boolean)
    return FAQ.filter((f) => (!cat || f.cat === cat) && words.every((w) => norm(`${f.q} ${f.a}`).includes(w)))
  }, [query, cat])

  const ask = query.trim()
    ? `Olá! Tenho uma dúvida: ${query.trim()}`
    : 'Olá! Tenho uma dúvida sobre os serviços da Conceito.'

  return (
    <section className={`section faq reveal ${seen ? 'is-in' : ''}`} id="faq" ref={ref}>
      <div className="container container--wide faq__grid">
        <div className="faq__side">
          <p className="eyebrow"><span /> Dúvidas frequentes</p>
          <h2>Perguntas que <em>sempre ouvimos.</em></h2>
          <p className="lead">Procure a sua dúvida abaixo. Se não encontrar, pergunte direto para a nossa equipe.</p>

          <label className="faq__search">
            <span className="sr">Buscar uma dúvida</span>
            <Icon name="search" size={20} />
            <input type="search" placeholder="Ex.: trocar de contador, MEI, imposto…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>

          <div className="faq__cats" role="radiogroup" aria-label="Filtrar por assunto">
            <button type="button" role="radio" aria-checked={cat === null} className={cat === null ? 'is-on' : ''} onClick={() => setCat(null)}>Todas</button>
            {FAQ_CATEGORIES.map((c) => (
              <button key={c} type="button" role="radio" aria-checked={cat === c} className={cat === c ? 'is-on' : ''} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>

          <div className="faq__help">
            <span className="faq__help-icon"><Icon name="message" size={22} /></span>
            <div>
              <strong>Não encontrou o que procurava?</strong>
              <small>Nossa equipe responde pelo WhatsApp.</small>
            </div>
            <a className="btn btn--primary hero__btn" href={whatsappUrl(ask)} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} /> Perguntar
            </a>
          </div>
        </div>

        <div className="faq__list" aria-live="polite">
          {results.map((f, i) => {
            const isOpen = open === f.q
            const id = `faq-${FAQ.indexOf(f)}`
            return (
              <div key={f.q} className={`qa ${isOpen ? 'is-open' : ''}`} style={{ '--i': i } as CSSProperties}>
                <button type="button" className="qa__q" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? null : f.q)}>
                  <span className="qa__cat">{f.cat}</span>
                  <span className="qa__text">{f.q}</span>
                  <span className="qa__icon" aria-hidden="true"><Icon name="plus" size={18} /></span>
                </button>
                <div className="qa__a" id={id} role="region">
                  <p>{f.a}</p>
                </div>
              </div>
            )
          })}

          {results.length === 0 && (
            <div className="faq__empty">
              <strong>Nenhuma resposta para “{query}”.</strong>
              <p>Sem problema: envie a sua pergunta e a nossa equipe responde.</p>
              <a className="btn btn--primary hero__btn" href={whatsappUrl(ask)} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" size={18} /> Enviar minha pergunta
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
