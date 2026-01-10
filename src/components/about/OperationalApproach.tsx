import { Section } from "@/components/layout/Section";

export function OperationalApproach() {
  return (
    <Section background="muted" className="rounded-3xl shadow-sm">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Operations
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Multifamily Operations
        </h2>
        <p className="max-w-3xl text-slate-600">
          Our operational approach emphasizes quality housing standards, responsive property management, and strong tenant relations to create value for both investors and residents.
        </p>
        <div className="grid gap-6 pt-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Property Management
            </h3>
            <p className="text-slate-600 text-sm">
              Comprehensive maintenance protocols, quality control measures, and proactive management ensure properties meet our high operational standards.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Tenant Relations
            </h3>
            <p className="text-slate-600 text-sm">
              Responsive management and quality living environments support tenant satisfaction and retention. We serve all tenants with dignity, including Section 8 voucher recipients.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Quality Standards
            </h3>
            <p className="text-slate-600 text-sm">
              Clean, safe, and welcoming homes that provide stability and opportunity for residents while generating strong returns for investors.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
