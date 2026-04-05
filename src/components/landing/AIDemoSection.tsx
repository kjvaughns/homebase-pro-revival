import { useState, useRef, useCallback } from "react";
import { Bot, CheckCircle2, Play, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type Message = { role: "ai" | "user"; text: string };
type ChatItem = Message | { role: "confirmed"; title: string; subtitle: string };

const CONVERSATION: ChatItem[] = [
  { role: "ai", text: "Hi! I'm the HomeBase assistant for Mike's Plumbing. How can I help you tonight?" },
  { role: "user", text: "Hey, my kitchen sink is completely clogged and it's backing up. Can someone come out tomorrow?" },
  { role: "ai", text: "I'm sorry to hear that! I can get someone out to you. Is it just the kitchen sink, or are other drains affected too?" },
  { role: "user", text: "Just the kitchen sink" },
  { role: "ai", text: "Got it. What's the best time for you tomorrow — morning (8AM–12PM) or afternoon (12PM–5PM)?" },
  { role: "user", text: "Morning works best" },
  { role: "ai", text: "Perfect. I have Mike available tomorrow at 9:30 AM. Kitchen drain clearing is $125–$175 depending on the blockage. Should I lock in the 9:30 slot for you?" },
  { role: "user", text: "Yes, book it" },
  { role: "confirmed", title: "Booking Confirmed", subtitle: "Kitchen Drain Clearing — Tomorrow 9:30 AM, $125–$175" },
];

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const TypingDots = () => (
  <div className="flex items-end gap-3 animate-message-in">
    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
      <Bot className="h-4 w-4 text-primary" />
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

      if (item.role === "ai") {
        setIsTyping(true);
        scrollToBottom();
        await wait(1200 + item.text.length * 12);
        if (cancelRef.current) break;
        setIsTyping(false);
        setMessages((prev) => [...prev, item]);
        scrollToBottom();
      } else if (item.role === "user") {
        await wait(400);
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

      await wait(300);
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
                It's <span className="text-foreground font-medium">9:47 PM</span>. Sarah, a homeowner, texts your business number about a clogged kitchen drain.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                You're asleep. <span className="text-primary font-medium">HomeBase AI takes over.</span>
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
                    <p className="text-sm text-muted-foreground">While you were sleeping</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-5">
                  HomeBase AI qualified the lead, found an open slot, quoted the price range, and confirmed the booking — all in under 2 minutes.
                </p>
                <Button className="w-full rounded-xl font-semibold" size="lg">
                  Start Free →
                </Button>
              </div>
            )}
          </div>

          {/* Right: Chat UI */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden relative">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">HomeBase AI</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs text-primary">Online</span>
                </div>
              </div>
            </div>

            {/* Chat body */}
            <div className="min-h-[360px] max-h-[420px] overflow-y-auto p-4 space-y-3 relative">
              {/* Overlay */}
              {showOverlay && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-4">
                  <button
                    onClick={runDemo}
                    className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] transition-shadow"
                  >
                    <Play className="h-7 w-7 text-primary-foreground ml-1" />
                  </button>
                  <p className="text-sm font-semibold">Watch AI Book a Job</p>
                </div>
              )}

              {messages.map((msg, i) => {
                if (msg.role === "ai") {
                  return (
                    <div key={i} className="flex items-end gap-3 animate-message-in">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[80%]">
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  );
                }
                if (msg.role === "user") {
                  return (
                    <div key={i} className="flex justify-end animate-message-in">
                      <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%]">
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
            <div className="border-t border-border px-4 py-3 flex items-center gap-2">
              <input
                disabled
                placeholder="Type a message..."
                className="flex-1 bg-secondary rounded-xl px-4 py-2 text-sm text-muted-foreground cursor-not-allowed"
              />
              <button disabled className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center cursor-not-allowed">
                <Send className="h-4 w-4 text-primary/50" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDemoSection;
