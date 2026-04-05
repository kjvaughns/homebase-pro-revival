import { Star } from "lucide-react";

const testimonials = [
  { name: "Mike Rodriguez", role: "Plumber · Houston, TX", initials: "MR", quote: "HomeBase literally runs my business now. I went from chasing leads on Facebook to having AI book jobs while I'm under a sink. Revenue's up 40% in 3 months." },
  { name: "Jessica Turner", role: "House Cleaner · Atlanta, GA", initials: "JT", quote: "The automated follow-ups are insane. I have clients rebooking monthly without me lifting a finger. It's like having a virtual assistant for $30/mo." },
  { name: "David Park", role: "HVAC Tech · Denver, CO", initials: "DP", quote: "Getting deposits upfront changed everything. No more no-shows, no more chasing payments. HomeBase Pay is a game-changer for solo contractors." },
];

const TestimonialsSection = () => (
  <section className="w-full py-20 px-4">
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
          Testimonials
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold">Loved by Home Service Pros</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map(({ name, role, initials, quote }) => (
          <div key={name} className="bg-card border border-border rounded-2xl p-6 space-y-4 hover:border-primary/30 transition-colors">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">"{quote}"</p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                {initials}
              </div>
              <div>
                <p className="text-sm font-semibold">{name}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
