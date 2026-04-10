import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Star, ArrowLeft, MapPin, Heart, Phone, MessageCircle, Briefcase, CheckCircle2, Clock, Copy, Check, Share2 } from "lucide-react";
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
  years_experience?: number | null;
}

interface BookingLink {
  provider_id: string;
  slug: string;
  is_active: boolean | null;
  instant_booking: boolean | null;
  show_pricing: boolean | null;
  custom_title: string | null;
}

const MOCK_PROVIDERS: Record<string, Provider> = {
  "mock-1": {
    id: "mock-1",
    business_name: "Marcus Johnson",
    description: "Licensed master plumber with 15 years of experience. We handle everything from leaky faucets to full bathroom remodels.",
    average_rating: 4.9,
    review_count: 127,
    hourly_rate: 65,
    is_verified: true,
    category: "Plumbing",
    price_range: "$65–$95/hr",
    capability_tags: ["Plumbing", "Drain Cleaning", "Water Heaters", "Pipe Repair"],
    service_area: "Austin, TX",
    years_experience: 15,
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
    years_experience: 10,
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
    years_experience: 8,
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
    years_experience: 6,
  },
};

const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.round(rating) ? "fill-green-500 text-green-500" : "text-gray-600"}`}
      />
    ))}
  </div>
);

type Tab = "about" | "services" | "reviews";

const ProviderProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [bookingLink, setBookingLink] = useState<BookingLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;

    // Mock provider fallback
    if (id.startsWith("mock-") && MOCK_PROVIDERS[id]) {
      setProvider(MOCK_PROVIDERS[id]);
      setLoading(false);
      return;
    }

    const fetchProvider = async () => {
      setLoading(true);

      // Step 1: Try booking_links slug lookup
      const { data: blData } = await supabase
        .from("booking_links")
        .select("provider_id, slug, is_active, instant_booking, show_pricing, custom_title")
        .eq("slug", id)
        .eq("is_active", true)
        .maybeSingle();

      if (blData) {
        setBookingLink(blData as BookingLink);
        // Step 2a: Fetch provider by booking_link's provider_id
        const { data: provData } = await supabase
          .from("providers")
          .select("*")
          .eq("id", blData.provider_id)
          .single();
        if (provData) setProvider(provData as Provider);
      } else {
        // Step 2b: Fall back to direct provider ID lookup
        const { data: provData } = await supabase
          .from("providers")
          .select("*")
          .eq("id", id)
          .eq("is_public", true)
          .maybeSingle();
        if (provData) setProvider(provData as Provider);
      }

      setLoading(false);
    };
    fetchProvider();
  }, [id]);

  useEffect(() => {
    if (!provider) return;
    document.title = `${provider.business_name} | HomeBase`;

    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setNameMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const desc = provider.description
      ? provider.description.slice(0, 160)
      : `Book ${provider.business_name} on HomeBase`;

    setMeta("og:title", `${provider.business_name} | HomeBase`);
    setMeta("og:description", desc);
    setMeta("og:image", provider.avatar_url || "/placeholder.svg");
    setMeta("og:url", window.location.href);
    setNameMeta("description", desc);
    setNameMeta("twitter:title", `${provider.business_name} | HomeBase`);
    setNameMeta("twitter:description", desc);
  }, [provider]);

  const handleBook = () => {
    if (!provider) return;
    const params = new URLSearchParams({
      providerId: provider.id,
      providerName: provider.business_name,
      category: provider.category || provider.capability_tags?.[0] || "",
    });
    navigate(`/ai-booking?${params.toString()}`);
  };

  const getShareUrl = (slug: string) => {
    return `https://homebaseproapp.com/providers/${slug}`;
  };

  const handleCopyLink = async () => {
    if (!bookingLink) return;
    const url = getShareUrl(bookingLink.slug);
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Navbar = () => (
    <nav className="w-full border-b border-gray-800 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 flex items-center h-14">
        <button
          onClick={() => navigate("/marketplace")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Main</span>
        </button>
      </div>
    </nav>
  );

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
          <div className="h-32 rounded-2xl bg-gray-900 animate-pulse" />
          <div className="h-12 rounded-xl bg-gray-900 animate-pulse" />
          <div className="h-48 rounded-2xl bg-gray-900 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Provider not found</h2>
          <p className="text-gray-400">This provider may not be available.</p>
          <Link to="/marketplace" className="text-green-400 hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Browse all providers
          </Link>
        </div>
      </div>
    );
  }

  const displayCategory = provider.category || provider.capability_tags?.[0] || "";
  const yearsExp = provider.years_experience || 5;
  const jobsDone = provider.review_count ? provider.review_count * 3 : 342;
  const milesAway = 2.3;

  const tabs: { key: Tab; label: string }[] = [
    { key: "about", label: "About" },
    { key: "services", label: "Services" },
    { key: "reviews", label: "Reviews" },
  ];

  return (
    <div className="min-h-screen pb-36" style={{ background: "#0a0a0a" }}>
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Hero card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative">
          {/* Favorite button */}
          <button className="absolute top-5 right-5 text-gray-600 hover:text-gray-400 transition-colors">
            <Heart className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-4">
            {provider.avatar_url ? (
              <img src={provider.avatar_url} alt={provider.business_name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover" />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                <span className="text-3xl font-bold text-white">{provider.business_name.charAt(0)}{provider.business_name.split(" ")[1]?.charAt(0) || ""}</span>
              </div>
            )}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white">{bookingLink?.custom_title || provider.business_name}</h1>
              {displayCategory && (
                <p className="text-sm text-gray-400">{provider.business_name}'s {displayCategory} Pro</p>
              )}
              <div className="flex items-center gap-2">
                <RatingStars rating={provider.average_rating || 0} />
                <span className="text-sm text-green-400 font-medium">
                  {Number(provider.average_rating || 0).toFixed(1)} ({provider.review_count || 0})
                </span>
              </div>
            </div>
          </div>

          {provider.is_verified && (
            <div className="mt-4">
              <span className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full border border-green-500/30 text-green-400 bg-green-500/5">
                Verified Pro
              </span>
            </div>
          )}
        </div>

        {/* Share booking link section */}
        {bookingLink && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Share2 className="h-5 w-5 text-green-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-500 mb-0.5">Share booking link</p>
                <p className="text-sm text-gray-300 truncate">{provider.business_name} booking link</p>
              </div>
            </div>
            <button
              onClick={handleCopyLink}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-300 hover:text-white hover:border-gray-600 transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 text-center py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.key ? "text-green-400" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "about" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-2">About</h2>
              <p className="text-gray-400 leading-relaxed">{provider.description}</p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center">
                <Briefcase className="h-5 w-5 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{yearsExp}</p>
                <p className="text-xs text-gray-500">Years Exp.</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center">
                <CheckCircle2 className="h-5 w-5 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{jobsDone}</p>
                <p className="text-xs text-gray-500">Jobs Done</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center">
                <Clock className="h-5 w-5 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{milesAway}</p>
                <p className="text-xs text-gray-500">Miles Away</p>
              </div>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-2 text-gray-400">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">Usually responds in 1 hour</span>
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Services Offered</h2>
            {provider.capability_tags && provider.capability_tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {provider.capability_tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm font-medium px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No services listed yet.</p>
            )}
            {provider.price_range && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mt-4">
                <p className="text-sm text-gray-400 mb-1">Pricing</p>
                <p className="text-2xl font-bold text-green-400">{provider.price_range}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="text-center py-12">
            <Star className="h-10 w-10 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No reviews yet</p>
          </div>
        )}
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-gray-800 p-4 z-50">
        <div className="max-w-3xl mx-auto flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gray-800 border border-gray-700 text-white font-medium hover:bg-gray-700 transition-colors">
            <Phone className="h-4 w-4 text-green-400" />
            Call
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gray-800 border border-gray-700 text-white font-medium hover:bg-gray-700 transition-colors">
            <MessageCircle className="h-4 w-4 text-green-400" />
            Text
          </button>
          <button
            onClick={handleBook}
            className="flex-[2] py-3.5 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors text-base"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfilePage;
