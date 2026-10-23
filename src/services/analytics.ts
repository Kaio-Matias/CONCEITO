/**
 * Google Analytics 4 com Modo de Consentimento (LGPD).
 * - Sem VITE_GA_ID definido, nada é carregado.
 * - Até a pessoa aceitar, analytics_storage fica "denied": nenhum cookie é gravado
 *   (o GA recebe apenas sinais anônimos, sem identificar o visitante).
 * - Cliques importantes (WhatsApp, e-mail, mapa, lojas do app, área do cliente) viram eventos automaticamente.
 */
type Gtag = (...args: unknown[]) => void
declare global { interface Window { dataLayer?: unknown[]; gtag?: Gtag } }

export const GA_ID = import.meta.env.VITE_GA_ID
const CONSENT_KEY = 'conceito:consent'

export type Consent = 'granted' | 'denied'

export function storedConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch { return null }
}

function gtag(...args: unknown[]) {
  window.gtag?.(...args)
}

/** Carrega o GA4 uma única vez, já com o consentimento padrão negado. */
export function initAnalytics() {
  if (!GA_ID || window.gtag) return
  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer!.push(arguments) } as Gtag
  const consent = storedConsent() ?? 'denied'
  gtag('consent', 'default', {
    analytics_storage: consent,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  })
  gtag('js', new Date())
  gtag('config', GA_ID, { send_page_view: false, anonymize_ip: true })

  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)

  document.addEventListener('click', onClick, { capture: true })
}

export const CONSENT_EVENT = 'conceito:consent'

export function setConsent(value: Consent) {
  try { localStorage.setItem(CONSENT_KEY, value) } catch { /* armazenamento indisponível */ }
  gtag('consent', 'update', { analytics_storage: value })
  // Ao recusar, apaga os cookies do Analytics que já tenham sido gravados.
  if (value === 'denied') {
    document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter((n) => n === '_ga' || n.startsWith('_ga_')).forEach((n) => {
      const host = window.location.hostname
      for (const domain of ['', host, `.${host.replace(/^www\./, '')}`]) {
        document.cookie = `${n}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`
      }
    })
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }))
}

export function track(event: string, params: Record<string, unknown> = {}) {
  gtag('event', event, params)
}

let lastPath = ''
export function trackPageView(path: string) {
  if (path === lastPath) return // evita contar duas vezes a mesma página (ex.: StrictMode em desenvolvimento)
  lastPath = path
  track('page_view', { page_path: path, page_location: window.location.href, page_title: document.title })
}

/** Seção da página onde o clique aconteceu (ex.: "contato", "solucoes"). */
function sectionOf(el: Element) {
  if (el.closest('.fab')) return 'botao_flutuante'
  const section = el.closest('section[id]')
  if (section) return section.id
  if (el.closest('footer')) return 'rodape'
  if (el.closest('header')) return 'cabecalho'
  return 'outro'
}

function onClick(e: MouseEvent) {
  const a = (e.target as Element | null)?.closest?.('a')
  if (!a) return
  const href = a.getAttribute('href') || ''
  const where = { location: sectionOf(a), link_text: (a.textContent || '').trim().slice(0, 80) }
  if (href.includes('wa.me/')) track('whatsapp_click', where)
  else if (href.startsWith('mailto:')) track('email_click', where)
  else if (href.startsWith('tel:')) track('phone_click', where)
  else if (href.includes('maps.app.goo.gl') || href.includes('google.com/maps')) track('maps_click', where)
  else if (href.includes('play.google.com') || href.includes('apps.apple.com')) track('app_store_click', { ...where, store: href.includes('apple') ? 'app_store' : 'google_play' })
  else if (href.includes('instagram.com')) track('social_click', { ...where, network: 'instagram' })
  else if (href === '/cliente' || href.includes('portal-')) track('client_area_click', where)
}
