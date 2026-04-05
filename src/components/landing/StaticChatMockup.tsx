import { Home, ChevronLeft, ChevronRight, Users, Send } from "lucide-react";

const StaticChatMockup = () => (
  <div className="w-full bg-background flex flex-col text-[10px] leading-tight">
    {/* Header */}
    <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
      <ChevronLeft className="h-3.5 w-3.5 text-primary" />
      <span className="text-xs font-medium text-foreground">Main</span>
    </div>

    {/* Chat body */}
    <div className="flex-1 flex flex-col gap-2.5 px-3 py-3 overflow-hidden">
      {/* User message */}
      <div className="flex justify-end">
        <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-3 py-2 max-w-[75%]">
          <p className="text-[10px]">My sink is leaking</p>
        </div>
      </div>

      {/* AI response */}
      <div className="flex items-start gap-2">
        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Home className="h-3 w-3 text-primary" />
        </div>
        <div className="bg-secondary rounded-2xl rounded-bl-sm px-3 py-2 max-w-[80%]">
          <p className="text-[10px] text-foreground/90">
            A leaking sink can usually be caused by a few common issues such as a loose connection, a damaged washer, or a crack in the sink itself. First, try tightening any visible fittings, and check for any obvious cracks or worn parts.
          </p>
        </div>
      </div>

      {/* Find a Pro action */}
      <div className="flex items-start gap-2">
        <div className="w-6 h-6 flex-shrink-0" />
        <button className="flex items-center gap-1.5 border border-primary/40 text-primary rounded-xl px-3 py-1.5 bg-primary/5">
          <Users className="h-3 w-3" />
          <span className="text-[10px] font-medium">Find a Pro</span>
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>

    {/* Input bar */}
    <div className="px-3 py-2 border-t border-border">
      <div className="flex items-center gap-2 bg-secondary rounded-full px-3 py-1.5">
        <span className="text-[9px] text-muted-foreground flex-1">Ask about home services...</span>
        <Send className="h-3 w-3 text-primary" />
      </div>
    </div>
  </div>
);

export default StaticChatMockup;
