import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export default function PaymentCancelledPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Payment Cancelled — HomeBase";
  }, []);

  const handleTryAgain = () => {
    if (typeof document !== "undefined" && document.referrer) {
      try {
        const ref = new URL(document.referrer);
        if (ref.origin === window.location.origin) {
          navigate(-1);
          return;
        }
      } catch {
        /* ignore */
      }
    }
    navigate("/marketplace");
  };

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
        <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
          <X className="h-10 w-10 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Payment Not Completed</h1>
        <p className="text-gray-400 text-sm mb-8">
          No charge was made. You can try again any time.
        </p>

        <div className="space-y-3">
          <Button
            onClick={handleTryAgain}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full h-11"
          >
            Try Again
          </Button>
          <Link
            to="/"
            className="block text-sm text-gray-500 hover:text-gray-300 transition-colors pt-2"
          >
            Back to Home →
          </Link>
        </div>
      </div>
    </div>
  );
}
