import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { isMobile, tryDeepLink, TESTFLIGHT_URL } from "@/lib/deepLink";

export default function PaymentSuccessPage() {
  const [params] = useSearchParams();
  const jobId = params.get("jobId") || "";
  const amount = params.get("amount") || "";
  const service = params.get("service") || "";

  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    document.title = "Payment Successful — HomeBase";
  }, []);

  useEffect(() => {
    if (!isMobile()) return;
    const target = jobId ? `homebase://job/${jobId}` : "homebase://";
    const t = window.setTimeout(() => {
      tryDeepLink(target, TESTFLIGHT_URL, 1500);
    }, 600);
    const fallbackTimer = window.setTimeout(() => setShowFallback(true), 2000);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(fallbackTimer);
    };
  }, [jobId]);

  const openInApp = () => {
    const target = jobId ? `homebase://job/${jobId}` : "homebase://";
    tryDeepLink(target, TESTFLIGHT_URL, 1500);
  };

  const formattedAmount = amount
    ? `$${(Number(amount) / (Number(amount) > 1000 ? 100 : 1)).toFixed(2)}`
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
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Payment Successful</h1>
        <p className="text-gray-400 text-sm mb-8">
          Your payment has been processed. A receipt has been sent to your email.
        </p>

        {(service || jobId || formattedAmount) && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 text-left space-y-2 mb-8">
            {service && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Service</span>
                <span className="text-white">{service}</span>
              </div>
            )}
            {formattedAmount && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Amount</span>
                <span className="text-white">{formattedAmount}</span>
              </div>
            )}
            {jobId && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Job ID</span>
                <span className="text-white font-mono text-xs">{jobId.slice(0, 12)}</span>
              </div>
            )}
          </div>
        )}

        <div className="space-y-3">
          <Button
            onClick={openInApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full h-11"
          >
            View Job
          </Button>

          {isMobile() && showFallback && (
            <Button
              onClick={openInApp}
              variant="outline"
              className="w-full border-neutral-800 bg-transparent text-white hover:bg-neutral-900 rounded-full h-11"
            >
              Open in App
            </Button>
          )}

          {!isMobile() && (
            <a
              href={TESTFLIGHT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full border border-neutral-800 text-white rounded-full h-11 leading-[2.75rem] hover:bg-neutral-900 transition-colors"
            >
              Download App
            </a>
          )}

          <Link
            to="/marketplace"
            className="block text-sm text-gray-500 hover:text-gray-300 transition-colors pt-2"
          >
            Continue on Web →
          </Link>
        </div>
      </div>
    </div>
  );
}
