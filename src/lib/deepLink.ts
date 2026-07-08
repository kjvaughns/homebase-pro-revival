export const APP_STORE_URL = "https://apps.apple.com/app/homebase-pro-app/id6760936703";
export const TESTFLIGHT_URL = APP_STORE_URL;
export const APP_STORE_ID = "6760936703";

// Custom URL scheme for the HomeBase iOS app (bundle com.homebasepro.app).
// Route shapes + param names are kept in sync with the app's linking config
// (artifacts/homebase/app/index.tsx) and the screens they open:
//   provider  -> ProviderProfile  (reads route.params.providerId)
//   book      -> SimpleBooking     (reads route.params.providerId)
//   marketplace -> ProviderList    (reads route.params.categoryId)
export const deepLinks = {
  provider: (providerId: string) =>
    `homebase://provider?providerId=${encodeURIComponent(providerId)}`,
  book: (providerId: string) =>
    `homebase://SimpleBooking?providerId=${encodeURIComponent(providerId)}`,
  marketplace: (categoryId?: string) =>
    categoryId
      ? `homebase://marketplace?categoryId=${encodeURIComponent(categoryId)}`
      : `homebase://marketplace`,
};

// Open the app via its scheme; fall back to the App Store if it isn't installed.
export function openInApp(deepLinkUrl: string): void {
  tryDeepLink(deepLinkUrl, APP_STORE_URL, 1500);
}

export function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

export function isAndroid(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
}

export function isMobile(): boolean {
  return isIOS() || isAndroid();
}

/**
 * Attempts to open a deep link, falling back to a URL after timeoutMs if the
 * app didn't open (page still visible).
 */
export function tryDeepLink(
  deepLinkUrl: string,
  fallbackUrl: string,
  timeoutMs = 1500,
): () => void {
  if (typeof window === "undefined") return () => {};

  let cancelled = false;
  const onVisibilityChange = () => {
    if (document.hidden) cancelled = true;
  };
  document.addEventListener("visibilitychange", onVisibilityChange);

  // Trigger the deep link.
  window.location.href = deepLinkUrl;

  const timer = window.setTimeout(() => {
    document.removeEventListener("visibilitychange", onVisibilityChange);
    if (!cancelled && !document.hidden) {
      window.location.href = fallbackUrl;
    }
  }, timeoutMs);

  return () => {
    cancelled = true;
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.clearTimeout(timer);
  };
}
