import React from 'react';
import ProductCard from './ProductCard';
import { MENS_COLLECTION } from '../data/products';

export default function MensCollection() {
  return (
    <section id="mens-collection" className="mens-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Men’s Collection</h2>
        </div>

        <div className="product-grid">
          {MENS_COLLECTION.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
