import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export default function TermsOfService() {
  useEffect(() => {
    document.title = "Terms of Service — HomeBase Pro";
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

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-12">Last updated: April 9, 2026</p>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using the HomeBase Pro platform ("HomeBase", "we", "us", or "our"), including our website at homebaseproapp.com and the HomeBase Pro mobile application, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">2. Description of Service</h2>
            <p>HomeBase provides a platform that connects homeowners with home service professionals. Our services include AI-powered booking, scheduling, invoicing, payment processing, and customer management tools for service providers, as well as a marketplace for homeowners to discover and book qualified professionals.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">3. User Accounts</h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>You must provide accurate and complete information when creating an account.</li>
              <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
              <li>You must be at least 18 years old to create an account.</li>
              <li>You are responsible for all activity that occurs under your account.</li>
              <li>HomeBase reserves the right to suspend or terminate accounts that violate these terms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">4. Provider Obligations</h2>
            <p className="mb-2">Service providers using HomeBase agree to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Maintain all required licenses, permits, and insurance for the services they offer.</li>
              <li>Provide accurate business information, including pricing and availability.</li>
              <li>Deliver services in a professional and timely manner.</li>
              <li>Respond to customer inquiries and booking requests promptly.</li>
              <li>Comply with all applicable local, state, and federal laws.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">5. Booking & Payments</h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>HomeBase facilitates bookings between homeowners and service providers but is not a party to the service agreement between them.</li>
              <li>Payments are processed through HomeBase Pay, powered by Stripe.</li>
              <li>A 3% transaction fee applies to all payments processed through HomeBase Pay.</li>
              <li>Providers are responsible for setting their own pricing and service terms.</li>
              <li>Refunds and cancellations are subject to the individual provider's policies.</li>
              <li>HomeBase is not responsible for the quality, safety, or legality of services provided.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">6. Prohibited Conduct</h2>
            <p className="mb-2">You agree not to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Use the platform for any unlawful purpose.</li>
              <li>Post false, misleading, or fraudulent information.</li>
              <li>Harass, abuse, or threaten other users.</li>
              <li>Attempt to gain unauthorized access to other accounts or systems.</li>
              <li>Use automated tools to scrape or extract data from the platform.</li>
              <li>Circumvent HomeBase Pay to avoid transaction fees.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">7. Intellectual Property</h2>
            <p>All content, trademarks, logos, and intellectual property displayed on HomeBase are owned by or licensed to HomeBase Pro App. You may not reproduce, distribute, or create derivative works from any content on our platform without prior written consent.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">8. Disclaimers</h2>
            <p>HomeBase is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the platform's reliability, accuracy, or availability. HomeBase does not endorse, guarantee, or assume responsibility for any service provider listed on the platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">9. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, HomeBase Pro App shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform, including but not limited to loss of profits, data, or business opportunities.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">10. Termination</h2>
            <p>We may suspend or terminate your access to HomeBase at any time, with or without cause, and with or without notice. Upon termination, your right to use the platform ceases immediately. Provisions that by their nature should survive termination will remain in effect.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">11. Governing Law</h2>
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of the United States. Any disputes arising under these terms shall be resolved in the appropriate courts of competent jurisdiction.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">12. Changes to These Terms</h2>
            <p>We may update these Terms of Service from time to time. When we do, we will revise the "Last updated" date at the top of this page. Continued use of the platform after changes constitutes acceptance of the revised terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">13. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us at <a href="mailto:support@homebaseproapp.com" className="text-[#22c55e] hover:underline">support@homebaseproapp.com</a>.</p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border px-6 py-6 text-center text-sm text-muted-foreground">
        © 2026 HomeBase Pro. All rights reserved. · <a href="https://homebaseproapp.com" className="text-[#22c55e] hover:underline">homebaseproapp.com</a>
      </footer>
    </div>
  );
}
