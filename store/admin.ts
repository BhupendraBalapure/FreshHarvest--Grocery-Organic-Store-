"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CategorySlug } from "@/lib/types";
import { products as seedProducts } from "@/lib/data/products";
import { categories as seedCategories } from "@/lib/data/categories";
import {
  seedOrders,
  type AdminOrder,
  type OrderStatus,
} from "@/lib/data/admin";

export interface AdminProduct {
  id: string;
  name: string;
  category: CategorySlug;
  price: number;
  salePrice?: number;
  unit: string;
  stockCount: number;
  inStock: boolean;
  image: string;
  rating: number;
  organic: boolean;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
}

const initialProducts: AdminProduct[] = seedProducts.map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  price: p.price,
  salePrice: p.salePrice,
  unit: p.unit,
  stockCount: p.stockCount,
  inStock: p.inStock,
  image: p.images[0],
  rating: p.rating,
  organic: p.badges.includes("organic"),
}));

const initialCategories: AdminCategory[] = seedCategories.map((c) => ({
  id: c.id,
  name: c.name,
  slug: c.slug,
  icon: c.icon,
  productCount: c.productCount,
}));

interface AdminState {
  products: AdminProduct[];
  categories: AdminCategory[];
  orders: AdminOrder[];
  // product CRUD
  addProduct: (p: Omit<AdminProduct, "id">) => void;
  updateProduct: (id: string, p: Partial<AdminProduct>) => void;
  deleteProduct: (id: string) => void;
  // category CRUD
  addCategory: (c: Omit<AdminCategory, "id">) => void;
  updateCategory: (id: string, c: Partial<AdminCategory>) => void;
  deleteCategory: (id: string) => void;
  // orders
  setOrderStatus: (id: string, status: OrderStatus) => void;
  resetData: () => void;
}

let counter = 0;
const uid = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${counter++}`;

export const useAdmin = create<AdminState>()(
  persist(
    (set) => ({
      products: initialProducts,
      categories: initialCategories,
      orders: seedOrders,

      addProduct: (p) =>
        set((s) => ({
          products: [{ ...p, id: uid("p") }, ...s.products],
        })),
      updateProduct: (id, patch) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id ? { ...p, ...patch } : p,
          ),
        })),
      deleteProduct: (id) =>
        set((s) => ({ products: s.products.filter((p) => p.id !== id) })),

      addCategory: (c) =>
        set((s) => ({
          categories: [{ ...c, id: uid("cat") }, ...s.categories],
        })),
      updateCategory: (id, patch) =>
        set((s) => ({
          categories: s.categories.map((c) =>
            c.id === id ? { ...c, ...patch } : c,
          ),
        })),
      deleteCategory: (id) =>
        set((s) => ({
          categories: s.categories.filter((c) => c.id !== id),
        })),

      setOrderStatus: (id, status) =>
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === id ? { ...o, status } : o,
          ),
        })),

      resetData: () =>
        set({
          products: initialProducts,
          categories: initialCategories,
          orders: seedOrders,
        }),
    }),
    { name: "freshharvest-admin" },
  ),
);
