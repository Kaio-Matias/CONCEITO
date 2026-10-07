import { COMPANY } from '../data/content'

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
  const msg = [
    'Olá! Vim pelo site da Conceito Business e quero um diagnóstico gratuito.',
    `Nome: ${lead.name}`,
    lead.company ? `Empresa: ${lead.company}` : '',
    `Preciso de: ${lead.need}`,
    `Meu WhatsApp: ${lead.phone}`,
  ].filter(Boolean).join('\n')
  window.open(whatsappUrl(msg), '_blank', 'noopener')
}
