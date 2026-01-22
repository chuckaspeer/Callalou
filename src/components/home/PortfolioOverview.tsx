import { Section } from "@/components/layout/Section";
import Link from "next/link";

export function PortfolioOverview() {
  return (
    <Section>
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          What We Focus On
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Multifamily Investment & Operations
        </h2>
        <p className="max-w-3xl text-slate-600">
          Our work centers on multifamily real estate — with a focus on properties that offer both operational upside and the opportunity to strengthen the communities they serve.
        </p>
        <p className="max-w-3xl text-slate-600 pt-4">
          We prioritize:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-slate-600">
          <li>Sound fundamentals and realistic underwriting</li>
          <li>Operational discipline and capable teams</li>
          <li>Long-term value creation over short-term wins</li>
        </ul>
      </div>
      <div className="pt-6">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900"
        >
          View Full Portfolio →
        </Link>
      </div>
    </Section>
  );
}
