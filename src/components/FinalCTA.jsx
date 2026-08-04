import React from 'react';
import InstagramIcon from './InstagramIcon';
import { INSTAGRAM_DM_LINK } from '../data/products';

export default function FinalCTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-box">
          <h2 className="cta-heading">Ready to order your watch?</h2>
          <a 
            href={INSTAGRAM_DM_LINK} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary"
          >
            <InstagramIcon />
            <span>DM to Order</span>
          </a>
        </div>
      </div>
    </section>
  );
}
