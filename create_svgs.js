const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'assets', 'images');

function generateWatchSVG({ dialColor, accentColor, bezelColor, strapColor, strapType = 'leather', dialPattern = 'clean', isWomen = false }) {
  const width = 600;
  const height = 600;
  const cx = 300;
  const cy = 300;
  const r = isWomen ? 110 : 130;
  
  // Strap coordinates
  const strapW = isWomen ? 48 : 64;
  const strapY1 = 40;
  const strapY2 = 560;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">
  <defs>
    <!-- Soft Background Shadow -->
    <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.12" />
    </filter>
    <filter id="dial-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.25" />
    </filter>
    
    <!-- Metal Bezel Gradient -->
    <linearGradient id="bezel-grad-${bezelColor.replace('#','')}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bezelColor === 'gold' ? '#FFE58F' : bezelColor === 'rose-gold' ? '#F7D0C0' : bezelColor === 'gunmetal' ? '#666666' : '#FFFFFF'}" />
      <stop offset="30%" stop-color="${bezelColor === 'gold' ? '#D4AF37' : bezelColor === 'rose-gold' ? '#E0A996' : bezelColor === 'gunmetal' ? '#333333' : '#D1D5DB'}" />
      <stop offset="70%" stop-color="${bezelColor === 'gold' ? '#997A15' : bezelColor === 'rose-gold' ? '#B87966' : bezelColor === 'gunmetal' ? '#1A1A1A' : '#9CA3AF'}" />
      <stop offset="100%" stop-color="${bezelColor === 'gold' ? '#F5D061' : bezelColor === 'rose-gold' ? '#ECC1B0' : bezelColor === 'gunmetal' ? '#4A4A4A' : '#E5E7EB'}" />
    </linearGradient>

    <!-- Dial Gradient -->
    <radialGradient id="dial-grad-${dialColor.replace('#','')}" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${dialColor}" />
      <stop offset="100%" stop-color="${adjustColor(dialColor, -30)}" />
    </radialGradient>

    <!-- Strap Gradient -->
    <linearGradient id="strap-grad-${strapColor.replace('#','')}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${adjustColor(strapColor, -20)}" />
      <stop offset="50%" stop-color="${strapColor}" />
      <stop offset="100%" stop-color="${adjustColor(strapColor, -25)}" />
    </linearGradient>

    <!-- Glass Reflection -->
    <linearGradient id="glass-glare" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.4" />
      <stop offset="35%" stop-color="#ffffff" stop-opacity="0.05" />
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0" />
      <stop offset="85%" stop-color="#ffffff" stop-opacity="0.05" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.25" />
    </linearGradient>
  </defs>

  <!-- Studio Background Container -->
  <rect width="100%" height="100%" fill="#F8F8F8" rx="16" />

  <!-- Main Watch Wrapper with Shadow -->
  <g filter="url(#drop-shadow)">
    <!-- Top & Bottom Straps -->
    <rect x="${cx - strapW/2}" y="${strapY1}" width="${strapW}" height="${cy - strapY1 - r + 15}" rx="8" fill="url(#strap-grad-${strapColor.replace('#','')})" />
    <rect x="${cx - strapW/2}" y="${cy + r - 15}" width="${strapW}" height="${strapY2 - (cy + r - 15)}" rx="8" fill="url(#strap-grad-${strapColor.replace('#','')})" />

    <!-- Strap Texture / Stitching -->
    ${strapType === 'leather' ? `
      <line x1="${cx - strapW/2 + 6}" y1="${strapY1 + 10}" x2="${cx - strapW/2 + 6}" y2="${cy - r - 5}" stroke="rgba(255,255,255,0.25)" stroke-dasharray="4,4" stroke-width="1.5" />
      <line x1="${cx + strapW/2 - 6}" y1="${strapY1 + 10}" x2="${cx + strapW/2 - 6}" y2="${cy - r - 5}" stroke="rgba(255,255,255,0.25)" stroke-dasharray="4,4" stroke-width="1.5" />
      <line x1="${cx - strapW/2 + 6}" y1="${cy + r + 5}" x2="${cx - strapW/2 + 6}" y2="${strapY2 - 10}" stroke="rgba(255,255,255,0.25)" stroke-dasharray="4,4" stroke-width="1.5" />
      <line x1="${cx + strapW/2 - 6}" y1="${cy + r + 5}" x2="${cx + strapW/2 - 6}" y2="${strapY2 - 10}" stroke="rgba(255,255,255,0.25)" stroke-dasharray="4,4" stroke-width="1.5" />
    ` : ''}

    <!-- Crown (Winder Knob) -->
    <path d="M ${cx + r + 8} ${cy - 12} L ${cx + r + 18} ${cy - 10} L ${cx + r + 18} ${cy + 10} L ${cx + r + 8} ${cy + 12} Z" fill="url(#bezel-grad-${bezelColor.replace('#','')})" />

    <!-- Outer Bezel Ring -->
    <circle cx="${cx}" cy="${cy}" r="${r + 14}" fill="url(#bezel-grad-${bezelColor.replace('#','')})" />
    <circle cx="${cx}" cy="${cy}" r="${r + 2}" fill="#111111" opacity="0.1" />

    <!-- Inner Dial Case -->
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#dial-grad-${dialColor.replace('#','')})" />

    <!-- Dial Hour Markers -->
    ${generateMarkers(cx, cy, r - 16, accentColor)}

    <!-- Sub-dials for luxury chronograph feel -->
    ${!isWomen ? `
      <circle cx="${cx - 32}" cy="${cy}" r="18" fill="none" stroke="${accentColor}" stroke-opacity="0.3" stroke-width="1.5" />
      <circle cx="${cx + 32}" cy="${cy}" r="18" fill="none" stroke="${accentColor}" stroke-opacity="0.3" stroke-width="1.5" />
      <circle cx="${cx}" cy="${cy + 36}" r="18" fill="none" stroke="${accentColor}" stroke-opacity="0.3" stroke-width="1.5" />
    ` : ''}

    <!-- Brand Signature -->
    <text x="${cx}" y="${cy - (isWomen ? 30 : 45)}" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="${accentColor}" letter-spacing="3" text-anchor="middle" opacity="0.95">LEGACY WEAR</text>
    <text x="${cx}" y="${cy - (isWomen ? 18 : 32)}" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="400" fill="${accentColor}" letter-spacing="1.5" text-anchor="middle" opacity="0.6">AUTOMATIC</text>

    <!-- Watch Hands (10:10 classic aesthetic placement) -->
    <!-- Hour Hand -->
    <line x1="${cx}" y1="${cy}" x2="${cx - (r * 0.38)}" y2="${cy - (r * 0.38)}" stroke="${accentColor}" stroke-width="3.5" stroke-linecap="round" />
    <!-- Minute Hand -->
    <line x1="${cx}" y1="${cy}" x2="${cx + (r * 0.55)}" y2="${cy - (r * 0.55)}" stroke="${accentColor}" stroke-width="2.5" stroke-linecap="round" />
    <!-- Second Hand -->
    <line x1="${cx - (r * 0.15)}" y1="${cy + (r * 0.15)}" x2="${cx + (r * 0.65)}" y2="${cy - (r * 0.62)}" stroke="${isWomen ? accentColor : '#E53E3E'}" stroke-width="1" stroke-linecap="round" />
    <!-- Center Pivot Pin -->
    <circle cx="${cx}" cy="${cy}" r="5" fill="${accentColor}" />
    <circle cx="${cx}" cy="${cy}" r="2" fill="#111111" />

    <!-- Glass Lens Reflection -->
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#glass-glare)" />
  </g>
</svg>`;
}

function generateMarkers(cx, cy, r, color) {
  let markers = '';
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30) * Math.PI / 180;
    const x1 = cx + (r - 12) * Math.sin(angle);
    const y1 = cy - (r - 12) * Math.cos(angle);
    const x2 = cx + r * Math.sin(angle);
    const y2 = cy - r * Math.cos(angle);
    const width = (i % 3 === 0) ? 3 : 1.5;
    markers += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" opacity="${i % 3 === 0 ? 0.9 : 0.6}" />`;
  }
  return markers;
}

