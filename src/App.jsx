// App.jsx — Root application component
// Composes all sections in order: Navbar → Hero → Collections → CTA → Footer

import Navbar      from './components/Navbar'
import HeroBanner  from './components/HeroBanner'
import Collection  from './components/Collection'
import CTA         from './components/CTA'
import AboutFooter from './components/AboutFooter'

// Product data — add / remove watches in this file only
import { mensWatches, womensWatches } from './data/products'

export default function App() {
  return (
    <>
      {/* ── Sticky Navigation ─────────────────────────────────────── */}
      <Navbar />

      {/* ── Hero Banner ───────────────────────────────────────────── */}
      <main id="main-content">
        <HeroBanner />

        {/* ── Men's Collection ────────────────────────────────────── */}
        <Collection
          id="mens-collection"
          title="Men's Collection"
          subtitle="Crafted for Him"
          products={mensWatches}
        />

        {/* ── Women's Collection ──────────────────────────────────── */}
        <Collection
          id="womens-collection"
          title="Women's Collection"
          subtitle="Crafted for Her"
          products={womensWatches}
        />

        {/* ── Final CTA ───────────────────────────────────────────── */}
        <CTA />
      </main>

      {/* ── About Us / Footer ───────────────────────────────────── */}
      <AboutFooter />
    </>
  )
}
