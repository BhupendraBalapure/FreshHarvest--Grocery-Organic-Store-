"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Truck,
  ShieldCheck,
  Star,
  ArrowRight,
  Leaf,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem, EASE } from "@/lib/motion";

const stats = [
  { value: "50k+", label: "Happy Families" },
  { value: "1,200+", label: "Fresh Products" },
  { value: "4.9★", label: "Avg. Rating" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary/40">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl" />

      <div className="container relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        {/* Copy */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          <motion.span
            variants={staggerItem}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-1.5 text-sm font-semibold text-primary"
          >
            <Leaf className="h-4 w-4" /> 100% Certified Organic & Farm Fresh
          </motion.span>

          <motion.h1
            variants={staggerItem}
            className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Farm Fresh
            <br />
            <span className="text-gradient">Delivered Daily</span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="mt-5 max-w-lg text-lg text-muted-foreground"
          >
            Hand-picked fruits, crisp vegetables and premium organic essentials —
            sourced from local farms and delivered to your door, fresh the same
            day.
          </motion.p>

          {/* Same-day delivery badge */}
          <motion.div
            variants={staggerItem}
            className="mt-6 inline-flex items-center gap-3 rounded-2xl glass-card px-4 py-3 shadow-soft"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold">Same-Day Delivery</p>
              <p className="text-xs text-muted-foreground">
                Order before 4 PM · arrives by evening
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg">
              <Link href="/shop">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/#subscriptions">View Subscriptions</Link>
            </Button>
          </motion.div>

          {/* stats */}
          <motion.div
            variants={staggerItem}
            className="mt-10 flex divide-x divide-border"
          >
            {stats.map((s) => (
              <div key={s.label} className="px-5 first:pl-0">
                <p className="font-display text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-soft-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80&auto=format&fit=crop"
              alt="Fresh produce basket"
              fill
              priority
              sizes="(max-width:1024px) 100vw, 480px"
              className="object-cover"
            />
          </motion.div>

          {/* floating card: free delivery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
            className="absolute -left-2 top-10 flex items-center gap-3 rounded-2xl glass-card p-3 shadow-soft-lg sm:left-0 sm:top-16"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-success text-success-foreground">
              <Truck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold">Free Delivery</p>
              <p className="text-[11px] text-muted-foreground">
                On orders ₹499+
              </p>
            </div>
          </motion.div>

          {/* floating card: rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: EASE }}
            className="absolute -right-2 bottom-20 flex items-center gap-3 rounded-2xl glass-card p-3 shadow-soft-lg sm:right-0"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-accent">
              <Star className="h-5 w-5 fill-current" />
            </span>
            <div>
              <p className="text-xs font-bold">4.9 / 5 Rating</p>
              <p className="text-[11px] text-muted-foreground">
                12,400+ reviews
              </p>
            </div>
          </motion.div>

          {/* floating card: quality */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6, ease: EASE }}
            className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-accent px-4 py-2 text-accent-foreground shadow-soft-lg"
          >
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold">Quality Guaranteed</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
