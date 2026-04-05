import { Button } from "@/components/ui/button";
import { Home, ChevronDown } from "lucide-react";

const Navbar = () => (
  <nav className="w-full border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Home className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-foreground">HomeBase</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
          Resources <ChevronDown className="h-3 w-3" />
        </button>
        <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">For Pros</a>
      </div>
      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-6">
        Start Free
      </Button>
    </div>
  </nav>
);

export default Navbar;
