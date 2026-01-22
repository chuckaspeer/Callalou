import { Section } from "@/components/layout/Section";

export function EmilValues() {
  return (
    <Section background="muted" className="rounded-3xl shadow-inner">
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-slate-900">
          Principles Before Pressure
        </h2>
        <p className="max-w-3xl text-slate-600">
          Markets move quickly. Good judgment shouldn&apos;t. Our approach prioritizes:
        </p>
        <ul className="list-disc space-y-2 pl-6 pt-4 text-slate-600">
          <li>Time as a filter</li>
          <li>Trust as a form of capital</li>
          <li>Relationships as assets</li>
          <li>Housing as a foundation for stability and growth</li>
        </ul>
      </div>
    </Section>
  );
}

