export interface Feedback {
  name: string
  company: string
  rating: number
  message: string
  canPublish: boolean
}

/**
 * Ponto único de envio de feedback.
 * Por enquanto guarda no navegador (pendente de moderação); quando o backend existir,
 * troque o corpo por um POST /feedback — o depoimento só deve ir ao ar após aprovação.
 */
export async function submitFeedback(fb: Feedback) {
  try {
    const key = 'conceito:feedback-pendente'
    const list = JSON.parse(localStorage.getItem(key) ?? '[]')
    list.push({ ...fb, at: new Date().toISOString() })
    localStorage.setItem(key, JSON.stringify(list))
  } catch { /* armazenamento indisponível: segue sem persistir */ }
}
