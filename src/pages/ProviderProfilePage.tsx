import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Star, ArrowLeft, Shield, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

interface Provider {
  id: string;
  business_name: string;
  description?: string | null;
  service_area?: string | null;
  average_rating?: number | null;
  review_count?: number | null;
  avatar_url?: string | null;
  capability_tags?: string[] | null;
  slug?: string | null;
  hourly_rate?: number | null;
  is_verified?: boolean | null;
  category?: string;
  price_range?: string;
}

const MOCK_PROVIDERS: Record<string, Provider> = {
  "mock-1": {
    id: "mock-1",
    business_name: "Marcus Johnson",
    description: "Licensed master plumber, 12 years experience. Same-day service available. Specializing in drain cleaning, pipe repairs, water heater installations, and bathroom remodels. Fully insured and licensed.",
    average_rating: 4.9,
    review_count: 127,
    hourly_rate: 65,
    is_verified: true,
    category: "Plumbing",
    price_range: "$65–$95/hr",
    capability_tags: ["Plumbing", "Drain Cleaning", "Water Heaters", "Pipe Repair"],
    service_area: "Austin, TX",
  },
  "mock-2": {
    id: "mock-2",
    business_name: "Sarah Chen",
    description: "Certified electrician specializing in residential rewiring and panel upgrades. 10+ years of experience with smart home installations, lighting design, and electrical safety inspections.",
    average_rating: 4.7,
    review_count: 89,
    hourly_rate: 75,
    is_verified: true,
    category: "Electrical",
    price_range: "$75–$110/hr",
    capability_tags: ["Electrical", "Panel Upgrades", "Smart Home", "Rewiring"],
    service_area: "Austin, TX",
  },
  "mock-3": {
    id: "mock-3",
    business_name: "Mike Torres",
    description: "HVAC technician. AC installs, repairs, and seasonal maintenance. EPA certified, specializing in energy-efficient systems and indoor air quality solutions.",
    average_rating: 4.8,
    review_count: 203,
    hourly_rate: 80,
    is_verified: true,
    category: "HVAC",
    price_range: "$80–$130/hr",
    capability_tags: ["HVAC", "AC Repair", "Heating", "Maintenance"],
    service_area: "Austin, TX",
  },
  "mock-4": {
    id: "mock-4",
    business_name: "Priya Patel",
    description: "Deep cleaning and recurring home maintenance. Eco-friendly products only. Serving residential and small commercial spaces with attention to detail and reliability.",
    average_rating: 4.6,
    review_count: 156,
    hourly_rate: 45,
    is_verified: false,
    category: "Cleaning",
    price_range: "$45–$65/hr",
    capability_tags: ["Cleaning", "Deep Clean", "Eco-Friendly", "Recurring"],
    service_area: "Austin, TX",
  },
};

const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.round(rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
      />
    ))}
  </div>
);

const ProviderProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Check mock first
    if (MOCK_PROVIDERS[id]) {
      setProvider(MOCK_PROVIDERS[id]);
      setLoading(false);
      return;
    }

    const fetchProvider = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("providers")
        .select("*")
        .eq("id", id)
        .eq("is_public", true)
        .maybeSingle();

      if (data) setProvider(data as Provider);
      setLoading(false);
    };
    fetchProvider();
  }, [id]);

  useEffect(() => {
    if (provider) document.title = `${provider.business_name} | HomeBase`;
  }, [provider]);

  const handleBook = () => {
    if (!provider) return;
    const params = new URLSearchParams({
      providerId: provider.id,
      providerName: provider.business_name,
      category: provider.category || provider.capability_tags?.[0] || "",
    });
    navigate(`/book?${params.toString()}`);
  };

  // Navbar
  const Navbar = () => (
    <nav className="w-full border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="HomeBase" className="w-8 h-8" />
          <span className="text-lg font-bold text-foreground">HomeBase</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/marketplace" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Marketplace</Link>
          <Link to="/ai-booking" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Booking</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
          <Link to="/signup" className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full hover:bg-primary/90 transition-colors">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-16 space-y-6">
          <div className="h-24 rounded-2xl bg-card animate-pulse" />
          <div className="h-40 rounded-2xl bg-card animate-pulse" />
          <div className="h-60 rounded-2xl bg-card animate-pulse" />
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
          <h2 className="text-2xl font-bold">Provider not found</h2>
          <p className="text-muted-foreground">This provider may not be available.</p>
          <Link to="/marketplace" className="text-primary hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Browse all providers
          </Link>
        </div>
      </div>
    );
  }

  const displayCategory = provider.category || provider.capability_tags?.[0] || "";
  const priceDisplay = provider.price_range || (provider.hourly_rate ? `$${provider.hourly_rate}/hr` : "");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Back */}
        <button
          onClick={() => navigate("/marketplace")}
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Marketplace
        </button>

        {/* Hero */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          {provider.avatar_url ? (
            <img src={provider.avatar_url} alt={provider.business_name} className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary">{provider.business_name.charAt(0)}</span>
            </div>
          )}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-3xl font-bold">{provider.business_name}</h1>
              {provider.is_verified && <Shield className="h-5 w-5 text-primary" />}
            </div>
            {displayCategory && (
              <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                {displayCategory}
              </span>
            )}
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <RatingStars rating={provider.average_rating || 0} />
              <span className="text-sm text-muted-foreground">
                {Number(provider.average_rating || 0).toFixed(1)} ({provider.review_count || 0} reviews)
              </span>
            </div>
            {provider.service_area && (
              <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="h-3.5 w-3.5" /> {provider.service_area}
              </p>
            )}
          </div>
        </div>

        {/* About */}
        {provider.description && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">About {provider.business_name}</h2>
            <p className="text-muted-foreground leading-relaxed">{provider.description}</p>
          </div>
        )}

        {/* Services / Tags */}
        {provider.capability_tags && provider.capability_tags.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Services</h2>
            <div className="flex flex-wrap gap-2">
              {provider.capability_tags.map((tag) => (
                <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-full bg-card border border-border text-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Pricing */}
        {priceDisplay && (
          <div className="rounded-2xl border border-border bg-card p-5 space-y-1">
            <h2 className="text-lg font-semibold">Pricing</h2>
            <p className="text-2xl font-bold text-primary">{priceDisplay}</p>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleBook}
          className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl text-base hover:bg-primary/90 transition-colors"
        >
          Book {provider.business_name} Now →
        </button>
        <p className="text-center text-xs text-muted-foreground">
          No account needed · Free to request · Provider confirms within 2 hours
        </p>
      </div>
    </div>
  );
};

export default ProviderProfilePage;
