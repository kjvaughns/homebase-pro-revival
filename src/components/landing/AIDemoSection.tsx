import { useState, useRef, useCallback } from "react";
import { Home, CheckCircle2, Play, Send, ChevronRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

type TextMessage = { role: "ai" | "user"; text: string };
type ActionMessage = { role: "ai-action"; text: string; action: string };
type ConfirmMessage = { role: "confirmed"; title: string; subtitle: string };
type ChatItem = TextMessage | ActionMessage | ConfirmMessage;

const CONVERSATION: ChatItem[] = [
  { role: "user", text: "My sink is leaking" },
  {
    role: "ai",
    text: "A leaking sink can usually be caused by a few common issues such as a loose connection, a damaged washer, or a crack in the sink itself. First, try tightening any visible fittings, and check for any obvious cracks or worn parts. If you're not able to fix it or if it's a more serious issue, I recommend reaching out to a plumber for assistance.",
  },
  { role: "ai-action", text: "Find a Pro", action: "find-pro" },
  { role: "user", text: "Yes, find me a plumber" },
  {
    role: "ai",
    text: "Great! I found 3 plumbers available in your area. Based on your issue, I recommend Mike's Plumbing — they specialize in leak repairs and have a 4.9★ rating.",
  },
  { role: "user", text: "Book Mike's Plumbing" },
  {
    role: "ai",
    text: "Perfect! Mike's Plumbing has availability tomorrow morning. Kitchen sink leak repair is $80–$150 for the Basic tier. Should I lock in the 9:30 AM slot?",
  },
  { role: "user", text: "Yes, book it" },
  {
    role: "confirmed",
    title: "Booking Confirmed",
    subtitle: "Sink Leak Repair — Tomorrow 9:30 AM • Mike's Plumbing • $80–$150",
  },
];

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const TypingDots = () => (
  <div className="flex items-end gap-3 animate-message-in">
    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
      <Home className="h-4 w-4 text-primary" />
    </div>
    <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
      <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce-dot" style={{ animationDelay: "0ms" }} />
      <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce-dot" style={{ animationDelay: "150ms" }} />
      <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce-dot" style={{ animationDelay: "300ms" }} />
    </div>
  </div>
);

const AIDemoSection = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [demoComplete, setDemoComplete] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }, []);

  const runDemo = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    cancelRef.current = false;
    setShowOverlay(false);
    setMessages([]);
    setDemoComplete(false);

    for (const item of CONVERSATION) {
      if (cancelRef.current) break;

      if (item.role === "ai" || item.role === "ai-action") {
        setIsTyping(true);
        scrollToBottom();
        const delay = item.role === "ai-action" ? 600 : 1200 + item.text.length * 12;
        await wait(delay);
        if (cancelRef.current) break;
        setIsTyping(false);
        setMessages((prev) => [...prev, item]);
        scrollToBottom();
      } else if (item.role === "user") {
        await wait(800);
        if (cancelRef.current) break;
        setMessages((prev) => [...prev, item]);
        scrollToBottom();
      } else if (item.role === "confirmed") {
        setIsTyping(true);
        scrollToBottom();
        await wait(1500);
        if (cancelRef.current) break;
        setIsTyping(false);
        setMessages((prev) => [...prev, item]);
        scrollToBottom();
      }

      await wait(400);
    }

    await wait(500);
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
            Watch how HomeBase AI handles a real customer interaction — from first message to booked job.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Scenario / Outcome */}
          <div className="space-y-6">
            <div className={`rounded-2xl border border-border bg-card p-6 transition-all duration-500 ${demoComplete ? "opacity-0 h-0 overflow-hidden p-0 border-0" : ""}`}>
              <h3 className="text-lg font-bold mb-3">The Scenario</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                It's <span className="text-foreground font-medium">9:47 PM</span>. Sarah, a homeowner, opens the app and types{" "}
                <span className="text-primary font-medium">"My sink is leaking"</span>.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                No phone calls. No waiting. <span className="text-primary font-medium">HomeBase AI takes over</span> — diagnoses the issue, finds a pro, and books the job.
              </p>
            </div>

            {demoComplete && (
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 animate-message-in">
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
                    HomeBase AI diagnosed the issue, recommended a top-rated pro, quoted a price range, and confirmed the booking — all through a simple chat.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                    <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-primary" /> Pro matched</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Quote sent</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Booked</span>
                  </div>
                </div>
                <Button className="w-full rounded-xl font-semibold" size="lg">
                  Start Free →
                </Button>
              </div>
            )}
          </div>

          {/* Right: Chat UI — iPhone-style frame */}
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
                    <span className="text-xs text-primary">Online</span>
                  </div>
                </div>
              </div>

              {/* Chat body */}
              <div className="min-h-[380px] max-h-[420px] overflow-y-auto px-4 py-4 space-y-3 bg-background relative">
                {/* Overlay */}
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

                {messages.map((msg, i) => {
                  if (msg.role === "ai") {
                    return (
                      <div key={i} className="flex items-end gap-2.5 animate-message-in">
                        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 border border-primary/30">
                          <Home className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-3.5 py-2.5 max-w-[80%]">
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                      </div>
                    );
                  }
                  if (msg.role === "ai-action") {
                    return (
                      <div key={i} className="pl-9 animate-message-in">
                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-xl px-4 py-2 cursor-default">
                          <Users className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-primary">{msg.text}</span>
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    );
                  }
                  if (msg.role === "user") {
                    return (
                      <div key={i} className="flex justify-end animate-message-in">
                        <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-3.5 py-2.5 max-w-[80%]">
                          <p className="text-sm">{msg.text}</p>
                        </div>
                      </div>
                    );
                  }
                  if (msg.role === "confirmed") {
                    return (
                      <div key={i} className="animate-message-in">
                        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4 flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm">{msg.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{msg.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}

                {isTyping && <TypingDots />}
                <div ref={chatEndRef} />
              </div>

              {/* Input bar */}
              <div className="border-t border-border px-3 py-2.5 flex items-center gap-2 bg-background">
                <input
                  disabled
                  placeholder="Ask about home services..."
                  className="flex-1 bg-card border border-border rounded-full px-4 py-2 text-sm text-muted-foreground cursor-not-allowed placeholder:text-muted-foreground/50"
                />
                <button disabled className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center cursor-not-allowed">
                  <Send className="h-4 w-4 text-muted-foreground/50" />
                </button>
              </div>

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

export default AIDemoSection;
