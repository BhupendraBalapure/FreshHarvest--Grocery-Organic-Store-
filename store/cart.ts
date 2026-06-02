"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product, Coupon } from "@/lib/types";

interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  applyCoupon: (coupon: Coupon | null) => void;
  // derived selectors
  totalItems: () => number;
  subtotal: () => number;
  discount: () => number;
  total: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.id === product.id,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { product, quantity }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.product.id !== productId)
              : state.items.map((i) =>
                  i.product.id === productId ? { ...i, quantity } : i,
                ),
        })),
      clear: () => set({ items: [], coupon: null }),
      applyCoupon: (coupon) => set({ coupon }),
      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () =>
        get().items.reduce(
          (sum, i) =>
            sum + (i.product.salePrice ?? i.product.price) * i.quantity,
          0,
        ),
      discount: () => {
        const { coupon } = get();
        const sub = get().subtotal();
        if (!coupon || sub < coupon.minSpend) return 0;
        return coupon.type === "percent"
          ? Math.round((sub * coupon.value) / 100)
          : coupon.value;
      },
      total: () => Math.max(0, get().subtotal() - get().discount()),
    }),
    { name: "freshharvest-cart" },
  ),
);
