import { Sparkles } from "lucide-react";

const TopBanner = () => (
  <div className="w-full bg-primary/10 border-b border-primary/20 py-2.5 px-4 text-center">
    <p className="text-sm text-primary font-medium flex items-center justify-center gap-2">
      <Sparkles className="h-4 w-4" />
      Free until you get your first paid booking
    </p>
  </div>
);

export default TopBanner;
