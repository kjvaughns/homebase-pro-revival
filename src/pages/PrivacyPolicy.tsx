import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy — HomeBase Pro";
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
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-12">Last updated: April 9, 2026</p>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">1. Introduction</h2>
            <p>HomeBase Pro App ("HomeBase", "we", "us", or "our") operates the website homebaseproapp.com and the HomeBase Pro mobile application. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. By accessing or using HomeBase, you agree to the terms of this Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">2. Information We Collect</h2>
            <p className="mb-2">We may collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Personal information: name, email address, phone number</li>
              <li>Location data: address and service area information</li>
              <li>Service history: past bookings, reviews, and transaction records</li>
              <li>Device information: device type, operating system, browser type</li>
              <li>Usage data: pages visited, features used, time spent on the platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">3. How We Use Your Information</h2>
            <p className="mb-2">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Provide, operate, and maintain the HomeBase platform</li>
              <li>Process bookings, appointments, and payments</li>
              <li>Send transactional notifications and service updates</li>
              <li>Improve and personalize your experience</li>
              <li>Analyze usage trends and platform performance</li>
              <li>Comply with legal obligations and enforce our terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">4. Sharing of Information</h2>
            <p className="mb-2">We may share your information with:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong className="text-foreground">Service providers:</strong> Stripe for payment processing, Supabase for secure data storage and authentication</li>
              <li><strong className="text-foreground">Other users:</strong> Only the information necessary to facilitate bookings between homeowners and service providers</li>
            </ul>
            <p className="mt-3">We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">5. Data Security</h2>
            <p>We use industry-standard encryption and security measures to protect your data. Our data is stored and managed through Supabase with row-level security policies. While we strive to protect your personal information, no method of electronic storage or transmission is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">6. Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your account and associated data</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, contact us at <a href="mailto:support@homebaseproapp.com" className="text-[#22c55e] hover:underline">support@homebaseproapp.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">7. Children's Privacy</h2>
            <p>HomeBase is not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If we become aware that a child under 13 has provided us with personal data, we will take steps to delete such information promptly.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@homebaseproapp.com" className="text-[#22c55e] hover:underline">support@homebaseproapp.com</a>.</p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border px-6 py-6 text-center text-sm text-muted-foreground">
        © 2026 HomeBase Pro. All rights reserved. · <a href="https://homebaseproapp.com" className="text-[#22c55e] hover:underline">homebaseproapp.com</a>
      </footer>
    </div>
  );
}
