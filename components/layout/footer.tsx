"use client";

import Link from "next/link";
import {
  Leaf,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Send,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/data/categories";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Flash Deals", href: "/#flash-deals" },
      { label: "Best Sellers", href: "/#best-sellers" },
      { label: "Subscriptions", href: "/#subscriptions" },
      { label: "Gift Cards", href: "/shop" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/#why" },
      { label: "Farmer Stories", href: "/#farmers" },
      { label: "Careers", href: "/" },
      { label: "Press", href: "/" },
      { label: "Sustainability", href: "/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/" },
      { label: "Track Order", href: "/dashboard" },
      { label: "Returns", href: "/" },
      { label: "Delivery Info", href: "/" },
      { label: "Contact Us", href: "/" },
    ],
  },
];

const socials = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      {/* Newsletter strip */}
      <div className="border-b border-border">
        <div className="container flex flex-col items-center gap-6 py-12 lg:flex-row lg:justify-between">
          <div className="max-w-md text-center lg:text-left">
            <h3 className="font-display text-2xl font-bold">
              Get fresh deals in your inbox
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Subscribe for weekly offers, recipes and first access to seasonal
              harvests.
            </p>
          </div>
          <form
            className="flex w-full max-w-md items-center gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <Button size="lg" type="submit">
              Subscribe <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Main */}
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold">
              Fresh<span className="text-primary">Harvest</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Premium farm-fresh groceries & certified organic foods, delivered to
            your door the same day — straight from the source.
          </p>
          <div className="mt-5 space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> Bandra West, Mumbai
              400050
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> +91 98765 43210
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> hello@freshharvest.com
            </p>
          </div>
          <div className="mt-5 flex gap-2">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide">
              {col.title}
            </h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wide">
            Categories
          </h4>
          <ul className="space-y-2.5">
            {categories.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link
                  href={`/shop?category=${c.slug}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} FreshHarvest. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-primary">
              Privacy
            </Link>
            <Link href="/" className="hover:text-primary">
              Terms
            </Link>
            <Link href="/" className="hover:text-primary">
              Cookies
            </Link>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-md border border-border px-2 py-1">VISA</span>
            <span className="rounded-md border border-border px-2 py-1">
              UPI
            </span>
            <span className="rounded-md border border-border px-2 py-1">
              MC
            </span>
            <span className="rounded-md border border-border px-2 py-1">
              Razorpay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
