// components/HeroBanner.jsx
// Full-width hero section with lifestyle image, headline, and CTA button.
// The entire banner is clickable and scrolls to the collection section.

import './HeroBanner.css'

// ─── Banner image ────────────────────────────────────────────────────────────
// Replace the URL below with your own image.
// For a local file, place it in /public/banners/ and use: '/banners/hero.jpg'
const BANNER_IMAGE =
  'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1600&q=85'

export default function HeroBanner() {
  const scrollToCollection = () => {
    const el = document.getElementById('mens-collection')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="hero"
      role="banner"
      aria-label="Legacy Wear hero banner"
    >
      {/* Clickable full-banner overlay */}
      <div
        className="hero__clickable"
        onClick={scrollToCollection}
        role="link"
        tabIndex={0}
        aria-label="Explore collection — scroll to products"
        onKeyDown={(e) => e.key === 'Enter' && scrollToCollection()}
      >
        {/* Background image */}
        <img
          src={BANNER_IMAGE}
          alt="Luxury timepiece on dark marble — Legacy Wear collection"
          className="hero__image"
          loading="eager"
        />

        {/* Dark gradient overlay for text legibility */}
        <div className="hero__overlay" aria-hidden="true" />

        {/* Content */}
        <div className="hero__content">
          {/* Eyebrow label */}
          <p className="hero__eyebrow">Legacy Wear · Est. 2024</p>

          <h1 className="hero__heading">
            Timeless Elegance,
            <br />
            <em>Designed For You</em>
          </h1>

          <p className="hero__description">
            Discover premium watches crafted to elevate your everyday style.
          </p>

          {/* CTA — clicking the button also triggers scroll (parent click handles it) */}
          <span className="hero__cta btn-primary">
            Explore Collection
          </span>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll-hint" aria-hidden="true">
          <span className="hero__scroll-line" />
          <span className="hero__scroll-text">Scroll</span>
        </div>
      </div>
    </section>
  )
}
