import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Callaloo Ventures privacy policy.",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-16">
      <Section>
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold text-slate-900">
              Privacy Policy
            </h1>
            <p className="text-slate-600">Effective Date: [Insert Date]</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
            <p className="text-slate-600">
              This Privacy Policy describes how Callaloo Ventures (&ldquo;we,&rdquo;
              &ldquo;our,&rdquo; or &ldquo;us&rdquo;) collects, uses, and processes
              information through this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              1. Information You Submit
            </h2>
            <p className="text-slate-600">
              When you complete the Private Dialogue form, we collect the
              information you provide, which may include:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-slate-600">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>Investor profile (optional)</li>
              <li>Accredited investor status (self-reported)</li>
              <li>Investment experience (optional)</li>
              <li>Commitment range (optional)</li>
              <li>Interests or additional notes (optional)</li>
              <li>Referral source (optional)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              2. How Your Information Is Used
            </h2>
            <p className="text-slate-600">We use submitted information to:</p>
            <ul className="list-disc space-y-2 pl-6 text-slate-600">
              <li>Respond to inquiries</li>
              <li>Evaluate potential relationships or opportunities</li>
              <li>Manage communications and follow-ups</li>
              <li>Maintain internal records</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              3. Third-Party Processing
            </h2>
            <p className="text-slate-600">
              We use third-party services to process and manage submitted
              information.
            </p>
            <p className="text-slate-600">
              Currently, submitted data may be routed through external automation
              and data storage services. As part of ongoing improvements to our
              systems, we are transitioning to HubSpot for contact management
              and communication.
            </p>
            <p className="text-slate-600">
              As a result, your information may be transmitted to and stored
              within these systems.
            </p>
            <p className="text-slate-600">
              These providers process data in accordance with their own privacy
              policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              4. Automatically Collected Data
            </h2>
            <p className="text-slate-600">
              Based on the current implementation of the Site:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-slate-600">
              <li>
                We do not explicitly collect or store IP addresses, user agents,
                or referrer data within our application code
              </li>
              <li>
                We do not currently use third-party analytics platforms such as
                Google Analytics
              </li>
            </ul>
            <p className="text-slate-600">
              However, infrastructure providers or embedded services may collect
              technical data as part of standard operations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              5. Embedded Content
            </h2>
            <p className="text-slate-600">
              The Site may include embedded content such as video players (e.g.,
              YouTube).
            </p>
            <p className="text-slate-600">
              Interacting with this content may allow those third-party
              platforms to collect technical data according to their own
              policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              6. Cookies and Tracking
            </h2>
            <p className="text-slate-600">
              The Site may use basic browser technologies and may incorporate
              third-party tools that use cookies or similar tracking mechanisms.
            </p>
            <p className="text-slate-600">
              You can control cookie behavior through your browser settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              7. Data Sharing
            </h2>
            <p className="text-slate-600">
              We do not sell your personal information.
            </p>
            <p className="text-slate-600">We share information only as necessary to:</p>
            <ul className="list-disc space-y-2 pl-6 text-slate-600">
              <li>Process submissions through third-party services</li>
              <li>Operate and maintain the Site</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              8. Data Security
            </h2>
            <p className="text-slate-600">
              We take reasonable administrative and technical measures to protect
              your information. However, no system is completely secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              9. Your Rights
            </h2>
            <p className="text-slate-600">You may request:</p>
            <ul className="list-disc space-y-2 pl-6 text-slate-600">
              <li>Access to your data</li>
              <li>Corrections to your data</li>
              <li>Deletion of your data</li>
            </ul>
            <p className="text-slate-600">
              To make a request, contact: info@callalooventures.com
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              10. Children&rsquo;s Privacy
            </h2>
            <p className="text-slate-600">
              This Site is not intended for individuals under the age of 13.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              11. Changes to This Policy
            </h2>
            <p className="text-slate-600">
              We may update this Privacy Policy as the Site evolves. Updates will
              be reflected on this page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              12. Contact
            </h2>
            <p className="text-slate-600">
              For questions regarding this Privacy Policy: info@callalooventures.com
            </p>
          </section>
        </div>
      </Section>
    </div>
  );
}
