import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqCategories = [
  {
    title: "General",
    items: [
      { q: "What is HomeBase?", a: "HomeBase is an all-in-one platform for home service professionals. It provides AI-powered booking, scheduling, invoicing, payment processing, and customer management tools — everything you need to run and grow your business." },
      { q: "Who is HomeBase for?", a: "HomeBase is built for all home service professionals — plumbers, electricians, HVAC techs, cleaners, landscapers, handymen, painters, and more. It's also for homeowners looking to find and book qualified local pros." },
      { q: "How do I get started?", a: "Sign up for free, set up your profile in under 5 minutes, and share your booking link. HomeBase handles the rest — from AI-powered booking to automated payments." },
    ],
  },
  {
    title: "Booking",
    items: [
      { q: "How does AI booking work?", a: "When a potential client reaches out, our AI responds instantly, answers common questions, provides quotes based on your pricing, and books the job on your calendar — all automatically, 24/7." },
      { q: "Can clients book directly without AI?", a: "Yes. Every provider gets a shareable booking link. Clients can visit the link, choose a service, pick a time slot, and submit a booking request — with or without the AI assistant." },
      { q: "How do cancellations work?", a: "Cancellation policies are set by each individual provider. Homeowners can cancel through the platform, and the provider's policy determines whether a refund or fee applies." },
    ],
  },
  {
    title: "Payments & Pricing",
    items: [
      { q: "How much does HomeBase cost?", a: "HomeBase is $29.99/month plus a 3% transaction fee on payments processed through HomeBase Pay. You don't pay anything until you get your first paid booking." },
      { q: "How do payments work?", a: "HomeBase Pay lets you collect deposits upfront, send invoices, and accept payments instantly. Funds are deposited directly to your bank account within 1–2 business days via Stripe." },
      { q: "Can I cancel my subscription anytime?", a: "Absolutely. There are no contracts or commitments. You can cancel your subscription at any time from your account settings — no questions asked." },
      { q: "What payment methods do clients have?", a: "Clients can pay with all major credit and debit cards through HomeBase Pay, powered by Stripe. Additional payment methods may be added in the future." },
    ],
  },
  {
    title: "Account & Data",
    items: [
      { q: "How do I set up my provider profile?", a: "After signing up, you'll be guided through a quick onboarding flow where you add your business name, services, pricing, service area, and availability. It takes less than 5 minutes." },
      { q: "Can I delete my account and data?", a: "Yes. You can request account deletion and removal of your personal data at any time by contacting us at support@homebaseproapp.com. We will process your request in accordance with our Privacy Policy." },
      { q: "Is my data secure?", a: "Yes. We use industry-standard encryption and security measures. Your data is stored and managed through Supabase with row-level security policies. Payments are handled securely by Stripe." },
    ],
  },
  {
    title: "Technical",
    items: [
      { q: "What devices are supported?", a: "HomeBase works on any modern web browser. Our mobile app is available for iOS on the App Store, with Android support coming soon." },
      { q: "Do I need to install anything?", a: "No installation required to use the web platform. For the best mobile experience, you can download the HomeBase Pro app from the App Store." },
      { q: "What is HouseFax™?", a: "HouseFax™ is a home history report that compiles service records, maintenance history, and property details into a single document — like a Carfax, but for your home." },
    ],
  },
];

export default function FAQPage() {
  useEffect(() => {
    document.title = "FAQ — HomeBase Pro";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="HomeBase logo" className="w-8 h-8" />
          <span className="text-lg font-bold">HomeBase</span>
        </Link>
      </nav>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16 w-full">
        <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-12">Everything you need to know about HomeBase.</p>

        <div className="space-y-12">
          {faqCategories.map((category) => (
            <section key={category.title}>
              <h2 className="text-xl font-semibold text-[#22c55e] mb-4">{category.title}</h2>
              <Accordion type="single" collapsible className="space-y-3">
                {category.items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`${category.title}-${i}`}
                    className="bg-card border border-border rounded-2xl px-6 data-[state=open]:border-primary/30"
                  >
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline py-5">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pb-5">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>
      </main>

      <footer className="border-t border-border px-6 py-6 text-center text-sm text-muted-foreground">
        © 2026 HomeBase Pro. All rights reserved. · <a href="https://homebaseproapp.com" className="text-[#22c55e] hover:underline">homebaseproapp.com</a>
      </footer>
    </div>
  );
}
