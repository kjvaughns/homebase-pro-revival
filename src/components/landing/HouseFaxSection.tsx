import { FileText, Bell, RotateCcw } from "lucide-react";

const cards = [
  { icon: FileText, title: "Every Job Logged", description: "Automatic service history for every property you visit. Builds trust and professionalism." },
  { icon: Bell, title: "Smart Reminders", description: "AI sends timely maintenance reminders to past clients — keeping you top of mind." },
  { icon: RotateCcw, title: "Automatic Rebooking", description: "Recurring services get auto-scheduled. Clients love the convenience, you love the revenue." },
];

const HouseFaxSection = () => (
  <section className="w-full py-12 lg:py-20 px-4">
    <div className="max-w-7xl mx-auto text-center space-y-12">
      <div className="space-y-4">
        <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
          HouseFax™
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold">Property Intelligence, Built In</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Track every service, every property. Turn job history into repeat business automatically.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map(({ icon: Icon, title, description }) => (
          <div key={title} className="bg-card border border-border rounded-2xl p-8 space-y-4 text-left hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HouseFaxSection;
