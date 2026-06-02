"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Apple,
  Play,
  Bell,
  Gift,
  Smartphone,
  Star,
  Search,
  MapPin,
  Home,
  ShoppingBag,
  User,
  Plus,
  Truck,
  ScanLine,
  Heart,
} from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { EASE } from "@/lib/motion";

const perks = [
  { Icon: Bell, label: "Live order tracking" },
  { Icon: Gift, label: "App-only rewards" },
  { Icon: Smartphone, label: "1-tap reorder" },
];

const phoneProducts = [
  {
    name: "Royal Gala Apples",
    price: "₹249",
    img: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=200&q=80&auto=format&fit=crop",
  },
  {
    name: "Fresh Avocados",
    price: "₹199",
    img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&q=80&auto=format&fit=crop",
  },
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
      className="flex items-center gap-3 rounded-2xl bg-accent px-5 py-3 text-accent-foreground shadow-lg transition-transform hover:scale-105"
    >
      <Icon className="h-7 w-7" />
      <span className="text-left leading-tight">
        <span className="block text-[10px] uppercase opacity-70">{top}</span>
        <span className="block text-base font-bold">{bottom}</span>
      </span>
    </a>
  );
}

/** Faux QR built from a deterministic dot grid — no external dependency. */
function FauxQR() {
  const cells = Array.from({ length: 49 }, (_, i) => (i * 7 + 3) % 5 < 2);
  return (
    <div className="grid grid-cols-7 gap-[2px] rounded-md bg-white p-1.5">
      {cells.map((on, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-[1px] ${on ? "bg-[#2D2D2D]" : "bg-transparent"}`}
        />
      ))}
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="relative mx-auto aspect-[9/17.5] w-[228px] rounded-[2.2rem] border-[8px] border-[#15110f] bg-[#15110f] shadow-2xl">
      {/* notch */}
      <div className="absolute left-1/2 top-0 z-20 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#15110f]" />
      {/* screen */}
      <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-background">
        {/* status bar */}
        <div className="flex items-center justify-between px-5 pt-3 text-[10px] font-semibold text-foreground">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-foreground/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/70" />
            <span className="h-2 w-4 rounded-[2px] bg-foreground/70" />
          </span>
        </div>

        {/* app header */}
        <div className="px-4 pt-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="flex items-center gap-1 text-[9px] text-muted-foreground">
                <MapPin className="h-2.5 w-2.5 text-primary" /> Deliver to
              </p>
              <p className="text-[11px] font-bold">Home · 400050</p>
            </div>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
              <Bell className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-full bg-secondary px-3 py-2">
            <Search className="h-3 w-3 text-muted-foreground" />
            <span className="text-[9px] text-muted-foreground">
              Search fresh produce…
            </span>
          </div>
        </div>

        {/* promo banner */}
        <div className="mx-4 mt-3 flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-orange-500 p-3 text-white">
          <div>
            <p className="text-[12px] font-extrabold leading-none">40% OFF</p>
            <p className="text-[8px] opacity-90">on fresh picks today</p>
          </div>
          <span className="rounded-full bg-white/25 px-2 py-0.5 text-[8px] font-bold backdrop-blur">
            Grab now
          </span>
        </div>

        {/* section */}
        <div className="mt-3 flex items-center justify-between px-4">
          <p className="text-[10px] font-bold">Best Sellers</p>
          <p className="text-[8px] font-semibold text-primary">See all</p>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 px-4">
          {phoneProducts.map((p) => (
            <div
              key={p.name}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="relative aspect-square">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white/85">
                  <Heart className="h-2.5 w-2.5 text-primary" />
                </span>
              </div>
              <div className="p-1.5">
                <p className="truncate text-[8px] font-semibold">{p.name}</p>
                <div className="mt-0.5 flex items-center justify-between">
                  <span className="text-[9px] font-bold">{p.price}</span>
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Plus className="h-2.5 w-2.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* bottom nav */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-border bg-card/95 px-4 py-2.5 backdrop-blur">
          <Home className="h-4 w-4 text-primary" />
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="-mt-5 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow-sm">
            <ShoppingBag className="h-4 w-4" />
          </span>
          <Gift className="h-4 w-4 text-muted-foreground" />
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}

export function AppPromo() {
  return (
    <section className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-orange-500 to-orange-600 px-6 py-10 text-white sm:px-12 lg:py-12">
          {/* texture + glows */}
          <div className="pointer-events-none absolute inset-0 bg-hero-grid opacity-10 [background-size:22px_22px]" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-6 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            {/* Left copy */}
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-md">
                <Smartphone className="h-4 w-4" /> FreshHarvest Mobile App
              </span>
              <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
                Groceries in
                <br /> your pocket
              </h2>
              <p className="mt-4 max-w-md text-white/90">
                Shop faster, track deliveries in real time and unlock exclusive
                app-only deals. Your fridge will thank you.
              </p>

              {/* rating */}
              <div className="mt-5 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-white text-white" />
                  ))}
                </div>
                <p className="text-sm font-semibold">
                  4.9 <span className="text-white/70">· 12k+ reviews</span>
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {perks.map((p) => (
                  <span
                    key={p.label}
                    className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium backdrop-blur-md"
                  >
                    <p.Icon className="h-4 w-4" /> {p.label}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <StoreButton Icon={Apple} top="Download on the" bottom="App Store" />
                <StoreButton Icon={Play} top="Get it on" bottom="Google Play" />

                {/* QR */}
                <div className="hidden items-center gap-3 rounded-2xl bg-white/15 p-2.5 pr-4 backdrop-blur-md sm:flex">
                  <FauxQR />
                  <span className="text-left text-xs font-semibold leading-tight">
                    <ScanLine className="mb-1 h-4 w-4" />
                    Scan to
                    <br />
                    download
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Right — phone + floating cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative mx-auto w-full max-w-sm"
            >
              <PhoneMock />

              {/* floating: delivery time */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, ease: EASE }}
                className="absolute -left-2 top-14 flex items-center gap-2 rounded-2xl bg-white p-2.5 text-[#2D2D2D] shadow-soft-lg sm:-left-6"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600">
                  <Truck className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold text-neutral-500">
                    Delivered in
                  </p>
                  <p className="font-display text-base font-bold text-primary">
                    18 min
                  </p>
                </div>
              </motion.div>

              {/* floating: rating */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, ease: EASE }}
                className="absolute -right-2 bottom-20 flex items-center gap-2 rounded-2xl bg-white p-2.5 text-[#2D2D2D] shadow-soft-lg sm:-right-6"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400 text-[#2D2D2D]">
                  <Star className="h-4 w-4 fill-current" />
                </span>
                <div>
                  <p className="font-display text-base font-bold">4.9</p>
                  <p className="text-[10px] font-semibold text-neutral-500">
                    App rating
                  </p>
                </div>
              </motion.div>

              {/* floating: orders pill */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, ease: EASE }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground shadow-soft-lg"
              >
                🎉 1M+ downloads
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
