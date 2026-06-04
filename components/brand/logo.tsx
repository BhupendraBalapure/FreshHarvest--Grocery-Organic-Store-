import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * FreshHarvest brand logo (custom artwork).
 * The wordmark text is dark, so the artwork keeps its light background and
 * sits on a subtly rounded chip — seamless on light surfaces, a clean white
 * card on dark surfaces.
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
        alt="FreshHarvest — Eat Fresh, Live Healthy"
        width={1177}
        height={435}
        priority={priority}
        className="h-full w-auto select-none rounded-md dark:bg-white dark:px-1.5 dark:py-0.5"
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
