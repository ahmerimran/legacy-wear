# public/ — Static Assets for Legacy Wear

Place your static image assets here. Vite serves this folder at the root URL (`/`).

## Folder Structure

```
public/
├── logo.png              ← Your brand logo (referenced by Navbar.jsx)
│
├── products/             ← Watch product images
│   ├── cartier-black.jpg
│   ├── cartier-blue.jpg
│   ├── cartier-brown.jpg
│   ├── cartier-silver.jpg
│   ├── cartier-gold.jpg
│   ├── cartier-grey.jpg
│   └── cartier-white.jpg
│
└── banners/              ← Hero and promotional banners
    └── hero.jpg
```

## How to Replace Placeholder Images

### Logo
1. Place your logo file at `public/logo.png` (PNG/SVG/WebP all work).
2. No code change needed — Navbar.jsx already points to `/logo.png`.

### Product Images
1. Place each watch image in `public/products/` (e.g. `cartier-black.jpg`).
2. Open `src/data/products.js`.
3. Update each product's `image` field:
   ```js
   image: '/products/cartier-black.jpg',
   ```
4. Done — no component changes required.

### Hero Banner
1. Place your banner at `public/banners/hero.jpg`.
2. Open `src/components/HeroBanner.jsx`.
3. Update `BANNER_IMAGE`:
   ```js
   const BANNER_IMAGE = '/banners/hero.jpg'
   ```

## Recommended Image Specs

| Asset        | Format   | Recommended Size      |
|-------------|----------|-----------------------|
| Logo        | PNG/SVG  | 320×96px (2x)        |
| Product     | JPG/WebP | 800×800px (1:1 ratio)|
| Hero banner | JPG/WebP | 1920×1080px          |
