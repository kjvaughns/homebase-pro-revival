import { useState, useRef, useCallback, useEffect } from "react";
import { Home, CheckCircle2, Play, Clock, MapPin, User, Wrench, DollarSign, Star, CalendarCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Step = 0 | 1 | 2 | 3;

const CATEGORIES = ["Plumbing", "Electrical", "HVAC", "Cleaning", "Handyman", "Painting"];
const ISSUE_TEXT = "My kitchen sink is leaking under the cabinet";
const NAME_TEXT = "Sarah Johnson";
const ADDRESS_TEXT = "123 Oak Street";

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

const AIDemoSection = () => {
  const [step, setStep] = useState<Step>(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const [demoComplete, setDemoComplete] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const cancelRef = useRef(false);

  // Step 1 sub-states
  const [categorySelected, setCategorySelected] = useState(false);
  const [showIssue, setShowIssue] = useState(false);
  const [typingIssue, setTypingIssue] = useState(false);
  const [showName, setShowName] = useState(false);
  const [typingName, setTypingName] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [timeSelected, setTimeSelected] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [typingAddress, setTypingAddress] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);

  // Step 2 sub-states
  const [analyzing, setAnalyzing] = useState(false);
  const [summaryVisible, setSummaryVisible] = useState(false);

  const issueText = useTypewriter(ISSUE_TEXT, typingIssue, 35);
  const nameText = useTypewriter(NAME_TEXT, typingName, 50);
  const addressText = useTypewriter(ADDRESS_TEXT, typingAddress, 50);

  const contentRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (contentRef.current) contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }, 50);
  }, []);

  const runDemo = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    cancelRef.current = false;
    setShowOverlay(false);
    setDemoComplete(false);

    // Reset all
    setCategorySelected(false); setShowIssue(false); setTypingIssue(false);
    setShowName(false); setTypingName(false); setShowTime(false); setTimeSelected(false);
    setShowAddress(false); setTypingAddress(false); setSubmitPressed(false);
    setAnalyzing(false); setSummaryVisible(false);

    // Step 1: Intake Form
    setStep(1);
    await wait(600);
    if (cancelRef.current) return;

    // Select category
    setCategorySelected(true);
    scrollToBottom();
    await wait(800);
    if (cancelRef.current) return;

    // Show & type issue
    setShowIssue(true);
    scrollToBottom();
    await wait(300);
    setTypingIssue(true);
    await wait(ISSUE_TEXT.length * 35 + 400);
    if (cancelRef.current) return;
    scrollToBottom();

    // Show & type name
    setShowName(true);
    scrollToBottom();
    await wait(300);
    setTypingName(true);
    await wait(NAME_TEXT.length * 50 + 400);
    if (cancelRef.current) return;

    // Show & select time
    setShowTime(true);
    scrollToBottom();
    await wait(600);
    setTimeSelected(true);
    await wait(600);
    if (cancelRef.current) return;

    // Show & type address
    setShowAddress(true);
    scrollToBottom();
    await wait(300);
    setTypingAddress(true);
    await wait(ADDRESS_TEXT.length * 50 + 400);
    if (cancelRef.current) return;
    scrollToBottom();

    // Submit press
    await wait(500);
    setSubmitPressed(true);
    await wait(800);
    if (cancelRef.current) return;

    // Step 2: AI Analysis
    setStep(2);
    setAnalyzing(true);
    await wait(2500);
    if (cancelRef.current) return;
    setAnalyzing(false);
    setSummaryVisible(true);
    scrollToBottom();
    await wait(3000);
    if (cancelRef.current) return;

    // Step 3: Confirmed
    setStep(3);
    await wait(1000);
    setDemoComplete(true);
    setIsRunning(false);
  }, [isRunning, scrollToBottom]);

  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Live Demo
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">See It In Action</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Watch how HomeBase AI handles a real service request — from intake form to booked job.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Scenario / Outcome */}
          <div className="space-y-6">
            <div className={`rounded-2xl border border-border bg-card p-6 transition-all duration-500 ${demoComplete ? "opacity-0 h-0 overflow-hidden p-0 border-0" : ""}`}>
              <h3 className="text-lg font-bold mb-3">The Scenario</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                It's <span className="text-foreground font-medium">9:47 PM</span>. Sarah opens the HomeBase app and submits a service request for a{" "}
                <span className="text-primary font-medium">leaking kitchen sink</span>.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                She fills out the intake form, and <span className="text-primary font-medium">HomeBase AI takes over</span> — analyzes the issue, finds the best pro, generates a quote, and books the job instantly.
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
                    HomeBase AI analyzed the intake form, diagnosed the issue, matched a top-rated pro, generated a quote, and confirmed the booking — all automatically.
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
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background">
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">HomeBase AI</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-xs text-primary">
                      {step === 2 && analyzing ? "Analyzing..." : "Online"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content area */}
              <div ref={contentRef} className="min-h-[380px] max-h-[420px] overflow-y-auto px-4 py-4 bg-background relative">
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

                {/* Step 1: Intake Form */}
                {step === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Service Type</p>
                      <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => (
                          <span
                            key={cat}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-300 ${
                              cat === "Plumbing" && categorySelected
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-card border-border text-muted-foreground"
                            }`}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {showIssue && (
                      <div className="animate-fade-in">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Describe Your Issue</p>
                        <div className="bg-card border border-border rounded-xl px-3 py-2.5 min-h-[60px]">
                          <p className="text-sm text-foreground">{issueText}<span className="animate-pulse">|</span></p>
                        </div>
                      </div>
                    )}

                    {showName && (
                      <div className="animate-fade-in">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Your Name</p>
                        <div className="bg-card border border-border rounded-xl px-3 py-2.5 flex items-center gap-2">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                          <p className="text-sm text-foreground">{nameText}<span className="animate-pulse">|</span></p>
                        </div>
                      </div>
                    )}

                    {showTime && (
                      <div className="animate-fade-in">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Preferred Time</p>
                        <div className="flex gap-2">
                          {["ASAP", "Tomorrow AM", "This Week"].map((t) => (
                            <span
                              key={t}
                              className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-300 ${
                                t === "Tomorrow AM" && timeSelected
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-card border-border text-muted-foreground"
                              }`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {showAddress && (
                      <div className="animate-fade-in">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Address</p>
                        <div className="bg-card border border-border rounded-xl px-3 py-2.5 flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          <p className="text-sm text-foreground">{addressText}<span className="animate-pulse">|</span></p>
                        </div>
                      </div>
                    )}

                    {showAddress && (
                      <button
                        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                          submitPressed
                            ? "bg-primary/80 text-primary-foreground scale-95"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        Submit Request
                      </button>
                    )}
                  </div>
                )}

                {/* Step 2: AI Analysis */}
                {step === 2 && (
                  <div className="flex flex-col items-center justify-center min-h-[360px]">
                    {analyzing ? (
                      <div className="flex flex-col items-center gap-4 animate-fade-in">
                        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                          <Loader2 className="h-7 w-7 text-primary animate-spin" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold">AI is analyzing your request...</p>
                          <p className="text-xs text-muted-foreground mt-1">Matching you with the best pro</p>
                        </div>
                      </div>
                    ) : summaryVisible ? (
                      <div className="w-full space-y-3 animate-fade-in">
                        <div className="text-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                            <Home className="h-5 w-5 text-primary" />
                          </div>
                          <p className="text-xs font-semibold text-primary uppercase tracking-wider">AI Analysis Complete</p>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-3 space-y-3">
                          <div className="flex items-start gap-2.5">
                            <Wrench className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground">Issue Identified</p>
                              <p className="text-sm">Kitchen sink leak — likely loose P-trap or worn washer</p>
                            </div>
                          </div>
                          <div className="border-t border-border" />
                          <div className="flex items-start gap-2.5">
                            <Wrench className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground">Recommended Service</p>
                              <p className="text-sm">Leak Diagnosis & Repair</p>
                            </div>
                          </div>
                          <div className="border-t border-border" />
                          <div className="flex items-start gap-2.5">
                            <DollarSign className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground">Estimated Cost</p>
                              <p className="text-sm font-semibold text-primary">$80 – $150</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-primary/5 border border-primary/30 rounded-xl p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold">Mike's Plumbing</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <div className="flex items-center gap-0.5">
                                  <Star className="h-3 w-3 text-primary fill-primary" />
                                  <span className="text-xs font-medium">4.9</span>
                                </div>
                                <span className="text-xs text-muted-foreground">· 127 reviews</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <CalendarCheck className="h-3.5 w-3.5 text-primary" />
                            <span>Available Tomorrow 9:30 AM</span>
                          </div>
                        </div>

                        <button className="w-full py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground">
                          Confirm Booking
                        </button>
                      </div>
                    ) : null}
                  </div>
                )}

                {/* Step 3: Booking Confirmed */}
                {step === 3 && (
                  <div className="flex flex-col items-center justify-center min-h-[360px] animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-1">Booking Confirmed</h3>
                    <p className="text-xs text-muted-foreground mb-6">You're all set!</p>

                    <div className="w-full bg-card border border-border rounded-xl p-4 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Service</span>
                        <span className="text-sm font-medium">Sink Leak Repair</span>
                      </div>
                      <div className="border-t border-border" />
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">When</span>
                        <span className="text-sm font-medium">Tomorrow 9:30 AM</span>
                      </div>
                      <div className="border-t border-border" />
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Provider</span>
                        <span className="text-sm font-medium">Mike's Plumbing</span>
                      </div>
                      <div className="border-t border-border" />
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Est. Cost</span>
                        <span className="text-sm font-semibold text-primary">$80 – $150</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mt-4 text-center">
                      You'll receive a confirmation text shortly.
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom bar */}
              <div className="flex justify-center pb-2 pt-1 bg-background border-t border-border">
                <div className="w-32 h-1 bg-muted-foreground/30 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDemoSection;
