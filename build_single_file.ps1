$imgDir = "C:\Users\ahmer\.gemini\antigravity\scratch\legacy-wear\assets\images"

function Get-Base64Image([string]$filename) {
    $path = Join-Path $imgDir $filename
    if (Test-Path $path) {
        $bytes = [System.IO.File]::ReadAllBytes($path)
        $b64 = [System.Convert]::ToBase64String($bytes)
        $ext = [System.IO.Path]::GetExtension($filename).TrimStart('.')
        if ($ext -eq "jpg") { $ext = "jpeg" }
        return "data:image/$ext;base64,$b64"
    }
    return ""
}

$heroImgB64 = Get-Base64Image "hero-elegance.jpg"
$cartierBlackB64 = Get-Base64Image "cartier-black.jpg"

function Get-EmbeddedSVG([string]$Dial, [string]$Accent, [string]$BStart, [string]$BEnd, [string]$Strap, [bool]$IsWomen = $false) {
    $r = if ($IsWomen) { 110 } else { 130 }
    $strapW = if ($IsWomen) { 48 } else { 64 }
    $subDials = if (-not $IsWomen) {
        @"
      <circle cx="268" cy="300" r="18" fill="none" stroke="$Accent" stroke-opacity="0.3" stroke-width="1.5" />
      <circle cx="332" cy="300" r="18" fill="none" stroke="$Accent" stroke-opacity="0.3" stroke-width="1.5" />
      <circle cx="300" cy="336" r="18" fill="none" stroke="$Accent" stroke-opacity="0.3" stroke-width="1.5" />
"@
    } else { "" }

    $secHandColor = if ($IsWomen) { $Accent } else { "#E53E3E" }

    $markers = ""
    for ($i = 0; $i -lt 12; $i++) {
        $angle = ($i * 30) * [Math]::PI / 180
        $x1 = [Math]::Round(300 + ($r - 12) * [Math]::Sin($angle), 2)
        $y1 = [Math]::Round(300 - ($r - 12) * [Math]::Cos($angle), 2)
        $x2 = [Math]::Round(300 + $r * [Math]::Sin($angle), 2)
        $y2 = [Math]::Round(300 - $r * [Math]::Cos($angle), 2)
        $w = if ($i % 3 -eq 0) { 3 } else { 1.5 }
        $op = if ($i % 3 -eq 0) { 0.95 } else { 0.6 }
        $markers += "<line x1=""$x1"" y1=""$y1"" x2=""$x2"" y2=""$y2"" stroke=""$Accent"" stroke-width=""$w"" stroke-linecap=""round"" opacity=""$op"" />`n"
    }

    $yOffsetTitle = if ($IsWomen) { 30 } else { 45 }
    $yOffsetSub = if ($IsWomen) { 18 } else { 32 }

    return @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <filter id="drop-shadow-$([guid]::NewGuid().ToString().Substring(0,8))" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.1" />
    </filter>
    <linearGradient id="bezel-grad-$([guid]::NewGuid().ToString().Substring(0,8))" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="$BStart" />
      <stop offset="50%" stop-color="$BEnd" />
      <stop offset="100%" stop-color="$BStart" />
    </linearGradient>
    <radialGradient id="dial-grad-$([guid]::NewGuid().ToString().Substring(0,8))" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="$Dial" />
      <stop offset="100%" stop-color="#050505" />
    </radialGradient>
    <linearGradient id="strap-grad-$([guid]::NewGuid().ToString().Substring(0,8))" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="$Strap" />
      <stop offset="50%" stop-color="$Strap" opacity="0.85" />
      <stop offset="100%" stop-color="$Strap" />
    </linearGradient>
    <linearGradient id="glass-glare-$([guid]::NewGuid().ToString().Substring(0,8))" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35" />
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0.05" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.2" />
    </linearGradient>
  </defs>

  <rect width="100%" height="100%" fill="#F8F8F8" rx="16" />

  <g>
    <!-- Top and Bottom Straps -->
    <rect x="$(300 - $strapW/2)" y="40" width="$strapW" height="$(260 - $r)" rx="8" fill="$Strap" />
    <rect x="$(300 - $strapW/2)" y="$(300 + $r - 15)" width="$strapW" height="$(275 - $r)" rx="8" fill="$Strap" />

    <!-- Crown -->
    <rect x="$(300 + $r + 6)" y="288" width="12" height="24" rx="3" fill="$BStart" />

    <!-- Bezel -->
    <circle cx="300" cy="300" r="$($r + 14)" fill="$BStart" />
    <circle cx="300" cy="300" r="$($r + 2)" fill="#111111" opacity="0.15" />

    <!-- Dial -->
    <circle cx="300" cy="300" r="$r" fill="$Dial" />

    <!-- Markers -->
    $markers

    <!-- Sub-dials -->
    $subDials

    <!-- Brand -->
    <text x="300" y="$(300 - $yOffsetTitle)" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="$Accent" letter-spacing="3" text-anchor="middle" opacity="0.9">LEGACY WEAR</text>
    <text x="300" y="$(300 - $yOffsetSub)" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="7" font-weight="400" fill="$Accent" letter-spacing="1.5" text-anchor="middle" opacity="0.6">AUTOMATIC</text>

    <!-- Hands -->
    <line x1="300" y1="300" x2="$(300 - [Math]::Round($r * 0.38))" y2="$(300 - [Math]::Round($r * 0.38))" stroke="$Accent" stroke-width="3.5" stroke-linecap="round" />
    <line x1="300" y1="300" x2="$(300 + [Math]::Round($r * 0.55))" y2="$(300 - [Math]::Round($r * 0.55))" stroke="$Accent" stroke-width="2.5" stroke-linecap="round" />
    <line x1="$(300 - [Math]::Round($r * 0.15))" y1="$(300 + [Math]::Round($r * 0.15))" x2="$(300 + [Math]::Round($r * 0.65))" y2="$(300 - [Math]::Round($r * 0.62))" stroke="$secHandColor" stroke-width="1" stroke-linecap="round" />
    <circle cx="300" cy="300" r="5" fill="$Accent" />
  </g>
</svg>
"@
}

