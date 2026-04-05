import TopBanner from "@/components/landing/TopBanner";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import AIDemoSection from "@/components/landing/AIDemoSection";
import HouseFaxSection from "@/components/landing/HouseFaxSection";
import CaseStudiesSection from "@/components/landing/CaseStudiesSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import {
  Bot, MessageSquare, CalendarCheck, TrendingUp,
  Heart, Gift, Mail, Repeat,
  CreditCard, Wallet, Receipt, Clock,
  CalendarDays, FileText, Users, Settings,
  Link2, Star, Store,
} from "lucide-react";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <TopBanner />
    <Navbar />
    <HeroSection />

    <FeatureSection
      badge="AI Booking"
      title="AI Booking That Closes Jobs For You"
      description="Your AI assistant responds to leads instantly, sends quotes, and books jobs — even while you sleep."
      features={[
        { icon: Bot, title: "Instant Lead Response", description: "AI replies in seconds so you never lose a lead to slow follow-up." },
        { icon: MessageSquare, title: "Smart Quoting", description: "Generates accurate quotes based on your pricing and job details." },
        { icon: CalendarCheck, title: "Auto-Scheduling", description: "Books jobs directly on your calendar without back-and-forth." },
        { icon: TrendingUp, title: "Lead Insights", description: "Track conversion rates and see which channels bring the best clients." },
      ]}
    />

    <AIDemoSection />

    <FeatureSection
      badge="Client Retention"
      title="Turn One-Time Clients Into Repeat Customers"
      description="Automated follow-ups and smart engagement keep clients coming back."
      reversed
      features={[
        { icon: Heart, title: "Post-Job Follow-Ups", description: "Automated thank-you messages and satisfaction checks after every job." },
        { icon: Gift, title: "Loyalty Rewards", description: "Incentivize repeat bookings with built-in referral and discount tools." },
        { icon: Mail, title: "Smart Campaigns", description: "Seasonal reminders and maintenance alerts sent at the perfect time." },
        { icon: Repeat, title: "Recurring Services", description: "Set up auto-recurring bookings for ongoing maintenance clients." },
      ]}
    />

    <FeatureSection
      badge="Payments"
      title="Get Paid Faster"
      description="Collect deposits, send invoices, and get paid instantly — all from one place."
      features={[
        { icon: CreditCard, title: "Deposit Collection", description: "Require upfront deposits to eliminate no-shows and secure revenue." },
        { icon: Wallet, title: "Buy Now, Pay Later", description: "Offer flexible payment options so clients can book bigger jobs." },
        { icon: Receipt, title: "Auto Invoicing", description: "Professional invoices generated and sent automatically after each job." },
        { icon: Clock, title: "Fast Payouts", description: "Funds deposited directly to your bank in 1-2 business days." },
      ]}
    />

    <FeatureSection
      badge="Automation"
      title="Your Business, Fully Automated"
      description="From scheduling to invoicing to CRM — HomeBase runs your back office."
      reversed
      features={[
        { icon: CalendarDays, title: "Smart Scheduling", description: "Drag-and-drop calendar with route optimization and conflict detection." },
        { icon: FileText, title: "Auto Invoicing", description: "Invoices created and sent the moment a job is marked complete." },
        { icon: Users, title: "Client CRM", description: "Full client profiles with job history, notes, and communication logs." },
        { icon: Settings, title: "Workflow Rules", description: "Set custom automations for reminders, follow-ups, and status updates." },
      ]}
    />

    <FeatureSection
      badge="Growth"
      title="Built-In Growth Engine"
      description="Everything you need to attract new clients and build your reputation."
      features={[
        { icon: Link2, title: "Booking Link", description: "Share a professional booking page that converts visitors into clients." },
        { icon: Star, title: "Review Collection", description: "Automated review requests after every completed job." },
        { icon: Store, title: "Pro Marketplace", description: "Get discovered by homeowners searching for pros in your area." },
      ]}
    />

    <HouseFaxSection />
    <CaseStudiesSection />
    <PricingSection />
    <TestimonialsSection />
    <FAQSection />
    <FinalCTA />
    <Footer />
  </div>
);

export default Index;
