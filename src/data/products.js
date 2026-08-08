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

const WHATSAPP_NUMBER = "923717047369"; // replace with your actual number (country code, no + or leading 0)

const createPurchaseLink = (product) => {
  const message = `Hi LegacyWear 

I'm interested in:

Product: *${product.name}*
Price: *${product.price}*

Please share details. Thanks!`;

  return {
    text: message,
  };
};

// ── Men's Collection ──────────────────────────────────────────────────
export const mensWatches = [
  {
    id: 'men-cartier-black-silver',
    name: 'Cartier Black (Roman)',
    price: 'Rs. 2,975',
    originalPrice: 'Rs. 3,500',
    description:
      'Black and silver finish with a clean, modern look. Perfect for everyday wear.',
    // Replace this URL with: '/products/cartier-black.jpg' once you add the image
    images: [
      'products/cartier-black-silver.jpeg',
      'products/cartier-black-silver-1.png',
  ],
    category: 'Men',
    purchaseLink: createPurchaseLink({
  name: 'Cartier Black',
  price: 'Rs. 2,975'
}),
  },
  {
    id: 'men-cartier-blue',
    name: 'Cartier Blue',
    price: 'Rs. 2,465',
    originalPrice: 'Rs. 2,900',
    description:
      'Deep blue tone with a refined feel. Adds a subtle touch of class.',
    images : [
      'products/cartier-blue.jpeg',
      'products/cartier-blue-1.png',
    ],
    category: 'Men',
    purchaseLink: createPurchaseLink({
  name: 'Cartier Blue',
  price: 'Rs. 2,465'
}),
  },
  {
    id: 'men-cartier-brown',
    name: 'Cartier Brown',
    price: 'Rs. 2,975',
    originalPrice: 'Rs. 3,000',
    description:
      'Warm brown shade with a classic aesthetic. Simple and stylish.',
    images: [
      'products/cartier-brown.jpeg',
      'products/cartier-brown-1.png',
  ],
    category: 'Men',
    purchaseLink: createPurchaseLink({
  name: 'Cartier Brown',
  price: 'Rs. 2,975'
}),
  },
  {
    id: 'men-cartier-black-gold',
    name: 'Cartier Black (Roman)',
    price: 'Rs. 2,465',
    originalPrice: 'Rs. 2,900',
    description:
      'Clean gold design with a minimal look. Easy to match with any outfit.',
    images: [ 
       'products/cartier-black-gold.jpeg',
       'products/cartier-black-gold-1.png',
    ],
    category: 'Men',
    purchaseLink: createPurchaseLink({
  name: 'Cartier Black (Roman)',
  price: 'Rs. 2,465'
}),
  },
  {
    id: 'men-cartier-black',
    name: 'Cartier Black (Roman)',
    price: 'Rs. 2,465',
    originalPrice: 'Rs. 2,900',
    description:
      'Luxury-inspired black finish. Designed to stand out effortlessly.',
    images : [
      'products/cartier-black.jpeg',
      'products/cartier-black-1.png',
    ],
    category: 'Men',
    purchaseLink: createPurchaseLink({
  name: 'Cartier Black (Roman)',
  price: 'Rs. 2,465'
}),
  },
  {
    id: 'men-elegance',
    name: 'Elegance',
    price: 'Rs. 3,799',
    originalPrice: 'Rs. 4,400',
    description:
      'Modern watch with a sleek appearance. Understated and premium.',
    images : [
      'products/elegance.jpeg',
      'products/elegance-1.png',
    ],
    category: 'Men',
    purchaseLink: createPurchaseLink({
  name: 'Elegance',
  price: 'Rs. 3,740'
}),
  },
  {
    id: 'men-placeholder-1',
    name: 'Coming Soon',
    price: 'Coming Soon',
    description: 'An exquisite new timepiece is on its way.',
    image: null, // null triggers the placeholder UI in ProductCard
    category: 'Men',
    purchaseLink: null, // null disables the purchase button
    comingSoon: true,  // flag used by ProductCard to render placeholder state
  },
  {
    id: 'men-placeholder-2',
    name: 'Coming Soon',
    price: 'Coming Soon',
    description: 'An exquisite new timepiece is on its way.',
    image: null, // null triggers the placeholder UI in ProductCard
    category: 'Men',
    purchaseLink: null, // null disables the purchase button
    comingSoon: true,  // flag used by ProductCard to render placeholder state
  },
]

// ── Women's Collection ────────────────────────────────────────────────
// Currently showing "Coming Soon" placeholder cards.
// Replace placeholders with real product objects when ready.
export const womensWatches = [
  {
    id: 'women-newfande-gold',
    name: 'New Fande (Gold)',
    price: '3,910',
    originalPrice: '4,600',
    description: 'Clean gold design with a minimal look.',
    image: '/products/newfande-gold.jpg', 
    category: 'Women',
    purchaseLink: createPurchaseLink({
  name: 'New Fande (Gold)',
  price: 'Rs. 3,910'
}),
  },
  {
    id: 'women-newfande-silver',
    name: 'New Fande (Silver)',
    price: '3,910',
    originalPrice: '4,600',
    description: 'Clean silver design with a minimal look.',
    image: '/products/newfande-silver.jpg', 
    category: 'Women',
    purchaseLink: createPurchaseLink({
  name: 'New Fande (Silver)',
  price: 'Rs. 3,910'
}),
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
