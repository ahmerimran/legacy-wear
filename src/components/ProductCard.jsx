import { useState } from 'react'
import './ProductCard.css'

const PLACEHOLDER_IMAGE =
  'https://placehold.co/600x600/F0EDE8/B8960C?text=Coming+Soon'

export default function ProductCard({ product }) {
  const {
    name,
    price,
    originalPrice,
    description,
    image,
    purchaseLink,
    comingSoon = false,
  } = product

  const [currentImage, setCurrentImage] = useState(0)

  const images = product.images || [image || PLACEHOLDER_IMAGE]
  const isDisabled = comingSoon || !purchaseLink

  return (
    <article className={`product-card${comingSoon ? ' product-card--coming-soon' : ''}`}>

      {/* ── Product Image ── */}
      <div className="product-card__image-wrap">

        <img
          src={images[currentImage]}
          alt={comingSoon ? 'Coming soon watch placeholder' : `${name} — Legacy Wear`}
          className="product-card__image"
          loading="lazy"
        />

        {/* Controls */}
        {images.length > 1 && !comingSoon && (
          <div className="product-card__controls">

            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
            >
              ◀
            </button>

            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
            >
              ▶
            </button>

          </div>
        )}

        {/* Badge */}
        {comingSoon && (
          <span className="product-card__badge">
            Coming Soon
          </span>
        )}

        {/* Discount Badge */}
        {originalPrice && !comingSoon && (
          <span className="product-card__badge product-card__badge--sale">
            15% OFF
          </span>
        )}   

      </div>

      {/* ── Card Body ── */}
      <div className="product-card__body">

        {!comingSoon && (
          <p className="product-card__category">{product.category}</p>
        )}

        <h3 className="product-card__name">{name}</h3>

        <p className={`product-card__price${comingSoon ? ' product-card__price--muted' : ''}`}>
           {originalPrice && (
           <span className="product-card__price-original">{originalPrice}</span>
       )}
           {price}
       </p>

        <p className="product-card__description">{description}</p>

        {isDisabled ? (
          <span className="product-card__btn product-card__btn--disabled">
            Coming Soon
          </span>
        ) : (
          <a
            href={`https://wa.me/923717047369?text=${encodeURIComponent(purchaseLink.text)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="product-card__btn btn-primary"
          >
            Purchase Now
          </a>
        )}

      </div>

    </article>
  )
}