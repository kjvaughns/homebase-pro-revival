import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Loader2, ArrowLeft, ShieldCheck, MessageCircle, Clock, CheckCircle2, XCircle, Droplets, Zap, Wind, Sparkles, TreePine, Home, Bug, Hammer, ClipboardList, Tag, DollarSign, User, Mail, Phone, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AppDownloadCTA from "@/components/marketplace/AppDownloadCTA";
import logo from "@/assets/logo.png";

type StepKey = "describe" | "loading-analyze" | "questions" | "loading-refine" | "options" | "loading-match" | "providers" | "details" | "confirmed";
const STEP_LABELS = ["Describe", "Questions", "Quote", "Book"] as const;

interface AnalysisQuestion {
  id: string;
  question: string;
  type: "single_choice" | "multi_choice" | "yes_no" | "number" | "text";
  options?: string[];
}

interface Analysis {
  category: string;
  confidence: number;
  summary: string;
  severity: string;
  questions: AnalysisQuestion[];
  estimatedPriceRange: string;
}

interface RefinedAnalysis {
  refinedSummary: string;
  severity: string;
  recommendedUrgency: string;
  scopeOfWork: string[];
  serviceOptions: ServiceOption[];
  materialEstimate: string;
  timeEstimate: string;
  confidence: number;
}

interface ServiceOption {
  title: string;
  description: string;
  priceRange: string;
  timeEstimate: string;
  recommended?: boolean;
  includedItems?: string[];
}

interface MatchedProvider {
  id: string;
  business_name: string;
  name: string;
  avatar_url?: string;
  rating: number;
  review_count: number;
  category: string;
  verified: boolean;
  slug?: string;
}

const QUICK_FILLS = [
  { label: "Leaking faucet" },
  { label: "AC not cooling" },
  { label: "Outlet sparking" },
  { label: "Clogged drain" },
  { label: "Lawn care" },
  { label: "Roof leak" },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Plumbing: <Droplets className="h-5 w-5 text-green-400" />,
  Electrical: <Zap className="h-5 w-5 text-green-400" />,
  HVAC: <Wind className="h-5 w-5 text-green-400" />,
  Cleaning: <Sparkles className="h-5 w-5 text-green-400" />,
  Landscaping: <TreePine className="h-5 w-5 text-green-400" />,
  Roofing: <Home className="h-5 w-5 text-green-400" />,
  "Pest Control": <Bug className="h-5 w-5 text-green-400" />,
  Carpentry: <Hammer className="h-5 w-5 text-green-400" />,
};

// Generate 30-min time slots from 8:00 AM to 8:00 PM
function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 8; h < 20; h++) {
    for (const m of [0, 30]) {
      const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
      const ampm = h >= 12 ? "PM" : "AM";
      const min = m === 0 ? "00" : "30";
      slots.push(`${hour12}:${min} ${ampm}`);
    }
  }
  // Add 8:00 PM
  slots.push("8:00 PM");
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

function stepIndex(step: StepKey): number {
  if (step === "describe" || step === "loading-analyze") return 0;
  if (step === "questions" || step === "loading-refine") return 1;
  if (step === "options" || step === "loading-match") return 2;
  return 3; // providers, details, confirmed
}

