import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * FreshHarvest full lockup (emblem + wordmark + tagline). Two PNG variants are
 * rendered and toggled purely with CSS so it works without a JS theme read (no
 * hydration flash):
 *  - light mode → dark charcoal wordmark   (logo-custom.png)
 *  - dark mode  → white wordmark           (logo-custom-dark.png)
 *
 * logo-custom-dark.png is derived from logo-custom.png by recoloring the dark
 * wordmark text to near-white and brightening the tagline for dark backgrounds.
 */
export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={cn("inline-flex h-10 items-center", className)}>
      <Image
        src="/brand/logo-custom.png"
        alt="FreshHarvest"
        width={822}
        height={303}
        priority={priority}
        className="h-full w-auto select-none dark:hidden"
      />
      <Image
        src="/brand/logo-custom-dark.png"
        alt="FreshHarvest"
        width={822}
        height={303}
        priority={priority}
        className="hidden h-full w-auto select-none dark:block"
      />
    </span>
  );
}

/** Square emblem (sun + leaf) — for compact / square placements. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-mark-custom.png"
      alt="FreshHarvest"
      width={307}
      height={307}
      className={cn(
        "h-10 w-10 select-none rounded-xl object-contain dark:bg-white",
        className,
      )}
    />
  );
}
