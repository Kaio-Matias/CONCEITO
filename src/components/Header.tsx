import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NAV } from '../data/content'
import { Icon } from './Icon'
import { Logo } from './Logo'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="container header__bar">
        <Logo light={!scrolled || open} />
        <nav className="header__nav" aria-label="Principal">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
          ))}
        </nav>
        <div className="header__actions">
          <Link to="/cliente" className="btn btn--ghost btn--sm">
            <Icon name="login" size={16} /> Área do cliente
          </Link>
          <a href="#contato" className="btn btn--primary btn--sm" onClick={() => setOpen(false)}>
            Diagnóstico gratuito
          </a>
        </div>
        <button className="header__burger" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <Icon name={open ? 'close' : 'menu'} size={24} />
        </button>
      </div>
      <div className="header__drawer" hidden={!open}>
        {NAV.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
        ))}
        <Link to="/cliente" className="btn btn--ghost" onClick={() => setOpen(false)}>
          <Icon name="login" size={16} /> Área do cliente
        </Link>
        <a href="#contato" className="btn btn--primary" onClick={() => setOpen(false)}>Diagnóstico gratuito</a>
      </div>
    </header>
  )
}
