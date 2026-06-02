"use client";

import { bestSellers } from "@/lib/data/products";
import { ProductRail } from "@/components/product/product-rail";
import { SectionHeading } from "@/components/shared/section-heading";

export function BestSellers() {
  return (
    <section id="best-sellers" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Customer Favourites"
          title="Best Sellers"
          description="The products our community can't stop reordering."
          cta={{ label: "Shop best sellers", href: "/shop" }}
        />
        <ProductRail products={bestSellers.slice(0, 4)} />
      </div>
    </section>
  );
}
