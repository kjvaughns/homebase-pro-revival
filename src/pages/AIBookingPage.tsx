import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

const API_BASE = "https://api.homebaseproapp.com";

type StepKey = "describe" | "loading-analyze" | "questions" | "loading-refine" | "options" | "loading-match" | "providers";
const STEP_LABELS = ["Describe", "Questions", "Options", "Pros"] as const;

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
  { emoji: "🚿", label: "Leaky faucet or drain" },
  { emoji: "❄️", label: "AC or heating issue" },
  { emoji: "⚡", label: "Electrical problem" },
  { emoji: "🔧", label: "Appliance repair" },
  { emoji: "🌿", label: "Lawn or landscaping" },
  { emoji: "🏠", label: "Roof or gutters" },
  { emoji: "🪲", label: "Pest control" },
  { emoji: "🔨", label: "Remodel or renovation" },
];

function stepIndex(step: StepKey): number {
  if (step === "describe" || step === "loading-analyze") return 0;
  if (step === "questions" || step === "loading-refine") return 1;
  if (step === "options" || step === "loading-match") return 2;
  return 3;
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

function AuthGate() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-md w-full text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Find the Right Pro, Instantly</h2>
        <p className="text-gray-400 text-sm">
          Our AI analyzes your home problem and matches you with verified local professionals.
        </p>
        <div className="flex flex-col gap-3 pt-2">
          <Link to="/#">
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full">
              Create Free Account
            </Button>
          </Link>
          <Link to="/#">
            <Button variant="outline" className="w-full rounded-full border-gray-700 text-gray-300 hover:text-white">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AIBookingPage() {
  const [session, setSession] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [step, setStep] = useState<StepKey>("describe");
  const [problemText, setProblemText] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [refined, setRefined] = useState<RefinedAnalysis | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [providers, setProviders] = useState<MatchedProvider[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "AI Home Assistant — HomeBase";
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthChecked(true);
    });
  }, []);

  const apiCall = useCallback(
    async (path: string, body: any) => {
      setError(null);
      const token = session?.access_token;
      const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      return res.json();
    },
    [session]
  );

  const handleAnalyze = async () => {
    setStep("loading-analyze");
    try {
      const result = await apiCall("/api/intake/analyze", { problemText });
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
      const result = await apiCall("/api/intake/refine", {
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
    setStep("loading-match");
    try {
      const result = await apiCall("/api/intake/match-providers", { category: analysis.category });
      setProviders(result);
      setStep("providers");
    } catch {
      setError("Something went wrong finding providers. Please try again.");
      setStep("options");
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
  };

  const allAnswered = analysis?.questions.every((q) => {
    const a = answers[q.id];
    if (a === undefined || a === "") return false;
    if (Array.isArray(a) && a.length === 0) return false;
    return true;
  });

  if (!authChecked) return null;

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
        {!session ? (
          <AuthGate />
        ) : (
          <>
            <StepIndicator step={step} />

            {error && (
              <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* Step 1: Describe */}
            {step === "describe" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-white">What's going on at your home?</h1>
                  <p className="text-gray-400 text-sm mt-1">Describe it in your own words — our AI handles the rest.</p>
                </div>
                <Textarea
                  value={problemText}
                  onChange={(e) => setProblemText(e.target.value)}
                  placeholder="e.g. My kitchen sink has been slowly draining for two weeks and now barely drains at all..."
                  className="min-h-[120px] bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 focus-visible:ring-green-500/50"
                />
                <div className="flex flex-wrap gap-2">
                  {QUICK_FILLS.map((qf) => (
                    <button
                      key={qf.label}
                      onClick={() => setProblemText(qf.label)}
                      className="text-xs px-3 py-1.5 rounded-full bg-gray-800 border border-gray-700 text-gray-400 hover:border-green-500 hover:text-green-400 transition-colors"
                    >
                      {qf.emoji} {qf.label}
                    </button>
                  ))}
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={!problemText.trim()}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full h-12 text-base disabled:opacity-40"
                >
                  Analyze My Problem →
                </Button>
              </div>
            )}

            {step === "loading-analyze" && <LoadingState message="Our AI is analyzing your problem..." />}

            {/* Step 2: Questions */}
            {step === "questions" && analysis && (
              <div className="space-y-6">
                {/* AI Summary */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 border-l-4 border-l-green-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">{analysis.category}</Badge>
                    <span className="text-xs text-gray-500">Est. {analysis.estimatedPriceRange}</span>
                  </div>
                  <p className="text-sm text-gray-300">{analysis.summary}</p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">A few quick questions</h2>
                </div>

                {analysis.questions.map((q) => (
                  <div key={q.id} className="space-y-2">
                    <p className="text-sm font-medium text-white">{q.question}</p>

                    {q.type === "yes_no" && (
                      <div className="flex gap-2">
                        {["Yes", "No"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                              answers[q.id] === opt
                                ? "border-green-500 bg-green-500/10 text-green-400"
                                : "border-gray-700 bg-gray-800 text-gray-400 hover:border-green-500 hover:text-green-400"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {q.type === "single_choice" && q.options && (
                      <div className="flex flex-wrap gap-2">
                        {q.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                              answers[q.id] === opt
                                ? "border-green-500 bg-green-500/10 text-green-400"
                                : "border-gray-700 bg-gray-800 text-gray-400 hover:border-green-500 hover:text-green-400"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {q.type === "multi_choice" && q.options && (
                      <div className="flex flex-wrap gap-2">
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
                              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                                selected
                                  ? "border-green-500 bg-green-500/10 text-green-400"
                                  : "border-gray-700 bg-gray-800 text-gray-400 hover:border-green-500 hover:text-green-400"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {q.type === "number" && (
                      <Input
                        type="number"
                        value={(answers[q.id] as string) ?? ""}
                        onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                        className="max-w-[200px] bg-gray-900 border-gray-800 text-white focus-visible:ring-green-500/50"
                      />
                    )}

                    {q.type === "text" && (
                      <Input
                        value={(answers[q.id] as string) ?? ""}
                        onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                        className="bg-gray-900 border-gray-800 text-white focus-visible:ring-green-500/50"
                      />
                    )}
                  </div>
                ))}

                <Button
                  onClick={handleRefine}
                  disabled={!allAnswered}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full h-12 text-base disabled:opacity-40"
                >
                  See My Options →
                </Button>
              </div>
            )}

            {step === "loading-refine" && <LoadingState message="Refining your estimate..." />}

            {/* Step 3: Options */}
            {step === "options" && refined && (
              <div className="space-y-6">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-3">
                  <p className="text-sm text-gray-300">{refined.refinedSummary}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">{refined.severity}</Badge>
                    <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30 text-xs">{refined.recommendedUrgency}</Badge>
                    <span className="text-xs text-gray-500">Est. {refined.timeEstimate}</span>
                  </div>
                </div>

                {refined.scopeOfWork.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-white">Scope of work</h3>
                    <ul className="space-y-1.5">
                      {refined.scopeOfWork.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-white">Service options</h3>
                  {refined.serviceOptions.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedOption(i)}
                      className={`w-full text-left bg-gray-900 rounded-xl p-5 border transition-colors relative ${
                        selectedOption === i ? "border-green-500 bg-green-500/5" : "border-gray-800 hover:border-gray-700"
                      }`}
                    >
                      {opt.recommended && (
                        <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                          Recommended
                        </span>
                      )}
                      <p className="font-semibold text-white text-sm">{opt.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{opt.description}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-lg font-bold text-green-400">{opt.priceRange}</span>
                        <span className="text-xs text-gray-500">{opt.timeEstimate}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <Button
                  onClick={handleMatchProviders}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full h-12 text-base"
                >
                  Find Matching Pros →
                </Button>
              </div>
            )}

            {step === "loading-match" && <LoadingState message="Finding the best pros near you..." />}

            {/* Step 4: Providers */}
            {step === "providers" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Your top matches</h2>
                  {selectedOption !== null && refined && (
                    <p className="text-gray-400 text-sm mt-1">For: {refined.serviceOptions[selectedOption]?.title}</p>
                  )}
                </div>

                {providers.length === 0 ? (
                  <div className="text-center py-16 text-gray-500 text-sm">
                    No providers found yet — check back soon.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {providers.slice(0, 5).map((p) => (
                      <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-start gap-4">
                        {p.avatar_url ? (
                          <img src={p.avatar_url} alt={p.business_name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                            <span className="text-sm font-bold text-green-400">{p.business_name.charAt(0)}</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-white text-sm truncate">{p.business_name}</p>
                            {p.verified && <ShieldCheck className="h-4 w-4 text-green-500 shrink-0" />}
                          </div>
                          <p className="text-xs text-gray-500">{p.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < Math.round(p.rating) ? "fill-green-500 text-green-500" : "text-gray-700"}`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">({p.review_count})</span>
                            <Badge className="bg-gray-800 text-gray-400 border-gray-700 text-[10px]">{p.category}</Badge>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Link to={`/providers/${p.id}`}>
                              <Button variant="outline" size="sm" className="rounded-full border-gray-700 text-gray-300 hover:text-white text-xs h-8">
                                View Profile
                              </Button>
                            </Link>
                            <Link to={p.slug ? `/book/${p.slug}` : `/book/${p.id}`}>
                              <Button size="sm" className="rounded-full bg-green-500 hover:bg-green-600 text-white text-xs h-8">
                                Book Now
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button onClick={resetAll} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 transition-colors mx-auto">
                  <ArrowLeft className="h-3 w-3" /> Start over
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
