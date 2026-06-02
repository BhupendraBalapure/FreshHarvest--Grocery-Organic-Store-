"use client";

import { trendingProducts } from "@/lib/data/products";
import { ProductRail } from "@/components/product/product-rail";
import { SectionHeading } from "@/components/shared/section-heading";

export function TrendingProducts() {
  return (
    <section id="trending" className="section bg-secondary/40">
      <div className="container">
        <SectionHeading
          eyebrow="Hot Right Now"
          title="Trending Products"
          description="What everyone's adding to their baskets this week."
          cta={{ label: "See what's trending", href: "/shop" }}
        />
        <ProductRail products={trendingProducts.slice(0, 4)} />
      </div>
    </section>
  );
}
