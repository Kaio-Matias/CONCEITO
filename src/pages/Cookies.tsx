import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { COMPANY } from '../data/content'
import { CONSENT_EVENT, GA_ID, setConsent, storedConsent, type Consent } from '../services/analytics'
import { LegalPage, type LegalSection } from '../components/LegalPage'
import { Icon } from '../components/Icon'
import { LEGAL_UPDATED } from './Privacy'

interface Row { name: string; who: string; purpose: string; duration: string }

function CookieTable({ rows }: { rows: Row[] }) {
  return (
    <div className="legal__table">
      <table>
        <thead><tr><th>Nome</th><th>De quem</th><th>Para que serve</th><th>Duração</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td data-label="Nome"><code>{r.name}</code></td>
              <td data-label="De quem">{r.who}</td>
              <td data-label="Para que serve">{r.purpose}</td>
              <td data-label="Duração">{r.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Painel para ver e mudar a escolha de cookies de análise a qualquer momento. */
function Preferences() {
  const [value, setValue] = useState<Consent | null>(storedConsent)

  useEffect(() => {
    const sync = (e: Event) => setValue((e as CustomEvent<Consent>).detail)
    window.addEventListener(CONSENT_EVENT, sync)
    return () => window.removeEventListener(CONSENT_EVENT, sync)
  }, [])

  const status = value === 'granted' ? 'Você aceitou os cookies de análise.' : value === 'denied' ? 'Você recusou os cookies de análise.' : 'Você ainda não escolheu.'

  return (
    <div className="legal__prefs">
      <div className="legal__prefs-row">
        <span className="legal__prefs-icon is-on"><Icon name="lock" size={20} /></span>
        <div>
          <strong>Essenciais</strong>
          <small>Guardam as suas escolhas e a posição do botão do WhatsApp. Sempre ativos.</small>
        </div>
        <em className="legal__pill">Sempre ativo</em>
      </div>
      <div className="legal__prefs-row">
        <span className={`legal__prefs-icon ${value === 'granted' ? 'is-on' : ''}`}><Icon name="bar-chart" size={20} /></span>
        <div>
          <strong>Análise (Google Analytics)</strong>
          <small>{GA_ID ? status : 'No momento, o site não usa cookies de análise.'}</small>
        </div>
        {GA_ID && (
          <div className="legal__prefs-actions" role="group" aria-label="Cookies de análise">
            <button type="button" className={value === 'denied' ? 'is-on' : ''} aria-pressed={value === 'denied'} onClick={() => setConsent('denied')}>Recusar</button>
            <button type="button" className={value === 'granted' ? 'is-on is-ok' : ''} aria-pressed={value === 'granted'} onClick={() => setConsent('granted')}>Aceitar</button>
          </div>
        )}
      </div>
    </div>
  )
}

const SECTIONS: LegalSection[] = [
  {
    id: 'o-que-sao', title: 'O que são cookies',
    body: (
      <p>
        Cookies são pequenos arquivos que um site grava no seu navegador para lembrar informações, como preferências ou estatísticas de uso.
        Neste site também usamos o <strong>armazenamento local</strong> do navegador, que funciona de forma parecida. Nesta página, tratamos os
        dois como “cookies”.
      </p>
    ),
  },
  {
    id: 'preferencias', title: 'As suas preferências',
    body: (
      <>
        <p>Você pode mudar a sua escolha a qualquer momento. A mudança vale na hora.</p>
        <Preferences />
      </>
    ),
  },
  {
    id: 'essenciais', title: 'Cookies essenciais',
    body: (
      <>
        <p>Necessários para o site funcionar como você espera. Não identificam você e não são enviados a ninguém.</p>
        <CookieTable rows={[
          { name: 'conceito:consent', who: 'Conceito (armazenamento local)', purpose: 'Lembrar se você aceitou ou recusou os cookies de análise.', duration: 'Até você limpar os dados do navegador' },
          { name: 'conceito:fab', who: 'Conceito (armazenamento local)', purpose: 'Lembrar onde você deixou o botão flutuante do WhatsApp.', duration: 'Até você limpar os dados do navegador' },
        ]} />
      </>
    ),
  },
  {
    id: 'analise', title: 'Cookies de análise',
    body: (
      <>
        <p>
          <strong>Só são gravados se você aceitar.</strong> Usamos o Google Analytics para entender, de forma estatística, como o site é usado:
          quais seções são mais vistas, quantas pessoas clicam no WhatsApp e em quais aparelhos o site é acessado. Isso nos ajuda a melhorar o site.
          Enquanto você não aceita, o Google recebe apenas sinais anônimos, sem cookies e sem identificar o seu navegador.
        </p>
        <CookieTable rows={[
          { name: '_ga', who: 'Google Analytics', purpose: 'Diferenciar visitantes de forma anônima, para contar visitas.', duration: '2 anos' },
          { name: '_ga_<ID>', who: 'Google Analytics', purpose: 'Manter o estado da visita (sessão) para as estatísticas.', duration: '2 anos' },
        ]} />
        <p>Ao recusar, apagamos esses cookies do seu navegador. Saiba mais em <a href="https://policies.google.com/technologies/cookies?hl=pt-BR" target="_blank" rel="noopener noreferrer">como o Google usa cookies</a>.</p>
      </>
    ),
  },
  {
    id: 'terceiros', title: 'Serviços de terceiros',
    body: (
      <>
        <p>Algumas partes do site são carregadas de outros serviços, que seguem as suas próprias políticas:</p>
        <ul>
          <li><strong>Mapa do escritório (Google Maps):</strong> ao carregar o mapa na seção de contato, o Google pode gravar cookies próprios no seu navegador.</li>
          <li><strong>Fontes (Google Fonts):</strong> as fontes do site vêm dos servidores do Google, que recebem o endereço IP de quem acessa, sem gravar cookies.</li>
          <li><strong>WhatsApp, Instagram e lojas de aplicativos:</strong> só são acessados quando você clica nos links; a partir daí, valem as políticas desses serviços.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'navegador', title: 'Como controlar no navegador',
    body: (
      <>
        <p>Além do painel acima, você pode apagar ou bloquear cookies nas configurações do seu navegador:</p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647?hl=pt-BR" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
          <li><a href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
          <li><a href="https://support.mozilla.org/pt-BR/kb/limpe-cookies-e-dados-de-sites-no-firefox" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
          <li><a href="https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
        </ul>
        <p>Bloquear os cookies essenciais pode fazer o site esquecer as suas escolhas.</p>
      </>
    ),
  },
  {
    id: 'contato', title: 'Dúvidas',
    body: (
      <p>
        Para saber mais sobre como tratamos os seus dados, leia a nossa <Link to="/privacidade">Política de Privacidade</Link> ou fale com a gente
        pelo e-mail <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
      </p>
    ),
  },
]

export default function Cookies() {
  return (
    <LegalPage
      eyebrow="Cookies"
      title="Política de Cookies"
      updated={LEGAL_UPDATED}
      description="Veja quais cookies o site da Conceito Contabilidade e Negócios usa, para que servem e como mudar as suas preferências."
      intro={<p>Explicamos quais cookies o site usa, para que servem e como você pode aceitar, recusar ou mudar a sua escolha a qualquer momento.</p>}
      sections={SECTIONS}
    />
  )
}
