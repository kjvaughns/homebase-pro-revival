import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="w-full border-t border-border py-12 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="HomeBase logo" className="w-8 h-8" />
            <span className="text-lg font-bold">HomeBase</span>
          </div>
          <p className="text-sm text-muted-foreground">The all-in-one platform for home service professionals.</p>
          <p className="text-sm text-muted-foreground">© 2025 HomeBase Pro. All rights reserved.</p>
        </div>
        <div className="space-y-4">
          <p className="text-sm font-semibold">Product</p>
          <ul className="space-y-2">
            <li><a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
            <li><a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
            <li><a href="#ai-booking" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Booking</a></li>
            <li><a href="#housefax" className="text-sm text-muted-foreground hover:text-foreground transition-colors">HouseFax™</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <p className="text-sm font-semibold">Legal</p>
          <ul className="space-y-2">
            <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
            <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
            <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
