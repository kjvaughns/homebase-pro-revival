import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

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
    document.title = "Book a Pro — HomeBase";
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const canSubmit = name.trim() && phone.trim() && email.trim() && address.trim() && serviceDetails.trim() && preferredDate && preferredTime;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);

    const { error: insertError } = await supabase.from("booking_requests").insert({
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
    });

    setLoading(false);

    if (insertError) {
      setError("Something went wrong. Please try again.");
      return;
    }

    navigate(
      `/booking-confirmed?providerName=${encodeURIComponent(providerName)}&customerName=${encodeURIComponent(name.trim())}&customerEmail=${encodeURIComponent(email.trim())}&preferredDate=${encodeURIComponent(preferredDate)}&preferredTime=${encodeURIComponent(preferredTime)}`
    );
  };

  const inputClass = "bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 focus-visible:ring-green-500/50";

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
      <nav className="w-full border-b border-gray-800 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 flex items-center h-14">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="HomeBase logo" className="w-7 h-7" />
            <span className="text-base font-bold text-white">HomeBase</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-md mx-auto px-4 py-12">
        {/* Provider card */}
        {providerName && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-green-400">{providerName.charAt(0)}</span>
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{providerName}</p>
              {category && <Badge className="bg-green-500/10 text-green-400 border-green-500/30 text-[10px] mt-1">{category}</Badge>}
            </div>
          </div>
        )}

        <p className="text-gray-400 text-sm mb-8">Complete your booking request — no account needed</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label className="text-gray-300 text-sm">Your Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-300 text-sm">Phone Number</Label>
            <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-300 text-sm">Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-300 text-sm">Address / City</Label>
            <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St, City, State" required className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-300 text-sm">Service Details</Label>
            <Textarea value={serviceDetails} onChange={(e) => setServiceDetails(e.target.value)} required className={`min-h-[80px] ${inputClass}`} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-300 text-sm">Preferred Date</Label>
            <Input type="date" min={today} value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} required className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-300 text-sm">Preferred Time</Label>
            <select
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              required
              className="flex h-10 w-full rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50"
            >
              <option value="">Select a time</option>
              <option value="Morning (8am-12pm)">Morning (8am-12pm)</option>
              <option value="Afternoon (12pm-5pm)">Afternoon (12pm-5pm)</option>
              <option value="Evening (5pm-8pm)">Evening (5pm-8pm)</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-300 text-sm">Notes <span className="text-gray-600">(optional)</span></Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything else we should know?" className={`min-h-[60px] ${inputClass}`} />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">{error}</div>
          )}

          <Button
            type="submit"
            disabled={!canSubmit || loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full h-12 text-base disabled:opacity-40"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Confirm Booking Request →"}
          </Button>
        </form>
      </div>
    </div>
  );
}
