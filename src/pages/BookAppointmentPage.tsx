import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Briefcase, Check, Repeat, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Provider {
  id: string;
  business_name: string;
  avatar_url: string | null;
  capability_tags: string[] | null;
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
  is_addon: boolean;
  intake_questions_json: string | null;
}

interface IntakeQuestion {
  id: string;
  question: string;
  type: "text" | "number" | "select" | "yes_no";
  options?: string[];
  required?: boolean;
}

const TIME_SLOTS = [
  "8 AM", "9 AM", "10 AM", "11 AM",
  "12 PM", "1 PM", "2 PM", "3 PM", "4 PM",
];

const formatPrice = (svc: CustomService): string => {
  if (svc.pricing_type === "fixed" && svc.base_price != null) return `$${svc.base_price}`;
  if (svc.pricing_type === "range" && svc.price_from != null && svc.price_to != null)
    return `$${svc.price_from}–$${svc.price_to}`;
  if (svc.pricing_type === "hourly" && svc.base_price != null) return `$${svc.base_price}/hr`;
  return "Quote";
};

const estimatedNumeric = (svc: CustomService | null): number | null => {
  if (!svc) return null;
  if (svc.base_price != null) return Number(svc.base_price);
  if (svc.price_from != null) return Number(svc.price_from);
  return null;
};

