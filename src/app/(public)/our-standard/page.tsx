import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { CTAButton } from "@/components/ui/CTAButton";

export const metadata: Metadata = {
  title: "Our Standard",
  description:
    "Callaloo Ventures standards: transparency, underwriting discipline, and alignment. How we evaluate risk and report to stakeholders.",
};

export default function OurStandardPage() {
  return (
    <div className="space-y-16">
      <Section>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Our Standard
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">
            Explicit standards, documented and auditable
          </h1>
          <p className="max-w-3xl text-lg text-slate-600">
            Our standards are explicit and documented. We publish a transparency
            trail weekly so that expectations are clear and behavior is
            auditable. How we evaluate risk, report to stakeholders, and align
            incentives is stated in advance — not after the fact.
          </p>
        </div>
      </Section>
      <Section className="pt-0">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Reporting cadence",
              body: "Clear reporting expectations designed for calm periods and difficult ones.",
            },
            {
              title: "Downside-first",
              body: "Stress tests prioritize leverage, operating assumptions, and liquidity before upside.",
            },
            {
              title: "Alignment",
              body: "Structures favor stewardship and durability over speed.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-slate-200 bg-white/80 p-4 text-slate-700"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                {card.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section background="muted" className="rounded-3xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-slate-600">
            Ready to start a conversation? We respond within 24–48 hours.
          </p>
          <CTAButton variant="primary" />
        </div>
      </Section>
    </div>
  );
}