function StepIndicator({ step }: { step: StepKey }) {
  const current = stepIndex(step);
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {STEP_LABELS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center gap-2">
            {i > 0 && <div className={`w-6 h-px ${done || active ? "bg-green-500" : "bg-gray-700"}`} />}
            <span
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                done
                  ? "bg-green-500/10 text-green-400"
                  : active
                  ? "bg-green-500/20 text-green-400 ring-1 ring-green-500/50"
                  : "bg-gray-800 text-gray-500"
              }`}
            >
              {done && <Check className="h-3 w-3" />}
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function LoadingState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
}

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

export default function AIBookingPage() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<StepKey>("describe");
  const [problemText, setProblemText] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [refined, setRefined] = useState<RefinedAnalysis | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [providers, setProviders] = useState<MatchedProvider[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<MatchedProvider | null>(null);

  // Contact details
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Pre-selected provider from marketplace
  const preSelectedProvider = searchParams.get("providerId")
    ? {
        id: searchParams.get("providerId")!,
        business_name: searchParams.get("providerName") || "Provider",
        name: searchParams.get("providerName") || "Provider",
        category: searchParams.get("category") || "",
        rating: 4.8,
        review_count: 0,
        verified: true,
      }
    : null;

  useEffect(() => {
    document.title = "AI Home Assistant — HomeBase";
  }, []);

  const invokeIntake = useCallback(async (action: string, params: any) => {
    setError(null);
    const { data, error: fnError } = await supabase.functions.invoke("ai-intake", {
      body: { action, ...params },
    });
    if (fnError) {
      console.error("Edge function error:", fnError);
      throw new Error(fnError.message || "Something went wrong");
    }
    if (data?.error) {
      throw new Error(data.error);
    }
    return data;
  }, []);

  const handleAnalyze = async () => {
    setStep("loading-analyze");
    try {
      const result = await invokeIntake("analyze", { problemText });
      setAnalysis(result);
      setStep("questions");
    } catch {
      setError("Something went wrong analyzing your problem. Please try again.");
      setStep("describe");
    }
  };

  const handleRefine = async () => {
    if (!analysis) return;
    setStep("loading-refine");
    try {
      const mappedAnswers = analysis.questions.map((q) => ({
        question: q.question,
        answer: Array.isArray(answers[q.id]) ? (answers[q.id] as string[]).join(", ") : String(answers[q.id] ?? ""),
      }));
      const result = await invokeIntake("refine", {
        originalAnalysis: { category: analysis.category, summary: analysis.summary, severity: analysis.severity },
        answers: mappedAnswers,
      });
      setRefined(result);
      setStep("options");
    } catch {
      setError("Something went wrong refining your estimate. Please try again.");
      setStep("questions");
    }
  };

  const handleMatchProviders = async () => {
    if (!analysis) return;
    if (preSelectedProvider) {
      setProviders([preSelectedProvider as MatchedProvider]);
      setStep("providers");
      return;
    }
    setStep("loading-match");
    try {
      const result = await invokeIntake("match-providers", { category: analysis.category });
      setProviders(Array.isArray(result) ? result : []);
      setStep("providers");
    } catch {
      setError("Something went wrong finding providers. Please try again.");
      setStep("options");
    }
  };

  const handleContinueToDetails = (provider: MatchedProvider) => {
    setSelectedProvider(provider);
    setStep("details");
  };

  const handleConfirmBooking = async () => {
    if (!selectedProvider) return;
    setSubmitting(true);
    try {
      const summary = refined?.refinedSummary || analysis?.summary || "";
      const { error: insertError } = await supabase.from("booking_requests").insert({
        provider_id: selectedProvider.id,
        provider_name: selectedProvider.business_name || selectedProvider.name,
        provider_category: selectedProvider.category || analysis?.category || "",
        customer_name: customerName.trim(),
        customer_email: customerEmail.trim(),
        customer_phone: customerPhone.trim(),
        customer_address: customerAddress.trim(),
        service_summary: summary,
        preferred_date: selectedDate || null,
        preferred_time: selectedTime || null,
        notes: selectedOption !== null && refined?.serviceOptions[selectedOption]
          ? `Service level: ${refined.serviceOptions[selectedOption].title} (${refined.serviceOptions[selectedOption].priceRange})`
          : null,
        status: "pending",
      });
      if (insertError) throw insertError;
      setStep("confirmed");
    } catch (err) {
      console.error("Booking error:", err);
      setError("Something went wrong submitting your booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetAll = () => {
    setStep("describe");
    setProblemText("");
    setAnalysis(null);
    setAnswers({});
    setRefined(null);
    setSelectedOption(null);
    setProviders([]);
    setError(null);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedProvider(null);
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setCustomerAddress("");
  };

  const allAnswered = analysis?.questions.every((q) => {
    const a = answers[q.id];
    if (a === undefined || a === "") return false;
    if (Array.isArray(a) && a.length === 0) return false;
    return true;
  });

  const detailsValid = customerName.trim() && customerEmail.trim() && customerPhone.trim();

  const next7Days = getNext7Days();

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
      {/* Navbar */}
      <nav className="w-full border-b border-gray-800 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 flex items-center h-14">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="HomeBase logo" className="w-7 h-7" />
            <span className="text-base font-bold text-white">HomeBase</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <StepIndicator step={step} />

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Step 1: Describe */}
        {step === "describe" && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-green-400" />
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">What's the issue?</h1>
              <p className="text-gray-400 text-sm mt-2">
                Describe your problem and we'll ask a few quick questions to get you accurate quotes.
              </p>
            </div>

            <Textarea
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              placeholder="My sink is leaking"
              className="min-h-[120px] bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 focus-visible:ring-green-500/50 rounded-2xl"
            />

            <div>
              <p className="text-xs text-gray-500 mb-2">Try these:</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_FILLS.map((qf) => (
                  <button
                    key={qf.label}
                    onClick={() => setProblemText(qf.label)}
                    className="text-xs px-4 py-2 rounded-full border border-green-500/30 text-green-400 bg-green-500/5 hover:bg-green-500/10 transition-colors"
                  >
                    {qf.label}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={!problemText.trim()}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full h-14 text-base disabled:opacity-40"
            >
              Continue
            </Button>
          </div>
        )}

        {step === "loading-analyze" && <LoadingState message="Our AI is analyzing your problem..." />}

        {/* Step 2: Questions */}
        {step === "questions" && analysis && (
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                {CATEGORY_ICONS[analysis.category] || <ClipboardList className="h-5 w-5 text-green-400" />}
              </div>
              <div>
                <p className="font-semibold text-white">{analysis.category}</p>
                <p className="text-sm text-gray-400">{analysis.summary}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">Help us understand better</h2>
              <p className="text-gray-400 text-sm mt-1">Answer these questions to get accurate quotes</p>
            </div>

            {analysis.questions.map((q, idx) => (
              <div key={q.id} className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-bold text-lg mt-0.5">{idx + 1}</span>
                  <p className="text-sm font-medium text-white leading-relaxed">{q.question}</p>
                </div>

                {q.type === "yes_no" && (
                  <div className="grid grid-cols-2 gap-2 ml-7">
                    {["Yes", "No"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          answers[q.id] === opt
                            ? "bg-green-500/15 border border-green-500 text-green-400"
                            : "bg-gray-800 border border-gray-700 text-gray-300 hover:border-gray-600"
                        }`}
                      >
                        {opt === "Yes" ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {q.type === "single_choice" && q.options && (
                  <div className="flex flex-wrap gap-2 ml-7">
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                          answers[q.id] === opt
                            ? "border-green-500 bg-green-500/15 text-green-400"
                            : "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {q.type === "multi_choice" && q.options && (
                  <div className="flex flex-wrap gap-2 ml-7">
                    {q.options.map((opt) => {
                      const selected = Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt);
                      return (
                        <button
                          key={opt}
                          onClick={() =>
                            setAnswers((a) => {
                              const prev = Array.isArray(a[q.id]) ? (a[q.id] as string[]) : [];
                              return { ...a, [q.id]: selected ? prev.filter((x) => x !== opt) : [...prev, opt] };
                            })
                          }
                          className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                            selected
                              ? "border-green-500 bg-green-500/15 text-green-400"
                              : "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {q.type === "number" && (
                  <div className="ml-7">
                    <Input
                      type="number"
                      placeholder="Number of days"
                      value={(answers[q.id] as string) ?? ""}
                      onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                      className="max-w-full bg-gray-800 border-gray-700 text-white focus-visible:ring-green-500/50 rounded-xl"
                    />
                  </div>
                )}

                {q.type === "text" && (
                  <div className="ml-7">
                    <Input
                      value={(answers[q.id] as string) ?? ""}
                      onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white focus-visible:ring-green-500/50 rounded-xl"
                    />
                  </div>
                )}
              </div>
            ))}

            <Button
              onClick={handleRefine}
              disabled={!allAnswered}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-full h-14 text-base disabled:opacity-40"
            >
              Get My Quote
            </Button>
          </div>
        )}

        {step === "loading-refine" && <LoadingState message="Refining your estimate..." />}

        {/* Step 3: Options */}
        {step === "options" && refined && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Your Service Quote</h2>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
              <p className="text-xs text-green-400 font-medium uppercase tracking-wide">Issue Summary</p>
              <p className="text-sm text-gray-300 leading-relaxed">{refined.refinedSummary}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{refined.timeEstimate}</span>
                </div>
                <Badge className="bg-gray-800 text-white border-gray-700 text-xs font-medium px-3 py-1">
                  {refined.recommendedUrgency}
                </Badge>
              </div>
            </div>

            {refined.scopeOfWork.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs text-green-400 font-medium uppercase tracking-wide">What's Included</p>
                <ul className="space-y-2.5">
                  {refined.scopeOfWork.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Choose Your Service Level</h3>
              {refined.serviceOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedOption(i)}
                  className={`w-full text-left rounded-2xl p-5 border transition-all relative ${
                    selectedOption === i
                      ? "border-green-500 bg-gray-900"
                      : opt.recommended
                      ? "border-green-500 bg-gray-900"
                      : "border-gray-800 bg-gray-900 hover:border-gray-700"
                  }`}
                >
                  {opt.recommended && (
                    <span className="absolute top-4 right-4 text-[11px] font-bold px-2.5 py-1 rounded bg-green-500 text-white">
                      Recommended
                    </span>
                  )}
                  <div className="flex items-start justify-between">
                    <p className="font-bold text-white text-lg">{opt.title}</p>
                    {!opt.recommended && (
                      <span className="text-lg font-bold text-green-400">{opt.priceRange}</span>
                    )}
                  </div>
                  {opt.recommended && (
                    <span className="text-lg font-bold text-green-400">{opt.priceRange}</span>
                  )}
                  <p className="text-sm text-gray-400 mt-2">{opt.description}</p>
                  {opt.includedItems && opt.includedItems.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {opt.includedItems.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-white">
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              ))}
            </div>

            <Button
              onClick={handleMatchProviders}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full h-14 text-base"
            >
              Find Matching Pros →
            </Button>
          </div>
        )}

        {step === "loading-match" && <LoadingState message="Finding the best pros near you..." />}

        {/* Step 4: Providers / Date & Time Selection */}
        {step === "providers" && (
          <div className="space-y-6">
            {(refined || analysis) && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-green-400" />
                  <h3 className="font-bold text-white">Service Summary</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {refined?.refinedSummary || analysis?.summary}
                </p>
                <div className="flex items-center gap-3">
                  {selectedOption !== null && refined?.serviceOptions[selectedOption] && (
                    <>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Tag className="h-3.5 w-3.5 text-green-400" />
                        <span>{refined.serviceOptions[selectedOption].title}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <DollarSign className="h-3.5 w-3.5 text-green-400" />
                        <span>{refined.serviceOptions[selectedOption].priceRange}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {providers.length === 0 ? (
              <div className="text-center py-16 text-gray-500 text-sm">
                No providers found yet — check back soon.
              </div>
            ) : (
              <div className="space-y-4">
                {providers.slice(0, 5).map((p) => (
                  <div key={p.id} className="space-y-6">
                    {/* Provider card */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
                      {p.avatar_url ? (
                        <img src={p.avatar_url} alt={p.business_name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                          <span className="text-lg font-bold text-green-400">{p.business_name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-white truncate">{p.business_name}</p>
                          {p.verified && <ShieldCheck className="h-4 w-4 text-green-500 shrink-0" />}
                        </div>
                        <p className="text-sm text-gray-400">{p.category}</p>
                      </div>
                    </div>

                    {/* Date picker */}
                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-white">Select Date</h3>
                      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                        {next7Days.map((day) => (
                          <button
                            key={day.full}
                            onClick={() => setSelectedDate(day.full)}
                            className={`flex flex-col items-center min-w-[72px] py-3 px-3 rounded-xl border transition-colors shrink-0 ${
                              selectedDate === day.full
                                ? "border-green-500 bg-green-500/10 text-green-400"
                                : "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600"
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
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                              selectedTime === slot
                                ? "border-green-500 bg-green-500/10 text-green-400"
                                : "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <Button
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full h-14 text-base disabled:opacity-40"
                      disabled={!selectedDate || !selectedTime}
                      onClick={() => handleContinueToDetails(p)}
                    >
                      Continue
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <button onClick={resetAll} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 transition-colors mx-auto">
              <ArrowLeft className="h-3 w-3" /> Start over
            </button>
          </div>
        )}

        {/* Step 5: Contact Details */}
        {step === "details" && selectedProvider && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Your Details</h2>
              <p className="text-gray-400 text-sm mt-2">
                Almost there! Enter your info so {selectedProvider.business_name} can confirm your appointment.
              </p>
            </div>

            {/* Booking summary mini-card */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{selectedProvider.business_name}</p>
                <p className="text-xs text-gray-400">{selectedDate} · {selectedTime}</p>
              </div>
              {refined?.refinedSummary && (
                <p className="text-xs text-gray-500 line-clamp-2">{refined.refinedSummary}</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" /> Full Name *
                </label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="John Smith"
                  className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-600 focus-visible:ring-green-500/50 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" /> Email *
                </label>
                <Input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-600 focus-visible:ring-green-500/50 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" /> Phone *
                </label>
                <Input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-600 focus-visible:ring-green-500/50 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" /> Home Address
                </label>
                <Input
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="123 Main St, City, ST 12345"
                  className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-600 focus-visible:ring-green-500/50 rounded-xl"
                />
              </div>
            </div>

            <Button
              onClick={handleConfirmBooking}
              disabled={!detailsValid || submitting}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full h-14 text-base disabled:opacity-40"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Confirming...
                </span>
              ) : (
                "Confirm Booking"
              )}
            </Button>

            <button
              onClick={() => setStep("providers")}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 transition-colors mx-auto"
            >
              <ArrowLeft className="h-3 w-3" /> Back
            </button>
          </div>
        )}

        {/* Step 6: Confirmed */}
        {step === "confirmed" && selectedProvider && (
          <div className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Booking Confirmed!</h2>
              <p className="text-gray-400 text-sm max-w-md">
                Your appointment request has been sent to {selectedProvider.business_name}. They'll confirm your booking shortly.
              </p>
            </div>

            {/* Booking details card */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                {selectedProvider.avatar_url ? (
                  <img src={selectedProvider.avatar_url} alt={selectedProvider.business_name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-green-400">{selectedProvider.business_name.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-white">{selectedProvider.business_name}</p>
                  <p className="text-xs text-gray-400">{selectedProvider.category || analysis?.category}</p>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-4 space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Date</span>
                  <span className="text-white font-medium">{selectedDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Time</span>
                  <span className="text-white font-medium">{selectedTime}</span>
                </div>
                {selectedOption !== null && refined?.serviceOptions[selectedOption] && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Estimate</span>
                    <span className="text-green-400 font-medium">{refined.serviceOptions[selectedOption].priceRange}</span>
                  </div>
                )}
              </div>
            </div>

            {/* App Download CTA */}
            <div className="space-y-3">
              <p className="text-xs text-gray-500 text-center uppercase tracking-wide">Track your bookings</p>
              <AppDownloadCTA variant="card" message="Download HomeBase to manage all your home services" />
            </div>

            <p className="text-xs text-gray-600 text-center max-w-sm mx-auto">
              All bookings made with your email are saved. When you download the app, your full service history and HouseFax will be ready.
            </p>

            <button
              onClick={resetAll}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 transition-colors mx-auto"
            >
              Book another service
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
