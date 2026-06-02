# 🌿 FreshHarvest — Premium Grocery & Organic Store

A world-class, billion-dollar-startup-grade grocery marketplace built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Framer Motion** and **Zustand**. Premium UI/UX, glassmorphism, dark mode, smooth scroll animations and a fully interactive cart/wishlist — all running on rich dummy data (no database required).

> Brand palette: **Fresh Orange `#FF6B35`** · Warm Cream `#FFF4E6` · Charcoal `#2D2D2D` · light **and** dark themes.

---

## ✨ Features

### Homepage (15 sections)
Sticky glass navbar (mega-menu, search, live cart/wishlist badges) · Hero with Same-Day Delivery badge & floating cards · Shop by Category (8) · **Flash Deals with live countdown** · Best Sellers · Trending · Fresh Arrivals · Why Choose Us · Subscription Plans · Farmer Stories · Recipe Recommendations · Testimonials marquee · Mobile App promo · Newsletter (validated) · Premium footer.

### Commerce
- 🛒 **Cart drawer** + full cart page (qty, free-shipping progress, coupons)
- ❤️ **Wishlist** with persistence
- 🎟️ **Coupon system** (`FRESH20`, `HARVEST100`, `ORGANIC15`)
- 🧾 **Multi-step checkout** with **delivery-slot selection**
- 🔍 **Shop** page with search, category / price / rating / organic filters & sorting
- 📦 **Product page** — gallery, freshness score, origin, nutrition facts, ingredients, reviews, related products, frequently-bought-together
- 👤 **User dashboard** — overview, orders, wishlist, addresses, notifications, loyalty points
- 📊 **Admin / Seller Hub** — analytics, sales chart, product & order tables

### Engineering
- 🌗 Light/dark theme toggle (`next-themes`, persisted)
- 🎬 Framer Motion scroll-reveal, hover, page & stagger animations + skeleton loaders
- 🗃️ Zustand stores (`cart`, `wishlist`, `recently-viewed`, `ui`) with `localStorage` persistence
- 🧩 Hand-built shadcn-style UI primitives (no heavy Radix deps)
- 🔎 SEO: per-page metadata, Open Graph, `sitemap.xml`, `robots.txt`, product **JSON-LD**

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open **http://localhost:3000**.

### ⚠️ Windows note — `&` in the folder name
This project lives in a folder named `FreshHarvest -Grocery & Organic Store`. The `&`
character breaks npm's CLI shim on Windows (`npm run dev` / `npm run build` may fail
with `'Organic' is not recognized…`). Two options:

1. **Recommended:** rename the folder to remove the `&` (e.g. `FreshHarvest`), then
   `npm run dev` works normally.
2. **Or** invoke Next directly through Node (works as-is):
   ```bash
   node ".\node_modules\next\dist\bin\next" dev      # dev server
   node ".\node_modules\next\dist\bin\next" build    # production build
   ```

> If port 3000 is busy, Next automatically uses 3001.

---

## 🧱 Tech Stack
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Framer Motion ·
Zustand · React Hook Form + Zod · next-themes · lucide-react · sonner.

## 📁 Structure
```
app/            routes (home, shop, product/[slug], cart, checkout, dashboard, admin) + SEO
components/
  ui/           button, card, badge, input, sheet, skeleton, slot, separator
  layout/       navbar, footer, cart-drawer, theme-toggle
  home/         the 15 homepage sections
  product/      product-card, product-rail, product-detail
  shop/         shop-client (filters)
  shared/       reveal, section-heading, star-rating, countdown-timer
lib/            utils, types, motion, data/ (products, categories, …)
store/          cart, wishlist, recently-viewed, ui
hooks/          use-mounted, use-countdown
```

## 🔭 Roadmap (deferred)
Real backend (Prisma + PostgreSQL), NextAuth authentication, API routes, payments
and full admin CRUD — intentionally left for a follow-up pass; the current build is a
complete, polished frontend on dummy data.
