import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}

export function StarRating({
  rating,
  size = 14,
  className,
  showValue = false,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <Star
              key={i}
              style={{ width: size, height: size }}
              className={cn(
                filled
                  ? "fill-amber-400 text-amber-400"
                  : "fill-transparent text-muted-foreground/40",
              )}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
