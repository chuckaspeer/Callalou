import { Section } from "@/components/layout/Section";
import Link from "next/link";

export function PortfolioOverview() {
  return (
    <Section>
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Portfolio Overview
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Multifamily Operations
        </h2>
        <p className="max-w-3xl text-slate-600">
          Our portfolio focuses on multifamily properties that combine quality housing with community impact. We maintain high standards for property management, tenant relations, and operational excellence.
        </p>
      </div>
      <div className="grid gap-6 pt-8 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Portfolio Focus
          </h3>
          <p className="text-slate-600 text-sm">
            Multifamily properties designed for long-term value creation and community stability.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Geographic Markets
          </h3>
          <p className="text-slate-600 text-sm">
            Primary focus in Cincinnati, with strategic expansion into additional markets that align with our investment criteria.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Investment Strategy
          </h3>
          <p className="text-slate-600 text-sm">
            Value-add and stabilized multifamily properties that provide quality housing while generating strong returns.
          </p>
        </div>
      </div>
      <div className="pt-8 space-y-4">
        <h3 className="text-xl font-semibold text-slate-900">
          Operational Approach
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <p className="font-medium text-slate-900">Property Management Standards</p>
            <p className="text-sm text-slate-600">
              Rigorous maintenance protocols and quality control to ensure properties meet our high standards.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-slate-900">Tenant Relations</p>
            <p className="text-sm text-slate-600">
              Focus on tenant retention through responsive management and quality living environments.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-slate-900">Quality Housing Standards</p>
            <p className="text-sm text-slate-600">
              Clean, safe, and welcoming homes that serve all tenants with dignity and respect.
            </p>
          </div>
        </div>
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
