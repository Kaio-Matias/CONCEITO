import { useState, type FormEvent } from 'react'
import { COMPANY } from '../data/content'
import { submitLead } from '../services/leads'
import { Icon } from './Icon'
import { LogoMark } from './Logo'

const NEEDS = [
  'Abrir uma empresa / MEI',
  'Trocar de contador',
  'Contabilidade e planejamento tributário',
  'BPO financeiro',
  'Departamento pessoal',
  'Crédito e cobrança',
  'Outro assunto',
]

function maskPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function Contact() {
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setBusy(true)
    await submitLead({
      name: String(f.get('name')),
      phone: String(f.get('phone')),
      company: String(f.get('company') || ''),
      need: String(f.get('need')),
    })
    setBusy(false)
    setSent(true)
  }

  return (
    <section className="contact" id="contato">
      <div className="hero__bg" aria-hidden="true"><span className="ring ring--2" /><span className="ring ring--3" /></div>
      <div className="container contact__grid">
        <div className="contact__copy">
          <p className="eyebrow eyebrow--light"><span /> Vamos conversar</p>
          <h2>Pronto para transformar sua contabilidade em resultado?</h2>
          <p className="lead">Agende agora uma conversa gratuita com nossos especialistas.</p>
          <ul className="contact__list">
            <li><Icon name="phone" size={20} /><div><small>Telefone / WhatsApp</small><a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer">{COMPANY.phone}</a></div></li>
            <li><Icon name="mail" size={20} /><div><small>E-mail</small><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></div></li>
            <li><Icon name="instagram" size={20} /><div><small>Redes sociais</small><a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer">{COMPANY.instagram}</a></div></li>
          </ul>
        </div>

        <form className="form" onSubmit={onSubmit} noValidate={false}>
          <div className="form__head">
            <LogoMark size={40} />
            <div>
              <strong>Diagnóstico gratuito</strong>
              <small>Leva menos de 1 minuto</small>
            </div>
          </div>
          <label>Seu nome
            <input name="name" required autoComplete="name" placeholder="Como podemos te chamar?" />
          </label>
          <label>WhatsApp
            <input name="phone" required inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" value={phone} onChange={(e) => setPhone(maskPhone(e.target.value))} minLength={14} />
          </label>
          <label>Empresa <span className="opt">(opcional)</span>
            <input name="company" autoComplete="organization" placeholder="Nome da empresa" />
          </label>
          <label>Do que você precisa?
            <select name="need" required defaultValue="">
              <option value="" disabled>Selecione…</option>
              {NEEDS.map((n) => <option key={n}>{n}</option>)}
            </select>
          </label>
          <button className="btn btn--primary btn--lg" disabled={busy}>
            <Icon name="whatsapp" size={18} /> Quero uma proposta
          </button>
          <p className="form__note" role="status">
            {sent
              ? 'Pronto! Abrimos o WhatsApp com sua mensagem — é só enviar.'
              : 'Ao enviar, você continua a conversa pelo WhatsApp com nossa equipe.'}
          </p>
        </form>
      </div>
    </section>
  )
}
