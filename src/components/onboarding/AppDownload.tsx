import { APP_STORE_URL } from "@/lib/onboarding";

export function AppStoreButton() {
  return (
    <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
      <button
        type="button"
        className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-green-500 text-[17px] font-semibold text-white transition-all duration-150 hover:bg-green-600 active:scale-[0.98]"
      >
        <svg width="22" height="26" viewBox="0 0 18 22" fill="currentColor" aria-hidden="true">
          <path d="M14.7 11.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.9C4.8 6 3.3 7 2.5 8.5c-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.7 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.5-1-2.5-3.9zM12.4 4.2c.7-.8 1.1-1.9 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z" />
        </svg>
        Download on the App Store
      </button>
    </a>
  );
}

export function SuccessCheck() {
  return (
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="m5 13 4 4 10-10"
          stroke="#22c55e"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function OpenAppNote() {
  return (
    <p className="text-center text-sm text-gray-400">
      Already have the app?{" "}
      <span className="text-white">Just open it and log in.</span>
    </p>
  );
}
