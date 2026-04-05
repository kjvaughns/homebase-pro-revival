import { type LucideIcon } from "lucide-react";

interface FeatureSectionProps {
  badge: string;
  title: string;
  description: string;
  features: { icon: LucideIcon; title: string; description: string }[];
  reversed?: boolean;
}

const FeatureSection = ({ badge, title, description, features, reversed }: FeatureSectionProps) => (
  <section className="w-full py-20 px-4">
    <div className={`max-w-7xl mx-auto flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-16`}>
      <div className="flex-1 space-y-6">
        <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
          {badge}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight">{title}</h2>
        <p className="text-muted-foreground max-w-lg">{description}</p>
        <div className="grid gap-4 pt-2">
          {features.map(({ icon: Icon, title: ft, description: fd }) => (
            <div key={ft} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">{ft}</p>
                <p className="text-sm text-muted-foreground">{fd}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-md aspect-square bg-card rounded-3xl border border-border flex items-center justify-center">
          <div className="text-center space-y-2 p-8">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl mx-auto flex items-center justify-center">
              {features[0] && <features[0].icon className="h-8 w-8 text-primary" />}
            </div>
            <p className="font-semibold text-lg">{badge}</p>
            <p className="text-sm text-muted-foreground">{description.slice(0, 60)}...</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FeatureSection;
