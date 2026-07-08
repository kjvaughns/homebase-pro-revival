// Horizontal scrollable 2-week date row (mobile-app style). Multi-select up to
// `maxSelected` dates. Values are ISO date strings (YYYY-MM-DD).
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function isoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function DatePicker({
  selected,
  onChange,
  days = 14,
  maxSelected = 3,
}: {
  selected: string[];
  onChange: (next: string[]) => void;
  days?: number;
  maxSelected?: number;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dates = Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  function toggle(iso: string) {
    if (selected.includes(iso)) {
      onChange(selected.filter((x) => x !== iso));
    } else if (selected.length < maxSelected) {
      onChange([...selected, iso]);
    }
  }

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {dates.map((d) => {
          const iso = isoDate(d);
          const active = selected.includes(iso);
          return (
            <button
              key={iso}
              type="button"
              onClick={() => toggle(iso)}
              aria-pressed={active}
              className={
                "flex w-16 flex-shrink-0 flex-col items-center rounded-xl border py-2.5 transition-all active:scale-[0.98] " +
                (active
                  ? "border-primary bg-primary/15"
                  : "border-border bg-card hover:border-primary/40")
              }
            >
              <span className={"text-[11px] " + (active ? "text-primary" : "text-muted-foreground")}>
                {DAY_NAMES[d.getDay()]}
              </span>
              <span className={"text-lg font-bold " + (active ? "text-primary" : "text-foreground")}>
                {d.getDate()}
              </span>
              <span className={"text-[10px] " + (active ? "text-primary/80" : "text-muted-foreground")}>
                {MONTHS[d.getMonth()]}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Pick up to {maxSelected} preferred {maxSelected === 1 ? "day" : "days"}.
      </p>
    </div>
  );
}
