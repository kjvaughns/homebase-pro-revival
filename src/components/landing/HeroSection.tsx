import { Button } from "@/components/ui/button";
import { Check, Shield, Clock, CreditCard, Bell, DollarSign, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import appDashboard2 from "@/assets/app-dashboard-2.png";

const HeroSection = () => (
  <section className="w-full py-12 lg:py-28 px-4">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
      {/* Left */}
      <div className="flex-1 space-y-6 sm:space-y-8">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
          Get More Jobs. Close Faster.{" "}
          <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
            Never Chase Clients Again.
          </span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-lg">
          HomeBase is the all-in-one platform built for home service pros — from booking to payment, powered by AI.
        </p>
        <ul className="space-y-3">
          {["AI books jobs while you work", "Automated follow-ups & reminders", "Get paid instantly after every job"].map((t) => (
            <li key={t} className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-primary" />
              </div>
              {t}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Link to="/marketplace">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-6 sm:px-8 text-sm sm:text-base">
              Get Your First Client Free
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="rounded-full px-6 sm:px-8 text-sm sm:text-base border-border text-foreground hover:bg-secondary">
            See How It Works
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 sm:gap-6 pt-2">
          {[
            { icon: Shield, text: "No contracts" },
            { icon: Clock, text: "Setup in 5 min" },
            { icon: CreditCard, text: "Secure payments" },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Icon className="h-4 w-4 text-primary" /> {text}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 pt-2">
          <a href="https://apps.apple.com/us/app/homebase-pro/id6760936703" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5">
            <svg className="h-5 w-5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="leading-tight">
              <p className="text-[10px] text-muted-foreground leading-none">Download on the</p>
              <p className="text-sm font-semibold text-foreground leading-tight">App Store</p>
            </div>
          </a>
        </div>
      </div>

      {/* Right — Phone Mockup */}
      <div className="flex-1 relative flex justify-center">
        <div className="w-[260px] sm:w-[280px] bg-card rounded-[2.5rem] border-2 border-border p-2 shadow-2xl shadow-primary/5 relative">
          <div className="rounded-[2rem] overflow-hidden bg-background">
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-24 h-5 bg-card rounded-full" />
            </div>
            <img src={appDashboard2} alt="HomeBase Pro dashboard" className="w-full object-cover" />
            <div className="flex justify-center py-2">
              <div className="w-28 h-1 bg-muted-foreground/30 rounded-full" />
            </div>
          </div>
        </div>

        {/* Floating cards — hidden on mobile */}
        <div className="absolute -left-4 top-16 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl hidden lg:flex items-center gap-3 animate-pulse">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <Bell className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold">New Booking</p>
            <p className="text-[10px] text-muted-foreground">Kitchen Deep Clean</p>
          </div>
        </div>

        <div className="absolute -right-4 top-48 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl hidden lg:flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-primary">+$350 Received</p>
            <p className="text-[10px] text-muted-foreground">Via HomeBase Pay</p>
          </div>
        </div>

        <div className="absolute -left-2 bottom-24 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl hidden lg:flex items-center gap-3">
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
