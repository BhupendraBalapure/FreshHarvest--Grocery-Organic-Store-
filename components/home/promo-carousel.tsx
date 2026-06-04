"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, Check, Heart, Leaf, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ---- shared bits ---- */

function Coin({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "absolute rounded-full bg-gradient-to-br from-amber-300 to-orange-400 shadow-sm ring-2 ring-background",
        className,
      )}
    >
      <span className="absolute left-[18%] top-[14%] h-1/4 w-1/4 rounded-full bg-white/80" />
    </span>
  );
}

/** Soft halo + ground shadow shared by every illustration. */
function ArtBase({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-24 w-24">
      <span className="absolute left-1/2 top-1/2 h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/55 blur-md" />
      <span className="absolute left-1/2 top-[66%] h-2.5 w-12 -translate-x-1/2 rounded-full bg-black/15 blur-md" />
      {children}
    </div>
  );
}

/* ---- per-slide illustrations ---- */

function SubscriptionArt() {
  return (
    <ArtBase>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <g stroke="#16a34a" strokeWidth="6.5" fill="none" strokeLinecap="round">
          <path d="M85 35 A38 38 0 0 1 60 86" />
          <path d="M15 65 A38 38 0 0 1 40 14" />
        </g>
        <path d="M85 35 l-12 -1.5 l7 11 z" fill="#16a34a" />
        <path d="M15 65 l12 1.5 l-7 -11 z" fill="#16a34a" />
      </svg>
      <Coin className="right-1 top-2 h-4 w-4" />
      <Coin className="bottom-2.5 right-2 h-3.5 w-3.5" />
      <Coin className="left-1 top-7 h-3 w-3" />
      <span className="absolute left-1/2 top-1/2 grid h-[50px] w-[50px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[1.1rem] bg-gradient-to-br from-orange-400 to-orange-500 shadow-glow-sm ring-1 ring-white/40">
        <Heart className="h-6 w-6 fill-white text-white" />
      </span>
    </ArtBase>
  );
}

function OrganicArt() {
  return (
    <ArtBase>
      <span className="absolute inset-2 rounded-full bg-emerald-100/80" />
      <Coin className="right-2 top-3 h-4 w-4" />
      <Coin className="bottom-3 left-3 h-3.5 w-3.5" />
      <Coin className="bottom-5 right-3 h-3 w-3" />
      <span className="absolute left-1/2 top-1/2 grid h-[50px] w-[50px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[1.1rem] bg-gradient-to-br from-emerald-400 to-green-500 shadow-glow-sm ring-1 ring-white/40">
        <Leaf className="h-6 w-6 text-white" />
      </span>
    </ArtBase>
  );
}

function DealArt() {
  return (
    <ArtBase>
      <span className="absolute inset-2 rounded-full bg-amber-100/80" />
      <Coin className="right-2 top-4 h-4 w-4" />
      <Coin className="bottom-4 left-2 h-3.5 w-3.5" />
      <Coin className="bottom-3 right-4 h-3 w-3" />
      <span className="absolute left-1/2 top-1/2 grid h-[50px] w-[50px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[1.1rem] bg-gradient-to-br from-orange-400 to-amber-500 shadow-glow-sm ring-1 ring-white/40">
        <Percent className="h-6 w-6 text-white" />
      </span>
    </ArtBase>
  );
}

const slides = [
  {
    id: "subscription",
    cardClass: "border-primary/15 bg-primary-soft",
    glowClass: "bg-primary/25",
    title: "Get 20% Cash Back All the Time with a Subscription!",
    subtitle: "On all grocery shopping.",
    chips: ["Cancel anytime", "Free delivery"],
    cta: { label: "Get Subscription", href: "/#subscriptions" },
    Art: SubscriptionArt,
  },
  {
    id: "organic",
    cardClass: "border-emerald-200 bg-emerald-50",
    glowClass: "bg-emerald-400/25",
    title: "Fresh Organic Food For All, Delivered Daily",
    subtitle: "Hand-picked produce, same-day delivery.",
    chips: ["Same-day", "100% organic"],
    cta: { label: "Shop Now", href: "/shop" },
    Art: OrganicArt,
  },
  {
    id: "deal",
    cardClass: "border-amber-200 bg-amber-50",
    glowClass: "bg-amber-400/30",
    title: "Up to 40% OFF on Organic Picks",
    subtitle: "Limited-time flash deals, grab them fast.",
    chips: ["Limited time", "Best price"],
    cta: { label: "Grab Deals", href: "/#flash-deals" },
    Art: DealArt,
  },
];

export function PromoCarousel({ className }: { className?: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Auto-advance (dependency-free)
  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 4500);
    return () => clearInterval(id);
  }, [emblaApi]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map(
            ({ id, cardClass, glowClass, title, subtitle, chips, cta, Art }) => (
              <div key={id} className="min-w-0 flex-[0_0_100%]">
                <div
                  className={cn(
                    "relative h-full overflow-hidden rounded-[1.75rem] border px-5 py-4",
                    cardClass,
                  )}
                >
                  {/* texture + glow for depth */}
                  <div className="pointer-events-none absolute inset-0 bg-hero-grid opacity-40" />
                  <div
                    className={cn(
                      "pointer-events-none absolute -right-6 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full blur-3xl",
                      glowClass,
                    )}
                  />

                  <div className="relative flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <h2 className="font-display text-lg font-bold leading-tight text-foreground">
                        {title}
                      </h2>
                      <p className="mt-1 text-[13px] text-muted-foreground">
                        {subtitle}
                      </p>

                      {/* benefit chips */}
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {chips.map((c) => (
                          <span
                            key={c}
                            className="inline-flex items-center gap-1 rounded-full bg-background/70 px-2.5 py-0.5 text-[11px] font-semibold text-foreground/80 ring-1 ring-border backdrop-blur-sm"
                          >
                            <Check className="h-3 w-3 text-emerald-600" />
                            {c}
                          </span>
                        ))}
                      </div>

                      <Button asChild size="sm" className="mt-3">
                        <Link href={cta.href}>
                          {cta.label} <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>

                    <div className="shrink-0">
                      <Art />
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Go to promo ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === selected ? "w-5 bg-primary" : "w-1.5 bg-primary/30",
            )}
          />
        ))}
      </div>
    </div>
  );
}
