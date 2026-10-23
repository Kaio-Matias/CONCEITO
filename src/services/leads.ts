import { COMPANY } from '../data/content'
import { track } from './analytics'

export interface Lead {
  name: string
  phone: string
  company?: string
  need: string
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`
}

/**
 * Ponto único de captura de leads.
 * Hoje abre o WhatsApp com a mensagem pronta; quando o backend existir,
 * basta trocar o corpo desta função por um POST para a API.
 */
export async function submitLead(lead: Lead) {
  track('generate_lead', { method: 'formulario_contato', need: lead.need })
  window.open(whatsappUrl(leadMessage(lead)), '_blank', 'noopener')
}

/** Texto enviado pelo formulário de contato (também mostrado como prévia antes do envio). */
export function leadMessage(lead: Lead) {
  return [
    'Olá! Vim pelo site da Conceito Business e gostaria de uma proposta.',
    `Nome: ${lead.name}`,
    lead.company ? `Empresa: ${lead.company}` : '',
    `Preciso de: ${lead.need}`,
    `Meu WhatsApp: ${lead.phone}`,
  ].filter(Boolean).join('\n')
}