$cartierBlueSVG  = Get-EmbeddedSVG -Dial "#0F2027" -Accent "#E2E8F0" -BStart "#E2E8F0" -BEnd "#94A3B8" -Strap "#1E293B"
$cartierBrownSVG = Get-EmbeddedSVG -Dial "#3D2314" -Accent "#FDE68A" -BStart "#F59E0B" -BEnd "#78350F" -Strap "#4A2810"
$cartierSilverSVG= Get-EmbeddedSVG -Dial "#E2E8F0" -Accent "#111111" -BStart "#FFFFFF" -BEnd "#94A3B8" -Strap "#64748B"
$cartierGoldSVG  = Get-EmbeddedSVG -Dial "#F59E0B" -Accent "#111111" -BStart "#FBBF24" -BEnd "#92400E" -Strap "#B45309"
$cartierGreySVG  = Get-EmbeddedSVG -Dial "#334155" -Accent "#F8FAFC" -BStart "#64748B" -BEnd "#1E293B" -Strap "#475569"
$cartierWhiteSVG = Get-EmbeddedSVG -Dial "#FFFFFF" -Accent "#111111" -BStart "#E2E8F0" -BEnd "#94A3B8" -Strap "#111111"

$women1SVG = Get-EmbeddedSVG -Dial "#FFF5F5" -Accent "#9B2C2C" -BStart "#FCA5A5" -BEnd "#991B1B" -Strap "#E53E3E" -IsWomen $true
$women2SVG = Get-EmbeddedSVG -Dial "#F8FAFC" -Accent "#334155" -BStart "#E2E8F0" -BEnd "#64748B" -Strap "#64748B" -IsWomen $true
$women3SVG = Get-EmbeddedSVG -Dial "#FEFCBF" -Accent "#744210" -BStart "#FDE047" -BEnd "#854D0E" -Strap "#D69E2E" -IsWomen $true

