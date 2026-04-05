import { Clock, Users, DollarSign, Zap } from "lucide-react";

const cases = [
  { icon: Clock, stat: "3 min", label: "Average Booking Time", description: "AI handles inquiry, sends quote, and confirms booking — all while you're on a job." },
  { icon: Users, stat: "68%", label: "Recurring Client Rate", description: "Smart follow-ups turn one-time cleanings into monthly contracts automatically." },
  { icon: DollarSign, stat: "$2,400", label: "Avg Monthly Deposits", description: "Upfront deposit collection eliminates no-shows and secures your revenue." },
  { icon: Zap, stat: "15+", label: "Automated Clients/Mo", description: "Hands-free booking, scheduling, and payment for over 15 clients each month." },
];

const CaseStudiesSection = () => (
  <section className="w-full py-20 px-4">
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
          Real Results
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold">See What HomeBase Pros Achieve</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cases.map(({ icon: Icon, stat, label, description }) => (
          <div key={label} className="bg-card border border-border rounded-2xl p-6 space-y-4 hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-primary">{stat}</p>
            <p className="font-semibold text-sm">{label}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CaseStudiesSection;
