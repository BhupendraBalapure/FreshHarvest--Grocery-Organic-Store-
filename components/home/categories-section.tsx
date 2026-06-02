"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
                className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl border border-border p-4 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg"
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width:640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-accent/85 via-accent/30 to-transparent",
                  )}
                />
                <div className="relative">
                  <span className="mb-1 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-lg shadow-sm">
                    {c.icon}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">
                    {c.name}
                  </h3>
                  <p className="text-xs text-white/80">
                    {c.productCount} products
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
