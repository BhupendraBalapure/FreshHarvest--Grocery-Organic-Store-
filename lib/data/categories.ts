import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "cat-fruits",
    name: "Fruits",
    slug: "fruits",
    description: "Hand-picked, sun-ripened seasonal fruits",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80&auto=format&fit=crop",
    icon: "🍎",
    productCount: 128,
    accent: "from-rose-400/20 to-orange-400/20",
  },
  {
    id: "cat-vegetables",
    name: "Vegetables",
    slug: "vegetables",
    description: "Crisp farm-fresh greens delivered daily",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80&auto=format&fit=crop",
    icon: "🥦",
    productCount: 156,
    accent: "from-emerald-400/20 to-lime-400/20",
  },
  {
    id: "cat-dairy",
    name: "Dairy",
    slug: "dairy",
    description: "Pure milk, cheese & creamery favourites",
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80&auto=format&fit=crop",
    icon: "🥛",
    productCount: 64,
    accent: "from-sky-400/20 to-indigo-400/20",
  },
  {
    id: "cat-bakery",
    name: "Bakery",
    slug: "bakery",
    description: "Warm artisanal breads baked at dawn",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80&auto=format&fit=crop",
    icon: "🥐",
    productCount: 48,
    accent: "from-amber-400/20 to-orange-400/20",
  },
  {
    id: "cat-organic",
    name: "Organic Foods",
    slug: "organic-foods",
    description: "Certified organic pantry essentials",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80&auto=format&fit=crop",
    icon: "🌿",
    productCount: 92,
    accent: "from-teal-400/20 to-emerald-400/20",
  },
  {
    id: "cat-dry-fruits",
    name: "Dry Fruits",
    slug: "dry-fruits",
    description: "Premium nuts & nutrient-rich dry fruits",
    image:
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=800&q=80&auto=format&fit=crop",
    icon: "🥜",
    productCount: 54,
    accent: "from-amber-500/20 to-yellow-400/20",
  },
  {
    id: "cat-beverages",
    name: "Beverages",
    slug: "beverages",
    description: "Cold-pressed juices & wellness teas",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80&auto=format&fit=crop",
    icon: "🧃",
    productCount: 76,
    accent: "from-orange-400/20 to-rose-400/20",
  },
  {
    id: "cat-snacks",
    name: "Healthy Snacks",
    slug: "healthy-snacks",
    description: "Guilt-free bites for every craving",
    image:
      "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=800&q=80&auto=format&fit=crop",
    icon: "🥨",
    productCount: 88,
    accent: "from-fuchsia-400/20 to-orange-400/20",
  },
];

export const categoryBySlug = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
);
