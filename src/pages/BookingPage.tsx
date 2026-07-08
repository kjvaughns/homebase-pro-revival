import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import logo from "@/assets/logo.png";
import { DatePicker } from "@/components/marketplace/DatePicker";
import { IntakeQuestionField } from "@/components/marketplace/IntakeQuestion";
import { OpenInAppBanner } from "@/components/marketplace/OpenInAppBanner";
import { RatingStars } from "@/components/marketplace/RatingStars";
import { AppStoreButton } from "@/components/onboarding/AppDownload";
import { deepLinks } from "@/lib/deepLink";
import {
  BookingLinkData,
  CatalogService,
  fetchBookingLink,
  submitBooking,
} from "@/lib/marketplace";

function priceLabel(s: CatalogService): string {
  if (s.priceType === "quote" || s.priceCents == null) return "Free Quote";
  const dollars = (s.priceCents / 100).toFixed(0);
  return s.priceType === "hourly" ? `$${dollars}/hr` : `$${dollars}`;
}

const TIME_OPTIONS = [
  { id: "morning", label: "Morning", hint: "8–12" },
  { id: "afternoon", label: "Afternoon", hint: "12–5" },
  { id: "evening", label: "Evening", hint: "5–8" },
];

const Nav = () => (
  <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
    <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="HomeBase" className="h-8 w-8" />
        <span className="text-lg font-bold text-foreground">HomeBase</span>
      </Link>
    </div>
  </nav>
);

const BookingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<BookingLinkData | null | "missing">(null);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [serviceId, setServiceId] = useState<string>("");
  const [freeText, setFreeText] = useState("");
  const [dates, setDates] = useState<string[]>([]);
  const [timePref, setTimePref] = useState<string>("");
  const [description, setDescription] = useState("");
  const [answers, setAnswers] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (!slug) return;
    fetchBookingLink(slug).then((d) => setData(d ?? "missing"));
  }, [slug]);

  const hasCatalog = data && data !== "missing" && data.serviceCatalog.length > 0;
  const questions = data && data !== "missing" ? data.intakeQuestions : [];
  const totalSteps = questions.length > 0 ? 4 : 3;

  const selectedService = useMemo(
    () =>
      data && data !== "missing"
        ? data.serviceCatalog.find((s) => s.id === serviceId)
        : undefined,
    [data, serviceId]
  );

  useEffect(() => {
    if (data && data !== "missing") {
      document.title = `Book ${data.provider?.business_name ?? "a pro"} · HomeBase`;
    }
  }, [data]);

  if (data === null) {
    return (
      <div className="min-h-screen bg-background">
        <Nav />
        <div className="flex justify-center py-32">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (data === "missing") {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <div className="mx-auto max-w-md px-4 py-24 text-center">
          <h1 className="text-2xl font-bold">Booking page not found</h1>
          <p className="mt-2 text-muted-foreground">
            This booking link may be inactive or the address is mistyped.
          </p>
          <Link to="/marketplace" className="mt-6 inline-block font-semibold text-primary">
            Browse the marketplace →
          </Link>
        </div>
      </div>
    );
  }

  const providerName = data.provider?.business_name ?? "this pro";

  function validateStep(): boolean {
    setError("");
    if (step === 1) {
      if (!name.trim()) return fail("Enter your full name.");
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim()))
        return fail("Enter a valid email.");
      return true;
    }
    if (step === 2) {
      if (hasCatalog && !serviceId) return fail("Select a service.");
      if (!hasCatalog && !freeText.trim())
        return fail("Tell us what you need help with.");
      if (!description.trim()) return fail("Add a short description.");
      return true;
    }
    if (step === 3 && questions.length > 0) {
      for (const q of questions) {
        if (q.required) {
          const v = answers[q.id];
          const empty =
            v == null ||
            v === "" ||
            (Array.isArray(v) && v.length === 0);
          if (empty) return fail(`Please answer: ${q.question}`);
        }
      }
    }
    return true;
  }
  function fail(msg: string): boolean {
    setError(msg);
    return false;
  }

  function next() {
    if (!validateStep()) return;
    if (step >= totalSteps) return void handleSubmit();
    // skip intake step if none
    if (step === 2 && questions.length === 0) setStep(4);
    else setStep(step + 1);
  }
  function back() {
    setError("");
    if (step === 4 && questions.length === 0) setStep(2);
    else if (step > 1) setStep(step - 1);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");
    const res = await submitBooking({
      providerId: data.providerId,
      providerName,
      category: data.provider?.capability_tags?.[0],
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      address,
      serviceSummary: hasCatalog ? selectedService?.name : freeText,
      problemDescription: description,
      preferredDates: dates,
      preferredTimeLabel: TIME_OPTIONS.find((t) => t.id === timePref)?.label,
      answers,
    });
    setSubmitting(false);
    if (res.ok) setSubmitted(true);
    else setError("Something went wrong. Please try again.");
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <div className="mx-auto max-w-md px-4 py-16 text-center">
          {data.instantBooking ? (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-3xl">
                🎉
              </div>
              <h1 className="mt-5 text-2xl font-bold">You're booked!</h1>
              <p className="mt-2 text-muted-foreground">
                {providerName} has confirmed your appointment.
              </p>
            </>
          ) : (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-3xl">
                ✅
              </div>
              <h1 className="mt-5 text-2xl font-bold">Request sent!</h1>
              <p className="mt-2 text-muted-foreground">
                {providerName} will review and confirm shortly.
              </p>
            </>
          )}
          <div className="mt-8 rounded-2xl border border-border bg-card p-5 text-left">
            <p className="text-sm font-semibold">Download the app to track your booking</p>
            <div className="mt-3">
              <AppStoreButton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 text-foreground">
      <Nav />
      <div className="mx-auto max-w-md px-4 py-8">
        {/* Provider header */}
        <div className="mb-6 flex items-center gap-3">
          {data.provider?.avatar_url ? (
            <img src={data.provider.avatar_url} alt="" className="h-12 w-12 rounded-full object-cover" />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-lg font-bold text-primary">
              {providerName.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="font-bold text-foreground">
              {data.customTitle || `Book ${providerName}`}
            </h1>
            {(data.provider?.average_rating || data.provider?.rating) && (
              <RatingStars
                rating={data.provider?.average_rating ?? data.provider?.rating ?? 0}
                reviewCount={data.provider?.review_count ?? undefined}
                size={12}
              />
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6 h-[3px] w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {step === 1 && (
          <section className="space-y-4">
            <StepTitle>Your contact info</StepTitle>
            <TextField label="Full name" value={name} onChange={setName} placeholder="Jane Smith" />
            <TextField label="Email" value={email} onChange={setEmail} type="email" placeholder="you@example.com" />
            <TextField label="Phone" optional value={phone} onChange={setPhone} type="tel" placeholder="(555) 123-4567" />
            <div className="flex flex-col gap-1.5">
              <FieldLabel optional>Service address</FieldLabel>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Where should the pro come?"
                className="w-full resize-none rounded-xl border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-5">
            <StepTitle>What do you need?</StepTitle>
            {hasCatalog ? (
              <div className="space-y-2">
                {data.serviceCatalog.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setServiceId(s.id)}
                    className={
                      "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all " +
                      (serviceId === s.id
                        ? "border-primary bg-primary/12"
                        : "border-border bg-card hover:border-primary/40")
                    }
                  >
                    <div>
                      <div className="text-sm font-semibold text-foreground">{s.name}</div>
                      {s.description && (
                        <div className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                          {s.description}
                        </div>
                      )}
                    </div>
                    <span className="ml-3 shrink-0 text-sm font-medium text-primary">
                      {priceLabel(s)}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <TextField
                label="What do you need help with?"
                value={freeText}
                onChange={setFreeText}
                placeholder="e.g. Leaking kitchen faucet"
              />
            )}

            <div className="flex flex-col gap-2">
              <FieldLabel>Preferred dates</FieldLabel>
              <DatePicker selected={dates} onChange={setDates} maxSelected={3} />
            </div>

            <div className="flex flex-col gap-2">
              <FieldLabel>Preferred time</FieldLabel>
              <div className="grid grid-cols-3 gap-2">
                {TIME_OPTIONS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTimePref(t.id)}
                    className={
                      "rounded-xl border py-2.5 text-center transition-all " +
                      (timePref === t.id
                        ? "border-primary bg-primary/12 text-primary"
                        : "border-border bg-card text-foreground hover:border-primary/40")
                    }
                  >
                    <div className="text-sm font-medium">{t.label}</div>
                    <div className="text-[10px] text-muted-foreground">{t.hint}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <FieldLabel>Describe what you need</FieldLabel>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A few details help the pro prepare."
                className="w-full resize-none rounded-xl border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </section>
        )}

        {step === 3 && questions.length > 0 && (
          <section className="space-y-4">
            <StepTitle>A few more details</StepTitle>
            {questions.map((q) => (
              <IntakeQuestionField
                key={q.id}
                q={q}
                value={answers[q.id]}
                onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
              />
            ))}
          </section>
        )}

        {step === 4 && (
          <section className="space-y-4">
            <StepTitle>Review &amp; submit</StepTitle>
            <div className="space-y-2 rounded-2xl border border-border bg-card p-4 text-sm">
              <Row label="Name" value={name} />
              <Row label="Service" value={hasCatalog ? selectedService?.name ?? "—" : freeText} />
              <Row label="Dates" value={dates.join(", ") || "Flexible"} />
              <Row label="Time" value={TIME_OPTIONS.find((t) => t.id === timePref)?.label ?? "Flexible"} />
              <Row label="Details" value={description} />
            </div>
            {data.instantBooking ? (
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/12 px-3 py-1.5 text-sm font-semibold text-primary">
                ✓ Instantly Confirmed
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm text-muted-foreground">
                ⏳ Request — Provider will confirm
              </div>
            )}
          </section>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={next}
            disabled={submitting}
            className="flex h-[50px] w-full items-center justify-center rounded-xl bg-primary text-[16px] font-semibold text-primary-foreground transition-transform active:scale-[0.98] disabled:opacity-70"
          >
            {submitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {step >= totalSteps ? "Send Booking Request" : "Continue"}
          </button>
          {step > 1 && (
            <button
              type="button"
              onClick={back}
              className="mx-auto text-[13px] text-muted-foreground hover:text-foreground"
            >
              ← Back
            </button>
          )}
        </div>
      </div>

      <OpenInAppBanner deepLink={deepLinks.book(data.slug)} label="Book in the HomeBase App" />
    </div>
  );
};

const StepTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-bold text-foreground">{children}</h2>
);

const FieldLabel = ({
  children,
  optional,
}: {
  children: React.ReactNode;
  optional?: boolean;
}) => (
  <span className="text-sm font-medium text-foreground">
    {children}
    {optional && <span className="ml-1 text-muted-foreground">(optional)</span>}
  </span>
);

function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  optional,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  optional?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <FieldLabel optional={optional}>{label}</FieldLabel>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-border bg-secondary px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}

const Row = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex justify-between gap-4">
    <span className="text-muted-foreground">{label}</span>
    <span className="max-w-[65%] text-right text-foreground">{value || "—"}</span>
  </div>
);

export default BookingPage;
