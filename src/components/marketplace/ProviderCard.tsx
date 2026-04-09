import { Star, MapPin, ArrowRight } from "lucide-react";

interface ProviderCardProps {
    id: string;
    businessName: string;
    description?: string | null;
    serviceArea?: string | null;
    averageRating?: number | null;
    reviewCount?: number | null;
    avatarUrl?: string | null;
    capabilityTags?: string[] | null;
    hourlyRate?: number | null;
    slug?: string | null;
}

const ProviderCard = ({
    id,
    businessName,
    description,
    serviceArea,
    averageRating,
    reviewCount,
    avatarUrl,
    capabilityTags,
    hourlyRate,
    slug,
}: ProviderCardProps) => {
    const bookingUrl = slug
      ? `https://home-base-pro-app.replit.app/book/${slug}`
      : `/marketplace/${id}`;
    const isExternal = !!slug;

    return (
      <a
        href={bookingUrl}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="group block rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 transition-all hover:border-primary/40 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-primary/5 no-underline"
      >
        <div className="flex items-start gap-4">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={businessName}
              className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-bold text-primary">
                {businessName?.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {businessName}
            </p>
            {serviceArea && (
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3" />
                {serviceArea}
              </p>
            )}
            <div className="flex items-center gap-3 mt-1.5">
              {averageRating && (
                <span className="flex items-center gap-1 text-xs font-medium text-primary">
                  <Star className="h-3.5 w-3.5 fill-primary" />
                  {Number(averageRating).toFixed(1)}
                  {reviewCount && (
                    <span className="text-muted-foreground font-normal">
                      ({reviewCount})
                    </span>
                  )}
                </span>
              )}
              {hourlyRate && (
                <span className="text-xs text-muted-foreground">
                  From ${Number(hourlyRate).toFixed(0)}/hr
                </span>
              )}
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors mt-1 flex-shrink-0" />
        </div>

        {description && (
          <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
            {description}
          </p>
        )}

        {capabilityTags && capabilityTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {capabilityTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
            {capabilityTags.length > 3 && (
              <span className="text-[11px] text-muted-foreground px-2 py-0.5">
                +{capabilityTags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <span className="text-xs font-semibold text-primary group-hover:underline">
            {slug ? "Book Now →" : "View Profile →"}
          </span>
        </div>
      </a>
    );
};

export default ProviderCard;
