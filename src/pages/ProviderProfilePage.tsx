import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Star, ArrowLeft, Heart, Phone, MessageCircle,
  Briefcase, CheckCircle2, MapPin, Clock, Copy, Check, Share2, Mail
} from "lucide-react";

/* ─── types ─── */
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
  years_experience?: number | null;
  phone?: string | null;
  email?: string | null;
  business_hours?: Record<string, { enabled: boolean; open: string; close: string }> | null;
  service_cities?: string[] | null;
  service_zip_codes?: string[] | null;
}

interface BookingLink {
  provider_id: string;
  slug: string;
  is_active: boolean | null;
  instant_booking: boolean | null;
  show_pricing: boolean | null;
  custom_title: string | null;
}

interface CustomService {
  id: string;
  name: string;
  category: string;
  description: string | null;
  pricing_type: string;
  base_price: number | null;
  price_from: number | null;
  price_to: number | null;
  duration: number | null;
}

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

/* ─── small components ─── */
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

const DAY_ORDER = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const DAY_LABELS: Record<string, string> = {
  monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday",
  thursday: "Thursday", friday: "Friday", saturday: "Saturday", sunday: "Sunday",
};

/* ─── main page ─── */
const ProviderProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [provider, setProvider] = useState<Provider | null>(null);
  const [bookingLink, setBookingLink] = useState<BookingLink | null>(null);
  const [services, setServices] = useState<CustomService[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [copied, setCopied] = useState(false);

  /* fetch provider + booking link */
  useEffect(() => {
    if (!id) return;

    const fetchProvider = async () => {
      setLoading(true);
      let providerId: string | null = null;

      // Try booking_links slug first
      const { data: blData } = await supabase
        .from("booking_links")
        .select("provider_id, slug, is_active, instant_booking, show_pricing, custom_title")
        .eq("slug", id)
        .eq("is_active", true)
        .maybeSingle();

      if (blData) {
        setBookingLink(blData as BookingLink);
        providerId = blData.provider_id;
      }

      // Fetch provider
      if (providerId) {
        const { data: provData } = await supabase
          .from("providers")
          .select("*")
          .eq("id", providerId)
          .single();
        if (provData) setProvider(provData as unknown as Provider);
      } else {
        const { data: provData } = await supabase
          .from("providers")
          .select("*")
          .eq("id", id)
          .eq("is_public", true)
          .maybeSingle();
        if (provData) {
          setProvider(provData as unknown as Provider);
          providerId = provData.id;
        }
      }

      setLoading(false);
    };

    fetchProvider();
  }, [id]);

  /* fetch services + reviews once provider loads */
  useEffect(() => {
    if (!provider) return;

    const fetchExtra = async () => {
      const [svcRes, revRes] = await Promise.all([
        supabase
          .from("provider_custom_services")
          .select("id, name, category, description, pricing_type, base_price, price_from, price_to, duration")
          .eq("provider_id", provider.id)
          .eq("is_published", true),
        supabase
          .from("reviews")
          .select("id, rating, comment, created_at")
          .eq("provider_id", provider.id)
          .order("created_at", { ascending: false })
          .limit(50),
      ]);

      if (svcRes.data) setServices(svcRes.data as CustomService[]);
      if (revRes.data) setReviews(revRes.data as Review[]);
    };

    fetchExtra();
  }, [provider]);

  /* OG meta tags */
  useEffect(() => {
    if (!provider) return;
    document.title = `${provider.business_name} | HomeBase`;

    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", property); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    const setNameMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    const desc = provider.description ? provider.description.slice(0, 160) : `Book ${provider.business_name} on HomeBase`;
    setMeta("og:title", `${provider.business_name} | HomeBase`);
    setMeta("og:description", desc);
    setMeta("og:image", provider.avatar_url || "/placeholder.svg");
    setMeta("og:url", window.location.href);
    setNameMeta("description", desc);
    setNameMeta("twitter:title", `${provider.business_name} | HomeBase`);
    setNameMeta("twitter:description", desc);
  }, [provider]);

  /* handlers */
  const handleBook = () => {
    if (!provider) return;
    navigate(`/book/appointment/${provider.id}`);
  };

  const getShareUrl = (slug: string) => `https://homebaseproapp.com/providers/${slug}`;

  const handleCopyLink = async () => {
    if (!bookingLink) return;
    await navigator.clipboard.writeText(getShareUrl(bookingLink.slug));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* nav */
  const Navbar = () => (
    <nav className="w-full border-b border-neutral-800 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 flex items-center h-14">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );

  /* loading */
  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
          <div className="h-32 rounded-2xl bg-neutral-900 animate-pulse" />
          <div className="h-12 rounded-xl bg-neutral-900 animate-pulse" />
          <div className="h-48 rounded-2xl bg-neutral-900 animate-pulse" />
        </div>
      </div>
    );
  }

  /* not found */
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

  const yearsExp = provider.years_experience || 0;
  const jobsDone = provider.review_count || 0;
  const businessHours = provider.business_hours as Record<string, { enabled: boolean; open: string; close: string }> | null;

  const tabs: { key: Tab; label: string }[] = [
    { key: "about", label: "About" },
    { key: "services", label: "Services" },
    { key: "reviews", label: "Reviews" },
  ];

  const formatPrice = (svc: CustomService) => {
    if (svc.pricing_type === "fixed" && svc.base_price != null) return `$${svc.base_price}`;
    if (svc.pricing_type === "range" && svc.price_from != null && svc.price_to != null) return `$${svc.price_from}–$${svc.price_to}`;
    if (svc.pricing_type === "hourly" && svc.base_price != null) return `$${svc.base_price}/hr`;
    return "Quote";
  };

  return (
    <div className="min-h-screen pb-36" style={{ background: "#0a0a0a" }}>
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* ─── Hero Card ─── */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative">
          <div className="flex items-center gap-4">
            {provider.avatar_url ? (
              <img src={provider.avatar_url} alt={provider.business_name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-neutral-800" />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-neutral-800 border-2 border-neutral-700 flex items-center justify-center shrink-0">
                <Briefcase className="h-8 w-8 text-green-400" />
              </div>
            )}
            <div className="space-y-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-white truncate">
                {bookingLink?.custom_title || provider.business_name}
              </h1>
              {provider.service_area && (
                <p className="text-sm text-gray-400 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 shrink-0" /> {provider.service_area}
                </p>
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

        {/* ─── Tabs ─── */}
        <div className="flex border-b border-neutral-800">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 text-center py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.key ? "text-green-400" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500" />}
            </button>
          ))}
        </div>

        {/* ─── About Tab ─── */}
        {activeTab === "about" && (
          <div className="space-y-6">
            {provider.description && (
              <div>
                <h2 className="text-lg font-bold text-white mb-2">About</h2>
                <p className="text-gray-400 leading-relaxed">{provider.description}</p>
              </div>
            )}

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-center">
                <Briefcase className="h-5 w-5 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{yearsExp}</p>
                <p className="text-xs text-gray-500">Years Exp.</p>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-center">
                <CheckCircle2 className="h-5 w-5 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{jobsDone}</p>
                <p className="text-xs text-gray-500">Jobs Done</p>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-center">
                <MapPin className="h-5 w-5 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">N/A</p>
                <p className="text-xs text-gray-500">Miles Away</p>
              </div>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-2 text-gray-400">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">Usually responds in &lt; 1 hour</span>
            </div>
          </div>
        )}

        {/* ─── Services Tab ─── */}
        {activeTab === "services" && (
          <div className="space-y-4">
            {services.length > 0 ? (
              services.map((svc) => (
                <div key={svc.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-white font-medium">{svc.name}</p>
                    {svc.description && <p className="text-gray-500 text-sm mt-0.5 line-clamp-2">{svc.description}</p>}
                    {svc.duration && <p className="text-gray-600 text-xs mt-1">{svc.duration} min</p>}
                  </div>
                  <span className="text-green-400 font-semibold text-sm whitespace-nowrap">{formatPrice(svc)}</span>
                </div>
              ))
            ) : provider.capability_tags && provider.capability_tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {provider.capability_tags.map((tag) => (
                  <span key={tag} className="text-sm font-medium px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-8">No services listed yet.</p>
            )}
          </div>
        )}

        {/* ─── Reviews Tab ─── */}
        {activeTab === "reviews" && (
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <div key={rev.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <RatingStars rating={rev.rating} />
                    <span className="text-xs text-gray-600">{new Date(rev.created_at).toLocaleDateString()}</span>
                  </div>
                  {rev.comment && <p className="text-gray-400 text-sm">{rev.comment}</p>}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Star className="h-10 w-10 text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No reviews yet</p>
              </div>
            )}
          </div>
        )}

        {/* ─── Business Hours (always visible below tabs) ─── */}
        {businessHours && Object.keys(businessHours).length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">Business Hours</h2>
            <div className="space-y-0">
              {DAY_ORDER.map((day) => {
                const info = businessHours[day];
                const isOpen = info?.enabled;
                return (
                  <div
                    key={day}
                    className={`flex items-center justify-between py-2.5 border-b border-neutral-800/50 ${
                      !isOpen ? "opacity-40" : ""
                    }`}
                  >
                    <span className={`text-sm font-medium ${isOpen ? "text-white" : "text-gray-500"}`}>
                      {DAY_LABELS[day]}
                    </span>
                    <span className={`text-sm ${isOpen ? "text-gray-300" : "text-gray-600"}`}>
                      {isOpen && info ? `${info.open} — ${info.close}` : "Closed"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── Service Area ─── */}
        {((provider.service_cities && provider.service_cities.length > 0) ||
          (provider.service_zip_codes && provider.service_zip_codes.length > 0)) && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">Service Area</h2>
            <div className="flex flex-wrap gap-2">
              {provider.service_cities?.map((city) => (
                <span key={city} className="text-sm px-3 py-1.5 rounded-lg border border-neutral-700 text-gray-300 bg-neutral-900">
                  {city}
                </span>
              ))}
              {provider.service_zip_codes?.map((zip) => (
                <span key={zip} className="text-sm px-3 py-1.5 rounded-lg border border-neutral-700 text-gray-300 bg-neutral-900">
                  {zip}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ─── Contact ─── */}
        {(provider.phone || provider.email) && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">Contact</h2>
            {provider.phone && (
              <a href={`tel:${provider.phone}`} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-sm">{provider.phone}</span>
              </a>
            )}
            {provider.email && (
              <a href={`mailto:${provider.email}`} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-sm">{provider.email}</span>
              </a>
            )}
          </div>
        )}

        {/* ─── Booking Link ─── */}
        {bookingLink && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">Booking Link</h2>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <Share2 className="h-4 w-4 text-green-400 shrink-0" />
                <p className="text-sm text-gray-300 truncate">{getShareUrl(bookingLink.slug)}</p>
              </div>
              <button
                onClick={handleCopyLink}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-sm text-gray-300 hover:text-white hover:border-gray-600 transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ─── Sticky Bottom Bar ─── */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-neutral-800 p-4 z-50">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex gap-3">
            <a
              href={provider.phone ? `tel:${provider.phone}` : "#"}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white font-medium hover:bg-neutral-700 transition-colors"
            >
              <Phone className="h-4 w-4 text-green-400" />
              Call
            </a>
            <a
              href={provider.phone ? `sms:${provider.phone}` : "#"}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white font-medium hover:bg-neutral-700 transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-green-400" />
              Text
            </a>
          </div>
          <button
            onClick={handleBook}
            className="w-full py-3.5 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors text-base"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfilePage;
