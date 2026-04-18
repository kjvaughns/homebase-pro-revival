import { useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import logo from "@/assets/logo.png";

export default function BookingConfirmedPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const providerName = params.get("providerName") || "your pro";
  const customerName = params.get("customerName") || "";
  const preferredDate = params.get("preferredDate") || "";
  const preferredTime = params.get("preferredTime") || "";

  useEffect(() => {
    document.title = "Booking Confirmed — HomeBase";
  }, []);

  const formattedDate = preferredDate
    ? new Date(preferredDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : "";

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
      <nav className="w-full border-b border-neutral-800 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 flex items-center h-14">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="HomeBase logo" className="w-7 h-7" />
            <span className="text-base font-bold text-white">HomeBase</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-md mx-auto px-4 py-16 text-center">
        {/* Green checkmark */}
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Booking Request Sent!</h1>
        <p className="text-gray-400 text-sm mb-8">
          Your request has been sent to <span className="text-white font-medium">{providerName}</span>. They'll reach out within 2 hours to confirm.
        </p>

        {/* Summary card */}
        {(customerName || formattedDate || preferredTime) && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 text-left space-y-2 mb-8">
            {customerName && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Name</span>
                <span className="text-white">{customerName}</span>
              </div>
            )}
            {formattedDate && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="text-white">{formattedDate}</span>
              </div>
            )}
            {preferredTime && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Time</span>
                <span className="text-white">{preferredTime}</span>
              </div>
            )}
          </div>
        )}

        {/* Account creation CTA */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 space-y-3">
          <h3 className="text-base font-semibold text-white">Save your booking history</h3>
          <p className="text-gray-400 text-sm">
            Create a free account to track this job, rebook easily, and get updates. Takes 10 seconds.
          </p>
          <Button
            onClick={() => navigate("/signup")}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full h-11"
          >
            Create Free Account
          </Button>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            Continue as Guest →
          </button>
        </div>
      </div>
    </div>
  );
}
