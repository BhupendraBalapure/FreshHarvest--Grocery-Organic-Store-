"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { SectionHeading } from "@/components/shared/section-heading";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function CategoriesSection() {
  return (
    <section id="categories" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Explore"
          title="Shop by Category"
          description="From orchard-fresh fruits to artisanal bakery — find everything in one place."
          cta={{ label: "View all categories", href: "/shop" }}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {categories.map((c) => (
            <motion.div key={c.id} variants={staggerItem}>
              <Link
                href={`/shop?category=${c.slug}`}
                className={cn(
                  "group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-gradient-to-br p-4 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg sm:p-5",
                  c.accent,
                )}
              >
                {/* count chip */}
                <span className="absolute right-3 top-3 rounded-full bg-background/70 px-2 py-0.5 text-[11px] font-bold text-foreground/70 ring-1 ring-border backdrop-blur-sm">
                  {c.productCount} items
                </span>

                {/* emoji */}
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-background/80 text-3xl shadow-sm ring-1 ring-white/50 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110">
                  {c.icon}
                </span>

                <div className="min-w-0">
                  <h3 className="font-display text-base font-bold text-foreground sm:text-lg">
                    {c.name}
                  </h3>
                  {/* hover Shop arrow (reserves its own line) */}
                  <span className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Shop
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
