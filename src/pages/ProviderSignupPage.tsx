import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { OnboardError, OnboardShell } from "@/components/onboarding/OnboardShell";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { ChipSelect } from "@/components/onboarding/ChipSelect";
import {
  AppStoreButton,
  OpenAppNote,
  SuccessCheck,
} from "@/components/onboarding/AppDownload";
import { Field, PasswordField } from "./HomeownerSignupPage";
import { PriceType, SignupError, signupProvider } from "@/lib/onboarding";

const SERVICE_CATEGORIES = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Landscaping",
  "Cleaning",
  "Painting",
  "Carpentry",
  "Roofing",
  "Flooring",
  "General Handyman",
  "Pest Control",
  "Pool Service",
];

const ProviderSignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1..3 forms, 4 = success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailTaken, setEmailTaken] = useState(false);

  // step 1
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  // step 2
  const [businessName, setBusinessName] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [serviceArea, setServiceArea] = useState("");
  const [zipCodes, setZipCodes] = useState("");
  // step 3
  const [serviceName, setServiceName] = useState("");
  const [serviceNameTouched, setServiceNameTouched] = useState(false);
  const [serviceDescription, setServiceDescription] = useState("");
  const [priceType, setPriceType] = useState<PriceType>("fixed");
  const [priceDollars, setPriceDollars] = useState("");

  const suggestedName = useMemo(() => services[0] ?? "", [services]);
  const effectiveServiceName = serviceNameTouched
    ? serviceName
    : serviceName || suggestedName;

  function next() {
    setError("");
    if (step === 1) {
      if (!name.trim()) return setError("Enter your full name.");
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim()))
        return setError("Enter a valid email address.");
      if (password.length < 6)
        return setError("Password must be at least 6 characters.");
      setStep(2);
    } else if (step === 2) {
      if (!businessName.trim()) return setError("Enter your business name.");
      if (services.length === 0) return setError("Select at least one service.");
      setStep(3);
    }
  }

  function back() {
    setError("");
    if (step > 1) setStep((s) => s - 1);
    else navigate("/signup");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setEmailTaken(false);
    if (!effectiveServiceName.trim())
      return setError("Give your service a name.");
    if (
      (priceType === "fixed" || priceType === "hourly") &&
      !(Number(priceDollars) > 0)
    )
      return setError("Enter a starting price.");

    const zips = zipCodes.split(/[\s,]+/).map((z) => z.trim()).filter(Boolean);
    const priceCents =
      priceType === "quote" ? undefined : Math.round(Number(priceDollars) * 100);

    setLoading(true);
    try {
      await signupProvider({
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim() || undefined,
        businessName: businessName.trim(),
        serviceArea: serviceArea.trim() || undefined,
        serviceZipCodes: zips.length ? zips : undefined,
        capabilityTags: services,
        initialService: {
          name: effectiveServiceName.trim(),
          description: serviceDescription.trim() || undefined,
          priceType,
          priceCents,
        },
      });
      setStep(4);
    } catch (err) {
      if (err instanceof SignupError && err.emailTaken) {
        setEmailTaken(true);
        setStep(1);
        setError("That email is already registered.");
      } else {
        setError(
          err instanceof Error ? err.message : "Something went wrong. Try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  if (step === 4) {
    return (
      <OnboardShell>
        <div className="text-center">
          <SuccessCheck />
          <h1 className="mt-5 text-2xl font-bold text-white">
            You're live on HomeBase!
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            Download the app to manage your jobs, clients, and schedule. Log in
            with the account you just created.
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-500/15 px-4 py-2 text-sm font-semibold text-green-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m5 13 4 4 10-10" stroke="#22c55e" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {businessName.trim() || "Your business"} is live
          </span>
        </div>
        <div className="mt-6">
          <AppStoreButton />
        </div>
        <div className="mt-4">
          <OpenAppNote />
        </div>
      </OnboardShell>
    );
  }

  return (
    <OnboardShell>
      <ProgressBar current={step} total={3} />
      <OnboardError message={error} />

      <form onSubmit={step === 3 ? submit : (e) => e.preventDefault()} className="space-y-4" noValidate>
        {step === 1 && (
          <>
            <StepHeader title="Account details" subtitle="Let's set up your login." />
            <Field label="Full Name">
              <Input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Jane Smith" className="mt-1 border-gray-700 bg-gray-800 text-white placeholder:text-gray-500" />
            </Field>
            <Field label="Email">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" className="mt-1 border-gray-700 bg-gray-800 text-white placeholder:text-gray-500" />
            </Field>
            <PasswordField value={password} onChange={setPassword} />
            <Field label="Phone" optional>
              <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="(555) 123-4567" className="mt-1 border-gray-700 bg-gray-800 text-white placeholder:text-gray-500" />
            </Field>
            {emailTaken && (
              <p className="text-sm text-gray-400">
                Already registered?{" "}
                <Link to="/login" className="font-semibold text-green-400 hover:text-green-300">Log in</Link>
              </p>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <StepHeader title="Your business" subtitle="Tell customers what you do." />
            <Field label="Business Name">
              <Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g. Smith Plumbing Co." className="mt-1 border-gray-700 bg-gray-800 text-white placeholder:text-gray-500" />
            </Field>
            <div>
              <Label className="text-sm text-gray-300">What services do you offer?</Label>
              <div className="mt-2">
                <ChipSelect options={SERVICE_CATEGORIES} selected={services} onChange={setServices} />
              </div>
            </div>
            <Field label="Service area">
              <Input value={serviceArea} onChange={(e) => setServiceArea(e.target.value)} placeholder="e.g. Austin, TX" className="mt-1 border-gray-700 bg-gray-800 text-white placeholder:text-gray-500" />
            </Field>
            <Field label="Zip codes you serve" optional>
              <Input value={zipCodes} onChange={(e) => setZipCodes(e.target.value)} placeholder="78701, 78702, …" className="mt-1 border-gray-700 bg-gray-800 text-white placeholder:text-gray-500" />
            </Field>
          </>
        )}

        {step === 3 && (
          <>
            <StepHeader title="Your first service" subtitle="You can add more later in the app." />
            <Field label="Service name">
              <Input
                value={effectiveServiceName}
                onChange={(e) => {
                  setServiceName(e.target.value);
                  setServiceNameTouched(true);
                }}
                placeholder="e.g. Drain cleaning"
                className="mt-1 border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
              />
            </Field>
            <Field label="Brief description" optional>
              <textarea
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                rows={3}
                placeholder="What's included, typical turnaround, etc."
                className="mt-1 w-full resize-none rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </Field>
            <PricePicker
              priceType={priceType}
              onTypeChange={setPriceType}
              dollars={priceDollars}
              onDollarsChange={setPriceDollars}
            />
          </>
        )}

        <div className="flex flex-col gap-3 pt-1">
          {step < 3 ? (
            <Button type="button" onClick={next} className="h-[50px] w-full bg-green-500 text-[16px] font-semibold text-white hover:bg-green-600">
              Continue
            </Button>
          ) : (
            <Button type="submit" disabled={loading} className="h-[50px] w-full bg-green-500 text-[16px] font-semibold text-white hover:bg-green-600">
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Create my account
            </Button>
          )}
          <button type="button" onClick={back} className="mx-auto text-[13px] text-gray-500 hover:text-gray-300">
            ← Back
          </button>
        </div>
      </form>
    </OnboardShell>
  );
};

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h1 className="text-xl font-bold text-white">{title}</h1>
      <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
    </div>
  );
}

function PricePicker({
  priceType,
  onTypeChange,
  dollars,
  onDollarsChange,
}: {
  priceType: PriceType;
  onTypeChange: (t: PriceType) => void;
  dollars: string;
  onDollarsChange: (v: string) => void;
}) {
  const options: { value: PriceType; label: string }[] = [
    { value: "fixed", label: "Fixed" },
    { value: "hourly", label: "Per Hour" },
    { value: "quote", label: "Free Quote" },
  ];
  return (
    <div>
      <Label className="text-sm text-gray-300">Starting price</Label>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {options.map((o) => {
          const active = priceType === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onTypeChange(o.value)}
              aria-pressed={active}
              className={
                "h-11 rounded-lg text-sm font-medium transition-all active:scale-[0.98] " +
                (active
                  ? "border border-green-500 bg-green-500/15 text-green-400"
                  : "border border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500")
              }
            >
              {o.label}
            </button>
          );
        })}
      </div>
      {priceType !== "quote" && (
        <div className="relative mt-2">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">$</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="1"
            placeholder={priceType === "hourly" ? "75" : "150"}
            value={dollars}
            onChange={(e) => onDollarsChange(e.target.value)}
            className="h-11 w-full rounded-md border border-gray-700 bg-gray-800 pl-7 pr-16 text-white placeholder:text-gray-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[13px] text-gray-500">
            {priceType === "hourly" ? "/ hour" : "flat"}
          </span>
        </div>
      )}
    </div>
  );
}

export default ProviderSignupPage;
