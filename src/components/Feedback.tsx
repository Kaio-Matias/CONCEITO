import { useState, type CSSProperties, type FormEvent } from 'react'
import { TESTIMONIALS } from '../data/content'
import { submitFeedback } from '../services/feedback'
import { Icon } from './Icon'
import { initials } from './Team'
import { useInView } from '../hooks/useReveal'

const LABELS = ['Ruim', 'Regular', 'Bom', 'Muito bom', 'Excelente']
const GOOD_TAGS = ['Atendimento', 'Rapidez', 'Clareza', 'App', 'Impostos em dia', 'Confiança']
const IMPROVE_TAGS = ['Atendimento', 'Rapidez', 'Clareza', 'App', 'Prazos', 'Comunicação']

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="fb-stars" role="img" aria-label={`${value} de 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((n) => <Icon key={n} name="star" size={size} className={n <= value ? 'on' : ''} />)}
    </span>
  )
}

/** Card de depoimento (usado na prévia ao vivo e no mural de depoimentos reais). */
function TestimonialCard({ name, company, rating, text, preview }: { name: string; company: string; rating: number; text: string; preview?: boolean }) {
  return (
    <figure className={`fb-card ${preview ? 'fb-card--preview' : ''}`}>
      <span className="fb-card__mark" aria-hidden="true">“</span>
      <Stars value={rating} />
      <blockquote>{text}</blockquote>
      <figcaption>
        <span className="fb-card__av">{initials(name) || '?'}</span>
        <span><strong>{name}</strong><small>{company}</small></span>
      </figcaption>
    </figure>
  )
}

export function Feedback() {
  const [ref, seen] = useInView<HTMLElement>(0.1)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [state, setState] = useState<'idle' | 'sent' | 'norating'>('idle')

  const shown = hover || rating
  const happy = rating >= 4
  const tagOptions = rating && !happy ? IMPROVE_TAGS : GOOD_TAGS
  const toggleTag = (t: string) => setTags((ts) => (ts.includes(t) ? ts.filter((x) => x !== t) : [...ts, t]))

  function pickRating(n: number) {
    // ao mudar de "elogio" para "melhoria" (ou o contrário), as etiquetas mudam de sentido
    if ((n >= 4) !== (rating >= 4)) setTags([])
    setRating(n)
    setState('idle')
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!rating) { setState('norating'); return }
    const f = new FormData(e.currentTarget)
    await submitFeedback({ name, company, rating, tags, message, canPublish: f.get('publish') === 'on' })
    setState('sent')
  }

  const question = !rating
    ? 'Como você avalia a Conceito?'
    : happy ? 'Que bom! O que você mais gosta?' : 'Poxa! O que podemos melhorar?'

  return (
    <section className={`section fb reveal ${seen ? 'is-in' : ''}`} id="feedback" ref={ref}>
      <div className="container container--wide">
        <div className="fb__head">
          <div>
            <p className="eyebrow"><span /> Clientes Conceito</p>
            <h2>Já é nosso cliente? <em>Sua opinião faz diferença.</em></h2>
          </div>
          <p className="lead">Conte como está sendo a experiência. Cada feedback é lido pela nossa equipe e vira melhoria no atendimento.</p>
        </div>

        {TESTIMONIALS.length > 0 && (
          <div className="fb__wall">
            {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} name={t.name} company={`${t.role} · ${t.company}`} rating={t.rating} text={t.text} />)}
          </div>
        )}

        <div className="fb__grid">
          <form className="fb-form" onSubmit={onSubmit}>
            <fieldset className="fb-rate">
              <legend key={question} className="fb-rate__q">{question}</legend>
              <div className="fb-rate__stars" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button type="button" key={n} aria-label={`${n} — ${LABELS[n - 1]}`} aria-pressed={rating === n}
                    className={n <= shown ? 'on' : ''} style={{ '--n': n } as CSSProperties}
                    onMouseEnter={() => setHover(n)} onClick={() => pickRating(n)}>
                    <Icon name="star" size={34} />
                  </button>
                ))}
                <span className="fb-rate__label">{shown ? LABELS[shown - 1] : 'Toque nas estrelas'}</span>
              </div>
            </fieldset>

            {rating > 0 && (
              <div className="fb-tags" role="group" aria-label={happy ? 'O que você mais gosta' : 'O que podemos melhorar'}>
                {tagOptions.map((t) => (
                  <button key={t} type="button" aria-pressed={tags.includes(t)} className={tags.includes(t) ? 'is-on' : ''} onClick={() => toggleTag(t)}>
                    {tags.includes(t) && <Icon name="check" size={14} />} {t}
                  </button>
                ))}
              </div>
            )}

            <div className="fb-form__two">
              <label>Seu nome
                <input name="name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label>Empresa
                <input name="company" required autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} />
              </label>
            </div>
            <label>Seu feedback
              <textarea name="message" required rows={4} minLength={10} value={message} onChange={(e) => setMessage(e.target.value)}
                placeholder={happy || !rating ? 'Conte como a Conceito ajuda a sua empresa…' : 'Conte o que aconteceu e como podemos melhorar…'} />
            </label>
            <label className="fb-check">
              <input type="checkbox" name="publish" />
              <span>Autorizo a Conceito a publicar meu nome, empresa e depoimento no site.</span>
            </label>
            <button className="btn btn--primary btn--lg hero__btn"><Icon name="whatsapp" size={18} /> Enviar feedback</button>
            <p className="fb-form__note" role="status">
              {state === 'sent' && 'Obrigado! Abrimos o WhatsApp com o seu feedback — é só tocar em enviar. 💙'}
              {state === 'norating' && 'Escolha uma nota de 1 a 5 estrelas antes de enviar.'}
              {state === 'idle' && 'O feedback é enviado pelo WhatsApp direto para a nossa equipe.'}
            </p>
          </form>

          <div className="fb__preview" aria-hidden="true">
            <p className="fb__preview-label"><Icon name="eye" size={16} /> Prévia do seu depoimento</p>
            <TestimonialCard
              preview
              name={name || 'Seu nome'}
              company={company || 'Sua empresa'}
              rating={rating || 5}
              text={message || 'Seu depoimento aparece aqui enquanto você escreve. Com a sua autorização, ele pode ir para o mural do site.'}
            />
            <p className="fb__preview-note">Depoimentos só são publicados com autorização e depois de revisados pela nossa equipe.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
