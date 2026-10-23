import { useState, type FormEvent } from 'react'
import { COMPANY, SERVICES } from '../data/content'
import { leadMessage, submitLead } from '../services/leads'
import { Icon } from './Icon'
import { useInView } from '../hooks/useReveal'

// As mesmas opções da seção de serviços, mais "Outro assunto".
const NEEDS = ['Trocar de contador', ...SERVICES.map((s) => s.title), 'Outro assunto']

function maskPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

const mapsUrl = COMPANY.mapsUrl
const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(COMPANY.mapsPlace)}&ll=${COMPANY.mapsCoords}&z=17&output=embed`

export function Contact() {
  const [ref, seen] = useInView<HTMLElement>(0.1)
  const [need, setNeed] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [sent, setSent] = useState(false)
  const [noNeed, setNoNeed] = useState(false)

  const preview = leadMessage({
    name: name || 'Seu nome',
    phone: phone || '(00) 00000-0000',
    company,
    need: need || 'escolha acima',
  })

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!need) { setNoNeed(true); return }
    await submitLead({ name, phone, company, need })
    setSent(true)
  }

  return (
    <section className={`section contact reveal ${seen ? 'is-in' : ''}`} id="contato" ref={ref}>
      <span className="contact__glow" aria-hidden="true" />
      <div className="container container--wide contact__grid">
        <div className="contact__copy">
          <p className="eyebrow eyebrow--light"><span /> Fale conosco</p>
          <h2>Vamos conversar sobre <em>a sua empresa?</em></h2>
          <p className="lead">Conte do que você precisa. A primeira conversa é sem compromisso e você fala direto com a nossa equipe.</p>

          <ul className="contact__channels">
            <li>
              <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <span className="contact__icon contact__icon--wa"><Icon name="whatsapp" size={22} /></span>
                <span><small>WhatsApp</small>{COMPANY.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`}>
                <span className="contact__icon"><Icon name="mail" size={22} /></span>
                <span><small>E-mail</small>{COMPANY.email}</span>
              </a>
            </li>
            <li>
              <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer">
                <span className="contact__icon"><Icon name="instagram" size={22} /></span>
                <span><small>Instagram</small>{COMPANY.instagram}</span>
              </a>
            </li>
          </ul>

          <div className="contact__office">
            <div className="contact__map">
              <iframe title="Mapa do escritório da Conceito" src={mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <div className="contact__address">
              <span className="contact__icon"><Icon name="landmark" size={22} /></span>
              <span><small>Escritório</small>{COMPANY.address}<br />{COMPANY.city}</span>
              <a className="contact__route" href={mapsUrl} target="_blank" rel="noopener noreferrer">Como chegar <Icon name="arrow-up-right" size={16} /></a>
            </div>
          </div>
        </div>

        <form className="lead-form" onSubmit={onSubmit}>
          <div className="lead-form__head">
            <strong>Peça uma proposta</strong>
            <small>Leva menos de 1 minuto · respondemos pelo WhatsApp</small>
          </div>

          <fieldset className="lead-form__needs">
            <legend><b>1</b> Do que você precisa?</legend>
            <div>
              {NEEDS.map((n) => (
                <button key={n} type="button" aria-pressed={need === n} className={need === n ? 'is-on' : ''} onClick={() => { setNeed(n); setNoNeed(false) }}>
                  {need === n && <Icon name="check" size={14} />} {n}
                </button>
              ))}
            </div>
            {noNeed && <p className="lead-form__err" role="alert">Escolha uma opção para continuar.</p>}
          </fieldset>

          <fieldset className="lead-form__data">
            <legend><b>2</b> Seus dados</legend>
            <label>Seu nome
              <input name="name" required autoComplete="name" placeholder="Como podemos te chamar?" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <div className="lead-form__two">
              <label>WhatsApp
                <input name="phone" required inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" minLength={14} value={phone} onChange={(e) => setPhone(maskPhone(e.target.value))} />
              </label>
              <label>Empresa <span className="opt">(opcional)</span>
                <input name="company" autoComplete="organization" placeholder="Nome da empresa" value={company} onChange={(e) => setCompany(e.target.value)} />
              </label>
            </div>
          </fieldset>

          <div className="lead-form__preview" aria-hidden="true">
            <small><Icon name="eye" size={14} /> Mensagem que será enviada</small>
            <p className="lead-form__bubble">{preview}</p>
          </div>

          <button className="btn btn--lg lead-form__send"><Icon name="whatsapp" size={18} /> Enviar pelo WhatsApp</button>
          <p className="lead-form__note" role="status">
            {sent ? 'Pronto! Abrimos o WhatsApp com a sua mensagem — é só tocar em enviar.' : 'Seus dados são usados apenas para responder ao seu contato.'}
          </p>
        </form>
      </div>
    </section>
  )
}
