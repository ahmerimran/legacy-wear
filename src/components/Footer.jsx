import React from 'react';
import { INSTAGRAM_DM_LINK } from '../data/products';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-logo">LEGACY WEAR</div>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Legacy Wear. All rights reserved. Order via{' '}
          <a 
            href={INSTAGRAM_DM_LINK} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link"
          >
            @legacywearstore
          </a>
        </p>
      </div>
    </footer>
  );
}
