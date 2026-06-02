import type { Metadata } from "next";
import type { CategorySlug } from "@/lib/types";
import { categoryBySlug } from "@/lib/data/categories";
import { ShopClient } from "@/components/shop/shop-client";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse premium farm-fresh fruits, vegetables, dairy, bakery and organic groceries. Filter by category, price and rating.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const category = params.category as CategorySlug | undefined;
  const validCategory = category && categoryBySlug[category] ? category : undefined;
  const heading = validCategory
    ? categoryBySlug[validCategory].name
    : "All Products";

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="container py-10">
          <nav className="mb-2 text-sm text-muted-foreground">
            Home / Shop{validCategory ? ` / ${heading}` : ""}
          </nav>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            {heading}
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Hand-picked, quality-checked and delivered fresh. Use the filters to
            find exactly what you need.
          </p>
        </div>
      </section>

      <ShopClient initialCategory={validCategory} initialQuery={params.q} />
    </>
  );
}
