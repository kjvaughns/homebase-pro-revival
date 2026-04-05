import { Button } from "@/components/ui/button";

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
      <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-10 text-base">
        Start Free
      </Button>
    </div>
  </section>
);

export default FinalCTA;
