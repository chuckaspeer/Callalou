import { Section } from "@/components/layout/Section";

const items = [
  { label: "Underwriting standards", status: "published" },
  { label: "Governance & reporting expectations", status: "published" },
  { label: "Operator evaluation scorecards", status: "published" },
  { label: "Relationship-first investor intake", status: "private" },
];

export function PlatformInFormation() {
  return (
    <Section background="muted" className="rounded-2xl">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Platform-in-Formation
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">
          What I&apos;m building publicly
        </h2>
        <ul className="space-y-2 text-slate-600">
          {items.map(({ label, status }) => (
            <li key={label} className="flex items-baseline gap-2">
              <span>{label}</span>
              <span className="text-slate-500">({status})</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
