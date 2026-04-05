import { useState, useRef, useCallback, useEffect } from "react";
import { Home, CheckCircle2, Play, ChevronRight, User, Wrench, DollarSign, Star, CalendarCheck, Loader2, Send, Users, MessageSquare, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

type Step = 0 | 1 | 2 | 3 | 4 | 5;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const useTypewriter = (text: string, active: boolean, speed = 40) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, active, speed]);
  return displayed;
};

const TypingDots = () => (
  <div className="flex items-end gap-2.5">
    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 border border-primary/30">
      <Home className="h-3.5 w-3.5 text-primary" />
    </div>
    <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-3.5 py-2.5 flex gap-1 items-center">
      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "150ms" }} />
      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  </div>
);

const AIDemoSection = () => {
  const [step, setStep] = useState<Step>(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const [demoComplete, setDemoComplete] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const cancelRef = useRef(false);

  // Step 1: Chat sub-states
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([]);
  const [showTypingDots, setShowTypingDots] = useState(false);
  const [showStartIntake, setShowStartIntake] = useState(false);

  // Step 2: Questionnaire sub-states
  const [q1Visible, setQ1Visible] = useState(false);
  const [q1Answered, setQ1Answered] = useState(false);
  const [q2Visible, setQ2Visible] = useState(false);
  const [q2Answered, setQ2Answered] = useState(false);
  const [q3Visible, setQ3Visible] = useState(false);
  const [q3Answered, setQ3Answered] = useState(false);
  const [q4Visible, setQ4Visible] = useState(false);
  const [q4Answered, setQ4Answered] = useState(false);
  const [showSubmitQ, setShowSubmitQ] = useState(false);
  const [submitQPressed, setSubmitQPressed] = useState(false);

  // Step 3: AI analysis
  const [analyzing, setAnalyzing] = useState(false);

  // Step 4: Results
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [showEstimate, setShowEstimate] = useState(false);
  const [showPro, setShowPro] = useState(false);
  const [showBookBtn, setShowBookBtn] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (contentRef.current) contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }, 60);
  }, []);

  const runDemo = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    cancelRef.current = false;
    setShowOverlay(false);
    setDemoComplete(false);

    // Reset all
    setChatMessages([]); setShowTypingDots(false); setShowStartIntake(false);
    setQ1Visible(false); setQ1Answered(false); setQ2Visible(false); setQ2Answered(false);
    setQ3Visible(false); setQ3Answered(false); setQ4Visible(false); setQ4Answered(false);
    setShowSubmitQ(false); setSubmitQPressed(false);
    setAnalyzing(false);
    setShowDiagnosis(false); setShowEstimate(false); setShowPro(false); setShowBookBtn(false);

    const c = cancelRef;

    // === STEP 1: AI Chat ===
    setStep(1);
    await wait(500);

    // User message
    setChatMessages([{ role: "user", text: "My sink is leaking" }]);
    scrollToBottom();
    await wait(800);
    if (c.current) return;

    // AI typing
    setShowTypingDots(true);
    scrollToBottom();
    await wait(1800);
    if (c.current) return;
    setShowTypingDots(false);

    // AI response
    setChatMessages(prev => [...prev, {
      role: "ai",
      text: "I can help with that! Let me gather a few details so I can diagnose the issue, give you a price estimate, and match you with the right pro."
    }]);
    scrollToBottom();
    await wait(2000);
    if (c.current) return;

    // Show "Start Smart Intake" button
    setShowStartIntake(true);
    scrollToBottom();
    await wait(1500);
    if (c.current) return;

    // === STEP 2: Questionnaire ===
    setStep(2);
    await wait(400);

    // Q1
    setQ1Visible(true);
    scrollToBottom();
    await wait(1200);
    if (c.current) return;
    setQ1Answered(true);
    scrollToBottom();
    await wait(600);

    // Q2
    setQ2Visible(true);
    scrollToBottom();
    await wait(1200);
    if (c.current) return;
    setQ2Answered(true);
    scrollToBottom();
    await wait(600);

    // Q3
    setQ3Visible(true);
    scrollToBottom();
    await wait(1200);
    if (c.current) return;
    setQ3Answered(true);
    scrollToBottom();
    await wait(600);

    // Q4
    setQ4Visible(true);
    scrollToBottom();
    await wait(1200);
    if (c.current) return;
    setQ4Answered(true);
    scrollToBottom();
    await wait(600);

    // Submit
    setShowSubmitQ(true);
    scrollToBottom();
    await wait(800);
    if (c.current) return;
    setSubmitQPressed(true);
    await wait(600);

    // === STEP 3: AI Analyzing ===
    setStep(3);
    setAnalyzing(true);
    await wait(2800);
    if (c.current) return;
    setAnalyzing(false);

    // === STEP 4: Results ===
    setStep(4);
    await wait(300);

    setShowDiagnosis(true);
    scrollToBottom();
    await wait(1000);
    if (c.current) return;

    setShowEstimate(true);
    scrollToBottom();
    await wait(1000);
    if (c.current) return;

    setShowPro(true);
    scrollToBottom();
    await wait(1000);
    if (c.current) return;

    setShowBookBtn(true);
    scrollToBottom();
    await wait(1500);
    if (c.current) return;

    // === STEP 5: Confirmed ===
    setStep(5);
    await wait(800);
    setDemoComplete(true);
    setIsRunning(false);
  }, [isRunning, scrollToBottom]);

  // Step indicator
  const stepLabels = [
    { icon: MessageSquare, label: "AI Chat" },
    { icon: ClipboardList, label: "Smart Intake" },
    { icon: Loader2, label: "AI Analysis" },
    { icon: CheckCircle2, label: "Book" },
  ];
  const activeStepIndex = step <= 1 ? 0 : step === 2 ? 1 : step === 3 ? 2 : 3;

  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Live Demo
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">See It In Action</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Watch how HomeBase AI handles a real service request — from first message to booked job.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Scenario / Outcome */}
          <div className="space-y-6">
            <div className={`rounded-2xl border border-border bg-card p-6 transition-all duration-500 ${demoComplete ? "opacity-0 h-0 overflow-hidden p-0 border-0" : ""}`}>
              <h3 className="text-lg font-bold mb-3">The Scenario</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                It's <span className="text-foreground font-medium">9:47 PM</span>. Sarah opens HomeBase and tells the AI her{" "}
                <span className="text-primary font-medium">sink is leaking</span>.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                The AI guides her through a <span className="text-primary font-medium">smart intake questionnaire</span> to understand the issue. Then it:
              </p>
              <ul className="text-muted-foreground text-sm mt-2 space-y-1.5 ml-1">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" /> Diagnoses the problem</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" /> Generates a price estimate</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" /> Creates a full job summary for the pro</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" /> Matches & books the right provider</li>
              </ul>
              <p className="text-muted-foreground text-xs mt-3 italic">
                No back-and-forth. The provider gets a complete picture before they even show up.
              </p>
            </div>

            {demoComplete && (
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Job Booked ✓</h3>
                    <p className="text-sm text-muted-foreground">In under 2 minutes</p>
                  </div>
                </div>
                <div className="space-y-2 mb-5">
                  <p className="text-sm text-muted-foreground">
                    The AI set proper expectations with a diagnosis and estimate. The provider received a full job summary — no phone tag, no guesswork, no wasted time.
                  </p>
                </div>
                <Button className="w-full rounded-xl font-semibold" size="lg">
                  Start Free →
                </Button>
              </div>
            )}
          </div>

          {/* Right: Phone Frame */}
          <div className="flex justify-center">
            <div className="w-full max-w-[380px] rounded-[2rem] border-2 border-border bg-background overflow-hidden shadow-2xl shadow-black/40 relative">
              {/* Notch */}
              <div className="flex justify-center pt-2 pb-1 bg-background">
                <div className="w-28 h-6 bg-card rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-background">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Home className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">HomeBase AI</p>
                  <span className="text-[10px] text-primary">Online</span>
                </div>
              </div>

              {/* Step indicator */}
              {step >= 1 && (
                <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/50">
                  {stepLabels.map((s, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition-all duration-300 ${
                        i < activeStepIndex ? "bg-primary text-primary-foreground" :
                        i === activeStepIndex ? "bg-primary/20 text-primary border border-primary/50" :
                        "bg-card text-muted-foreground border border-border"
                      }`}>
                        {i < activeStepIndex ? <CheckCircle2 className="h-3 w-3" /> : i + 1}
                      </div>
                      <span className={`text-[9px] hidden sm:inline ${i === activeStepIndex ? "text-primary font-medium" : "text-muted-foreground"}`}>
                        {s.label}
                      </span>
                      {i < stepLabels.length - 1 && <div className="w-3 sm:w-6 h-px bg-border mx-0.5" />}
                    </div>
                  ))}
                </div>
              )}

              {/* Content area */}
              <div ref={contentRef} className="min-h-[340px] max-h-[380px] overflow-y-auto px-4 py-3 bg-background relative">
                {/* Step 0: Play Overlay */}
                {showOverlay && (
                  <div className="absolute inset-0 bg-background/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-4">
                    <button
                      onClick={runDemo}
                      className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_hsl(142_71%_45%/0.4)] hover:shadow-[0_0_50px_hsl(142_71%_45%/0.6)] transition-all hover:scale-105"
                    >
                      <Play className="h-7 w-7 text-primary-foreground ml-1" />
                    </button>
                    <p className="text-sm font-semibold">Watch AI Book a Job</p>
                  </div>
                )}

                {/* Step 1: AI Chat */}
                {step === 1 && (
                  <div className="space-y-3 animate-fade-in">
                    {chatMessages.map((msg, i) =>
                      msg.role === "user" ? (
                        <div key={i} className="flex justify-end animate-fade-in">
                          <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-3.5 py-2 max-w-[80%]">
                            <p className="text-sm">{msg.text}</p>
                          </div>
                        </div>
                      ) : (
                        <div key={i} className="flex items-end gap-2 animate-fade-in">
                          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 border border-primary/30">
                            <Home className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-3.5 py-2.5 max-w-[80%]">
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                          </div>
                        </div>
                      )
                    )}
                    {showTypingDots && <TypingDots />}
                    {showStartIntake && (
                      <div className="pl-9 animate-fade-in">
                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-xl px-4 py-2 cursor-default">
                          <ClipboardList className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-primary">Start Smart Intake</span>
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Questionnaire */}
                {step === 2 && (
                  <div className="space-y-3 animate-fade-in">
                    <p className="text-xs text-center text-muted-foreground mb-2">Smart Intake — 4 quick questions</p>

                    {q1Visible && (
                      <QuestionCard
                        num={1}
                        question="Where is the leak?"
                        options={["Kitchen sink", "Bathroom sink", "Bathtub", "Other"]}
                        selected={q1Answered ? 0 : undefined}
                      />
                    )}
                    {q2Visible && (
                      <QuestionCard
                        num={2}
                        question="How severe is the leak?"
                        options={["Slow drip", "Steady stream", "Only when faucet is on"]}
                        selected={q2Answered ? 0 : undefined}
                      />
                    )}
                    {q3Visible && (
                      <QuestionCard
                        num={3}
                        question="How long has this been happening?"
                        options={["Just started", "A few days", "Over a week"]}
                        selected={q3Answered ? 0 : undefined}
                      />
                    )}
                    {q4Visible && (
                      <QuestionCard
                        num={4}
                        question="When are you available?"
                        options={["ASAP", "Tomorrow morning", "This week"]}
                        selected={q4Answered ? 1 : undefined}
                      />
                    )}

                    {showSubmitQ && (
                      <button
                        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 mt-2 ${
                          submitQPressed
                            ? "bg-primary/80 text-primary-foreground scale-95"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        Submit Answers
                      </button>
                    )}
                  </div>
                )}

                {/* Step 3: AI Analyzing */}
                {step === 3 && (
                  <div className="flex flex-col items-center justify-center min-h-[320px] animate-fade-in">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <Loader2 className="h-7 w-7 text-primary animate-spin" />
                    </div>
                    <p className="text-sm font-semibold">AI is analyzing your answers...</p>
                    <p className="text-xs text-muted-foreground mt-1.5 text-center max-w-[250px]">
                      Diagnosing the issue, estimating cost, and finding the best pro for you
                    </p>
                  </div>
                )}

                {/* Step 4: Results */}
                {step === 4 && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="text-center mb-2">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider">AI Job Summary</p>
                    </div>

                    {showDiagnosis && (
                      <div className="bg-card border border-border rounded-xl p-3 animate-fade-in">
                        <div className="flex items-start gap-2.5">
                          <Wrench className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-[10px] font-semibold text-muted-foreground uppercase">Diagnosis</p>
                            <p className="text-sm mt-0.5">Kitchen sink leak — likely loose P-trap connection or worn washer. Slow drip under cabinet, started recently.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {showEstimate && (
                      <div className="bg-card border border-border rounded-xl p-3 animate-fade-in">
                        <div className="flex items-start gap-2.5">
                          <DollarSign className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-[10px] font-semibold text-muted-foreground uppercase">Estimated Cost</p>
                            <p className="text-lg font-bold text-primary mt-0.5">$80 – $150</p>
                            <p className="text-[10px] text-muted-foreground">Leak Diagnosis & Repair · Small job</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {showPro && (
                      <div className="bg-primary/5 border border-primary/30 rounded-xl p-3 animate-fade-in">
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-2">Recommended Pro</p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold">Mike's Plumbing</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Star className="h-3 w-3 text-primary fill-primary" />
                              <span className="text-xs font-medium">4.9</span>
                              <span className="text-[10px] text-muted-foreground">· 127 reviews</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <CalendarCheck className="h-3.5 w-3.5 text-primary" />
                          <span>Available Tomorrow 9:30 AM</span>
                        </div>
                      </div>
                    )}

                    {showBookBtn && (
                      <button className="w-full py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground animate-fade-in">
                        Book Mike's Plumbing →
                      </button>
                    )}
                  </div>
                )}

                {/* Step 5: Confirmed */}
                {step === 5 && (
                  <div className="flex flex-col items-center justify-center min-h-[320px] animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-1">Booking Confirmed</h3>
                    <p className="text-xs text-muted-foreground mb-5">You're all set!</p>

                    <div className="w-full bg-card border border-border rounded-xl p-3.5 space-y-2">
                      {[
                        ["Service", "Sink Leak Repair"],
                        ["When", "Tomorrow 9:30 AM"],
                        ["Provider", "Mike's Plumbing"],
                        ["Est. Cost", "$80 – $150"],
                      ].map(([label, value], i) => (
                        <div key={i}>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-muted-foreground">{label}</span>
                            <span className={`text-xs font-medium ${label === "Est. Cost" ? "text-primary" : ""}`}>{value}</span>
                          </div>
                          {i < 3 && <div className="border-t border-border mt-2" />}
                        </div>
                      ))}
                    </div>

                    <p className="text-[10px] text-muted-foreground mt-3 text-center">
                      The provider has received a full AI job summary with your answers.
                    </p>
                  </div>
                )}
              </div>

              {/* Input bar (chat step only) */}
              {step === 1 && (
                <div className="border-t border-border px-3 py-2 flex items-center gap-2 bg-background">
                  <div className="flex-1 bg-card border border-border rounded-full px-3.5 py-2 text-xs text-muted-foreground/50">
                    Ask about home services...
                  </div>
                  <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center">
                    <Send className="h-3.5 w-3.5 text-muted-foreground/50" />
                  </div>
                </div>
              )}

              {/* Bottom bar */}
              <div className="flex justify-center pb-2 pt-1 bg-background">
                <div className="w-32 h-1 bg-muted-foreground/30 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable question card
const QuestionCard = ({ num, question, options, selected }: {
  num: number;
  question: string;
  options: string[];
  selected?: number;
}) => (
  <div className="bg-card border border-border rounded-xl p-3 animate-fade-in">
    <p className="text-xs font-semibold text-foreground mb-2">
      <span className="text-primary mr-1.5">{num}.</span>{question}
    </p>
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt, i) => (
        <span
          key={i}
          className={`text-[11px] px-2.5 py-1 rounded-full border transition-all duration-300 ${
            selected === i
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background border-border text-muted-foreground"
          }`}
        >
          {opt}
        </span>
      ))}
    </div>
  </div>
);

export default AIDemoSection;