const BookAppointmentPage = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [services, setServices] = useState<CustomService[]>([]);

  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [recurring, setRecurring] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  /* fetch provider + services */
  useEffect(() => {
    if (!providerId) return;
    (async () => {
      setLoading(true);
      const [provRes, svcRes] = await Promise.all([
        supabase
          .from("providers")
          .select("id, business_name, avatar_url, capability_tags")
          .eq("id", providerId)
          .maybeSingle(),
        supabase
          .from("provider_custom_services")
          .select("id, name, category, description, pricing_type, base_price, price_from, price_to, duration, is_addon, intake_questions_json")
          .eq("provider_id", providerId)
          .eq("is_published", true),
      ]);
      if (provRes.data) setProvider(provRes.data as unknown as Provider);
      if (svcRes.data) setServices(svcRes.data as CustomService[]);
      setLoading(false);
    })();
  }, [providerId]);

  const primaryServices = useMemo(() => services.filter((s) => !s.is_addon), [services]);
  const addOnServices = useMemo(() => services.filter((s) => s.is_addon), [services]);

  const selectedService = useMemo(
    () => primaryServices.find((s) => s.id === selectedServiceId) || null,
    [primaryServices, selectedServiceId]
  );

  const intakeQuestions: IntakeQuestion[] = useMemo(() => {
    if (!selectedService?.intake_questions_json) return [];
    try {
      const parsed = JSON.parse(selectedService.intake_questions_json);
      if (Array.isArray(parsed)) return parsed as IntakeQuestion[];
      return [];
    } catch {
      return [];
    }
  }, [selectedService]);

  /* date strip = next 30 days */
  const dates = useMemo(() => {
    const out: { iso: string; weekday: string; day: number; month: string }[] = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      out.push({
        iso: d.toISOString().slice(0, 10),
        weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
        day: d.getDate(),
        month: d.toLocaleDateString("en-US", { month: "short" }),
      });
    }
    return out;
  }, []);

  const estimatedPrice = useMemo(() => {
    let total = estimatedNumeric(selectedService) || 0;
    for (const addOnId of selectedAddOnIds) {
      const addOn = addOnServices.find((s) => s.id === addOnId);
      total += estimatedNumeric(addOn || null) || 0;
    }
    return total;
  }, [selectedService, selectedAddOnIds, addOnServices]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const canSubmit =
    !!provider &&
    !!selectedService &&
    !!selectedDate &&
    !!selectedTime &&
    name.trim().length > 0 &&
    phone.trim().length > 0 &&
    email.trim().length > 0 &&
    intakeQuestions.every((q) => !q.required || (answers[q.id] && answers[q.id].trim().length > 0));

  const handleSubmit = async () => {
    if (!canSubmit || !provider || !selectedService) return;
    setSubmitting(true);
    try {
      const addOnNames = selectedAddOnIds
        .map((id) => addOnServices.find((s) => s.id === id)?.name)
        .filter(Boolean);

      const serviceSummary = JSON.stringify({
        service: selectedService.name,
        category: selectedService.category,
        addOns: addOnNames,
        answers,
      });

      const notesParts: string[] = [];
      if (notes.trim()) notesParts.push(notes.trim());
      if (recurring) notesParts.push("Customer requested recurring service.");
      if (addOnNames.length > 0) notesParts.push(`Add-ons: ${addOnNames.join(", ")}`);

      const { data: br, error } = await supabase
        .from("booking_requests")
        .insert({
          provider_id: provider.id,
          provider_name: provider.business_name,
          provider_category: selectedService.category || provider.capability_tags?.[0] || null,
          customer_name: name.trim(),
          customer_phone: phone.trim(),
          customer_email: email.trim(),
          customer_address: address.trim() || null,
          service_summary: serviceSummary,
          preferred_date: selectedDate,
          preferred_time: selectedTime,
          notes: notesParts.join("\n") || null,
          status: "pending",
        })
        .select("id")
        .single();

      if (error) throw error;

      // Fire-and-await edge function but don't block on errors
      try {
        await supabase.functions.invoke("process-booking-request", {
          body: { booking_request_id: br.id },
        });
      } catch (e) {
        console.warn("process-booking-request failed", e);
      }

      navigate("/booking-confirmed");
    } catch (e) {
      console.error(e);
      toast.error("Could not submit your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0a" }}>
        <Loader2 className="h-6 w-6 text-green-500 animate-spin" />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen p-6 text-center" style={{ background: "#0a0a0a" }}>
        <p className="text-gray-400">Provider not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32" style={{ background: "#0a0a0a" }}>
      {/* Top nav */}
      <nav className="sticky top-0 z-40 border-b border-neutral-800 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-white font-semibold">Book Appointment</h1>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Provider header */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center gap-4">
          {provider.avatar_url ? (
            <img
              src={provider.avatar_url}
              alt={provider.business_name}
              className="w-14 h-14 rounded-full object-cover border border-neutral-800"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-green-400" />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-white font-semibold truncate">{provider.business_name}</p>
            <p className="text-xs text-gray-500">Service Provider</p>
          </div>
        </div>

        {/* Select Service */}
        <section className="space-y-3">
          <h2 className="text-white font-bold text-lg">Select Service</h2>
          {primaryServices.length === 0 ? (
            <p className="text-gray-500 text-sm">This provider hasn't published any services yet.</p>
          ) : (
            <div className="space-y-3">
              {primaryServices.map((svc) => {
                const selected = selectedServiceId === svc.id;
                return (
                  <button
                    key={svc.id}
                    onClick={() => {
                      setSelectedServiceId(svc.id);
                      setAnswers({});
                    }}
                    className={`w-full text-left bg-neutral-900 border rounded-2xl p-4 transition-all ${
                      selected ? "border-green-500" : "border-neutral-800 hover:border-neutral-700"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className={`font-semibold ${selected ? "text-green-400" : "text-white"}`}>
                          {svc.name}
                        </p>
                        {svc.description && (
                          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{svc.description}</p>
                        )}
                        {svc.duration && (
                          <p className="text-gray-600 text-xs mt-1">{svc.duration} min</p>
                        )}
                      </div>
                      <span className="text-green-400 font-semibold whitespace-nowrap">
                        {formatPrice(svc)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* Add-ons (only if any exist) */}
        {addOnServices.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">Add-ons</h2>
            <div className="space-y-2">
              {addOnServices.map((svc) => {
                const selected = selectedAddOnIds.includes(svc.id);
                return (
                  <button
                    key={svc.id}
                    onClick={() => toggleAddOn(svc.id)}
                    className={`w-full flex items-center justify-between gap-3 bg-neutral-900 border rounded-2xl p-4 transition-all ${
                      selected ? "border-green-500" : "border-neutral-800"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                          selected ? "bg-green-500 border-green-500" : "border-gray-600"
                        }`}
                      >
                        {selected && <Check className="h-3.5 w-3.5 text-black" />}
                      </div>
                      <span className="text-white text-sm truncate">{svc.name}</span>
                    </div>
                    <span className="text-green-400 font-medium text-sm whitespace-nowrap">
                      {formatPrice(svc)}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Booking Questions */}
        {selectedService && intakeQuestions.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-white font-bold text-lg">Booking Questions</h2>
            {intakeQuestions.map((q) => (
              <div key={q.id} className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  {q.question}
                  {q.required && <span className="text-green-400 ml-1">*</span>}
                </label>
                {q.type === "text" && (
                  <textarea
                    value={answers[q.id] || ""}
                    onChange={(e) => setAnswers((p) => ({ ...p, [q.id]: e.target.value }))}
                    rows={3}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:border-green-500 focus:outline-none resize-none"
                    placeholder="Type your answer…"
                  />
                )}
                {q.type === "number" && (
                  <input
                    type="number"
                    value={answers[q.id] || ""}
                    onChange={(e) => setAnswers((p) => ({ ...p, [q.id]: e.target.value }))}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:border-green-500 focus:outline-none"
                    placeholder="0"
                  />
                )}
                {q.type === "yes_no" && (
                  <div className="flex gap-2">
                    {["Yes", "No"].map((opt) => {
                      const selected = answers[q.id] === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => setAnswers((p) => ({ ...p, [q.id]: opt }))}
                          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                            selected
                              ? "bg-green-500 text-black"
                              : "bg-neutral-900 border border-neutral-800 text-gray-300 hover:border-neutral-700"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}
                {q.type === "select" && q.options && (
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((opt) => {
                      const selected = answers[q.id] === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => setAnswers((p) => ({ ...p, [q.id]: opt }))}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selected
                              ? "bg-green-500 text-black"
                              : "bg-neutral-900 border border-neutral-800 text-gray-300 hover:border-neutral-700"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Select Date */}
        <section className="space-y-3">
          <h2 className="text-white font-bold text-lg">Select Date</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {dates.map((d) => {
              const selected = selectedDate === d.iso;
              return (
                <button
                  key={d.iso}
                  onClick={() => setSelectedDate(d.iso)}
                  className={`shrink-0 w-16 py-3 rounded-2xl text-center transition-all ${
                    selected
                      ? "bg-green-500 text-black"
                      : "bg-neutral-900 border border-neutral-800 text-gray-300 hover:border-neutral-700"
                  }`}
                >
                  <div className="text-[11px] uppercase font-medium opacity-80">{d.weekday}</div>
                  <div className="text-lg font-bold leading-tight">{d.day}</div>
                  <div className="text-[11px] opacity-80">{d.month}</div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Select Time */}
        <section className="space-y-3">
          <h2 className="text-white font-bold text-lg">Select Time</h2>
          <div className="flex flex-wrap gap-2">
            {TIME_SLOTS.map((slot) => {
              const selected = selectedTime === slot;
              return (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    selected
                      ? "bg-green-500 text-black"
                      : "bg-neutral-900 border border-neutral-800 text-gray-300 hover:border-neutral-700"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </section>

        {/* Recurring toggle */}
        <section>
          <button
            onClick={() => setRecurring((v) => !v)}
            className={`w-full flex items-center justify-between gap-3 bg-neutral-900 border rounded-2xl p-4 transition-all ${
              recurring ? "border-green-500" : "border-neutral-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <Repeat className={`h-5 w-5 ${recurring ? "text-green-400" : "text-gray-500"}`} />
              <span className="text-white text-sm font-medium">Repeat this service</span>
            </div>
            <div
              className={`relative w-11 h-6 rounded-full transition-colors ${
                recurring ? "bg-green-500" : "bg-neutral-700"
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  recurring ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </button>
        </section>

        {/* Your Details */}
        <section className="space-y-3">
          <h2 className="text-white font-bold text-lg">Your Details</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name *"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:border-green-500 focus:outline-none"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone *"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:border-green-500 focus:outline-none"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email *"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:border-green-500 focus:outline-none"
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Service address"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:border-green-500 focus:outline-none"
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Anything else the pro should know? (optional)"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:border-green-500 focus:outline-none resize-none"
          />
        </section>
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500">Est. price</p>
            <p className="text-xl font-bold text-green-400">
              {estimatedPrice > 0 ? `$${estimatedPrice}` : "—"}
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
            className="flex-1 max-w-xs h-12 rounded-full bg-green-500 text-black font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-400 transition-colors flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending…
              </>
            ) : (
              "Request Appointment"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
