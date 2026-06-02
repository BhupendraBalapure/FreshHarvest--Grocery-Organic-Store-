"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Sprout, Truck, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { staggerContainer, staggerItem } from "@/lib/motion";

const features = [
  {
    Icon: BadgeCheck,
    title: "Organic Certified",
    description:
      "Every organic product is independently certified and traceable to its source farm.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    Icon: Sprout,
    title: "Farm Fresh",
    description:
      "Harvested within 24 hours of delivery and cold-chained to lock in peak freshness.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    Icon: Truck,
    title: "Fast Delivery",
    description:
      "Same-day delivery across the city. Order before 4 PM and it arrives by evening.",
    color: "text-sky-500",
    bg: "bg-sky-500/10",
  },
  {
    Icon: ShieldCheck,
    title: "Quality Guaranteed",
    description:
      "Not delighted? We'll replace it or refund you — no questions, no hassle.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

export function WhyChoose() {
  return (
    <section id="why" className="section bg-secondary/40">
      <div className="container">
        <SectionHeading
          eyebrow="Why FreshHarvest"
          title="Goodness you can trust"
          description="We obsess over freshness, sourcing and service so you never have to compromise."
          align="center"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-soft-lg"
            >
              <span
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${f.bg} ${f.color} transition-transform duration-300 group-hover:scale-110`}
              >
                <f.Icon className="h-7 w-7" />
              </span>
              <h3 className="font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {f.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
