import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Callaloo Ventures terms of use.",
};

export default function TermsPage() {
  return (
    <div className="space-y-16">
      <Section>
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold text-slate-900">
              Terms of Service
            </h1>
            <p className="text-slate-600">Effective Date: [Insert Date]</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
            <p className="text-slate-600">
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the
              Callaloo Ventures website. By accessing or using this site, you
              agree to these Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              1. Informational Purpose Only
            </h2>
            <p className="text-slate-600">
              The content on this website is provided for informational purposes
              only. Nothing on this site constitutes investment advice, legal
              advice, or financial advice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              2. No Offer or Solicitation
            </h2>
            <p className="text-slate-600">
              Nothing on this website constitutes an offer to sell, or a
              solicitation of an offer to buy, any securities or investment
              products. Any such offer will be made only through formal offering
              documents and in compliance with applicable laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              3. No Client Relationship
            </h2>
            <p className="text-slate-600">
              Submitting information through this site or communicating with us
              does not create an advisory, fiduciary, or client relationship.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              4. Use of the Site
            </h2>
            <p className="text-slate-600">
              You agree to use this site only for lawful purposes. You may not:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-slate-600">
              <li>Attempt to gain unauthorized access to systems</li>
              <li>Interfere with the operation of the site</li>
              <li>Submit false or misleading information</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              5. Third-Party Services
            </h2>
            <p className="text-slate-600">
              We may use third-party services (including CRM and communication
              platforms such as HubSpot) to operate this site and manage
              communications. Your use of the site may involve interaction with
              these services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              6. Intellectual Property
            </h2>
            <p className="text-slate-600">
              All content on this site, including text, branding, and design, is
              the property of Callaloo Ventures unless otherwise stated. You may
              not reproduce or distribute content without permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              7. Disclaimer of Warranties
            </h2>
            <p className="text-slate-600">
              This site is provided &ldquo;as is&rdquo; without warranties of any
              kind, express or implied. We do not guarantee accuracy,
              completeness, or availability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              8. Limitation of Liability
            </h2>
            <p className="text-slate-600">
              To the fullest extent permitted by law, Callaloo Ventures shall not
              be liable for any damages arising from your use of the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">9. Privacy</h2>
            <p className="text-slate-600">
              Your use of the site is also governed by our Privacy Policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              10. Changes to These Terms
            </h2>
            <p className="text-slate-600">
              We may update these Terms at any time. Continued use of the site
              constitutes acceptance of any changes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              11. Governing Law
            </h2>
            <p className="text-slate-600">
              These Terms are governed by the laws of the applicable jurisdiction
              in which Callaloo Ventures operates.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">12. Contact</h2>
            <p className="text-slate-600">
              For questions regarding these Terms: hello@callalooventures.com
            </p>
          </section>
        </div>
      </Section>
    </div>
  );
}
