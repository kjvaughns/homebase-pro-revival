import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How do I get started?", a: "Sign up for free, set up your profile in under 5 minutes, and share your booking link. HomeBase handles the rest — from AI-powered booking to automated payments." },
  { q: "How does AI booking work?", a: "When a potential client reaches out, our AI responds instantly, answers common questions, provides quotes based on your pricing, and books the job on your calendar — all automatically." },
  { q: "How much does HomeBase cost?", a: "HomeBase is $29.99/month plus a 3% transaction fee on payments processed through HomeBase Pay. You don't pay anything until you get your first paid booking." },
  { q: "How do payments work?", a: "HomeBase Pay lets you collect deposits upfront, send invoices, and accept payments instantly. Funds are deposited directly to your bank account within 1-2 business days." },
  { q: "Can I cancel anytime?", a: "Absolutely. There are no contracts or commitments. You can cancel your subscription at any time from your account settings — no questions asked." },
  { q: "What types of businesses is HomeBase for?", a: "HomeBase is built for all home service professionals — plumbers, electricians, HVAC techs, cleaners, landscapers, handymen, painters, and more." },
];

const FAQSection = () => (
  <section className="w-full py-20 px-4">
    <div className="max-w-2xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
          FAQ
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold">Frequently Asked Questions</h2>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map(({ q, a }, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-2xl px-6 data-[state=open]:border-primary/30">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline py-5">{q}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground pb-5">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
