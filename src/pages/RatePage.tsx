import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Star, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const reviewSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name")
    .max(80, "Name must be under 80 characters"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .max(255)
    .optional()
    .or(z.literal("")),
  role: z.string().max(40).optional().or(z.literal("")),
  rating: z.number().int().min(1, "Please pick a rating").max(5),
  title: z.string().trim().max(120).optional().or(z.literal("")),
  comment: z
    .string()
    .trim()
    .min(10, "Tell us a bit more (at least 10 characters)")
    .max(2000, "Keep it under 2000 characters"),
});

export default function RatePage() {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Rate HomeBase — Leave a Review";
    const desc =
      "Share your experience with the HomeBase app. Your review helps other home pros and homeowners find what they need.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = reviewSchema.safeParse({
      name,
      email,
      role,
      rating,
      title,
      comment,
    });

    if (!parsed.success) {
      const first = parsed.error.errors[0];
      toast({
        title: "Check your review",
        description: first?.message ?? "Please review the form.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("app_reviews").insert({
      name: parsed.data.name,
      email: parsed.data.email || null,
      role: parsed.data.role || null,
      rating: parsed.data.rating,
      title: parsed.data.title || null,
      comment: parsed.data.comment,
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: "Couldn't submit review",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="HomeBase logo" className="w-8 h-8" />
            <span className="text-lg font-bold">HomeBase</span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back home
          </Link>
        </div>
      </nav>

      <main className="flex-1 px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Rate HomeBase
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Tell us how the app's working for you. Your feedback shapes what we build next.
            </p>
          </header>

          {submitted ? (
            <Card className="p-8 sm:p-10 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-14 w-14 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Thanks for the review!</h2>
              <p className="text-muted-foreground mb-6">
                We read every single one. Your feedback helps us make HomeBase better.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link to="/">
                  <Button variant="outline">Back home</Button>
                </Link>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setRating(0);
                    setName("");
                    setEmail("");
                    setRole("");
                    setTitle("");
                    setComment("");
                  }}
                >
                  Leave another
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="space-y-2">
                  <Label>Your rating *</Label>
                  <div
                    className="flex gap-1"
                    role="radiogroup"
                    aria-label="Star rating"
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    {[1, 2, 3, 4, 5].map((n) => {
                      const filled = (hoverRating || rating) >= n;
                      return (
                        <button
                          key={n}
                          type="button"
                          role="radio"
                          aria-checked={rating === n}
                          aria-label={`${n} star${n > 1 ? "s" : ""}`}
                          onClick={() => setRating(n)}
                          onMouseEnter={() => setHoverRating(n)}
                          className="p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-9 w-9 transition-colors ${
                              filled
                                ? "fill-primary text-primary"
                                : "text-muted-foreground/40"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Johnson"
                      maxLength={80}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      maxLength={255}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">I'm a... (optional)</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select one" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Home service pro">Home service pro</SelectItem>
                      <SelectItem value="Homeowner">Homeowner</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Headline (optional)</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Cut my admin time in half"
                    maxLength={120}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Your review *</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="What do you love? What could be better?"
                    rows={6}
                    maxLength={2000}
                    required
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {comment.length}/2000
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full h-11"
                >
                  {submitting ? "Submitting..." : "Submit review"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Reviews are moderated before appearing publicly.
                </p>
              </form>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
