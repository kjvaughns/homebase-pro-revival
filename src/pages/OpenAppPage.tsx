import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { isMobile, tryDeepLink, TESTFLIGHT_URL } from "@/lib/deepLink";

function buildDeepLink(params: URLSearchParams): string {
  const path = params.get("path");
  const jobId = params.get("jobId");
  const appointmentId = params.get("appointmentId");
  if (path) return `homebase://${path.replace(/^\//, "")}`;
  if (jobId) return `homebase://job/${jobId}`;
  if (appointmentId) return `homebase://appointment/${appointmentId}`;
  return "homebase://";
}

export default function OpenAppPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    document.title = "Open HomeBase App";
  }, []);

  useEffect(() => {
    if (isMobile()) {
      const deepLink = buildDeepLink(params);
      tryDeepLink(deepLink, TESTFLIGHT_URL, 1500);
      return;
    }
    // Desktop: countdown to homepage
    const interval = window.setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          window.clearInterval(interval);
          navigate("/");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [params, navigate]);

  const openApp = () => {
    const deepLink = buildDeepLink(params);
    tryDeepLink(deepLink, TESTFLIGHT_URL, 1500);
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
        <img src={logo} alt="HomeBase" className="w-16 h-16 mx-auto mb-6 rounded-2xl" />

        <h1 className="text-2xl font-bold text-white mb-2">Opening HomeBase…</h1>
        <p className="text-gray-400 text-sm mb-8">
          {isMobile()
            ? "If the app didn't open, install it or continue below."
            : `Redirecting to homepage in ${countdown}…`}
        </p>

        <div className="space-y-3">
          <Button
            onClick={openApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full h-11"
          >
            Open App
          </Button>
          <a
            href={TESTFLIGHT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full border border-neutral-800 text-white rounded-full h-11 leading-[2.75rem] hover:bg-neutral-900 transition-colors"
          >
            Download App
          </a>
          <Link
            to="/"
            className="block text-sm text-gray-500 hover:text-gray-300 transition-colors pt-2"
          >
            Continue to Homepage →
          </Link>
        </div>
      </div>
    </div>
  );
}
