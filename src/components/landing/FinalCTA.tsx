import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FinalCTA = () => (
  <section className="w-full py-24 px-4">
    <div className="max-w-3xl mx-auto text-center space-y-8">
      <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">
        Let's Get You Your{" "}
        <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
          First Client
        </span>
      </h2>
      <p className="text-lg text-muted-foreground max-w-xl mx-auto">
        Join thousands of home service pros who are booking more jobs, getting paid faster, and growing on autopilot.
      </p>
      <Link to="/marketplace">
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-10 text-base">
          Start Free
        </Button>
      </Link>
      <div className="flex justify-center pt-4">
        <a href="https://apps.apple.com/us/app/homebase-pro/id6744634049" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5">
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
  </section>
);

export default FinalCTA;
