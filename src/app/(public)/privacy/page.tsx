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
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold text-slate-900">
            Privacy Policy
          </h1>
          <p className="text-slate-600">
            This page is a placeholder. Privacy policy content will be added
            here.
          </p>
        </div>
      </Section>
    </div>
  );
}
