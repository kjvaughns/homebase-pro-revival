import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { OnboardError, OnboardShell } from "@/components/onboarding/OnboardShell";
import {
  AppStoreButton,
  OpenAppNote,
  SuccessCheck,
} from "@/components/onboarding/AppDownload";
import { SignupError, signupHomeowner } from "@/lib/onboarding";

const HomeownerSignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailTaken, setEmailTaken] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setEmailTaken(false);
    if (!name.trim()) return setError("Enter your full name.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim()))
      return setError("Enter a valid email address.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");

    setLoading(true);
    try {
      await signupHomeowner({ name: name.trim(), email: email.trim(), password });
      setDone(true);
    } catch (err) {
      if (err instanceof SignupError && err.emailTaken) setEmailTaken(true);
      else
        setError(
          err instanceof Error ? err.message : "Something went wrong. Try again."
        );
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <OnboardShell>
        <div className="text-center">
          <SuccessCheck />
          <h1 className="mt-5 text-2xl font-bold text-white">
            Your account is ready!
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            Download the HomeBase app and log in with your new account.
            Everything is already set up.
          </p>
        </div>
        <div className="mt-6 rounded-xl border border-gray-800 bg-gray-800/50 p-4">
          <div className="text-[13px] text-gray-500">Signed up as</div>
          <div className="mt-0.5 font-semibold text-white">{name}</div>
          <div className="text-sm text-gray-400">{email}</div>
        </div>
        <div className="mt-6">
          <AppStoreButton />
        </div>
        <div className="mt-4">
          <OpenAppNote />
        </div>
      </OnboardShell>
    );
  }

  return (
    <OnboardShell>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">Create your account</h1>
        <p className="mt-1 text-sm text-gray-400">
          Find and book trusted local pros.
        </p>
      </div>

      <OnboardError message={error} />

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        <Field label="Full Name">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Jane Smith"
            className="mt-1 border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
          />
        </Field>
        <Field label="Email">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            className="mt-1 border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
          />
        </Field>
        <PasswordField value={password} onChange={setPassword} />

        {emailTaken && (
          <p className="text-sm text-gray-400">
            That email is already registered.{" "}
            <Link to="/login" className="font-semibold text-green-400 hover:text-green-300">
              Log in instead?
            </Link>
          </p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="h-[50px] w-full bg-green-500 text-[16px] font-semibold text-white hover:bg-green-600"
        >
          {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          Create my account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-green-400 hover:text-green-300">
          Log in
        </Link>
      </p>
    </OnboardShell>
  );
};

export function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="text-sm text-gray-300">
        {label}
        {optional && <span className="ml-1 text-gray-500">(optional)</span>}
      </Label>
      {children}
    </div>
  );
}

export function PasswordField({
  value,
  onChange,
  label = "Password",
  placeholder = "At least 6 characters",
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <Field label={label}>
      <div className="relative mt-1">
        <Input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="new-password"
          placeholder={placeholder}
          className="border-gray-700 bg-gray-800 pr-11 text-white placeholder:text-gray-500"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-gray-400 hover:text-white"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff /> : <Eye />}
        </button>
      </div>
    </Field>
  );
}

function Eye() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
function EyeOff() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.9 5.2A9.6 9.6 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.1 3.9M6.1 6.1A17 17 0 0 0 2 12s3.6 7 10 7a9.4 9.4 0 0 0 3.3-.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default HomeownerSignupPage;
