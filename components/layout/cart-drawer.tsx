"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { useMounted } from "@/hooks/use-mounted";
import { Sheet, SheetHeader } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { coupons } from "@/lib/data/subscriptions";

const FREE_SHIPPING_THRESHOLD = 499;

export function CartDrawer() {
  const { cartOpen, closeCart } = useUI();
  const mounted = useMounted();
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    discount,
    total,
    coupon,
    applyCoupon,
  } = useCart();

  const sub = mounted ? subtotal() : 0;
  const disc = mounted ? discount() : 0;
  const grand = mounted ? total() : 0;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - sub);
  const progress = Math.min(100, (sub / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <Sheet open={cartOpen} onClose={closeCart} label="Shopping cart">
      <SheetHeader
        title="Your Cart"
        subtitle={`${items.length} ${items.length === 1 ? "item" : "items"}`}
        onClose={closeCart}
      />

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <ShoppingBag className="h-9 w-9 text-muted-foreground" />
          </span>
          <div>
            <p className="font-display text-lg font-semibold">
              Your cart is empty
            </p>
            <p className="text-sm text-muted-foreground">
              Add fresh picks to get started.
            </p>
          </div>
          <Button onClick={closeCart} asChild>
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <>
          {/* Free shipping progress */}
          <div className="border-b border-border bg-secondary/40 px-5 py-3">
            {remaining > 0 ? (
              <p className="text-xs text-muted-foreground">
                Add{" "}
                <span className="font-semibold text-primary">
                  {formatPrice(remaining)}
                </span>{" "}
                more for <span className="font-semibold">FREE delivery</span>
              </p>
            ) : (
              <p className="text-xs font-semibold text-success">
                🎉 You've unlocked FREE delivery!
              </p>
            )}
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-3 py-3"
                >
                  <Link
                    href={`/product/${item.product.slug}`}
                    onClick={closeCart}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary/40"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <p className="line-clamp-2 text-sm font-semibold leading-snug">
                        {item.product.name}
                      </p>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        aria-label="Remove"
                        className="text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item.product.unit}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-secondary"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-secondary"
                          aria-label="Increase"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-display text-sm font-bold">
                        {formatPrice(
                          (item.product.salePrice ?? item.product.price) *
                            item.quantity,
                        )}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-t border-border p-5">
            {/* Coupons */}
            <div className="mb-4">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <Tag className="h-3.5 w-3.5" /> Apply a coupon
              </p>
              <div className="flex flex-wrap gap-2">
                {coupons.map((c) => {
                  const active = coupon?.code === c.code;
                  return (
                    <button
                      key={c.code}
                      onClick={() => applyCoupon(active ? null : c)}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-dashed border-border hover:border-primary hover:text-primary"
                      }`}
                    >
                      {c.code}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatPrice(sub)}</span>
              </div>
              {disc > 0 && (
                <div className="flex justify-between text-success">
                  <span>Discount ({coupon?.code})</span>
                  <span className="tabular-nums">-{formatPrice(disc)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery</span>
                <span>{remaining > 0 ? formatPrice(40) : "FREE"}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-display text-base font-bold">
                <span>Total</span>
                <span className="tabular-nums">
                  {formatPrice(grand + (remaining > 0 ? 40 : 0))}
                </span>
              </div>
            </div>

            <Button asChild size="lg" className="mt-4 w-full">
              <Link href="/checkout" onClick={closeCart}>
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </>
      )}
    </Sheet>
  );
}
