// data/products.js
// ─────────────────────────────────────────────────────────────────────
//  LEGACY WEAR — Product Data System
//
//  HOW TO ADD A NEW WATCH:
//  1. Copy one of the objects below.
//  2. Paste it into the appropriate array (mensWatches or womensWatches).
//  3. Give it a unique `id`, update the fields, and you're done.
//  No component changes are ever required.
//
//  Each product object:
//  {
//    id          – Unique identifier (string)
//    name        – Display name shown on the card
//    price       – Price string (e.g. "Rs. 4,999")
//    description – Short product description (1-2 sentences)
//    image       – Path to image in /public/products/ OR a full URL
//    category    – "Men" | "Women"
//    purchaseLink– URL for the "Purchase Now" button
//  }
// ─────────────────────────────────────────────────────────────────────

const INSTAGRAM_USERNAME = "legacywearstore";

const createPurchaseLink = (product) => {
  const message = `Hi LegacyWear 👋

I'm interested in:

🛍 Product: ${product.name}
💰 Price: ${product.price}

  Please share details. Thanks!`;

  return {
    url: `https://www.instagram.com/${INSTAGRAM_USERNAME}`,
    text: message,
  };
};

// ── Men's Collection ──────────────────────────────────────────────────
export const mensWatches = [
  {
    id: 'men-cartier-black',
    name: 'Cartier Black',
    price: 'Rs. 2,499',
    description:
      'Bold black finish with a clean, modern look. Perfect for everyday wear.',
    // Replace this URL with: '/products/cartier-black.jpg' once you add the image
    image:
      '/products/cartier-black.jpg',
    category: 'Men',
    purchaseLink: createPurchaseLink({
  name: 'Cartier Black',
  price: 'Rs. 2,499'
}),
  },
  {
    id: 'men-cartier-blue',
    name: 'Cartier Blue',
    price: 'Rs. 2,499',
    description:
      'Deep blue tone with a refined feel. Adds a subtle touch of class.',
    image:
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80',
    category: 'Men',
    purchaseLink: createPurchaseLink({
  name: 'Cartier Blue',
  price: 'Rs. 2,499'
}),
  },
  {
    id: 'men-cartier-brown',
    name: 'Cartier Brown',
    price: 'Rs. 2,499',
    description:
      'Warm brown shade with a classic aesthetic. Simple and stylish.',
    image:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
    category: 'Men',
    purchaseLink: createPurchaseLink({
  name: 'Cartier Brown',
  price: 'Rs. 2,499'
}),
  },
  {
    id: 'men-cartier-brown',
    name: 'Cartier Brown (Roman)',
    price: 'Rs. 2,499',
    description:
      'Clean gold design with a minimal look. Easy to match with any outfit.',
    image:
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&q=80',
    category: 'Men',
    purchaseLink: createPurchaseLink({
  name: 'Cartier Brown(Roman)',
  price: 'Rs. 2,499'
}),
  },
  {
    id: 'men-cartier-black',
    name: 'Cartier Black (Roman)',
    price: 'Rs. 2,499',
    description:
      'Luxury-inspired gold finish. Designed to stand out effortlessly.',
    image:
      'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80',
    category: 'Men',
    purchaseLink: createPurchaseLink({
  name: 'Cartier Black (Roman)',
  price: 'Rs. 2,499'
}),
  },
  {
    id: 'men-elegance',
    name: 'Elegance',
    price: 'Rs. 3,799',
    description:
      'Modern watch with a sleek appearance. Understated and premium.',
    image:
      'https://images.unsplash.com/photo-1590664216364-0e2116ec5ac3?w=600&q=80',
    category: 'Men',
    purchaseLink: createPurchaseLink({
  name: 'Elegance',
  price: 'Rs. 3,799'
}),
  },
]

// ── Women's Collection ────────────────────────────────────────────────
// Currently showing "Coming Soon" placeholder cards.
// Replace placeholders with real product objects when ready.
export const womensWatches = [
  {
    id: 'women-placeholder-1',
    name: 'Coming Soon',
    price: 'Coming Soon',
    description: 'An exquisite new timepiece is on its way.',
    image: null, // null triggers the placeholder UI in ProductCard
    category: 'Women',
    purchaseLink: null, // null disables the purchase button
    comingSoon: true,  // flag used by ProductCard to render placeholder state
  },
  {
    id: 'women-placeholder-2',
    name: 'Coming Soon',
    price: 'Coming Soon',
    description: 'A refined piece crafted for the modern woman.',
    image: null,
    category: 'Women',
    purchaseLink: null,
    comingSoon: true,
  },
  {
    id: 'women-placeholder-3',
    name: 'Coming Soon',
    price: 'Coming Soon',
    description: 'Timeless elegance, designed just for you.',
    image: null,
    category: 'Women',
    purchaseLink: null,
    comingSoon: true,
  },
]
