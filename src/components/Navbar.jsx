// components/Navbar.jsx
// Sticky navigation bar with logo image, nav links, and responsive mobile menu.

import { useState, useEffect } from 'react'
import './Navbar.css'

// ─── Logo image path ────────────────────────────────────────────────────────
// Place your logo file at: public/logo.png  (or .svg / .webp)
// Then update the src below. Current path uses the public root.
const LOGO_SRC = '/logo.png'
const LOGO_FALLBACK = 'https://placehold.co/160x48/111111/B8960C?text=LEGACY+WEAR&font=playfair-display'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [logoError, setLogoError] = useState(false)

  // Add shadow to navbar once user scrolls past 40px
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when a link is clicked
  const handleLinkClick = (sectionId) => {
    setMenuOpen(false)
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <nav className="navbar__inner container" aria-label="Main navigation">

        {/* ── Logo ───────────────────────────────────────────────────── */}
        <a
          href="#hero"
          className="navbar__logo-link"
          aria-label="Legacy Wear — home"
          onClick={() => handleLinkClick('hero')}
        >
          <img
            src={logoError ? LOGO_FALLBACK : LOGO_SRC}
            alt="Legacy Wear logo"
            className="navbar__logo"
            onError={() => setLogoError(true)}
          />
        </a>

        {/* ── Desktop Navigation Links ───────────────────────────────── */}
        <ul className="navbar__links" role="list">
          <li>
            <button
              id="nav-mens"
              className="navbar__link"
              onClick={() => handleLinkClick('mens-collection')}
            >
              Men's Collection
            </button>
          </li>
          <li>
            <button
              id="nav-womens"
              className="navbar__link"
              onClick={() => handleLinkClick('womens-collection')}
            >
              Women's Collection
            </button>
          </li>
          <li>
            <button
              id="nav-contact"
              className="navbar__link"
              onClick={() => handleLinkClick('footer')}
            >
              Contact
            </button>
          </li>
        </ul>

        {/* ── Mobile Hamburger ───────────────────────────────────────── */}
        <button
          id="mobile-menu-toggle"
          className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
        </button>
      </nav>

      {/* ── Mobile Dropdown Menu ────────────────────────────────────── */}
      <div
        id="mobile-menu"
        className={`navbar__mobile-menu${menuOpen ? ' navbar__mobile-menu--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <ul className="navbar__mobile-links" role="list">
          <li>
            <button className="navbar__mobile-link" onClick={() => handleLinkClick('mens-collection')}>
              Men's Collection
            </button>
          </li>
          <li>
            <button className="navbar__mobile-link" onClick={() => handleLinkClick('womens-collection')}>
              Women's Collection
            </button>
          </li>
          <li>
            <button className="navbar__mobile-link" onClick={() => handleLinkClick('footer')}>
              Contact
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}
