import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LogoMark } from '../components/Logo'
import { Icon } from '../components/Icon'
import { CLIENT_APP, detectPlatform, openClientArea, type Platform } from '../services/clientArea'

const LABEL: Record<Platform, string> = {
  android: 'Abrindo o app Conceito Negócios…',
  ios: 'Abrindo o app Conceito Negócios na App Store…',
  web: 'Abrindo o portal do cliente…',
}

/**
 * Quem acessa /cliente diretamente é encaminhado automaticamente:
 * portal web no computador, app/Play Store no Android e App Store no iPhone.
 * Os botões ficam visíveis caso o navegador bloqueie o redirecionamento.
 */
export default function ClientArea() {
  const [platform] = useState<Platform>(detectPlatform)

  // Página só de redirecionamento: fica fora dos resultados de busca.
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, follow'
    document.head.querySelectorAll('meta[name="robots"]').forEach((m) => m.remove())
    document.head.appendChild(meta)
    document.title = 'Área do cliente | Conceito Contabilidade e Negócios'
  }, [])

  useEffect(() => {
    const t = setTimeout(() => openClientArea({ replace: true }), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="gate">
      <div className="gate__card">
        <img src="/app/icone.png" alt="" width={64} height={64} className="gate__icon" />
        <h1>Área do cliente</h1>
        <p role="status">{LABEL[platform]}</p>
        <div className="gate__actions">
          <a className="btn btn--primary" href={CLIENT_APP.portal}>
            <Icon name="monitor" size={18} /> Portal web
          </a>
          <a className="btn btn--ghost-dark" href={CLIENT_APP.playStore}>
            <Icon name="smartphone" size={18} /> Google Play (Android)
          </a>
          <a className="btn btn--ghost-dark" href={CLIENT_APP.appStore}>
            <Icon name="smartphone" size={18} /> App Store (iPhone)
          </a>
        </div>
        <Link to="/" className="gate__back"><LogoMark size={20} /> Voltar ao site</Link>
      </div>
    </main>
  )
}
