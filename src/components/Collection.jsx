// components/Collection.jsx
// Reusable collection section — renders any array of products from products.js.
// Used for both Men's and Women's collections (and any future collections).

import ProductCard from './ProductCard'
import './Collection.css'

/**
 * @param {string} id           — HTML section id (used for anchor navigation)
 * @param {string} title        — Section heading
 * @param {string} subtitle     — Small eyebrow label above the heading
 * @param {Array}  products     — Array of product objects from products.js
 */
export default function Collection({ id, title, subtitle, products }) {
  if (!products || products.length === 0) return null

  return (
    <section id={id} className="collection section-padding" aria-labelledby={`${id}-title`}>
      <div className="container">

        {/* ── Section Header ─────────────────────────────────────────── */}
        <header className="collection__header">
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
          <h2 id={`${id}-title`} className="section-title">{title}</h2>
          <div className="section-divider" aria-hidden="true" />
        </header>

        {/* ── Product Grid ───────────────────────────────────────────── */}
        <div
          className="collection__grid"
          role="list"
          aria-label={`${title} product grid`}
        >
          {products.map((product) => (
            <div key={product.id} role="listitem">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
