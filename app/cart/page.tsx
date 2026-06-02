"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { useMounted } from "@/hooks/use-mounted";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const mounted = useMounted();
  const { items, updateQuantity, removeItem, subtotal, total, discount, coupon } =
    useCart();

  if (!mounted) return <div className="container py-20" />;

  if (items.length === 0) {
    return (
      <div className="container flex flex-col items-center gap-5 py-24 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="h-11 w-11 text-muted-foreground" />
        </span>
        <h1 className="font-display text-2xl font-bold">Your cart is empty</h1>
        <p className="max-w-sm text-muted-foreground">
          Looks like you haven't added anything yet. Let's fix that.
        </p>
        <Button asChild size="lg">
          <Link href="/shop">Browse Products</Link>
        </Button>
      </div>
    );
  }

  const delivery = subtotal() >= 499 ? 0 : 40;

  return (
    <div className="container py-10">
      <h1 className="mb-8 font-display text-3xl font-bold">Shopping Cart</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft"
            >
              <Link
                href={`/product/${item.product.slug}`}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border"
              >
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <div>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="font-semibold hover:text-primary"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {item.product.unit} · {item.product.origin}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-muted-foreground hover:text-destructive"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-full border border-border">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary"
                      aria-label="Decrease"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-9 text-center font-semibold tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary"
                      aria-label="Increase"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="font-display text-lg font-bold">
                    {formatPrice(
                      (item.product.salePrice ?? item.product.price) *
                        item.quantity,
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-soft lg:sticky lg:top-28">
          <h2 className="font-display text-lg font-bold">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal())}</span>
            </div>
            {discount() > 0 && (
              <div className="flex justify-between text-success">
                <span>Discount ({coupon?.code})</span>
                <span>-{formatPrice(discount())}</span>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery</span>
              <span>{delivery === 0 ? "FREE" : formatPrice(delivery)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 font-display text-xl font-bold">
              <span>Total</span>
              <span>{formatPrice(total() + delivery)}</span>
            </div>
          </div>
          <Button asChild size="lg" className="mt-5 w-full">
            <Link href="/checkout">
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost" className="mt-2 w-full">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
