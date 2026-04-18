import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, ClipboardList, Tag, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

function getNext7Days() {
  const days = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      dayName: dayNames[d.getDay()],
      date: d.getDate(),
      month: monthNames[d.getMonth()],
      full: d.toISOString().split("T")[0],
    });
  }
  return days;
}

const TIME_SLOTS = ["Morning (8am-12pm)", "Afternoon (12pm-5pm)", "Evening (5pm-8pm)"];

export default function GuestBookingPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const providerId = params.get("providerId") || "";
  const providerName = params.get("providerName") || "";
  const category = params.get("category") || "";
  const summary = params.get("summary") || "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [serviceDetails, setServiceDetails] = useState(summary);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Book Appointment — HomeBase";
  }, []);

  const next7Days = getNext7Days();

  const canSubmit = name.trim() && phone.trim() && email.trim() && address.trim() && serviceDetails.trim() && preferredDate && preferredTime;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);

    const { data: inserted, error: insertError } = await supabase
      .from("booking_requests")
      .insert({
        provider_id: providerId || null,
        provider_name: providerName || null,
        provider_category: category || null,
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        customer_email: email.trim(),
        customer_address: address.trim(),
        service_summary: serviceDetails.trim(),
        preferred_date: preferredDate,
        preferred_time: preferredTime,
        notes: notes.trim() || null,
        status: "pending",
      })
      .select("id")
      .single();

    if (insertError || !inserted) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
      return;
    }

    // Fan out to the provider portal: creates appointment + notification.
    // Non-blocking for the user — log only if it fails.
    try {
      const { error: fnError } = await supabase.functions.invoke(
        "process-booking-request",
        { body: { bookingRequestId: inserted.id } },
      );
      if (fnError) console.error("process-booking-request failed", fnError);
    } catch (err) {
      console.error("process-booking-request invoke threw", err);
    }

    setLoading(false);

    navigate(
      `/booking-confirmed?providerName=${encodeURIComponent(providerName)}&customerName=${encodeURIComponent(name.trim())}&customerEmail=${encodeURIComponent(email.trim())}&preferredDate=${encodeURIComponent(preferredDate)}&preferredTime=${encodeURIComponent(preferredTime)}`
    );
  };

  const inputClass = "bg-neutral-900 border-neutral-800 text-white placeholder:text-gray-500 focus-visible:ring-green-500/50 rounded-xl";

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
      <nav className="w-full border-b border-neutral-800 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 flex items-center h-14 gap-3">
          <Link to="/ai-booking" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-sm">← Get Help</span>
          </Link>
          <span className="text-base font-bold text-white">Book Appointment</span>
        </div>
      </nav>

      <div className="max-w-md mx-auto px-4 py-8">
        {/* Service Summary card */}
        {summary && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 mb-4 space-y-3">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-green-400" />
              <h3 className="font-bold text-white">Service Summary</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{summary}</p>
            <div className="flex items-center gap-4">
              {category && (
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <Tag className="h-3.5 w-3.5 text-green-400" />
                  <span>{category}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Provider card */}
        {providerName && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 mb-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
              <span className="text-lg font-bold text-green-400">{providerName.charAt(0)}</span>
            </div>
            <div>
              <p className="font-semibold text-white">{providerName}</p>
              {category && <p className="text-sm text-gray-400">{category}</p>}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date picker */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white">Select Date</h3>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {next7Days.map((day) => (
                <button
                  type="button"
                  key={day.full}
                  onClick={() => setPreferredDate(day.full)}
                  className={`flex flex-col items-center min-w-[72px] py-3 px-3 rounded-xl border transition-colors shrink-0 ${
                    preferredDate === day.full
                      ? "border-green-500 bg-green-500/10 text-green-400"
                      : "border-neutral-700 bg-neutral-800 text-gray-300 hover:border-gray-600"
                  }`}
                >
                  <span className="text-xs">{day.dayName}</span>
                  <span className="text-xl font-bold">{day.date}</span>
                  <span className="text-xs">{day.month}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time slots */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white">Select Time</h3>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setPreferredTime(slot)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                    preferredTime === slot
                      ? "border-green-500 bg-green-500/10 text-green-400"
                      : "border-neutral-700 bg-neutral-800 text-gray-300 hover:border-gray-600"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div className="space-y-4 pt-2">
            <h3 className="text-base font-bold text-white">Your Details</h3>
            <div className="space-y-1.5">
              <Label className="text-gray-400 text-sm">Your Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-400 text-sm">Phone Number</Label>
              <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-400 text-sm">Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-400 text-sm">Address / City</Label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St, City, State" required className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-400 text-sm">Notes <span className="text-gray-600">(optional)</span></Label>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything else we should know?" className={`min-h-[60px] ${inputClass}`} />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">{error}</div>
          )}

          {/* CTA */}
          <div className="flex items-center gap-4 pt-2">
            <p className="text-sm text-gray-500 shrink-0">Price to be confirmed</p>
            <Button
              type="submit"
              disabled={!canSubmit || loading}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full h-14 text-base disabled:opacity-40"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Request Appointment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
