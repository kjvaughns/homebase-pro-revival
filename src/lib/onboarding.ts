import { supabase } from "@/integrations/supabase/client";

// The live iOS listing the download buttons point to.
export const APP_STORE_URL =
  "https://apps.apple.com/us/app/homebase-pro-app/id6760936703";

// ── Referral code ──────────────────────────────────────────────────────────
// Captured from ?ref= on load, kept in sessionStorage, never shown to the user,
// and passed to Supabase as user metadata (referred_by) on signup.
const REF_KEY = "hb_ref";

export function captureReferralFromUrl(): void {
  try {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref && ref.trim()) sessionStorage.setItem(REF_KEY, ref.trim());
  } catch {
    /* storage unavailable — ignore */
  }
}

export function getReferralCode(): string | undefined {
  try {
    return sessionStorage.getItem(REF_KEY) || undefined;
  } catch {
    return undefined;
  }
}

// ── Types ────────────────────────────────────────────────────────────────
export interface HomeownerInput {
  name: string;
  email: string;
  password: string;
}

export type PriceType = "fixed" | "hourly" | "quote";

export interface ProviderInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  businessName: string;
  description?: string;
  serviceArea?: string;
  serviceZipCodes?: string[];
  capabilityTags?: string[];
  initialService?: {
    name: string;
    description?: string;
    priceCents?: number;
    priceType?: PriceType;
  };
}

// Supabase's signUp does not return a hard error for an existing email when
// email confirmations are on (to avoid user enumeration) — it returns a user
// with an empty identities array. Detect both shapes.
function alreadyRegistered(
  data: { user: { identities?: unknown[] | null } | null } | null,
  error: { message?: string } | null
): boolean {
  if (error?.message && /already|registered|exists/i.test(error.message))
    return true;
  const identities = data?.user?.identities;
  return Array.isArray(identities) && identities.length === 0;
}

export class SignupError extends Error {
  emailTaken: boolean;
  constructor(message: string, emailTaken = false) {
    super(message);
    this.emailTaken = emailTaken;
  }
}

// ── Homeowner ──────────────────────────────────────────────────────────────
export async function signupHomeowner(input: HomeownerInput): Promise<void> {
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        full_name: input.name,
        account_type: "homeowner",
        referred_by: getReferralCode() ?? null,
      },
    },
  });
  if (alreadyRegistered(data, error))
    throw new SignupError("That email is already registered.", true);
  if (error) throw new SignupError(error.message);
}

// ── Provider ───────────────────────────────────────────────────────────────
// All provider details ride along in user metadata; the iOS app reads them on
// first provider login to finalize the profile + first service.
export async function signupProvider(input: ProviderInput): Promise<void> {
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        full_name: input.name,
        account_type: "provider",
        phone: input.phone ?? null,
        business_name: input.businessName,
        business_description: input.description ?? null,
        service_area: input.serviceArea ?? null,
        service_zip_codes: input.serviceZipCodes ?? [],
        capability_tags: input.capabilityTags ?? [],
        initial_service: input.initialService ?? null,
        referred_by: getReferralCode() ?? null,
      },
    },
  });
  if (alreadyRegistered(data, error))
    throw new SignupError("That email is already registered.", true);
  if (error) throw new SignupError(error.message);
}
