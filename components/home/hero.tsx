"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Clock, Truck, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BannerCarousel } from "@/components/home/banner-carousel";
import { PromoCarousel } from "@/components/home/promo-carousel";
import { categories } from "@/lib/data/categories";
import { staggerContainer, staggerItem, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="bg-background">
      <div className="container flex flex-col gap-5 pt-6 lg:pt-8">
        {/* Mobile-only promo carousel (app-style hero) */}
        <PromoCarousel className="order-1 lg:hidden" />

        {/* Category quick strip — sits below the banner on mobile, above on desktop */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="order-2 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:order-1 xl:grid-cols-8"
        >
          {categories.map((c) => (
            <motion.div key={c.id} variants={staggerItem}>
              <Link
                href={`/shop?category=${c.slug}`}
                className="group flex h-14 items-center gap-2.5 rounded-2xl border border-border bg-card px-2.5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary-soft/60 hover:shadow-soft-lg sm:h-[72px] sm:gap-3 sm:px-3"
              >
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-base ring-1 ring-inset ring-black/5 transition-transform duration-300 group-hover:scale-110 dark:ring-white/10 sm:h-11 sm:w-11 sm:rounded-2xl sm:text-xl",
                    c.accent,
                  )}
                >
                  {c.icon}
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="line-clamp-2 text-[13px] font-semibold">
                    {c.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {c.productCount} items
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bento hero grid — desktop only (mobile uses the subscription banner above) */}
        <div className="order-4 hidden gap-4 lg:order-2 lg:grid lg:grid-cols-3 lg:gap-5">
          {/* Main promo card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-primary/15 via-secondary to-background p-7 shadow-soft sm:p-10 lg:col-span-2"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative z-10 max-w-md">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary backdrop-blur-md dark:bg-white/10">
                <Leaf className="h-3.5 w-3.5" /> 100% Farm Fresh Food
              </span>

              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Fresh Organic
                <br />
                <span className="text-gradient">Food For All</span>
              </h1>

              <p className="mt-4 max-w-sm text-sm text-muted-foreground sm:text-base">
                Hand-picked fruits, crisp veggies & organic essentials —
                delivered to your door, fresh the same day.
              </p>

              <div className="mt-5 flex items-end gap-2">
                <span className="text-sm text-muted-foreground">Starting at</span>
                <span className="font-display text-3xl font-bold text-foreground">
                  ₹59
                </span>
              </div>

              <Button asChild size="lg" className="mt-6">
                <Link href="/shop">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Product image carousel — block below text on mobile, floating on sm+ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="relative z-10 mt-7 sm:absolute sm:-bottom-6 sm:-right-4 sm:z-0 sm:mt-0 lg:-bottom-8"
            >
              <BannerCarousel className="h-44 w-full sm:h-64 sm:w-64 lg:h-80 lg:w-80" />
            </motion.div>
          </motion.div>

          {/* Right column */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {/* Wide promo */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="relative flex-1 overflow-hidden rounded-[1.75rem] bg-accent p-6 text-accent-foreground"
            >
              <div className="relative z-10 max-w-[60%]">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Cold-Pressed
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold leading-tight">
                  Fresh Juices
                </h3>
                <p className="mt-2 text-sm text-accent-foreground/70">
                  Only{" "}
                  <span className="font-bold text-primary">₹180</span>
                </p>
                <Link
                  href="/shop?category=beverages"
                  className="mt-4 inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition hover:brightness-105"
                >
                  Shop Now <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="absolute -bottom-4 -right-3 h-40 w-40">
                <Image
                  src="https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80&auto=format&fit=crop"
                  alt="Fresh juice"
                  fill
                  sizes="160px"
                  className="rounded-2xl object-cover"
                />
              </div>
            </motion.div>

            {/* Two small cards */}
            <div className="grid grid-cols-2 gap-4 lg:gap-5">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                className="relative overflow-hidden rounded-[1.5rem] bg-secondary p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Truck className="h-5 w-5" />
                </span>
                <h4 className="mt-3 font-display text-base font-bold leading-tight">
                  Free Delivery
                </h4>
                <p className="text-xs text-muted-foreground">On orders ₹499+</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.28 }}
                className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-primary to-orange-500 p-5 text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/25 backdrop-blur-md">
                  <Percent className="h-5 w-5" />
                </span>
                <h4 className="mt-3 font-display text-base font-bold leading-tight">
                  Up to 40% OFF
                </h4>
                <p className="text-xs text-white/80">On organic picks</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="order-3 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft sm:grid-cols-4"
        >
          {[
            { Icon: Leaf, label: "Certified Organic" },
            { Icon: Truck, label: "Same-Day Delivery" },
            { Icon: Clock, label: "Order before 4 PM" },
            { Icon: Percent, label: "Best Price Promise" },
          ].map((t) => (
            <div key={t.label} className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <t.Icon className="h-4 w-4" />
              </span>
              <span className="text-xs font-semibold sm:text-sm">{t.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
