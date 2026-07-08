import { Category } from "@/lib/marketplace";

export function CategoryCard({
  category,
  active,
  onClick,
}: {
  category: Category;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={
        "flex items-center gap-3 rounded-2xl border p-4 text-left transition-all active:scale-[0.98] " +
        (active
          ? "border-primary bg-primary/10"
          : "border-border bg-card hover:border-primary/40")
      }
    >
      <span className="text-2xl leading-none" aria-hidden="true">
        {category.emoji}
      </span>
      <span
        className={
          "text-sm font-medium " +
          (active ? "text-primary" : "text-foreground")
        }
      >
        {category.name}
      </span>
    </button>
  );
}
