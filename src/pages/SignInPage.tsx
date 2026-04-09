import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (signInError) {
      setError("Invalid email or password.");
    } else {
      navigate("/ai-booking");
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
      <nav className="sticky top-0 z-50 border-b border-gray-800 bg-[#0a0a0a]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="HomeBase" className="h-8 w-8" />
            <span className="text-white font-bold text-xl">HomeBase</span>
          </Link>
        </div>
      </nav>

      <div className="flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-[400px] bg-gray-900 border border-gray-800 rounded-xl p-8">
          <h1 className="text-2xl font-bold text-white text-center mb-2">Welcome back</h1>
          <p className="text-gray-400 text-center text-sm mb-6">Sign in to your HomeBase account.</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-gray-300 text-sm">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <Label className="text-gray-300 text-sm">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                placeholder="••••••••"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full"
            >
              {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
              Sign In
            </Button>
          </form>

          <p className="text-gray-400 text-sm text-center mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-400 hover:text-green-300 font-medium">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
