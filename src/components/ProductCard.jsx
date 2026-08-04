// components/ProductCard.jsx
// Reusable card component — driven entirely by props from products.js.
// Handles both regular product cards and "Coming Soon" placeholder cards.

import './ProductCard.css'

// ── Placeholder image shown when product.image is null ──────────────────────
const PLACEHOLDER_IMAGE = 'https://placehold.co/600x600/F0EDE8/B8960C?text=Coming+Soon'

export default function ProductCard({ product }) {
  const {
    name,
    price,
    description,
    image,
    purchaseLink,
    comingSoon = false,
  } = product

  const resolvedImage = image || PLACEHOLDER_IMAGE
  const isDisabled = comingSoon || !purchaseLink

  return (
    <article className={`product-card${comingSoon ? ' product-card--coming-soon' : ''}`}>

      {/* ── Product Image ─────────────────────────────────────────────── */}
      <div className="product-card__image-wrap">
        <img
          src={resolvedImage}
          alt={comingSoon ? 'Coming soon watch placeholder' : `${name} — Legacy Wear`}
          className="product-card__image"
          loading="lazy"
        />
        {comingSoon && (
          <span className="product-card__badge" aria-label="Coming soon">
            Coming Soon
          </span>
        )}
      </div>

      {/* ── Card Body ─────────────────────────────────────────────────── */}
      <div className="product-card__body">
        {/* Category eyebrow */}
        {!comingSoon && (
          <p className="product-card__category">{product.category}</p>
        )}

        {/* Watch name */}
        <h3 className="product-card__name">{name}</h3>

        {/* Price */}
        <p className={`product-card__price${comingSoon ? ' product-card__price--muted' : ''}`}>
          {price}
        </p>

        {/* Description */}
        <p className="product-card__description">{description}</p>

        {/* Purchase button */}
        {isDisabled ? (
          <span className="product-card__btn product-card__btn--disabled" aria-disabled="true">
            Coming Soon
          </span>
        ) : (
          <a
            href={purchaseLink}
            target="_blank"
            rel="noopener noreferrer"
            className="product-card__btn btn-primary"
            aria-label={`Purchase ${name} on Instagram`}
          >
            Purchase Now
          </a>
        )}
      </div>
    </article>
  )
}
