import { type LucideIcon } from "lucide-react";

interface FeatureSectionProps {
  badge: string;
  title: string;
  description: string;
  features: { icon: LucideIcon; title: string; description: string }[];
  reversed?: boolean;
  phoneImage?: string;
  customPhone?: React.ReactNode;
}

const FeatureSection = ({ badge, title, description, features, reversed, phoneImage, customPhone }: FeatureSectionProps) => (
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
        {phoneImage ? (
          <div className="relative w-[280px] sm:w-[300px]">
            {/* iPhone frame */}
            <div className="rounded-[2.5rem] border-2 border-border bg-background p-2 shadow-2xl shadow-black/40">
              <div className="rounded-[2rem] overflow-hidden bg-background">
                {/* Notch */}
                <div className="flex justify-center pt-2 pb-1">
                  <div className="w-24 h-5 bg-card rounded-full" />
                </div>
                <img
                  src={phoneImage}
                  alt={`${badge} feature preview`}
                  className="w-full object-cover"
                  loading="lazy"
                />
                {/* Bottom bar */}
                <div className="flex justify-center py-2">
                  <div className="w-28 h-1 bg-muted-foreground/30 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md aspect-square bg-card rounded-3xl border border-border flex items-center justify-center">
            <div className="text-center space-y-2 p-8">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl mx-auto flex items-center justify-center">
                {features[0] && (() => { const IconComp = features[0].icon; return <IconComp className="h-8 w-8 text-primary" />; })()}
              </div>
              <p className="font-semibold text-lg">{badge}</p>
              <p className="text-sm text-muted-foreground">{description.slice(0, 60)}...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default FeatureSection;
