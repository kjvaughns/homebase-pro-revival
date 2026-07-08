import { supabase } from "@/integrations/supabase/client";

// ── Categories ─────────────────────────────────────────────────────────────
// The site has no categories table, so we use a fixed catalog and match
// providers by capability_tags. id doubles as the ?category= URL value.
export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export const CATEGORIES: Category[] = [
  { id: "plumbing", name: "Plumbing", emoji: "🔧" },
  { id: "electrical", name: "Electrical", emoji: "⚡" },
  { id: "hvac", name: "HVAC", emoji: "❄️" },
  { id: "landscaping", name: "Landscaping", emoji: "🌿" },
  { id: "cleaning", name: "Cleaning", emoji: "🧹" },
  { id: "painting", name: "Painting", emoji: "🎨" },
  { id: "carpentry", name: "Carpentry", emoji: "🪚" },
  { id: "roofing", name: "Roofing", emoji: "🏠" },
  { id: "windows", name: "Windows", emoji: "🪟" },
  { id: "pest-control", name: "Pest Control", emoji: "🐛" },
  { id: "pool-service", name: "Pool Service", emoji: "🏊" },
  { id: "handyman", name: "Handyman", emoji: "🔨" },
];

export function categoryById(id: string | null): Category | undefined {
  if (!id) return undefined;
  return CATEGORIES.find((c) => c.id === id);
}

// ── Provider (marketplace card) ──────────────────────────────────────────────
export interface ProviderRow {
  id: string;
  business_name: string;
  description?: string | null;
  service_area?: string | null;
  average_rating?: number | null;
  rating?: number | null;
  review_count?: number | null;
  avatar_url?: string | null;
  capability_tags?: string[] | null;
  hourly_rate?: number | null;
  is_verified?: boolean | null;
  years_experience?: number | null;
  slug?: string | null;
  booking_links?:
    | { slug: string; is_active: boolean | null }[]
    | { slug: string; is_active: boolean | null }
    | null;
}

// Resolve a provider's active booking-link slug (for "Book Now" / /book/:slug).
export function activeSlug(p: ProviderRow): string | undefined {
  const bls = p.booking_links;
  if (Array.isArray(bls)) return bls.find((b) => b.is_active)?.slug ?? undefined;
  if (bls && bls.is_active) return bls.slug;
  return p.slug ?? undefined;
}

const MOCK_PROVIDERS: ProviderRow[] = [
  { id: "mock-1", business_name: "Marcus Johnson", description: "Licensed master plumber, 12 years experience. Same-day service available.", average_rating: 4.9, review_count: 127, hourly_rate: 65, is_verified: true, capability_tags: ["Plumbing"], service_area: "Austin, TX" },
  { id: "mock-2", business_name: "Sarah Chen", description: "Certified electrician specializing in residential rewiring and panel upgrades.", average_rating: 4.7, review_count: 89, hourly_rate: 75, is_verified: true, capability_tags: ["Electrical"], service_area: "Austin, TX" },
  { id: "mock-3", business_name: "Mike Torres", description: "HVAC technician. AC installs, repairs, and seasonal maintenance.", average_rating: 4.8, review_count: 203, hourly_rate: 80, is_verified: true, capability_tags: ["HVAC"], service_area: "Round Rock, TX" },
  { id: "mock-4", business_name: "Priya Patel", description: "Deep cleaning and recurring home maintenance. Eco-friendly products.", average_rating: 4.6, review_count: 156, hourly_rate: 45, is_verified: false, capability_tags: ["Cleaning"], service_area: "Austin, TX" },
];

export async function fetchProviders(): Promise<{
  providers: ProviderRow[];
  usedMock: boolean;
}> {
  const { data, error } = await supabase
    .from("providers")
    .select("*, booking_links(slug, is_active)")
    .eq("is_active", true)
    .order("rating", { ascending: false });

  if (!error && data && data.length > 0) {
    return { providers: data as unknown as ProviderRow[], usedMock: false };
  }
  return { providers: MOCK_PROVIDERS, usedMock: true };
}

// True if a provider serves the given category (matched against capability_tags).
export function matchesCategory(p: ProviderRow, cat: Category): boolean {
  const needle = cat.name.toLowerCase();
  return (p.capability_tags ?? []).some((t) => t.toLowerCase().includes(needle));
}

