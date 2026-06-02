"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Apple, Play, Bell, Gift, Smartphone } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

const perks = [
  { Icon: Bell, label: "Live order tracking" },
  { Icon: Gift, label: "App-only rewards" },
  { Icon: Smartphone, label: "1-tap reorder" },
];

function StoreButton({
  Icon,
  top,
  bottom,
}: {
  Icon: typeof Apple;
  top: string;
  bottom: string;
}) {
  return (
    <a
      href="#"
      className="flex items-center gap-3 rounded-2xl bg-accent px-5 py-3 text-accent-foreground transition-transform hover:scale-105"
    >
      <Icon className="h-7 w-7" />
      <span className="text-left leading-tight">
        <span className="block text-[10px] uppercase opacity-70">{top}</span>
        <span className="block text-base font-bold">{bottom}</span>
      </span>
    </a>
  );
}

export function AppPromo() {
  return (
    <section className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-orange-500 px-6 py-12 text-white sm:px-12 lg:py-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-md">
                <Smartphone className="h-4 w-4" /> FreshHarvest Mobile App
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-5xl">
                Groceries in your
                <br /> pocket
              </h2>
              <p className="mt-4 max-w-md text-white/90">
                Shop faster, track deliveries in real time and unlock exclusive
                app-only deals. Your fridge will thank you.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {perks.map((p) => (
                  <span
                    key={p.label}
                    className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium backdrop-blur-md"
                  >
                    <p.Icon className="h-4 w-4" /> {p.label}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <StoreButton Icon={Apple} top="Download on the" bottom="App Store" />
                <StoreButton Icon={Play} top="Get it on" bottom="Google Play" />
              </div>
            </Reveal>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative mx-auto w-full max-w-xs"
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-[2.5rem] border-[6px] border-accent bg-accent shadow-soft-lg">
                <Image
                  src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&q=80&auto=format&fit=crop"
                  alt="FreshHarvest mobile app"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
              <div className="absolute -left-4 top-12 rounded-2xl bg-white p-3 text-accent shadow-soft-lg">
                <p className="text-[11px] font-semibold text-muted-foreground">
                  Delivered in
                </p>
                <p className="font-display text-xl font-bold text-primary">
                  18 min
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
