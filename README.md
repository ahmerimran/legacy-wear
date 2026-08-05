# LegacyWearStore

![Legacy Wear Logo](./public/logo.jpeg)

A premium watch and accessories brand website built for **LegacyWearStore**.

LegacyWearStore is a modern, luxury-inspired e-commerce landing page designed to showcase watches with a clean interface, premium visuals, and a simple Instagram-based purchase experience.

---

## ✨ Features

- 🕒 Men's watch collection
- 👩 Women's watch collection
- 🛍 Dynamic product card system
- 📱 Instagram DM purchase flow
- 🖼 Product image management
- ⚡ Fast and responsive UI
- 💻 Mobile & desktop support
- 🎨 Premium luxury-inspired design

---

## 🛠 Tech Stack

This project is built using:

- **React**
- **Vite**
- **JavaScript (ES6+)**
- **CSS**

---

## 📂 Project Structure

```
legacy-wear/
│
├── public/
│   │
│   └── products/
│       └── Watch product images
│
├── src/
│   │
│   ├── components/
│   │   └── ProductCard.jsx
│   │
│   ├── data/
│   │   └── products.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

---

# 🛍 Product System

All products are managed from:

```
src/data/products.js
```

Each product contains:

- Product ID
- Product name
- Price
- Description
- Image
- Category
- Purchase link

Example:

```javascript
{
  id: "watch-001",
  name: "Cartier Black",
  price: "Rs. 2,499",
  description: "Luxury-inspired black watch.",
  image: "/products/watch.jpg",
  category: "Men"
}
```

➕ Adding New Products
To add a new watch:

1. Open:

```
src/data/products.js
```

2. Add a new product object.
3. Add:
   * Name
   * Price
   * Description
   * Image path
   * Category
4. Save the file.

No component changes are required.

📱 Purchase System
LegacyWearStore uses an Instagram-based purchase system.
When a customer clicks:

```
Purchase Now
```

The system:

1. Opens LegacyWearStore Instagram DM.
2. Prepares product information for the customer.
3. Allows customers to directly contact the brand.

Instagram:

```
https://instagram.com/legacywearstore
```

🚀 Installation & Setup

1. Clone Repository

```bash
git clone <repository-url>
```

2. Open Project Folder

```bash
cd legacy-wear
```

3. Install Dependencies

```bash
npm install
```

4. Start Development Server

```bash
npm run dev
```

The project will run locally using Vite.

📦 Production Build
To create a production build:

```bash
npm run build
```

To preview the build:

```bash
npm run preview
```

🔄 Git Workflow
After making changes:

```bash
git add .
```

Commit changes:

```bash
git commit -m "Your update message"
```

Push to GitHub:

```bash
git push
```

📌 Future Improvements
Possible future updates:

* Online checkout system
* Payment integration
* Customer accounts
* Product filters
* Search functionality
* Admin dashboard
* Order management system

👑 About LegacyWearStore
LegacyWearStore is focused on delivering stylish, premium-looking watches and accessories with a modern shopping experience.
Luxury. Style. Legacy.
© LegacyWearStore