// ── Booking link (/book/:slug) ───────────────────────────────────────────────
export interface CatalogService {
  id: string;
  name: string;
  description?: string;
  priceCents?: number;
  priceType?: string;
}

export interface IntakeQuestion {
  id: string;
  type: "text" | "textarea" | "select" | "multiselect" | "boolean";
  question: string;
  required: boolean;
  options?: string[];
}

export interface BookingLinkData {
  id: string;
  slug: string;
  providerId: string;
  customTitle?: string | null;
  welcomeMessage?: string | null;
  instantBooking: boolean;
  serviceCatalog: CatalogService[];
  intakeQuestions: IntakeQuestion[];
  provider: {
    id: string;
    business_name: string;
    avatar_url?: string | null;
    rating?: number | null;
    average_rating?: number | null;
    review_count?: number | null;
    capability_tags?: string[] | null;
  } | null;
}

// booking_links stores service_catalog / intake_questions as JSON strings.
function parseJson<T>(raw: unknown, fallback: T): T {
  if (!raw) return fallback;
  if (typeof raw === "object") return raw as T;
  try {
    return JSON.parse(String(raw)) as T;
  } catch {
    return fallback;
  }
}

export async function fetchBookingLink(
  slug: string
): Promise<BookingLinkData | null> {
  const { data: bl, error } = await supabase
    .from("booking_links")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !bl) return null;

  const { data: prov } = await supabase
    .from("providers")
    .select("id, business_name, avatar_url, rating, average_rating, review_count, capability_tags")
    .eq("id", (bl as { provider_id: string }).provider_id)
    .maybeSingle();

  const b = bl as Record<string, unknown>;
  return {
    id: String(b.id),
    slug: String(b.slug),
    providerId: String(b.provider_id),
    customTitle: (b.custom_title as string) ?? null,
    welcomeMessage: (b.welcome_message as string) ?? null,
    instantBooking: !!b.instant_booking,
    serviceCatalog: parseJson<CatalogService[]>(b.service_catalog, []),
    intakeQuestions: parseJson<IntakeQuestion[]>(b.intake_questions, []),
    provider: (prov as BookingLinkData["provider"]) ?? null,
  };
}

// ── Submit a booking request ────────────────────────────────────────────────
export interface BookingSubmitInput {
  providerId: string;
  providerName: string;
  category?: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  address?: string;
  serviceSummary?: string;
  problemDescription: string;
  preferredDates: string[]; // ISO date strings
  preferredTimeLabel?: string;
  answers?: Record<string, unknown>;
}

// Mirrors the existing GuestBookingPage: insert into booking_requests, then
// fan out to the provider portal via the process-booking-request edge function.
export async function submitBooking(
  input: BookingSubmitInput
): Promise<{ ok: boolean }> {
  const notesParts: string[] = [];
  if (input.problemDescription) notesParts.push(input.problemDescription);
  if (input.answers && Object.keys(input.answers).length)
    notesParts.push(`\n\nAdditional details:\n${JSON.stringify(input.answers, null, 2)}`);
  if (input.preferredDates.length > 1)
    notesParts.push(`\n\nAlso available: ${input.preferredDates.slice(1).join(", ")}`);

  const { data: inserted, error } = await supabase
    .from("booking_requests")
    .insert({
      provider_id: input.providerId || null,
      provider_name: input.providerName || null,
      provider_category: input.category || null,
      customer_name: input.clientName.trim(),
      customer_email: input.clientEmail.trim(),
      customer_phone: (input.clientPhone ?? "").trim(),
      customer_address: (input.address ?? "").trim(),
      service_summary: (input.serviceSummary ?? "").trim(),
      preferred_date: input.preferredDates[0] ?? null,
      preferred_time: input.preferredTimeLabel ?? null,
      notes: notesParts.join("").trim() || null,
      status: "pending",
    })
    .select("id")
    .single();

  if (error || !inserted) return { ok: false };

  try {
    await supabase.functions.invoke("process-booking-request", {
      body: { bookingRequestId: inserted.id },
    });
  } catch {
    /* non-blocking */
  }
  return { ok: true };
}
