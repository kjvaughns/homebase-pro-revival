import { openInApp } from "@/lib/deepLink";

// Sticky bottom "Open in App" bar for provider/booking pages.
export function OpenInAppBanner({
  deepLink,
  label = "View in HomeBase App",
}: {
  deepLink: string;
  label?: string;
}) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border"
      style={{ background: "#1C1C1E", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-5 py-3">
        <span className="flex items-center gap-2 text-sm text-foreground">
          <span aria-hidden="true">📱</span>
          {label}
        </span>
        <button
          onClick={() => openInApp(deepLink)}
          className="h-10 shrink-0 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
        >
          Open App
        </button>
      </div>
    </div>
  );
}
