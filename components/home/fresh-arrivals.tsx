"use client";

import { freshArrivals } from "@/lib/data/products";
import { ProductRail } from "@/components/product/product-rail";
import { SectionHeading } from "@/components/shared/section-heading";

export function FreshArrivals() {
  return (
    <section id="fresh-arrivals" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Just In"
          title="Fresh Arrivals"
          description="Newly harvested and freshly stocked — be the first to try."
          cta={{ label: "Browse new arrivals", href: "/shop" }}
        />
        <ProductRail products={freshArrivals.slice(0, 4)} />
      </div>
    </section>
  );
}
