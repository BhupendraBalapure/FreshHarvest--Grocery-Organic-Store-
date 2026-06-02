"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { flashDealProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/product/product-card";
import { CountdownTimer } from "@/components/shared/countdown-timer";
import { Reveal } from "@/components/shared/reveal";
import { staggerContainer } from "@/lib/motion";

export function FlashDeals() {
  return (
    <section
      id="flash-deals"
      className="section relative overflow-hidden bg-accent text-accent-foreground"
    >
      <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
      <div className="container relative">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground">
              <Zap className="h-4 w-4" /> Flash Deals
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Limited-Time Offers
            </h2>
            <p className="mt-2 text-accent-foreground/70">
              Grab them before the timer runs out — prices this fresh won't last.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-accent-foreground/60">
              Ending in
            </span>
            <CountdownTimer hoursFromNow={9} variant="light" />
          </Reveal>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
        >
          {flashDealProducts.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
