"use client";

import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/product-card";
import { staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Responsive product grid with staggered scroll-reveal. */
export function ProductRail({
  products,
  className,
  columns = 4,
}: {
  products: Product[];
  className?: string;
  columns?: 3 | 4;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className={cn(
        "grid grid-cols-2 gap-4 sm:gap-5",
        columns === 4
          ? "lg:grid-cols-4"
          : "lg:grid-cols-3",
        "md:grid-cols-3",
        className,
      )}
    >
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </motion.div>
  );
}
