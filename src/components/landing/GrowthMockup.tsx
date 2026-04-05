import { Copy, Share2, Star, Link2, ExternalLink, Home, Calendar, Users, DollarSign, MoreHorizontal } from "lucide-react";

const services = ["Plumbing", "Kitchen Repair", "Bathroom Remodel", "General Maintenance"];

const GrowthMockup = () => (
  <div className="w-full bg-background flex flex-col text-[10px] leading-tight min-h-[360px]">
    {/* Header */}
    <div className="px-3 py-2 border-b border-border">
      <span className="text-xs font-semibold text-foreground">Business Hub</span>
    </div>

    {/* Booking link card */}
    <div className="mx-3 mt-2 bg-secondary rounded-xl px-2.5 py-2.5">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <Link2 className="h-3 w-3 text-primary" />
          <span className="text-[10px] font-semibold text-foreground">Booking Link</span>
        </div>
        <span className="text-[8px] font-medium px-1.5 py-0.5 rounded-full bg-primary/20 text-primary">Active</span>
      </div>
      <div className="flex items-center gap-1.5 bg-card rounded-lg px-2 py-1.5 mb-2">
        <span className="text-[9px] text-muted-foreground flex-1 truncate">book.homebase.pro/martinez-plumbing</span>
        <Copy className="h-3 w-3 text-muted-foreground" />
      </div>
      <div className="flex gap-1.5">
        <button className="flex-1 flex items-center justify-center gap-1 bg-primary text-primary-foreground rounded-lg py-1.5 text-[9px] font-medium">
          <Share2 className="h-3 w-3" /> Share Link
        </button>
        <button className="flex items-center justify-center gap-1 bg-card text-foreground rounded-lg px-2.5 py-1.5 text-[9px]">
          <ExternalLink className="h-3 w-3" /> Preview
        </button>
      </div>
    </div>

    {/* Profile preview */}
    <div className="mx-3 mt-2 bg-secondary rounded-xl px-2.5 py-2.5">
      <p className="text-[9px] text-muted-foreground mb-1.5">Public Profile Preview</p>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-[9px] font-bold text-primary">MP</span>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-foreground">Martinez Plumbing</p>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-2.5 w-2.5 text-amber-400 fill-amber-400" />
            ))}
            <span className="text-[8px] text-muted-foreground ml-0.5">5.0 (24)</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {services.map((s) => (
          <span key={s} className="text-[8px] bg-card text-muted-foreground px-1.5 py-0.5 rounded-full">{s}</span>
        ))}
      </div>
    </div>

    {/* Stats row */}
    <div className="flex gap-1.5 mx-3 mt-2">
      {[
        { label: "Profile Views", value: "142" },
        { label: "Bookings", value: "18" },
      ].map((s) => (
        <div key={s.label} className="flex-1 bg-secondary rounded-xl px-2.5 py-2 text-center">
          <p className="text-[12px] font-bold text-foreground">{s.value}</p>
          <p className="text-[8px] text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>

    {/* Spacer */}
    <div className="flex-1" />

    {/* Bottom tab bar */}
    <div className="flex items-center justify-around px-2 py-1.5 border-t border-border">
      {[
        { icon: Home, label: "Home" },
        { icon: Calendar, label: "Schedule" },
        { icon: Users, label: "Clients" },
        { icon: DollarSign, label: "Finances" },
        { icon: MoreHorizontal, label: "More", active: true },
      ].map((t) => (
        <div key={t.label} className="flex flex-col items-center gap-0.5">
          <t.icon className={`h-3 w-3 ${t.active ? "text-primary" : "text-muted-foreground"}`} />
          <span className={`text-[7px] ${t.active ? "text-primary font-medium" : "text-muted-foreground"}`}>{t.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default GrowthMockup;
