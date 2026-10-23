import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CONSENT_EVENT, GA_ID, setConsent, storedConsent, type Consent } from '../services/analytics'

/** Aviso de cookies (LGPD): aparece só se o Analytics estiver configurado e a pessoa ainda não escolheu. */
export function CookieConsent() {
  const [show, setShow] = useState(() => Boolean(GA_ID) && storedConsent() === null)

  // Se a escolha for feita em outro lugar (ex.: página de cookies), o aviso some.
  useEffect(() => {
    const hide = () => setShow(false)
    window.addEventListener(CONSENT_EVENT, hide)
    return () => window.removeEventListener(CONSENT_EVENT, hide)
  }, [])

  if (!show) return null

  const choose = (v: Consent) => { setConsent(v); setShow(false) }

  return (
    <div className="consent" role="dialog" aria-live="polite" aria-label="Preferências de cookies">
      <p>
        <strong>Cookies</strong>
        Usamos cookies de análise para entender como o site é usado e melhorar a sua experiência. Você pode aceitar ou recusar. <Link to="/cookies">Saiba mais</Link>
      </p>
      <div className="consent__actions">
        <button type="button" className="consent__btn" onClick={() => choose('denied')}>Recusar</button>
        <button type="button" className="consent__btn consent__btn--ok" onClick={() => choose('granted')}>Aceitar</button>
      </div>
    </div>
  )
}
