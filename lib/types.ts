export type CategorySlug =
  | "fruits"
  | "vegetables"
  | "dairy"
  | "bakery"
  | "organic-foods"
  | "dry-fruits"
  | "beverages"
  | "healthy-snacks";

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  description: string;
  image: string;
  icon: string;
  productCount: number;
  accent: string; // tailwind gradient classes
}

export interface NutritionFacts {
  servingSize: string;
  calories: number;
  protein: number; // grams
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export type ProductBadge =
  | "bestseller"
  | "trending"
  | "new"
  | "organic"
  | "deal"
  | "limited";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  price: number;
  salePrice?: number;
  unit: string; // e.g. "per kg", "500 g"
  rating: number;
  reviewCount: number;
  images: string[];
  shortDescription: string;
  description: string;
  badges: ProductBadge[];
  freshnessScore: number; // 0 - 100
  origin: string;
  inStock: boolean;
  stockCount: number;
  tags: string[];
  ingredients: string[];
  nutrition: NutritionFacts;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
  location: string;
}

export interface Recipe {
  id: string;
  title: string;
  slug: string;
  image: string;
  time: string;
  difficulty: "Easy" | "Medium" | "Hard";
  servings: number;
  category: string;
  description: string;
}

export interface Farmer {
  id: string;
  name: string;
  farm: string;
  location: string;
  image: string;
  quote: string;
  years: number;
  specialty: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  cadence: string;
  features: string[];
  popular: boolean;
  savings: string;
}

export interface Coupon {
  code: string;
  description: string;
  type: "percent" | "flat";
  value: number;
  minSpend: number;
}
