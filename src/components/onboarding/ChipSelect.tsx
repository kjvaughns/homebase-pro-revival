import { useState } from "react";

export function ChipSelect({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const [custom, setCustom] = useState("");
  const [extra, setExtra] = useState<string[]>([]);
  const all = [...options, ...extra.filter((e) => !options.includes(e))];

  const toggle = (v: string) =>
    onChange(
      selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]
    );

  function addCustom() {
    const v = custom.trim();
    if (!v) return;
    if (!all.some((o) => o.toLowerCase() === v.toLowerCase()))
      setExtra((e) => [...e, v]);
    if (!selected.some((s) => s.toLowerCase() === v.toLowerCase()))
      onChange([...selected, v]);
    setCustom("");
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {all.map((o) => {
          const active = selected.includes(o);
          return (
            <button
              key={o}
              type="button"
              onClick={() => toggle(o)}
              aria-pressed={active}
              className={
                "rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-[0.98] " +
                (active
                  ? "border border-green-500 bg-green-500/15 text-green-400"
                  : "border border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500")
              }
            >
              {o}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustom();
            }
          }}
          placeholder="Add another…"
          className="h-11 flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 text-sm text-white placeholder:text-gray-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <button
          type="button"
          onClick={addCustom}
          disabled={!custom.trim()}
          className="h-11 rounded-lg border border-gray-700 bg-gray-800 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-40"
        >
          Add
        </button>
      </div>
    </div>
  );
}
