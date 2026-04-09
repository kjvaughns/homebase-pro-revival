import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BookingProvider {
  id: string;
  business_name: string;
  description: string | null;
  avatar_url: string | null;
  rating: number | null;
  review_count: number | null;
  hourly_rate: number | null;
  is_verified: boolean | null;
  service_area: string | null;
}

interface BookingLinkData {
  id: string;
  slug: string;
  custom_title: string | null;
  is_active: boolean | null;
  providers: BookingProvider;
}

export default function BookingPage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [bookingLink, setBookingLink] = useState<BookingLinkData | null>(null);
  const [provider, setProvider] = useState<BookingProvider | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    service_name: "",
    description: "",
    scheduled_date: "",
    scheduled_time: "Morning",
    notes: "",
  });

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("booking_links")
        .select(
          "id, slug, custom_title, is_active, providers(id, business_name, description, avatar_url, rating, review_count, hourly_rate, is_verified, service_area)"
        )
        .eq("slug", slug!)
        .eq("is_active", true)
        .single();
      if (!error && data) {
        const typed = data as unknown as BookingLinkData;
        setBookingLink(typed);
        setProvider(typed.providers);
        document.title =
          (typed.custom_title || typed.providers?.business_name || "Book") +
          " — Book on HomeBase";
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!provider) return;
    await supabase.from("appointments").insert([
      {
        provider_id: provider.id,
        service_name: form.service_name,
        description: form.description,
        scheduled_date: form.scheduled_date,
        scheduled_time: form.scheduled_time,
        status: "pending",
        notes: form.notes,
      },
    ]);
    setSubmitted(true);
  }

  if (loading)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md px-6">
          <div className="h-20 rounded-xl bg-card animate-pulse" />
          <div className="h-10 rounded-xl bg-card animate-pulse" />
          <div className="h-64 rounded-xl bg-card animate-pulse" />
        </div>
      </div>
    );

  if (!bookingLink || !provider)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-foreground text-lg">
          This booking link is not available
        </p>
        <Link
          to="/marketplace"
          className="text-primary hover:underline text-sm"
        >
          Browse providers on the marketplace
        </Link>
      </div>
    );

  if (submitted)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-5xl">✅</p>
        <p className="text-foreground text-xl font-semibold">
          Booking request sent!
        </p>
        <p className="text-muted-foreground text-sm">
          {provider.business_name} will confirm your appointment soon.
        </p>
      </div>
    );

  const initials = provider.business_name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border px-6 py-4">
        <Link to="/" className="text-primary font-bold text-lg">
          HomeBase
        </Link>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-6 py-8">
        <div className="flex items-center gap-4 mb-6">
          {provider.avatar_url ? (
            <img
              src={provider.avatar_url}
              alt={provider.business_name}
              className="w-16 h-16 rounded-xl object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">{initials}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-foreground text-lg truncate">
                {provider.business_name}
              </p>
              {provider.is_verified && (
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                  ✓ Verified
                </span>
              )}
            </div>
            {provider.rating && (
              <p className="text-sm text-muted-foreground">
                ⭐ {provider.rating} ({provider.review_count} reviews)
              </p>
            )}
            {provider.hourly_rate && (
              <p className="text-sm text-muted-foreground">
                ${provider.hourly_rate}/hr
              </p>
            )}
            {provider.service_area && (
              <p className="text-sm text-muted-foreground">
                📍 {provider.service_area}
              </p>
            )}
          </div>
        </div>

        <h1 className="text-xl font-bold text-foreground mb-6">
          {bookingLink.custom_title || "Book " + provider.business_name}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            type="text"
            placeholder="Full Name"
            className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground"
            value={form.full_name}
            onChange={(e) =>
              setForm((f) => ({ ...f, full_name: e.target.value }))
            }
          />
          <input
            required
            type="email"
            placeholder="Email"
            className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <input
            type="tel"
            placeholder="Phone"
            className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
          <input
            required
            type="text"
            placeholder="Service Needed"
            className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground"
            value={form.service_name}
            onChange={(e) =>
              setForm((f) => ({ ...f, service_name: e.target.value }))
            }
          />
          <textarea
            required
            placeholder="Describe your issue"
            rows={3}
            className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground resize-none"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
          />
          <input
            required
            type="date"
            className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-foreground"
            value={form.scheduled_date}
            onChange={(e) =>
              setForm((f) => ({ ...f, scheduled_date: e.target.value }))
            }
          />
          <select
            required
            className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-foreground"
            value={form.scheduled_time}
            onChange={(e) =>
              setForm((f) => ({ ...f, scheduled_time: e.target.value }))
            }
          >
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
          <textarea
            placeholder="Additional notes (optional)"
            rows={2}
            className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground resize-none"
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          />
          <button
            type="submit"
            className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Request Booking
          </button>
        </form>
      </main>

      <footer className="border-t border-border px-6 py-4 text-center text-sm text-muted-foreground">
        Powered by{" "}
        <a
          href="https://homebaseproapp.com"
          className="text-[#22c55e] hover:underline"
        >
          HomeBase
        </a>
      </footer>
    </div>
  );
}
