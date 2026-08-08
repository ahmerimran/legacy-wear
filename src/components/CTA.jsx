// components/CTA.jsx
// Final Call-to-Action section — dark premium band above the footer.

import './CTA.css'

const PURCHASE_LINK = 'https://instagram.com/legacywearstore'

export default function CTA() {
  return (
    <section
      id="cta"
      className="cta"
      aria-labelledby="cta-heading"
    >
      {/* Subtle background texture overlay */}
      <div className="cta__texture" aria-hidden="true" />

      <div className="cta__inner container">
        <p className="cta__eyebrow">Limited Stock Available</p>

        <h2 id="cta-heading" className="cta__heading">
          Ready to order your watch?
        </h2>

        <p className="cta__sub">
          DM us on Instagram for more queries. Fast replies, easy process.
        </p>

        <a
          id="cta-purchase-btn"
          href={PURCHASE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="cta__btn"
          aria-label="Purchase your Legacy Wear watch on Instagram"
        >
          Message Us
        </a>
      </div>
    </section>
  )
}
