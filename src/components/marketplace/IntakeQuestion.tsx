import { IntakeQuestion as Q } from "@/lib/marketplace";

// Renders one dynamic intake question and reports its answer up.
export function IntakeQuestionField({
  q,
  value,
  onChange,
}: {
  q: Q;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const label = (
    <label className="text-sm font-medium text-foreground">
      {q.question}
      {q.required && <span className="ml-1 text-primary">*</span>}
    </label>
  );

  const inputBase =
    "w-full rounded-xl border border-border bg-secondary px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="flex flex-col gap-1.5">
      {label}

      {q.type === "text" && (
        <input
          className={`${inputBase} h-12`}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {q.type === "textarea" && (
        <textarea
          rows={3}
          className={`${inputBase} resize-none py-3`}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {q.type === "select" && (
        <div className="flex flex-col gap-2">
          {(q.options ?? []).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={
                "rounded-xl border px-4 py-3 text-left text-sm transition-all " +
                (value === opt
                  ? "border-primary bg-primary/12 text-primary"
                  : "border-border bg-secondary text-foreground hover:border-primary/40")
              }
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {q.type === "multiselect" && (
        <div className="flex flex-wrap gap-2">
          {(q.options ?? []).map((opt) => {
            const arr = Array.isArray(value) ? (value as string[]) : [];
            const active = arr.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() =>
                  onChange(active ? arr.filter((x) => x !== opt) : [...arr, opt])
                }
                className={
                  "rounded-full border px-4 py-2 text-sm transition-all " +
                  (active
                    ? "border-primary bg-primary/12 text-primary"
                    : "border-border bg-secondary text-foreground hover:border-primary/40")
                }
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {q.type === "boolean" && (
        <div className="flex gap-2">
          {[
            { v: true, label: "Yes" },
            { v: false, label: "No" },
          ].map((o) => (
            <button
              key={o.label}
              type="button"
              onClick={() => onChange(o.v)}
              className={
                "h-11 flex-1 rounded-xl border text-sm font-medium transition-all " +
                (value === o.v
                  ? "border-primary bg-primary/12 text-primary"
                  : "border-border bg-secondary text-foreground hover:border-primary/40")
              }
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
