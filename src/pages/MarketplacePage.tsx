import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import MarketplaceNavbar from "@/components/marketplace/MarketplaceNavbar";
import MarketplaceHero from "@/components/marketplace/MarketplaceHero";
import CategoryIcons from "@/components/marketplace/CategoryIcons";
import ProviderCard from "@/components/marketplace/ProviderCard";
import EmptyState from "@/components/marketplace/EmptyState";
import AppDownloadCTA from "@/components/marketplace/AppDownloadCTA";
import Footer from "@/components/landing/Footer";

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
}

const MarketplacePage = () => {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<string | null>(null);

    // SEO: set page title and meta description
    useEffect(() => {
          document.title = "Find Home Service Pros Near You | HomeBase Pro";
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) {
                  metaDesc.setAttribute(
                            "content",
                            "Browse and instantly book trusted home service professionals near you — plumbers, cleaners, landscapers, and more. Powered by HomeBase Pro."
                          );
          }
    }, []);

    useEffect(() => {
          const fetchProviders = async () => {
                  setLoading(true);
                  const { data, error } = await supabase
                    .from("providers")
                    .select(
                                "id, business_name, description, service_area, average_rating, review_count, avatar_url, capability_tags, slug, hourly_rate"
                              )
                    .eq("is_public", true)
                    .eq("is_active", true)
                    .order("review_count", { ascending: false });

                  if (!error && data) {
                            setProviders(data as Provider[]);
                  }
                  setLoading(false);
          };
          fetchProviders();
    }, []);

    const filtered = useMemo(() => {
          let result = providers;
          if (search.trim()) {
                  const s = search.toLowerCase();
                  result = result.filter(
                            (p) =>
                                        p.business_name?.toLowerCase().includes(s) ||
                                        p.description?.toLowerCase().includes(s) ||
                                        p.service_area?.toLowerCase().includes(s) ||
                                        p.capability_tags?.some((t) => t.toLowerCase().includes(s))
                          );
          }
          if (category) {
                  result = result.filter((p) =>
                            p.capability_tags?.some(
                                        (t) => t.toLowerCase() === category.toLowerCase()
                                      )
                                               );
          }
          return result;
    }, [providers, search, category]);

    return (
          <div className="min-h-screen bg-background text-foreground">
                <MarketplaceNavbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <MarketplaceHero
                                    searchValue={search}
                                    onSearchChange={setSearch}
                                    providerCount={providers.length}
                                  />
                        <div className="mb-8">
                                  <CategoryIcons selected={category} onSelect={setCategory} />
                        </div>div>
                        <div>
                          {loading ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {Array.from({ length: 6 }).map((_, i) => (
                                          <div
                                                              key={i}
                                                              className="h-48 rounded-2xl bg-white/5 border border-white/10 animate-pulse"
                                                            />
                                        ))}
                        </div>div>
                      ) : filtered.length === 0 ? (
                        <EmptyState searchTerm={search} category={category} />
                      ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {filtered.map((p) => (
                                          <ProviderCard
                                                              key={p.id}
                                                              id={p.id}
                                                              businessName={p.business_name}
                                                              description={p.description}
                                                              serviceArea={p.service_area}
                                                              averageRating={p.average_rating}
                                                              reviewCount={p.review_count}
                                                              avatarUrl={p.avatar_url}
                                                              capabilityTags={p.capability_tags}
                                                              hourlyRate={p.hourly_rate}
                                                              slug={p.slug}
                                                            />
                                        ))}
                        </div>div>
                                  )}
                        </div>div>
                        <div>
                                  <div className="mt-12 max-w-md mx-auto">
                                              <AppDownloadCTA
                                                              variant="card"
                                                              message="Download the app to book instantly"
                                                            />
                                  </div>div>
                        </div>div>
                        <div className="mt-16">
                                  <Footer />
                        </div>div>
                </div>div>
                <AppDownloadCTA variant="sticky" />
                <div className="h-16 lg:hidden" />
          </div>div>
        );
};

export default MarketplacePage;</div>
