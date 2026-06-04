"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=900&q=80&auto=format&fit=crop",
    alt: "Fresh seasonal fruits",
  },
  {
    src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&q=80&auto=format&fit=crop",
    alt: "Crisp farm-fresh vegetables",
  },
  {
    src: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=900&q=80&auto=format&fit=crop",
    alt: "Premium dry fruits & nuts",
  },
  {
    src: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=900&q=80&auto=format&fit=crop",
    alt: "Cold-pressed fresh juices",
  },
];

export function BannerCarousel({
  className,
  viewportClassName,
  overlay,
  scrim = false,
  dotsPosition = "bottom",
}: {
  className?: string;
  viewportClassName?: string;
  /** Content rendered above the images (e.g. headline + CTA). */
  overlay?: ReactNode;
  /** Dark bottom-up gradient for text legibility over the images. */
  scrim?: boolean;
  dotsPosition?: "bottom" | "top-right";
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
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

  // Auto-advance every few seconds (manual loop — keeps it dependency-free)
  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 3500);
    return () => clearInterval(id);
  }, [emblaApi]);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  return (
    <div className={cn("relative", className)}>
      <div
        ref={emblaRef}
        className={cn(
          "h-full overflow-hidden",
          viewportClassName ?? "rounded-[1.75rem] shadow-soft-lg",
        )}
      >
        <div className="flex h-full">
          {slides.map((s, i) => (
            <div
              key={s.src}
              className="relative h-full min-w-0 flex-[0_0_100%]"
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 320px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scrim for legible overlay text */}
      {scrim && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      )}

      {/* Overlaid content */}
      {overlay && <div className="absolute inset-0 z-20">{overlay}</div>}

      {/* Dots */}
      <div
        className={cn(
          "absolute z-30 flex gap-1.5",
          dotsPosition === "top-right"
            ? "right-4 top-4"
            : "inset-x-0 bottom-2.5 justify-center",
        )}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full bg-white/60 transition-all duration-300",
              i === selected ? "w-5 bg-white" : "w-1.5 hover:bg-white/80",
            )}
          />
        ))}
      </div>
    </div>
  );
}
