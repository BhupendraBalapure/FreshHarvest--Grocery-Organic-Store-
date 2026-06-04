"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
  Menu,
  X,
  Leaf,
  MapPin,
  Package,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/data/categories";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { useUI } from "@/store/ui";
import { useMounted } from "@/hooks/use-mounted";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SearchBar } from "@/components/layout/search-bar";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Deals", href: "/#flash-deals" },
  { label: "Recipes", href: "/#recipes" },
];

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground"
    >
      {count > 99 ? "99+" : count}
    </motion.span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const mounted = useMounted();

  const cartCount = useCart((s) => s.totalItems());
  const wishlistCount = useWishlist((s) => s.items.length);
  const { openCart, setMobileMenuOpen, mobileMenuOpen } = useUI();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top announcement bar */}
      <div className="hidden bg-accent text-accent-foreground lg:block">
        <div className="container flex h-9 items-center justify-between text-xs">
          <span className="flex items-center gap-1.5">
            <Leaf className="h-3.5 w-3.5 text-primary" />
            Free same-day delivery on orders above ₹499
          </span>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> Deliver to 400001
            </span>
            <Link href="/dashboard" className="hover:text-primary">
              Track Order
            </Link>
            <Link href="/admin" className="hover:text-primary">
              Seller Hub
            </Link>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "glass border-b border-border shadow-soft"
            : "bg-background",
        )}
      >
        <div className="container">
          {/* Mobile top bar — delivery header (app-style) */}
          <div className="flex h-14 items-center gap-2.5 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menu"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
            >
              <Menu className="h-5 w-5" />
            </button>

            <button type="button" className="flex min-w-0 items-center gap-1.5 text-left">
              <MapPin className="h-5 w-5 shrink-0 text-primary" />
              <span className="min-w-0 leading-tight">
                <span className="block text-[11px] text-muted-foreground">
                  Delivery to
                </span>
                <span className="flex items-center gap-1 text-sm font-bold">
                  <span className="truncate">Mumbai 400001</span>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                </span>
              </span>
            </button>

            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={openCart}
                aria-label="Cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white shadow-soft transition-colors hover:bg-green-700"
              >
                <ShoppingBag className="h-5 w-5" />
                {mounted && <CountBadge count={cartCount} />}
              </button>
              <Link
                href="/dashboard"
                aria-label="Account"
                className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-border"
              >
                <Image
                  src="https://i.pravatar.cc/80?img=12"
                  alt="Account"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </Link>
            </div>
          </div>

          {/* Desktop bar */}
          <div className="hidden h-16 items-center gap-3 lg:flex lg:h-20 lg:gap-6">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Logo className="h-9 lg:h-11" priority />
          </Link>

          {/* Categories dropdown */}
          <div
            className="relative hidden lg:block"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-colors hover:bg-secondary">
              <Menu className="h-4 w-4" /> Categories
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  catOpen && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence>
              {catOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full w-[560px] pt-3"
                >
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-popover p-3 shadow-soft-lg">
                    {categories.map((c) => (
                      <Link
                        key={c.id}
                        href={`/shop?category=${c.slug}`}
                        className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-secondary"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-xl">
                          {c.icon}
                        </span>
                        <span>
                          <span className="block text-sm font-semibold">
                            {c.name}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            {c.productCount} items
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search */}
          <div className="hidden flex-1 md:block">
            <SearchBar />
          </div>

          {/* Nav links */}
          <nav className="ml-auto hidden items-center gap-1 xl:flex">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-1.5 xl:ml-0">
            <ThemeToggle className="hidden sm:flex" />

            <Link
              href="/dashboard"
              aria-label="Wishlist"
              className="relative hidden h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary sm:flex"
            >
              <Heart className="h-5 w-5" />
              {mounted && <CountBadge count={wishlistCount} />}
            </Link>

            <button
              onClick={openCart}
              aria-label="Cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
            >
              <ShoppingBag className="h-5 w-5" />
              {mounted && <CountBadge count={cartCount} />}
            </button>

            <Link
              href="/dashboard"
              aria-label="Account"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary sm:flex"
            >
              <User className="h-5 w-5" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
          </div>

          {/* Mobile search row */}
          <div className="pb-3 lg:hidden">
            <SearchBar placeholder="Search your products, Categories…" />
          </div>
        </div>
      </header>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <motion.div
            className="absolute inset-0 bg-accent/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="absolute left-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-background p-5 shadow-soft-lg"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <Logo className="h-9" />
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-secondary"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6">
              <SearchBar
                placeholder="Search products…"
                onNavigate={onClose}
              />
            </div>

            <div className="mb-6 flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={onClose}
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-secondary"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Shop by category
            </p>
            <div className="mb-6 grid grid-cols-2 gap-2">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/shop?category=${c.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-xl border border-border p-2.5 text-sm hover:bg-secondary"
                >
                  <span className="text-lg">{c.icon}</span>
                  {c.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <Button asChild variant="outline">
                <Link href="/dashboard" onClick={onClose}>
                  <Package className="h-4 w-4" /> My Orders
                </Link>
              </Button>
              <Button asChild>
                <Link href="/admin" onClick={onClose}>
                  <LayoutDashboard className="h-4 w-4" /> Seller Hub
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex items-center justify-between rounded-xl bg-secondary p-3">
              <span className="text-sm font-medium">Appearance</span>
              <ThemeToggle />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