function adjustColor(hex, amount) {
  let usePound = false;
  if (hex[0] == "#") {
    hex = hex.slice(1);
    usePound = true;
  }
  let num = parseInt(hex, 16);
  let r = (num >> 16) + amount;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;
  let b = ((num >> 8) & 0x00FF) + amount;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;
  let g = (num & 0x0000FF) + amount;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
}

const watches = [
  { filename: 'cartier-blue.svg', options: { dialColor: '#0F2027', accentColor: '#E2E8F0', bezelColor: 'silver', strapColor: '#1E293B', strapType: 'leather' } },
  { filename: 'cartier-brown.svg', options: { dialColor: '#3D2314', accentColor: '#FDE68A', bezelColor: 'gold', strapColor: '#4A2810', strapType: 'leather' } },
  { filename: 'cartier-silver.svg', options: { dialColor: '#E2E8F0', accentColor: '#1E293B', bezelColor: 'silver', strapColor: '#94A3B8', strapType: 'steel' } },
  { filename: 'cartier-gold.svg', options: { dialColor: '#D4AF37', accentColor: '#1A1A1A', bezelColor: 'gold', strapColor: '#B8860B', strapType: 'steel' } },
  { filename: 'cartier-grey.svg', options: { dialColor: '#334155', accentColor: '#F8FAFC', bezelColor: 'gunmetal', strapColor: '#475569', strapType: 'steel' } },
  { filename: 'cartier-white.svg', options: { dialColor: '#FFFFFF', accentColor: '#1E293B', bezelColor: 'silver', strapColor: '#111111', strapType: 'leather' } },
  { filename: 'women-watch-1.svg', options: { dialColor: '#FFF5F5', accentColor: '#9B2C2C', bezelColor: 'rose-gold', strapColor: '#E53E3E', strapType: 'leather', isWomen: true } },
  { filename: 'women-watch-2.svg', options: { dialColor: '#F8FAFC', accentColor: '#334155', bezelColor: 'silver', strapColor: '#64748B', strapType: 'steel', isWomen: true } },
  { filename: 'women-watch-3.svg', options: { dialColor: '#FEFCBF', accentColor: '#744210', bezelColor: 'gold', strapColor: '#D69E2E', strapType: 'steel', isWomen: true } },
];

watches.forEach(w => {
  const svgContent = generateWatchSVG(w.options);
  fs.writeFileSync(path.join(outputDir, w.filename), svgContent);
  console.log(`Generated ${w.filename}`);
});
