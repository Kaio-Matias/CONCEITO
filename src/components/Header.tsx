import { useEffect, useRef, useState } from 'react'
import { goClient } from '../services/clientArea'
import { NAV, NAV_GROUPS } from '../data/content'
import { Icon } from './Icon'
import { Logo } from './Logo'

/** Seção que está na tela agora (para destacar o grupo no menu). */
function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1))
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false) // menu do celular
  const [menu, setMenu] = useState<number | null>(null) // menu suspenso aberto (desktop)
  const closeTimer = useRef<number>()
  const navRef = useRef<HTMLElement>(null)
  const active = useActiveSection()

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

  // Fecha o menu suspenso com Esc ou clicando fora dele.
  useEffect(() => {
    if (menu === null) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(null) }
    const onDown = (e: PointerEvent) => { if (!navRef.current?.contains(e.target as Node)) setMenu(null) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onDown) }
  }, [menu])

  const openMenu = (i: number) => { window.clearTimeout(closeTimer.current); setMenu(i) }
  const closeMenuSoon = () => { window.clearTimeout(closeTimer.current); closeTimer.current = window.setTimeout(() => setMenu(null), 180) }
  const isActive = (hrefs: string[]) => hrefs.includes(`#${active}`)

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="container header__bar">
        <Logo light={!scrolled || open} />

        <nav className="header__nav" aria-label="Principal" ref={navRef}>
          {NAV_GROUPS.map((g, i) => {
            if (!g.items) {
              return (
                <a key={g.label} href={g.href} className={`header__link ${isActive([g.href!]) ? 'is-active' : ''}`}>{g.label}</a>
              )
            }
            const isOpen = menu === i
            return (
              <div key={g.label} className={`header__group ${isOpen ? 'is-open' : ''}`} onPointerEnter={(e) => { if (e.pointerType === 'mouse') openMenu(i) }} onPointerLeave={(e) => { if (e.pointerType === 'mouse') closeMenuSoon() }}>
                <button
                  type="button"
                  className={`header__link ${isActive(g.items.map((x) => x.href)) ? 'is-active' : ''}`}
                  aria-expanded={isOpen}
                  aria-controls={`menu-${i}`}
                  onClick={() => setMenu(isOpen ? null : i)}
                >
                  {g.label} <Icon name="arrow" size={14} className="header__caret" />
                </button>
                <div className="header__menu" id={`menu-${i}`} hidden={!isOpen}>
                  {g.items.map((it) => (
                    <a key={it.href} href={it.href} className={active === it.href.slice(1) ? 'is-active' : ''} onClick={() => setMenu(null)}>
                      <span className="header__menu-icon"><Icon name={it.icon} size={18} /></span>
                      <span><strong>{it.label}</strong><small>{it.text}</small></span>
                    </a>
                  ))}
                </div>
              </div>
            )
          })}
        </nav>

        <div className="header__actions">
          <a href="/cliente" className="btn btn--ghost btn--sm" onClick={goClient}>
            <Icon name="login" size={16} /> Área do cliente
          </a>
          <a href="#contato" className="btn btn--primary btn--sm">Fale conosco</a>
        </div>
        <button className="header__burger" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <Icon name={open ? 'close' : 'menu'} size={24} />
        </button>
      </div>

      {/* Menu do celular: todos os grupos, em lista */}
      <div className="header__drawer" hidden={!open}>
        {NAV_GROUPS.map((g) => (
          <div key={g.label} className="header__drawer-group">
            {g.items ? (
              <>
                <small>{g.label}</small>
                {g.items.map((it) => (
                  <a key={it.href} href={it.href} onClick={() => setOpen(false)}>
                    <Icon name={it.icon} size={18} /> {it.label}
                  </a>
                ))}
              </>
            ) : (
              <a href={g.href} onClick={() => setOpen(false)}><Icon name="smartphone" size={18} /> {g.label}</a>
            )}
          </div>
        ))}
        <div className="header__drawer-actions">
          <a href="#contato" className="btn btn--primary" onClick={() => setOpen(false)}>Fale conosco</a>
          <a href="/cliente" className="btn btn--ghost" onClick={(e) => { setOpen(false); goClient(e) }}>
            <Icon name="login" size={16} /> Área do cliente
          </a>
        </div>
      </div>
    </header>
  )
}
