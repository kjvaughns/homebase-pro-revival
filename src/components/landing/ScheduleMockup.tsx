import { Home, Calendar, Users, DollarSign, MoreHorizontal, Clock, MapPin } from "lucide-react";

const days = [
  { day: "Mon", date: "7" },
  { day: "Tue", date: "8" },
  { day: "Wed", date: "9", active: true, dots: 3 },
  { day: "Thu", date: "10", dots: 1 },
  { day: "Fri", date: "11", dots: 2 },
  { day: "Sat", date: "12" },
  { day: "Sun", date: "13" },
];

const filters = ["All", "Scheduled", "Active", "Done"];

const jobs = [
  { title: "Kitchen Repair", client: "James Martinez", time: "2:00 PM", status: "Scheduled", statusColor: "bg-blue-500/20 text-blue-400" },
  { title: "Bathroom Remodel", client: "Sarah Robinson", time: "4:30 PM", status: "In Progress", statusColor: "bg-amber-500/20 text-amber-400" },
];

const ScheduleMockup = () => (
  <div className="w-full bg-background flex flex-col text-[10px] leading-tight min-h-[360px]">
    {/* Header */}
    <div className="px-3 py-2 border-b border-border">
      <span className="text-xs font-semibold text-foreground">Schedule</span>
    </div>

    {/* Filter chips */}
    <div className="flex gap-1.5 px-3 py-1.5">
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

    {/* Week strip */}
    <div className="flex justify-between px-3 py-1.5">
      {days.map((d) => (
        <div key={d.day} className="flex flex-col items-center gap-0.5">
          <span className="text-[8px] text-muted-foreground">{d.day}</span>
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-semibold ${
              d.active ? "bg-primary text-primary-foreground" : "text-foreground"
            }`}
          >
            {d.date}
          </div>
          {d.dots && (
            <div className="flex gap-0.5">
              {Array.from({ length: Math.min(d.dots, 3) }).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-primary" />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Today banner */}
    <div className="mx-3 bg-primary/10 border border-primary/20 rounded-xl px-2.5 py-2 mb-1.5">
      <p className="text-[10px] font-semibold text-primary">Today — 3 Jobs</p>
      <p className="text-[9px] text-muted-foreground">$1,200 Expected · Next: Kitchen Repair @ 2:00 PM</p>
    </div>

    {/* Job cards */}
    <div className="flex-1 flex flex-col gap-1.5 px-3 py-1 overflow-hidden">
      {jobs.map((j) => (
        <div key={j.title} className="bg-secondary rounded-xl px-2.5 py-2">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] font-semibold text-foreground">{j.title}</p>
            <span className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full ${j.statusColor}`}>
              {j.status}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[9px] text-muted-foreground">
            <span className="flex items-center gap-0.5"><Users className="h-2.5 w-2.5" />{j.client}</span>
            <span className="flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" />{j.time}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Bottom tab bar */}
    <div className="flex items-center justify-around px-2 py-1.5 border-t border-border">
      {[
        { icon: Home, label: "Home" },
        { icon: Calendar, label: "Schedule", active: true },
        { icon: Users, label: "Clients" },
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

export default ScheduleMockup;
