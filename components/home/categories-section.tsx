"use client";

import Image from "next/image";
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
          className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
        >
          {categories.map((c) => (
            <motion.div key={c.id} variants={staggerItem}>
              <Link
                href={`/shop?category=${c.slug}`}
                className={cn(
                  "group relative flex min-h-[128px] flex-col items-center justify-center gap-2.5 overflow-hidden rounded-2xl border border-border bg-gradient-to-br p-4 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg sm:min-h-[152px] sm:gap-3",
                  c.accent,
                )}
              >
                {/* hover affordance */}
                <ArrowRight className="absolute right-3 top-3 h-4 w-4 text-foreground/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary" />

                {/* round photo — emoji shows behind if the photo fails */}
                <span className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-background/80 text-2xl shadow-sm ring-2 ring-white/70 transition-transform duration-300 group-hover:scale-105 sm:h-[68px] sm:w-[68px] sm:text-3xl">
                  <span aria-hidden>{c.icon}</span>
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="68px"
                    className="object-cover"
                  />
                </span>

                <div className="min-w-0">
                  <h3 className="font-display text-sm font-bold leading-tight text-foreground sm:text-base">
                    {c.name}
                  </h3>
                  <p className="mt-0.5 text-[11px] font-medium text-muted-foreground sm:text-xs">
                    {c.productCount} items
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
