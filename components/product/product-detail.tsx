"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Leaf,
  MapPin,
  Star,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/types";
import { cn, formatPrice, discountPercent } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { useUI } from "@/store/ui";
import { useRecentlyViewed } from "@/store/recently-viewed";
import { StarRating } from "@/components/shared/star-rating";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ProductDetail({
  product,
  related,
  frequentlyBought,
}: {
  product: Product;
  related: Product[];
  frequentlyBought: Product[];
}) {
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  const addItem = useCart((s) => s.addItem);
  const openCart = useUI((s) => s.openCart);
  const toggleWishlist = useWishlist((s) => s.toggle);
  const wishlistItems = useWishlist((s) => s.items);
  const addRecent = useRecentlyViewed((s) => s.add);
  const isWishlisted = wishlistItems.some((i) => i.id === product.id);

  useEffect(() => {
    addRecent(product);
  }, [product, addRecent]);

  const off = discountPercent(product.price, product.salePrice);

  function handleAdd() {
    addItem(product, qty);
    openCart();
    toast.success(`${qty} × ${product.name} added to cart`);
  }

  const bundleTotal =
    (product.salePrice ?? product.price) +
    frequentlyBought.reduce((s, p) => s + (p.salePrice ?? p.price), 0);

  return (
    <div className="container py-8 lg:py-12">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/shop" className="hover:text-primary">
          Shop
        </Link>{" "}
        / <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Top: gallery + buy box */}
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div className="flex flex-col gap-4">
          <motion.div
            key={activeImg}
            initial={{ opacity: 0.4, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-secondary/40"
          >
            <Image
              src={product.images[activeImg]}
              alt={product.name}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
            {off > 0 && (
              <span className="absolute left-4 top-4 rounded-full bg-destructive px-3 py-1 text-sm font-bold text-destructive-foreground">
                -{off}% OFF
              </span>
            )}
          </motion.div>

          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-colors",
                    activeImg === i ? "border-primary" : "border-border",
                  )}
                >
                  <Image
                    src={src}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Buy box */}
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {product.badges.includes("organic") && (
              <Badge variant="success">
                <Leaf className="h-3 w-3" /> Organic
              </Badge>
            )}
            {product.badges.includes("bestseller") && (
              <Badge variant="accent">Bestseller</Badge>
            )}
            {product.badges.includes("trending") && <Badge>Trending</Badge>}
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={product.rating} size={18} showValue />
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          <p className="mt-4 text-muted-foreground">
            {product.shortDescription}
          </p>

          <div className="mt-6 flex items-end gap-3">
            <span className="font-display text-4xl font-bold">
              {formatPrice(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <span className="mb-1 text-lg text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            )}
            <span className="mb-1.5 text-sm text-muted-foreground">
              {product.unit}
            </span>
          </div>

          {/* Freshness + origin */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Freshness Score
                </span>
                <span className="font-display text-lg font-bold text-success">
                  {product.freshnessScore}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-success"
                  style={{ width: `${product.freshnessScore}%` }}
                />
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Origin
              </span>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
                <MapPin className="h-4 w-4 text-primary" /> {product.origin}
              </p>
            </div>
          </div>

          {/* Quantity + actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-secondary"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-display text-lg font-bold tabular-nums">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-secondary"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button size="lg" className="flex-1" onClick={handleAdd}>
              <ShoppingBag className="h-5 w-5" /> Add to Cart ·{" "}
              {formatPrice((product.salePrice ?? product.price) * qty)}
            </Button>

            <Button
              size="icon"
              variant="outline"
              className="h-14 w-14"
              onClick={() => {
                toggleWishlist(product);
                toast(isWishlisted ? "Removed from wishlist" : "Saved ❤️");
              }}
              aria-label="Wishlist"
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  isWishlisted && "fill-primary text-primary",
                )}
              />
            </Button>
          </div>

          {/* Trust strip */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              { Icon: Truck, label: "Same-day delivery" },
              { Icon: ShieldCheck, label: "Quality assured" },
              { Icon: Leaf, label: "Farm sourced" },
            ].map((t) => (
              <div
                key={t.label}
                className="flex flex-col items-center gap-1.5 rounded-2xl bg-secondary/50 p-3"
              >
                <t.Icon className="h-5 w-5 text-primary" />
                <span className="text-[11px] font-medium text-muted-foreground">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Frequently bought together */}
      {frequentlyBought.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 font-display text-2xl font-bold">
            Frequently Bought Together
          </h2>
          <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-wrap items-center gap-3">
              {[product, ...frequentlyBought].map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <Link
                    href={`/product/${p.slug}`}
                    className="relative h-20 w-20 overflow-hidden rounded-xl border border-border"
                  >
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  {i < frequentlyBought.length && (
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 lg:flex-col lg:items-end">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Bundle total</p>
                <p className="font-display text-2xl font-bold">
                  {formatPrice(bundleTotal)}
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => {
                  [product, ...frequentlyBought].forEach((p) => addItem(p));
                  openCart();
                  toast.success("Bundle added to cart");
                }}
              >
                Add all to cart
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Details: description / nutrition / ingredients */}
      <section className="mt-16 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 font-display text-2xl font-bold">
            Product Description
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <h3 className="mb-3 mt-8 font-display text-lg font-bold">
            Ingredients
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.ingredients.map((ing) => (
              <span
                key={ing}
                className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm"
              >
                <Check className="h-3.5 w-3.5 text-success" /> {ing}
              </span>
            ))}
          </div>
        </div>

        {/* Nutrition facts */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="border-b-4 border-accent pb-2 font-display text-xl font-bold">
            Nutrition Facts
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Serving size {product.nutrition.servingSize}
          </p>
          <div className="mt-3 flex items-end justify-between border-b-4 border-accent pb-2">
            <span className="font-semibold">Calories</span>
            <span className="font-display text-2xl font-bold">
              {product.nutrition.calories}
            </span>
          </div>
          <ul className="mt-2 divide-y divide-border text-sm">
            {[
              ["Total Fat", `${product.nutrition.fat} g`],
              ["Total Carbohydrate", `${product.nutrition.carbs} g`],
              ["Dietary Fiber", `${product.nutrition.fiber} g`],
              ["Sugars", `${product.nutrition.sugar} g`],
              ["Protein", `${product.nutrition.protein} g`],
            ].map(([k, v]) => (
              <li key={k} className="flex justify-between py-2">
                <span>{k}</span>
                <span className="font-semibold">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews */}
      <ReviewsBlock product={product} />

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 font-display text-2xl font-bold">
            You may also like
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {related.map((p, i) => (
              <RelatedCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function RelatedCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 text-sm font-semibold">{product.name}</h3>
        <div className="mt-1 flex items-center justify-between">
          <span className="font-display font-bold">
            {formatPrice(product.salePrice ?? product.price)}
          </span>
          <StarRating rating={product.rating} />
        </div>
      </div>
    </Link>
  );
}

const sampleReviews = [
  {
    name: "Meera J.",
    rating: 5,
    text: "Incredibly fresh and arrived perfectly packed. Will definitely reorder!",
    date: "2 days ago",
  },
  {
    name: "Karan D.",
    rating: 5,
    text: "Best quality I've found online. The freshness score is no joke.",
    date: "1 week ago",
  },
  {
    name: "Fatima S.",
    rating: 4,
    text: "Great product, fast delivery. Slightly pricey but worth it.",
    date: "2 weeks ago",
  },
];

function ReviewsBlock({ product }: { product: Product }) {
  const dist = [70, 20, 6, 3, 1];
  return (
    <section className="mt-16">
      <h2 className="mb-6 font-display text-2xl font-bold">Customer Reviews</h2>
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
          <p className="font-display text-5xl font-bold">{product.rating}</p>
          <StarRating
            rating={product.rating}
            size={18}
            className="mt-2 justify-center"
          />
          <p className="mt-1 text-sm text-muted-foreground">
            Based on {product.reviewCount.toLocaleString()} reviews
          </p>
          <div className="mt-5 space-y-1.5">
            {dist.map((pct, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="flex w-8 items-center gap-0.5 text-xs">
                  {5 - i}
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs text-muted-foreground">
                  {pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {sampleReviews.map((r) => (
            <div
              key={r.name}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    {r.name[0]}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <StarRating rating={r.rating} />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