$singleHTML = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Legacy Wear | Timeless Premium Watches</title>
  <meta name="description" content="Discover Legacy Wear. Premium design with a timeless look. Built to elevate your everyday style. DM to order on Instagram.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    /* --------------------------------------------------
       Legacy Wear - Self-Contained E-Commerce Styles
       Theme: Soft White background (#F8F8F8), Black (#111111), Grey (#666666)
       -------------------------------------------------- */
    :root {
      --bg-color: #F8F8F8;
      --card-bg: #FFFFFF;
      --text-primary: #111111;
      --text-secondary: #666666;
      --text-muted: #888888;
      --btn-bg: #111111;
      --btn-text: #FFFFFF;
      --btn-hover: #2A2A2A;
      --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
      --card-shadow-hover: 0 20px 40px rgba(0, 0, 0, 0.08);
      --border-light: rgba(0, 0, 0, 0.06);
      --radius-lg: 16px;
      --radius-md: 8px;
      --max-width: 1200px;
      --transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      font-size: 16px;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: var(--bg-color);
      color: var(--text-primary);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    h1, h2, h3, h4 {
      color: var(--text-primary);
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: -0.02em;
    }

    p {
      color: var(--text-secondary);
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    .container {
      width: 100%;
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 0 24px;
    }

    /* Site Header */
    .site-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(248, 248, 248, 0.9);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-light);
      padding: 18px 0;
    }

    .nav-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .brand-logo {
      display: flex;
      flex-direction: column;
    }

    .brand-name {
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--text-primary);
    }

    .brand-subtitle {
      font-size: 0.65rem;
      letter-spacing: 0.25em;
      color: var(--text-secondary);
      text-transform: uppercase;
      font-weight: 600;
      margin-top: -2px;
    }

    .nav-links {
      display: flex;
      gap: 32px;
      align-items: center;
    }

    .nav-link {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-secondary);
      transition: var(--transition);
    }

    .nav-link:hover {
      color: var(--text-primary);
    }

    .nav-cta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--btn-bg);
      color: var(--btn-text);
      padding: 10px 20px;
      border-radius: var(--radius-md);
      font-size: 0.85rem;
      font-weight: 600;
      transition: var(--transition);
    }

    .nav-cta:hover {
      background: var(--btn-hover);
      transform: translateY(-1px);
    }

    /* Buttons */
    .btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background-color: var(--btn-bg);
      color: var(--btn-text);
      padding: 16px 36px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: var(--radius-md);
      border: none;
      cursor: pointer;
      transition: var(--transition);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
      text-align: center;
    }

    .btn-primary:hover {
      background-color: var(--btn-hover);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
    }

    .btn-card {
      width: 100%;
      padding: 12px 20px;
      font-size: 0.9rem;
    }

    .btn-disabled {
      background-color: #E0E0E0;
      color: #888888;
      cursor: not-allowed;
      box-shadow: none;
    }

    .btn-disabled:hover {
      background-color: #E0E0E0;
      transform: none;
      box-shadow: none;
    }

    .ig-icon {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }

    /* Hero Section */
    .hero-section {
      padding: 80px 0 100px;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }

    .hero-image-wrapper {
      position: relative;
      border-radius: var(--radius-lg);
      overflow: hidden;
      background-color: var(--card-bg);
      box-shadow: var(--card-shadow);
      border: 1px solid var(--border-light);
      aspect-ratio: 1 / 1;
    }

    .hero-image-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }

    .hero-image-wrapper:hover img {
      transform: scale(1.03);
    }

    .hero-badge {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--text-secondary);
      margin-bottom: 12px;
      background: rgba(0, 0, 0, 0.04);
      padding: 6px 14px;
      border-radius: 50px;
    }

    .hero-product-name {
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-secondary);
      margin-bottom: 8px;
    }

    .hero-heading {
      font-size: 3.25rem;
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: 20px;
      letter-spacing: -0.03em;
    }

    .hero-description {
      font-size: 1.15rem;
      color: var(--text-secondary);
      margin-bottom: 32px;
      max-width: 480px;
      line-height: 1.7;
    }

    .hero-action {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .sub-text {
      font-size: 0.85rem;
      color: var(--text-secondary);
      font-weight: 500;
    }

    /* Section Headers */
    .section-header {
      text-align: center;
      margin-bottom: 56px;
    }

    .section-title {
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--text-primary);
      letter-spacing: -0.02em;
      position: relative;
      display: inline-block;
    }

    .section-title::after {
      content: '';
      display: block;
      width: 40px;
      height: 3px;
      background: var(--text-primary);
      margin: 12px auto 0;
      border-radius: 2px;
    }

    /* Product Grid & Cards */
    .mens-section, .womens-section {
      padding: 80px 0;
      border-top: 1px solid var(--border-light);
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 32px;
    }

    .product-card {
      background-color: var(--card-bg);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--card-shadow);
      border: 1px solid var(--border-light);
      display: flex;
      flex-direction: column;
      transition: var(--transition);
      position: relative;
    }

    .product-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--card-shadow-hover);
    }

    .card-img-wrapper {
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1;
      background-color: #F8F8F8;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card-img-wrapper img, .card-img-wrapper svg {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }

    .product-card:hover .card-img-wrapper img,
    .product-card:hover .card-img-wrapper svg {
      transform: scale(1.05);
    }

    .card-content {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: space-between;
    }

    .product-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 8px;
    }

    .product-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
      margin-bottom: 24px;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 2.7em;
    }

    /* Women's Coming Soon Cards */
    .coming-soon-badge {
      position: absolute;
      top: 16px;
      right: 16px;
      background: rgba(17, 17, 17, 0.85);
      backdrop-filter: blur(4px);
      color: #FFFFFF;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 6px 12px;
      border-radius: 50px;
      z-index: 2;
    }

    .coming-soon-text {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 16px;
    }

    /* Final CTA Section */
    .cta-section {
      padding: 100px 0;
      border-top: 1px solid var(--border-light);
      background-color: var(--card-bg);
    }

    .cta-box {
      text-align: center;
      max-width: 640px;
      margin: 0 auto;
    }

    .cta-heading {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: 24px;
      letter-spacing: -0.02em;
    }

    /* Footer */
    .site-footer {
      padding: 40px 0;
      border-top: 1px solid var(--border-light);
      background: var(--bg-color);
      text-align: center;
    }

    .footer-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .footer-logo {
      font-size: 1.1rem;
      font-weight: 800;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--text-primary);
    }

    .footer-copy {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .footer-link {
      color: var(--text-primary);
      font-weight: 600;
    }

    /* Responsive */
    @media (max-width: 992px) {
      .hero-grid {
        grid-template-columns: 1fr;
        gap: 40px;
        text-align: center;
      }
      .hero-action {
        align-items: center;
      }
      .hero-heading {
        font-size: 2.75rem;
      }
      .hero-description {
        margin-left: auto;
        margin-right: auto;
      }
      .hero-image-wrapper {
        max-width: 480px;
        margin: 0 auto;
      }
    }

    @media (max-width: 768px) {
      .hero-section { padding: 40px 0 60px; }
      .hero-heading { font-size: 2.25rem; }
      .section-title { font-size: 1.85rem; }
      .cta-heading { font-size: 2rem; }
      .nav-links { display: none; }
      .product-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
    }

    @media (max-width: 480px) {
      .container { padding: 0 16px; }
      .hero-heading { font-size: 1.85rem; }
      .product-grid { grid-template-columns: 1fr; }
      .btn-primary { width: 100%; }
    }
  </style>
</head>
<body>

  <!-- Navigation Header -->
  <header class="site-header">
    <div class="container nav-wrapper">
      <a href="#" class="brand-logo" aria-label="Legacy Wear Home">
        <span class="brand-name">LEGACY WEAR</span>
        <span class="brand-subtitle">TIMEPIECES</span>
      </a>

      <nav class="nav-links">
        <a href="#mens-collection" class="nav-link">Men's Collection</a>
        <a href="#womens-collection" class="nav-link">Women's Collection</a>
      </nav>

      <a href="https://instagram.com/legacywearstore" target="_blank" rel="noopener noreferrer" class="nav-cta">
        <svg class="ig-icon" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        <span>DM to Order</span>
      </a>
    </div>
  </header>

  <!-- 1. HERO SECTION -->
  <section class="hero-section">
    <div class="container">
      <div class="hero-grid">
        <div class="hero-image-wrapper">
          <img src="$heroImgB64" alt="Elegance Watch by Legacy Wear" width="600" height="600">
        </div>

        <div class="hero-content">
          <span class="hero-badge">Featured Timepiece</span>
          <div class="hero-product-name">Elegance</div>
          <h1 class="hero-heading">Our Most Loved Watch</h1>
          <p class="hero-description">
            Premium design with a timeless look. Built to elevate your everyday style.
          </p>
          <div class="hero-action">
            <a href="https://instagram.com/legacywearstore" target="_blank" rel="noopener noreferrer" class="btn-primary">
              <svg class="ig-icon" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>DM to Order</span>
            </a>
            <span class="sub-text">Click to order via Instagram DM</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 2. MEN'S COLLECTION SECTION -->
  <section id="mens-collection" class="mens-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Men’s Collection</h2>
      </div>

      <div class="product-grid">
        
        <!-- Product 1: Cartier Black -->
        <article class="product-card">
          <div class="card-img-wrapper">
            <img src="$cartierBlackB64" alt="Cartier Black Watch" width="400" height="400">
          </div>
          <div class="card-content">
            <h3 class="product-title">Cartier Black</h3>
            <p class="product-desc">Bold black finish with a clean, modern look. Perfect for everyday wear.</p>
            <a href="https://instagram.com/legacywearstore" target="_blank" rel="noopener noreferrer" class="btn-primary btn-card">DM to Order</a>
          </div>
        </article>

        <!-- Product 2: Cartier Blue -->
        <article class="product-card">
          <div class="card-img-wrapper">
            $cartierBlueSVG
          </div>
          <div class="card-content">
            <h3 class="product-title">Cartier Blue</h3>
            <p class="product-desc">Deep blue tone with a refined feel. Adds a subtle touch of class.</p>
            <a href="https://instagram.com/legacywearstore" target="_blank" rel="noopener noreferrer" class="btn-primary btn-card">DM to Order</a>
          </div>
        </article>

        <!-- Product 3: Cartier Brown -->
        <article class="product-card">
          <div class="card-img-wrapper">
            $cartierBrownSVG
          </div>
          <div class="card-content">
            <h3 class="product-title">Cartier Brown</h3>
            <p class="product-desc">Warm brown shade with a classic aesthetic. Simple and stylish.</p>
            <a href="https://instagram.com/legacywearstore" target="_blank" rel="noopener noreferrer" class="btn-primary btn-card">DM to Order</a>
          </div>
        </article>

        <!-- Product 4: Cartier Silver -->
        <article class="product-card">
          <div class="card-img-wrapper">
            $cartierSilverSVG
          </div>
          <div class="card-content">
            <h3 class="product-title">Cartier Silver</h3>
            <p class="product-desc">Clean silver design with a minimal look. Easy to match with any outfit.</p>
            <a href="https://instagram.com/legacywearstore" target="_blank" rel="noopener noreferrer" class="btn-primary btn-card">DM to Order</a>
          </div>
        </article>

        <!-- Product 5: Cartier Gold -->
        <article class="product-card">
          <div class="card-img-wrapper">
            $cartierGoldSVG
          </div>
          <div class="card-content">
            <h3 class="product-title">Cartier Gold</h3>
            <p class="product-desc">Luxury-inspired gold finish. Designed to stand out effortlessly.</p>
            <a href="https://instagram.com/legacywearstore" target="_blank" rel="noopener noreferrer" class="btn-primary btn-card">DM to Order</a>
          </div>
        </article>

        <!-- Product 6: Cartier Grey -->
        <article class="product-card">
          <div class="card-img-wrapper">
            $cartierGreySVG
          </div>
          <div class="card-content">
            <h3 class="product-title">Cartier Grey</h3>
            <p class="product-desc">Modern grey tone with a sleek appearance. Understated and premium.</p>
            <a href="https://instagram.com/legacywearstore" target="_blank" rel="noopener noreferrer" class="btn-primary btn-card">DM to Order</a>
          </div>
        </article>

        <!-- Product 7: Cartier White -->
        <article class="product-card">
          <div class="card-img-wrapper">
            $cartierWhiteSVG
          </div>
          <div class="card-content">
            <h3 class="product-title">Cartier White</h3>
            <p class="product-desc">Fresh white look with a minimal vibe. Light, clean and elegant.</p>
            <a href="https://instagram.com/legacywearstore" target="_blank" rel="noopener noreferrer" class="btn-primary btn-card">DM to Order</a>
          </div>
        </article>

      </div>
    </div>
  </section>

  <!-- 3. WOMEN'S COLLECTION SECTION -->
  <section id="womens-collection" class="womens-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Women’s Collection</h2>
      </div>

      <div class="product-grid">
        
        <!-- Women Card 1 -->
        <article class="product-card">
          <span class="coming-soon-badge">Coming Soon</span>
          <div class="card-img-wrapper">
            $women1SVG
          </div>
          <div class="card-content">
            <span class="coming-soon-text">Coming Soon</span>
            <button type="button" class="btn-primary btn-card btn-disabled" disabled>Coming Soon</button>
          </div>
        </article>

        <!-- Women Card 2 -->
        <article class="product-card">
          <span class="coming-soon-badge">Coming Soon</span>
          <div class="card-img-wrapper">
            $women2SVG
          </div>
          <div class="card-content">
            <span class="coming-soon-text">Coming Soon</span>
            <button type="button" class="btn-primary btn-card btn-disabled" disabled>Coming Soon</button>
          </div>
        </article>

        <!-- Women Card 3 -->
        <article class="product-card">
          <span class="coming-soon-badge">Coming Soon</span>
          <div class="card-img-wrapper">
            $women3SVG
          </div>
          <div class="card-content">
            <span class="coming-soon-text">Coming Soon</span>
            <button type="button" class="btn-primary btn-card btn-disabled" disabled>Coming Soon</button>
          </div>
        </article>

      </div>
    </div>
  </section>

  <!-- 4. FINAL CTA SECTION -->
  <section class="cta-section">
    <div class="container">
      <div class="cta-box">
        <h2 class="cta-heading">Ready to order your watch?</h2>
        <a href="https://instagram.com/legacywearstore" target="_blank" rel="noopener noreferrer" class="btn-primary">
          <svg class="ig-icon" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>DM to Order</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container footer-content">
      <div class="footer-logo">LEGACY WEAR</div>
      <p class="footer-copy">&copy; 2026 Legacy Wear. All rights reserved. Order via <a href="https://instagram.com/legacywearstore" target="_blank" rel="noopener noreferrer" class="footer-link">@legacywearstore</a></p>
    </div>
  </footer>

</body>
</html>
"@

Set-Content -Path "C:\Users\ahmer\.gemini\antigravity\scratch\legacy-wear\legacy_wear_landing_page.html" -Value $singleHTML -Encoding UTF8
Set-Content -Path "C:\Users\ahmer\.gemini\antigravity\scratch\legacy-wear\index.html" -Value $singleHTML -Encoding UTF8
Write-Host "Created single self-contained HTML file successfully!"
