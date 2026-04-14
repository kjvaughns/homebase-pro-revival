import logo from "@/assets/logo.png";

interface AppDownloadCTAProps {
  variant?: "inline" | "sticky" | "card";
  message?: string;
}

const AppDownloadCTA = ({
  variant = "inline",
  message = "Get the full HomeBase experience in the app",
}: AppDownloadCTAProps) => {
  if (variant === "sticky") {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-background/95 backdrop-blur-md border-t border-white/10 lg:hidden">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <img src={logo} alt="HomeBase" className="w-8 h-8 rounded-lg" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">HomeBase</p>
            <p className="text-xs text-muted-foreground">Book & manage home services</p>
          </div>
          <a 
            href="https://testflight.apple.com/join/P1v4ZReq" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap"
          >
            Get App
          </a>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center space-y-4">
        <img src={logo} alt="HomeBase" className="w-12 h-12 mx-auto rounded-xl" />
        <div>
          <h3 className="font-semibold text-foreground">{message}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Save providers, book instantly, and manage your home — all in one app.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <a 
            href="https://testflight.apple.com/join/P1v4ZReq"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5 hover:bg-card/80 transition-colors"
          >
            <svg className="h-5 w-5 text-foreground" viewBox="0 0 384 512" fill="currentColor">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            <div className="text-left">
              <p className="text-[10px] text-muted-foreground leading-tight">Download on the</p>
              <p className="text-sm font-semibold leading-tight">App Store</p>
            </div>
          </a>
        </div>
      </div>
    );
  }

  // inline
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20">
      <img src={logo} alt="HomeBase" className="w-8 h-8 rounded-lg" />
      <p className="text-sm text-foreground flex-1">{message}</p>
      <a 
        href="https://testflight.apple.com/join/P1v4ZReq" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap"
      >
        Get App
      </a>
    </div>
  );
};

export default AppDownloadCTA;
