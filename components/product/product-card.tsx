"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Plus, Leaf, Zap, Star, MapPin } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/types";
import { cn, formatPrice, discountPercent } from "@/lib/utils";
import { categoryBySlug } from "@/lib/data/categories";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { useUI } from "@/store/ui";
import { staggerItem } from "@/lib/motion";

/** 1284 → "1.3k", 942 → "942" */
function compactCount(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : `${n}`;
}

const badgeLabels: Record<string, { label: string; className: string }> = {
  bestseller: { label: "Bestseller", className: "bg-accent text-accent-foreground" },
  trending: { label: "Trending", className: "bg-primary text-primary-foreground" },
  new: { label: "New", className: "bg-success text-success-foreground" },
  limited: { label: "Limited", className: "bg-destructive text-destructive-foreground" },
};

export function ProductCard({
  product,
  className,
  index = 0,
}: {
  product: Product;
  className?: string;
  index?: number;
}) {
  const addItem = useCart((s) => s.addItem);
  const openCart = useUI((s) => s.openCart);
  const toggleWishlist = useWishlist((s) => s.toggle);
  const wishlistItems = useWishlist((s) => s.items);
  const isWishlisted = wishlistItems.some((i) => i.id === product.id);

  const off = discountPercent(product.price, product.salePrice);
  const topBadge = product.badges.find((b) => badgeLabels[b]);
  const categoryIcon = categoryBySlug[product.category]?.icon ?? "🛒";

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product);
    openCart();
    toast.success(`${product.name} added to cart`);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggleWishlist(product);
    toast(isWishlisted ? "Removed from wishlist" : "Saved to wishlist", {
      icon: "❤️",
    });
  }

  return (
    <motion.div
      variants={staggerItem}
      className={cn("group relative", className)}
    >
      <Link
        href={`/product/${product.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary/60 to-secondary/20">
          {/* emoji placeholder shown behind the photo (visible if the image fails) */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 grid place-items-center text-5xl opacity-30 select-none"
          >
            {categoryIcon}
          </span>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {topBadge && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-sm",
                  badgeLabels[topBadge].className,
                )}
              >
                {topBadge === "trending" && <Zap className="h-3 w-3" />}
                {badgeLabels[topBadge].label}
              </span>
            )}
            {off > 0 && (
              <span className="inline-flex w-fit items-center rounded-full bg-destructive px-2.5 py-1 text-[10px] font-bold text-destructive-foreground shadow-sm">
                -{off}%
              </span>
            )}
          </div>

          {/* wishlist */}
          <button
            onClick={handleWishlist}
            aria-label="Toggle wishlist"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-accent backdrop-blur-md transition-all hover:scale-110 hover:bg-white"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isWishlisted && "fill-primary text-primary",
              )}
            />
          </button>

          {product.badges.includes("organic") && (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-success/90 px-2 py-0.5 text-[10px] font-semibold text-success-foreground backdrop-blur-md">
              <Leaf className="h-3 w-3" /> Organic
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-3.5">
          {/* rating chip + unit */}
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-0.5 rounded-md bg-success/10 px-1.5 py-0.5 font-bold text-success">
                <Star className="h-3 w-3 fill-success text-success" />
                {product.rating.toFixed(1)}
              </span>
              ({compactCount(product.reviewCount)})
            </span>
            <span className="shrink-0 whitespace-nowrap rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              {product.unit}
            </span>
          </div>

          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>

          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
            <MapPin className="mr-0.5 inline h-3 w-3 -translate-y-px" />
            {product.origin}
          </p>

          <div className="mt-auto flex items-end justify-between gap-2 pt-3">
            <div className="flex min-w-0 flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-lg font-bold text-foreground">
                  {formatPrice(product.salePrice ?? product.price)}
                </span>
                {product.salePrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              {off > 0 && (
                <span className="text-[11px] font-semibold text-success">
                  Save {formatPrice(product.price - (product.salePrice ?? product.price))}
                </span>
              )}
            </div>

            <button
              onClick={handleAdd}
              aria-label="Add to cart"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow-sm transition-all hover:scale-110 hover:shadow-glow active:scale-95"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
