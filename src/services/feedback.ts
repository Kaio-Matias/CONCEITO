import { whatsappUrl } from './leads'

export interface Feedback {
  name: string
  company: string
  rating: number
  tags: string[]
  message: string
  canPublish: boolean
}

/**
 * Ponto único de envio de feedback.
 * Abre o WhatsApp da Conceito com o feedback formatado (o cliente só toca em enviar).
 * Quando o backend existir, troque o corpo por um POST /feedback — o depoimento só vai ao ar após aprovação.
 */
export async function submitFeedback(fb: Feedback) {
  const msg = [
    'Olá! Quero deixar meu feedback sobre a Conceito.',
    `Nota: ${'★'.repeat(fb.rating)}${'☆'.repeat(5 - fb.rating)} (${fb.rating}/5)`,
    `Nome: ${fb.name}`,
    `Empresa: ${fb.company}`,
    fb.tags.length ? `${fb.rating >= 4 ? 'Gostou de' : 'Pode melhorar'}: ${fb.tags.join(', ')}` : '',
    `Comentário: ${fb.message}`,
    fb.canPublish ? 'Autorizo publicar meu nome, empresa e depoimento no site.' : 'Não autorizo publicar no site.',
  ].filter(Boolean).join('\n')
  window.open(whatsappUrl(msg), '_blank', 'noopener')
}
