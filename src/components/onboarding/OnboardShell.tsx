import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

// Shared chrome for every onboarding screen — mirrors the existing Sign In /
// Sign Up pages: sticky nav with the HomeBase mark, dark bg, centered card.
export function OnboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
      <nav className="sticky top-0 z-50 border-b border-gray-800 bg-[#0a0a0a]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="HomeBase" className="h-8 w-8" />
            <span className="text-xl font-bold text-white">HomeBase</span>
          </Link>
        </div>
      </nav>

      <div className="flex items-center justify-center px-4 py-14 sm:py-20">
        <div className="w-full max-w-[440px] rounded-xl border border-gray-800 bg-gray-900 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export function OnboardError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
      {message}
    </div>
  );
}
