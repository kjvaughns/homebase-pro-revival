import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import MarketplaceNavbar from "@/components/marketplace/MarketplaceNavbar";
import AppDownloadCTA from "@/components/marketplace/AppDownloadCTA";
import Footer from "@/components/landing/Footer";
import { Star, MapPin, Clock, Globe, ArrowLeft, DollarSign, Shield } from "lucide-react";

interface Provider {
  id: string;
  business_name: string;
  description: string | null;
  service_area: string | null;
  average_rating: number | null;
  review_count: number | null;
  avatar_url: string | null;
  capability_tags: string[] | null;
  slug: string | null;
  hourly_rate: number | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  years_experience: number | null;
  is_verified: boolean | null;
}

interface Service {
  id: string;
  name: string;
  category: string;
  description: string | null;
  base_price: number | null;
  pricing_type: string;
  duration: number | null;
}

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

const ProviderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      setLoading(true);
      const [provRes, svcRes, revRes] = await Promise.all([
        supabase
          .from("providers")
          .select("id, business_name, description, service_area, average_rating, review_count, avatar_url, capability_tags, slug, hourly_rate, phone, email, website, years_experience, is_verified")
          .eq("id", id)
          .eq("is_public", true)
          .single(),
        supabase
          .from("provider_custom_services")
          .select("id, name, category, description, base_price, pricing_type, duration")
          .eq("provider_id", id)
          .eq("is_published", true),
        supabase
          .from("reviews")
          .select("id, rating, comment, created_at")
          .eq("provider_id", id)
          .order("created_at", { ascending: false })
          .limit(10),
      ]);

      if (provRes.data) setProvider(provRes.data as Provider);
      if (svcRes.data) setServices(svcRes.data as Service[]);
      if (revRes.data) setReviews(revRes.data as Review[]);
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <MarketplaceNavbar />
        <div className="max-w-3xl mx-auto px-4 py-16 space-y-6">
          <div className="h-24 rounded-2xl bg-white/5 animate-pulse" />
          <div className="h-40 rounded-2xl bg-white/5 animate-pulse" />
          <div className="h-60 rounded-2xl bg-white/5 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <MarketplaceNavbar />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
          <h2 className="text-2xl font-bold">Provider not found</h2>
          <p className="text-muted-foreground">This provider may not be available publicly.</p>
          <Link to="/marketplace" className="text-primary hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const groupedServices = services.reduce<Record<string, Service[]>>((acc, svc) => {
    const cat = svc.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(svc);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MarketplaceNavbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Back */}
        <Link to="/marketplace" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> All Providers
        </Link>

        {/* Header */}
        <div className="flex items-start gap-5">
          {provider.avatar_url ? (
            <img src={provider.avatar_url} alt={provider.business_name} className="w-20 h-20 rounded-2xl object-cover" />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary">{provider.business_name.charAt(0)}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold truncate">{provider.business_name}</h1>
              {provider.is_verified && (
                <Shield className="h-5 w-5 text-primary flex-shrink-0" />
              )}
            </div>
            {provider.service_area && (
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-3.5 w-3.5" /> {provider.service_area}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {(provider.average_rating ?? 0) > 0 && (
                <span className="flex items-center gap-1 text-sm font-medium text-primary">
                  <Star className="h-4 w-4 fill-primary" />
                  {Number(provider.average_rating).toFixed(1)}
                  {(provider.review_count ?? 0) > 0 && (
                    <span className="text-muted-foreground font-normal">({provider.review_count} reviews)</span>
                  )}
                </span>
              )}
              {provider.years_experience && provider.years_experience > 0 && (
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {provider.years_experience} yrs experience
                </span>
              )}
              {provider.hourly_rate && (
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5" /> From ${Number(provider.hourly_rate).toFixed(0)}/hr
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tags */}
        {provider.capability_tags && provider.capability_tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {provider.capability_tags.map((tag) => (
              <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Book Now CTA */}
        <button
          onClick={() => setShowBookingModal(true)}
          className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-xl text-base hover:bg-primary/90 transition-colors"
        >
          Book Now
        </button>

        {/* About */}
        {provider.description && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">About</h2>
            <p className="text-muted-foreground leading-relaxed">{provider.description}</p>
          </div>
        )}

        {/* Contact */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
          <h2 className="text-lg font-semibold">Contact</h2>
          <div className="grid gap-2">
            {provider.phone && (
              <a href={`tel:${provider.phone}`} className="text-sm text-primary hover:underline">
                📞 {provider.phone}
              </a>
            )}
            {provider.email && (
              <a href={`mailto:${provider.email}`} className="text-sm text-primary hover:underline">
                ✉️ {provider.email}
              </a>
            )}
            {provider.website && (
              <a href={provider.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" /> Website
              </a>
            )}
          </div>
        </div>

        {/* Services */}
        {services.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Services</h2>
            {Object.entries(groupedServices).map(([cat, svcs]) => (
              <div key={cat} className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{cat}</h3>
                <div className="space-y-2">
                  {svcs.map((svc) => (
                    <div key={svc.id} className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{svc.name}</p>
                        {svc.description && <p className="text-xs text-muted-foreground mt-0.5">{svc.description}</p>}
                        {svc.duration && <p className="text-xs text-muted-foreground mt-0.5">{svc.duration} min</p>}
                      </div>
                      {svc.base_price != null && (
                        <span className="text-sm font-semibold text-primary whitespace-nowrap">
                          ${Number(svc.base_price).toFixed(0)}
                          {svc.pricing_type === "variable" && "+"}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Reviews</h2>
            <div className="space-y-3">
              {reviews.map((r) => (
                <div key={r.id} className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i < r.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-2">
                      {new Date(r.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {r.comment && <p className="text-sm text-muted-foreground">{r.comment}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* App CTA */}
        <AppDownloadCTA variant="card" message="Continue in the HomeBase app" />
      </div>

      <Footer />
      <AppDownloadCTA variant="sticky" />
      <div className="h-16 lg:hidden" />

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setShowBookingModal(false)}>
          <div className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full space-y-4 text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold">Book with {provider.business_name}</h3>
            <p className="text-sm text-muted-foreground">
              Download the HomeBase app to book instantly, manage your appointments, and pay securely.
            </p>
            <div className="flex items-center justify-center gap-2 bg-background border border-border rounded-xl px-4 py-2.5 cursor-pointer mx-auto w-fit">
              <svg className="h-5 w-5 text-foreground" viewBox="0 0 384 512" fill="currentColor">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] text-muted-foreground leading-tight">Coming Soon on the</p>
                <p className="text-sm font-semibold leading-tight">App Store</p>
              </div>
            </div>
            <button onClick={() => setShowBookingModal(false)} className="text-sm text-muted-foreground hover:text-foreground">
              Maybe later
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderDetailPage;
