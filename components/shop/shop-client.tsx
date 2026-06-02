"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, Search, X, Star } from "lucide-react";
import type { Product, CategorySlug } from "@/lib/types";
import { products as allProducts } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { staggerContainer } from "@/lib/motion";
import { cn, formatPrice } from "@/lib/utils";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Top Rated" },
];

export function ShopClient({
  initialCategory,
  initialQuery,
}: {
  initialCategory?: CategorySlug;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery ?? "");
  const [activeCats, setActiveCats] = useState<CategorySlug[]>(
    initialCategory ? [initialCategory] : [],
  );
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [sort, setSort] = useState<SortKey>("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list: Product[] = allProducts.filter((p) => {
      const price = p.salePrice ?? p.price;
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.includes(query.toLowerCase()));
      const matchesCat =
        activeCats.length === 0 || activeCats.includes(p.category);
      const matchesPrice = price <= maxPrice;
      const matchesRating = p.rating >= minRating;
      const matchesOrganic = !onlyOrganic || p.badges.includes("organic");
      return (
        matchesQuery &&
        matchesCat &&
        matchesPrice &&
        matchesRating &&
        matchesOrganic
      );
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort(
          (a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price),
        );
        break;
      case "price-desc":
        list = [...list].sort(
          (a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price),
        );
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [query, activeCats, maxPrice, minRating, onlyOrganic, sort]);

  function toggleCat(slug: CategorySlug) {
    setActiveCats((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug],
    );
  }

  function reset() {
    setQuery("");
    setActiveCats([]);
    setMaxPrice(1000);
    setMinRating(0);
    setOnlyOrganic(false);
  }

  const Filters = (
    <div className="space-y-7">
      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">
          Categories
        </h3>
        <div className="space-y-1.5">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => toggleCat(c.slug)}
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors",
                activeCats.includes(c.slug)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary",
              )}
            >
              <span className="flex items-center gap-2">
                <span>{c.icon}</span> {c.name}
              </span>
              <span className="text-xs opacity-70">{c.productCount}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">
          Max Price
        </h3>
        <input
          type="range"
          min={50}
          max={1000}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <p className="mt-1 text-sm text-muted-foreground">
          Up to{" "}
          <span className="font-semibold text-foreground">
            {formatPrice(maxPrice)}
          </span>
        </p>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">
          Minimum Rating
        </h3>
        <div className="flex gap-1.5">
          {[0, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={cn(
                "flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                minRating === r
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-secondary",
              )}
            >
              {r === 0 ? "All" : (
                <>
                  <Star className="h-3 w-3 fill-current" /> {r}+
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      <label className="flex cursor-pointer items-center justify-between rounded-xl border border-border px-3 py-2.5">
        <span className="text-sm font-medium">Organic only 🌿</span>
        <input
          type="checkbox"
          checked={onlyOrganic}
          onChange={(e) => setOnlyOrganic(e.target.checked)}
          className="h-4 w-4 accent-primary"
        />
      </label>

      <Button variant="outline" className="w-full" onClick={reset}>
        Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="container py-8 lg:py-12">
      {/* Search bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="h-12 w-full rounded-full border border-border bg-secondary/50 pl-11 pr-4 text-sm outline-none focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-2xl border border-border bg-card p-5 shadow-soft">
            {Filters}
          </div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {filtered.length}
              </span>{" "}
              products
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </Button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-9 rounded-full border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              >
                {sortOptions.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-24 text-center">
              <p className="font-display text-lg font-semibold">
                No products found
              </p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or search.
              </p>
              <Button variant="outline" onClick={reset}>
                Clear filters
              </Button>
            </div>
          ) : (
            <motion.div
              key={filtered.length + sort}
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-accent/40 backdrop-blur-sm"
            onClick={() => setShowFilters(false)}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            className="absolute left-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-background p-5 shadow-soft-lg"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="rounded-full p-2 hover:bg-secondary"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {Filters}
          </motion.div>
        </div>
      )}
    </div>
  );
}
