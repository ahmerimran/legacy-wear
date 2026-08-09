import './CollectionCTA.css';

export default function CollectionCTA() {
  return (
    <section className="collection-cta">
      <a href="#mens-collection" className="collection-cta__card">
        <span className="collection-cta__label">Men's Collection</span>
        <span className="collection-cta__arrow">→</span>
      </a>
      <a href="#womens-collection" className="collection-cta__card">
        <span className="collection-cta__label">Women's Collection</span>
        <span className="collection-cta__arrow">→</span>
      </a>
    </section>
  );
}