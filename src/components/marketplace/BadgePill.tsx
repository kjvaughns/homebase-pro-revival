// Provider trust badges. Only "verified" is backed by a real Supabase column
// (providers.is_verified) today; partner / top_provider / featured render only
// when that data becomes available, so they degrade gracefully to nothing.
export type BadgeKind = "verified" | "top_provider" | "partner" | "featured";

const STYLES: Record<
  BadgeKind,
  { label: string; className: string }
> = {
  verified: {
    label: "✓ Verified Pro",
    className: "bg-primary/12 text-primary border border-primary/30",
  },
  top_provider: {
    label: "🏆 Top Provider",
    className: "bg-primary/12 text-primary border border-primary/30",
  },
  featured: {
    label: "★ Featured",
    className: "bg-primary/12 text-primary border border-primary/30",
  },
  partner: {
    label: "★ Partner",
    className: "border",
  },
};

export function BadgePill({ kind }: { kind: BadgeKind }) {
  const s = STYLES[kind];
  const partnerStyle =
    kind === "partner"
      ? { color: "#E0A83D", borderColor: "rgba(224,168,61,0.4)", background: "rgba(224,168,61,0.12)" }
      : undefined;
  return (
    <span
      style={partnerStyle}
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${s.className}`}
    >
      {s.label}
    </span>
  );
}
