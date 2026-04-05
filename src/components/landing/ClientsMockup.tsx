import { Search, Plus, Phone, Mail, Home, Calendar, Users, DollarSign, MoreHorizontal } from "lucide-react";

const clients = [
  { initials: "JM", name: "James Martinez", status: "Active", color: "bg-blue-500" },
  { initials: "SR", name: "Sarah Robinson", status: "Active", color: "bg-purple-500" },
  { initials: "DW", name: "David Williams", status: "Lead", color: "bg-amber-500" },
  { initials: "LK", name: "Lisa Kim", status: "Inactive", color: "bg-pink-500" },
];

const filters = ["All", "Lead", "Active", "Inactive"];

const ClientsMockup = () => (
  <div className="w-full bg-background flex flex-col text-[10px] leading-tight min-h-[360px]">
    {/* Header */}
    <div className="flex items-center justify-between px-3 py-2 border-b border-border">
      <span className="text-xs font-semibold text-foreground">Clients</span>
      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
        <Plus className="h-3 w-3 text-primary-foreground" />
      </div>
    </div>

    {/* Search */}
    <div className="px-3 py-1.5">
      <div className="flex items-center gap-1.5 bg-secondary rounded-lg px-2 py-1.5">
        <Search className="h-3 w-3 text-muted-foreground" />
        <span className="text-[9px] text-muted-foreground">Search clients...</span>
      </div>
    </div>

    {/* Filter chips */}
    <div className="flex gap-1.5 px-3 py-1">
      {filters.map((f) => (
        <span
          key={f}
          className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
            f === "All" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
          }`}
        >
          {f}
        </span>
      ))}
    </div>

    {/* Client list */}
    <div className="flex-1 flex flex-col gap-1.5 px-3 py-1.5 overflow-hidden">
      {clients.map((c) => (
        <div key={c.name} className="flex items-center gap-2 bg-secondary rounded-xl px-2.5 py-2">
          <div className={`w-7 h-7 rounded-full ${c.color} flex items-center justify-center flex-shrink-0`}>
            <span className="text-[8px] font-bold text-white">{c.initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-medium text-foreground truncate">{c.name}</p>
            <span
              className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full ${
                c.status === "Active"
                  ? "bg-primary/20 text-primary"
                  : c.status === "Lead"
                  ? "bg-amber-500/20 text-amber-400"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {c.status}
            </span>
          </div>
          <div className="flex gap-1.5">
            <Phone className="h-3 w-3 text-muted-foreground" />
            <Mail className="h-3 w-3 text-muted-foreground" />
          </div>
        </div>
      ))}
    </div>

    {/* Bottom tab bar */}
    <div className="flex items-center justify-around px-2 py-1.5 border-t border-border">
      {[
        { icon: Home, label: "Home" },
        { icon: Calendar, label: "Schedule" },
        { icon: Users, label: "Clients", active: true },
        { icon: DollarSign, label: "Finances" },
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

export default ClientsMockup;
