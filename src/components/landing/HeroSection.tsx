import { Button } from "@/components/ui/button";
import { Check, Shield, Clock, CreditCard, Bell, DollarSign, Calendar } from "lucide-react";
import appDashboard2 from "@/assets/app-dashboard-2.png";

const HeroSection = () => (
  <section className="w-full py-20 lg:py-28 px-4">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      {/* Left */}
      <div className="flex-1 space-y-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
          Get More Jobs. Close Faster.{" "}
          <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
            Never Chase Clients Again.
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg">
          HomeBase is the all-in-one platform built for home service pros — from booking to payment, powered by AI.
        </p>
        <ul className="space-y-3">
          {["AI books jobs while you work", "Automated follow-ups & reminders", "Get paid instantly after every job"].map((t) => (
            <li key={t} className="flex items-center gap-3 text-muted-foreground">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-primary" />
              </div>
              {t}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-8 text-base">
            Get Your First Client Free
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 text-base border-border text-foreground hover:bg-secondary">
            See How It Works
          </Button>
        </div>
        <div className="flex flex-wrap gap-6 pt-2">
          {[
            { icon: Shield, text: "No contracts" },
            { icon: Clock, text: "Setup in 5 min" },
            { icon: CreditCard, text: "Secure payments" },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="h-4 w-4 text-primary" /> {text}
            </span>
          ))}
        </div>
      </div>

      {/* Right — Phone Mockup */}
      <div className="flex-1 relative flex justify-center">
        <div className="w-[280px] h-[560px] bg-card rounded-[2.5rem] border-2 border-border p-3 shadow-2xl shadow-primary/5 relative">
          <div className="w-full h-full bg-background rounded-[2rem] overflow-hidden p-4 space-y-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Dashboard</p>
              <p className="text-lg font-bold mt-1">$4,250</p>
              <p className="text-xs text-primary">+12% this week</p>
            </div>
            <div className="space-y-3">
              {[
                { label: "Today's Jobs", value: "3", color: "bg-primary/20 text-primary" },
                { label: "Pending", value: "5", color: "bg-yellow-500/20 text-yellow-400" },
                { label: "Completed", value: "12", color: "bg-blue-500/20 text-blue-400" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between bg-secondary/50 rounded-xl px-4 py-3">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className={`text-sm font-semibold px-2 py-0.5 rounded-lg ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating cards */}
        <div className="absolute -left-4 top-16 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 animate-pulse">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <Bell className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold">New Booking</p>
            <p className="text-[10px] text-muted-foreground">Kitchen Deep Clean</p>
          </div>
        </div>

        <div className="absolute -right-4 top-48 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-primary">+$350 Received</p>
            <p className="text-[10px] text-muted-foreground">Via HomeBase Pay</p>
          </div>
        </div>

        <div className="absolute -left-2 bottom-24 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
            <Calendar className="h-4 w-4 text-blue-400" />
          </div>
          <div>
            <p className="text-xs font-semibold">Next Job</p>
            <p className="text-[10px] text-muted-foreground">2:30 PM — HVAC Tune-Up</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
