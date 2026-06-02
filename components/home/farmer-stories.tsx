"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, MapPin } from "lucide-react";
import { farmers } from "@/lib/data/farmers";
import { SectionHeading } from "@/components/shared/section-heading";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function FarmerStories() {
  return (
    <section id="farmers" className="section bg-secondary/40">
      <div className="container">
        <SectionHeading
          eyebrow="Meet the Growers"
          title="Farmer Stories"
          description="Behind every product is a family farm. We partner directly with growers so they earn fairly and you eat better."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {farmers.map((f) => (
            <motion.article
              key={f.id}
              variants={staggerItem}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={f.image}
                  alt={f.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/70 to-transparent" />
                <span className="absolute bottom-3 left-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-accent">
                  <MapPin className="h-3 w-3 text-primary" /> {f.location}
                </span>
              </div>

              <div className="p-6">
                <Quote className="h-7 w-7 text-primary/30" />
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                  "{f.quote}"
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="font-display font-bold">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.farm}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-bold text-primary">
                      {f.years}+
                    </p>
                    <p className="text-[11px] text-muted-foreground">years</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
