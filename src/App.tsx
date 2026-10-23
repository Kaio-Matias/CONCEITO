import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import ClientArea from './pages/ClientArea'
import Privacy from './pages/Privacy'
import Cookies from './pages/Cookies'
import { CookieConsent } from './components/CookieConsent'
import { trackPageView } from './services/analytics'

export default function App() {
  const { pathname, hash } = useLocation()

  // Registra cada página vista no Google Analytics (o site é uma SPA).
  useEffect(() => { trackPageView(pathname) }, [pathname])

  // Ao trocar de página, começa do topo (ou da seção indicada em /#secao).
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 50)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cliente" element={<ClientArea />} />
        <Route path="/privacidade" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <CookieConsent />
    </>
  )
}
