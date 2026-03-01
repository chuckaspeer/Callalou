import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Terms",
  description: "Callaloo Ventures terms of use.",
};

export default function TermsPage() {
  return (
    <div className="space-y-16">
      <Section>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold text-slate-900">Terms</h1>
          <p className="text-slate-600">
            This page is a placeholder. Terms of use content will be added here.
          </p>
        </div>
      </Section>
    </div>
  );
}
