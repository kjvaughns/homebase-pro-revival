import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Star, Search, Shield, Sparkles, Menu, X } from "lucide-react";
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
  booking_links?: { slug: string; is_active: boolean | null }[] | { slug: string; is_active: boolean | null };
}

const MOCK_PROVIDERS: Provider[] = [
  {
    id: "mock-1",
    business_name: "Marcus Johnson",
    description: "Licensed master plumber, 12 years experience. Same-day service available.",
    average_rating: 4.9,
    review_count: 127,
    hourly_rate: 65,
    is_verified: true,
    category: "Plumbing",
    price_range: "$65–$95/hr",
    capability_tags: ["Plumbing"],
    avatar_url: null,
    slug: null,
  },
  {
    id: "mock-2",
    business_name: "Sarah Chen",
    description: "Certified electrician specializing in residential rewiring and panel upgrades.",
    average_rating: 4.7,
    review_count: 89,
    hourly_rate: 75,
    is_verified: true,
    category: "Electrical",
    price_range: "$75–$110/hr",
    capability_tags: ["Electrical"],
    avatar_url: null,
    slug: null,
  },
  {
    id: "mock-3",
    business_name: "Mike Torres",
    description: "HVAC technician. AC installs, repairs, and seasonal maintenance.",
    average_rating: 4.8,
    review_count: 203,
    hourly_rate: 80,
    is_verified: true,
    category: "HVAC",
    price_range: "$80–$130/hr",
    capability_tags: ["HVAC"],
    avatar_url: null,
    slug: null,
  },
  {
    id: "mock-4",
    business_name: "Priya Patel",
    description: "Deep cleaning and recurring home maintenance. Eco-friendly products.",
    average_rating: 4.6,
    review_count: 156,
    hourly_rate: 45,
    is_verified: false,
    category: "Cleaning",
    price_range: "$45–$65/hr",
    capability_tags: ["Cleaning"],
    avatar_url: null,
    slug: null,
  },
];

const CATEGORIES = [
  "All", "Plumbing", "Electrical", "HVAC", "Cleaning",
  "Landscaping", "Painting", "Carpentry", "Roofing", "Pest Control",
];

const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${i < Math.round(rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
      />
    ))}
  </div>
);

const MarketplacePage = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Find a Pro | HomeBase";
  }, []);

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("providers")
        .select("*, booking_links(slug, is_active)")
        .eq("is_active", true)
        .order("rating", { ascending: false });

      if (!error && data && data.length > 0) {
        setProviders(data as unknown as Provider[]);
      } else {
        setProviders(MOCK_PROVIDERS);
      }
      setLoading(false);
    };
    fetchProviders();
  }, []);

  const filtered = useMemo(() => {
    let result = providers;
    if (category !== "All") {
      result = result.filter(
        (p) =>
          p.category?.toLowerCase() === category.toLowerCase() ||
          p.capability_tags?.some((t) => t.toLowerCase() === category.toLowerCase())
      );
    }
    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.business_name?.toLowerCase().includes(s) ||
          p.description?.toLowerCase().includes(s) ||
          p.category?.toLowerCase().includes(s) ||
          p.capability_tags?.some((t) => t.toLowerCase().includes(s))
      );
    }
    return result;
  }, [providers, search, category]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="w-full border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="HomeBase" className="w-8 h-8" />
            <span className="text-lg font-bold text-foreground">HomeBase</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/marketplace" className="text-sm font-medium text-primary">Marketplace</Link>
            <Link to="/ai-booking" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Booking</Link>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
            <Link to="/signup" className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full hover:bg-primary/90 transition-colors">
              Sign Up
            </Link>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-foreground" aria-label="Toggle menu">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3 animate-fade-in">
            <Link to="/marketplace" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-primary py-2">Marketplace</Link>
            <Link to="/ai-booking" onClick={() => setMenuOpen(false)} className="block text-sm text-muted-foreground py-2">AI Booking</Link>
            <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-sm text-muted-foreground py-2">Sign In</Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)} className="block bg-primary text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-full text-center hover:bg-primary/90 transition-colors mt-2">
              Sign Up
            </Link>
          </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Find a <span className="text-primary">Pro</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Browse verified home service professionals
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, skill, or service..."
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
          />
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6 md:justify-center md:flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                category === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground border border-border hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* AI match CTA */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => navigate("/ai-booking")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
          >
            <Sparkles className="h-4 w-4" />
            Not sure which pro? Let AI match you →
          </button>
        </div>

        {/* Provider grid */}
        {loading ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-56 rounded-2xl bg-card border border-border animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <p className="text-lg font-semibold">No providers found</p>
            <p className="text-muted-foreground text-sm">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => {
              const displayCategory = p.category || p.capability_tags?.[0] || "";
              const priceDisplay = p.price_range || (p.hourly_rate ? `$${p.hourly_rate}/hr` : "");

              return (
                <div
                  key={p.id}
                  className="rounded-2xl border border-border bg-card p-5 space-y-3 hover:border-primary/40 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    {p.avatar_url ? (
                      <img src={p.avatar_url} alt={p.business_name} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-primary">{p.business_name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-foreground truncate">{p.business_name}</p>
                        {p.is_verified && <Shield className="h-4 w-4 text-primary flex-shrink-0" />}
                      </div>
                      {displayCategory && (
                        <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary mt-1">
                          {displayCategory}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <RatingStars rating={p.average_rating || 0} />
                    <span className="text-xs text-muted-foreground">
                      {Number(p.average_rating || 0).toFixed(1)} ({p.review_count || 0} reviews)
                    </span>
                  </div>

                  {priceDisplay && (
                    <p className="text-sm font-medium text-primary">{priceDisplay}</p>
                  )}

                  {p.description && (
                    <p className="text-sm text-muted-foreground line-clamp-1">{p.description}</p>
                  )}

                  <button
                    onClick={() => {
                      const bls = p.booking_links;
                      const slug = Array.isArray(bls)
                        ? bls.find(bl => bl.is_active)?.slug
                        : bls?.is_active ? bls.slug : undefined;
                      navigate(`/providers/${slug || p.id}`);
                    }}
                    className="w-full mt-1 text-sm font-semibold py-2.5 rounded-xl border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    View Profile
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;
