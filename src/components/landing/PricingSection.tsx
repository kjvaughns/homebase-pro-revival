import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const features = [
  "AI-powered booking & scheduling",
  "Automated follow-ups & reminders",
  "Instant payments & invoicing",
  "Client CRM & job history",
  "HouseFax™ property tracking",
  "Booking link & review collection",
  "Unlimited clients & jobs",
  "Priority support",
];

const PricingSection = () => (
  <section id="pricing" className="w-full py-20 px-4">
    <div className="max-w-xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
          Pricing
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold">One Simple Plan. Everything Included.</h2>
        <p className="text-muted-foreground">No hidden fees. No contracts. Cancel anytime.</p>
      </div>
      <div className="bg-card border-2 border-primary/30 rounded-3xl p-8 space-y-6">
        <div className="space-y-2">
          <p className="text-5xl font-extrabold">
            $29<span className="text-2xl font-bold text-muted-foreground">.99/mo</span>
          </p>
          <p className="text-sm text-muted-foreground">+ 3% transaction fee on payments</p>
        </div>
        <p className="text-sm text-primary font-medium bg-primary/10 rounded-full py-2 px-4 inline-block">
          Free until you get your first paid booking
        </p>
        <ul className="space-y-3 text-left">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm">
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">{f}</span>
            </li>
          ))}
        </ul>
        <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full text-base">
          Start Free
        </Button>
      </div>
    </div>
  </section>
);

export default PricingSection;
