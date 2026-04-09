import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => (
  <nav className="w-full border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <div className="flex items-center gap-2">
        <img src={logo} alt="HomeBase logo" className="w-8 h-8" />
        <span className="text-lg font-bold text-foreground">HomeBase</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <Link to="/marketplace" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Marketplace</Link>
        <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
        <Link to="/ai-booking" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Booking</Link>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">For Pros</a>
      </div>
      <Link to="/marketplace">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-6">
          Start Free
        </Button>
      </Link>
    </div>
  </nav>
);

export default Navbar;
