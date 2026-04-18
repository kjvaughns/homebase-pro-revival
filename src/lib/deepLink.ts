export const TESTFLIGHT_URL = "https://testflight.apple.com/join/P1v4ZReq";
export const APP_STORE_URL = TESTFLIGHT_URL;

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
