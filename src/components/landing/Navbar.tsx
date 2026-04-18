import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <img src={logo} alt="HomeBase logo" className="w-8 h-8" />
          <span className="text-lg font-bold text-foreground">HomeBase</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/marketplace" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Marketplace</Link>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
        </div>
        <Link to="/marketplace" className="hidden md:block">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-6">
            Start Free
          </Button>
        </Link>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground" aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3 animate-fade-in">
          <Link to="/marketplace" onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground py-2">Marketplace</Link>
          <a href="#pricing" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground py-2">Pricing</a>
          <Link to="/blog" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground py-2">Blog</Link>
          <Link to="/marketplace" onClick={() => setOpen(false)}>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full mt-2">
              Start Free
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
