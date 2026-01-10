import { Section } from "@/components/layout/Section";

export function OperationalExamples() {
  return (
    <Section background="muted" className="rounded-3xl shadow-sm">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Operational examples
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          What &apos;value-add&apos; looks like in practice
        </h2>
        <div className="grid gap-6 pt-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Renovation scope
            </h3>
            <p className="text-slate-600 text-sm">
              Targeted upgrades to interiors and common areas to improve quality and durability.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Operations improvements
            </h3>
            <p className="text-slate-600 text-sm">
              Tighter maintenance workflows, vendor standards, and resident communication.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Resident experience
            </h3>
            <p className="text-slate-600 text-sm">
              Policies and practices that support retention, stability, and respectful housing.
            </p>
          </div>
        </div>
        <p className="pt-4 text-sm text-slate-500">
          Specific property details and investment materials are shared privately with aligned, qualified contacts.
        </p>
      </div>
    </Section>
  );
}
