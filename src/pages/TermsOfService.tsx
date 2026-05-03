import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export default function TermsOfService() {
  useEffect(() => {
    document.title = "Terms of Use — HomeBase Pro";
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
        <h1 className="text-4xl font-bold mb-2">Terms of Use & End-User License Agreement</h1>
        <p className="text-muted-foreground mb-12">Effective Date: May 3, 2026</p>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">1. Introduction & Acceptance</h2>
            <p>This End-User License Agreement ("EULA" or "Terms") is a binding legal contract between you ("you" or "User") and HomeBase ("HomeBase", "we", "us", or "our") governing your access to and use of the HomeBase mobile application, the website at homebaseproapp.com, and all related services (collectively, the "Service"). By downloading, installing, accessing, or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">2. Effective Date</h2>
            <p>These Terms are effective as of May 3, 2026 and replace all prior versions.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">3. Eligibility</h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>You must be at least 18 years old to create an account and transact on the Service.</li>
              <li>Users aged 13 to 17 may access limited features only with verifiable consent and supervision from a parent or legal guardian who agrees to these Terms on their behalf.</li>
              <li>Service Providers must additionally satisfy HomeBase's onboarding requirements, including identity verification and a background check, and must hold all licenses, permits, and insurance required by applicable law.</li>
              <li>By using the Service, you represent and warrant that you meet these eligibility requirements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">4. About HomeBase</h2>
            <p>HomeBase is a two-sided home services marketplace and business management platform that connects three types of users:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
              <li><strong className="text-foreground">Homeowners</strong> — find, book, and pay verified home service professionals.</li>
              <li><strong className="text-foreground">Service Providers</strong> — manage clients, jobs, crew, invoices, and receive payouts.</li>
              <li><strong className="text-foreground">Crew Members</strong> — view assigned jobs, update status, and log field notes through limited sub-accounts.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">5. Accounts & Registration</h2>
            <p>You must provide accurate, current, and complete information when registering, and keep it up to date. You are responsible for safeguarding your credentials and for all activity that occurs under your account. Notify us immediately at <a href="mailto:support@homebaseproapp.com" className="text-[#22c55e] hover:underline">support@homebaseproapp.com</a> of any unauthorized use.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">6. Marketplace & Booking</h2>
            <p>Homeowners can discover and book local, background-checked Service Providers through the Service. HomeBase charges an approximate three percent (3%) marketplace fee on transactions processed through the platform; the exact fee may vary and will be disclosed at checkout. HomeBase is a neutral venue: we are not a party to, and do not guarantee or assume responsibility for, any service contract, work performed, or dispute between Homeowners and Service Providers.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">7. Payments via Stripe</h2>
            <p>Payments and invoicing are processed by Stripe, Inc. Service Providers receive payouts through Stripe Connect and must complete Stripe's onboarding and identity verification. By using payment features, you agree to Stripe's <a href="https://stripe.com/legal" target="_blank" rel="noopener noreferrer" className="text-[#22c55e] hover:underline">Terms of Service</a> and Connected Account Agreement. HomeBase does not store full payment card data.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">8. Subscriptions & In-App Purchases</h2>
            <p>Service Providers may access advanced features through a paid subscription. Subscriptions purchased on iOS are billed through Apple In-App Purchase, and subscriptions purchased on Android are billed through Google Play Billing. Subscriptions automatically renew unless canceled at least 24 hours before the end of the current period. You can manage and cancel subscriptions in your Apple ID or Google Play account settings. Refunds are governed by the applicable app store's policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">9. Crew Management</h2>
            <p>Service Providers may invite Crew Members to access a limited sub-account tied to the Provider's organization. The Provider is fully responsible for its Crew Members' compliance with these Terms and for any acts or omissions of Crew Members in connection with the Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">10. AI Assistant</h2>
            <p>HomeBase offers a chat assistant powered by GPT-4o that provides home troubleshooting suggestions, service classification, and price estimates. AI output is generated automatically, may be inaccurate or incomplete, and is provided for informational purposes only. It is not professional, legal, financial, medical, or contractor advice and should not be relied upon as a substitute for inspection or services from a qualified professional.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">11. HouseFax Intelligence</h2>
            <p>HouseFax is a property data layer that aggregates third-party information, including data sourced from Zillow and other providers, to display maintenance history and home health scores. HomeBase does not own or control third-party data and does not warrant its accuracy, completeness, or timeliness. You should independently verify any property information before relying on it.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">12. User-Generated Content</h2>
            <p>You may upload photos, notes, job documentation, messages, and other content ("User Content"). You retain ownership of your User Content. You grant HomeBase a worldwide, non-exclusive, royalty-free, sublicensable license to host, store, reproduce, modify, display, and distribute your User Content within and in connection with the Service, including for service delivery, support, security, and platform improvement. You represent that you have all rights necessary to grant this license and that your User Content does not violate any law or third-party right.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">13. Reviews & Ratings</h2>
            <p>Homeowners may submit reviews and ratings for Service Providers. Reviews must be honest, based on a real interaction, and free from harassment, hate speech, personal information, or unlawful content. HomeBase reserves the right, but has no obligation, to moderate, edit, or remove content that violates our community standards or these Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">14. Notifications</h2>
            <p>The Service sends push notifications, email, and SMS for bookings, payments, reminders, and important account activity. You can opt out of push notifications at any time in your device settings, and you can manage email preferences in your account.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">15. Location Access</h2>
            <p>The Service requests foreground location access to display nearby Service Providers and improve booking relevance. We do not collect background location and we do not sell your location data to third parties. You may revoke location permission at any time in your device settings, though some features may be limited as a result.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">16. Acceptable Use</h2>
            <p className="mb-2">You agree not to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Use the Service for any unlawful, fraudulent, or harmful purpose;</li>
              <li>Post false, misleading, infringing, or defamatory content;</li>
              <li>Harass, abuse, threaten, or discriminate against other users;</li>
              <li>Circumvent HomeBase Pay or otherwise avoid platform fees;</li>
              <li>Reverse-engineer, decompile, or attempt to extract source code from the Service;</li>
              <li>Use bots, scrapers, or automated tools to access or harvest data; or</li>
              <li>Interfere with the security, integrity, or performance of the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">17. Account Suspension & Termination</h2>
            <p>HomeBase may suspend, restrict, or terminate your account at any time, with or without notice, for violations of these Terms, suspected fraudulent or unlawful activity, risk to other users, or extended inactivity. You may close your account at any time by contacting <a href="mailto:support@homebaseproapp.com" className="text-[#22c55e] hover:underline">support@homebaseproapp.com</a>. Provisions that by their nature should survive termination will remain in effect.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">18. Intellectual Property</h2>
            <p>The Service, including all software, designs, text, graphics, trademarks, and the "HomeBase" name and logo, is owned by HomeBase or its licensors and protected by intellectual property laws. We grant you a limited, revocable, non-exclusive, non-transferable license to use the Service for its intended purpose. All other rights are reserved.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">19. Disclaimers</h2>
            <p>THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. HOMEBASE DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE, AND DOES NOT ENDORSE OR GUARANTEE THE WORK, QUALIFICATIONS, OR CONDUCT OF ANY SERVICE PROVIDER LISTED ON THE PLATFORM.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">20. Limitation of Liability</h2>
            <p>HomeBase is a technology platform and is not a party to the service contracts between Homeowners and Service Providers. TO THE FULLEST EXTENT PERMITTED BY LAW, HOMEBASE AND ITS OFFICERS, EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE. OUR AGGREGATE LIABILITY FOR ANY CLAIM RELATED TO THE SERVICE WILL NOT EXCEED THE GREATER OF (A) THE AMOUNTS YOU PAID TO HOMEBASE IN THE 12 MONTHS PRECEDING THE CLAIM OR (B) ONE HUNDRED U.S. DOLLARS ($100).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">21. Indemnification</h2>
            <p>You agree to defend, indemnify, and hold harmless HomeBase and its affiliates from any claims, damages, liabilities, and expenses (including reasonable attorneys' fees) arising out of or related to your use of the Service, your User Content, your violation of these Terms, or your violation of any law or third-party right.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">22. Dispute Resolution; Arbitration; Class Action Waiver</h2>
            <p>Please read this section carefully — it affects your legal rights. You and HomeBase agree that any dispute, claim, or controversy arising out of or relating to these Terms or the Service will be resolved exclusively through final and binding individual arbitration administered by the American Arbitration Association under its Consumer Arbitration Rules, rather than in court, except that you may bring claims in small-claims court if eligible. YOU AND HOMEBASE WAIVE ANY RIGHT TO A JURY TRIAL AND TO PARTICIPATE IN A CLASS, COLLECTIVE, OR REPRESENTATIVE ACTION. If the class-action waiver is found unenforceable, the entire arbitration provision will be null and void. You may opt out of arbitration within 30 days of first accepting these Terms by emailing <a href="mailto:support@homebaseproapp.com" className="text-[#22c55e] hover:underline">support@homebaseproapp.com</a> with the subject "Arbitration Opt-Out."</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">23. Governing Law</h2>
            <p>These Terms are governed by the laws of the United States and the State of Mississippi, without regard to its conflict-of-laws rules. Subject to Section 22, the state and federal courts located in Mississippi will have exclusive jurisdiction over any claim not subject to arbitration.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">24. Changes to These Terms</h2>
            <p>HomeBase may update these Terms at any time. When we do, we will revise the Effective Date above and, for material changes, provide reasonable notice through the Service. Your continued use of the Service after the changes take effect constitutes your acceptance of the updated Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">25. Apple App Store EULA Addendum</h2>
            <p className="mb-4">The following terms apply when you download or use the HomeBase application from the Apple App Store. In the event of a conflict between this Section 25 and the rest of these Terms, this Section 25 controls with respect to your use of the App on Apple-branded devices.</p>

            <h3 className="text-base font-semibold text-foreground mb-1 mt-4">25.1 Acknowledgement</h3>
            <p>You and HomeBase acknowledge that this EULA is concluded between you and HomeBase only, and not with Apple Inc. ("Apple"). HomeBase, not Apple, is solely responsible for the App and its content. Apple has no obligation whatsoever to furnish any maintenance and support services with respect to the App.</p>

            <h3 className="text-base font-semibold text-foreground mb-1 mt-4">25.2 Scope of License</h3>
            <p>The license granted to you for the App is limited to a non-transferable license to use the App on any Apple-branded products that you own or control and as permitted by the Usage Rules set forth in the Apple Media Services Terms and Conditions, except that the App may be accessed and used by other accounts associated with you via Family Sharing or volume purchasing.</p>

            <h3 className="text-base font-semibold text-foreground mb-1 mt-4">25.3 Maintenance and Support</h3>
            <p>HomeBase is solely responsible for providing any maintenance and support services with respect to the App, as specified in these Terms or as required under applicable law. Apple has no obligation whatsoever to furnish any maintenance and support services with respect to the App.</p>

            <h3 className="text-base font-semibold text-foreground mb-1 mt-4">25.4 Warranty</h3>
            <p>HomeBase is solely responsible for any product warranties, whether express or implied by law, to the extent not effectively disclaimed. In the event of any failure of the App to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price for the App (if any) to you. To the maximum extent permitted by applicable law, Apple will have no other warranty obligation whatsoever with respect to the App, and any other claims, losses, liabilities, damages, costs, or expenses attributable to any failure to conform to any warranty will be HomeBase's sole responsibility.</p>

            <h3 className="text-base font-semibold text-foreground mb-1 mt-4">25.5 Product Claims</h3>
            <p>HomeBase, not Apple, is responsible for addressing any claims by you or any third party relating to the App or your possession and/or use of the App, including but not limited to: (i) product liability claims; (ii) any claim that the App fails to conform to any applicable legal or regulatory requirement; and (iii) claims arising under consumer protection, privacy, or similar legislation.</p>

            <h3 className="text-base font-semibold text-foreground mb-1 mt-4">25.6 Intellectual Property Rights</h3>
            <p>In the event of any third-party claim that the App or your possession and use of the App infringes that third party's intellectual property rights, HomeBase, not Apple, will be solely responsible for the investigation, defense, settlement, and discharge of any such intellectual property infringement claim.</p>

            <h3 className="text-base font-semibold text-foreground mb-1 mt-4">25.7 Legal Compliance</h3>
            <p>You represent and warrant that (i) you are not located in a country that is subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a "terrorist supporting" country; and (ii) you are not listed on any U.S. Government list of prohibited or restricted parties.</p>

            <h3 className="text-base font-semibold text-foreground mb-1 mt-4">25.8 Developer Name and Address</h3>
            <p>Any questions, complaints, or claims regarding the App should be directed to:</p>
            <p className="mt-2">HomeBase<br />120 District Blvd, Jackson, MS 39211<br />Email: <a href="mailto:support@homebaseproapp.com" className="text-[#22c55e] hover:underline">support@homebaseproapp.com</a></p>

            <h3 className="text-base font-semibold text-foreground mb-1 mt-4">25.9 Third-Party Terms</h3>
            <p>You must comply with applicable third-party terms of agreement when using the App. Such third-party terms include, without limitation, Stripe's Terms of Service, the Apple Media Services Terms and Conditions, the Google Play Terms of Service, and any wireless data service agreement with your carrier.</p>

            <h3 className="text-base font-semibold text-foreground mb-1 mt-4">25.10 Third-Party Beneficiary</h3>
            <p>You and HomeBase acknowledge and agree that Apple, and Apple's subsidiaries, are third-party beneficiaries of this EULA, and that, upon your acceptance of these Terms, Apple will have the right (and will be deemed to have accepted the right) to enforce this EULA against you as a third-party beneficiary.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">26. Google Play Notice</h2>
            <p>If you obtained the App from the Google Play Store, your use is also subject to the Google Play Terms of Service. Google is not responsible for the App or its content, and HomeBase is solely responsible for support, warranties, and claims relating to the App.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#22c55e] mb-3">27. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <p className="mt-2">HomeBase<br />120 District Blvd, Jackson, MS 39211<br />Email: <a href="mailto:support@homebaseproapp.com" className="text-[#22c55e] hover:underline">support@homebaseproapp.com</a></p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border px-6 py-6 text-center text-sm text-muted-foreground">
        © 2026 HomeBase Pro. All rights reserved. · <a href="https://homebaseproapp.com" className="text-[#22c55e] hover:underline">homebaseproapp.com</a>
      </footer>
    </div>
  );
}
