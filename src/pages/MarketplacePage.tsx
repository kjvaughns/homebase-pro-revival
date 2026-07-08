import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search, Sparkles, SlidersHorizontal, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import Seo from "@/components/Seo";
import { CategoryCard } from "@/components/marketplace/CategoryCard";
import { ProviderCard } from "@/components/marketplace/ProviderCard";
import { SkeletonCard } from "@/components/marketplace/SkeletonCard";
import {
  CATEGORIES,
  ProviderRow,
  categoryById,
  fetchProviders,
  matchesCategory,
} from "@/lib/marketplace";

const RATING_FILTERS = [
  { label: "Any", value: 0 },
  { label: "4+", value: 4 },
  { label: "4.5+", value: 4.5 },
  { label: "4.8+", value: 4.8 },
];

const MarketplacePage = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get("category");

  const [providers, setProviders] = useState<ProviderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchProviders().then(({ providers }) => {
      setProviders(providers);
      setLoading(false);
    });
  }, []);

  function selectCategory(id: string | null) {
    const nextParams = new URLSearchParams(params);
    if (id) nextParams.set("category", id);
    else nextParams.delete("category");
    setParams(nextParams, { replace: true });
  }

  const filtered = useMemo(() => {
    let result = providers;
    const cat = categoryById(activeCategory);
    if (cat) result = result.filter((p) => matchesCategory(p, cat));
    if (verifiedOnly) result = result.filter((p) => !!p.is_verified);
    if (minRating > 0)
      result = result.filter(
        (p) => (p.average_rating ?? p.rating ?? 0) >= minRating
      );
    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.business_name?.toLowerCase().includes(s) ||
          p.description?.toLowerCase().includes(s) ||
          p.capability_tags?.some((t) => t.toLowerCase().includes(s))
      );
    }
    return result;
  }, [providers, activeCategory, verifiedOnly, minRating, search]);

  function resetFilters() {
    setMinRating(0);
    setVerifiedOnly(false);
    setSearch("");
    selectCategory(null);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Find a Pro — HomeBase Marketplace"
        description="Browse verified home service professionals on HomeBase — plumbers, electricians, HVAC techs, cleaners, and more. Book instantly."
        path="/marketplace"
      />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="HomeBase" className="h-8 w-8" />
            <span className="text-lg font-bold text-foreground">HomeBase</span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <Link to="/marketplace" className="text-sm font-medium text-primary">Find a Pro</Link>
            <Link to="/ai-booking" className="text-sm text-muted-foreground transition-colors hover:text-foreground">AI Booking</Link>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Link to="/login" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Sign In</Link>
            <Link to="/signup" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Sign Up</Link>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-foreground md:hidden" aria-label="Toggle menu">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="space-y-3 border-t border-border bg-background px-4 py-4 md:hidden">
            <Link to="/marketplace" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium text-primary">Find a Pro</Link>
            <Link to="/ai-booking" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-muted-foreground">AI Booking</Link>
            <Link to="/login" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-muted-foreground">Sign In</Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)} className="mt-2 block rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground">Sign Up</Link>
          </div>
        )}
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-8 space-y-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Find a <span className="text-primary">Pro</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Browse verified home service professionals
          </p>
        </div>

        {/* Search + filter toggle */}
        <div className="mx-auto mb-6 flex max-w-xl gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, skill, or service..."
              className="h-12 w-full rounded-xl border border-border bg-card pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
          <button
            onClick={() => setShowFilters((s) => !s)}
            className={
              "flex h-12 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition-colors " +
              (showFilters || minRating > 0 || verifiedOnly
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:border-primary/40")
            }
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Filters drawer */}
        {showFilters && (
          <div className="mx-auto mb-6 max-w-xl space-y-4 rounded-2xl border border-border bg-card p-5">
            <div>
              <p className="mb-2 text-sm font-medium text-foreground">Minimum rating</p>
              <div className="flex gap-2">
                {RATING_FILTERS.map((r) => (
                  <button
                    key={r.label}
                    onClick={() => setMinRating(r.value)}
                    className={
                      "flex-1 rounded-lg border py-2 text-sm font-medium transition-all " +
                      (minRating === r.value
                        ? "border-primary bg-primary/12 text-primary"
                        : "border-border bg-secondary text-muted-foreground hover:border-primary/40")
                    }
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Verified pros only</span>
              <button
                onClick={() => setVerifiedOnly((v) => !v)}
                aria-pressed={verifiedOnly}
                className={
                  "relative h-7 w-12 rounded-full transition-colors " +
                  (verifiedOnly ? "bg-primary" : "bg-secondary")
                }
              >
                <span
                  className="absolute top-1 h-5 w-5 rounded-full bg-white transition-all"
                  style={{ left: verifiedOnly ? 24 : 4 }}
                />
              </button>
            </div>
            <button onClick={resetFilters} className="text-sm font-medium text-primary hover:underline">
              Reset filters
            </button>
          </div>
        )}

        {/* Category grid */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Categories
            </h2>
            {activeCategory && (
              <button onClick={() => selectCategory(null)} className="text-sm font-medium text-primary">
                Clear
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <CategoryCard
                key={c.id}
                category={c}
                active={activeCategory === c.id}
                onClick={() => selectCategory(activeCategory === c.id ? null : c.id)}
              />
            ))}
          </div>
        </div>

        {/* AI match CTA */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => navigate("/ai-booking")}
            className="flex items-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
          >
            <Sparkles className="h-4 w-4" />
            Not sure which pro? Let AI match you →
          </button>
        </div>

        {/* Provider grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="space-y-3 py-16 text-center">
            <p className="text-lg font-semibold">No providers found</p>
            <p className="text-sm text-muted-foreground">
              {categoryById(activeCategory)
                ? `No ${categoryById(activeCategory)!.name} pros match your filters.`
                : "Try a different search or filters."}
            </p>
            <button onClick={resetFilters} className="text-sm font-medium text-primary hover:underline">
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProviderCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;
