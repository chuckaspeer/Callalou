import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { CTAButton } from "@/components/ui/CTAButton";

export const metadata: Metadata = {
  title: "Capital Framework",
  description:
    "How Callaloo Ventures approaches capital: relationship-first, substantive dialogue, and alignment with qualified partners.",
};

export default function CapitalFrameworkPage() {
  return (
    <div className="space-y-16">
      <Section>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Capital Framework
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">
            Relationship-first, aligned by design
          </h1>
          <p className="max-w-3xl text-lg text-slate-600">
            We do not advertise deals publicly. Any substantive discussion is
            shared only after a relationship has been established and only
            pursuant to applicable law. Our framework prioritizes
            alignment, transparency, and long-term partnership over speed.
          </p>
        </div>
      </Section>
      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Connect first
            </h2>
            <p className="mt-2 text-slate-600">
              We begin with dialogue. Understanding your goals, timeline, and
              fit comes before any substantive discussion.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Align</h2>
            <p className="mt-2 text-slate-600">
              We share our criteria and how we operate. No public materials — only
              direct, documented communication with qualified contacts.
            </p>
          </div>
        </div>
      </Section>
      <Section background="muted" className="rounded-3xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-slate-600">
            Begin a substantive conversation with our team.
          </p>
          <CTAButton variant="primary" />
        </div>
      </Section>
    </div>
  );
}
