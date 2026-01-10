import { Section } from "@/components/layout/Section";

export function HowItWorks() {
  return (
    <Section background="muted" className="rounded-3xl shadow-sm">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          How it works
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          A simple, relationship-first process
        </h2>
        <div className="grid gap-6 pt-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-xl font-semibold text-white">
              1
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Connect
            </h3>
            <p className="text-slate-600 text-sm">
              Tell us your goals and timeline.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-xl font-semibold text-white">
              2
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Align
            </h3>
            <p className="text-slate-600 text-sm">
              We&apos;ll share our investment criteria and how we operate.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-xl font-semibold text-white">
              3
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Private access
            </h3>
            <p className="text-slate-600 text-sm">
              If aligned, opportunities are shared privately as relationships develop.
            </p>
          </div>
        </div>
        <p className="pt-4 text-xs text-slate-500">
          This website is informational only. We do not publicly advertise offerings.
        </p>
      </div>
    </Section>
  );
}
