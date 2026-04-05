import { Landmark, Home, Calendar, Users, DollarSign, MoreHorizontal } from "lucide-react";

const stats = [
  { label: "Revenue MTD", value: "$4,250" },
  { label: "Jobs Completed", value: "12" },
  { label: "Active Clients", value: "8" },
  { label: "Upcoming Jobs", value: "3" },
];

const payouts = [
  { bank: "Bank ••••4521", amount: "$850.00", status: "Paid", statusColor: "bg-primary/20 text-primary" },
  { bank: "Bank ••••4521", amount: "$1,200.00", status: "In Transit", statusColor: "bg-blue-500/20 text-blue-400" },
  { bank: "Bank ••••4521", amount: "$675.00", status: "Paid", statusColor: "bg-primary/20 text-primary" },
];

const FinancesMockup = () => (
  <div className="w-full bg-background flex flex-col text-[10px] leading-tight min-h-[360px]">
    {/* Header */}
    <div className="px-3 py-2 border-b border-border">
      <span className="text-xs font-semibold text-foreground">Finances</span>
    </div>

    {/* Stats grid */}
    <div className="grid grid-cols-2 gap-1.5 px-3 py-2">
      {stats.map((s) => (
        <div key={s.label} className="bg-secondary rounded-xl px-2.5 py-2 text-center">
          <p className="text-[13px] font-bold text-foreground">{s.value}</p>
          <p className="text-[8px] text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>

    {/* Segment tabs */}
    <div className="flex gap-0 mx-3 bg-secondary rounded-lg p-0.5">
      {["Payouts", "Payments", "Refunds"].map((t) => (
        <span
          key={t}
          className={`flex-1 text-center py-1 rounded-md text-[9px] font-medium ${
            t === "Payouts" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          {t}
        </span>
      ))}
    </div>

    {/* Payout rows */}
    <div className="flex-1 flex flex-col gap-1.5 px-3 py-2 overflow-hidden">
      {payouts.map((p, i) => (
        <div key={i} className="flex items-center gap-2 bg-secondary rounded-xl px-2.5 py-2">
          <div className="w-7 h-7 rounded-full bg-card flex items-center justify-center flex-shrink-0">
            <Landmark className="h-3 w-3 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-medium text-foreground">{p.bank}</p>
            <span className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full ${p.statusColor}`}>
              {p.status}
            </span>
          </div>
          <span className="text-[10px] font-semibold text-foreground">{p.amount}</span>
        </div>
      ))}
    </div>

    {/* Bottom tab bar */}
    <div className="flex items-center justify-around px-2 py-1.5 border-t border-border">
      {[
        { icon: Home, label: "Home" },
        { icon: Calendar, label: "Schedule" },
        { icon: Users, label: "Clients" },
        { icon: DollarSign, label: "Finances", active: true },
        { icon: MoreHorizontal, label: "More" },
      ].map((t) => (
        <div key={t.label} className="flex flex-col items-center gap-0.5">
          <t.icon className={`h-3 w-3 ${t.active ? "text-primary" : "text-muted-foreground"}`} />
          <span className={`text-[7px] ${t.active ? "text-primary font-medium" : "text-muted-foreground"}`}>{t.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default FinancesMockup;
