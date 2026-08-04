import React from 'react';
import InstagramIcon from './InstagramIcon';
import { HERO_PRODUCT, INSTAGRAM_DM_LINK } from '../data/products';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-image-wrapper">
            <img 
              src={HERO_PRODUCT.image} 
              alt={`${HERO_PRODUCT.name} Watch by Legacy Wear`} 
              className="hero-image" 
              width="600" 
              height="600"
            />
          </div>

          <div className="hero-content">
            <span className="hero-badge">{HERO_PRODUCT.badge}</span>
            <div className="hero-product-name">{HERO_PRODUCT.name}</div>
            <h1 className="hero-heading">{HERO_PRODUCT.heading}</h1>
            <p className="hero-description">
              {HERO_PRODUCT.description}
            </p>
            <div className="hero-action">
              <a 
                href={INSTAGRAM_DM_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary"
              >
                <InstagramIcon />
                <span>{HERO_PRODUCT.buttonText}</span>
              </a>
              <span className="sub-text">{HERO_PRODUCT.subText}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
