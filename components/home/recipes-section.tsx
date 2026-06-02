"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Users, ChefHat, ArrowUpRight } from "lucide-react";
import { recipes } from "@/lib/data/recipes";
import { SectionHeading } from "@/components/shared/section-heading";
import { staggerContainer, staggerItem } from "@/lib/motion";

const difficultyColor: Record<string, string> = {
  Easy: "bg-success/15 text-success",
  Medium: "bg-amber-500/15 text-amber-600",
  Hard: "bg-destructive/15 text-destructive",
};

export function RecipesSection() {
  return (
    <section id="recipes" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Cook with FreshHarvest"
          title="Recipe Recommendations"
          description="Turn your fresh haul into something delicious. Curated recipes using products in your cart."
          cta={{ label: "All recipes", href: "/#recipes" }}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {recipes.map((r) => (
            <motion.article
              key={r.id}
              variants={staggerItem}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={r.image}
                  alt={r.title}
                  fill
                  sizes="(max-width:640px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${difficultyColor[r.difficulty]}`}
                >
                  {r.difficulty}
                </span>
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                  {r.category}
                </span>
                <h3 className="mt-1 line-clamp-2 font-display text-base font-bold leading-snug">
                  {r.title}
                </h3>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {r.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {r.servings}
                  </span>
                  <span className="flex items-center gap-1">
                    <ChefHat className="h-3.5 w-3.5" /> {r.difficulty}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
