import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { OnboardShell } from "@/components/onboarding/OnboardShell";
import { captureReferralFromUrl } from "@/lib/onboarding";

// /signup — role picker. Reads ?ref (stored invisibly) and ?role (skip ahead).
const SignUpPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    captureReferralFromUrl();
    const role = params.get("role");
    if (role === "homeowner")
      navigate("/signup/homeowner", { replace: true });
    else if (role === "provider")
      navigate("/signup/provider", { replace: true });
  }, [params, navigate]);

  return (
    <OnboardShell>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">
          Get started with HomeBase
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Find trusted pros. Grow your business.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <RoleCard
          title="I need home services"
          subtitle="Find and book trusted local pros."
          onClick={() => navigate("/signup/homeowner")}
          icon={<HomeIcon />}
        />
        <RoleCard
          title="I'm a service pro"
          subtitle="Get discovered and manage your business."
          onClick={() => navigate("/signup/provider")}
          icon={<ToolIcon />}
        />
      </div>

      <p className="mt-8 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-green-400 hover:text-green-300">
          Log in
        </Link>
      </p>
    </OnboardShell>
  );
};

function RoleCard({
  title,
  subtitle,
  onClick,
  icon,
}: {
  title: string;
  subtitle: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-4 rounded-xl border border-gray-800 bg-gray-800/50 p-5 text-left transition-all hover:border-green-500 active:scale-[0.99]"
    >
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-500/15 text-green-400">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-[17px] font-semibold text-white">{title}</div>
        <div className="mt-0.5 text-sm text-gray-400">{subtitle}</div>
      </div>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="text-gray-600 transition-colors group-hover:text-green-400"
        aria-hidden="true"
      >
        <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5M5 9.5V20h14V9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ToolIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14.7 6.3a3.5 3.5 0 0 0-4.6 4.6l-6.1 6.1a1.5 1.5 0 0 0 2.1 2.1l6.1-6.1a3.5 3.5 0 0 0 4.6-4.6l-2.2 2.2-1.8-.3-.3-1.8 2.2-2.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default SignUpPage;
