import React, { useState, useEffect } from 'react'
import './Nav.css'

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [pastTitle, setPastTitle] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => {
      const scrollPos = window.scrollY
      const titleEl = document.querySelector('.hero__title')

      setScrolled(scrollPos > 30)

      if (titleEl) {
        const rect = titleEl.getBoundingClientRect()
        // SKETCHIZEL in navbar appears as soon as the hero title scrolls up past the navbar
        setPastTitle(rect.bottom <= 72)
      } else {
        const hero = document.getElementById('hero')
        const heroHeight = hero ? hero.offsetHeight * 0.55 : 450
        setPastTitle(scrollPos > heroHeight)
      }
    }

    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''} ${pastTitle ? 'nav--past-title nav--past-hero' : ''}`}>
        <div className="nav__inner">
          {/* Logo Brand: Sketchizel Emblem + Typography */}
          <a
            className="nav__logo"
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNav('#hero') }}
            aria-label="Sketchizel Portfolio Home"
          >
            <img
              src="/images/sketchizel-logo.png"
              alt="Sketchizel Logo"
              className="nav__logo-img"
            />
            <span className="nav__logo-text">SKETCHIZEL</span>
          </a>

          {/* Desktop nav links (Work, About, Contact) - constantly in Yellow on Black bar */}
          <ul className="nav__links">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNav(item.href) }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`nav__mobile-overlay ${menuOpen ? 'nav__mobile-overlay--open' : ''}`}>
        <ul>
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNav(item.href) }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
