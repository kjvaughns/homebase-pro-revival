import { useNavigate } from "react-router-dom";
import { ProviderRow } from "@/lib/marketplace";
import { RatingStars } from "./RatingStars";
import { BadgePill } from "./BadgePill";

// Spec-aligned marketplace card: avatar/initials, badges, gold rating, tags,
// service area, "View Profile" → /providers/:id. Data comes from Supabase.
export function ProviderCard({ p }: { p: ProviderRow }) {
  const navigate = useNavigate();
  const rating = p.average_rating ?? p.rating ?? 0;
  const tags = (p.capability_tags ?? []).slice(0, 3);
  const price = p.hourly_rate ? `$${Number(p.hourly_rate).toFixed(0)}/hr` : null;

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40">
      <div className="flex items-start gap-3">
        {p.avatar_url ? (
          <img
            src={p.avatar_url}
            alt={p.business_name}
            className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
            <span className="text-lg font-bold text-primary">
              {p.business_name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-foreground">{p.business_name}</p>
          {p.is_verified && (
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <BadgePill kind="verified" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-3">
        <RatingStars rating={rating} reviewCount={p.review_count ?? 0} />
      </div>

      {price && <p className="mt-2 text-sm font-medium text-primary">{price}</p>}

      {p.description && (
        <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">
          {p.description}
        </p>
      )}

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {p.service_area && (
        <p className="mt-2 text-xs text-muted-foreground">{p.service_area}</p>
      )}

      <button
        onClick={() => navigate(`/providers/${p.id}`)}
        className="mt-4 h-[50px] w-full rounded-xl border border-primary text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground active:scale-[0.98]"
      >
        View Profile
      </button>
    </div>
  );
}

export default ProviderCard;
