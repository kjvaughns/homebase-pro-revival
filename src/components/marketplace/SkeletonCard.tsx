export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <div className="h-14 w-14 flex-shrink-0 animate-pulse rounded-full bg-secondary" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-4 w-2/3 animate-pulse rounded bg-secondary" />
          <div className="h-3 w-1/3 animate-pulse rounded bg-secondary" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 w-1/2 animate-pulse rounded bg-secondary" />
        <div className="h-3 w-full animate-pulse rounded bg-secondary" />
      </div>
      <div className="mt-4 h-10 w-full animate-pulse rounded-xl bg-secondary" />
    </div>
  );
}
