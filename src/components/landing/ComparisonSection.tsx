import { Check, X, DollarSign, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type Cell = "yes" | "no" | "addon" | "paid";

type Competitor = {
  name: string;
  price: string;
  note: string;
  highlight?: boolean;
};

const competitors: Competitor[] = [
  { name: "HomeBase Pro", price: "$29.99/mo", note: "All-in-one, cancel anytime", highlight: true },
  { name: "Jobber", price: "~$39/mo", note: "Core plan, 1 user" },
  { name: "Housecall Pro", price: "~$65/mo", note: "Basic, 1 user" },
  { name: "ServiceTitan", price: "$300+/mo", note: "Enterprise, annual contract" },
  { name: "Thumbtack", price: "$15–$80/lead", note: "Pay per lead, you don't own them" },
];

const rows: { label: string; values: Cell[] }[] = [
  { label: "Flat monthly price under $30", values: ["yes", "no", "no", "no", "no"] },
  { label: "Unlimited users included", values: ["yes", "no", "no", "paid", "yes"] },
  { label: "AI booking & lead response", values: ["yes", "no", "no", "addon", "no"] },
  { label: "Built-in customer marketplace", values: ["yes", "no", "no", "no", "yes"] },
  { label: "Scheduling & dispatch", values: ["yes", "yes", "yes", "yes", "no"] },
  { label: "Invoicing & payments", values: ["yes", "yes", "yes", "yes", "no"] },
  { label: "No long-term contract", values: ["yes", "yes", "yes", "no", "yes"] },
  { label: "No per-lead fees", values: ["yes", "yes", "yes", "yes", "no"] },
  { label: "Onboarding in under 10 minutes", values: ["yes", "no", "no", "no", "yes"] },
];

const CellIcon = ({ value }: { value: Cell }) => {
  switch (value) {
    case "yes":
      return <Check className="h-5 w-5 text-primary mx-auto" aria-label="Yes" />;
    case "no":
      return <X className="h-5 w-5 text-muted-foreground/50 mx-auto" aria-label="No" />;
    case "addon":
      return <span className="text-xs font-medium text-muted-foreground">Add-on</span>;
    case "paid":
      return <DollarSign className="h-5 w-5 text-muted-foreground mx-auto" aria-label="Extra cost" />;
  }
};

const ComparisonSection = () => (
  <section id="compare" className="w-full py-12 lg:py-20 px-4 bg-muted/30">
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
          How we compare
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold">Built for pros. Priced for pros.</h2>
        <p className="text-muted-foreground">
          Most tools overcharge, lock you into contracts, or rent you leads. HomeBase gives you the full stack
          for a flat $29.99/mo.
        </p>
      </div>

      {/* Pricing strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {competitors.map((c) => (
          <div
            key={c.name}
            className={
              c.highlight
                ? "relative rounded-2xl p-4 bg-card border-2 border-primary shadow-lg"
                : "rounded-2xl p-4 bg-card border border-border"
            }
          >
            {c.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground px-2 py-1 rounded-full">
                <Sparkles className="h-3 w-3" /> Best value
              </span>
            )}
            <p className="text-sm font-semibold">{c.name}</p>
            <p className={c.highlight ? "text-xl font-extrabold mt-1 text-primary" : "text-xl font-extrabold mt-1"}>
              {c.price}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{c.note}</p>
          </div>
        ))}
      </div>

      {/* Feature matrix */}
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="sticky left-0 z-10 bg-card text-left font-semibold p-4">Feature</th>
              {competitors.map((c) => (
                <th
                  key={c.name}
                  className={
                    c.highlight
                      ? "p-4 text-center font-bold text-primary"
                      : "p-4 text-center font-semibold text-muted-foreground"
                  }
                >
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={i % 2 === 0 ? "bg-muted/20" : ""}>
                <td className="sticky left-0 z-10 bg-inherit p-4 font-medium">{row.label}</td>
                {row.values.map((v, idx) => (
                  <td
                    key={idx}
                    className={
                      competitors[idx].highlight ? "p-4 text-center bg-primary/5" : "p-4 text-center"
                    }
                  >
                    <CellIcon value={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto">
        Competitor pricing as publicly listed May 2026. Plans and features change frequently — check each
        provider's site for the latest details.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <a href="#pricing">
          <Button size="lg" variant="outline" className="rounded-full font-semibold">
            See the full $29.99 plan
          </Button>
        </a>
        <a
          href="https://apps.apple.com/app/homebase-pro-app/id6760936703"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="lg" className="rounded-full font-semibold bg-primary hover:bg-primary/90 text-primary-foreground">
            Download HomeBase Pro
          </Button>
        </a>
      </div>
    </div>
  </section>
);

export default ComparisonSection;
