// components/AboutFooter.jsx
// Combined About Us + Footer section with brand story, contact info, and social links.

import './AboutFooter.css'

// ─── Social icon SVG components ─────────────────────────────────────────────

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.55a8.2 8.2 0 0 0 4.79 1.53V6.62a4.85 4.85 0 0 1-1.02.07Z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  )
}

// ─── Contact links config ────────────────────────────────────────────────────
const CONTACTS = [
  {
    id: 'email',
    icon: <EmailIcon />,
    label: 'Email us',
    display: 'legacywearstore1@gmail.com',
    href: 'mailto:legacywearstore1@gmail.com',
  },
  {
    id: 'instagram',
    icon: <InstagramIcon />,
    label: 'Follow on Instagram',
    display: '@legacywearstore',
    href: 'https://instagram.com/legacywearstore',
  },
  {
    id: 'tiktok',
    icon: <TikTokIcon />,
    label: 'Follow on TikTok',
    display: '@legacywearstore',
    href: 'https://tiktok.com/@legacywearstore',
  },
]

export default function AboutFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer" className="about-footer" role="contentinfo">
      <div className="container">

        {/* ── About Section ──────────────────────────────────────────── */}
        <div className="about-footer__about">
          <p className="section-subtitle">Our Story</p>
          <h2 className="section-title about-footer__title">About Us</h2>
          <div className="section-divider" aria-hidden="true" />

          <p className="about-footer__text">
            We craft refined accessories for those who value both quality and worth.
            Each piece blends timeless craftsmanship with contemporary style.
            The elegance of luxury, without the excess of its price.
          </p>
        </div>

        {/* ── Contact / Social ───────────────────────────────────────── */}
        <div className="about-footer__contact">
          <h3 className="about-footer__contact-title">Get In Touch</h3>

          <ul className="about-footer__socials" role="list" aria-label="Contact and social links">
            {CONTACTS.map(({ id, icon, label, display, href }) => (
              <li key={id}>
                <a
                  id={`contact-${id}`}
                  href={href}
                  target={id !== 'email' ? '_blank' : undefined}
                  rel={id !== 'email' ? 'noopener noreferrer' : undefined}
                  className="about-footer__social-link"
                  aria-label={label}
                >
                  <span className="about-footer__social-icon">{icon}</span>
                  <span className="about-footer__social-text">{display}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Policies ───────────────────────────────────────── */}
        <div className="about-footer__policies">
           <h3 className="about-footer__contact-title">Policies</h3>
            <ul className="about-footer__policy-list">
               <li>Full payment is required before the order is confirmed.</li>
               <li>Delivery takes 4–5 working days.</li>
               <li>Delivery may take 1–2 extra days due to courier delays or unforeseen circumstances.</li>
               <li>Once payment is completed, you'll receive a picture of your packed parcel.</li>
               <li>Tracking details will be shared once your order is shipped.</li>
          </ul>
       </div>

        {/* ── Bottom Bar ─────────────────────────────────────────────── */}
        <div className="about-footer__bottom" aria-label="Footer legal">
          <p className="about-footer__copy">
            © {currentYear} Legacy Wear. All rights reserved.
          </p>
          <p className="about-footer__tagline">
            Timeless elegance, without the excess.
          </p>
        </div>

      </div>
    </footer>
  )
}
