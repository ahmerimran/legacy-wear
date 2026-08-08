// components/HeroBanner.jsx
// Full-width hero banner — single image with built-in text/CTA, clickable to scroll to collection.

import './HeroBanner.css'

const BANNER_IMAGE = '/banners/azadisale.jpeg'

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
      aria-label="Legacy Wear Azadi Sale banner"
    >
      <div
        className="hero__clickable"
        onClick={scrollToCollection}
        role="link"
        tabIndex={0}
        aria-label="Explore collection — scroll to products"
        onKeyDown={(e) => e.key === 'Enter' && scrollToCollection()}
      >
        <img
          src={BANNER_IMAGE}
          alt="Legacy Wear Azadi Sale — up to 15% off, price starting from Rs. 2,499"
          className="hero__image"
          loading="eager"
        />
      </div>
    </section>
  )
}