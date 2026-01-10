import { Section } from "@/components/layout/Section";
import Link from "next/link";

export function BuildingShowcase() {
  return (
    <Section background="muted" className="rounded-3xl shadow-sm">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Portfolio Properties
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Building Showcase
        </h2>
        <p className="max-w-3xl text-slate-600">
          Our portfolio includes thoughtfully selected multifamily properties that exemplify our commitment to quality housing and operational excellence.
        </p>
        <div className="grid gap-6 md:grid-cols-2 pt-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Featured Properties
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Our properties are selected for their potential to provide quality housing while delivering strong investment returns. Each property undergoes rigorous evaluation and ongoing operational oversight.
            </p>
            <p className="text-slate-600 text-sm">
              Property details, locations, and investment strategies are available to qualified investors through our private deal rooms.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Property Highlights
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-slate-600">
              <li>Well-maintained multifamily buildings</li>
              <li>Strategic locations in strong neighborhoods</li>
              <li>Quality finishes and amenities</li>
              <li>Professional property management</li>
            </ul>
            <div className="pt-4">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900"
              >
                View Property Gallery →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
