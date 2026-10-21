/**
 * Área do cliente: decide para onde mandar o visitante conforme o aparelho.
 * - Android → abre o app se estiver instalado; senão, Play Store.
 * - iPhone/iPad → App Store (se o app estiver instalado, a loja mostra "Abrir").
 * - Computador → portal web.
 */
export const CLIENT_APP = {
  androidPackage: 'app.web.portal_conceitonegcios',
  playStore: 'https://play.google.com/store/apps/details?id=app.web.portal_conceitonegcios',
  appStoreId: '6800352857',
  appStore: 'https://apps.apple.com/br/app/conceito-neg%C3%B3cios/id6800352857',
  portal: 'https://portal-conceitonegcios.web.app/',
}

export type Platform = 'android' | 'ios' | 'web'

export function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'web'
  const ua = navigator.userAgent || ''
  if (/android/i.test(ua)) return 'android'
  // iPadOS se apresenta como Mac; diferencia pela tela de toque.
  if (/iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ios'
  return 'web'
}

/**
 * Link "intent" do Chrome no Android: abre o app pelo pacote se estiver instalado;
 * se não estiver, o próprio Chrome segue para a Play Store (browser_fallback_url).
 */
function androidIntent() {
  const fallback = encodeURIComponent(CLIENT_APP.playStore)
  return `intent://#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;package=${CLIENT_APP.androidPackage};S.browser_fallback_url=${fallback};end`
}

export function clientAreaTarget(platform = detectPlatform()) {
  if (platform === 'android') return androidIntent()
  if (platform === 'ios') return CLIENT_APP.appStore
  return CLIENT_APP.portal
}

/** Handler de clique para links "Área do cliente" (mantém o gesto do usuário, exigido para abrir apps). */
export function goClient(e: { preventDefault(): void }) {
  e.preventDefault()
  openClientArea()
}

/** Redireciona para o destino certo. No computador, o portal abre em nova aba. */
export function openClientArea(opts: { replace?: boolean } = {}) {
  const platform = detectPlatform()
  const target = clientAreaTarget(platform)
  if (platform === 'web' && !opts.replace) {
    window.open(target, '_blank', 'noopener')
    return
  }
  if (opts.replace) window.location.replace(target)
  else window.location.href = target
}
