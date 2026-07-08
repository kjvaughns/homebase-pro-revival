import { Star } from "lucide-react";

const GOLD = "#F5A623";

export function RatingStars({
  rating,
  reviewCount,
  size = 14,
  showNumber = true,
}: {
  rating: number;
  reviewCount?: number | null;
  size?: number;
  showNumber?: boolean;
}) {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            style={{
              width: size,
              height: size,
              color: GOLD,
              fill: i < rounded ? GOLD : "transparent",
            }}
            className={i < rounded ? "" : "opacity-40"}
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-xs text-muted-foreground">
          {Number(rating || 0).toFixed(1)}
          {typeof reviewCount === "number" ? ` (${reviewCount} reviews)` : ""}
        </span>
      )}
    </div>
  );
}
