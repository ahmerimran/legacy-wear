import React from 'react';
import ProductCard from './ProductCard';
import { WOMENS_COLLECTION } from '../data/products';

export default function WomensCollection() {
  return (
    <section id="womens-collection" className="womens-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Women’s Collection</h2>
        </div>

        <div className="product-grid">
          {WOMENS_COLLECTION.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
